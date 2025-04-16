
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface LichessApiParams {
  [key: string]: string | number | boolean;
}

class LichessApiService {
  async callLichessApi<T>(endpoint: string, params?: LichessApiParams): Promise<T | null> {
    try {
      const { data, error } = await supabase.functions.invoke('lichess-api', {
        body: {
          endpoint,
          params,
        },
      });

      if (error) {
        console.error('Lichess API error:', error);
        toast({
          title: "API Error",
          description: `Failed to call Lichess API: ${error.message}`,
          variant: "destructive",
        });
        return null;
      }

      if (data.error) {
        console.error('Lichess API returned an error:', data.error);
        toast({
          title: "Lichess API Error",
          description: data.error,
          variant: "destructive",
        });
        return null;
      }

      return data.data as T;
    } catch (error) {
      console.error('Error calling Lichess API:', error);
      toast({
        title: "Error",
        description: "Failed to call Lichess API. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  }

  // Get user profile
  async getProfile(): Promise<any> {
    return this.callLichessApi('account');
  }

  // Get user email
  async getEmail(): Promise<any> {
    return this.callLichessApi('account/email');
  }

  // Get user's puzzle activity
  async getPuzzleActivity(): Promise<any> {
    return this.callLichessApi('puzzle/activity');
  }

  // Get puzzle dashboard
  async getPuzzleDashboard(): Promise<any> {
    return this.callLichessApi('puzzle/dashboard');
  }

  // Get puzzle by ID
  async getPuzzleById(puzzleId: string): Promise<any> {
    return this.callLichessApi(`puzzle/${puzzleId}`);
  }

  // Get puzzle of the day
  async getPuzzleOfTheDay(): Promise<any> {
    return this.callLichessApi('puzzle/daily');
  }

  // Get storm dashboard
  async getStormDashboard(): Promise<any> {
    return this.callLichessApi('storm/dashboard');
  }

  // Get puzzles by rating
  async getPuzzlesByRating(min: number, max: number, count: number = 10): Promise<any> {
    return this.callLichessApi('puzzle/batch', { 
      min, 
      max,
      count
    });
  }

  // Get puzzles by theme
  async getPuzzlesByTheme(themes: string[], count: number = 10): Promise<any> {
    return this.callLichessApi('puzzle/batch', { 
      themes: themes.join(','), 
      count 
    });
  }

  // Get random puzzle
  async getRandomPuzzle(): Promise<any> {
    return this.callLichessApi('puzzle/random');
  }
}

export const lichessApiService = new LichessApiService();
