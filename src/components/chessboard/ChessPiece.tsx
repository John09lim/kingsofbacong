
import React from 'react';

interface ChessPieceProps {
  piece: string;
  isSelected: boolean;
  isAnimating: boolean;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, isSelected, isAnimating }) => {
  // Get piece image path based on piece symbol
  const getPieceImage = (piece: string) => {
    const pieceMap: { [key: string]: string } = {
      'r': '/rook-black.svg', 
      'n': '/knight-black.svg', 
      'b': '/bishop-black.svg', 
      'q': '/queen-black.svg', 
      'k': '/king-black.svg', 
      'p': '/pawn-black.svg',
      'R': '/rook-white.svg', 
      'N': '/knight-white.svg', 
      'B': '/bishop-white.svg', 
      'Q': '/queen-white.svg', 
      'K': '/king-white.svg', 
      'P': '/pawn-white.svg'
    };
    return pieceMap[piece] || '';
  };
  
  // Check if a piece is white
  const isWhitePiece = (piece: string) => {
    return piece !== '' && piece === piece.toUpperCase();
  };
  
  if (!piece) return null;
  
  return (
    <img 
      src={getPieceImage(piece)} 
      alt={`${isWhitePiece(piece) ? 'White' : 'Black'} ${piece.toLowerCase()}`}
      className={`
        chess-piece w-10 h-10
        ${isSelected ? 'opacity-70' : ''}
        ${isAnimating ? 'animate-scale-in' : ''}
      `}
    />
  );
};

export default ChessPiece;
