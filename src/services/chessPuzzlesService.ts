
import { supabase } from "@/integrations/supabase/client";

export interface ChessPuzzle {
  puzzleid: string;
  fen: string;
  rating: number;
  ratingdeviation?: number;
  moves: string[];
  themes: string[];
}

export interface ChessPuzzlesResponse {
  puzzles: ChessPuzzle[];
}

export interface PuzzleQueryParams {
  themes?: string[];
  rating?: number;
  themesType?: 'ALL' | 'ANY';
  playerMoves?: number;
  count?: number;
  minRating?: number;
  maxRating?: number;
}

// Convert to Lichess puzzle format for compatibility with existing components
export const adaptToLichessPuzzleFormat = (puzzle: ChessPuzzle) => {
  // Convert the moves format from RapidAPI to Lichess format
  const movesPairs = [];
  for (let i = 0; i < puzzle.moves.length; i += 2) {
    if (i + 1 < puzzle.moves.length) {
      movesPairs.push([puzzle.moves[i], puzzle.moves[i + 1]]);
    } else {
      movesPairs.push([puzzle.moves[i]]);
    }
  }

  return {
    puzzle: {
      id: puzzle.puzzleid,
      fen: puzzle.fen,
      rating: puzzle.rating,
      themes: puzzle.themes || [],
      solution: puzzle.moves,
      plays: 0,
      initialPly: 0 // This might need adjustment based on FEN
    },
    game: {
      id: `game_${puzzle.puzzleid}`,
      perf: {
        name: "Rapid"
      },
      players: [
        { name: "Player 1", rating: Math.floor(Math.random() * 300) + 1600 },
        { name: "Player 2", rating: Math.floor(Math.random() * 300) + 1600 }
      ],
      clock: "5+0",
      rated: true,
      pgn: "" // We don't have PGN from the API
    }
  };
};

class ChessPuzzlesService {
  // Fetch puzzles with specified parameters
  async getPuzzles(params: PuzzleQueryParams = {}) {
    try {
      // Format themes as a JSON string array if provided
      const apiParams: Record<string, any> = {};
      
      if (params.themes && params.themes.length > 0) {
        apiParams.themes = JSON.stringify(params.themes);
      }
      
      if (params.rating) {
        apiParams.rating = params.rating;
      }
      
      if (params.themesType) {
        apiParams.themesType = params.themesType;
      }
      
      if (params.playerMoves) {
        apiParams.playerMoves = params.playerMoves;
      }
      
      if (params.count) {
        apiParams.count = params.count;
      }
      
      if (params.minRating) {
        apiParams.minRating = params.minRating;
      }
      
      if (params.maxRating) {
        apiParams.maxRating = params.maxRating;
      }

      const { data, error } = await supabase.functions.invoke('chess-api', {
        body: { endpoint: '/puzzles', params: apiParams }
      });

      if (error) {
        console.error('Error fetching puzzles:', error);
        throw new Error(`Failed to fetch puzzles: ${error.message}`);
      }

      return data as ChessPuzzlesResponse;
    } catch (error) {
      console.error('Exception fetching puzzles:', error);
      throw error;
    }
  }

  // Get puzzles by rating range
  async getPuzzlesByRating(minRating: number, maxRating: number, count = 5) {
    return this.getPuzzles({
      minRating,
      maxRating,
      count
    });
  }

  // Get puzzles by themes
  async getPuzzlesByThemes(themes: string[], count = 5) {
    return this.getPuzzles({
      themes,
      themesType: 'ANY', // ANY means any of the themes, ALL means all themes must be present
      count
    });
  }

  // Get a single random puzzle
  async getRandomPuzzle() {
    const response = await this.getPuzzles({ count: 1 });
    if (response.puzzles && response.puzzles.length > 0) {
      return adaptToLichessPuzzleFormat(response.puzzles[0]);
    }
    throw new Error('No puzzles returned');
  }

  // Get a random puzzle by difficulty
  async getRandomPuzzleByDifficulty(rating: number, deviation = 100) {
    const minRating = Math.max(800, rating - deviation);
    const maxRating = rating + deviation;
    
    const response = await this.getPuzzlesByRating(minRating, maxRating, 1);
    if (response.puzzles && response.puzzles.length > 0) {
      return adaptToLichessPuzzleFormat(response.puzzles[0]);
    }
    throw new Error('No puzzles found at the specified rating');
  }
}

export const chessPuzzlesService = new ChessPuzzlesService();
