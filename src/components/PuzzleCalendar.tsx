
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface PuzzleSolvedData {
  date: Date;
  count: number;
}

interface PuzzleCalendarProps {
  solvedPuzzles: string[];
  isLoading?: boolean;
}

const PuzzleCalendar: React.FC<PuzzleCalendarProps> = ({ 
  solvedPuzzles,
  isLoading = false
}) => {
  const [dailyCounts, setDailyCounts] = useState<PuzzleSolvedData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Process solved puzzles to get daily counts
  useEffect(() => {
    if (!solvedPuzzles?.length) {
      setDailyCounts([]);
      return;
    }
    
    // Get data from localStorage to persist between sessions
    const storedDailyCounts = localStorage.getItem('puzzleDailyCounts');
    let existingData: {[key: string]: number} = {};
    
    if (storedDailyCounts) {
      try {
        const parsedData = JSON.parse(storedDailyCounts);
        existingData = parsedData;
      } catch (e) {
        console.error('Error parsing stored daily counts', e);
      }
    }
    
    // Add today's count
    const today = format(new Date(), 'yyyy-MM-dd');
    existingData[today] = (existingData[today] || 0) + 1;
    
    // Store back to localStorage
    localStorage.setItem('puzzleDailyCounts', JSON.stringify(existingData));
    
    // Format data for the calendar
    const formattedData: PuzzleSolvedData[] = Object.keys(existingData).map(dateStr => ({
      date: new Date(dateStr),
      count: existingData[dateStr]
    }));
    
    setDailyCounts(formattedData);
  }, [solvedPuzzles.length]);
  
  // Custom day rendering to show badges with counts
  const renderDay = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayData = dailyCounts.find(d => format(d.date, 'yyyy-MM-dd') === dateStr);
    
    if (!dayData) return null;
    
    return (
      <Badge 
        variant="secondary" 
        className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 text-[0.5rem] h-4 min-w-4 flex items-center justify-center"
      >
        {dayData.count}
      </Badge>
    );
  };
  
  // Get selected day's count
  const getSelectedDayCount = () => {
    if (!selectedDate) return 0;
    
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const dayData = dailyCounts.find(d => format(d.date, 'yyyy-MM-dd') === dateStr);
    
    return dayData?.count || 0;
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Puzzle Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Puzzle Activity</span>
          {selectedDate && (
            <Badge variant="outline" className="font-mono">
              {format(selectedDate, 'MMM d')}: {getSelectedDayCount()} puzzles
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="w-full"
          components={{
            DayContent: ({ day }) => (
              <div className="relative flex h-9 w-9 items-center justify-center">
                <span>{format(day, 'd')}</span>
                {renderDay(day)}
              </div>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PuzzleCalendar;
