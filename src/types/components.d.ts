
// Type definitions for components
declare module "@/components/ChessBoard" {
  interface ChessBoardProps {
    fen: string;
    pgn?: string;
    solution?: string[];
    initialPly?: number;
    onSolved?: (success: boolean) => void;
    playerTurn?: string;
    isReversed?: boolean; // Added to support the reversed puzzle mode
  }
  
  const ChessBoard: React.FC<ChessBoardProps>;
  export default ChessBoard;
}
