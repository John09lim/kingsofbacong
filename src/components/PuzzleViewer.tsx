
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Loader2, Info, Check, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ChessBoard from "@/components/ChessBoard";
import { LichessPuzzleData } from "@/services/lichessService";

interface PuzzleViewerProps {
  puzzleData?: LichessPuzzleData | null;
  isLoading: boolean;
  onGetNextPuzzle: () => void;
  onSolved: () => void;
  isRefreshing?: boolean;
}

const PuzzleViewer: React.FC<PuzzleViewerProps> = ({
  puzzleData,
  isLoading,
  onGetNextPuzzle,
  onSolved,
  isRefreshing = false
}) => {
  const [isSolved, setIsSolved] = useState(false);
  
  // Handle when the puzzle is solved
  const handlePuzzleSolved = () => {
    setIsSolved(true);
    onSolved();
  };
  
  // Handle getting a new puzzle
  const handleGetNewPuzzle = () => {
    setIsSolved(false);
    onGetNextPuzzle();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="w-full h-[384px] rounded-md" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!puzzleData) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>No Puzzle Available</CardTitle>
          <CardDescription>We couldn't load a puzzle at this time</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No puzzle available</AlertTitle>
            <AlertDescription>
              We couldn't load a puzzle. Please try refreshing or come back later.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleGetNewPuzzle} 
              disabled={isRefreshing}
              className="flex items-center gap-1"
            >
              {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>
            {puzzleData.puzzle.themes && puzzleData.puzzle.themes.length > 0 ? 
              puzzleData.puzzle.themes.includes('mate') 
                ? 'Checkmate Puzzle' 
                : puzzleData.puzzle.themes.includes('fork') 
                  ? 'Fork Puzzle' 
                  : puzzleData.puzzle.themes[0].charAt(0).toUpperCase() + puzzleData.puzzle.themes[0].slice(1) + ' Puzzle'
              : 'Tactical Puzzle'
            }
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGetNewPuzzle}
            disabled={isRefreshing}
            className="flex items-center gap-1"
          >
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            New Puzzle
          </Button>
        </CardTitle>
        <CardDescription>
          Rating: {puzzleData.puzzle.rating} • Themes: {puzzleData.puzzle.themes && puzzleData.puzzle.themes.length > 0 ? 
            puzzleData.puzzle.themes.map((t: string) => 
              t.charAt(0).toUpperCase() + t.slice(1)
            ).join(', ') : 'Tactical'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChessBoard 
          fen={puzzleData.puzzle.fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"} 
          pgn={puzzleData.game?.pgn || ""}
          solution={puzzleData.puzzle.solution || []}
          initialPly={puzzleData.puzzle.initialPly || 0}
          onSolved={handlePuzzleSolved}
        />
      </CardContent>
      {puzzleData.game && (
        <CardFooter className="border-t pt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-1">Game Info</h4>
            <p className="text-xs text-gray-600">
              {puzzleData.game.rated ? "Rated" : "Casual"} {puzzleData.game.perf?.name || "Game"} • Clock: {puzzleData.game.clock || "Standard"}
            </p>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-1">Players</h4>
            <div className="text-xs">
              <div>White: {puzzleData.game.players && puzzleData.game.players[0]?.title || ""} {puzzleData.game.players && puzzleData.game.players[0]?.name || "Player 1"} ({puzzleData.game.players && puzzleData.game.players[0]?.rating || "?"})</div>
              <div>Black: {puzzleData.game.players && puzzleData.game.players[1]?.title || ""} {puzzleData.game.players && puzzleData.game.players[1]?.name || "Player 2"} ({puzzleData.game.players && puzzleData.game.players[1]?.rating || "?"})</div>
            </div>
          </div>
          
          {isSolved && (
            <div className="flex items-center">
              <Badge className="bg-green-500 text-white flex items-center gap-1">
                <Check className="h-3 w-3" />
                Solved!
              </Badge>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default PuzzleViewer;
