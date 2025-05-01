
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChessBoard from "@/components/chessboard/ChessBoard";
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
  onFailed?: () => void;
  isRefreshing?: boolean;
  isReversed?: boolean;
}

const PuzzleViewer: React.FC<PuzzleViewerProps> = ({
  puzzleData,
  isLoading,
  onGetNextPuzzle,
  onSolved,
  onFailed,
  isRefreshing = false,
  isReversed = true // Set to true by default for attack mode
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
      if (onFailed) {
        onFailed();
      }
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

  // Get player turn safely - default to 'w' if color property doesn't exist
  const playerTurn: 'w' | 'b' = puzzleData.puzzle.color === 'black' ? 'b' : 'w';
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
