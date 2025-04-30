
// Types for puzzle data
export interface LichessPlayer {
  color: string;
  id?: string;
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
  fen: string;
  lastMove?: string;
  playerTurn?: 'w' | 'b';
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

export interface LichessPuzzleTheme {
  key: string;
  name: string;
  description: string;
}

// Empty service class for compatibility
class LichessService {
  // Empty implementation - we'll use ChessPuzzlesService instead
}

export const lichessService = new LichessService();
