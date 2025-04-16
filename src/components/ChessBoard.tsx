
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Lightbulb, RefreshCw } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ChessBoardProps {
  fen?: string;
  pgn?: string;
  solution?: string[];
  onSolved?: (success: boolean) => void;
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
  const [isPlayerWhite, setIsPlayerWhite] = useState<boolean>(true);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintSquare, setHintSquare] = useState<string | null>(null);
  
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
      setShowHint(false);
      setHintSquare(null);
    }
  }, [fen]);
  
  // Map chess piece symbols to Unicode chess symbols with better visibility
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

  // Get row and column from square name
  const getSquarePosition = (square: string): [number, number] => {
    if (square.length !== 2) return [-1, -1];
    
    const files = 'abcdefgh';
    const ranks = '87654321';
    
    const col = files.indexOf(square[0]);
    const row = ranks.indexOf(square[1]);
    
    return [row, col];
  };
  
  // Show hint for next move
  const showHintMove = () => {
    if (currentSolutionIndex < solution.length) {
      const nextMove = solution[currentSolutionIndex];
      if (nextMove && nextMove.length >= 2) {
        // Extract the first two characters (from square)
        setHintSquare(nextMove.substring(0, 2));
        setShowHint(true);
        
        setTimeout(() => {
          setShowHint(false);
          setHintSquare(null);
        }, 2000); // Show hint for 2 seconds
      }
    }
  };

  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    if (isSolved) return;
    
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
        const [fromRow, fromCol] = getSquarePosition(selectedSquare);
        
        if (fromRow >= 0 && fromCol >= 0) {
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
            if (onSolved) onSolved(true);
          }
        }
      } else {
        // Incorrect move
        toast({
          title: "Incorrect move",
          description: "Try again with a different move.",
          variant: "destructive",
        });
        setSelectedSquare(null);
        if (onSolved) onSolved(false); // Report failed attempt
      }
    } else {
      // No piece is selected yet, select this square if it has a piece
      const piece = board[row][col];
      if (piece !== '') {
        // Only allow selecting pieces of the current player's color
        const isWhite = isWhitePiece(piece);
        if ((isPlayerWhite && isWhite) || (!isPlayerWhite && !isWhite)) {
          setSelectedSquare(square);
        } else {
          toast({
            title: "Wrong color",
            description: `It's ${isPlayerWhite ? "white" : "black"}'s turn to move.`,
            variant: "destructive",
          });
        }
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
    setShowHint(false);
    setHintSquare(null);
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

  // Get the square CSS based on position and state
  const getSquareStyle = (row: number, col: number) => {
    const isWhiteSquare = (row + col) % 2 === 1; // Lichess-style alternating pattern
    const square = getSquareName(row, col);
    const isSelected = selectedSquare === square;
    const isHovered = hoveredSquare === square;
    const isLegalMove = selectedSquare && isLegalMoveSquare(row, col);
    const isHintSquare = showHint && hintSquare === square;
    
    return `
      w-12 h-12 flex items-center justify-center text-3xl relative
      ${isWhiteSquare ? 'bg-[#eeeed2]' : 'bg-[#769656]'} 
      ${isSelected ? 'bg-[#bbcb2b]' : ''}
      ${isLegalMove ? 'bg-[#f7f769]' : ''}
      ${isHovered && !isSelected ? 'opacity-90' : ''}
      ${isHintSquare ? 'ring-4 ring-blue-500 ring-inset' : ''}
      cursor-pointer transition-all
    `;
  };

  // Toggle the board orientation
  const toggleBoardColor = () => {
    setIsPlayerWhite(!isPlayerWhite);
  };
  
  // Render the chess board
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Switch
            id="board-color"
            checked={isPlayerWhite}
            onCheckedChange={toggleBoardColor}
          />
          <Label htmlFor="board-color">Play as {isPlayerWhite ? "White" : "Black"}</Label>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={showHintMove}
          className="flex items-center gap-1"
          disabled={isSolved || currentSolutionIndex >= solution.length}
        >
          <Lightbulb className="h-4 w-4" />
          Hint
        </Button>
      </div>
      
      <div className="border rounded-md bg-[#262421] p-2 overflow-hidden">
        <div className="grid grid-cols-8 gap-0 w-full max-w-md mx-auto">
          {/* Render the board according to player's perspective */}
          {isPlayerWhite ? (
            // White's perspective (a1 at bottom left)
            board.map((row, rowIndex) => (
              row.map((piece, colIndex) => {
                const squareStyle = getSquareStyle(rowIndex, colIndex);
                return (
                  <div 
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleSquareHover(rowIndex, colIndex)}
                    onMouseLeave={() => setHoveredSquare(null)}
                    className={squareStyle}
                  >
                    {piece && (
                      <span 
                        className={`
                          ${isWhitePiece(piece) ? 'text-white drop-shadow-md' : 'text-black drop-shadow-md'}
                          ${selectedSquare && selectedSquare === getSquareName(rowIndex, colIndex) ? 'opacity-70' : ''}
                          text-4xl
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
            ))
          ) : (
            // Black's perspective (a1 at top right)
            [...board].reverse().map((row, reversedRowIndex) => (
              [...row].reverse().map((piece, reversedColIndex) => {
                const rowIndex = 7 - reversedRowIndex;
                const colIndex = 7 - reversedColIndex;
                const squareStyle = getSquareStyle(rowIndex, colIndex);
                return (
                  <div 
                    key={`${rowIndex}-${colIndex}-flipped`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleSquareHover(rowIndex, colIndex)}
                    onMouseLeave={() => setHoveredSquare(null)}
                    className={squareStyle}
                  >
                    {piece && (
                      <span 
                        className={`
                          ${isWhitePiece(piece) ? 'text-white drop-shadow-md' : 'text-black drop-shadow-md'}
                          ${selectedSquare && selectedSquare === getSquareName(rowIndex, colIndex) ? 'opacity-70' : ''}
                          text-4xl
                        `}
                      >
                        {getPieceSymbol(piece)}
                      </span>
                    )}
                    
                    {/* File and rank labels (flipped) */}
                    {reversedColIndex === 7 && (
                      <span className="absolute left-1 top-0 text-xs font-bold opacity-70">
                        {8 - rowIndex}
                      </span>
                    )}
                    {reversedRowIndex === 7 && (
                      <span className="absolute right-1 bottom-0 text-xs font-bold opacity-70">
                        {"abcdefgh"[colIndex]}
                      </span>
                    )}
                  </div>
                );
              })
            ))
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4">
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
