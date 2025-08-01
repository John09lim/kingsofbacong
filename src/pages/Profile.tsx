
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Target, Star, Zap } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [trainingSessions, setTrainingSessions] = useState<any[]>([]);

  // Calculate user level and progress
  const calculateLevel = (minutes: number): number => {
    return Math.floor(minutes / 60) + 1;
  };

  const getLevelTitle = (level: number): string => {
    if (level >= 100) return "Grandmaster";
    if (level >= 50) return "Master";
    if (level >= 25) return "Expert";
    if (level >= 10) return "Advanced";
    if (level >= 5) return "Intermediate";
    return "Beginner";
  };

  const getLevelProgress = (minutes: number): number => {
    const minutesInCurrentLevel = minutes % 60;
    return (minutesInCurrentLevel / 60) * 100;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      
      setUser(session.user);
      fetchProfile(session.user.id);
      fetchTrainingSessions(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    setProfile(data);
    setFullName((data as any)?.full_name || '');
  };

  const fetchTrainingSessions = async (userId: string) => {
    const { data, error } = await supabase
      .from('training_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching training sessions:', error);
      return;
    }

    setTrainingSessions(data || []);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Upload avatar if a new file is selected
      let avatarUrl = profile?.avatar_url;
      if (avatarFile && user) {
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `avatars/${user.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatarUrl = publicUrlData?.publicUrl;
      }

      // Update profile in the database
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ 
          full_name: fullName,
          avatar_url: avatarUrl 
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      // Refresh profile data
      fetchProfile(user.id);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const userLevel = calculateLevel(profile?.total_training_minutes || 0);
  const levelProgress = getLevelProgress(profile?.total_training_minutes || 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Your Profile
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32 mb-4 border-4 border-primary">
                    <AvatarImage 
                      src={avatarPreview || profile?.avatar_url || ''} 
                      alt="Profile avatar" 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input 
                    value={user.email || ''} 
                    readOnly 
                    className="mt-2 bg-muted cursor-not-allowed" 
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Level Information */}
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">Level {userLevel}</div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {getLevelTitle(userLevel)}
                </Badge>
                <Progress value={levelProgress} className="h-3 mt-4" />
                <p className="text-sm text-muted-foreground">
                  {Math.floor(levelProgress)}% progress to Level {userLevel + 1}
                </p>
              </div>

              {/* Training Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold">
                    {Math.floor((profile?.total_training_minutes || 0) / 60)}h {(profile?.total_training_minutes || 0) % 60}m
                  </div>
                  <div className="text-sm text-muted-foreground">Total Training</div>
                </div>
                
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Zap className="h-6 w-6 mx-auto text-primary mb-2" />
                  <div className="text-2xl font-bold">{trainingSessions.length}</div>
                  <div className="text-sm text-muted-foreground">Recent Sessions</div>
                </div>
              </div>

              {/* Recent Training Sessions */}
              {trainingSessions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Recent Training Sessions
                  </h3>
                  <div className="space-y-2">
                    {trainingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                        <div>
                          <div className="font-medium">{session.activity_type}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(session.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{session.duration_minutes || 0}m</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
