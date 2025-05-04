
import React, { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useChessPuzzleApi } from '@/hooks/useChessPuzzleApi';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader, Lightbulb, RefreshCw } from "lucide-react";

const RapidApiChessPuzzle = () => {
  const { puzzle, error, isLoading, refetch } = useChessPuzzleApi();
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
      } catch (e) {
        toast({
          title: "Invalid FEN",
          description: "The puzzle contains an invalid chess position.",
          variant: "destructive",
        });
      }
    }
  }, [puzzle]);

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
      setGame(new Chess(game.fen()));
      setMoveIndex(moveIndex + 2); // Increment by 2 as we've made the player's move and the computer's response
      setPlayedMoves([...playedMoves, computerMove]);
      
      // Check if the puzzle is now complete
      if (moveIndex + 2 >= puzzle.moves.length) {
        setFeedback('Puzzle complete! ✅');
        setIsSolved(true);
        toast({
          title: "Puzzle solved!",
          description: "Great job! You've completed the puzzle.",
          variant: "default",
        });
      }
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
        setGame(new Chess(game.fen()));
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
        setGame(new Chess(game.fen()));
        setFeedback('❌ Incorrect move. Try again.');
        setCorrectPath(false);
        
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

  const showHint = () => {
    if (!puzzle?.moves[moveIndex]) return;
    const hintFrom = puzzle.moves[moveIndex].slice(0, 2);
    setFeedback(`Hint: Move piece from ${hintFrom.toUpperCase()}`);
    
    toast({
      title: "Hint",
      description: `Move piece from square ${hintFrom.toUpperCase()}`,
    });
  };

  const handleNewPuzzle = () => {
    refetch();
  };

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-red-500">{error}</p>
            <Button onClick={handleNewPuzzle}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>RapidAPI Chess Puzzle</span>
          {isLoading && <Loader className="animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {puzzle && (
            <div className="mb-4">
              <p className="text-sm text-gray-500">Puzzle ID: {puzzle.id}</p>
              <p className="text-sm text-gray-500">Rating: {puzzle.rating}</p>
              <p className="text-sm text-gray-500">
                Side to Play: {puzzle.color === 'white' ? 'White' : 'Black'}
              </p>
              <p className="text-sm text-gray-500">
                Themes: {puzzle.themes.replace(/,/g, ', ')}
              </p>
            </div>
          )}
          
          <div className="w-full aspect-square max-w-md">
            <Chessboard 
              position={game.fen()} 
              onPieceDrop={onPieceDrop}
              boardOrientation={boardOrientation}
              areArrowsAllowed
              animationDuration={300}
              customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
              customDarkSquareStyle={{ backgroundColor: "#b58863" }} 
              customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
            />
          </div>
          
          <p className={`mt-2 ${correctPath ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={showHint} 
          disabled={isLoading || isSolved}
        >
          <Lightbulb className="mr-2 h-4 w-4" /> Hint
        </Button>
        <Button 
          onClick={handleNewPuzzle} 
          disabled={isLoading}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> New Puzzle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RapidApiChessPuzzle;
