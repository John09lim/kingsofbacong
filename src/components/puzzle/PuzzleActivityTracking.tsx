
import { format } from 'date-fns';
import { LichessPuzzleData } from '@/services/lichessService';

// A utility class to handle puzzle activity tracking
class PuzzleActivityTracking {
  /**
   * Initialize puzzle activity data from localStorage or with defaults
   */
  static initializeFromLocalStorage() {
    // Get solved count from localStorage
    const storedSolvedCount = localStorage.getItem('puzzlesSolvedCount');
    const solvedCount = storedSolvedCount ? parseInt(storedSolvedCount) : 42;
    
    // Load solved counts by theme
    const storedThemeCounts = localStorage.getItem('solvedPuzzlesByTheme');
    const solvedCountByTheme = storedThemeCounts ? 
      JSON.parse(storedThemeCounts) : {
        fork: 15,
        pin: 12,
        skewer: 8,
        discovery: 7,
        mate: 0,
        sacrifice: 0
      };
      
    // Load puzzle history
    const storedHistory = localStorage.getItem('puzzleHistory');
    const puzzleHistory = storedHistory ? 
      JSON.parse(storedHistory) : this.generateSampleHistory();
      
    // Load puzzle activity data
    const storedActivity = localStorage.getItem('puzzleActivity');
    const puzzleActivity = storedActivity ? 
      JSON.parse(storedActivity) : this.generateSampleActivity();
      
    return {
      solvedCount,
      solvedCountByTheme,
      puzzleHistory,
      puzzleActivity
    };
  }
  
  /**
   * Generate sample history data
   */
  private static generateSampleHistory() {
    return [
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
  }
  
  /**
   * Generate sample activity data
   */
  private static generateSampleActivity() {
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
    
    return sampleActivity;
  }
  
  /**
   * Track a solved puzzle
   */
  static trackPuzzleSolved(
    puzzleData: LichessPuzzleData,
    solvedCount: number,
    solvedCountByTheme: Record<string, number>,
    puzzleHistory: any[],
    puzzleActivity: Record<string, { count: number, solved: number, failed: number, time: number }>,
    puzzleStats: any
  ) {
    // Update solved count
    const newSolvedCount = solvedCount + 1;
    localStorage.setItem('puzzlesSolvedCount', newSolvedCount.toString());
    
    // Update theme-specific count if this puzzle has a theme
    const newThemeCounts = { ...solvedCountByTheme };
    if (puzzleData.puzzle.themes && puzzleData.puzzle.themes.length > 0) {
      const theme = puzzleData.puzzle.themes[0];
      newThemeCounts[theme] = (newThemeCounts[theme] || 0) + 1;
      localStorage.setItem('solvedPuzzlesByTheme', JSON.stringify(newThemeCounts));
    }
    
    // Add to puzzle history
    const timeSpent = Math.floor(Math.random() * 30) + 5; // Random time between 5-35s
    const newHistoryEntry = {
      id: puzzleData.puzzle.id,
      date: new Date().toISOString(),
      rating: puzzleData.puzzle.rating || 1200,
      theme: puzzleData.puzzle.themes && puzzleData.puzzle.themes.length > 0 ? 
        puzzleData.puzzle.themes[0] : undefined,
      success: true,
      timeSpent
    };
    
    const updatedHistory = [newHistoryEntry, ...puzzleHistory];
    if (updatedHistory.length > 50) {
      updatedHistory.pop(); // Keep only the latest 50 entries
    }
    localStorage.setItem('puzzleHistory', JSON.stringify(updatedHistory));
    
    // Update stats
    const updatedStats = {
      ...puzzleStats,
      solved: puzzleStats.solved + 1,
      attempts: puzzleStats.attempts + 1,
      accuracy: Math.round(((puzzleStats.solved + 1) / (puzzleStats.attempts + 1)) * 100)
    };
    
    // Update puzzle activity for today's date
    const today = format(new Date(), 'yyyy-MM-dd');
    const updatedActivity = { ...puzzleActivity };
    
    if (!updatedActivity[today]) {
      updatedActivity[today] = { count: 1, solved: 1, failed: 0, time: timeSpent };
    } else {
      updatedActivity[today].count += 1;
      updatedActivity[today].solved += 1;
      updatedActivity[today].time += timeSpent;
    }
    
    localStorage.setItem('puzzleActivity', JSON.stringify(updatedActivity));
    
    return {
      newSolvedCount,
      newThemeCounts,
      updatedHistory,
      updatedActivity,
      updatedStats
    };
  }
  
  /**
   * Track a failed puzzle attempt
   */
  static trackPuzzleFailed(puzzleActivity: Record<string, { count: number, solved: number, failed: number, time: number }>) {
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
    
    localStorage.setItem('puzzleActivity', JSON.stringify(updatedActivity));
    
    return { updatedActivity };
  }
}

export default PuzzleActivityTracking;
