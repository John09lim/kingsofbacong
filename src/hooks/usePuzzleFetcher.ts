
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  LichessPuzzleData,
  lichessService,
  LichessPuzzleThemes
} from '@/services/lichessService';
import { lichessApiService } from '@/services/lichessApiService';
import { showErrorToast } from '@/utils/puzzleHookUtils';

interface UsePuzzleFetcherOptions {
  puzzleId?: string;
  autoFetch?: boolean;
  theme?: string;
  useLiveApi: boolean;
}

export const usePuzzleFetcher = (options: UsePuzzleFetcherOptions) => {
  const { puzzleId, autoFetch = true, theme, useLiveApi } = options;
  const [currentPuzzleId, setCurrentPuzzleId] = useState<string | undefined>(puzzleId);
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(theme);

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
        // Always try to use the live API first if available
        if (useLiveApi) {
          console.log("Using live Lichess API");
          if (currentPuzzleId) {
            console.log(`Fetching puzzle by ID: ${currentPuzzleId}`);
            const livePuzzle = await lichessApiService.getPuzzleById(currentPuzzleId);
            if (livePuzzle) return livePuzzle;
          } else if (currentTheme) {
            console.log(`Fetching puzzles by theme: ${currentTheme}`);
            // Get a batch of puzzles by theme
            const themePuzzles = await lichessApiService.getPuzzlesByTheme([currentTheme], 5);
            if (themePuzzles && themePuzzles.length > 0) {
              // Pick a random puzzle from the batch
              const randomIndex = Math.floor(Math.random() * themePuzzles.length);
              const puzzleId = themePuzzles[randomIndex].id;
              console.log(`Selected random puzzle ID: ${puzzleId}`);
              return await lichessApiService.getPuzzleById(puzzleId);
            }
          } else {
            console.log("Fetching puzzle of the day");
            const dailyPuzzle = await lichessApiService.getPuzzleOfTheDay();
            if (dailyPuzzle) return dailyPuzzle;
            
            // If no daily puzzle, try a random puzzle
            console.log("Fetching random puzzle as fallback");
            const randomPuzzle = await lichessApiService.getRandomPuzzle();
            if (randomPuzzle) return randomPuzzle;
          }
        }
        
        // Fall back to mock service
        console.log("Falling back to mock Lichess service");
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

  return {
    puzzleData,
    isPuzzleLoading,
    puzzleError,
    refetchPuzzle,
    dashboardData,
    isDashboardLoading,
    themesData,
    isThemesLoading,
    currentPuzzleId,
    setCurrentPuzzleId,
    currentTheme,
    setCurrentTheme
  };
};
