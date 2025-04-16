
import { supabase } from "@/integrations/supabase/client";

export interface ChessAPIParams {
  [key: string]: string | number | boolean;
}

export class ChessApiService {
  /**
   * Call the Chess RapidAPI through our secure edge function
   * @param endpoint The API endpoint path (should start with a /)
   * @param params Optional query parameters
   * @returns The API response data
   */
  static async call<T>(endpoint: string, params?: ChessAPIParams): Promise<T> {
    try {
      const { data, error } = await supabase.functions.invoke('chess-api', {
        body: { endpoint, params },
      });

      if (error) {
        console.error('Error calling Chess API:', error);
        throw error;
      }

      return data as T;
    } catch (error) {
      console.error('Exception calling Chess API:', error);
      throw error;
    }
  }

  /**
   * Get player profile information
   * @param username The player's username
   */
  static async getPlayerProfile(username: string) {
    return this.call('/player/profile', { username });
  }

  /**
   * Get player rating history
   * @param username The player's username
   */
  static async getPlayerRatingHistory(username: string) {
    return this.call('/player/rating/history', { username });
  }
  
  /**
   * Get player game history
   * @param username The player's username
   */
  static async getPlayerGames(username: string) {
    return this.call('/player/games', { username });
  }

  /**
   * Get chess opening information
   * @param eco The ECO code (e.g., "B20")
   */
  static async getOpeningByEco(eco: string) {
    return this.call('/openings/eco', { eco });
  }

  /**
   * Get puzzle of the day
   */
  static async getPuzzleOfTheDay() {
    return this.call('/puzzle/daily');
  }

  /**
   * Get a random puzzle
   */
  static async getRandomPuzzle() {
    return this.call('/puzzle/random');
  }
}
