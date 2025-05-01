
import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LichessUser, LichessPuzzleData } from '@/services/lichessService';
import { CheckCircle, XCircle } from 'lucide-react';

interface PuzzleGameInfoProps {
  puzzleData: LichessPuzzleData | null;
  isSolved?: boolean;
  failedAttempts?: number;
  isReversed?: boolean;
}

const PuzzleGameInfo: React.FC<PuzzleGameInfoProps> = ({ 
  puzzleData,
  isSolved,
  failedAttempts,
  isReversed
}) => {
  if (!puzzleData) return null;
  
  const { game } = puzzleData;
  const whitePlayer = game.players?.white;
  const blackPlayer = game.players?.black;
  
  const formatPlayerName = (player?: LichessUser) => {
    if (!player) return "Unknown";
    return player.title 
      ? `${player.title} ${player.name || player.username}`
      : player.name || player.username;
  };
  
  const formatPlayerRating = (player?: LichessUser) => {
    return player?.rating ? `(${player.rating})` : "";
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-6 pb-4">
        <CardTitle className="mb-3 text-base flex justify-between items-center">
          <span>Game Information</span>
          {isSolved !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              {isSolved ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Solved
                </Badge>
              ) : failedAttempts && failedAttempts > 0 ? (
                <Badge variant="outline" className="bg-red-50 text-red-700 flex items-center gap-1">
                  <XCircle className="h-3.5 w-3.5" /> Failed attempts: {failedAttempts}
                </Badge>
              ) : null}
            </div>
          )}
        </CardTitle>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">White:</span>
            <span className="font-medium">
              {formatPlayerName(whitePlayer)} {formatPlayerRating(whitePlayer)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Black:</span>
            <span className="font-medium">
              {formatPlayerName(blackPlayer)} {formatPlayerRating(blackPlayer)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Time Control:</span>
            <span>{game.clock}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Game Type:</span>
            <span>
              <Badge variant="outline">{game.rated ? "Rated" : "Casual"}</Badge>
              <Badge variant="outline" className="ml-2">{game.perf?.name || "Standard"}</Badge>
            </span>
          </div>
          
          {isReversed !== undefined && (
            <div className="flex justify-between mt-2">
              <span className="text-gray-500">Puzzle Mode:</span>
              <Badge variant="outline" className="bg-chess-deep-red/10">
                {isReversed ? "Attack Mode" : "Defense Mode"}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleGameInfo;
