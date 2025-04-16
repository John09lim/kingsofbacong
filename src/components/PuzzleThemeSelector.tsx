
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sword, Crosshair, Target, Brain, Zap, CheckCircle2, Shield, Trophy, Gauge } from "lucide-react";
import { LichessPuzzleTheme } from "@/services/lichessService";
import { Skeleton } from "@/components/ui/skeleton";

interface PuzzleThemeSelectorProps {
  themes: LichessPuzzleTheme[];
  solvedCountByTheme?: Record<string, number>;
  isLoading?: boolean;
  onSelectTheme: (themeKey: string) => void;
}

const PuzzleThemeSelector: React.FC<PuzzleThemeSelectorProps> = ({ 
  themes, 
  solvedCountByTheme = {}, 
  isLoading = false,
  onSelectTheme 
}) => {
  // Get icon component for a theme
  const getThemeIcon = (themeKey: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      fork: <Sword className="h-6 w-6 text-chess-deep-red" />,
      pin: <Crosshair className="h-6 w-6 text-chess-deep-red" />,
      skewer: <Target className="h-6 w-6 text-chess-deep-red" />,
      sacrifice: <Brain className="h-6 w-6 text-chess-deep-red" />,
      discovery: <Zap className="h-6 w-6 text-chess-deep-red" />,
      mate: <CheckCircle2 className="h-6 w-6 text-chess-deep-red" />,
      doubleCheck: <Gauge className="h-6 w-6 text-chess-deep-red" />,
      defensiveTactics: <Shield className="h-6 w-6 text-chess-deep-red" />,
      advantage: <Trophy className="h-6 w-6 text-chess-deep-red" />
    };
    
    return iconMap[themeKey] || <Zap className="h-6 w-6 text-chess-deep-red" />;
  };
  
  // Get difficulty level for a theme
  const getThemeDifficulty = (themeKey: string) => {
    const difficultyMap: Record<string, string> = {
      fork: "Beginner to Intermediate",
      pin: "Beginner to Intermediate",
      skewer: "Intermediate",
      discovery: "Intermediate",
      mate: "All Levels",
      sacrifice: "Advanced",
      doubleCheck: "Intermediate to Advanced",
      defensiveTactics: "Advanced",
      advantage: "Beginner"
    };
    
    return difficultyMap[themeKey] || "All Levels";
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i} className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="pb-2">
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-2 w-full mb-4" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {themes.map((theme) => {
        const solvedCount = solvedCountByTheme[theme.key] || 0;
        const totalCount = 40; // In a real app, this would be fetched from the API
        
        return (
          <Card key={theme.key} className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {getThemeIcon(theme.key)}
                <div>
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                  <CardDescription className="text-xs">{getThemeDifficulty(theme.key)}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm mb-3">{theme.description}</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{solvedCount}/{totalCount}</span>
                </div>
                <Progress 
                  value={(solvedCount / totalCount) * 100} 
                  className="h-1"
                />
              </div>
              
              <Button 
                size="sm" 
                className="w-full mt-4 bg-chess-deep-red hover:bg-chess-dark-maroon"
                onClick={() => onSelectTheme(theme.key)}
              >
                Practice
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PuzzleThemeSelector;
