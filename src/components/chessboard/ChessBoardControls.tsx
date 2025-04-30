
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Lightbulb } from "lucide-react";

interface ChessBoardControlsProps {
  boardFlipped: boolean;
  onFlipBoard: () => void;
  onShowHint: () => void;
  onReset: () => void;
  isSolved: boolean;
  waitingForComputerMove: boolean;
  currentSolutionIndex: number;
  solutionLength: number;
  solveTime?: number;
  playerTurn: 'w' | 'b';
  disableHint: boolean;
}

const ChessBoardControls: React.FC<ChessBoardControlsProps> = ({
  boardFlipped,
  onFlipBoard,
  onShowHint,
  onReset,
  isSolved,
  waitingForComputerMove,
  currentSolutionIndex,
  solutionLength,
  solveTime,
  playerTurn,
  disableHint
}) => {
  return (
    <>
      <div className="mb-4 flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Switch
            id="board-orientation"
            checked={!boardFlipped}
            onCheckedChange={onFlipBoard}
          />
          <Label htmlFor="board-orientation">
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Flip Board</span>
          </Label>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onShowHint}
            className="flex items-center gap-1"
            disabled={disableHint}
          >
            <Lightbulb className="h-4 w-4" />
            Hint
          </Button>
          
          {waitingForComputerMove && (
            <Badge className="bg-amber-500">
              Computer thinking...
            </Badge>
          )}
          
          {!waitingForComputerMove && !isSolved && (
            <Badge className="bg-blue-500">
              {playerTurn === 'w' ? "White" : "Black"} to move
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="flex items-center gap-1"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        
        {isSolved ? (
          <div className="flex items-center gap-1 text-green-600 font-medium">
            <Check className="h-4 w-4" />
            Solved in {solveTime}s!
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            {currentSolutionIndex}/{solutionLength} moves
          </div>
        )}
      </div>
    </>
  );
};

// Import the Check icon for the solved state
import { Check } from 'lucide-react';

export default ChessBoardControls;
