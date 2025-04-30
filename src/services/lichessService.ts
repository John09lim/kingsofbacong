import { toast } from "@/hooks/use-toast";

// Types for Lichess API responses
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
  color: 'white' | 'black'; // Changed from optional to required
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

// Lichess API service
class LichessService {
  private baseUrl = 'https://lichess.org/api/puzzle';
  private mockPuzzleCache: { [key: string]: LichessPuzzleData } = {};
  private mockThemePuzzles: { [key: string]: string[] } = {};
  
  constructor() {
    // Initialize mock puzzle cache
    this.initMockPuzzles();
  }
  
  // Initialize mock puzzles for various themes
  private initMockPuzzles() {
    const themes = ['fork', 'pin', 'skewer', 'discovery', 'sacrifice', 'mate', 'doubleCheck'];
    
    // Create mock puzzles for each theme
    themes.forEach(theme => {
      const puzzleIDs: string[] = [];
      // Create 10 puzzles for each theme
      for (let i = 1; i <= 10; i++) {
        const id = `mock-${theme}-${i}`;
        puzzleIDs.push(id);
        this.mockPuzzleCache[id] = this.createMockPuzzle(theme, 1000 + (i * 100));
      }
      this.mockThemePuzzles[theme] = puzzleIDs;
    });
  }
  
  // Fetch daily puzzle
  async getDailyPuzzle(): Promise<LichessPuzzleData | null> {
    try {
      // For demo purposes, return a mock puzzle
      return this.createMockPuzzle('mate', 1500);
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
      // Check if we have this puzzle in our mock cache
      if (this.mockPuzzleCache[id]) {
        return this.mockPuzzleCache[id];
      }
      
      // If not in cache, create a new mock puzzle
      const theme = id.split('-')[1] || 'mate';
      const puzzle = this.createMockPuzzle(theme, 1500);
      this.mockPuzzleCache[id] = puzzle;
      return puzzle;
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
    try {
      // Pick a random theme
      const themes = ['fork', 'pin', 'skewer', 'discovery', 'sacrifice', 'mate'];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      
      // Create a unique puzzle ID that's not in our cache
      const id = `mock-${randomTheme}-${Date.now()}`;
      const puzzle = this.createMockPuzzle(randomTheme, Math.floor(Math.random() * 800) + 1200);
      this.mockPuzzleCache[id] = puzzle;
      
      return puzzle;
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
  
  // Get a random puzzle by rating
  async getRandomPuzzleByRating(targetRating: number): Promise<LichessPuzzleData | null> {
    try {
      // Pick a random theme
      const themes = ['fork', 'pin', 'skewer', 'discovery', 'sacrifice', 'mate', 'doubleCheck'];
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      
      // Create a unique puzzle ID
      const id = `mock-${randomTheme}-rating-${targetRating}-${Date.now()}`;
      const puzzle = this.createMockPuzzle(randomTheme, targetRating);
      this.mockPuzzleCache[id] = puzzle;
      
      return puzzle;
    } catch (error) {
      console.error('Error fetching puzzle by rating:', error);
      toast({
        title: "Error",
        description: "Failed to fetch a puzzle at the requested rating. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  }
  
  // Fetch puzzle activity (requires authentication in real implementation)
  async getPuzzleActivity(): Promise<LichessPuzzleActivity | null> {
    // Mock response for demo purposes
    try {
      const puzzle = this.createMockPuzzle('endgame', 1800);
      return {
        date: Date.now(),
        puzzle: puzzle.puzzle,
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
      // If we have mock puzzles for this theme, use those IDs
      const puzzleIDs = this.mockThemePuzzles[theme] || [];
      
      // If no existing puzzles for this theme, create some
      if (puzzleIDs.length === 0) {
        for (let i = 1; i <= 5; i++) {
          const id = `mock-${theme}-${i}`;
          this.mockPuzzleCache[id] = this.createMockPuzzle(theme, 1000 + (i * 100));
          puzzleIDs.push(id);
        }
        this.mockThemePuzzles[theme] = puzzleIDs;
      }
      
      return {
        replay: {
          days: days,
          theme: theme,
          nb: puzzleIDs.length,
          remaining: puzzleIDs
        },
        angle: {
          key: theme,
          name: this.getPrettyThemeName(theme),
          desc: `Puzzles featuring the ${this.getPrettyThemeName(theme)} tactical motif`
        }
      };
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
  
  // Fetch puzzle themes
  async getPuzzleThemes(): Promise<LichessPuzzleTheme[]> {
    try {
      return [
        { key: "fork", name: "Fork", description: "Attack two or more pieces simultaneously" },
        { key: "pin", name: "Pin", description: "Immobilize a piece because moving it would expose a more valuable piece" },
        { key: "skewer", name: "Skewer", description: "Force a valuable piece to move, exposing a less valuable piece behind it" },
        { key: "discovery", name: "Discovered Attack", description: "Move one piece to reveal an attack from another piece behind it" },
        { key: "sacrifice", name: "Sacrifice", description: "Give up material to gain a positional advantage or checkmate" },
        { key: "mate", name: "Checkmate", description: "End the game by attacking the king with no legal escape" },
        { key: "doubleCheck", name: "Double Check", description: "Check with two pieces simultaneously" },
        { key: "endgame", name: "Endgame", description: "Puzzles from endgame positions" },
        { key: "advantage", name: "Winning Material", description: "Gain a material advantage" },
        { key: "defensiveTactics", name: "Defense", description: "Find the defensive resource" }
      ];
    } catch (error) {
      console.error('Error fetching puzzle themes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch puzzle themes. Please try again later.",
        variant: "destructive",
      });
      return [];
    }
  }
  
  // Fetch puzzle dashboard data
  async getPuzzleDashboard(days: number = 30): Promise<LichessPuzzleDashboard | null> {
    try {
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

  // Helper method to create mock puzzles for demonstration
  private createMockPuzzle(theme: string, rating: number): LichessPuzzleData {
    // Generate different positions based on the theme
    let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    let solution: string[] = [];
    
    switch (theme) {
      case 'fork':
        fen = "r2qk2r/ppp2ppp/2n5/3P4/2B1n3/2N5/PP3PPP/R1BQK2R b KQkq - 0 1";
        solution = ["e4c3", "d1c1", "c3a2"];
        break;
      case 'pin':
        fen = "r1bqkbnr/ppp2ppp/2n5/3p4/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1";
        solution = ["f3d4", "c6d4", "d1f3"];
        break;
      case 'skewer':
        fen = "r3k2r/ppp2ppp/2n5/3p4/3P1B2/2P5/PP3PPP/R3K2R b KQkq - 0 1";
        solution = ["c6d4", "f4d6", "e8e1"];
        break;
      case 'discovery':
        fen = "r1bqk2r/ppp2ppp/2n5/3p4/3P1n2/2N1P3/PPP2PPP/R1BQK2R b KQkq - 0 1";
        solution = ["f4e2", "c1e3", "e2c3"];
        break;
      case 'sacrifice':
        fen = "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 1";
        solution = ["f3e5", "c6e5", "d2d4"];
        break;
      case 'mate':
        fen = "r1bqkbnr/ppp2ppp/2n5/3pp3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1";
        solution = ["f3e5", "d5e4", "d1h5", "g7g6", "h5e5"];
        break;
      case 'doubleCheck':
        fen = "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 1";
        solution = ["f3g5", "h7h6", "g5f7", "e8f7", "d1h5"];
        break;
      default:
        // Default tactical position
        fen = "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 1";
        solution = ["f3e5", "c6e5", "d2d4"];
    }
    
    // Generate a unique ID based on theme and timestamp
    const id = `mock-${theme}-${Date.now()}`;
    
    return {
      puzzle: {
        id: id,
        initialPly: 1,
        plays: Math.floor(Math.random() * 1000) + 100,
        rating: rating,
        solution: solution,
        themes: [theme, Math.random() > 0.5 ? 'short' : 'long'],
        fen: fen,
        lastMove: solution[0],
        color: Math.random() > 0.5 ? 'white' : 'black' // This is now a required property
      },
      game: {
        id: `game-${Date.now()}`,
        clock: "5+0",
        perf: {
          key: "rapid",
          name: "Rapid"
        },
        pgn: "1. e4 e5 2. Nf3 Nc6",
        rated: true,
        players: [
          {
            color: "white",
            id: "white-player",
            name: "ChessMaster",
            rating: Math.floor(Math.random() * 400) + 1800
          },
          {
            color: "black",
            id: "black-player",
            name: "TacticalGenius",
            rating: Math.floor(Math.random() * 400) + 1800
          }
        ]
      }
    };
  }
  
  // Helper method to convert theme key to display name
  private getPrettyThemeName(theme: string): string {
    const themeMap: { [key: string]: string } = {
      'fork': 'Fork',
      'pin': 'Pin',
      'skewer': 'Skewer',
      'discovery': 'Discovered Attack',
      'sacrifice': 'Sacrifice',
      'mate': 'Checkmate',
      'doubleCheck': 'Double Check',
      'endgame': 'Endgame',
      'opening': 'Opening',
      'middlegame': 'Middlegame',
      'advantage': 'Winning Material',
      'defensiveTactics': 'Defense'
    };
    
    return themeMap[theme] || theme.charAt(0).toUpperCase() + theme.slice(1);
  }
}

export const lichessService = new LichessService();
