
import React, { useState } from 'react';
import { useChessPuzzleApi } from '@/hooks/useChessPuzzleApi';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader } from "lucide-react";
import PuzzleInfoCard from './PuzzleInfoCard';
import ChessboardDisplay from './ChessboardDisplay';
import FeedbackMessage from './FeedbackMessage';
import PuzzleControls from './PuzzleControls';
import ApiUnavailableAlert from './ApiUnavailableAlert';
import ErrorDisplay from './ErrorDisplay';
import PuzzleChessEngine from './PuzzleChessEngine';

const RapidApiChessPuzzle = () => {
  const { puzzle, error, isLoading, refetch, apiUnavailable } = useChessPuzzleApi();
  const [gameState, setGameState] = useState({
    fen: '',
    feedback: '',
    isCorrect: true,
    isSolved: false,
    boardOrientation: "white" as "white" | "black",
    moveIndex: 0
  });

  const handleMoveResult = (result: {
    fen: string;
    isCorrect: boolean;
    feedback: string;
    isSolved: boolean;
    boardOrientation: "white" | "black";
    moveIndex: number;
  }) => {
    setGameState(result);
  };

  const showHint = () => {
    if (!puzzle?.moves[gameState.moveIndex]) return;
    const hintFrom = puzzle.moves[gameState.moveIndex].slice(0, 2);
    setGameState({
      ...gameState,
      feedback: `Hint: Move piece from ${hintFrom.toUpperCase()}`,
      isCorrect: true
    });
  };

  const handleNewPuzzle = () => {
    refetch();
  };

  if (error && !apiUnavailable) {
    return <ErrorDisplay error={error} onRetry={handleNewPuzzle} />;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Chess Puzzle</span>
          {isLoading && <Loader className="animate-spin" />}
        </CardTitle>
        <ApiUnavailableAlert isVisible={apiUnavailable} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {puzzle && <PuzzleInfoCard puzzle={puzzle} />}
          
          {puzzle && (
            <PuzzleChessEngine
              puzzle={puzzle}
              onMoveResult={handleMoveResult}
            />
          )}
          
          {gameState.fen && (
            <ChessboardDisplay
              fen={gameState.fen} 
              onPieceDrop={(source, target) => {
                // This will be handled by the PuzzleChessEngine
                // We just need to pass the call through
                if (puzzle && !gameState.isSolved) {
                  const userMoveString = source + target;
                  const expectedMove = puzzle.moves[gameState.moveIndex];
                  return userMoveString === expectedMove;
                }
                return false;
              }}
              boardOrientation={gameState.boardOrientation}
            />
          )}
          
          <FeedbackMessage 
            message={gameState.feedback} 
            isCorrect={gameState.isCorrect} 
          />
        </div>
      </CardContent>
      <CardFooter>
        <PuzzleControls 
          onShowHint={showHint}
          onNewPuzzle={handleNewPuzzle}
          isSolved={gameState.isSolved}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
};

export default RapidApiChessPuzzle;
