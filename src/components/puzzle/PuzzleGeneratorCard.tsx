
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Timer, Zap, Trophy, Star, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PuzzleGeneratorCardProps {
  difficulty: number;
  setDifficulty: (difficulty: number) => void;
  solvedCount: number;
  puzzleStats: {
    streak: number;
    ratingDelta: number;
  };
  isRefreshing: boolean;
  onStartPuzzleByDifficulty: () => void;
}

const PuzzleGeneratorCard: React.FC<PuzzleGeneratorCardProps> = ({
  difficulty,
  setDifficulty,
  solvedCount,
  puzzleStats,
  isRefreshing,
  onStartPuzzleByDifficulty
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Puzzle Generator</CardTitle>
        <CardDescription>Start solving puzzles tailored to your level</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Difficulty: {difficulty} Elo</span>
            <span className="text-sm text-gray-500">
              {difficulty < 1400 ? 'Beginner' : difficulty < 1800 ? 'Intermediate' : 'Advanced'}
            </span>
          </div>
          <div className="px-4">
            <Slider
              defaultValue={[1200]}
              value={[difficulty]}
              onValueChange={(value) => setDifficulty(value[0])}
              min={800}
              max={2400}
              step={50}
              className="mb-4"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Easy</span>
            <span>Medium</span>
            <span>Hard</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="flex-1 bg-chess-deep-red hover:bg-chess-dark-maroon"
            onClick={onStartPuzzleByDifficulty}
            disabled={isRefreshing}
          >
            {isRefreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
            Start Puzzle
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => {
              toast({
                title: "Puzzle Rush",
                description: "Solve as many puzzles as you can in 5 minutes! Coming soon.",
              });
            }}
          >
            <Timer className="mr-2 h-4 w-4" />
            Puzzle Rush
          </Button>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="text-sm">{solvedCount} puzzles solved</span>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+{puzzleStats.ratingDelta} rating today</span>
            </Badge>
            <Badge variant="outline" className="bg-amber-50">
              <Star className="h-3 w-3 mr-1 text-amber-500" />
              <span>{puzzleStats.streak} day streak</span>
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PuzzleGeneratorCard;
