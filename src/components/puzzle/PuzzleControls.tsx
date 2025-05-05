
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface PuzzleControlsProps {
  onNewPuzzle: () => void;
  isSolved: boolean;
  isLoading: boolean;
}

const PuzzleControls: React.FC<PuzzleControlsProps> = ({ 
  onNewPuzzle, 
  isSolved,
  isLoading
}) => {
  return (
    <div className="flex justify-end">
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
