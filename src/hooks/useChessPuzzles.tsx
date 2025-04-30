
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { chessPuzzlesService, ChessPuzzle, adaptToLichessPuzzleFormat } from '@/services/chessPuzzlesService';
import { toast } from '@/hooks/use-toast';

interface UseChessPuzzlesOptions {
  enabled?: boolean;
}

export const useChessPuzzles = (options: UseChessPuzzlesOptions = {}) => {
  const { enabled = true } = options;
  const [currentPuzzleId, setCurrentPuzzleId] = useState<string>();
  const [currentDifficulty, setCurrentDifficulty] = useState<number>();
  const [currentThemes, setCurrentThemes] = useState<string[]>();

  // Fetch a random puzzle
  const { 
    data: puzzleData, 
    isLoading: isPuzzleLoading,
    error: puzzleError,
    refetch: refetchPuzzle
  } = useQuery({
    queryKey: ['chess-puzzle', currentPuzzleId, currentDifficulty, currentThemes],
    queryFn: async () => {
      try {
        if (currentPuzzleId) {
          // In the future, implement fetching by specific ID if the API supports it
          // For now, just fetch a random puzzle
          return await chessPuzzlesService.getRandomPuzzle();
        } else if (currentDifficulty) {
          return await chessPuzzlesService.getRandomPuzzleByDifficulty(currentDifficulty);
        } else if (currentThemes && currentThemes.length > 0) {
          const response = await chessPuzzlesService.getPuzzlesByThemes(currentThemes, 1);
          if (response.puzzles && response.puzzles.length > 0) {
            return adaptToLichessPuzzleFormat(response.puzzles[0]);
          }
          throw new Error('No puzzles found for the specified themes');
        }
        
        // Default to a random puzzle
        return await chessPuzzlesService.getRandomPuzzle();
      } catch (error) {
        console.error('Error fetching puzzle:', error);
        throw error;
      }
    },
    enabled: enabled,
    retry: 2,
    refetchOnWindowFocus: false
  });

  // Get a list of available themes from a sample puzzle set
  const { 
    data: themesData,
    isLoading: isThemesLoading
  } = useQuery({
    queryKey: ['chess-puzzle-themes'],
    queryFn: async () => {
      try {
        // Get a sample of puzzles to extract themes
        const response = await chessPuzzlesService.getPuzzles({ count: 10 });
        if (!response.puzzles || response.puzzles.length === 0) {
          return [];
        }
        
        // Extract unique themes from all puzzles
        const themeSet = new Set<string>();
        response.puzzles.forEach(puzzle => {
          if (puzzle.themes) {
            puzzle.themes.forEach(theme => themeSet.add(theme));
          }
        });
        
        // Convert to the format expected by the PuzzleThemeSelector component
        return Array.from(themeSet).map(theme => ({
          key: theme,
          name: theme.charAt(0).toUpperCase() + theme.slice(1),
          description: `Puzzles featuring ${theme} tactical patterns.`
        }));
      } catch (error) {
        console.error('Error fetching puzzle themes:', error);
        return [];
      }
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 60, // Cache themes for 1 hour
    refetchOnWindowFocus: false
  });

  // Fetch next puzzle
  const fetchNextPuzzle = useCallback(async () => {
    try {
      setCurrentPuzzleId(undefined);
      setCurrentDifficulty(undefined);
      setCurrentThemes(undefined);
      const result = await refetchPuzzle();
      return result.data;
    } catch (error) {
      console.error('Error fetching next puzzle:', error);
      toast({
        title: "Error",
        description: "Failed to fetch next puzzle.",
        variant: "destructive",
      });
      return null;
    }
  }, [refetchPuzzle]);

  // Fetch puzzles by theme
  const fetchPuzzlesByTheme = useCallback(async (theme: string) => {
    try {
      setCurrentPuzzleId(undefined);
      setCurrentDifficulty(undefined);
      setCurrentThemes([theme]);
      const result = await refetchPuzzle();
      return result.data;
    } catch (error) {
      console.error('Error fetching puzzles by theme:', error);
      toast({
        title: "Error",
        description: `Failed to fetch ${theme} puzzles.`,
        variant: "destructive",
      });
      return null;
    }
  }, [refetchPuzzle]);

  // Generate a puzzle by difficulty
  const generatePuzzleByDifficulty = useCallback(async (difficulty: number) => {
    try {
      setCurrentPuzzleId(undefined);
      setCurrentThemes(undefined);
      setCurrentDifficulty(difficulty);
      const result = await refetchPuzzle();
      return result.data;
    } catch (error) {
      console.error('Error generating puzzle by difficulty:', error);
      toast({
        title: "Error",
        description: "Failed to generate puzzle at the requested difficulty.",
        variant: "destructive",
      });
      return null;
    }
  }, [refetchPuzzle]);

  return {
    puzzleData,
    isPuzzleLoading,
    puzzleError,
    themesData,
    isThemesLoading,
    fetchNextPuzzle,
    fetchPuzzlesByTheme,
    generatePuzzleByDifficulty,
    currentPuzzleId,
    setCurrentPuzzleId,
  };
};
