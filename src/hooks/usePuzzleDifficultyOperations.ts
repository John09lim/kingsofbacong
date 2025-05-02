
import { useCallback } from 'react';
import { 
  LichessPuzzleData,
  lichessService
} from '@/services/lichessService';
import { lichessApiService } from '@/services/lichessApiService';
import { showErrorToast } from '@/utils/puzzleHookUtils';

interface UsePuzzleDifficultyOperationsProps {
  setCurrentPuzzleId: (id: string) => void;
  useLiveApi: boolean;
}

export const usePuzzleDifficultyOperations = ({
  setCurrentPuzzleId,
  useLiveApi
}: UsePuzzleDifficultyOperationsProps) => {
  
  // Generate a puzzle by difficulty
  const generatePuzzleByDifficulty = useCallback(async (difficulty: number) => {
    try {
      if (useLiveApi) {
        // Get puzzles by rating range from live API
        const min = Math.max(difficulty - 100, 500);
        const max = difficulty + 100;
        const puzzles = await lichessApiService.getPuzzlesByRating(min, max, 5);
        
        if (puzzles && puzzles.length > 0) {
          // Pick a random puzzle from the batch
          const randomIndex = Math.floor(Math.random() * puzzles.length);
          const puzzleId = puzzles[randomIndex].id;
          setCurrentPuzzleId(puzzleId);
          
          // Get puzzle and ensure it matches the expected format
          const puzzleData = await lichessApiService.getPuzzleById(puzzleId);
          
          // Transform the data if needed to match LichessPuzzleData structure
          return puzzleData;
        }
      }
      
      // Fall back to mock service
      const puzzle = await lichessService.getRandomPuzzleByRating(difficulty);
      if (puzzle?.puzzle.id) {
        setCurrentPuzzleId(puzzle.puzzle.id);
        return puzzle;
      }
      return null;
    } catch (error) {
      console.error('Error generating puzzle by difficulty:', error);
      showErrorToast("Failed to generate puzzle at the requested difficulty.");
      return null;
    }
  }, [useLiveApi, setCurrentPuzzleId]);

  return {
    generatePuzzleByDifficulty
  };
};
