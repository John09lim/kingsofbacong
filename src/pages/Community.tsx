
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SkeletonCard } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  training_hours: number;
  level: number;
}

const Community = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadingPlayer, setLeadingPlayer] = useState<Profile | null>(null);

  // Calculate user level based on training hours
  const calculateLevel = (hours: number): number => {
    if (hours < 10) return 1;
    if (hours < 25) return 2;
    if (hours < 50) return 3;
    if (hours < 100) return 4;
    if (hours < 200) return 5;
    return 6; // Max level
  };

  // Get level title based on level number
  const getLevelTitle = (level: number): string => {
    switch(level) {
      case 1: return "Beginner";
      case 2: return "Novice";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      case 6: return "Master";
      default: return "Unknown";
    }
  };

  // Calculate progress percentage to next level
  const getLevelProgress = (hours: number, level: number): number => {
    const levelThresholds = [0, 10, 25, 50, 100, 200, 999999];
    const currentThreshold = levelThresholds[level - 1];
    const nextThreshold = levelThresholds[level];
    
    if (level >= 6) return 100; // Max level reached
    
    const progress = ((hours - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
    return Math.min(Math.max(progress, 0), 100); // Clamp between 0-100
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        // Fetch all profiles
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('full_name');

        if (error) throw error;

        // Add mock training hours for demo purposes
        const profilesWithStats = data?.map((profile, index) => {
          const randomBase = Math.floor(Math.random() * 220); // Random base hours
          const trainHours = 150 - (index * 8) + randomBase;
          const trainingHours = Math.max(trainHours, 5); // Ensure at least 5 hours
          
          // Calculate level based on hours and create properly typed profile object
          const level = calculateLevel(trainingHours);
          
          return {
            id: profile.id,
            full_name: profile.full_name || 'Chess Player',
            avatar_url: profile.avatar_url,
            training_hours: trainingHours,
            level: level
          } as Profile;
        }) || [];
        
        // Sort by training hours (descending)
        profilesWithStats.sort((a, b) => b.training_hours - a.training_hours);
        
        setProfiles(profilesWithStats);
        
        // Set the leading player (first one with most hours)
        if (profilesWithStats.length > 0) {
          setLeadingPlayer(profilesWithStats[0]);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-chess-light-pink">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-chess-dark-maroon mb-8 text-center">
            Chess Community
          </h1>
          
          {loading ? (
            <div className="space-y-8">
              <SkeletonCard />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              {leadingPlayer && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-chess-deep-red">
                  <h2 className="text-2xl font-semibold text-chess-dark-maroon mb-4 text-center">
                    Leading in Training
                  </h2>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="relative">
                      <Avatar className="h-32 w-32 border-4 border-chess-deep-red">
                        <AvatarImage src={leadingPlayer.avatar_url || ''} />
                        <AvatarFallback className="bg-chess-deep-red text-white text-4xl">
                          {leadingPlayer.full_name ? leadingPlayer.full_name.charAt(0).toUpperCase() : 'K'}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-chess-dark-blue px-3 py-1">
                        {getLevelTitle(leadingPlayer.level || 1)}
                      </Badge>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-chess-dark-maroon">{leadingPlayer.full_name}</h3>
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-chess-dark-blue">Level {leadingPlayer.level}</span>
                          <span className="text-sm text-chess-dark-blue">
                            {leadingPlayer.training_hours} hours
                          </span>
                        </div>
                        <Progress 
                          value={getLevelProgress(
                            leadingPlayer.training_hours || 0, 
                            leadingPlayer.level || 1
                          )} 
                          className="h-2 mt-1"
                        />
                      </div>
                      <p className="mt-4 italic text-chess-dark-blue">
                        "A strong chess player isn't born overnight. It's built one consistent practice at a time."
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-chess-dark-maroon mb-6">
                  Leaderboard
                </h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Rank</TableHead>
                        <TableHead>Player</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead className="text-right">Training Hours</TableHead>
                        <TableHead>Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.slice(0, 10).map((profile, index) => (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={profile.avatar_url || ''} />
                                <AvatarFallback className="bg-chess-deep-red text-white">
                                  {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <span>{profile.full_name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-chess-dark-blue">
                              {getLevelTitle(profile.level || 1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{profile.training_hours}</TableCell>
                          <TableCell>
                            <Progress 
                              value={getLevelProgress(
                                profile.training_hours || 0, 
                                profile.level || 1
                              )} 
                              className="h-2"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-chess-dark-maroon mb-6">
                  Community Members
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="bg-chess-light-pink bg-opacity-30 rounded-lg p-4 flex flex-col items-center">
                      <Avatar className="h-20 w-20 mb-3">
                        <AvatarImage src={profile.avatar_url || ''} />
                        <AvatarFallback className="bg-chess-deep-red text-white text-xl">
                          {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-chess-dark-maroon">{profile.full_name}</h3>
                      <div className="mt-2 w-full">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <Badge variant="outline" className="font-normal border-chess-dark-blue text-chess-dark-blue">
                            Level {profile.level} ({getLevelTitle(profile.level || 1)})
                          </Badge>
                          <span>{profile.training_hours} hrs</span>
                        </div>
                        <Progress 
                          value={getLevelProgress(
                            profile.training_hours || 0, 
                            profile.level || 1
                          )} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
