
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isSameDay } from "date-fns";
import type { DayContentProps } from "react-day-picker";

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
    
    // Format data for the calendar
    const formattedData: PuzzleSolvedData[] = Object.keys(existingData).map(dateStr => ({
      date: new Date(dateStr),
      count: existingData[dateStr]
    }));
    
    setDailyCounts(formattedData);
  }, [solvedPuzzles.length]);
  
  // Custom day rendering to show badges with counts
  const renderDay = (dayContentProps: DayContentProps) => {
    const day = dayContentProps.date;
    const dayData = dailyCounts.find(d => isSameDay(d.date, day));
    
    if (!dayData || dayData.count === 0) return null;
    
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
    
    const dayData = dailyCounts.find(d => isSameDay(d.date, selectedDate));
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
            DayContent: (props) => (
              <div className="relative flex h-9 w-9 items-center justify-center">
                <span>{format(props.date, 'd')}</span>
                {renderDay(props)}
              </div>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PuzzleCalendar;
