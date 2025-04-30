
/**
 * Utility functions for chess puzzles
 */

// Determine puzzle difficulty label based on rating
export const getPuzzleDifficultyLabel = (rating?: number): string => {
  if (!rating) return "Unknown";
  if (rating < 1400) return "Easy";
  if (rating < 2000) return "Intermediate";
  return "Hard";
};

// Get ELO points based on difficulty
export const getEloPoints = (rating?: number): string => {
  if (!rating) return "1";
  if (rating < 1400) return "1";
  if (rating < 2000) return "2";
  return "3";
};

// Get turn text based on playerTurn value
export const getTurnText = (turn?: string): string => {
  if (!turn) return "White to Play";
  return turn === 'b' ? "Black to Play" : "White to Play";
};

// Get turn text based on playerTurn value and reversed mode
export const getEffectiveTurnText = (turn?: string, isReversed: boolean = false): string => {
  if (isReversed) {
    return "Your Turn to Attack";
  }
  return getTurnText(turn);
};

// Reverse the player's turn if needed
export const getEffectivePlayerTurn = (playerTurn?: string, isReversed: boolean = false): string => {
  if (!playerTurn) return 'w';
  return isReversed ? (playerTurn === 'w' ? 'b' : 'w') : playerTurn;
};

// Get effective solution for puzzles
// In standard mode, return the full solution
// In reversed mode, only return the opponent's correct responses, not all moves
export const getEffectiveSolution = (solution?: string[], isReversed: boolean = false): string[] => {
  if (!solution || solution.length === 0) return [];
  
  if (!isReversed) {
    // Standard puzzle mode - return full solution
    return solution;
  } else {
    // In reversed mode, we need to create a modified solution 
    // that represents the opponent's correct responses
    
    // Take every second move from the solution array
    // These are the moves the computer will make in response to user moves
    const reversedSolution = [];
    for (let i = 0; i < solution.length; i += 2) {
      // Skip the first move as that would be the user's move in normal mode
      if (i === 0) continue;
      reversedSolution.push(solution[i]);
    }
    
    return reversedSolution;
  }
};
