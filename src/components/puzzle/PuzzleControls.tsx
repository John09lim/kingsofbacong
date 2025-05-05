
import React from 'react';
import { Button } from "@/components/ui/button";
import { Lightbulb, RefreshCw } from "lucide-react";

interface PuzzleControlsProps {
  onShowHint: () => void;
  onNewPuzzle: () => void;
  isSolved: boolean;
  isLoading: boolean;
}

const PuzzleControls: React.FC<PuzzleControlsProps> = ({ 
  onShowHint, 
  onNewPuzzle, 
  isSolved,
  isLoading
}) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        onClick={onShowHint} 
        disabled={isLoading || isSolved}
      >
        <Lightbulb className="mr-2 h-4 w-4" /> Hint
      </Button>
      <Button 
        onClick={onNewPuzzle} 
        disabled={isLoading}
      >
        <RefreshCw className="mr-2 h-4 w-4" /> New Puzzle
      </Button>
    </div>
  );
};

export default PuzzleControls;
