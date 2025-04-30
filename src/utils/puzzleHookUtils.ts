
import { toast } from "@/hooks/use-toast";
import { LichessPuzzleData } from "@/services/lichessService";

// Helper function to save solved puzzles to localStorage
export const saveSolvedPuzzles = (puzzles: string[]): void => {
  localStorage.setItem('solvedPuzzles', JSON.stringify(puzzles));
};

// Helper function to save user rating to localStorage
export const saveUserRating = (rating: number): void => {
  localStorage.setItem('puzzleRating', rating.toString());
};

// Helper function to load solved puzzles from localStorage
export const loadSolvedPuzzles = (): string[] => {
  const savedPuzzles = localStorage.getItem('solvedPuzzles');
  return savedPuzzles ? JSON.parse(savedPuzzles) : [];
};

// Helper function to load user rating from localStorage
export const loadUserRating = (): number => {
  const savedRating = localStorage.getItem('puzzleRating');
  return savedRating ? parseInt(savedRating, 10) : 0;
};

// Helper function to calculate ELO points based on puzzle difficulty
export const calculateEloPoints = (puzzleRating: number): number => {
  if (puzzleRating >= 2000) return 3; // Hard puzzles
  if (puzzleRating >= 1600) return 2; // Intermediate puzzles
  return 1; // Easy puzzles
};

// Show toast for puzzle results
export const showPuzzleResultToast = (success: boolean, newRating?: number, eloPoints?: number): void => {
  if (success) {
    toast({
      title: "Puzzle Solved!",
      description: `Rating: +${eloPoints} ELO (${newRating})`,
    });
  } else {
    toast({
      title: "Puzzle Failed",
      description: "Try again or get a new puzzle.",
      variant: "destructive",
    });
  }
};

// Show error toast
export const showErrorToast = (errorMessage: string): void => {
  toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive",
  });
};
