
import React from 'react';
import { Chessboard } from 'react-chessboard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full max-w-md mx-auto">
      <AspectRatio ratio={1 / 1} className="w-full">
        <Chessboard 
          position={fen} 
          onPieceDrop={onPieceDrop}
          boardOrientation={boardOrientation}
          areArrowsAllowed
          animationDuration={300}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            width: "100%",
            height: "100%"
          }}
          customDarkSquareStyle={{ backgroundColor: "#b58863" }} 
          customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
          boardWidth={isMobile ? window.innerWidth * 0.9 : 400}
        />
      </AspectRatio>
    </div>
  );
};

export default ChessboardDisplay;
