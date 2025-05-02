
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gauge } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PuzzleCourses: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Puzzle Courses</CardTitle>
        <CardDescription>Structured learning paths to master chess tactics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Basic Tactics Course</CardTitle>
              <CardDescription>Master the fundamental tactical patterns</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm mb-2">
                A structured course with 120 puzzles covering forks, pins, skewers, and more.
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="text-chess-deep-red h-4 w-4" />
                <span className="text-sm">Difficulty: Beginner-Friendly</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>0/120 puzzles</span>
                </div>
                <Progress value={0} className="h-1" />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon"
                onClick={() => {
                  toast({
                    title: "Course Coming Soon",
                    description: "Our structured courses are being prepared and will be available soon!",
                  });
                }}
              >
                Start Course
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Advanced Combinations</CardTitle>
              <CardDescription>Complex multi-move tactical sequences</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm mb-2">
                Challenge yourself with 80 advanced puzzles requiring deep calculation.
              </p>
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="text-chess-deep-red h-4 w-4" />
                <span className="text-sm">Difficulty: Advanced</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>0/80 puzzles</span>
                </div>
                <Progress value={0} className="h-1" />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon"
                onClick={() => {
                  toast({
                    title: "Course Coming Soon",
                    description: "Our advanced courses are being prepared and will be available soon!",
                  });
                }}
              >
                Start Course
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleCourses;
