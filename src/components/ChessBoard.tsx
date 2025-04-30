
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, Check, X, Lightbulb, RefreshCw } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ChessBoardProps {
  fen?: string;
  pgn?: string;
  solution?: string[];
  onSolved?: (success: boolean) => void;
  initialPly?: number;
  playerTurn?: 'w' | 'b';
  isReversed?: boolean;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", 
  pgn,
  solution = [], 
  onSolved,
  initialPly = 0,
  playerTurn = 'w',
  isReversed = false
}) => {
  const [currentFen, setCurrentFen] = useState<string>(fen);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);
  const [boardFlipped, setBoardFlipped] = useState<boolean>(playerTurn === 'b');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintSquare, setHintSquare] = useState<string | null>(null);
  const [waitingForComputerMove, setWaitingForComputerMove] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<[string, string] | null>(null);
  const [solveTime, setSolveTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [moveCount, setMoveCount] = useState<number>(0);
  
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
    // Reset board when fen changes (new puzzle)
    if (fen) {
      setCurrentFen(fen);
      setSelectedSquare(null);
      setMoveHistory([]);
      setCurrentSolutionIndex(0);
      setIsSolved(false);
      setShowHint(false);
      setHintSquare(null);
      setWaitingForComputerMove(false);
      setLastMove(null);
      setMoveCount(0);
      setStartTime(Date.now());
      // Set board orientation based on who's turn it is
      setBoardFlipped(playerTurn === 'b');
    }
  }, [fen, playerTurn]);
  
  // Map chess piece symbols to Font Awesome Unicode chess symbols
  const getPieceSymbol = (piece: string) => {
    const pieceMap: { [key: string]: string } = {
      'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
      'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };
    return pieceMap[piece] || '';
  };
  
  // Get piece image path based on piece symbol
  const getPieceImage = (piece: string) => {
    const pieceMap: { [key: string]: string } = {
      'r': '/rook-black.svg', 
      'n': '/knight-black.svg', 
      'b': '/bishop-black.svg', 
      'q': '/queen-black.svg', 
      'k': '/king-black.svg', 
      'p': '/pawn-black.svg',
      'R': '/rook-white.svg', 
      'N': '/knight-white.svg', 
      'B': '/bishop-white.svg', 
      'Q': '/queen-white.svg', 
      'K': '/king-white.svg', 
      'P': '/pawn-white.svg'
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
  
  // Make computer's move after player moves
  const makeComputerMove = useCallback(() => {
    if (currentSolutionIndex < solution.length) {
      setWaitingForComputerMove(true);
      
      // Add a slight delay to simulate computer thinking
      setTimeout(() => {
        const computerMove = solution[currentSolutionIndex];
        
        if (computerMove && computerMove.length >= 4) {
          // Extract from and to squares
          const fromSquare = computerMove.substring(0, 2);
          const toSquare = computerMove.substring(2, 4);
          
          const [fromRow, fromCol] = getSquarePosition(fromSquare);
          const [toRow, toCol] = getSquarePosition(toSquare);
          
          if (fromRow >= 0 && fromCol >= 0 && toRow >= 0 && toCol >= 0) {
            // Create a copy of the current board
            const newBoard = [...board.map(row => [...row])];
            
            // Move the piece
            const piece = newBoard[fromRow][fromCol];
            newBoard[fromRow][fromCol] = '';
            newBoard[toRow][toCol] = piece;
            
            // Update the board
            setBoard(newBoard);
            setMoveHistory([...moveHistory, computerMove]);
            setCurrentSolutionIndex(currentSolutionIndex + 1);
            setLastMove([fromSquare, toSquare]);
            
            // Animate the move
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
          }
        }
        
        setWaitingForComputerMove(false);
      }, 500);
    }
  }, [currentSolutionIndex, solution, board, moveHistory]);
  
  // Effect to trigger computer move when it's computer's turn
  useEffect(() => {
    // In reversed mode, computer should respond after every player move
    // In normal mode, computer only moves on odd solution indices
    const shouldMakeComputerMove = isReversed ? 
      currentSolutionIndex < solution.length && !waitingForComputerMove && !isSolved :
      currentSolutionIndex % 2 === 1 && currentSolutionIndex < solution.length && !waitingForComputerMove && !isSolved;
    
    if (shouldMakeComputerMove) {
      makeComputerMove();
    }
    
    // Check if the puzzle is solved
    if (currentSolutionIndex >= solution.length && solution.length > 0 && !isSolved) {
      setIsSolved(true);
      const endTime = Date.now();
      const timeSpent = Math.round((endTime - startTime) / 1000);
      setSolveTime(timeSpent);
      
      toast({
        title: "Puzzle solved!",
        description: `Congratulations! You solved this puzzle in ${timeSpent} seconds.`,
      });
      
      if (onSolved) onSolved(true);
    }
  }, [currentSolutionIndex, solution, waitingForComputerMove, isSolved, makeComputerMove, onSolved, startTime, isReversed]);
  
  // Show hint for next move
  const showHintMove = () => {
    if (currentSolutionIndex < solution.length) {
      const nextMove = solution[currentSolutionIndex];
      if (nextMove && nextMove.length >= 2) {
        // Extract the first two characters (from square)
        setHintSquare(nextMove.substring(0, 2));
        setShowHint(true);
        
        toast({
          title: "Hint",
          description: `Try moving the piece at ${nextMove.substring(0, 2).toUpperCase()}.`,
        });
        
        setTimeout(() => {
          setShowHint(false);
          setHintSquare(null);
        }, 3000); // Show hint for 3 seconds
      }
    }
  };

  // Handle square click
  const handleSquareClick = (row: number, col: number) => {
    if (isSolved || waitingForComputerMove) return;
    
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
          variant: "default",
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
          setLastMove([selectedSquare, square]);
          setMoveCount(moveCount + 1);
          
          const nextSolutionIndex = currentSolutionIndex + 1;
          setCurrentSolutionIndex(nextSolutionIndex);
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
        const isCorrectPlayerTurn = (playerTurn === 'w' && isWhite) || (playerTurn === 'b' && !isWhite);
        const isPlayerTurn = isReversed || currentSolutionIndex % 2 === 0; // In reversed mode, player is always the attacker
        
        if (isPlayerTurn && isCorrectPlayerTurn) {
          setSelectedSquare(square);
        } else {
          toast({
            title: "Wrong piece",
            description: `It's ${playerTurn === 'w' ? "White" : "Black"}'s turn to move.`,
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
    setWaitingForComputerMove(false);
    setLastMove(null);
    setMoveCount(0);
    setStartTime(Date.now());
    toast({
      title: "Puzzle reset",
      description: "Start solving the puzzle again.",
    });
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
  const getSquareClasses = (row: number, col: number) => {
    const isWhiteSquare = (row + col) % 2 === 1; // Lichess-style alternating pattern
    const square = getSquareName(row, col);
    const isSelected = selectedSquare === square;
    const isHovered = hoveredSquare === square;
    const isLegalMove = selectedSquare && isLegalMoveSquare(row, col);
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

  // Render the chess board
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Switch
            id="board-orientation"
            checked={!boardFlipped}
            onCheckedChange={() => setBoardFlipped(!boardFlipped)}
          />
          <Label htmlFor="board-orientation">
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Flip Board</span>
          </Label>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={showHintMove}
            className="flex items-center gap-1"
            disabled={isSolved || currentSolutionIndex >= solution.length || waitingForComputerMove}
          >
            <Lightbulb className="h-4 w-4" />
            Hint
          </Button>
          
          {waitingForComputerMove && (
            <Badge className="bg-amber-500">
              Computer thinking...
            </Badge>
          )}
          
          {!waitingForComputerMove && !isSolved && (
            <Badge className="bg-blue-500">
              {playerTurn === 'w' ? "White" : "Black"} to move
            </Badge>
          )}
        </div>
      </div>
      
      <div className="chess-board">
        <div className="grid grid-cols-8 gap-0 w-full max-w-md mx-auto">
          {/* Render the board according to player's perspective */}
          {!boardFlipped ? (
            // White's perspective (a1 at bottom left)
            board.map((row, rowIndex) => (
              row.map((piece, colIndex) => {
                const squareClasses = getSquareClasses(rowIndex, colIndex);
                return (
                  <div 
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleSquareHover(rowIndex, colIndex)}
                    onMouseLeave={() => setHoveredSquare(null)}
                    className={squareClasses}
                  >
                    {piece && (
                      <img 
                        src={getPieceImage(piece)} 
                        alt={`${isWhitePiece(piece) ? 'White' : 'Black'} ${piece.toLowerCase()}`}
                        className={`
                          chess-piece w-10 h-10
                          ${selectedSquare && selectedSquare === getSquareName(rowIndex, colIndex) ? 'opacity-70' : ''}
                          ${isAnimating && lastMove && lastMove[1] === getSquareName(rowIndex, colIndex) ? 'animate-scale-in' : ''}
                        `}
                      />
                    )}
                    
                    {/* File and rank labels */}
                    {colIndex === 0 && (
                      <span className="chess-coordinates chess-rank">
                        {8 - rowIndex}
                      </span>
                    )}
                    {rowIndex === 7 && (
                      <span className="chess-coordinates chess-file">
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
                const squareClasses = getSquareClasses(rowIndex, colIndex);
                return (
                  <div 
                    key={`${rowIndex}-${colIndex}-flipped`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleSquareHover(rowIndex, colIndex)}
                    onMouseLeave={() => setHoveredSquare(null)}
                    className={squareClasses}
                  >
                    {piece && (
                      <img 
                        src={getPieceImage(piece)} 
                        alt={`${isWhitePiece(piece) ? 'White' : 'Black'} ${piece.toLowerCase()}`}
                        className={`
                          chess-piece w-10 h-10
                          ${selectedSquare && selectedSquare === getSquareName(rowIndex, colIndex) ? 'opacity-70' : ''}
                          ${isAnimating && lastMove && lastMove[1] === getSquareName(rowIndex, colIndex) ? 'animate-scale-in' : ''}
                        `}
                      />
                    )}
                    
                    {/* File and rank labels (flipped) */}
                    {reversedColIndex === 7 && (
                      <span className="chess-coordinates chess-rank">
                        {8 - rowIndex}
                      </span>
                    )}
                    {reversedRowIndex === 7 && (
                      <span className="chess-coordinates chess-file">
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
            Solved in {solveTime}s!
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
