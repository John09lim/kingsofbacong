
import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';

export interface PuzzleStatsData {
  totalSolved: number;
  today: number;
  week: number;
  month: number;
  accuracy: number;
  streak: number;
  ratingDistribution: {
    easy: number;
    medium: number;
    hard: number;
    expert: number;
  };
  dailyCounts: Record<string, number>;
}

export const usePuzzleStats = (solvedPuzzleIds: string[]) => {
  const [stats, setStats] = useState<PuzzleStatsData>({
    totalSolved: 0,
    today: 0,
    week: 0,
    month: 0,
    accuracy: 0,
    streak: 0,
    ratingDistribution: {
      easy: 0,
      medium: 0,
      hard: 0,
      expert: 0
    },
    dailyCounts: {}
  });

  useEffect(() => {
    // Get today's date and dates for the last week and month
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Get daily puzzle counts from localStorage
    const storedDailyCounts = localStorage.getItem('puzzleDailyCounts');
    let dailyCounts: Record<string, number> = {};
    
    if (storedDailyCounts) {
      try {
        dailyCounts = JSON.parse(storedDailyCounts);
      } catch (e) {
        console.error('Error parsing stored daily counts', e);
      }
    }
    
    // Count puzzles solved today
    const todayCount = dailyCounts[today] || 0;
    
    // Count puzzles solved in the last 7 days
    let weekCount = 0;
    for (let i = 0; i < 7; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      weekCount += dailyCounts[date] || 0;
    }
    
    // Count puzzles solved in the last 30 days
    let monthCount = 0;
    for (let i = 0; i < 30; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      monthCount += dailyCounts[date] || 0;
    }
    
    // Calculate streak (consecutive days with solved puzzles)
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      if (dailyCounts[date] && dailyCounts[date] > 0) {
        streak++;
      } else if (i < 7) { // Only count consecutive days within the last week
        break;
      }
    }
    
    // Estimate rating distribution based on solved puzzles
    // This is mock data since we don't have actual rating distribution
    const ratingDistribution = {
      easy: Math.floor(solvedPuzzleIds.length * 0.4), // 40% easy
      medium: Math.floor(solvedPuzzleIds.length * 0.3), // 30% medium
      hard: Math.floor(solvedPuzzleIds.length * 0.2), // 20% hard
      expert: Math.floor(solvedPuzzleIds.length * 0.1), // 10% expert
    };
    
    setStats({
      totalSolved: solvedPuzzleIds.length,
      today: todayCount,
      week: weekCount,
      month: monthCount,
      accuracy: solvedPuzzleIds.length > 0 ? 70 : 0, // Mock accuracy data
      streak,
      ratingDistribution,
      dailyCounts
    });
    
  }, [solvedPuzzleIds]);

  return stats;
};

export default usePuzzleStats;
