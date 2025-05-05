
import React, { useEffect, useState } from 'react';
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
  const [boardWidth, setBoardWidth] = useState(400);
  
  // Calculate board width based on screen size
  useEffect(() => {
    const calculateWidth = () => {
      if (isMobile) {
        // For mobile, calculate a width that ensures all squares are visible (1-8)
        const screenWidth = window.innerWidth;
        // Use 92% of screen width on mobile for better visibility of all squares
        const calculatedWidth = Math.min(screenWidth * 0.92, 360); 
        setBoardWidth(calculatedWidth);
      } else {
        // For desktop, use fixed width
        setBoardWidth(400);
      }
    };
    
    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, [isMobile]);
  
  return (
    <div className="w-full max-w-md mx-auto chess-board-container">
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
          boardWidth={boardWidth}
        />
      </AspectRatio>
    </div>
  );
};

export default ChessboardDisplay;
