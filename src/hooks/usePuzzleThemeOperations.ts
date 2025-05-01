
import { useCallback } from 'react';
import { 
  LichessPuzzleData,
  lichessService
} from '@/services/lichessService';
import { lichessApiService } from '@/services/lichessApiService';
import { toast } from "@/hooks/use-toast";
import { showErrorToast } from '@/utils/puzzleHookUtils';

interface UsePuzzleThemeOperationsProps {
  setCurrentPuzzleId: (id: string) => void;
  currentTheme: string | undefined;
  setCurrentTheme: (theme: string) => void;
  useLiveApi: boolean;
}

export const usePuzzleThemeOperations = ({
  setCurrentPuzzleId,
  currentTheme,
  setCurrentTheme,
  useLiveApi
}: UsePuzzleThemeOperationsProps) => {
  
  // Fetch puzzles by theme
  const fetchPuzzlesByTheme = useCallback(async (theme: string) => {
    try {
      setCurrentTheme(theme);
      
      if (useLiveApi) {
        // Get puzzles by theme from live API
        const themePuzzles = await lichessApiService.getPuzzlesByTheme([theme], 5);
        if (themePuzzles && themePuzzles.length > 0) {
          // Pick a random puzzle from the batch
          const randomIndex = Math.floor(Math.random() * themePuzzles.length);
          const puzzleId = themePuzzles[randomIndex].id;
          setCurrentPuzzleId(puzzleId);
          return await lichessApiService.getPuzzleById(puzzleId);
        }
      }
      
      // Fall back to mock service
      const themeData = await lichessService.getPuzzlesByTheme(30, theme);
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
      showErrorToast(`Failed to fetch ${theme} puzzles.`);
      return null;
    }
  }, [useLiveApi, setCurrentTheme, setCurrentPuzzleId]);

  // Fetch next puzzle
  const fetchNextPuzzle = useCallback(async (specificTheme?: string) => {
    try {
      const themeToUse = specificTheme || currentTheme;
      
      if (themeToUse) {
        return fetchPuzzlesByTheme(themeToUse);
      }
      
      if (useLiveApi) {
        // Get a random puzzle from live API
        const randomPuzzle = await lichessApiService.getRandomPuzzle();
        if (randomPuzzle?.puzzle.id) {
          setCurrentPuzzleId(randomPuzzle.puzzle.id);
          return randomPuzzle;
        }
      }
      
      // Fall back to mock service
      const puzzle = await lichessService.getNextPuzzle();
      if (puzzle?.puzzle.id) {
        setCurrentPuzzleId(puzzle.puzzle.id);
      }
      return puzzle;
    } catch (error) {
      console.error('Error fetching next puzzle:', error);
      showErrorToast("Failed to fetch next puzzle.");
      return null;
    }
  }, [currentTheme, fetchPuzzlesByTheme, useLiveApi, setCurrentPuzzleId]);

  return {
    fetchPuzzlesByTheme,
    fetchNextPuzzle
  };
};
