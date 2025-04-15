
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

// A simple chess board component that can display FEN positions
// In a real implementation, this would use a chess library like chess.js
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
  
  // For demonstration purposes, we'll parse the FEN minimally
  // In a real implementation, this would use a chess library
  const parseFen = useCallback((fen: string) => {
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
  }, []);
  
  // Display current board based on FEN
  const [board, setBoard] = useState<Array<Array<string>>>(parseFen(fen));
  
  useEffect(() => {
    setBoard(parseFen(currentFen));
  }, [currentFen, parseFen]);
  
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
  
  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    if (isSolved) return;
    
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    
    const square = `${files[col]}${ranks[row]}`;
    
    if (selectedSquare) {
      // A piece is already selected, try to move it
      const move = `${selectedSquare}${square}`;
      
      if (solution[currentSolutionIndex] === move) {
        // Correct move
        toast({
          title: "Correct move!",
          description: "That's the right move. Keep going!",
        });
        
        // For demo purposes, we'll manually update the piece on the board
        const [fromRow, fromCol] = [
          ranks.indexOf(selectedSquare[1]),
          files.indexOf(selectedSquare[0])
        ];
        
        const piece = board[fromRow][fromCol];
        const newBoard = [...board];
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
      if (board[row][col] !== '') {
        setSelectedSquare(square);
      }
    }
  };
  
  // Reset the puzzle
  const resetPuzzle = () => {
    setCurrentFen(fen);
    setSelectedSquare(null);
    setMoveHistory([]);
    setCurrentSolutionIndex(0);
    setIsSolved(false);
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
              
              return (
                <div 
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  className={`
                    w-12 h-12 flex items-center justify-center text-3xl
                    ${isWhiteSquare ? 'bg-amber-100' : 'bg-amber-700'} 
                    ${isSelected ? 'bg-blue-300' : ''}
                    cursor-pointer hover:opacity-90 transition-opacity
                  `}
                >
                  <span className={isWhitePiece(piece) ? 'text-black' : 'text-black'}>
                    {getPieceSymbol(piece)}
                  </span>
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
