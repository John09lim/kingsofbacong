import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Clock, Target, Star } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string;
  total_training_minutes: number;
  level: number;
}

const calculateLevel = (minutes: number): number => {
  return Math.floor(minutes / 60) + 1; // 1 level per hour
};

const getLevelTitle = (level: number): string => {
  if (level >= 100) return "Grandmaster";
  if (level >= 50) return "Master";
  if (level >= 25) return "Expert";
  if (level >= 10) return "Advanced";
  if (level >= 5) return "Intermediate";
  return "Beginner";
};

const getLevelProgress = (minutes: number, level: number): number => {
  const minutesInCurrentLevel = minutes % 60;
  return (minutesInCurrentLevel / 60) * 100;
};

const getDefaultAvatar = (name: string | null): string => {
  const avatars = [
    'photo-1582562124811-c09040d0a901',
    'photo-1535268647677-300dbf3d78d1',
    'photo-1501286353178-1ec881214838'
  ];
  const index = name ? name.length % avatars.length : 0;
  return `https://images.unsplash.com/${avatars[index]}?w=100&h=100&fit=crop&crop=face`;
};

const Community = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadingPlayer, setLeadingPlayer] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('profiles')
          .select('id, full_name, avatar_url, email, total_training_minutes, created_at')
          .order('full_name');

        if (error) throw error;

        const profilesWithLevels = (data || []).map((profile: any) => ({
          ...profile,
          total_training_minutes: profile.total_training_minutes || 0,
          level: calculateLevel(profile.total_training_minutes || 0)
        }));

        // Sort by training time for leaderboard
        const sortedProfiles = [...profilesWithLevels].sort(
          (a, b) => b.total_training_minutes - a.total_training_minutes
        );

        setProfiles(profilesWithLevels);
        setLeadingPlayer(sortedProfiles[0] || null);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();

    // Set up real-time subscription for new profiles
    const channel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('New profile created:', payload);
          const newProfile: Profile = {
            ...payload.new as any,
            total_training_minutes: payload.new.total_training_minutes || 0,
            level: calculateLevel(payload.new.total_training_minutes || 0)
          };
          setProfiles(prev => [...prev, newProfile]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('Profile updated:', payload);
          const updatedProfile: Profile = {
            ...payload.new as any,
            total_training_minutes: payload.new.total_training_minutes || 0,
            level: calculateLevel(payload.new.total_training_minutes || 0)
          };
          setProfiles(prev => {
            const updated = prev.map(p => 
              p.id === updatedProfile.id ? updatedProfile : p
            );
            
            // Update leading player if necessary
            const sortedProfiles = [...updated].sort(
              (a, b) => b.total_training_minutes - a.total_training_minutes
            );
            setLeadingPlayer(sortedProfiles[0] || null);
            
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Chess Community</h1>
            <p className="text-muted-foreground text-lg">
              Connect with fellow chess enthusiasts and track your progress together
            </p>
          </div>

          {/* Leading Player Spotlight */}
          {leadingPlayer && (
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  Leading in Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage 
                      src={leadingPlayer.avatar_url || getDefaultAvatar(leadingPlayer.full_name)} 
                      alt={leadingPlayer.full_name || 'User'} 
                    />
                    <AvatarFallback>
                      {(leadingPlayer.full_name || leadingPlayer.email)?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold">
                      {leadingPlayer.full_name || 'Anonymous Player'}
                    </h3>
                    <p className="text-muted-foreground">{leadingPlayer.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Level {leadingPlayer.level} - {getLevelTitle(leadingPlayer.level)}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {Math.floor(leadingPlayer.total_training_minutes / 60)}h {leadingPlayer.total_training_minutes % 60}m trained
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Training Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profiles
                  .sort((a, b) => b.total_training_minutes - a.total_training_minutes)
                  .slice(0, 10)
                  .map((profile, index) => (
                    <div key={profile.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 text-center font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={profile.avatar_url || getDefaultAvatar(profile.full_name)} 
                          alt={profile.full_name || 'User'} 
                        />
                        <AvatarFallback>
                          {(profile.full_name || profile.email)?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{profile.full_name || 'Anonymous Player'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(profile.total_training_minutes / 60)}h {profile.total_training_minutes % 60}m
                        </p>
                      </div>
                      <Badge variant="outline">
                        Level {profile.level}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Welcome Section */}
          <Card className="border-secondary/20 bg-gradient-to-r from-secondary/5 to-primary/5">
            <CardHeader>
              <CardTitle className="text-center">
                Welcome to Kings of Bacong Chess Club!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Join our community of {profiles.length} chess enthusiasts and start your journey to mastery.
                </p>
                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{profiles.length}</div>
                    <div className="text-muted-foreground">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {profiles.reduce((total, p) => total + p.total_training_minutes, 0)}
                    </div>
                    <div className="text-muted-foreground">Minutes Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {profiles.filter(p => p.total_training_minutes > 0).length}
                    </div>
                    <div className="text-muted-foreground">Active Trainers</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Community Members */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Community Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={profile.avatar_url || getDefaultAvatar(profile.full_name)} 
                          alt={profile.full_name || 'User'} 
                        />
                        <AvatarFallback>
                          {(profile.full_name || profile.email)?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">
                          {profile.full_name || 'Anonymous Player'}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {profile.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Level {profile.level}</span>
                        <Badge variant="outline" className="text-xs">
                          {getLevelTitle(profile.level)}
                        </Badge>
                      </div>
                      
                      <Progress 
                        value={getLevelProgress(profile.total_training_minutes, profile.level)} 
                        className="h-2"
                      />
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {Math.floor(profile.total_training_minutes / 60)}h {profile.total_training_minutes % 60}m
                        </div>
                        <span>Next: Level {profile.level + 1}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;