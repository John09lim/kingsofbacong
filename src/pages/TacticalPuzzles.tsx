import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';

interface PuzzleTheme {
  slug: string;
  title: string;
}

interface ThemeCategory {
  title: string;
  themes: PuzzleTheme[];
}

const TacticalPuzzles = () => {
  
  // Comprehensive list of ChessGo.in puzzle themes organized by categories
  const themeCategories: ThemeCategory[] = [
    {
      title: "Checkmates",
      themes: [
        { slug: "mateInOneMove", title: "Mate in one move" },
        { slug: "mateInTwoMoves", title: "Mate in two moves" },
        { slug: "mateInThreeMoves", title: "Mate in three moves" },
        { slug: "mateInFourMoves", title: "Mate in four moves" },
        { slug: "mateIn5OrMoreMoves", title: "Mate in 5 or more moves" },
        { slug: "backRankMate", title: "Back Rank Mate" },
        { slug: "smotheredMate", title: "Smothered Mate" },
        { slug: "anastasiaMate", title: "Anastasia mate" },
        { slug: "arabianMate", title: "Arabian mate" },
        { slug: "bodensMate", title: "Bodens mate" },
        { slug: "doubleBishopMate", title: "Double‑bishop mate" },
        { slug: "dovetailMate", title: "Dovetail mate" },
        { slug: "hookMate", title: "Hook mate" }
      ]
    },
    {
      title: "Openings",
      themes: [
        { slug: "opening", title: "Opening" },
        { slug: "frenchDefense", title: "French Defense" },
        { slug: "ruyLopez", title: "Ruy Lopez" },
        { slug: "sicilianDefense", title: "Sicilian Defense" },
        { slug: "caroKannDefense", title: "Caro‑Kann Defense" },
        { slug: "indianDefense", title: "Indian Defense" },
        { slug: "italianGame", title: "Italian Game" },
        { slug: "queensGambitDeclined", title: "Queens Gambit Declined" },
        { slug: "queensPawnGame", title: "Queens Pawn Game" },
        { slug: "englishOpening", title: "English Opening" },
        { slug: "russianGame", title: "Russian Game" },
        { slug: "philidorDefense", title: "Philidor Defense" },
        { slug: "scandinavianDefense", title: "Scandinavian Defense" },
        { slug: "scotchGame", title: "Scotch Game" },
        { slug: "modernDefense", title: "Modern Defense" },
        { slug: "fourKnightsDefense", title: "Four Knights Defense" },
        { slug: "kingsGambitAccepted", title: "Kings Gambit Accepted" },
        { slug: "pircDefense", title: "Pirc Defense" },
        { slug: "damianoDefense", title: "Damiano Defense" },
        { slug: "rapportJobavaSystem", title: "Rapport Jobava System" },
        { slug: "viennaGame", title: "Vienna Game" }
      ]
    },
    {
      title: "Endgames",
      themes: [
        { slug: "endgame", title: "Endgame" },
        { slug: "promotion", title: "Promotion" },
        { slug: "zugzwang", title: "Zugzwang" },
        { slug: "pawnEndgame", title: "Pawn Endgame" },
        { slug: "rookEndgame", title: "Rook Endgame" },
        { slug: "queenEndgame", title: "Queen Endgame" },
        { slug: "queenRookEndgame", title: "Queen Rook Endgame" },
        { slug: "advancedPawn", title: "Advanced Pawn" },
        { slug: "bishopEndgame", title: "Bishop Endgame" },
        { slug: "knightEndgame", title: "Knight Endgame" },
        { slug: "attackingF2F7", title: "Attacking f2‑f7" }
      ]
    },
    {
      title: "Tactics",
      themes: [
        { slug: "pin", title: "Pin" },
        { slug: "fork", title: "Fork (Double Attack)" },
        { slug: "skewer", title: "Skewer" },
        { slug: "discoveredAttack", title: "Discovered Attack" },
        { slug: "doubleCheck", title: "Double Check" },
        { slug: "attraction", title: "Attraction" },
        { slug: "xRayAttack", title: "X‑Ray Attack" },
        { slug: "defensiveMove", title: "Defensive Move" },
        { slug: "deflection", title: "Deflection" },
        { slug: "hangingPiece", title: "Hanging Piece" },
        { slug: "sacrifice", title: "Sacrifice" },
        { slug: "interference", title: "Interference" },
        { slug: "trappedPiece", title: "Trapped Piece" },
        { slug: "capturingDefender", title: "Capturing Defender" },
        { slug: "clearance", title: "Clearance" },
        { slug: "exposedKing", title: "Exposed King" },
        { slug: "kingSideAttack", title: "Kingside Attack" },
        { slug: "queenSideAttack", title: "Queenside Attack" },
        { slug: "quietMove", title: "Quiet Move" },
        { slug: "intermezzo", title: "Intermezzo" },
        { slug: "middleGame", title: "Middle Game" }
      ]
    },
    {
      title: "Special moves",
      themes: [
        { slug: "enPassant", title: "En Passant" },
        { slug: "underPromotion", title: "Underpromotion" },
        { slug: "castling", title: "Castling" },
        { slug: "promotionSpecial", title: "Promotion" }
      ]
    },
    {
      title: "Length of puzzle",
      themes: [
        { slug: "short", title: "Short" },
        { slug: "oneMove", title: "One Move" },
        { slug: "long", title: "Long" },
        { slug: "veryLong", title: "Very Long" }
      ]
    },
    {
      title: "Goals",
      themes: [
        { slug: "mate", title: "Checkmate" },
        { slug: "advantage", title: "Advantage" },
        { slug: "crushing", title: "Crushing" },
        { slug: "equality", title: "Equality" }
      ]
    },
    {
      title: "Other",
      themes: [
        { slug: "master", title: "Master Games" },
        { slug: "mixed", title: "Mixed" }
      ]
    }
  ];

  // URL mappings for each puzzle theme pointing to ChessGo.in
  const themeUrls: Record<string, string> = {
    // Checkmates
    mateInOneMove: "https://www.chessgo.in/puzzles/mate-in-one-move",
    mateInTwoMoves: "https://www.chessgo.in/puzzles/mate-in-two-moves",
    mateInThreeMoves: "https://www.chessgo.in/puzzles/mate-in-three-moves",
    mateInFourMoves: "https://www.chessgo.in/puzzles/mate-in-four-moves",
    mateIn5OrMoreMoves: "https://www.chessgo.in/puzzles/mate-in-5-or-more-moves",
    backRankMate: "https://www.chessgo.in/puzzles/back-rank-mate",
    smotheredMate: "https://www.chessgo.in/puzzles/smothered-mate",
    anastasiaMate: "https://www.chessgo.in/puzzles/anastasia-mate",
    arabianMate: "https://www.chessgo.in/puzzles/arabian-mate",
    bodensMate: "https://www.chessgo.in/puzzles/bodens-mate",
    doubleBishopMate: "https://www.chessgo.in/puzzles/double-bishop-mate",
    dovetailMate: "https://www.chessgo.in/puzzles/dovetail-mate",
    hookMate: "https://www.chessgo.in/puzzles/hook-mate",
    
    // Openings
    opening: "https://www.chessgo.in/puzzles/opening",
    frenchDefense: "https://www.chessgo.in/puzzles/french-defense",
    ruyLopez: "https://www.chessgo.in/puzzles/ruy-lopez",
    sicilianDefense: "https://www.chessgo.in/puzzles/sicilian-defense",
    caroKannDefense: "https://www.chessgo.in/puzzles/caro-kann-defense",
    indianDefense: "https://www.chessgo.in/puzzles/indian-defense",
    italianGame: "https://www.chessgo.in/puzzles/italian-game",
    queensGambitDeclined: "https://www.chessgo.in/puzzles/queens-gambit-declined",
    queensPawnGame: "https://www.chessgo.in/puzzles/queens-pawn-game",
    englishOpening: "https://www.chessgo.in/puzzles/english-opening",
    russianGame: "https://www.chessgo.in/puzzles/russian-game",
    philidorDefense: "https://www.chessgo.in/puzzles/philidor-defense",
    scandinavianDefense: "https://www.chessgo.in/puzzles/scandinavian-defense",
    scotchGame: "https://www.chessgo.in/puzzles/scotch-game",
    modernDefense: "https://www.chessgo.in/puzzles/modern-defense",
    fourKnightsDefense: "https://www.chessgo.in/puzzles/four-knights-defense",
    kingsGambitAccepted: "https://www.chessgo.in/puzzles/kings-gambit-accepted",
    pircDefense: "https://www.chessgo.in/puzzles/pirc-defense",
    damianoDefense: "https://www.chessgo.in/puzzles/damiano-defense",
    rapportJobavaSystem: "https://www.chessgo.in/puzzles/rapport-jobava-system",
    viennaGame: "https://www.chessgo.in/puzzles/vienna-game",
    
    // Endgames
    endgame: "https://www.chessgo.in/puzzles/endgame",
    promotion: "https://www.chessgo.in/puzzles/promotion",
    zugzwang: "https://www.chessgo.in/puzzles/zugzwang",
    pawnEndgame: "https://www.chessgo.in/puzzles/pawn-endgame",
    rookEndgame: "https://www.chessgo.in/puzzles/rook-endgame",
    queenEndgame: "https://www.chessgo.in/puzzles/queen-endgame",
    queenRookEndgame: "https://www.chessgo.in/puzzles/queen-rook-endgame",
    advancedPawn: "https://www.chessgo.in/puzzles/advanced-pawn",
    bishopEndgame: "https://www.chessgo.in/puzzles/bishop-endgame",
    knightEndgame: "https://www.chessgo.in/puzzles/knight-endgame",
    attackingF2F7: "https://www.chessgo.in/puzzles/attacking-f2-f7",
    
    // Tactics
    pin: "https://www.chessgo.in/puzzles/pin",
    fork: "https://www.chessgo.in/puzzles/fork",
    skewer: "https://www.chessgo.in/puzzles/skewer",
    discoveredAttack: "https://www.chessgo.in/puzzles/discovered-attack",
    doubleCheck: "https://www.chessgo.in/puzzles/double-check",
    attraction: "https://www.chessgo.in/puzzles/attraction",
    xRayAttack: "https://www.chessgo.in/puzzles/x-ray-attack",
    defensiveMove: "https://www.chessgo.in/puzzles/defensive-move",
    deflection: "https://www.chessgo.in/puzzles/deflection",
    hangingPiece: "https://www.chessgo.in/puzzles/hanging-piece",
    sacrifice: "https://www.chessgo.in/puzzles/sacrifice",
    interference: "https://www.chessgo.in/puzzles/interference",
    trappedPiece: "https://www.chessgo.in/puzzles/trapped-piece",
    capturingDefender: "https://www.chessgo.in/puzzles/capturing-defender",
    clearance: "https://www.chessgo.in/puzzles/clearance",
    exposedKing: "https://www.chessgo.in/puzzles/exposed-king",
    kingSideAttack: "https://www.chessgo.in/puzzles/king-side-attack",
    queenSideAttack: "https://www.chessgo.in/puzzles/queen-side-attack",
    quietMove: "https://www.chessgo.in/puzzles/quiet-move",
    intermezzo: "https://www.chessgo.in/puzzles/intermezzo",
    middleGame: "https://www.chessgo.in/puzzles/middle-game",
    
    // Special moves
    enPassant: "https://www.chessgo.in/puzzles/en-passant",
    underPromotion: "https://www.chessgo.in/puzzles/under-promotion",
    castling: "https://www.chessgo.in/puzzles/castling",
    promotionSpecial: "https://www.chessgo.in/puzzles/promotion",
    
    // Length of puzzle
    short: "https://www.chessgo.in/puzzles/short",
    oneMove: "https://www.chessgo.in/puzzles/one-move",
    long: "https://www.chessgo.in/puzzles/long",
    veryLong: "https://www.chessgo.in/puzzles/very-long",
    
    // Goals
    mate: "https://www.chessgo.in/puzzles/mate",
    advantage: "https://www.chessgo.in/puzzles/advantage",
    crushing: "https://www.chessgo.in/puzzles/crushing",
    equality: "https://www.chessgo.in/puzzles/equality",
    
    // Other
    master: "https://www.chessgo.in/puzzles/master",
    mixed: "https://www.chessgo.in/puzzles/mixed"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-chess-dark-maroon py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tactical Training</h1>
            <p className="text-chess-light-pink text-lg max-w-3xl mx-auto mb-4">
              Choose from a variety of puzzle themes to sharpen your tactical skills. 
              Click any theme to start training with interactive puzzles on ChessGo.in.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-chess-light-pink text-sm">
                <strong>Note:</strong> Links open ChessGo.in in a new tab for seamless puzzle training.
              </p>
            </div>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="space-y-12">
            {themeCategories.map((category) => (
              <section key={category.title} className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {category.themes.map((theme) => (
                    <AnimatedButton
                      key={theme.slug}
                      asChild
                      variant="chess"
                      className="h-auto p-4 text-left focus:ring-2 focus:ring-chess-deep-red focus:ring-offset-2"
                      showRipple={true}
                    >
                      <a
                        href={themeUrls[theme.slug]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Start ${theme.title} puzzles on ChessGo.in`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {theme.title}
                          </span>
                          <ChevronRight className="h-4 w-4 transition-colors" />
                        </div>
                      </a>
                    </AnimatedButton>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TacticalPuzzles;