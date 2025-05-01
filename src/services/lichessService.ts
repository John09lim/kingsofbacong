
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
