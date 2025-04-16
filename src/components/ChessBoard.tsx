
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X } from 'lucide-react';

interface ChessBoardProps {
  fen?: string;
  pgn?: string;
  solution?: string[];
  onSolved?: () => void;
  initialPly?: number;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", 
  pgn,
  solution = [], 
  onSolved,
  initialPly = 0
}) => {
  const [currentFen, setCurrentFen] = useState<string>(fen);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);
  
  // Parse the FEN to a board representation
  const parseFen = useCallback((fen: string) => {
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
  }, []);
  
  // Display current board based on FEN
  const [board, setBoard] = useState<Array<Array<string>>>(parseFen(fen));
  
  useEffect(() => {
    setBoard(parseFen(currentFen));
  }, [currentFen, parseFen]);
  
  useEffect(() => {
    // Reset board when fen changes (new puzzle)
    if (fen) {
      setCurrentFen(fen);
      setSelectedSquare(null);
      setMoveHistory([]);
      setCurrentSolutionIndex(0);
      setIsSolved(false);
    }
  }, [fen]);
  
  // Map chess piece symbols to Unicode chess symbols
  const getPieceSymbol = (piece: string) => {
    const pieceMap: { [key: string]: string } = {
      'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
      'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };
    return pieceMap[piece] || '';
  };
  
  // Check if a piece is white
  const isWhitePiece = (piece: string) => {
    return piece !== '' && piece === piece.toUpperCase();
  };
  
  // Get square name from row and column
  const getSquareName = (row: number, col: number): string => {
    const files = 'abcdefgh';
    const ranks = '87654321';
    
    return `${files[col]}${ranks[row]}`;
  };
  
  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    if (isSolved) return;
    
    const files = 'abcdefgh';
    const ranks = '87654321';
    
    const square = getSquareName(row, col);
    
    if (selectedSquare) {
      // A piece is already selected, try to move it
      const move = `${selectedSquare}${square}`;
      const correctMove = solution[currentSolutionIndex];
      
      // Optional promotion, check if move is correct ignoring promotion
      const isCorrectMoveWithoutPromotion = 
        correctMove && correctMove.startsWith(selectedSquare) && correctMove.includes(square);
      
      if (correctMove === move || isCorrectMoveWithoutPromotion) {
        // Correct move
        toast({
          title: "Correct move!",
          description: "That's the right move. Keep going!",
        });
        
        // Update the board
        const [fromRow, fromCol] = [
          ranks.indexOf(selectedSquare[1]),
          files.indexOf(selectedSquare[0])
        ];
        
        const piece = board[fromRow][fromCol];
        const newBoard = [...board.map(row => [...row])];
        newBoard[fromRow][fromCol] = '';
        newBoard[row][col] = piece;
        
        setBoard(newBoard);
        setSelectedSquare(null);
        setMoveHistory([...moveHistory, move]);
        
        const nextSolutionIndex = currentSolutionIndex + 1;
        setCurrentSolutionIndex(nextSolutionIndex);
        
        if (nextSolutionIndex >= solution.length) {
          setIsSolved(true);
          toast({
            title: "Puzzle solved!",
            description: "Congratulations! You've solved this puzzle.",
          });
          if (onSolved) onSolved();
        }
      } else {
        // Incorrect move
        toast({
          title: "Incorrect move",
          description: "Try again with a different move.",
          variant: "destructive",
        });
        setSelectedSquare(null);
      }
    } else {
      // No piece is selected yet, select this square if it has a piece
      const piece = board[row][col];
      if (piece !== '') {
        setSelectedSquare(square);
      }
    }
  };
  
  // Handle square hover
  const handleSquareHover = (row: number, col: number) => {
    setHoveredSquare(getSquareName(row, col));
  };
  
  // Reset the puzzle
  const resetPuzzle = () => {
    setCurrentFen(fen);
    setSelectedSquare(null);
    setMoveHistory([]);
    setCurrentSolutionIndex(0);
    setIsSolved(false);
    setBoard(parseFen(fen));
  };
  
  // Check if a square is a legal move
  const isLegalMoveSquare = (row: number, col: number): boolean => {
    if (!selectedSquare) return false;
    
    const square = getSquareName(row, col);
    const move = `${selectedSquare}${square}`;
    
    // Check if this move starts with the correct sequence
    const correctMove = solution[currentSolutionIndex];
    return correctMove ? correctMove.startsWith(`${selectedSquare}${square}`) : false;
  };
  
  // Render the chess board
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 border rounded-md bg-white overflow-hidden">
        <div className="grid grid-cols-8 gap-0 w-full max-w-md mx-auto">
          {board.map((row, rowIndex) => (
            row.map((piece, colIndex) => {
              const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;
              const isSelected = selectedSquare && 
                selectedSquare[0] === "abcdefgh"[colIndex] && 
                selectedSquare[1] === "87654321"[rowIndex];
              const isHovered = hoveredSquare === getSquareName(rowIndex, colIndex);
              const isLegalMove = selectedSquare && isLegalMoveSquare(rowIndex, colIndex);
              
              return (
                <div 
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  onMouseEnter={() => handleSquareHover(rowIndex, colIndex)}
                  onMouseLeave={() => setHoveredSquare(null)}
                  className={`
                    w-12 h-12 flex items-center justify-center text-3xl
                    ${isWhiteSquare ? 'bg-amber-100' : 'bg-amber-700'} 
                    ${isSelected ? 'bg-blue-300' : ''}
                    ${isLegalMove ? 'bg-green-200' : ''}
                    ${isHovered && piece === '' && selectedSquare ? 'bg-blue-100' : ''}
                    cursor-pointer hover:opacity-90 transition-opacity relative
                  `}
                >
                  {piece && (
                    <span 
                      className={`
                        ${isWhitePiece(piece) ? 'text-black' : 'text-black'}
                        ${selectedSquare && isSelected ? 'opacity-50' : ''}
                      `}
                    >
                      {getPieceSymbol(piece)}
                    </span>
                  )}
                  
                  {/* File and rank labels */}
                  {colIndex === 0 && (
                    <span className="absolute left-1 top-0 text-xs font-bold opacity-70">
                      {8 - rowIndex}
                    </span>
                  )}
                  {rowIndex === 7 && (
                    <span className="absolute right-1 bottom-0 text-xs font-bold opacity-70">
                      {"abcdefgh"[colIndex]}
                    </span>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetPuzzle}
          className="flex items-center gap-1"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        
        {isSolved ? (
          <div className="flex items-center gap-1 text-green-600 font-medium">
            <Check className="h-4 w-4" />
            Puzzle Solved!
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            {currentSolutionIndex}/{solution.length} moves
          </div>
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
