
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface PuzzleSolvedData {
  date: string;
  count: number;
}

interface PuzzleStats {
  totalSolved: number;
  today: number;
  week: number;
  month: number;
  dailyData: PuzzleSolvedData[];
}

export const usePuzzleStats = (solvedPuzzles: string[]) => {
  const [stats, setStats] = useState<PuzzleStats>({
    totalSolved: 0,
    today: 0,
    week: 0,
    month: 0,
    dailyData: []
  });

  useEffect(() => {
    // Get data from localStorage
    const storedDailyCounts = localStorage.getItem('puzzleDailyCounts');
    let dailyCounts: {[key: string]: number} = {};
    
    if (storedDailyCounts) {
      try {
        dailyCounts = JSON.parse(storedDailyCounts);
      } catch (e) {
        console.error('Error parsing stored daily counts', e);
      }
    }
    
    // Calculate stats
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayCount = dailyCounts[today] || 0;
    
    // Get week data
    const now = new Date();
    let weekTotal = 0;
    
    // Loop through last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateKey = format(date, 'yyyy-MM-dd');
      weekTotal += dailyCounts[dateKey] || 0;
    }
    
    // Get month data
    let monthTotal = 0;
    
    // Loop through last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateKey = format(date, 'yyyy-MM-dd');
      monthTotal += dailyCounts[dateKey] || 0;
    }
    
    // Format daily data for charts
    const dailyData = Object.keys(dailyCounts).map(date => ({
      date,
      count: dailyCounts[date]
    }));
    
    setStats({
      totalSolved: solvedPuzzles.length,
      today: todayCount,
      week: weekTotal,
      month: monthTotal,
      dailyData
    });
    
  }, [solvedPuzzles]);

  return stats;
};
