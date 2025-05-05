
import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { RapidApiPuzzle } from '@/hooks/useChessPuzzleApi';
import { toast } from "@/hooks/use-toast";

interface PuzzleChessEngineProps {
  puzzle: RapidApiPuzzle | null;
  onMoveResult: (result: {
    fen: string;
    isCorrect: boolean;
    feedback: string;
    isSolved: boolean;
    boardOrientation: "white" | "black";
    moveIndex: number;
  }) => void;
}

const PuzzleChessEngine: React.FC<PuzzleChessEngineProps> = ({ puzzle, onMoveResult }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [correctPath, setCorrectPath] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  const [playedMoves, setPlayedMoves] = useState<string[]>([]);

  useEffect(() => {
    if (puzzle?.fen) {
      try {
        const newGame = new Chess(puzzle.fen);
        setGame(newGame);
        setMoveIndex(0);
        setCorrectPath(true);
        setFeedback('');
        setIsSolved(false);
        setPlayedMoves([]);
        
        // Set board orientation based on which color is to play
        // If FEN contains " w " then white to play, else if " b " then black to play
        const isWhiteToPlay = puzzle.fen.includes(" w ");
        setBoardOrientation(isWhiteToPlay ? "white" : "black");
        
        // Send initial state to parent
        onMoveResult({
          fen: newGame.fen(),
          isCorrect: true,
          feedback: '',
          isSolved: false,
          boardOrientation: isWhiteToPlay ? "white" : "black",
          moveIndex: 0
        });
      } catch (e) {
        toast({
          title: "Invalid FEN",
          description: "The puzzle contains an invalid chess position.",
          variant: "destructive",
        });
      }
    }
  }, [puzzle, onMoveResult]);

  // Function to make the computer's move in response to player's move
  const makeComputerMove = () => {
    // Get the next move from the puzzle solution
    const computerMove = puzzle?.moves[moveIndex + 1];
    if (!computerMove || !puzzle) return;
    
    try {
      // Parse the move format: e.g., "e2e4" to { from: 'e2', to: 'e4' }
      const from = computerMove.slice(0, 2);
      const to = computerMove.slice(2, 4);
      const promotion = computerMove.length > 4 ? computerMove[4] : undefined;
      
      // Make the move
      game.move({ from, to, promotion });
      const newGame = new Chess(game.fen());
      setGame(newGame);
      const newMoveIndex = moveIndex + 2;
      setMoveIndex(newMoveIndex);
      setPlayedMoves([...playedMoves, computerMove]);
      
      // Check if the puzzle is now complete
      const isNowSolved = newMoveIndex >= puzzle.moves.length;
      if (isNowSolved) {
        setFeedback('Puzzle complete! ✅');
        setIsSolved(true);
        toast({
          title: "Puzzle solved!",
          description: "Great job! You've completed the puzzle.",
        });
      }
      
      // Send updated state to parent
      onMoveResult({
        fen: newGame.fen(),
        isCorrect: true,
        feedback: isNowSolved ? 'Puzzle complete! ✅' : '',
        isSolved: isNowSolved,
        boardOrientation: boardOrientation,
        moveIndex: newMoveIndex
      });
    } catch (e) {
      console.error("Computer move error:", e);
    }
  };

  const onPieceDrop = (source: string, target: string) => {
    if (!puzzle || isSolved) return false;
    
    // Create the move string from source and target
    const userMoveString = source + target;
    const expectedMove = puzzle.moves[moveIndex];
    
    try {
      // Check if this is a valid move in the current position
      const move = game.move({ from: source, to: target, promotion: 'q' });
      
      if (!move) {
        // Not a legal chess move
        return false;
      }
      
      // Check if it's the expected move from the puzzle
      if (userMoveString === expectedMove) {
        // Valid move in the puzzle
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setPlayedMoves([...playedMoves, userMoveString]);
        
        toast({
          title: "Correct move!",
          description: "Well done! Now the computer will respond.",
        });
        
        // Make the computer's response move
        setTimeout(() => {
          makeComputerMove();
        }, 500); // Small delay for better UX
        
        return true;
      } else {
        // Legal chess move but not the puzzle solution
        // Undo the move and inform the user
        game.undo();
        const newGame = new Chess(game.fen());
        setGame(newGame);
        const newFeedback = '❌ Incorrect move. Try again.';
        setFeedback(newFeedback);
        setCorrectPath(false);
        
        // Send updated state to parent
        onMoveResult({
          fen: newGame.fen(),
          isCorrect: false,
          feedback: newFeedback,
          isSolved: false,
          boardOrientation: boardOrientation,
          moveIndex: moveIndex
        });
        
        toast({
          title: "Incorrect move",
          description: "That's not the right move for this puzzle. Try again.",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (e) {
      console.error("Chess move error:", e);
      return false;
    }
  };

  return (
    <div style={{ display: 'none' }}>
      {/* This is a non-rendering component that manages chess logic */}
    </div>
  );
};

export default PuzzleChessEngine;
