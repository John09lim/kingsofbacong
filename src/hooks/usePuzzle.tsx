
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  lichessService, 
  LichessPuzzleData, 
  LichessPuzzleActivity,
  LichessPuzzleReplay,
  LichessPuzzleDashboard,
  LichessPuzzleTheme
} from '@/services/lichessService';
import { lichessApiService } from '@/services/lichessApiService';
import { toast } from "@/hooks/use-toast";
import { useChessApi } from '@/hooks/useChessApi';

interface UsePuzzleOptions {
  puzzleId?: string;
  autoFetch?: boolean;
  theme?: string;
}

export const usePuzzle = (options: UsePuzzleOptions = {}) => {
  const { puzzleId, autoFetch = true, theme } = options;
  const [currentPuzzleId, setCurrentPuzzleId] = useState<string | undefined>(puzzleId);
  const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([]);
  const [userRating, setUserRating] = useState<number>(0); // Starting ELO at 0
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(theme);
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

  // Load solved puzzles from localStorage on initialization
  useEffect(() => {
    const savedPuzzles = localStorage.getItem('solvedPuzzles');
    if (savedPuzzles) {
      setSolvedPuzzles(JSON.parse(savedPuzzles));
    }
    
    const savedRating = localStorage.getItem('puzzleRating');
    if (savedRating) {
      setUserRating(parseInt(savedRating, 10));
    }
  }, []);

  // Fetch a puzzle by ID or theme or get daily puzzle
  const { 
    data: puzzleData, 
    isLoading: isPuzzleLoading, 
    error: puzzleError,
    refetch: refetchPuzzle
  } = useQuery({
    queryKey: ['puzzle', currentPuzzleId, currentTheme, useLiveApi],
    queryFn: async () => {
      try {
        // Try to use the live API first if available
        if (useLiveApi) {
          if (currentPuzzleId) {
            const livePuzzle = await lichessApiService.getPuzzleById(currentPuzzleId);
            if (livePuzzle) return livePuzzle;
          } else {
            const dailyPuzzle = await lichessApiService.getPuzzleOfTheDay();
            if (dailyPuzzle) return dailyPuzzle;
          }
        }
        
        // Fall back to mock service
        if (currentPuzzleId) {
          return await lichessService.getPuzzleById(currentPuzzleId);
        }
        
        if (currentTheme) {
          const themeData = await lichessService.getPuzzlesByTheme(30, currentTheme);
          if (themeData?.replay?.remaining?.length) {
            const randomIndex = Math.floor(Math.random() * themeData.replay.remaining.length);
            const puzzleId = themeData.replay.remaining[randomIndex];
            return await lichessService.getPuzzleById(puzzleId);
          }
        }
        
        return await lichessService.getDailyPuzzle();
      } catch (error) {
        console.error("Error fetching puzzle:", error);
        return null;
      }
    },
    enabled: autoFetch,
    retry: 1,
    refetchOnWindowFocus: false
  });

  // Fetch puzzle dashboard data
  const { 
    data: dashboardData, 
    isLoading: isDashboardLoading 
  } = useQuery({
    queryKey: ['puzzleDashboard', useLiveApi],
    queryFn: async () => {
      if (useLiveApi) {
        const liveDashboard = await lichessApiService.getPuzzleDashboard();
        if (liveDashboard) return liveDashboard;
      }
      return lichessService.getPuzzleDashboard(30);
    },
    enabled: autoFetch,
    refetchOnWindowFocus: false
  });

  // Fetch theme information
  const {
    data: themesData,
    isLoading: isThemesLoading
  } = useQuery({
    queryKey: ['puzzleThemes'],
    queryFn: () => lichessService.getPuzzleThemes(),
    enabled: autoFetch,
    refetchOnWindowFocus: false
  });

  // Fetch puzzles by theme
  const fetchPuzzlesByTheme = useCallback(async (theme: string, days: number = 30) => {
    try {
      const themeData = await lichessService.getPuzzlesByTheme(days, theme);
      setCurrentTheme(theme);
      
      if (themeData?.replay?.remaining?.length) {
        const randomIndex = Math.floor(Math.random() * themeData.replay.remaining.length);
        const puzzleId = themeData.replay.remaining[randomIndex];
        setCurrentPuzzleId(puzzleId);
        return await lichessService.getPuzzleById(puzzleId);
      } else {
        toast({
          title: "No puzzles found",
          description: `No ${theme} puzzles available. Try another theme.`,
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error('Error fetching puzzles by theme:', error);
      toast({
        title: "Error",
        description: `Failed to fetch ${theme} puzzles.`,
        variant: "destructive",
      });
      return null;
    }
  }, []);

  // Fetch next puzzle
  const fetchNextPuzzle = useCallback(async (specificTheme?: string) => {
    try {
      const themeToUse = specificTheme || currentTheme;
      
      if (themeToUse) {
        return fetchPuzzlesByTheme(themeToUse);
      }
      
      const puzzle = await lichessService.getNextPuzzle();
      if (puzzle?.puzzle.id) {
        setCurrentPuzzleId(puzzle.puzzle.id);
      }
      return puzzle;
    } catch (error) {
      console.error('Error fetching next puzzle:', error);
      toast({
        title: "Error",
        description: "Failed to fetch next puzzle.",
        variant: "destructive",
      });
      return null;
    }
  }, [currentTheme, fetchPuzzlesByTheme]);

  // Mark a puzzle as solved or failed
  const markPuzzleSolved = useCallback((puzzleId: string, success: boolean = true) => {
    if (success) {
      // Add puzzle to solved list
      const updatedSolvedPuzzles = [...solvedPuzzles, puzzleId];
      setSolvedPuzzles(updatedSolvedPuzzles);
      localStorage.setItem('solvedPuzzles', JSON.stringify(updatedSolvedPuzzles));
      
      // Calculate ELO points based on difficulty
      const puzzleRating = puzzleData?.puzzle.rating || 1200;
      let eloPoints = 1; // Default for easy puzzles
      
      if (puzzleRating >= 1600 && puzzleRating < 2000) {
        eloPoints = 2; // Intermediate puzzles
      } else if (puzzleRating >= 2000) {
        eloPoints = 3; // Hard puzzles
      }
      
      // Update user rating
      const newRating = userRating + eloPoints;
      setUserRating(newRating);
      localStorage.setItem('puzzleRating', newRating.toString());
      
      toast({
        title: "Puzzle Solved!",
        description: `Rating: +${eloPoints} ELO (${newRating})`,
      });
    } else {
      // No penalty for failed puzzles in this implementation
      toast({
        title: "Puzzle Failed",
        description: "Try again or get a new puzzle.",
        variant: "destructive",
      });
    }
  }, [puzzleData, userRating, solvedPuzzles]);

  // Generate a puzzle by difficulty
  const generatePuzzleByDifficulty = useCallback(async (difficulty: number) => {
    try {
      // Fetch a random puzzle with the closest rating to the requested difficulty
      const puzzle = await lichessService.getRandomPuzzleByRating(difficulty);
      if (puzzle?.puzzle.id) {
        setCurrentPuzzleId(puzzle.puzzle.id);
        return puzzle;
      }
      return null;
    } catch (error) {
      console.error('Error generating puzzle by difficulty:', error);
      toast({
        title: "Error",
        description: "Failed to generate puzzle at the requested difficulty.",
        variant: "destructive",
      });
      return null;
    }
  }, []);

  return {
    puzzleData,
    isPuzzleLoading,
    puzzleError,
    refetchPuzzle,
    dashboardData,
    isDashboardLoading,
    themesData,
    isThemesLoading,
    fetchPuzzlesByTheme,
    fetchNextPuzzle,
    markPuzzleSolved,
    generatePuzzleByDifficulty,
    solvedPuzzles,
    userRating,
    setCurrentPuzzleId,
    currentTheme,
    setCurrentTheme,
    useLiveApi
  };
};
