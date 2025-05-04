
// Utility functions for the chess board

// Parse FEN to board representation
export const parseFen = (fen: string) => {
  try {
    const [boardPart] = fen.split(' ');
    const rows = boardPart.split('/');
    
    const board: Array<Array<string>> = [];
    
    for (let i = 0; i < 8; i++) {
      const row: Array<string> = [];
      let j = 0;
      
      for (const char of rows[i]) {
        if (/\d/.test(char)) {
          // If it's a number, add empty squares
          const emptyCount = parseInt(char);
          for (let k = 0; k < emptyCount; k++) {
            row.push('');
            j++;
          }
        } else {
          // If it's a piece
          row.push(char);
          j++;
        }
      }
      
      board.push(row);
    }
    
    return board;
  } catch (error) {
    console.error("Error parsing FEN:", error);
    // Return empty board as fallback
    return Array(8).fill(0).map(() => Array(8).fill(''));
  }
};

// Get square name from row and column
export const getSquareName = (row: number, col: number): string => {
  const files = 'abcdefgh';
  const ranks = '87654321';
  
  return `${files[col]}${ranks[row]}`;
};

// Get row and column from square name
export const getSquarePosition = (square: string): [number, number] => {
  if (square.length !== 2) return [-1, -1];
  
  const files = 'abcdefgh';
  const ranks = '87654321';
  
  const col = files.indexOf(square[0]);
  const row = ranks.indexOf(square[1]);
  
  return [row, col];
};

// Check if a piece is white
export const isWhitePiece = (piece: string): boolean => {
  return piece !== '' && piece === piece.toUpperCase();
};

/**
 * Ensures proper chess board orientation where a1 is a dark square
 * This helps maintain consistent board rendering
 */
export const getProperBoardOrientation = (isReversed: boolean, playerTurn: 'w' | 'b'): boolean => {
  // In standard chess orientation, a1 is a dark square
  
  if (isReversed) {
    // In attack mode, player is always at the bottom
    return false;
  }
  
  // In regular mode, if it's black's turn, flip the board so black is at bottom
  return playerTurn === 'b';
};

// Get square CSS classes based on its state
export const getSquareClasses = (
  row: number, 
  col: number, 
  board: string[][],
  selectedSquare: string | null,
  hoveredSquare: string | null,
  lastMove: [string, string] | null,
  showHint: boolean,
  hintSquare: string | null,
  isLegalMoveFunction: (r: number, c: number) => boolean
): string => {
  // Correct pattern: a1 (row=7, col=0) should be dark
  // In chess, the sum of ranks and file should be odd for light squares
  const isWhiteSquare = (row + col) % 2 === 0; // Fixed pattern for proper chess coloring
  
  const square = getSquareName(row, col);
  const isSelected = selectedSquare === square;
  const isHovered = hoveredSquare === square;
  const isLegalMove = selectedSquare && isLegalMoveFunction(row, col);
  const isHintSquare = showHint && hintSquare === square;
  const isLastMoveFrom = lastMove && lastMove[0] === square;
  const isLastMoveTo = lastMove && lastMove[1] === square;
  
  let baseClasses = `
    w-12 h-12 flex items-center justify-center relative
    ${isWhiteSquare ? 'chess-light-square' : 'chess-dark-square'} 
    cursor-pointer transition-all duration-300
  `;
  
  if (isSelected) {
    baseClasses += ' chess-selected';
  } else if (isLastMoveFrom || isLastMoveTo) {
    baseClasses += ' chess-highlight';
  } else if (isLegalMove && board[row][col] === '') {
    baseClasses += ' chess-legal-move';
  } else if (isHovered && !isSelected) {
    baseClasses += ' hover:opacity-95';
  }
  
  if (isHintSquare) {
    baseClasses += ' ring-4 ring-blue-500 ring-inset animate-pulse';
  }
  
  return baseClasses;
};

/**
 * Validates if a hint is targeting the correct player's piece
 * Used to ensure hints only highlight the player's pieces in attack mode
 */
export const validateHintTarget = (hintSquare: string | null, board: string[][], playerTurn: 'w' | 'b'): boolean => {
  if (!hintSquare) return false;
  
  const [row, col] = getSquarePosition(hintSquare);
  if (row < 0 || col < 0 || row >= 8 || col >= 8) return false;
  
  const piece = board[row][col];
  if (!piece) return false;
  
  // Check if the piece belongs to the current player
  const isWhite = isWhitePiece(piece);
  return (playerTurn === 'w' && isWhite) || (playerTurn === 'b' && !isWhite);
};

export default {
  parseFen,
  getSquareName,
  getSquarePosition,
  isWhitePiece,
  getSquareClasses,
  validateHintTarget,
  getProperBoardOrientation
};
