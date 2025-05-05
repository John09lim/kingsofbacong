
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
  getProperBoardOrientation 
} from './ChessBoardUtils';

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
  const [waitingForComputerMove, setWaitingForComputerMove] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<[string, string] | null>(null);
  const [solveTime, setSolveTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [moveCount, setMoveCount] = useState<number>(0);
  const [userHasMadeFirstMove, setUserHasMadeFirstMove] = useState<boolean>(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true); // Always start with player's turn
  
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
      setLastMove(null);
      setMoveCount(0);
      setStartTime(Date.now());
      setUserHasMadeFirstMove(false);
      setIsPlayerTurn(true); // Reset to player's turn when puzzle changes
      
      // Always use proper orientation - board flipped when Black to move in regular mode
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
        setIsPlayerTurn(true); // Set back to player's turn after computer move
      }, 800); // Increased delay to 800ms to make computer "thinking" more visible
    }
  }, [currentSolutionIndex, solution, board, moveHistory]);
  
  // Effect to trigger computer move when it's computer's turn
  useEffect(() => {
    // Check if computer should make a move
    const shouldMakeComputerMove = 
      !isPlayerTurn &&            // Only when it's not player's turn
      currentSolutionIndex < solution.length && 
      !waitingForComputerMove && 
      !isSolved && 
      userHasMadeFirstMove;       // User must have made first move
    
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
  }, [currentSolutionIndex, solution, waitingForComputerMove, isSolved, makeComputerMove, onSolved, startTime, userHasMadeFirstMove, isPlayerTurn]);
  
  // Check if a square is a legal move
  const isLegalMoveSquare = (row: number, col: number): boolean => {
    if (!selectedSquare) return false;
    
    const square = getSquareName(row, col);
    const move = `${selectedSquare}${square}`;
    
    // Check if this move starts with the correct sequence
    const correctMove = solution[currentSolutionIndex];
    return correctMove ? correctMove.startsWith(`${selectedSquare}${square}`) : false;
  };

  // Handle square click - improved to enforce correct moves
  const handleSquareClick = (row: number, col: number) => {
    // Block moves if puzzle is solved, computer is thinking, or it's not player's turn
    if (isSolved || waitingForComputerMove || !isPlayerTurn) return;
    
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
          setIsPlayerTurn(false); // After player makes a move, it's computer's turn
        }
      } else {
        // Incorrect move - improved feedback
        toast({
          title: "Incorrect move",
          description: "Please try again with a different move.",
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
    setLastMove(null);
    setMoveCount(0);
    setStartTime(Date.now());
    setIsPlayerTurn(true); // Reset to player's turn
    setUserHasMadeFirstMove(false);
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
        onReset={resetPuzzle}
        isSolved={isSolved}
        waitingForComputerMove={waitingForComputerMove}
        currentSolutionIndex={currentSolutionIndex}
        solutionLength={solution.length}
        solveTime={solveTime}
        playerTurn={playerTurn}
      />
      
      <div className="chess-board">
        <div className="grid grid-cols-8 gap-0 w-full aspect-square mx-auto">
          {/* Render the board according to player's perspective */}
          {!boardFlipped ? (
            // White's perspective (a1 at bottom left)
            board.map((row, rowIndex) => (
              row.map((piece, colIndex) => {
                const squareClasses = getSquareClasses(
                  rowIndex, colIndex, board, selectedSquare, hoveredSquare, 
                  lastMove, false, null, isLegalMoveSquare
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
                  lastMove, false, null, isLegalMoveSquare
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
