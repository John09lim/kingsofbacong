
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Sign up the user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              avatar_url: null, // We'll update this after uploading
            }
          }
        });

        if (error) throw error;

        // If we have an avatar file, upload it
        if (avatarFile && data.user) {
          const fileExt = avatarFile.name.split('.').pop();
          const filePath = `avatars/${data.user.id}.${fileExt}`;

          // Upload the avatar
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, avatarFile);

          if (uploadError) {
            throw uploadError;
          }

          // Get the public URL
          const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

          // Update the user's profile with the avatar URL
          if (publicUrlData) {
            await supabase
              .from('profiles')
              .update({ 
                avatar_url: publicUrlData.publicUrl,
              })
              .eq('id', data.user.id);
          }
        }

        toast({
          title: "Account created",
          description: "You've successfully signed up!",
        });
        navigate('/');
      } else {
        // Sign in the user
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Welcome back",
          description: "You've successfully signed in!",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-chess-light-pink py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md border border-chess-muted-rose">
        <div className="text-center">
          <img
            src="/lovable-uploads/46dedfa8-7159-42f0-a0eb-76829b4dc416.png"
            alt="Kings of Bacong Chess Club"
            className="h-24 mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-chess-dark-maroon">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-sm text-chess-dark-blue">
            {isSignUp 
              ? 'Join the Kings of Bacong Chess Club community' 
              : 'Welcome back to Kings of Bacong Chess Club'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            
            {isSignUp && (
              <div>
                <Label htmlFor="avatar">Profile Picture</Label>
                <div className="flex items-center mt-1 space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="bg-chess-deep-red text-white text-lg">
                      {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Input 
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon text-white"
              disabled={loading}
            >
              {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </form>
        
        {/* Removed the "Need an account? Create one" button */}
      </div>
    </div>
  );
};

export default Auth;
