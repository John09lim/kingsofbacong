
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
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'justify-center puzzle-controls' : 'justify-end'}`}>
      <Button 
        onClick={onNewPuzzle} 
        disabled={isLoading}
        className={isMobile ? 'w-full max-w-[200px]' : ''}
      >
        <RefreshCw className="mr-2 h-4 w-4" /> {isMobile ? "Next Puzzle" : "New Puzzle"}
      </Button>
    </div>
  );
};

export default PuzzleControls;
