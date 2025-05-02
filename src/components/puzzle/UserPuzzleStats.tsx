
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, History } from "lucide-react";

interface UserPuzzleStatsProps {
  userRating: number;
  puzzleStats: {
    accuracy: number;
    solved: number;
    streak: number;
    bestTime: string;
  };
  isDashboardLoading: boolean;
  dashboardData: any;
  onViewDetails: () => void;
}

const UserPuzzleStats: React.FC<UserPuzzleStatsProps> = ({ 
  userRating, 
  puzzleStats, 
  isDashboardLoading, 
  dashboardData,
  onViewDetails
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Puzzle Statistics</CardTitle>
          <div className="text-sm text-gray-500">Your tactical performance</div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={onViewDetails}
          >
            <Activity className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Puzzle Rating</span>
              <span className="font-medium">{userRating}</span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-chess-deep-red to-chess-dark-maroon"
                style={{ width: `${(userRating / 2400) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>800</span>
              <span>2400</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Accuracy</div>
              <div className="font-bold text-xl">
                {isDashboardLoading ? (
                  <Skeleton className="h-7 w-16" />
                ) : (
                  dashboardData?.global ? 
                    `${Math.round((dashboardData.global.firstWins / dashboardData.global.nb) * 100)}%` : 
                    `${puzzleStats.accuracy}%`
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Solved Today</div>
              <div className="font-bold text-xl">
                {isDashboardLoading ? (
                  <Skeleton className="h-7 w-8" />
                ) : puzzleStats.solved - (dashboardData?.global?.wins || 0) || "0"}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Current Streak</div>
              <div className="font-bold text-xl">
                {isDashboardLoading ? (
                  <Skeleton className="h-7 w-16" />
                ) : `${puzzleStats.streak} days`}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-500">Best Time</div>
              <div className="font-bold text-xl">
                {isDashboardLoading ? (
                  <Skeleton className="h-7 w-12" />
                ) : puzzleStats.bestTime}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs" 
              onClick={onViewDetails}
            >
              <History className="h-3.5 w-3.5 mr-1" />
              View History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPuzzleStats;
