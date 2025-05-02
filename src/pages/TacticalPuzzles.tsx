import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Trophy, Star, TrendingUp, Timer, Brain, Zap, 
  Sword, Target, Crosshair, Gauge, CheckCircle2,
  Loader2, RefreshCw, Info, Calendar, History, Activity
} from "lucide-react";
import { useChessPuzzles } from "@/hooks/useChessPuzzles";
import { toast } from "@/hooks/use-toast";
import PuzzleViewer from "@/components/PuzzleViewer";
import PuzzleThemeSelector from "@/components/PuzzleThemeSelector";
import PuzzleHistoryChart from "@/components/PuzzleHistoryChart";
import PuzzleStats from "@/components/PuzzleStats";
import PuzzleHistory from "@/components/PuzzleHistory";
import PuzzleDifficultyDistribution from "@/components/PuzzleDifficultyDistribution";
import { format } from 'date-fns';
import PuzzleCalendar from '@/components/PuzzleCalendar';

const TacticalPuzzles = () => {
  const [difficulty, setDifficulty] = useState(1200);
  const [solvedCount, setSolvedCount] = useState(42);
  const [activeTab, setActiveTab] = useState("daily");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [solvedCountByTheme, setSolvedCountByTheme] = useState<Record<string, number>>({});
  const [puzzleHistory, setPuzzleHistory] = useState<any[]>([]);
  const [puzzleStats, setPuzzleStats] = useState({
    accuracy: 72,
    solved: 42,
    attempts: 58,
    streak: 5,
    bestTime: "4.2s",
    rating: 1200,
    ratingDelta: 24
  });
  const [userRating, setUserRating] = useState(1200);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [isReversed, setIsReversed] = useState(true); // Default to reversed (attack) mode
  const [puzzleActivity, setPuzzleActivity] = useState<Record<string, { count: number, solved: number, failed: number, time: number }>>({});

  // Sample rating history data
  const [ratingHistoryData, setRatingHistoryData] = useState([
    { date: format(new Date(2025, 3, 10), 'MMM dd'), rating: 1150 },
    { date: format(new Date(2025, 3, 11), 'MMM dd'), rating: 1175 },
    { date: format(new Date(2025, 3, 12), 'MMM dd'), rating: 1160 },
    { date: format(new Date(2025, 3, 13), 'MMM dd'), rating: 1185 },
    { date: format(new Date(2025, 3, 14), 'MMM dd'), rating: 1170 },
    { date: format(new Date(2025, 3, 15), 'MMM dd'), rating: 1200 }
  ]);

  // Sample difficulty distribution data
  const difficultyDistributionData = [
    { range: "800-1000", count: 5, color: "#4ade80" },
    { range: "1000-1200", count: 12, color: "#a3e635" }, 
    { range: "1200-1400", count: 15, color: "#facc15" },
    { range: "1400-1600", count: 7, color: "#fb923c" },
    { range: "1600-1800", count: 2, color: "#f87171" },
    { range: "1800+", count: 1, color: "#f43f5e" }
  ];

  const { 
    puzzleData,
    isPuzzleLoading,
    themesData,
    isThemesLoading,
    fetchNextPuzzle,
    fetchPuzzlesByTheme,
    generatePuzzleByDifficulty,
  } = useChessPuzzles({ enabled: true });

  // Mock dashboard data for compatibility
  const dashboardData = {
    global: {
      firstWins: 31,
      nb: 43,
      wins: 36,
      streak: 5,
      fastest: { seconds: 4.2 }
    }
  };

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

    // Load puzzle history
    const storedHistory = localStorage.getItem('puzzleHistory');
    if (storedHistory) {
      setPuzzleHistory(JSON.parse(storedHistory));
    } else {
      // Initialize with some sample data
      const sampleHistory = [
        {
          id: "ABCDE",
          date: new Date().toISOString(),
          rating: 1200,
          theme: "fork",
          success: true,
          timeSpent: 15
        },
        {
          id: "FGHIJ",
          date: new Date(Date.now() - 3600000).toISOString(),
          rating: 1350,
          theme: "pin",
          success: false,
          timeSpent: 45
        },
        {
          id: "KLMNO",
          date: new Date(Date.now() - 7200000).toISOString(),
          rating: 1100,
          theme: "mate",
          success: true,
          timeSpent: 22
        }
      ];
      setPuzzleHistory(sampleHistory);
      localStorage.setItem('puzzleHistory', JSON.stringify(sampleHistory));
    }
    
    // Load puzzle activity data
    const storedActivity = localStorage.getItem('puzzleActivity');
    if (storedActivity) {
      setPuzzleActivity(JSON.parse(storedActivity));
    } else {
      // Initialize with some sample data for the past week
      const sampleActivity: Record<string, { count: number, solved: number, failed: number, time: number }> = {};
      const today = new Date();
      
      // Generate sample data for the past 30 days
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateKey = format(date, 'yyyy-MM-dd');
        
        // More recent days have more activity
        const count = Math.max(0, Math.floor(Math.random() * 10 * (1 - i/30)));
        if (count > 0) {
          const solved = Math.floor(count * 0.7); // 70% solved
          sampleActivity[dateKey] = {
            count, 
            solved,
            failed: count - solved,
            time: Math.floor(count * (30 + Math.random() * 30)) // 30-60 seconds per puzzle
          };
        }
      }
      
      setPuzzleActivity(sampleActivity);
      localStorage.setItem('puzzleActivity', JSON.stringify(sampleActivity));
    }
    
    // Load puzzle stats
    if (dashboardData?.global) {
      const { global } = dashboardData;
      
      setPuzzleStats({
        accuracy: Math.round((global.firstWins / global.nb) * 100) || 72,
        solved: global.wins || solvedCount,
        attempts: global.nb || 58,
        streak: global.streak || 5,
        bestTime: `${global.fastest?.seconds || 4.2}s`,
        rating: userRating || 1200,
        ratingDelta: 24
      });
    }
  }, [dashboardData, userRating]);

  // Handle puzzle solved - update to track daily activity
  const handlePuzzleSolved = () => {
    if (puzzleData?.puzzle) {
      markPuzzleSolved(puzzleData.puzzle.id);
      
      // Update solved count
      const newCount = solvedCount + 1;
      setSolvedCount(newCount);
      localStorage.setItem('puzzlesSolvedCount', newCount.toString());
      
      // Update theme-specific count if this puzzle has a theme
      if (puzzleData.puzzle.themes && puzzleData.puzzle.themes.length > 0) {
        const theme = puzzleData.puzzle.themes[0];
        const newThemeCounts = { ...solvedCountByTheme };
        newThemeCounts[theme] = (newThemeCounts[theme] || 0) + 1;
        setSolvedCountByTheme(newThemeCounts);
        localStorage.setItem('solvedPuzzlesByTheme', JSON.stringify(newThemeCounts));
      }
      
      // Add to puzzle history
      const newHistoryEntry = {
        id: puzzleData.puzzle.id,
        date: new Date().toISOString(),
        rating: puzzleData.puzzle.rating || 1200,
        theme: puzzleData.puzzle.themes && puzzleData.puzzle.themes.length > 0 ? 
          puzzleData.puzzle.themes[0] : undefined,
        success: true,
        timeSpent: Math.floor(Math.random() * 30) + 5 // Random time between 5-35s
      };
      
      const updatedHistory = [newHistoryEntry, ...puzzleHistory];
      if (updatedHistory.length > 50) {
        updatedHistory.pop(); // Keep only the latest 50 entries
      }
      
      setPuzzleHistory(updatedHistory);
      localStorage.setItem('puzzleHistory', JSON.stringify(updatedHistory));
      
      // Update stats
      setPuzzleStats(prev => ({
        ...prev,
        solved: prev.solved + 1,
        attempts: prev.attempts + 1,
        accuracy: Math.round(((prev.solved + 1) / (prev.attempts + 1)) * 100)
      }));
      
      // Update puzzle activity for today's date
      const today = format(new Date(), 'yyyy-MM-dd');
      const updatedActivity = { ...puzzleActivity };
      
      if (!updatedActivity[today]) {
        updatedActivity[today] = { count: 1, solved: 1, failed: 0, time: newHistoryEntry.timeSpent };
      } else {
        updatedActivity[today].count += 1;
        updatedActivity[today].solved += 1;
        updatedActivity[today].time += newHistoryEntry.timeSpent;
      }
      
      setPuzzleActivity(updatedActivity);
      localStorage.setItem('puzzleActivity', JSON.stringify(updatedActivity));
    }
  };

  // Handle puzzle failed - update activity tracking
  const handlePuzzleFailed = () => {
    if (puzzleData?.puzzle) {
      // Update puzzle activity for today's date
      const today = format(new Date(), 'yyyy-MM-dd');
      const updatedActivity = { ...puzzleActivity };
      const timeSpent = Math.floor(Math.random() * 30) + 5; // Random time
      
      if (!updatedActivity[today]) {
        updatedActivity[today] = { count: 1, solved: 0, failed: 1, time: timeSpent };
      } else {
        updatedActivity[today].count += 1;
        updatedActivity[today].failed += 1;
        updatedActivity[today].time += timeSpent;
      }
      
      setPuzzleActivity(updatedActivity);
      localStorage.setItem('puzzleActivity', JSON.stringify(updatedActivity));
      
      toast({
        title: "Puzzle Failed",
        description: "Don't worry, keep practicing!",
        variant: "destructive",
      });
    }
  };

  // Function to mark a puzzle as solved (helper for handlePuzzleSolved)
  const markPuzzleSolved = (puzzleId: string) => {
    // Calculate ELO points based on difficulty
    const puzzleRating = puzzleData?.puzzle.rating || 1200;
    let eloPoints = 1; // Default for easy puzzles
    
    if (puzzleRating >= 1600 && puzzleRating < 2000) {
      eloPoints = 2; // Intermediate puzzles
    } else if (puzzleRating >= 2000) {
      eloPoints = 3; // Hard puzzles
    }
    
    // Update user rating
    const newRating = userRating + eloPoints;
    setUserRating(newRating);
    localStorage.setItem('puzzleRating', newRating.toString());
    
    toast({
      title: "Puzzle Solved!",
      description: `Rating: +${eloPoints} ELO (${newRating})`,
    });
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

  // Fix the structure of mockPuzzleData to match LichessPuzzleData interface
  const mockPuzzleData = {
    puzzle: {
      id: "V6iSv",
      fen: "r1bq1rk1/pp2bppp/2n2n2/2pp4/3P4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 4 9",
      rating: 1500,
      themes: ["advantage", "middlegame", "short"],
      solution: ["d4c5", "f6e4", "g2e4", "e7c5"],
      plays: 1256,
      initialPly: 16,
      playerTurn: "w"
    },
    game: {
      id: "X7txx",
      perf: { key: "rapid", name: "Rapid" },
      players: {
        white: { 
          name: "DrNykterstein", 
          rating: 2861 
        },
        black: { 
          name: "LiquidDream", 
          rating: 2650 
        }
      },
      clock: "10+0",
      rated: true,
      pgn: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-chess-dark-maroon py-10 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tactical Puzzles</h1>
            <p className="text-chess-light-pink text-lg max-w-3xl">
              Train your tactical vision with thousands of puzzles. Play the attacker role and deliver 
              devastating tactics against your opponent!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
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
                    onGetNextPuzzle={handleGetNextPuzzle}
                    onSolved={handlePuzzleSolved}
                    onFailed={handlePuzzleFailed}
                    isRefreshing={isRefreshing}
                    isReversed={isReversed}
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
                            <span>+{puzzleStats.ratingDelta} rating today</span>
                          </Badge>
                          <Badge variant="outline" className="bg-amber-50">
                            <Star className="h-3 w-3 mr-1 text-amber-500" />
                            <span>{puzzleStats.streak} day streak</span>
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
                    themes={themesData}
                    solvedCountByTheme={solvedCountByTheme}
                    isLoading={isThemesLoading}
                    onSelectTheme={handleSelectTheme}
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Your Puzzle Statistics</CardTitle>
                    <CardDescription>Your tactical performance</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => setActiveTab("dashboard")}
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
                        onClick={() => setActiveTab("dashboard")}
                      >
                        <History className="h-3.5 w-3.5 mr-1" />
                        View History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Replace the existing calendar with our enhanced PuzzleCalendar component */}
              <PuzzleCalendar puzzleActivity={puzzleActivity} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TacticalPuzzles;
