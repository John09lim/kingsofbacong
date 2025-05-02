
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trophy } from "lucide-react";

interface LeaderboardPlayer {
  rank: number;
  name: string;
  rating: number;
  solved: number;
  streak: number;
  country: string;
}

interface PuzzleLeaderboardProps {
  leaderboard: LeaderboardPlayer[];
}

const PuzzleLeaderboard: React.FC<PuzzleLeaderboardProps> = ({ leaderboard }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Puzzle Leaderboard
        </CardTitle>
        <CardDescription>Top performers this month</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="border-b">
          <div className="grid grid-cols-12 px-6 py-2 text-xs font-medium text-gray-500">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2">Rating</div>
            <div className="col-span-3">Solved</div>
            <div className="col-span-2">Streak</div>
          </div>
        </div>
        
        <div className="divide-y">
          {leaderboard.map((player) => (
            <div key={player.rank} className={`grid grid-cols-12 px-6 py-2 text-sm hover:bg-gray-50 
              ${player.rank <= 3 ? 'bg-amber-50' : ''}`}>
              <div className="col-span-1 font-medium">{player.rank}</div>
              <div className="col-span-4 font-medium truncate">{player.name}</div>
              <div className="col-span-2">{player.rating}</div>
              <div className="col-span-3">{player.solved}</div>
              <div className="col-span-2 flex items-center">
                <Star className={`h-3 w-3 mr-1 ${player.streak >= 7 ? 'text-amber-500' : 'text-gray-400'}`} />
                {player.streak}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleLeaderboard;
