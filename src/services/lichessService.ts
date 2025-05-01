
import axios from 'axios';

export interface LichessUser {
  id: string;
  name: string;
  title?: string;
  rating: number;
  username: string;
}

export interface LichessPuzzle {
  id: string;
  fen: string;
  rating: number;
  plays: number;
  initialPly: number;
  solution: string[];
  themes: string[];
  playerTurn: 'w' | 'b';
  color?: string; // Make color optional to fix the type error
}

export interface LichessPuzzleDashboard {
  today: {
    perf: {
      key: string;
      name: string;
    };
    user: {
      rating: number;
      progress: number;
    };
    puzzles: number;
    time: number;
  };
  global: {
    firstWins: number;
    nb: number;
    wins: number;
    streak: number;
    fastest: {
      seconds: number;
    };
  };
}

export interface LichessPuzzleThemes {
  key: string;
  name: string;
  description: string;
}

export interface LichessPuzzleData {
  puzzle: LichessPuzzle;
  game: {
    id: string;
    perf: {
      key: string;
      name: string;
    };
    players: {
      white: LichessUser;
      black: LichessUser;
    };
    clock: string;
    rated: boolean;
    pgn: string;
  };
}

export interface LichessThemeData {
  replay: {
    all: string[];
    newly: string[];
    remaining: string[];
  };
}

const API_BASE_URL = 'https://lichess.org/api/puzzle';
const MOCK_API_BASE_URL = '/data';

export const lichessService = {
  getDailyPuzzle: async (): Promise<LichessPuzzleData | null> => {
    try {
      const response = await axios.get<LichessPuzzleData>(`${MOCK_API_BASE_URL}/daily-puzzle.json`);
      return response.data;
    } catch (error) {
      console.error("Error fetching daily puzzle:", error);
      return null;
    }
  },

  getPuzzleById: async (puzzleId: string): Promise<LichessPuzzleData | null> => {
    try {
      const response = await axios.get<LichessPuzzleData>(`${MOCK_API_BASE_URL}/puzzle-${puzzleId}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching puzzle with ID ${puzzleId}:`, error);
      return null;
    }
  },

  getPuzzleDashboard: async (nb: number = 30): Promise<LichessPuzzleDashboard | null> => {
    try {
      const response = await axios.get<LichessPuzzleDashboard>(`${MOCK_API_BASE_URL}/puzzle-dashboard.json`);
      return response.data;
    } catch (error) {
      console.error("Error fetching puzzle dashboard:", error);
      return null;
    }
  },

  getPuzzleThemes: async (): Promise<LichessPuzzleThemes[]> => {
    try {
      const response = await axios.get<LichessPuzzleThemes[]>(`${MOCK_API_BASE_URL}/puzzle-themes.json`);
      return response.data;
    } catch (error) {
      console.error("Error fetching puzzle themes:", error);
      return [];
    }
  },

  getPuzzlesByTheme: async (nb: number, theme: string): Promise<LichessThemeData | null> => {
    try {
      const response = await axios.get<LichessThemeData>(`${MOCK_API_BASE_URL}/theme-${theme}.json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching puzzles by theme ${theme}:`, error);
      return null;
    }
  },
  
  createMockPuzzle: () => {
    return {
      puzzle: {
        id: "mock123",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        rating: 1500,
        plays: 100,
        initialPly: 0,
        solution: ["e2e4", "e7e5", "g1f3"],
        themes: ["opening", "middlegame"],
        playerTurn: "w",
        color: "white" // Add the color property
      },
      game: {
        id: "mockGame",
        perf: { key: "rapid", name: "Rapid" },
        players: {
          white: { id: "player1", name: "Player1", rating: 1600, username: "player1" },
          black: { id: "player2", name: "Player2", rating: 1550, username: "player2" }
        },
        clock: "5+3",
        rated: true,
        pgn: "1. e4 e5 2. Nf3"
      }
    };
  },
  
  // Add these new methods to fix the build errors
  getNextPuzzle: async (): Promise<LichessPuzzleData | null> => {
    try {
      // For mock purposes, just return the daily puzzle
      return await lichessService.getDailyPuzzle();
    } catch (error) {
      console.error("Error fetching next puzzle:", error);
      return null;
    }
  },
  
  getRandomPuzzleByRating: async (rating: number): Promise<LichessPuzzleData | null> => {
    try {
      // Mock implementation that returns the daily puzzle with adjusted rating
      const puzzle = await lichessService.getDailyPuzzle();
      if (puzzle) {
        return {
          ...puzzle,
          puzzle: {
            ...puzzle.puzzle,
            rating: rating
          }
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching puzzle with rating ${rating}:`, error);
      return null;
    }
  }
};
