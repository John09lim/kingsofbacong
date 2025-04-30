
import React from 'react';
import { CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { LichessPuzzleData } from "@/services/lichessService";

interface PuzzleGameInfoProps {
  puzzleData?: LichessPuzzleData;
  isSolved: boolean;
  failedAttempts: number;
  isReversed: boolean;
}

const PuzzleGameInfo: React.FC<PuzzleGameInfoProps> = ({
  puzzleData,
  isSolved,
  failedAttempts,
  isReversed
}) => {
  if (!puzzleData?.game) {
    return null;
  }

  return (
    <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <h4 className="text-sm font-medium mb-1">Game Info</h4>
        <p className="text-xs text-gray-600">
          {puzzleData.game.rated ? "Rated" : "Casual"} {puzzleData.game.perf?.name || "Game"} • Clock: {puzzleData.game.clock || "Standard"}
        </p>
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium mb-1">Players</h4>
        <div className="text-xs">
          <div>White: {puzzleData.game.players && puzzleData.game.players[0]?.title || ""} {puzzleData.game.players && puzzleData.game.players[0]?.name || "Player 1"} ({puzzleData.game.players && puzzleData.game.players[0]?.rating || "?"})</div>
          <div>Black: {puzzleData.game.players && puzzleData.game.players[1]?.title || ""} {puzzleData.game.players && puzzleData.game.players[1]?.name || "Player 2"} ({puzzleData.game.players && puzzleData.game.players[1]?.rating || "?"})</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isSolved && (
          <Badge className="bg-green-500 text-white flex items-center gap-1">
            <Check className="h-3 w-3" />
            {isReversed ? "Attack Successful!" : "Solved!"}
          </Badge>
        )}
        {failedAttempts > 0 && !isSolved && (
          <Badge className="bg-amber-500 text-white flex items-center gap-1">
            <X className="h-3 w-3" />
            Failed attempts: {failedAttempts}
          </Badge>
        )}
      </div>
    </CardFooter>
  );
};

export default PuzzleGameInfo;
