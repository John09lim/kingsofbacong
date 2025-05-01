
import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";

interface DailyActivity {
  count: number;
  solved: number;
  failed: number;
  time: number;
}

const MonthlyCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [puzzleActivity, setPuzzleActivity] = useState<Record<string, DailyActivity>>({});
  
  useEffect(() => {
    // Load puzzle activity data from localStorage
    const storedActivity = localStorage.getItem('puzzleActivity');
    if (storedActivity) {
      setPuzzleActivity(JSON.parse(storedActivity));
    } else {
      // Generate sample data if none exists
      const sampleActivity: Record<string, DailyActivity> = {};
      const today = new Date();
      
      // Generate sample data for the past 60 days
      for (let i = 0; i < 60; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateKey = format(date, 'yyyy-MM-dd');
        
        // More recent days have more activity
        const count = Math.max(0, Math.floor(Math.random() * 10 * (1 - i/60)));
        if (count > 0 || Math.random() > 0.7) { // 30% chance of having data even if count is 0
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
    }
  }, []);

  const formattedSelectedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedActivity = formattedSelectedDate ? puzzleActivity[formattedSelectedDate] : undefined;

  // Custom day rendering to show activity
  const renderDay = (day: Date) => {
    const dateString = format(day, 'yyyy-MM-dd');
    const dayActivity = puzzleActivity[dateString];
    
    if (!dayActivity || dayActivity.count === 0) {
      return <div className="relative w-full h-full flex items-center justify-center">
        {day.getDate()}
      </div>;
    }
    
    // Calculate color intensity based on puzzle count (1-10)
    const intensity = Math.min(100, (dayActivity.count / 10) * 100);
    const bgColor = `rgba(152, 27, 27, ${intensity/100})`;
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {day.getDate()}
        <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-4 h-1.5 rounded-sm" 
             style={{ backgroundColor: bgColor }}></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-chess-dark-maroon mb-6">Monthly Puzzle Calendar</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      const prevMonth = new Date(currentDate);
                      prevMonth.setMonth(currentDate.getMonth() - 1);
                      setCurrentDate(prevMonth);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span>{format(currentDate, 'MMMM yyyy')}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      const nextMonth = new Date(currentDate);
                      nextMonth.setMonth(currentDate.getMonth() + 1);
                      setCurrentDate(nextMonth);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentDate}
                  onMonthChange={setCurrentDate}
                  className="p-0 pointer-events-auto w-full text-center"
                  components={{
                    Day: ({ date, ...props }) => (
                      <div {...props}>
                        {renderDay(date)}
                      </div>
                    )
                  }}
                />
                
                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-500 mb-2">Activity Legend:</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="w-3 h-3 rounded-sm bg-red-900 opacity-20"></div>
                    <span className="text-xs mr-4">1-3 puzzles</span>
                    <div className="w-3 h-3 rounded-sm bg-red-900 opacity-50"></div>
                    <span className="text-xs mr-4">4-7 puzzles</span>
                    <div className="w-3 h-3 rounded-sm bg-red-900 opacity-80"></div>
                    <span className="text-xs">8+ puzzles</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Monthly statistics section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {/* Calculate monthly stats */}
                  {(() => {
                    const start = startOfMonth(currentDate);
                    const end = endOfMonth(currentDate);
                    const daysInMonth = eachDayOfInterval({ start, end });
                    
                    const monthlyStats = daysInMonth.reduce(
                      (acc, day) => {
                        const dateString = format(day, 'yyyy-MM-dd');
                        const dayActivity = puzzleActivity[dateString];
                        
                        if (dayActivity) {
                          acc.totalCount += dayActivity.count;
                          acc.totalSolved += dayActivity.solved;
                          acc.totalFailed += dayActivity.failed;
                          acc.totalTime += dayActivity.time;
                          if (dayActivity.count > 0) acc.activeDays++;
                        }
                        
                        return acc;
                      },
                      { totalCount: 0, totalSolved: 0, totalFailed: 0, totalTime: 0, activeDays: 0 }
                    );
                    
                    return (
                      <>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Total Puzzles</div>
                          <div className="font-bold text-2xl">{monthlyStats.totalCount}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Solved</div>
                          <div className="font-bold text-2xl text-green-600">{monthlyStats.totalSolved}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Active Days</div>
                          <div className="font-bold text-2xl">{monthlyStats.activeDays}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500">Accuracy</div>
                          <div className="font-bold text-2xl">
                            {monthlyStats.totalCount > 0 
                              ? `${Math.round((monthlyStats.totalSolved / monthlyStats.totalCount) * 100)}%` 
                              : "0%"}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Daily details section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Daily Details</CardTitle>
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
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Correct Solutions</div>
                        <div className="font-bold text-xl text-green-600">{selectedActivity.solved}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Failed Attempts</div>
                        <div className="font-bold text-xl text-red-600">{selectedActivity.failed}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Time Spent</div>
                        <div className="font-bold text-xl">
                          {Math.floor(selectedActivity.time / 60)}m {selectedActivity.time % 60}s
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Accuracy Rate</div>
                        <div className="font-bold text-xl">
                          {selectedActivity.count > 0 
                            ? `${Math.round((selectedActivity.solved / selectedActivity.count) * 100)}%` 
                            : "0%"}
                        </div>
                      </div>
                    </div>
                    
                    {/* Add some dummy puzzle details */}
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Puzzles Solved</h4>
                      <div className="space-y-2">
                        {Array.from({ length: Math.min(selectedActivity.solved, 3) }).map((_, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium">Puzzle #{Math.floor(Math.random() * 10000)}</span>
                            <Badge variant="outline">
                              {['Fork', 'Pin', 'Discovery', 'Mate in 2', 'Sacrifice'][Math.floor(Math.random() * 5)]}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-12">
                    <div className="text-center text-gray-500">
                      <CalendarIcon className="mx-auto h-10 w-10 mb-3 opacity-50" />
                      <p>Select a date to view puzzle activity details</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MonthlyCalendar;
