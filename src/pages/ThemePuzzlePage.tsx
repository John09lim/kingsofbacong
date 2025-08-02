import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PuzzleViewer from '@/components/PuzzleViewer';
import { Button } from '@/components/ui/button';
import { usePuzzle } from '@/hooks/usePuzzle';

const ThemePuzzlePage = () => {
  const { theme } = useParams<{ theme: string }>();
  const navigate = useNavigate();
  const { 
    puzzleData, 
    isPuzzleLoading, 
    fetchPuzzlesByTheme, 
    fetchNextPuzzle, 
    markPuzzleSolved 
  } = usePuzzle();

  // Theme display names mapping
  const themeDisplayNames: Record<string, string> = {
    mix: "Healthy Mix",
    opening: "Opening",
    middlegame: "Middlegame", 
    endgame: "Endgame",
    rookEndgame: "Rook Endgame",
    bishopEndgame: "Bishop Endgame",
    pawnEndgame: "Pawn Endgame",
    knightEndgame: "Knight Endgame",
    queenEndgame: "Queen Endgame",
    queenRookEndgame: "Queen and Rook Endgame",
    sicilianDefense: "Sicilian Defense",
    frenchDefense: "French Defense",
    queensPawnGame: "Queen's Pawn Game",
    italianGame: "Italian Game",
    caroKannDefense: "Caro-Kann Defense",
    scandinavianDefense: "Scandinavian Defense",
    queensGambitDeclined: "Queen's Gambit Declined",
    englishOpening: "English Opening",
    ruyLopez: "Ruy Lopez",
    scotchGame: "Scotch Game",
    indianDefense: "Indian Defense",
    philidorDefense: "Philidor Defense",
    advancedPawn: "Advanced Pawn",
    attackingF2F7: "Attacking f2 or f7",
    capturingDefender: "Capture the Defender",
    discoveredAttack: "Discovered Attack",
    doubleCheck: "Double Check",
    exposedKing: "Exposed King",
    fork: "Fork",
    hangingPiece: "Hanging Piece",
    kingsideAttack: "Kingside Attack",
    pin: "Pin",
    queensideAttack: "Queenside Attack",
    sacrifice: "Sacrifice",
    skewer: "Skewer",
    trappedPiece: "Trapped Piece",
    attraction: "Attraction",
    clearance: "Clearance",
    defensiveMove: "Defensive Move",
    deflection: "Deflection",
    interference: "Interference",
    intermezzo: "Intermezzo",
    quietMove: "Quiet Move",
    xRayAttack: "X-Ray Attack",
    zugzwang: "Zugzwang",
    mate: "Checkmate",
    mateIn1: "Mate in 1",
    mateIn2: "Mate in 2",
    mateIn3: "Mate in 3",
    mateIn4: "Mate in 4",
    mateIn5: "Mate in 5 or more",
    anastasiaMate: "Anastasia's Mate",
    arabianMate: "Arabian Mate",
    backRankMate: "Back Rank Mate",
    bodenMate: "Boden's Mate",
    doubleBishopMate: "Double Bishop Mate",
    dovetailMate: "Dovetail Mate",
    hookMate: "Hook Mate",
    killBoxMate: "Kill Box Mate",
    vukovicMate: "Vuković Mate",
    smotheredMate: "Smothered Mate",
    castling: "Castling",
    enPassant: "En Passant",
    promotion: "Promotion",
    underPromotion: "Underpromotion",
    equality: "Equality",
    advantage: "Advantage",
    crushing: "Crushing",
    oneMove: "One-move Puzzle",
    short: "Short Puzzle",
    long: "Long Puzzle",
    veryLong: "Very Long Puzzle",
    master: "Master Games",
    masterVsMaster: "Master vs Master Games",
    superGM: "Super GM Games",
    playerGames: "Player Games"
  };

  const themeDisplayName = theme ? themeDisplayNames[theme] || theme : 'Unknown Theme';

  // Fetch initial puzzle for the theme
  useEffect(() => {
    if (theme) {
      fetchPuzzlesByTheme(theme);
    }
  }, [theme, fetchPuzzlesByTheme]);

  const handleBackToTactics = () => {
    navigate('/tactics');
  };

  const handleGetNextPuzzle = () => {
    if (theme) {
      fetchPuzzlesByTheme(theme);
    }
  };

  const handlePuzzleSolved = () => {
    if (puzzleData) {
      markPuzzleSolved(puzzleData.puzzle.id, puzzleData, true);
    }
  };

  const handlePuzzleFailed = () => {
    if (puzzleData) {
      markPuzzleSolved(puzzleData.puzzle.id, puzzleData, false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-chess-dark-maroon py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToTactics}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tactics
              </Button>
            </div>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {themeDisplayName}
              </h1>
              <p className="text-chess-light-pink text-lg">
                Train your tactical skills with {themeDisplayName.toLowerCase()} puzzles
              </p>
            </div>
          </div>
        </div>

        {/* Puzzle Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <PuzzleViewer
              puzzleData={puzzleData}
              isLoading={isPuzzleLoading}
              onGetNextPuzzle={handleGetNextPuzzle}
              onSolved={handlePuzzleSolved}
              onFailed={handlePuzzleFailed}
              isRefreshing={isPuzzleLoading}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThemePuzzlePage;