
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, isSameMonth, isSameDay, subDays, startOfMonth, endOfMonth, eachDayOfInterval, parseISO, isValid, getDaysInMonth } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar as CalendarIcon, ArrowLeft, CheckCircle2, X, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Daily goal of 50 puzzles per day
const DAILY_PUZZLE_GOAL = 50;

const MonthlyCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [puzzleActivity, setPuzzleActivity] = useState<Record<string, { count: number, solved: number, failed: number, time: number }>>({});
  
  // Load puzzle activity from localStorage
  useEffect(() => {
    const storedActivity = localStorage.getItem('puzzleActivity');
    if (storedActivity) {
      try {
        const parsedActivity = JSON.parse(storedActivity);
        setPuzzleActivity(parsedActivity);
      } catch (e) {
        console.error("Error parsing stored puzzle activity:", e);
      }
    } else {
      // Generate sample data if none exists
      generateSampleData();
    }
  }, []);
  
  // Generate sample data for demonstration
  const generateSampleData = () => {
    const generatedActivity: Record<string, { count: number, solved: number, failed: number, time: number }> = {};
    const today = new Date();
    
    // Generate activity for the last 60 days
    for (let i = 0; i < 60; i++) {
      // Skip some days to make it more realistic
      if (Math.random() > 0.7) continue;
      
      const date = subDays(today, i);
      const dateString = format(date, 'yyyy-MM-dd');
      
      // Generate random data for sample
      const count = Math.floor(Math.random() * 65); // Up to 65 puzzles
      const solved = Math.floor(Math.random() * count);
      const failed = count - solved;
      const time = Math.floor(Math.random() * 60 * count) + 30;
      
      generatedActivity[dateString] = { count, solved, failed, time };
    }
    
    setPuzzleActivity(generatedActivity);
    localStorage.setItem('puzzleActivity', JSON.stringify(generatedActivity));
  };
  
  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentDate(previousMonth);
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };
  
  // Get all days in the current month
  const getDaysInCurrentMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };
  
  // Get the day of week index for the first day (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = () => {
    return startOfMonth(currentDate).getDay();
  };
  
  // Calculate empty cells at the beginning of the month
  const getEmptyCells = () => {
    const firstDay = getFirstDayOfMonth();
    return Array.from({ length: firstDay }, (_, i) => i);
  };
  
  // Check if a date has puzzle activity
  const hasActivity = (dateString: string) => {
    return puzzleActivity[dateString] && puzzleActivity[dateString].count > 0;
  };
  
  // Get activity data for a date
  const getActivityForDate = (dateString: string) => {
    return puzzleActivity[dateString] || { count: 0, solved: 0, failed: 0, time: 0 };
  };
  
  // Calculate progress percentage against daily goal
  const getProgressPercentage = (count: number) => {
    return Math.min(100, Math.round((count / DAILY_PUZZLE_GOAL) * 100));
  };
  
  // Get appropriate badge color based on goal completion
  const getBadgeColor = (count: number) => {
    if (count >= DAILY_PUZZLE_GOAL) return "bg-green-500";
    if (count >= DAILY_PUZZLE_GOAL * 0.7) return "bg-yellow-500";
    return "bg-chess-deep-red";
  };
  
  // Format date for display
  const formatDateForDisplay = (date: Date) => {
    return format(date, 'MMMM yyyy');
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleGoBack = () => {
    // Go back to tactics page specifically
    navigate('/tactics');
  };
  
  // Extract days of the current month
  const days = getDaysInCurrentMonth();
  const emptyCells = getEmptyCells();
  
  // Get selected date activity
  const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
  const selectedActivity = getActivityForDate(selectedDateString);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack} 
            className="mr-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Puzzles
          </Button>
          <h1 className="text-2xl font-bold">Monthly Puzzle Calendar</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToPreviousMonth}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle>{formatDateForDisplay(currentDate)}</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={goToNextMonth}
                  >
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center py-2 font-medium text-sm">
                      {day}
                    </div>
                  ))}
                  
                  {/* Empty cells */}
                  {emptyCells.map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square p-1"></div>
                  ))}
                  
                  {/* Calendar days */}
                  {days.map((day) => {
                    const dateString = format(day, 'yyyy-MM-dd');
                    const dayActivity = getActivityForDate(dateString);
                    const hasActivityData = hasActivity(dateString);
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    
                    // Calculate color intensity based on puzzle count
                    const completionRate = Math.min(100, (dayActivity.count / DAILY_PUZZLE_GOAL) * 100);
                    
                    return (
                      <div 
                        key={dateString} 
                        className={cn(
                          "aspect-square p-1 cursor-pointer border relative hover:bg-gray-50",
                          isSelected ? "border-chess-deep-red bg-chess-deep-red/5" : "border-gray-100",
                          !isCurrentMonth && "opacity-40"
                        )}
                        onClick={() => handleDateSelect(day)}
                      >
                        <div className="h-full w-full flex flex-col">
                          <div className="text-right text-sm p-1">
                            {format(day, 'd')}
                          </div>
                          
                          {hasActivityData && (
                            <div className="flex-grow flex flex-col justify-center items-center">
                              <Badge className={cn("mb-1", getBadgeColor(dayActivity.count))}>
                                {dayActivity.count}/{DAILY_PUZZLE_GOAL}
                              </Badge>
                              
                              {/* Mini progress bar */}
                              <div className="w-full px-1">
                                <Progress 
                                  value={getProgressPercentage(dayActivity.count)} 
                                  className={cn("h-1", completionRate >= 100 ? "bg-green-500" : "bg-chess-deep-red")}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hasActivity(selectedDateString) ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge className={cn("text-white", getBadgeColor(selectedActivity.count))}>
                        {selectedActivity.count} / {DAILY_PUZZLE_GOAL} puzzles
                      </Badge>
                    </div>
                    
                    {/* Daily progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Daily Progress</span>
                        <span className="font-medium">{getProgressPercentage(selectedActivity.count)}%</span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(selectedActivity.count)} 
                        className={cn("h-2", selectedActivity.count >= DAILY_PUZZLE_GOAL ? "bg-green-500" : "bg-chess-deep-red")}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
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
                  <div className="flex flex-col items-center justify-center py-8">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 text-center">
                      No puzzle activity on this date
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate('/tactics')}
                >
                  Solve Daily Puzzles
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MonthlyCalendar;
