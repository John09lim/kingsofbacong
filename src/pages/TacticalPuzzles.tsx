
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Trophy, Star, TrendingUp, Timer, Brain, Zap, 
  Sword, Target, Crosshair, Gauge, CheckCircle2,
  Loader2, RefreshCw, Info
} from "lucide-react";
import { usePuzzle } from "@/hooks/usePuzzle";
import { toast } from "@/hooks/use-toast";
import PuzzleViewer from "@/components/PuzzleViewer";
import PuzzleThemeSelector from "@/components/PuzzleThemeSelector";

const TacticalPuzzles = () => {
  const [difficulty, setDifficulty] = useState(1200);
  const [solvedCount, setSolvedCount] = useState(42);
  const [activeTab, setActiveTab] = useState("daily");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [solvedCountByTheme, setSolvedCountByTheme] = useState<Record<string, number>>({});

  const { 
    puzzleData, 
    isPuzzleLoading, 
    dashboardData, 
    isDashboardLoading,
    themesData,
    isThemesLoading,
    fetchNextPuzzle,
    fetchPuzzlesByTheme,
    generatePuzzleByDifficulty,
    markPuzzleSolved,
    userRating,
    setCurrentPuzzleId
  } = usePuzzle({ autoFetch: true });

  // Update solved count from localStorage on load
  useEffect(() => {
    const storedSolvedCount = localStorage.getItem('puzzlesSolvedCount');
    if (storedSolvedCount) {
      setSolvedCount(parseInt(storedSolvedCount));
    }
    
    // Load solved counts by theme
    const storedThemeCounts = localStorage.getItem('solvedPuzzlesByTheme');
    if (storedThemeCounts) {
      setSolvedCountByTheme(JSON.parse(storedThemeCounts));
    } else {
      // Initialize with some default values
      setSolvedCountByTheme({
        fork: 15,
        pin: 12,
        skewer: 8,
        discovery: 7,
        mate: 0,
        sacrifice: 0
      });
    }
  }, []);

  // Handle puzzle solved
  const handlePuzzleSolved = () => {
    if (puzzleData?.puzzle) {
      markPuzzleSolved(puzzleData.puzzle.id);
      const newCount = solvedCount + 1;
      setSolvedCount(newCount);
      localStorage.setItem('puzzlesSolvedCount', newCount.toString());
      
      // Update theme-specific count if this puzzle has a theme
      const theme = puzzleData.puzzle.themes[0];
      if (theme) {
        const newThemeCounts = { ...solvedCountByTheme };
        newThemeCounts[theme] = (newThemeCounts[theme] || 0) + 1;
        setSolvedCountByTheme(newThemeCounts);
        localStorage.setItem('solvedPuzzlesByTheme', JSON.stringify(newThemeCounts));
      }
    }
  };

  // Handle get next puzzle
  const handleGetNextPuzzle = async () => {
    try {
      setIsRefreshing(true);
      const nextPuzzle = await fetchNextPuzzle();
      if (nextPuzzle) {
        toast({
          title: "New puzzle loaded",
          description: "A new tactical puzzle is ready for you to solve."
        });
      }
    } catch (error) {
      console.error("Error fetching next puzzle:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Handle selecting a theme
  const handleSelectTheme = async (themeKey: string) => {
    try {
      setIsRefreshing(true);
      setActiveTab("daily"); // Switch to the daily tab where the puzzle viewer is
      const themePuzzle = await fetchPuzzlesByTheme(themeKey);
      if (themePuzzle) {
        toast({
          title: `${themeKey.charAt(0).toUpperCase() + themeKey.slice(1)} Puzzle`,
          description: `A new ${themeKey} puzzle is ready for you to solve.`,
        });
      }
    } catch (error) {
      console.error("Error fetching puzzle by theme:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Handle starting a puzzle at the selected difficulty
  const handleStartPuzzleByDifficulty = async () => {
    try {
      setIsRefreshing(true);
      setActiveTab("daily"); // Switch to the daily tab where the puzzle viewer is
      const difficultyPuzzle = await generatePuzzleByDifficulty(difficulty);
      if (difficultyPuzzle) {
        toast({
          title: "Puzzle Generated",
          description: `A new puzzle rated ${difficulty} is ready for you to solve.`,
        });
      }
    } catch (error) {
      console.error("Error generating puzzle by difficulty:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const leaderboard = [
    { rank: 1, name: "MagnusCarlsen", rating: 2850, solved: 1254, streak: 42, country: "Norway" },
    { rank: 2, name: "HikaNak", rating: 2736, solved: 1187, streak: 28, country: "USA" },
    { rank: 3, name: "Firouzja2003", rating: 2720, solved: 1098, streak: 19, country: "France" },
    { rank: 4, name: "DingLiren", rating: 2705, solved: 987, streak: 21, country: "China" },
    { rank: 5, name: "Nepo2022", rating: 2688, solved: 945, streak: 14, country: "Russia" },
    { rank: 6, name: "Caruana_Fabiano", rating: 2677, solved: 908, streak: 12, country: "USA" },
    { rank: 7, name: "Wesley_So", rating: 2654, solved: 879, streak: 9, country: "USA" },
    { rank: 8, name: "Anish_Giri", rating: 2642, solved: 834, streak: 7, country: "Netherlands" },
    { rank: 9, name: "MVL_Chess", rating: 2630, solved: 801, streak: 5, country: "France" },
    { rank: 10, name: "Radjabov_T", rating: 2608, solved: 765, streak: 3, country: "Azerbaijan" }
  ];

  const dailyPuzzles = [
    {
      id: 1,
      difficulty: "Easy",
      rating: 1150,
      theme: "Fork",
      solvedCount: 458,
      solvedPercentage: 78
    },
    {
      id: 2,
      difficulty: "Medium",
      rating: 1550,
      theme: "Pin & Skewer",
      solvedCount: 342,
      solvedPercentage: 62
    },
    {
      id: 3,
      difficulty: "Hard",
      rating: 1950,
      theme: "Sacrifice & Mate",
      solvedCount: 187,
      solvedPercentage: 41
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-chess-dark-maroon py-10 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tactical Puzzles</h1>
            <p className="text-chess-light-pink text-lg max-w-3xl">
              Train your tactical vision with thousands of puzzles sorted by themes and difficulty levels. 
              Improve your calculation and pattern recognition skills.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 bg-chess-muted-rose/20">
                  <TabsTrigger value="daily" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                    Daily Puzzle
                  </TabsTrigger>
                  <TabsTrigger value="generator" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                    Puzzle Generator
                  </TabsTrigger>
                  <TabsTrigger value="themes" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                    Tactical Themes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="daily" className="mt-0 space-y-6">
                  <PuzzleViewer
                    puzzleData={puzzleData}
                    isLoading={isPuzzleLoading}
                    onGetNextPuzzle={handleGetNextPuzzle}
                    onSolved={handlePuzzleSolved}
                    isRefreshing={isRefreshing}
                  />
                </TabsContent>
                
                <TabsContent value="generator" className="mt-0">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Puzzle Generator</CardTitle>
                      <CardDescription>Start solving puzzles tailored to your level</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Difficulty: {difficulty} Elo</span>
                          <span className="text-sm text-gray-500">
                            {difficulty < 1400 ? 'Beginner' : difficulty < 1800 ? 'Intermediate' : 'Advanced'}
                          </span>
                        </div>
                        <div className="px-4">
                          <Slider
                            defaultValue={[1200]}
                            value={[difficulty]}
                            onValueChange={(value) => setDifficulty(value[0])}
                            min={800}
                            max={2400}
                            step={50}
                            className="mb-4"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Easy</span>
                          <span>Medium</span>
                          <span>Hard</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          className="flex-1 bg-chess-deep-red hover:bg-chess-dark-maroon"
                          onClick={handleStartPuzzleByDifficulty}
                          disabled={isRefreshing}
                        >
                          {isRefreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                          Start Puzzle
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            toast({
                              title: "Puzzle Rush",
                              description: "Solve as many puzzles as you can in 5 minutes! Coming soon.",
                            });
                          }}
                        >
                          <Timer className="mr-2 h-4 w-4" />
                          Puzzle Rush
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-amber-500" />
                          <span className="text-sm">{solvedCount} puzzles solved</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-green-50">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+24 rating today</span>
                          </Badge>
                          <Badge variant="outline" className="bg-amber-50">
                            <Star className="h-3 w-3 mr-1 text-amber-500" />
                            <span>5 day streak</span>
                          </Badge>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                  
                  <Card className="mt-6 overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle>Daily Puzzles</CardTitle>
                      <CardDescription>Fresh puzzles updated every day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {dailyPuzzles.map((puzzle) => (
                          <div key={puzzle.id} className="border rounded-md p-4 hover:border-chess-deep-red transition-colors">
                            <div className="flex justify-between items-center mb-3">
                              <div>
                                <h4 className="font-medium">{puzzle.difficulty} Puzzle</h4>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                  <span>Rating: {puzzle.rating}</span>
                                  <span className="text-xs">•</span>
                                  <span>Theme: {puzzle.theme}</span>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                className="bg-chess-deep-red hover:bg-chess-dark-maroon"
                                onClick={() => {
                                  generatePuzzleByDifficulty(puzzle.rating);
                                  setActiveTab("daily");
                                }}
                              >
                                Solve
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={puzzle.solvedPercentage} className="h-2 flex-1" />
                              <span className="text-xs font-medium">{puzzle.solvedPercentage}% solved</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {puzzle.solvedCount} players have attempted this puzzle
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="themes" className="mt-0">
                  <PuzzleThemeSelector 
                    themes={themesData || []}
                    solvedCountByTheme={solvedCountByTheme}
                    isLoading={isThemesLoading}
                    onSelectTheme={handleSelectTheme}
                  />
                </TabsContent>
              </Tabs>
              
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle>Puzzle Courses</CardTitle>
                  <CardDescription>Structured learning paths to master chess tactics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Basic Tactics Course</CardTitle>
                        <CardDescription>Master the fundamental tactical patterns</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm mb-2">
                          A structured course with 120 puzzles covering forks, pins, skewers, and more.
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <Gauge className="text-chess-deep-red h-4 w-4" />
                          <span className="text-sm">Difficulty: Beginner-Friendly</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>0/120 puzzles</span>
                          </div>
                          <Progress value={0} className="h-1" />
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button 
                          className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon"
                          onClick={() => {
                            toast({
                              title: "Course Coming Soon",
                              description: "Our structured courses are being prepared and will be available soon!",
                            });
                          }}
                        >
                          Start Course
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Advanced Combinations</CardTitle>
                        <CardDescription>Complex multi-move tactical sequences</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm mb-2">
                          Challenge yourself with 80 advanced puzzles requiring deep calculation.
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <Gauge className="text-chess-deep-red h-4 w-4" />
                          <span className="text-sm">Difficulty: Advanced</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>0/80 puzzles</span>
                          </div>
                          <Progress value={0} className="h-1" />
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button 
                          className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon"
                          onClick={() => {
                            toast({
                              title: "Course Coming Soon",
                              description: "Our advanced courses are being prepared and will be available soon!",
                            });
                          }}
                        >
                          Start Course
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-8">
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Puzzle Statistics</CardTitle>
                  <CardDescription>Your tactical performance</CardDescription>
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
                              "68%"
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Solved Today</div>
                        <div className="font-bold text-xl">
                          {isDashboardLoading ? (
                            <Skeleton className="h-7 w-8" />
                          ) : "14"}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Current Streak</div>
                        <div className="font-bold text-xl">
                          {isDashboardLoading ? (
                            <Skeleton className="h-7 w-16" />
                          ) : "5 days"}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Best Time</div>
                        <div className="font-bold text-xl">
                          {isDashboardLoading ? (
                            <Skeleton className="h-7 w-12" />
                          ) : "4.2s"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TacticalPuzzles;
