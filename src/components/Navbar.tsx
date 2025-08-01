
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, UserCircle } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);
  
  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // Set up real-time subscription for profile updates
    const profileChannel = supabase
      .channel('profile-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          if (user && payload.new.id === user.id) {
            console.log('Profile updated in real-time:', payload.new);
            setProfile(payload.new);
          }
        }
      )
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(profileChannel);
    };
  }, [user]);
  
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      console.log('Fetched profile:', data); // Debug log
      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };
  
  const handleSignOut = async () => {
    try {
      setProfileDropdownOpen(false);
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <nav className="bg-chess-dark-maroon text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/40fd7632-589e-44da-bd7f-d66a49ea58e1.png" 
            alt="Kings of Bacong Chess Club" 
            className="h-12 w-auto object-contain"
          />
          <span className="font-bold text-xl hidden sm:block">Kings of Bacong</span>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-chess-light-pink transition-colors">Home</Link>
          <Link to="/training" className="hover:text-chess-light-pink transition-colors">Training</Link>
          <Link to="/tactics" className="hover:text-chess-light-pink transition-colors">Tactics</Link>
          <Link to="/openings" className="hover:text-chess-light-pink transition-colors">Openings</Link>
          <Link to="/community" className="hover:text-chess-light-pink transition-colors">Community</Link>
          
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <Avatar className="h-10 w-10 border-2 border-chess-light-pink">
                  <AvatarImage 
                    src={profile?.avatar_url} 
                    alt={profile?.full_name || 'User Avatar'}
                  />
                  <AvatarFallback className="bg-chess-deep-red text-white">
                    {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 z-[9999] overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="font-semibold text-gray-900">{profile?.full_name || 'User'}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                  <div className="py-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-left hover:bg-gray-100 rounded-none"
                      onClick={handleProfileClick}
                    >
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-left hover:bg-gray-100 rounded-none text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-chess-dark-maroon">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-chess-dark-maroon text-white p-4 absolute w-full shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="py-2 hover:text-chess-light-pink transition-colors">Home</Link>
            <Link to="/training" className="py-2 hover:text-chess-light-pink transition-colors">Training</Link>
            <Link to="/tactics" className="py-2 hover:text-chess-light-pink transition-colors">Tactics</Link>
            <Link to="/openings" className="py-2 hover:text-chess-light-pink transition-colors">Openings</Link>
            <Link to="/community" className="py-2 hover:text-chess-light-pink transition-colors">Community</Link>
            
            {user ? (
              <>
                <div className="py-2 flex items-center space-x-3">
                  <Avatar className="h-8 w-8 border-2 border-chess-light-pink">
                    <AvatarImage 
                      src={profile?.avatar_url} 
                      alt={profile?.full_name || 'User Avatar'}
                    />
                    <AvatarFallback className="bg-chess-deep-red text-white">
                      {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span>{profile?.full_name || user.email}</span>
                </div>
                <Link to="/profile" className="py-2 hover:text-chess-light-pink transition-colors">Profile</Link>
                <button 
                  onClick={handleSignOut}
                  className="py-2 text-left w-full hover:text-chess-light-pink transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-chess-dark-maroon w-full">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
