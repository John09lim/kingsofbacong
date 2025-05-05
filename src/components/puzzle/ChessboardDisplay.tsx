
import React from 'react';
import { Chessboard } from 'react-chessboard';

interface ChessboardDisplayProps {
  fen: string;
  onPieceDrop: (source: string, target: string) => boolean;
  boardOrientation: "white" | "black";
}

const ChessboardDisplay: React.FC<ChessboardDisplayProps> = ({ 
  fen, 
  onPieceDrop, 
  boardOrientation 
}) => {
  return (
    <div className="w-full aspect-square max-w-md">
      <Chessboard 
        position={fen} 
        onPieceDrop={onPieceDrop}
        boardOrientation={boardOrientation}
        areArrowsAllowed
        animationDuration={300}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
        customDarkSquareStyle={{ backgroundColor: "#b58863" }} 
        customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
      />
    </div>
  );
};

export default ChessboardDisplay;
