
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Clock, Activity, CheckCircle, X, Gauge } from "lucide-react";

interface PuzzleStatsProps {
  stats: {
    accuracy: number;
    solved: number;
    attempts: number;
    streak: number;
    bestTime: string;
    rating: number;
    ratingDelta?: number;
  };
  isLoading?: boolean;
}

const PuzzleStats: React.FC<PuzzleStatsProps> = ({ 
  stats, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Array(6).fill(0).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Your Puzzle Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Accuracy</span>
              <span className="font-medium">{stats.accuracy}%</span>
            </div>
            <Progress value={stats.accuracy} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatsCard 
              icon={<CheckCircle className="h-5 w-5 text-green-500" />}
              label="Puzzles Solved"
              value={`${stats.solved}`}
              footer={`${stats.attempts} Attempts`}
            />
            
            <StatsCard 
              icon={<Trophy className="h-5 w-5 text-amber-500" />}
              label="Current Streak"
              value={`${stats.streak}`}
              footer="Days"
            />
            
            <StatsCard 
              icon={<Clock className="h-5 w-5 text-blue-500" />}
              label="Best Time"
              value={stats.bestTime}
              footer="Seconds"
            />
            
            <StatsCard 
              icon={<Gauge className="h-5 w-5 text-chess-deep-red" />}
              label="Rating"
              value={`${stats.rating}`}
              footer={stats.ratingDelta && stats.ratingDelta > 0 ? 
                `+${stats.ratingDelta} Today` : 
                stats.ratingDelta ? `${stats.ratingDelta} Today` : "ELO"
              }
              footerClass={stats.ratingDelta && stats.ratingDelta > 0 ? 
                "text-green-500" : 
                stats.ratingDelta && stats.ratingDelta < 0 ? "text-red-500" : ""
              }
            />
            
            <StatsCard 
              icon={<Activity className="h-5 w-5 text-purple-500" />}
              label="Accuracy"
              value={`${stats.accuracy}%`}
              footer="Success Rate"
            />
            
            <StatsCard 
              icon={<X className="h-5 w-5 text-red-500" />}
              label="Failed"
              value={`${stats.attempts - stats.solved}`}
              footer="Puzzles"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  footer: string;
  footerClass?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon, 
  label, 
  value, 
  footer,
  footerClass = ""
}) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </div>
    <div className="font-bold text-xl">{value}</div>
    <div className={`text-xs text-gray-500 dark:text-gray-400 ${footerClass}`}>{footer}</div>
  </div>
);

export default PuzzleStats;
