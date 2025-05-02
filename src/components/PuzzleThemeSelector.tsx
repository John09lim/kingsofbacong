
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Target, CheckCircle2 } from "lucide-react";
import { LichessPuzzleThemes } from '@/services/lichessService';

interface PuzzleThemeSelectorProps {
  themes: LichessPuzzleThemes | null;
  solvedCountByTheme: Record<string, number>;
  isLoading: boolean;
  onSelectTheme: (theme: string) => void;
}

const PuzzleThemeSelector: React.FC<PuzzleThemeSelectorProps> = ({
  themes,
  solvedCountByTheme,
  isLoading,
  onSelectTheme
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default themes in case API doesn't return any
  const defaultThemes = [
    { key: 'fork', name: 'Fork', description: 'Attack two pieces at once' },
    { key: 'pin', name: 'Pin', description: 'Immobilize a piece' },
    { key: 'skewer', name: 'Skewer', description: 'Attack through a valuable piece' },
    { key: 'discovery', name: 'Discovery', description: 'Reveal an attack by moving a piece' },
    { key: 'mate', name: 'Checkmate', description: 'End the game' },
    { key: 'sacrifice', name: 'Sacrifice', description: 'Give up material for an advantage' },
  ];

  // Convert LichessPuzzleThemes to our display format or use defaults
  const displayThemes = themes && Object.keys(themes.themes).length > 0
    ? Object.entries(themes.themes).map(([key, name]) => ({
        key,
        name,
        description: `Puzzles featuring ${key} tactical patterns.`
      }))
    : defaultThemes;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-chess-deep-red" />
          Tactical Themes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayThemes.map((theme) => (
            <Card key={theme.key} className="overflow-hidden hover:border-chess-deep-red transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{theme.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {theme.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>{solvedCountByTheme[theme.key] || 0}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => onSelectTheme(theme.key)}
                  className="bg-chess-deep-red hover:bg-chess-dark-maroon w-full mt-2"
                  size="sm"
                >
                  Practice {theme.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleThemeSelector;
