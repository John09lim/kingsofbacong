
import { useState } from 'react';
import { LichessPuzzleData } from '@/services/lichessService';
import { usePuzzleApiSelector } from './usePuzzleApiSelector';
import { usePuzzleProgress } from './usePuzzleProgress';
import { usePuzzleFetcher } from './usePuzzleFetcher';
import { usePuzzleThemeOperations } from './usePuzzleThemeOperations';
import { usePuzzleDifficultyOperations } from './usePuzzleDifficultyOperations';

interface UsePuzzleOptions {
  puzzleId?: string;
  autoFetch?: boolean;
  theme?: string;
}

export const usePuzzle = (options: UsePuzzleOptions = {}) => {
  const { puzzleId, autoFetch = true, theme } = options;
  
  // Get API selection
  const { useLiveApi } = usePuzzleApiSelector();
  
  // User progress tracking
  const { solvedPuzzles, userRating, markPuzzleSolved } = usePuzzleProgress();
  
  // Basic puzzle data fetching
  const { 
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
  } = usePuzzleFetcher({
    puzzleId,
    autoFetch,
    theme,
    useLiveApi
  });
  
  // Theme-based puzzle operations
  const { fetchPuzzlesByTheme, fetchNextPuzzle } = usePuzzleThemeOperations({
    setCurrentPuzzleId,
    currentTheme,
    setCurrentTheme,
    useLiveApi
  });
  
  // Difficulty-based puzzle operations
  const { generatePuzzleByDifficulty } = usePuzzleDifficultyOperations({
    setCurrentPuzzleId,
    useLiveApi
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
