
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, RefreshCw, Loader2 } from "lucide-react";

interface PuzzleErrorStateProps {
  onGetNewPuzzle: () => void;
  isRefreshing?: boolean;
}

const PuzzleErrorState: React.FC<PuzzleErrorStateProps> = ({
  onGetNewPuzzle,
  isRefreshing = false
}) => {
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
            onClick={onGetNewPuzzle} 
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
};

export default PuzzleErrorState;
