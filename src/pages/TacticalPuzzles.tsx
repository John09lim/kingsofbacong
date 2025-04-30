import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePuzzle } from '@/hooks/usePuzzle';
import { useChessPuzzles } from '@/hooks/useChessPuzzles';
import PuzzleViewer from '@/components/PuzzleViewer';
import PuzzleThemeSelector from '@/components/PuzzleThemeSelector';
import PuzzleStats from '@/components/PuzzleStats';
import PuzzleHistory from '@/components/PuzzleHistory';
import PuzzleDifficultyDistribution from '@/components/PuzzleDifficultyDistribution';
import PuzzleCalendar from '@/components/PuzzleCalendar';
import { Calendar } from "lucide-react";

const TacticalPuzzles = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentSource, setCurrentSource] = useState<'lichess' | 'custom'>('lichess');
  
  // Use Lichess puzzle hook
  const { 
    puzzleData: lichessPuzzle, 
    isPuzzleLoading: isLichessLoading, 
    fetchNextPuzzle: fetchNextLichessPuzzle,
    markPuzzleSolved: markLichessPuzzleSolved,
    fetchPuzzlesByTheme,
    dashboardData,
    isDashboardLoading,
    themesData,
    isThemesLoading,
    solvedPuzzles,
    userRating
  } = usePuzzle({
    autoFetch: currentSource === 'lichess',
  });
  
  // Use our custom puzzle hook
  const {
    puzzleData: customPuzzle,
    isPuzzleLoading: isCustomLoading,
    fetchNextPuzzle: fetchNextCustomPuzzle,
    markPuzzleSolved: markCustomPuzzleSolved,
    themesData: customThemesData,
    isThemesLoading: isCustomThemesLoading,
    solvedPuzzles: customSolvedPuzzles
  } = useChessPuzzles({
    enabled: currentSource === 'custom'
  });
  
  // Determine which puzzle data and functions to use based on current source
  const puzzleData = currentSource === 'lichess' ? lichessPuzzle : customPuzzle;
  const isPuzzleLoading = currentSource === 'lichess' ? isLichessLoading : isCustomLoading;
  const fetchNextPuzzle = currentSource === 'lichess' ? fetchNextLichessPuzzle : fetchNextCustomPuzzle;
  
  // Handle when a puzzle is solved
  const handlePuzzleSolved = () => {
    if (!puzzleData) return;
    
    if (currentSource === 'lichess') {
      markLichessPuzzleSolved(puzzleData.puzzle.id);
    } else {
      markCustomPuzzleSolved(puzzleData.puzzle.id);
    }
  };
  
  // Handle theme selection
  const handleThemeSelect = async (theme: string) => {
    if (currentSource === 'lichess') {
      await fetchPuzzlesByTheme(theme);
    }
  };
  
  // Combine solved puzzles from both sources for stats
  const allSolvedPuzzles = [...solvedPuzzles, ...customSolvedPuzzles];
  
  // Ensure we show daily puzzles by default
  useEffect(() => {
    if (activeTab === 'daily' && !puzzleData && !isPuzzleLoading) {
      fetchNextPuzzle();
    }
  }, [activeTab, puzzleData, isPuzzleLoading, fetchNextPuzzle]);
  
  // Fix the button click handler - Wrap the fetchNextPuzzle call in a React event handler
  const handleStartTraining = () => {
    fetchNextPuzzle();
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
        
        <div className="flex mt-4 md:mt-0">
          <Button 
            variant={currentSource === 'lichess' ? 'default' : 'outline'} 
            className="mr-2"
            onClick={() => setCurrentSource('lichess')}
          >
            Lichess Puzzles
          </Button>
          <Button 
            variant={currentSource === 'custom' ? 'default' : 'outline'} 
            onClick={() => setCurrentSource('custom')}
          >
            Community Puzzles
          </Button>
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
                    themes={currentSource === 'lichess' ? themesData : customThemesData}
                    isLoading={currentSource === 'lichess' ? isThemesLoading : isCustomThemesLoading}
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
                    <Card className="cursor-pointer hover:border-primary transition-colors">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Easy</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Badge variant="outline">Rating: 800-1400</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:border-primary transition-colors">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Intermediate</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Badge variant="outline">Rating: 1400-2000</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer hover:border-primary transition-colors">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">Advanced</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Badge variant="outline">Rating: 2000+</Badge>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button onClick={handleStartTraining}>
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
          {/* User Puzzle Stats - Update prop names to match component */}
          <PuzzleStats 
            userRating={userRating}
            puzzlesSolved={allSolvedPuzzles.length}
            isLoading={isDashboardLoading}
          />
          
          {/* Puzzle Calendar */}
          <PuzzleCalendar 
            solvedPuzzles={allSolvedPuzzles}
            isLoading={isDashboardLoading}
          />
          
          {/* Recent Puzzle History - Update prop names to match component */}
          <PuzzleHistory 
            historyItems={dashboardData?.history?.slice(0, 5) || []}
            isLoading={isDashboardLoading}
          />
          
          {/* Difficulty Distribution - Update prop names to match component */}
          <PuzzleDifficultyDistribution
            performanceData={dashboardData?.performance || {}}
            isLoading={isDashboardLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default TacticalPuzzles;
