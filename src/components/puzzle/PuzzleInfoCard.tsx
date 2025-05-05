
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RapidApiPuzzle } from '@/hooks/useChessPuzzleApi';

interface PuzzleInfoCardProps {
  puzzle: RapidApiPuzzle;
}

const PuzzleInfoCard: React.FC<PuzzleInfoCardProps> = ({ puzzle }) => {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500">Puzzle ID: {puzzle.id}</p>
      <p className="text-sm text-gray-500">Rating: {puzzle.rating}</p>
      <p className="text-sm text-gray-500">
        Side to Play: {puzzle.color === 'white' ? 'White' : 'Black'}
      </p>
      <p className="text-sm text-gray-500">
        Themes: {puzzle.themes.replace(/,/g, ', ')}
      </p>
    </div>
  );
};

export default PuzzleInfoCard;
