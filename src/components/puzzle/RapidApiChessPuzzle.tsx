
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

  useEffect(() => {
    if (puzzle?.fen) {
      try {
        const newGame = new Chess(puzzle.fen);
        setGame(newGame);
        setMoveIndex(0);
        setCorrectPath(true);
        setFeedback('');
        setIsSolved(false);
      } catch (e) {
        toast({
          title: "Invalid FEN",
          description: "The puzzle contains an invalid chess position.",
          variant: "destructive",
        });
      }
    }
  }, [puzzle]);

  const onPieceDrop = (source: string, target: string) => {
    if (!puzzle || isSolved) return false;
    
    const expectedMove = puzzle.moves[moveIndex];
    const userMove = source + target;

    try {
      if (expectedMove?.startsWith(userMove)) {
        const move = game.move({ from: source, to: target, promotion: 'q' });
        if (move) {
          setGame(new Chess(game.fen()));
          setMoveIndex(moveIndex + 1);
          setFeedback('Correct move!');
          
          toast({
            title: "Correct move!",
            description: "Well done! Keep going.",
          });
          
          if (moveIndex + 1 === puzzle.moves.length) {
            setFeedback('Puzzle complete! ✅');
            setIsSolved(true);
            toast({
              title: "Puzzle solved!",
              description: "Great job! You've completed the puzzle.",
              variant: "default",
            });
          }
          return true;
        }
      } else {
        setFeedback('❌ Incorrect move. Try again.');
        setCorrectPath(false);
        toast({
          title: "Incorrect move",
          description: "That's not the right move. Try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (e) {
      console.error("Chess move error:", e);
      return false;
    }
    return false;
  };

  const showHint = () => {
    if (!puzzle?.moves[moveIndex]) return;
    const hintFrom = puzzle.moves[moveIndex].slice(0, 2);
    setFeedback(`Hint: Move piece from ${hintFrom}`);
    
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
              {puzzle.openingFamily && (
                <p className="text-sm text-gray-500">
                  Opening: {puzzle.openingFamily.replace(/_/g, ' ')} 
                  {puzzle.openingVariation && ` - ${puzzle.openingVariation.replace(/_/g, ' ')}`}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Themes: {puzzle.themes.replace(/,/g, ', ')}
              </p>
            </div>
          )}
          
          <div className="w-full aspect-square max-w-md">
            <Chessboard 
              position={game.fen()} 
              onPieceDrop={onPieceDrop}
              boardOrientation="white" 
              areArrowsAllowed
              animationDuration={300}
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
