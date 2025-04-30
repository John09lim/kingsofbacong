
import { useState, useCallback, useEffect } from 'react';
import { LichessPuzzleData } from '@/services/lichessService';
import { saveSolvedPuzzles, saveUserRating, loadSolvedPuzzles, loadUserRating, calculateEloPoints, showPuzzleResultToast } from '@/utils/puzzleHookUtils';

export const usePuzzleProgress = () => {
  const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([]);
  const [userRating, setUserRating] = useState<number>(0);

  // Load solved puzzles from localStorage on initialization
  useEffect(() => {
    setSolvedPuzzles(loadSolvedPuzzles());
    setUserRating(loadUserRating());
  }, []);

  // Mark a puzzle as solved or failed
  const markPuzzleSolved = useCallback((puzzleId: string, puzzleData?: LichessPuzzleData, success: boolean = true) => {
    if (success) {
      // Add puzzle to solved list
      const updatedSolvedPuzzles = [...solvedPuzzles, puzzleId];
      setSolvedPuzzles(updatedSolvedPuzzles);
      saveSolvedPuzzles(updatedSolvedPuzzles);
      
      // Calculate ELO points based on difficulty
      const puzzleRating = puzzleData?.puzzle.rating || 1200;
      const eloPoints = calculateEloPoints(puzzleRating);
      
      // Update user rating
      const newRating = userRating + eloPoints;
      setUserRating(newRating);
      saveUserRating(newRating);
      
      showPuzzleResultToast(true, newRating, eloPoints);
    } else {
      // No penalty for failed puzzles in this implementation
      showPuzzleResultToast(false);
    }
  }, [solvedPuzzles, userRating]);

  return {
    solvedPuzzles,
    userRating,
    markPuzzleSolved
  };
};
