
import { toast } from "@/hooks/use-toast";

// Types for Lichess API responses
export interface LichessPlayer {
  color: string;
  id: string;
  name: string;
  rating: number;
  title?: string;
  patron?: boolean;
  flair?: string;
}

export interface LichessGame {
  id: string;
  clock: string;
  perf: {
    key: string;
    name: string;
  };
  pgn: string;
  rated: boolean;
  players: LichessPlayer[];
}

export interface LichessPuzzle {
  id: string;
  initialPly: number;
  plays: number;
  rating: number;
  solution: string[];
  themes: string[];
  fen?: string;
  lastMove?: string;
}

export interface LichessPuzzleData {
  game: LichessGame;
  puzzle: LichessPuzzle;
}

export interface LichessPuzzleActivity {
  date: number;
  puzzle: LichessPuzzle;
  win: boolean;
}

export interface LichessPuzzleReplay {
  replay: {
    days: number;
    theme: string;
    nb: number;
    remaining: string[];
  };
  angle: {
    key: string;
    name: string;
    desc: string;
  };
}

export interface LichessPuzzleThemeResults {
  firstWins: number;
  nb: number;
  performance: number;
  puzzleRatingAvg: number;
  replayWins: number;
}

export interface LichessPuzzleDashboard {
  days: number;
  global: LichessPuzzleThemeResults;
  themes: {
    [key: string]: {
      results: LichessPuzzleThemeResults;
      theme: string;
    };
  };
}

// Lichess API service
class LichessService {
  private baseUrl = 'https://lichess.org/api/puzzle';
  
  // Fetch daily puzzle
  async getDailyPuzzle(): Promise<LichessPuzzleData | null> {
    try {
      const response = await fetch(`${this.baseUrl}/daily`);
      if (!response.ok) {
        throw new Error(`Failed to fetch daily puzzle: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching daily puzzle:', error);
      toast({
        title: "Error",
        description: "Failed to fetch the daily puzzle. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  }
  
  // Fetch a puzzle by ID
  async getPuzzleById(id: string): Promise<LichessPuzzleData | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch puzzle ${id}: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching puzzle ${id}:`, error);
      toast({
        title: "Error",
        description: `Failed to fetch puzzle ${id}. Please try again later.`,
        variant: "destructive",
      });
      return null;
    }
  }
  
  // Fetch next puzzle (requires authentication in real implementation)
  async getNextPuzzle(): Promise<LichessPuzzleData | null> {
    // Note: In a real implementation, this would need authentication
    // For now, we'll use a mock to simulate the API behavior
    try {
      const response = await fetch(`${this.baseUrl}/daily`); // Using daily as a fallback
      if (!response.ok) {
        throw new Error(`Failed to fetch next puzzle: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching next puzzle:', error);
      toast({
        title: "Error",
        description: "Failed to fetch the next puzzle. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  }
  
  // Fetch puzzle activity (requires authentication in real implementation)
  async getPuzzleActivity(): Promise<LichessPuzzleActivity | null> {
    // Note: In a real implementation, this would need authentication
    // For now, return a mock response
    try {
      // Mock response for demo purposes
      return {
        date: Date.now(),
        puzzle: {
          id: "demo",
          initialPly: 52,
          plays: 500,
          rating: 1800,
          solution: ["g8g7", "d5e5", "f6e5"],
          themes: ["endgame", "crushing", "short"],
          fen: "6k1/3rqpp1/5b1p/p1p1pP1Q/1pB4P/1P1R1PP1/P7/6K1 w - - 1 1",
          lastMove: "c7d7"
        },
        win: true
      };
    } catch (error) {
      console.error('Error fetching puzzle activity:', error);
      toast({
        title: "Error",
        description: "Failed to fetch puzzle activity. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  }
  
  // Fetch puzzles by theme
  async getPuzzlesByTheme(days: number = 30, theme: string = 'opening'): Promise<LichessPuzzleReplay | null> {
    try {
      const response = await fetch(`${this.baseUrl}/replay/${days}/${theme}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch puzzles by theme: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching puzzles by theme:', error);
      toast({
        title: "Error",
        description: "Failed to fetch themed puzzles. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  }
  
  // Fetch puzzle dashboard data
  async getPuzzleDashboard(days: number = 30): Promise<LichessPuzzleDashboard | null> {
    try {
      // Note: In a real implementation, this would need authentication
      // Mock response for demo purposes
      return {
        days: days,
        global: {
          firstWins: 45,
          nb: 68,
          performance: 1950,
          puzzleRatingAvg: 1800,
          replayWins: 12
        },
        themes: {
          pin: {
            results: {
              firstWins: 12,
              nb: 18,
              performance: 2100,
              puzzleRatingAvg: 1950,
              replayWins: 3
            },
            theme: "Pin"
          },
          fork: {
            results: {
              firstWins: 15,
              nb: 22,
              performance: 1950,
              puzzleRatingAvg: 1850,
              replayWins: 4
            },
            theme: "Fork"
          },
          sacrifice: {
            results: {
              firstWins: 8,
              nb: 12,
              performance: 1800,
              puzzleRatingAvg: 1750,
              replayWins: 2
            },
            theme: "Sacrifice"
          },
          endgame: {
            results: {
              firstWins: 10,
              nb: 16,
              performance: 1900,
              puzzleRatingAvg: 1800,
              replayWins: 3
            },
            theme: "Endgame"
          }
        }
      };
    } catch (error) {
      console.error('Error fetching puzzle dashboard:', error);
      toast({
        title: "Error",
        description: "Failed to fetch puzzle dashboard. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  }
}

export const lichessService = new LichessService();
