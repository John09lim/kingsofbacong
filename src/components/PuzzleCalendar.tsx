
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle2, X, Expand } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

interface PuzzleCalendarProps {
  puzzleActivity?: Record<string, { count: number, solved: number, failed: number, time: number }>;
  isLoading?: boolean;
}

const PuzzleCalendar: React.FC<PuzzleCalendarProps> = ({ 
  puzzleActivity = {},
  isLoading = false
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Generate sample activity data for the last 30 days if none provided
  const ensurePuzzleActivity = () => {
    if (Object.keys(puzzleActivity).length > 0) return puzzleActivity;
    
    const generatedActivity: Record<string, { count: number, solved: number, failed: number, time: number }> = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = subDays(today, i);
      const dateString = format(date, 'yyyy-MM-dd');
      
      // Generate random data for sample
      const count = Math.floor(Math.random() * 10);
      const solved = Math.floor(Math.random() * count);
      const failed = count - solved;
      const time = Math.floor(Math.random() * 60 * count) + 30;
      
      generatedActivity[dateString] = { count, solved, failed, time };
    }
    
    return generatedActivity;
  };
  
  const activity = ensurePuzzleActivity();
  const formattedSelectedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedActivity = formattedSelectedDate ? activity[formattedSelectedDate] : undefined;

  // Create a customized day render function that makes ALL days clickable
  const renderDay = (day: Date) => {
    const dateString = format(day, 'yyyy-MM-dd');
    const dayActivity = activity[dateString];
    
    // Calculate color intensity based on puzzle count (0-10)
    const count = dayActivity?.count || 0;
    const intensity = Math.min(100, (count / 10) * 100);
    const bgColor = count > 0 ? `rgba(152, 27, 27, ${intensity/100})` : 'transparent';
    
    return (
      <div className="relative w-full h-full flex items-center justify-center cursor-pointer">
        {day.getDate()}
        <div 
          className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-4 h-1.5 rounded-sm" 
          style={{ backgroundColor: bgColor }}
        ></div>
      </div>
    );
  };

  // Handle expand button click to navigate to monthly calendar page
  const handleExpandClick = () => {
    navigate('/calendar');
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Daily Calendar</CardTitle>
          <CardDescription>Your puzzle solving activity</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setCalendarOpen(false);
                  }
                }}
                className="p-3 pointer-events-auto"
                components={{
                  Day: ({ date, ...props }) => (
                    <div {...props}>
                      {renderDay(date)}
                    </div>
                  )
                }}
              />
            </PopoverContent>
          </Popover>
          <Button 
            variant="outline" 
            className="h-8 w-8 p-0" 
            onClick={handleExpandClick}
            title="View monthly calendar"
          >
            <Expand className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedActivity ? (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Today'}
              </h3>
              <Badge className="mt-1 bg-chess-deep-red">
                {selectedActivity.count} {selectedActivity.count === 1 ? 'puzzle' : 'puzzles'} solved
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-gray-50 p-3 rounded-md flex flex-col items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mb-1" />
                <div className="text-xs text-gray-500">Correct</div>
                <div className="font-bold">{selectedActivity.solved}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md flex flex-col items-center">
                <X className="h-5 w-5 text-red-500 mb-1" />
                <div className="text-xs text-gray-500">Wrong</div>
                <div className="font-bold">{selectedActivity.failed}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md flex flex-col items-center">
                <Clock className="h-5 w-5 text-blue-500 mb-1" />
                <div className="text-xs text-gray-500">Time</div>
                <div className="font-bold">{Math.floor(selectedActivity.time / 60)}m</div>
              </div>
            </div>

            <div className="text-xs text-center text-gray-500 mt-2">
              Accuracy rate: {Math.round((selectedActivity.solved / selectedActivity.count) * 100) || 0}%
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center py-6">
            <div className="text-center text-gray-500">
              <CalendarIcon className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>Select a date to view puzzle activity</p>
            </div>
          </div>
        )}

        <div className="mt-6 mb-2">
          <div className="text-xs font-medium text-gray-500 mb-2">Activity Legend:</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-900 opacity-20"></div>
            <span className="text-xs">Low</span>
            <div className="w-3 h-3 rounded-sm bg-red-900 opacity-50"></div>
            <span className="text-xs">Medium</span>
            <div className="w-3 h-3 rounded-sm bg-red-900 opacity-80"></div>
            <span className="text-xs">High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleCalendar;
