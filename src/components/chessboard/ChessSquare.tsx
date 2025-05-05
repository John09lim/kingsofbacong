
import React from 'react';
import ChessPiece from './ChessPiece';

interface ChessSquareProps {
  row: number;
  col: number;
  piece: string;
  squareClasses: string;
  isLastMoveFrom: boolean;
  isLastMoveTo: boolean;
  isSelected: boolean;
  isAnimating: boolean;
  showCoordinates: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ChessSquare: React.FC<ChessSquareProps> = ({
  row,
  col,
  piece,
  squareClasses,
  isLastMoveFrom,
  isLastMoveTo,
  isSelected,
  isAnimating,
  showCoordinates,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${squareClasses} aspect-square flex items-center justify-center relative p-0 touch-manipulation`}
    >
      <div className="w-full h-full flex items-center justify-center">
        {piece && (
          <ChessPiece 
            piece={piece} 
            isSelected={isSelected}
            isAnimating={isAnimating && isLastMoveTo}
          />
        )}
      </div>
      
      {/* File and rank labels */}
      {showCoordinates && (
        <>
          {col === 0 && (
            <span className="chess-coordinates chess-rank">
              {8 - row}
            </span>
          )}
          {row === 7 && (
            <span className="chess-coordinates chess-file">
              {"abcdefgh"[col]}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default ChessSquare;
