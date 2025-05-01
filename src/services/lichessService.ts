
// Add this file if it doesn't exist or update the existing one
export interface LichessUser {
  name?: string;
  username?: string;
  title?: string;
  rating?: number;
}

export interface LichessPuzzleData {
  puzzle: {
    id: string;
    fen: string;
    rating: number;
    themes: string[];
    solution: string[];
    plays: number;
    initialPly: number;
    playerTurn: 'w' | 'b';
    color?: string;
  };
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

export interface LichessPuzzleThemes {
  themes: { [key: string]: string };
  categories: { [key: string]: string[] };
}

// Mock Lichess service implementation
const puzzles = [
  // Some puzzle data here...
];

export const lichessService = {
  getDailyPuzzle: async (): Promise<LichessPuzzleData> => {
    return {
      puzzle: {
        id: "daily001",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
        rating: 1500,
        themes: ["opening", "advantage"],
        solution: ["d2d4"],
        plays: 1000,
        initialPly: 7,
        playerTurn: "w"
      },
      game: {
        id: "game001",
        perf: { key: "rapid", name: "Rapid" },
        players: {
          white: { name: "Player1", rating: 1600 },
          black: { name: "Player2", rating: 1550 }
        },
        clock: "10+0",
        rated: true,
        pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6"
      }
    };
  },
  
  getRandomPuzzle: async (): Promise<LichessPuzzleData> => {
    return {
      puzzle: {
        id: "random001",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
        rating: 1600,
        themes: ["middlegame", "tactics"],
        solution: ["d2d4"],
        plays: 800,
        initialPly: 12,
        playerTurn: "w"
      },
      game: {
        id: "game002",
        perf: { key: "rapid", name: "Rapid" },
        players: {
          white: { name: "Player3", rating: 1650 },
          black: { name: "Player4", rating: 1630 }
        },
        clock: "5+3",
        rated: true,
        pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6"
      }
    };
  },
  
  getPuzzleById: async (id: string): Promise<LichessPuzzleData> => {
    return {
      puzzle: {
        id: id,
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
        rating: 1500,
        themes: ["opening", "advantage"],
        solution: ["d2d4"],
        plays: 1000,
        initialPly: 7,
        playerTurn: "w"
      },
      game: {
        id: "game001",
        perf: { key: "rapid", name: "Rapid" },
        players: {
          white: { name: "Player1", rating: 1600 },
          black: { name: "Player2", rating: 1550 }
        },
        clock: "10+0",
        rated: true,
        pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6"
      }
    };
  },
  
  getRandomPuzzleByRating: async (rating: number): Promise<LichessPuzzleData> => {
    return {
      puzzle: {
        id: `rating${rating}`,
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
        rating: rating,
        themes: ["opening", "advantage"],
        solution: ["d2d4"],
        plays: 1000,
        initialPly: 7,
        playerTurn: "w"
      },
      game: {
        id: "game001",
        perf: { key: "rapid", name: "Rapid" },
        players: {
          white: { name: "Player1", rating: 1600 },
          black: { name: "Player2", rating: 1550 }
        },
        clock: "10+0",
        rated: true,
        pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6"
      }
    };
  },
  
  getPuzzlesByTheme: async (count: number, theme: string) => {
    return {
      replay: {
        remaining: ["theme001", "theme002", "theme003"]
      }
    };
  },
  
  getNextPuzzle: async (): Promise<LichessPuzzleData> => {
    return {
      puzzle: {
        id: "next001",
        fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
        rating: 1700,
        themes: ["endgame", "mate"],
        solution: ["d2d4"],
        plays: 1200,
        initialPly: 9,
        playerTurn: "w"
      },
      game: {
        id: "game003",
        perf: { key: "rapid", name: "Rapid" },
        players: {
          white: { name: "Player5", rating: 1700 },
          black: { name: "Player6", rating: 1680 }
        },
        clock: "3+2",
        rated: true,
        pgn: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6"
      }
    };
  },
  
  getPuzzleDashboard: async (count: number) => {
    return {
      history: [],
      stats: {
        total: 1000,
        solved: 750,
        failed: 250,
        averageRating: 1600
      }
    };
  },
  
  getPuzzleThemes: async (): Promise<LichessPuzzleThemes> => {
    return {
      themes: {
        "mate": "Checkmate Pattern",
        "fork": "Fork",
        "pin": "Pin",
        "discovery": "Discovered Attack"
      },
      categories: {
        "basics": ["mate", "fork", "pin"],
        "intermediate": ["discovery", "sacrifice"]
      }
    };
  }
};
