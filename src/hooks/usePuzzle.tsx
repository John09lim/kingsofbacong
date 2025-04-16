
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
  const [userRating, setUserRating] = useState<number>(1200);
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(theme);

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

  // Fetch a puzzle by ID
  const { 
    data: puzzleData, 
    isLoading: isPuzzleLoading, 
    error: puzzleError,
    refetch: refetchPuzzle
  } = useQuery({
    queryKey: ['puzzle', currentPuzzleId, currentTheme],
    queryFn: async () => {
      if (currentPuzzleId) {
        return lichessService.getPuzzleById(currentPuzzleId);
      }
      
      if (currentTheme) {
        const themeData = await lichessService.getPuzzlesByTheme(30, currentTheme);
        if (themeData?.replay?.remaining?.length) {
          const randomIndex = Math.floor(Math.random() * themeData.replay.remaining.length);
          const puzzleId = themeData.replay.remaining[randomIndex];
          return lichessService.getPuzzleById(puzzleId);
        }
      }
      
      return lichessService.getDailyPuzzle();
    },
    enabled: autoFetch,
  });

  // Fetch puzzle dashboard data
  const { 
    data: dashboardData, 
    isLoading: isDashboardLoading 
  } = useQuery({
    queryKey: ['puzzleDashboard'],
    queryFn: () => lichessService.getPuzzleDashboard(30),
    enabled: autoFetch,
  });

  // Fetch theme information
  const {
    data: themesData,
    isLoading: isThemesLoading
  } = useQuery({
    queryKey: ['puzzleThemes'],
    queryFn: () => lichessService.getPuzzleThemes(),
    enabled: autoFetch,
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
        return lichessService.getPuzzleById(puzzleId);
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

  // Mark a puzzle as solved
  const markPuzzleSolved = useCallback((puzzleId: string, success: boolean = true) => {
    if (success) {
      const updatedSolvedPuzzles = [...solvedPuzzles, puzzleId];
      setSolvedPuzzles(updatedSolvedPuzzles);
      localStorage.setItem('solvedPuzzles', JSON.stringify(updatedSolvedPuzzles));
      
      // Simple rating adjustment simulation
      const puzzleRating = puzzleData?.puzzle.rating || 1200;
      const ratingDiff = Math.max(10, Math.floor((puzzleRating - userRating) / 20));
      const newRating = userRating + ratingDiff;
      setUserRating(newRating);
      localStorage.setItem('puzzleRating', newRating.toString());
      
      toast({
        title: "Puzzle Solved!",
        description: `Rating: +${ratingDiff} (${newRating})`,
      });
    } else {
      // Failed attempt
      const puzzleRating = puzzleData?.puzzle.rating || 1200;
      const ratingDiff = Math.max(5, Math.floor((userRating - puzzleRating) / 30));
      const newRating = userRating - ratingDiff;
      setUserRating(newRating);
      localStorage.setItem('puzzleRating', newRating.toString());
      
      toast({
        title: "Puzzle Failed",
        description: `Rating: -${ratingDiff} (${newRating})`,
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
    setCurrentTheme
  };
};
