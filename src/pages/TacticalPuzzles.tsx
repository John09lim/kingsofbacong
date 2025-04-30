
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useChessPuzzles } from '@/hooks/useChessPuzzles';
import { usePuzzleStats } from '@/hooks/usePuzzleStats';
import PuzzleViewer from '@/components/PuzzleViewer';
import PuzzleThemeSelector from '@/components/PuzzleThemeSelector';
import PuzzleStats from '@/components/PuzzleStats';
import PuzzleHistory from '@/components/PuzzleHistory';
import PuzzleDifficultyDistribution from '@/components/PuzzleDifficultyDistribution';
import PuzzleCalendar from '@/components/PuzzleCalendar';

const TacticalPuzzles = () => {
  const [activeTab, setActiveTab] = useState("daily");
  
  // Use our custom puzzle hook
  const {
    puzzleData,
    isPuzzleLoading,
    fetchNextPuzzle,
    markPuzzleSolved,
    fetchPuzzlesByTheme,
    themesData,
    isThemesLoading,
    solvedPuzzles,
    generatePuzzleByDifficulty
  } = useChessPuzzles({
    enabled: true
  });

  // Use the puzzle stats hook
  const puzzleStats = usePuzzleStats(solvedPuzzles);
  
  // Handle when a puzzle is solved
  const handlePuzzleSolved = () => {
    if (!puzzleData || !puzzleData.puzzle.id) return;
    markPuzzleSolved(puzzleData.puzzle.id);
  };
  
  // Handle theme selection
  const handleThemeSelect = async (theme: string) => {
    await fetchPuzzlesByTheme(theme);
  };
  
  // Handle difficulty selection
  const handleDifficultySelect = (difficulty: number) => {
    generatePuzzleByDifficulty(difficulty);
  };
  
  // Ensure we show daily puzzles by default
  useEffect(() => {
    if (activeTab === 'daily' && !puzzleData && !isPuzzleLoading) {
      fetchNextPuzzle();
    }
  }, [activeTab, puzzleData, isPuzzleLoading, fetchNextPuzzle]);
  
  // Prepare stats object for PuzzleStats component
  const statsData = {
    accuracy: puzzleStats.totalSolved > 0 ? 
      Math.round((puzzleStats.totalSolved / (puzzleStats.totalSolved + 5)) * 100) : 0,
    solved: puzzleStats.totalSolved,
    attempts: puzzleStats.totalSolved + 5, // Adding some mock failed attempts for display
    streak: Math.min(7, puzzleStats.week), // Use a simple streak calculation
    bestTime: "00:45", // Mock best time
    rating: 1200, // Default rating
    ratingDelta: 5 // Mock rating change
  };
  
  // Format difficulty distribution data for the chart
  const formatPerformanceData = () => {
    return [
      { range: "Easy (800-1200)", count: puzzleStats.ratingDistribution?.easy || 0, color: "#4ade80" },
      { range: "Medium (1200-1600)", count: puzzleStats.ratingDistribution?.medium || 0, color: "#facc15" },
      { range: "Hard (1600-2000)", count: puzzleStats.ratingDistribution?.hard || 0, color: "#f97316" },
      { range: "Expert (2000+)", count: puzzleStats.ratingDistribution?.expert || 0, color: "#ef4444" }
    ];
  };
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tactical Puzzles</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Improve your tactical vision by solving puzzles. Find decisive combinations, checkmates, 
            and other tactical motifs to improve your chess skills.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Daily Puzzles</TabsTrigger>
              <TabsTrigger value="themes">Puzzle Themes</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="mt-0">
              <PuzzleViewer 
                puzzleData={puzzleData}
                isLoading={isPuzzleLoading}
                onGetNextPuzzle={fetchNextPuzzle}
                onSolved={handlePuzzleSolved}
                isRefreshing={isPuzzleLoading}
              />
            </TabsContent>
            
            <TabsContent value="themes" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Puzzle Themes</CardTitle>
                  <CardDescription>
                    Choose a tactical theme to practice specific patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PuzzleThemeSelector 
                    themes={themesData}
                    isLoading={isThemesLoading}
                    onSelectTheme={handleThemeSelect}
                  />
                </CardContent>
              </Card>
              
              {/* Show selected theme puzzle */}
              {puzzleData && activeTab === 'themes' && (
                <div className="mt-6">
                  <PuzzleViewer 
                    puzzleData={puzzleData} 
                    isLoading={isPuzzleLoading}
                    onGetNextPuzzle={fetchNextPuzzle}
                    onSolved={handlePuzzleSolved}
                    isRefreshing={isPuzzleLoading}
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="training" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Training Mode</CardTitle>
                  <CardDescription>
                    Customize your puzzle training experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <Card 
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleDifficultySelect(1200)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Easy</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Badge variant="outline">Rating: 800-1400</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleDifficultySelect(1600)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Intermediate</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Badge variant="outline">Rating: 1400-2000</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleDifficultySelect(2200)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Advanced</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Badge variant="outline">Rating: 2000+</Badge>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button onClick={() => fetchNextPuzzle()}>
                    Start Training
                  </Button>
                </CardContent>
              </Card>
              
              {/* Show puzzle for training */}
              {puzzleData && activeTab === 'training' && (
                <div className="mt-6">
                  <PuzzleViewer 
                    puzzleData={puzzleData} 
                    isLoading={isPuzzleLoading}
                    onGetNextPuzzle={fetchNextPuzzle}
                    onSolved={handlePuzzleSolved}
                    isRefreshing={isPuzzleLoading}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          {/* User Puzzle Stats */}
          <PuzzleStats 
            stats={statsData}
            isLoading={false}
          />
          
          {/* Puzzle Calendar */}
          <PuzzleCalendar 
            solvedPuzzles={solvedPuzzles}
            isLoading={false}
          />
          
          {/* Recent Puzzle History */}
          <PuzzleHistory 
            history={[]}
            isLoading={false}
          />
          
          {/* Difficulty Distribution */}
          <PuzzleDifficultyDistribution
            data={formatPerformanceData()}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TacticalPuzzles;
