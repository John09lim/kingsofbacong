
import { useState, useEffect } from 'react';
import { lichessApiService } from '@/services/lichessApiService';
import { toast } from "@/hooks/use-toast";

export const usePuzzleApiSelector = () => {
  const [useLiveApi, setUseLiveApi] = useState<boolean>(false);

  // Check if we should use the live API
  useEffect(() => {
    const checkLichessApi = async () => {
      try {
        const profile = await lichessApiService.getProfile();
        if (profile) {
          setUseLiveApi(true);
          toast({
            title: "Lichess API Connected",
            description: `Connected to Lichess as ${profile.username || 'User'}`,
          });
        }
      } catch (error) {
        console.log("Using mock Lichess service");
        setUseLiveApi(false);
      }
    };
    
    checkLichessApi();
  }, []);

  return { useLiveApi };
};
