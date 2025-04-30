
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChessBoard from "@/components/ChessBoard";
import { LichessPuzzleData } from "@/services/lichessService";
import { getEffectivePlayerTurn, getEffectiveSolution } from '@/utils/puzzleUtils';
import PuzzleLoadingState from './puzzle/PuzzleLoadingState';
import PuzzleErrorState from './puzzle/PuzzleErrorState';
import PuzzleHeader from './puzzle/PuzzleHeader';
import PuzzleGameInfo from './puzzle/PuzzleGameInfo';

interface PuzzleViewerProps {
  puzzleData?: LichessPuzzleData | null;
  isLoading: boolean;
  onGetNextPuzzle: () => void;
  onSolved: () => void;
  isRefreshing?: boolean;
  isReversed?: boolean;
}

const PuzzleViewer: React.FC<PuzzleViewerProps> = ({
  puzzleData,
  isLoading,
  onGetNextPuzzle,
  onSolved,
  isRefreshing = false,
  isReversed = true // Default to reversed puzzles (you delivering the tactic)
}) => {
  const [isSolved, setIsSolved] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  
  // Handle when the puzzle is solved or failed
  const handlePuzzleResult = (success: boolean) => {
    if (success) {
      setIsSolved(true);
      onSolved();
    } else {
      setFailedAttempts(prev => prev + 1);
    }
  };
  
  // Handle getting a new puzzle
  const handleGetNewPuzzle = () => {
    setIsSolved(false);
    setFailedAttempts(0);
    onGetNextPuzzle();
  };

  if (isLoading) {
    return <PuzzleLoadingState />;
  }

  if (!puzzleData) {
    return <PuzzleErrorState onGetNewPuzzle={handleGetNewPuzzle} isRefreshing={isRefreshing} />;
  }

  // Get player turn safely
  const playerTurn = (puzzleData.puzzle as any)?.playerTurn || 'w';
  const effectivePlayerTurn = getEffectivePlayerTurn(playerTurn, isReversed);
  const effectiveSolution = getEffectiveSolution(puzzleData.puzzle.solution, isReversed);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <PuzzleHeader 
          puzzleData={puzzleData} 
          isRefreshing={isRefreshing}
          isReversed={isReversed}
          onGetNewPuzzle={handleGetNewPuzzle}
        />
      </CardHeader>
      <CardContent>
        <ChessBoard 
          fen={puzzleData.puzzle.fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"} 
          pgn={puzzleData.game?.pgn || ""}
          solution={effectiveSolution}
          initialPly={puzzleData.puzzle.initialPly || 0}
          onSolved={handlePuzzleResult}
          playerTurn={effectivePlayerTurn}
          isReversed={isReversed}
        />
      </CardContent>
      <PuzzleGameInfo 
        puzzleData={puzzleData}
        isSolved={isSolved}
        failedAttempts={failedAttempts}
        isReversed={isReversed}
      />
    </Card>
  );
};

export default PuzzleViewer;
