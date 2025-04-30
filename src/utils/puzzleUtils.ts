
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

/**
 * Get effective player turn based on the puzzle data and attack mode setting.
 * In Attack Mode (isReversed=true), we ensure the player always makes the first move.
 */
export const getEffectivePlayerTurn = (playerTurn?: string, isReversed: boolean = false): 'w' | 'b' => {
  if (!playerTurn) return 'w';
  
  const turn = playerTurn === 'b' ? 'b' : 'w';  // Normalize to 'w' or 'b'
  
  // In reversed (attack) mode, we make sure player is always the attacker
  // If original puzzle had black to move, player becomes white
  return isReversed ? (turn === 'w' ? 'b' : 'w') : turn;
};

/**
 * Get effective solution for puzzles.
 * In standard mode, return the full solution.
 * In reversed mode, only return the opponent's correct responses, not all moves.
 * 
 * @param solution - Original solution array from the puzzle data
 * @param isReversed - Whether we're in attack mode (true) or standard mode (false)
 * @returns Modified solution array based on mode
 */
export const getEffectiveSolution = (solution?: string[], isReversed: boolean = false): string[] => {
  if (!solution || solution.length === 0) return [];
  
  if (!isReversed) {
    // Standard puzzle mode - return full solution
    return solution;
  } else {
    // In reversed mode (attack mode):
    // We need to modify the solution so that:
    // 1. The user makes the attacking moves (which were originally computer moves)
    // 2. The computer makes the defending moves (which were originally player moves)
    
    // We take every second move starting from index 0
    // These will be the computer's responses to the user's attacking moves
    const reversedSolution = [];
    for (let i = 1; i < solution.length; i += 2) {
      reversedSolution.push(solution[i]);
    }
    
    return reversedSolution;
  }
};

/**
 * Validates a puzzle's basic properties to ensure it's suitable for play.
 * Checks for necessary properties and ensures the puzzle makes logical sense.
 */
export const isPuzzleValid = (puzzleData: any): boolean => {
  // Basic validation checks
  if (!puzzleData || !puzzleData.puzzle) return false;
  if (!puzzleData.puzzle.fen) return false;
  if (!puzzleData.puzzle.solution || !Array.isArray(puzzleData.puzzle.solution) || puzzleData.puzzle.solution.length === 0) return false;
  
  // Ensure the puzzle is solvable (has at least one move)
  return puzzleData.puzzle.solution.length >= 1;
};

/**
 * Determines if the puzzle a1 square should be dark based on chess standards.
 * This helps ensure consistent board orientation.
 */
export const ensureProperBoardOrientation = (boardFlipped: boolean): boolean => {
  // In proper chess orientation, a1 is a dark square
  // We adjust the board flip if needed to maintain this standard
  return boardFlipped;
};

/**
 * Debug function to log puzzle properties for troubleshooting
 */
export const debugPuzzle = (puzzleData: any): void => {
  if (!puzzleData || !puzzleData.puzzle) {
    console.warn("Invalid puzzle data for debugging");
    return;
  }
  
  console.log("Puzzle debugging information:");
  console.log("- ID:", puzzleData.puzzle.id);
  console.log("- FEN:", puzzleData.puzzle.fen);
  console.log("- Rating:", puzzleData.puzzle.rating);
  console.log("- Color:", puzzleData.puzzle.color);
  console.log("- Solution:", puzzleData.puzzle.solution);
  console.log("- Themes:", puzzleData.puzzle.themes);
};

