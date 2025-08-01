import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTrainingSession } from '@/hooks/useTrainingSession';
import { TrainingTimeDisplay } from '@/components/TrainingTimeDisplay';
import { useChessPuzzles } from "@/hooks/useChessPuzzles";
import { toast } from "@/hooks/use-toast";
import PuzzleViewTabs from '@/components/puzzle/PuzzleViewTabs';
import PuzzleActivityTracking from '@/components/puzzle/PuzzleActivityTracking';

const TacticalPuzzles = () => {
  const { sessionDuration, isTracking } = useTrainingSession('tactical_puzzles');
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
  const [ratingHistoryData, setRatingHistoryData] = useState([
    { date: 'Apr 10', rating: 1150 },
    { date: 'Apr 11', rating: 1175 },
    { date: 'Apr 12', rating: 1160 },
    { date: 'Apr 13', rating: 1185 },
    { date: 'Apr 14', rating: 1170 },
    { date: 'Apr 15', rating: 1200 }
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

  // Initialize states from localStorage
  useEffect(() => {
    // Initialize puzzle activity tracking
    const {
      solvedCount: initialSolvedCount,
      solvedCountByTheme: initialThemeCounts,
      puzzleHistory: initialHistory,
      puzzleActivity: initialActivity,
    } = PuzzleActivityTracking.initializeFromLocalStorage();

    // Set state with retrieved or default values
    setSolvedCount(initialSolvedCount);
    setSolvedCountByTheme(initialThemeCounts);
    setPuzzleHistory(initialHistory);
    setPuzzleActivity(initialActivity);
    
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
      
      // Update tracking with the new solved puzzle
      const {
        newSolvedCount,
        newThemeCounts,
        updatedHistory,
        updatedActivity,
        updatedStats
      } = PuzzleActivityTracking.trackPuzzleSolved(
        puzzleData,
        solvedCount,
        solvedCountByTheme,
        puzzleHistory,
        puzzleActivity,
        puzzleStats
      );
      
      // Update all states
      setSolvedCount(newSolvedCount);
      setSolvedCountByTheme(newThemeCounts);
      setPuzzleHistory(updatedHistory);
      setPuzzleActivity(updatedActivity);
      setPuzzleStats(updatedStats);
    }
  };

  // Handle puzzle failed - update activity tracking
  const handlePuzzleFailed = () => {
    if (puzzleData?.puzzle) {
      const { updatedActivity } = PuzzleActivityTracking.trackPuzzleFailed(puzzleActivity);
      setPuzzleActivity(updatedActivity);
      
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

  // Data for the page
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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tactical Puzzles</h1>
                <p className="text-chess-light-pink text-lg max-w-3xl">
                  Train your tactical vision with thousands of puzzles. Play the attacker role and deliver 
                  devastating tactics against your opponent!
                </p>
              </div>
              <TrainingTimeDisplay sessionDuration={sessionDuration} isTracking={isTracking} />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <PuzzleViewTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            solvedCount={solvedCount}
            puzzleStats={puzzleStats}
            isRefreshing={isRefreshing}
            puzzleData={puzzleData}
            isPuzzleLoading={isPuzzleLoading}
            themesData={themesData}
            isThemesLoading={isThemesLoading}
            solvedCountByTheme={solvedCountByTheme}
            puzzleHistory={puzzleHistory}
            isDashboardLoading={isDashboardLoading}
            difficultyDistributionData={difficultyDistributionData}
            ratingHistoryData={ratingHistoryData}
            dailyPuzzles={dailyPuzzles}
            isReversed={isReversed}
            userRating={userRating}
            puzzleActivity={puzzleActivity}
            dashboardData={dashboardData}
            leaderboard={leaderboard}
            onSelectTheme={handleSelectTheme}
            onStartPuzzleByDifficulty={handleStartPuzzleByDifficulty}
            onGetNextPuzzle={handleGetNextPuzzle}
            onPuzzleSolved={handlePuzzleSolved}
            onPuzzleFailed={handlePuzzleFailed}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TacticalPuzzles;
