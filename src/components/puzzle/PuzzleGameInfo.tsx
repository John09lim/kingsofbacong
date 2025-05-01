
import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LichessUser, LichessPuzzleData } from '@/services/lichessService';

interface PuzzleGameInfoProps {
  puzzleData: LichessPuzzleData | null;
}

const PuzzleGameInfo: React.FC<PuzzleGameInfoProps> = ({ puzzleData }) => {
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
        <CardTitle className="mb-3 text-base">Game Information</CardTitle>
        
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleGameInfo;
