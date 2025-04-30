
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from "@/hooks/use-toast";
import ChessSquare from './ChessSquare';
import ChessBoardControls from './ChessBoardControls';
import { 
  parseFen, 
  getSquareName, 
  getSquarePosition, 
  isWhitePiece, 
  getSquareClasses, 
  validateHintTarget,
  getProperBoardOrientation 
} from './ChessBoardUtils';
import { debugPuzzle } from '@/utils/puzzleUtils';

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
  const [boardFlipped, setBoardFlipped] = useState<boolean>(getProperBoardOrientation(isReversed, playerTurn));
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintSquare, setHintSquare] = useState<string | null>(null);
  const [waitingForComputerMove, setWaitingForComputerMove] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<[string, string] | null>(null);
  const [solveTime, setSolveTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [moveCount, setMoveCount] = useState<number>(0);
  const [userHasMadeFirstMove, setUserHasMadeFirstMove] = useState<boolean>(false);
  
  // Display current board based on FEN
  const [board, setBoard] = useState<Array<Array<string>>>(parseFen(fen));
  
  // Debug on init - helps troubleshoot puzzle issues
  useEffect(() => {
    if (fen && solution) {
      console.log("ChessBoard initialized with:", {
        fen,
        solution,
        isReversed,
        playerTurn
      });
    }
  }, []);
  
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
      setUserHasMadeFirstMove(false); // Reset this flag when puzzle changes
      
      // Always use proper orientation
      setBoardFlipped(getProperBoardOrientation(isReversed, playerTurn));
      
      // Parse the FEN to set up the board
      setBoard(parseFen(fen));
    }
  }, [fen, playerTurn, isReversed]);
  
  // Make computer's move after player moves
  const makeComputerMove = useCallback(() => {
    if (currentSolutionIndex < solution.length) {
      setWaitingForComputerMove(true);
      
      // Add a longer delay to simulate computer thinking, giving user time to see what's happening
      setTimeout(() => {
        const computerMove = solution[currentSolutionIndex];
        
        if (computerMove && computerMove.length >= 4) {
          // Extract from and to squares
          const fromSquare = computerMove.substring(0, 2);
          const toSquare = computerMove.substring(2, 4);
          
          const [fromRow, fromCol] = getSquarePosition(fromSquare);
          const [toRow, toCol] = getSquarePosition(toSquare);
          
          if (fromRow >= 0 && fromCol >= 0 && toRow >= 0 && toCol >= 0) {
            // Verify there's actually a piece to move
            const piece = board[fromRow][fromCol];
            if (!piece) {
              console.error("Computer move error: No piece at", fromSquare);
              toast({
                title: "Invalid computer move",
                description: `No piece found at ${fromSquare}. Try a new puzzle.`,
                variant: "destructive",
              });
              setWaitingForComputerMove(false);
              return;
            }
            
            // Create a copy of the current board
            const newBoard = [...board.map(row => [...row])];
            
            // Move the piece
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
      }, 800); // Increased delay to 800ms to make computer "thinking" more visible
    }
  }, [currentSolutionIndex, solution, board, moveHistory]);
  
  // Effect to trigger computer move when it's computer's turn
  useEffect(() => {
    // For reversed mode (attack mode), computer only moves if:
    // 1. We have a valid solution index
    // 2. We're not waiting for a computer move already
    // 3. The puzzle isn't already solved
    // 4. The user has made at least one move (prevents auto-solving)
    const shouldMakeComputerMove = 
      isReversed ? 
        currentSolutionIndex < solution.length && 
        !waitingForComputerMove && 
        !isSolved && 
        userHasMadeFirstMove :  // Only make computer move if user has made at least one move
        currentSolutionIndex % 2 === 1 && 
        currentSolutionIndex < solution.length && 
        !waitingForComputerMove && 
        !isSolved;
    
    if (shouldMakeComputerMove) {
      makeComputerMove();
    }
    
    // Check if the puzzle is solved
    if (currentSolutionIndex >= solution.length && solution.length > 0 && !isSolved && userHasMadeFirstMove) {
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
  }, [currentSolutionIndex, solution, waitingForComputerMove, isSolved, makeComputerMove, onSolved, startTime, isReversed, userHasMadeFirstMove]);
  
  // Show hint for next move - FIXED to only highlight player's pieces
  const showHintMove = () => {
    if (currentSolutionIndex < solution.length) {
      const nextMove = solution[currentSolutionIndex];
      if (nextMove && nextMove.length >= 2) {
        // Extract the first two characters (from square)
        const suggestedSquare = nextMove.substring(0, 2);
        
        // Verify that the hint is targeting the player's piece
        const [row, col] = getSquarePosition(suggestedSquare);
        
        if (row >= 0 && col >= 0 && row < 8 && col < 8) {
          const piece = board[row][col];
          
          if (piece) {
            const isWhite = isWhitePiece(piece);
            const isPlayerPiece = (playerTurn === 'w' && isWhite) || (playerTurn === 'b' && !isWhite);
            
            if (isPlayerPiece) {
              setHintSquare(suggestedSquare);
              setShowHint(true);
              
              toast({
                title: "Hint",
                description: `Try moving the piece at ${suggestedSquare.toUpperCase()}.`,
              });
              
              setTimeout(() => {
                setShowHint(false);
                setHintSquare(null);
              }, 3000); // Show hint for 3 seconds
              return;
            }
          }
        }
        
        // If we got here, the hint was invalid
        toast({
          title: "Invalid hint",
          description: "This puzzle may have an incorrect solution. Try a new puzzle.",
          variant: "destructive",
        });
      }
    }
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
          setUserHasMadeFirstMove(true); // Mark that user has made their first move
          
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

  // Handler for flipping the board
  const handleFlipBoard = () => {
    setBoardFlipped(!boardFlipped);
  };

  // Render the chess board
  return (
    <div className="flex flex-col items-center">
      <ChessBoardControls 
        boardFlipped={boardFlipped}
        onFlipBoard={handleFlipBoard}
        onShowHint={showHintMove}
        onReset={resetPuzzle}
        isSolved={isSolved}
        waitingForComputerMove={waitingForComputerMove}
        currentSolutionIndex={currentSolutionIndex}
        solutionLength={solution.length}
        solveTime={solveTime}
        playerTurn={playerTurn}
        disableHint={isSolved || currentSolutionIndex >= solution.length || waitingForComputerMove}
      />
      
      <div className="chess-board">
        <div className="grid grid-cols-8 gap-0 w-full max-w-md mx-auto">
          {/* Render the board according to player's perspective */}
          {!boardFlipped ? (
            // White's perspective (a1 at bottom left)
            board.map((row, rowIndex) => (
              row.map((piece, colIndex) => {
                const squareClasses = getSquareClasses(
                  rowIndex, colIndex, board, selectedSquare, hoveredSquare, 
                  lastMove, showHint, hintSquare, isLegalMoveSquare
                );
                const squareName = getSquareName(rowIndex, colIndex);
                const isLastMoveFrom = lastMove && lastMove[0] === squareName;
                const isLastMoveTo = lastMove && lastMove[1] === squareName;
                const isSelected = selectedSquare === squareName;
                
                return (
                  <ChessSquare 
                    key={`${rowIndex}-${colIndex}`}
                    row={rowIndex}
                    col={colIndex}
                    piece={piece}
                    squareClasses={squareClasses}
                    isLastMoveFrom={isLastMoveFrom}
                    isLastMoveTo={isLastMoveTo}
                    isSelected={isSelected}
                    isAnimating={isAnimating}
                    showCoordinates={true}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleSquareHover(rowIndex, colIndex)}
                    onMouseLeave={() => setHoveredSquare(null)}
                  />
                );
              })
            ))
          ) : (
            // Black's perspective (a1 at top right)
            [...board].reverse().map((row, reversedRowIndex) => (
              [...row].reverse().map((piece, reversedColIndex) => {
                const rowIndex = 7 - reversedRowIndex;
                const colIndex = 7 - reversedColIndex;
                const squareClasses = getSquareClasses(
                  rowIndex, colIndex, board, selectedSquare, hoveredSquare, 
                  lastMove, showHint, hintSquare, isLegalMoveSquare
                );
                const squareName = getSquareName(rowIndex, colIndex);
                const isLastMoveFrom = lastMove && lastMove[0] === squareName;
                const isLastMoveTo = lastMove && lastMove[1] === squareName;
                const isSelected = selectedSquare === squareName;
                
                return (
                  <ChessSquare 
                    key={`${rowIndex}-${colIndex}-flipped`}
                    row={rowIndex}
                    col={colIndex}
                    piece={piece}
                    squareClasses={squareClasses}
                    isLastMoveFrom={isLastMoveFrom}
                    isLastMoveTo={isLastMoveTo}
                    isSelected={isSelected}
                    isAnimating={isAnimating}
                    showCoordinates={true}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    onMouseEnter={() => handleSquareHover(rowIndex, colIndex)}
                    onMouseLeave={() => setHoveredSquare(null)}
                  />
                );
              })
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
