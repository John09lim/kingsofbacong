
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  lichessService, 
  LichessPuzzleData, 
  LichessPuzzleActivity,
  LichessPuzzleReplay,
  LichessPuzzleDashboard 
} from '@/services/lichessService';
import { toast } from "@/hooks/use-toast";

interface UsePuzzleOptions {
  puzzleId?: string;
  autoFetch?: boolean;
}

export const usePuzzle = (options: UsePuzzleOptions = {}) => {
  const { puzzleId, autoFetch = true } = options;
  const [currentPuzzleId, setCurrentPuzzleId] = useState<string | undefined>(puzzleId);
  const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([]);
  const [userRating, setUserRating] = useState<number>(1200);

  // Fetch a puzzle by ID
  const { 
    data: puzzleData, 
    isLoading: isPuzzleLoading, 
    error: puzzleError,
    refetch: refetchPuzzle
  } = useQuery({
    queryKey: ['puzzle', currentPuzzleId],
    queryFn: () => currentPuzzleId 
      ? lichessService.getPuzzleById(currentPuzzleId)
      : lichessService.getDailyPuzzle(),
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

  // Fetch puzzles by theme
  const fetchPuzzlesByTheme = useCallback(async (theme: string, days: number = 30) => {
    try {
      return await lichessService.getPuzzlesByTheme(days, theme);
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
  const fetchNextPuzzle = useCallback(async () => {
    try {
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
  }, []);

  // Mark a puzzle as solved
  const markPuzzleSolved = useCallback((puzzleId: string, success: boolean = true) => {
    if (success) {
      setSolvedPuzzles(prev => [...prev, puzzleId]);
      
      // Simple rating adjustment simulation
      const puzzleRating = puzzleData?.puzzle.rating || 1200;
      const ratingDiff = Math.max(10, Math.floor((puzzleRating - userRating) / 20));
      setUserRating(prev => prev + ratingDiff);
      
      toast({
        title: "Puzzle Solved!",
        description: `Rating: +${ratingDiff} (${userRating + ratingDiff})`,
      });
    } else {
      // Failed attempt
      const puzzleRating = puzzleData?.puzzle.rating || 1200;
      const ratingDiff = Math.max(5, Math.floor((userRating - puzzleRating) / 30));
      setUserRating(prev => prev - ratingDiff);
      
      toast({
        title: "Puzzle Failed",
        description: `Rating: -${ratingDiff} (${userRating - ratingDiff})`,
        variant: "destructive",
      });
    }
  }, [puzzleData, userRating]);

  return {
    puzzleData,
    isPuzzleLoading,
    puzzleError,
    refetchPuzzle,
    dashboardData,
    isDashboardLoading,
    fetchPuzzlesByTheme,
    fetchNextPuzzle,
    markPuzzleSolved,
    solvedPuzzles,
    userRating,
    setCurrentPuzzleId
  };
};
