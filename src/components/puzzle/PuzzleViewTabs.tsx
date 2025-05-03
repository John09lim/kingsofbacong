
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import PuzzleViewer from "@/components/PuzzleViewer";
import PuzzleGeneratorCard from '@/components/puzzle/PuzzleGeneratorCard';
import DailyPuzzlesList from '@/components/puzzle/DailyPuzzlesList';
import PuzzleThemeSelector from '@/components/PuzzleThemeSelector';
import PuzzleStats from '@/components/PuzzleStats';
import PuzzleHistoryChart from '@/components/PuzzleHistoryChart';
import PuzzleDifficultyDistribution from '@/components/PuzzleDifficultyDistribution';
import PuzzleHistory from '@/components/PuzzleHistory';
import PuzzleCourses from '@/components/puzzle/PuzzleCourses';
import PuzzleLeaderboard from '@/components/puzzle/PuzzleLeaderboard';
import UserPuzzleStats from '@/components/puzzle/UserPuzzleStats';
import PuzzleCalendar from '@/components/PuzzleCalendar';
import { LichessPuzzleData } from "@/services/lichessService";

interface PuzzleViewTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  difficulty: number;
  setDifficulty: (difficulty: number) => void;
  solvedCount: number;
  puzzleStats: {
    accuracy: number;
    solved: number;
    attempts: number;
    streak: number;
    bestTime: string;
    rating: number;
    ratingDelta: number;
  };
  isRefreshing: boolean;
  puzzleData: LichessPuzzleData | null | undefined;
  isPuzzleLoading: boolean;
  themesData: any;
  isThemesLoading: boolean;
  solvedCountByTheme: Record<string, number>;
  puzzleHistory: any[];
  isDashboardLoading: boolean;
  difficultyDistributionData: { range: string; count: number; color: string }[];
  ratingHistoryData: { date: string; rating: number }[];
  dailyPuzzles: { 
    id: number; 
    difficulty: string; 
    rating: number; 
    theme: string; 
    solvedCount: number; 
    solvedPercentage: number 
  }[];
  isReversed: boolean;
  userRating: number;
  puzzleActivity: Record<string, { count: number, solved: number, failed: number, time: number }>;
  dashboardData: any;
  leaderboard: { 
    rank: number; 
    name: string; 
    rating: number; 
    solved: number; 
    streak: number;
    country: string;
  }[];
  onSelectTheme: (themeKey: string) => Promise<void>;
  onStartPuzzleByDifficulty: () => Promise<void>;
  onGetNextPuzzle: () => Promise<void>;
  onPuzzleSolved: () => void;
  onPuzzleFailed: () => void;
}

const PuzzleViewTabs: React.FC<PuzzleViewTabsProps> = ({
  activeTab,
  setActiveTab,
  difficulty,
  setDifficulty,
  solvedCount,
  puzzleStats,
  isRefreshing,
  puzzleData,
  isPuzzleLoading,
  themesData,
  isThemesLoading,
  solvedCountByTheme,
  puzzleHistory,
  isDashboardLoading,
  difficultyDistributionData,
  ratingHistoryData,
  dailyPuzzles,
  isReversed,
  userRating,
  puzzleActivity,
  dashboardData,
  leaderboard,
  onSelectTheme,
  onStartPuzzleByDifficulty,
  onGetNextPuzzle,
  onPuzzleSolved,
  onPuzzleFailed
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-chess-muted-rose/20">
            <TabsTrigger value="daily" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
              Daily Attack
            </TabsTrigger>
            <TabsTrigger value="generator" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
              Attack Generator
            </TabsTrigger>
            <TabsTrigger value="themes" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
              Attack Themes
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-0 space-y-6">
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-lg">
                    Tactical Attack Mode
                  </div>
                  <Badge variant="outline" className="bg-chess-deep-red text-white">
                    You're the attacker
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  You're delivering the tactics! Find the best moves to gain advantage against your opponent.
                </p>
              </CardContent>
            </Card>
            
            <PuzzleViewer
              puzzleData={puzzleData}
              isLoading={isPuzzleLoading}
              onGetNextPuzzle={onGetNextPuzzle}
              onSolved={onPuzzleSolved}
              onFailed={onPuzzleFailed}
              isRefreshing={isRefreshing}
              isReversed={isReversed}
            />
          </TabsContent>
          
          <TabsContent value="generator" className="mt-0">
            <PuzzleGeneratorCard 
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              solvedCount={solvedCount}
              puzzleStats={puzzleStats}
              isRefreshing={isRefreshing}
              onStartPuzzleByDifficulty={onStartPuzzleByDifficulty}
            />
            
            <DailyPuzzlesList 
              dailyPuzzles={dailyPuzzles} 
              onSelectPuzzle={(rating) => {
                onStartPuzzleByDifficulty();
                setActiveTab("daily");
              }} 
            />
          </TabsContent>
          
          <TabsContent value="themes" className="mt-0">
            <PuzzleThemeSelector 
              themes={themesData}
              solvedCountByTheme={solvedCountByTheme}
              isLoading={isThemesLoading}
              onSelectTheme={onSelectTheme}
            />
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-0 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PuzzleStats stats={puzzleStats} isLoading={isDashboardLoading} />
              <PuzzleHistoryChart data={ratingHistoryData} isLoading={isDashboardLoading} />
            </div>
            
            <PuzzleDifficultyDistribution 
              data={difficultyDistributionData} 
              isLoading={isDashboardLoading}
            />
            
            <PuzzleHistory 
              history={puzzleHistory} 
              isLoading={isDashboardLoading}
            />
          </TabsContent>
        </Tabs>
        
        <PuzzleCourses />
      </div>
      
      <div className="space-y-8">
        <PuzzleLeaderboard leaderboard={leaderboard} />
        
        <UserPuzzleStats 
          userRating={userRating}
          puzzleStats={puzzleStats}
          isDashboardLoading={isDashboardLoading}
          dashboardData={dashboardData}
          onViewDetails={() => setActiveTab("dashboard")}
        />
        
        <PuzzleCalendar puzzleActivity={puzzleActivity} />
      </div>
    </div>
  );
};

export default PuzzleViewTabs;
