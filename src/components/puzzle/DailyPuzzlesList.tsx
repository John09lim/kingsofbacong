
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DailyPuzzle {
  id: number;
  difficulty: string;
  rating: number;
  theme: string;
  solvedCount: number;
  solvedPercentage: number;
}

interface DailyPuzzlesListProps {
  dailyPuzzles: DailyPuzzle[];
  onSelectPuzzle: (rating: number) => void;
}

const DailyPuzzlesList: React.FC<DailyPuzzlesListProps> = ({ dailyPuzzles, onSelectPuzzle }) => {
  return (
    <Card className="mt-6 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Daily Puzzles</CardTitle>
        <CardDescription>Fresh puzzles updated every day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dailyPuzzles.map((puzzle) => (
            <div key={puzzle.id} className="border rounded-md p-4 hover:border-chess-deep-red transition-colors">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-medium">{puzzle.difficulty} Puzzle</h4>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>Rating: {puzzle.rating}</span>
                    <span className="text-xs">•</span>
                    <span>Theme: {puzzle.theme}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-chess-deep-red hover:bg-chess-dark-maroon"
                  onClick={() => onSelectPuzzle(puzzle.rating)}
                >
                  Solve
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={puzzle.solvedPercentage} className="h-2 flex-1" />
                <span className="text-xs font-medium">{puzzle.solvedPercentage}% solved</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {puzzle.solvedCount} players have attempted this puzzle
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPuzzlesList;
