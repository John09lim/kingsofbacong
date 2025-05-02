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
import DailyPuzzlesList from '@/components/puzzle/DailyPuzzlesList';
import PuzzleCourses from '@/components/puzzle/PuzzleCourses';
import PuzzleLeaderboard from '@/components/puzzle/PuzzleLeaderboard';
import PuzzleGeneratorCard from '@/components/puzzle/PuzzleGeneratorCard';
import UserPuzzleStats from '@/components/puzzle/UserPuzzleStats';

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
                  <PuzzleGeneratorCard 
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    solvedCount={solvedCount}
                    puzzleStats={puzzleStats}
                    isRefreshing={isRefreshing}
                    onStartPuzzleByDifficulty={handleStartPuzzleByDifficulty}
                  />
                  
                  <DailyPuzzlesList 
                    dailyPuzzles={dailyPuzzles} 
                    onSelectPuzzle={(rating) => {
                      generatePuzzleByDifficulty(rating);
                      setActiveTab("daily");
                    }} 
                  />
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TacticalPuzzles;
