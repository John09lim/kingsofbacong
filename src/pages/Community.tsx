
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  training_hours?: number;
}

const Community = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadingPlayer, setLeadingPlayer] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        // Mock implementation for leading player
        // In a real implementation, you would track training hours
        // and query based on that data
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(10);

        if (error) throw error;

        // Add mock training hours for demo purposes
        const profilesWithHours = data?.map((profile, index) => ({
          ...profile,
          training_hours: 120 - (index * 10) // Mock decreasing hours
        })) || [];
        
        setProfiles(profilesWithHours);
        
        // Set the leading player (first one with most hours)
        if (profilesWithHours.length > 0) {
          setLeadingPlayer(profilesWithHours[0]);
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
          
          {leadingPlayer && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-chess-deep-red">
              <h2 className="text-2xl font-semibold text-chess-dark-maroon mb-4 text-center">
                Leading in Training
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Avatar className="h-32 w-32 border-4 border-chess-deep-red">
                  <AvatarImage src={leadingPlayer.avatar_url || ''} />
                  <AvatarFallback className="bg-chess-deep-red text-white text-4xl">
                    {leadingPlayer.full_name ? leadingPlayer.full_name.charAt(0).toUpperCase() : 'K'}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-chess-dark-maroon">{leadingPlayer.full_name}</h3>
                  <p className="text-lg text-chess-dark-blue mt-2">
                    Training Hours: <span className="font-semibold">{leadingPlayer.training_hours}</span>
                  </p>
                  <p className="mt-3 italic text-chess-dark-blue">
                    "A strong chess player isn't born overnight. It's built one consistent practice at a time."
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-chess-dark-maroon mb-6">
              Community Members
            </h2>
            
            {loading ? (
              <div className="text-center py-8">Loading community members...</div>
            ) : (
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
                    <p className="text-sm text-chess-dark-blue mt-1">
                      Training Hours: {profile.training_hours}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
