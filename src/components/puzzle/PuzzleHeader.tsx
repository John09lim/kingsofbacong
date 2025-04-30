
import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { LichessPuzzleData } from "@/services/lichessService";
import { getPuzzleDifficultyLabel, getEloPoints, getEffectiveTurnText } from '@/utils/puzzleUtils';

interface PuzzleHeaderProps {
  puzzleData?: LichessPuzzleData;
  isRefreshing?: boolean;
  isReversed?: boolean;
  onGetNewPuzzle: () => void;
}

const PuzzleHeader: React.FC<PuzzleHeaderProps> = ({
  puzzleData,
  isRefreshing = false,
  isReversed = true, // Default to true for attack mode
  onGetNewPuzzle
}) => {
  if (!puzzleData) return null;
  
  const difficultyLabel = getPuzzleDifficultyLabel(puzzleData.puzzle.rating);
  const eloPoints = getEloPoints(puzzleData.puzzle.rating);
  // Access player turn safely - default to 'w' if color info doesn't exist
  const playerTurn: 'w' | 'b' = puzzleData.puzzle.color === 'black' ? 'b' : 'w';

  return (
    <>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>
            {puzzleData.puzzle.themes && puzzleData.puzzle.themes.length > 0 ? 
              puzzleData.puzzle.themes.includes('mate') 
                ? 'Checkmate Attack' 
                : puzzleData.puzzle.themes.includes('fork') 
                  ? 'Fork Attack' 
                  : puzzleData.puzzle.themes[0].charAt(0).toUpperCase() + puzzleData.puzzle.themes[0].slice(1) + ' Attack'
              : 'Tactical Attack'
            }
          </span>
          <Badge className={`
            ${difficultyLabel === "Easy" ? "bg-green-600" : 
              difficultyLabel === "Intermediate" ? "bg-amber-600" : 
              "bg-red-600"}
          `}>
            {difficultyLabel} (+{eloPoints} ELO)
          </Badge>
          <Badge className="bg-blue-600 ml-2">
            {isReversed ? "You Attack!" : getEffectiveTurnText(playerTurn)}
          </Badge>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onGetNewPuzzle}
          disabled={isRefreshing}
          className="flex items-center gap-1"
        >
          {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          New Puzzle
        </Button>
      </CardTitle>
      <CardDescription>
        Rating: {puzzleData.puzzle.rating} • Themes: {puzzleData.puzzle.themes && puzzleData.puzzle.themes.length > 0 ? 
          puzzleData.puzzle.themes.map((t: string) => 
            t.charAt(0).toUpperCase() + t.slice(1)
          ).join(', ') : 'Tactical'
        }
      </CardDescription>
    </>
  );
};

export default PuzzleHeader;
