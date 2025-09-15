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
  const themeCategories: ThemeCategory[] = [{
    title: "Checkmates",
    themes: [{
      slug: "mateInOneMove",
      title: "Mate in one move"
    }, {
      slug: "mateInTwoMoves",
      title: "Mate in two moves"
    }, {
      slug: "mateInThreeMoves",
      title: "Mate in three moves"
    }, {
      slug: "mateInFourMoves",
      title: "Mate in four moves"
    }, {
      slug: "mateIn5OrMoreMoves",
      title: "Mate in 5 or more moves"
    }, {
      slug: "backRankMate",
      title: "Back Rank Mate"
    }, {
      slug: "smotheredMate",
      title: "Smothered Mate"
    }, {
      slug: "anastasiaMate",
      title: "Anastasia mate"
    }, {
      slug: "arabianMate",
      title: "Arabian mate"
    }, {
      slug: "bodensMate",
      title: "Bodens mate"
    }, {
      slug: "doubleBishopMate",
      title: "Double‑bishop mate"
    }, {
      slug: "dovetailMate",
      title: "Dovetail mate"
    }, {
      slug: "hookMate",
      title: "Hook mate"
    }]
  }, {
    title: "Openings",
    themes: [{
      slug: "opening",
      title: "Opening"
    }, {
      slug: "frenchDefense",
      title: "French Defense"
    }, {
      slug: "ruyLopez",
      title: "Ruy Lopez"
    }, {
      slug: "sicilianDefense",
      title: "Sicilian Defense"
    }, {
      slug: "caroKannDefense",
      title: "Caro‑Kann Defense"
    }, {
      slug: "indianDefense",
      title: "Indian Defense"
    }, {
      slug: "italianGame",
      title: "Italian Game"
    }, {
      slug: "queensGambitDeclined",
      title: "Queens Gambit Declined"
    }, {
      slug: "queensPawnGame",
      title: "Queens Pawn Game"
    }, {
      slug: "englishOpening",
      title: "English Opening"
    }, {
      slug: "russianGame",
      title: "Russian Game"
    }, {
      slug: "philidorDefense",
      title: "Philidor Defense"
    }, {
      slug: "scandinavianDefense",
      title: "Scandinavian Defense"
    }, {
      slug: "scotchGame",
      title: "Scotch Game"
    }, {
      slug: "modernDefense",
      title: "Modern Defense"
    }, {
      slug: "fourKnightsDefense",
      title: "Four Knights Defense"
    }, {
      slug: "kingsGambitAccepted",
      title: "Kings Gambit Accepted"
    }, {
      slug: "pircDefense",
      title: "Pirc Defense"
    }, {
      slug: "damianoDefense",
      title: "Damiano Defense"
    }, {
      slug: "rapportJobavaSystem",
      title: "Rapport Jobava System"
    }, {
      slug: "viennaGame",
      title: "Vienna Game"
    }]
  }, {
    title: "Endgames",
    themes: [{
      slug: "endgame",
      title: "Endgame"
    }, {
      slug: "promotion",
      title: "Promotion"
    }, {
      slug: "zugzwang",
      title: "Zugzwang"
    }, {
      slug: "pawnEndgame",
      title: "Pawn Endgame"
    }, {
      slug: "rookEndgame",
      title: "Rook Endgame"
    }, {
      slug: "queenEndgame",
      title: "Queen Endgame"
    }, {
      slug: "queenRookEndgame",
      title: "Queen Rook Endgame"
    }, {
      slug: "advancedPawn",
      title: "Advanced Pawn"
    }, {
      slug: "bishopEndgame",
      title: "Bishop Endgame"
    }, {
      slug: "knightEndgame",
      title: "Knight Endgame"
    }, {
      slug: "attackingF2F7",
      title: "Attacking f2‑f7"
    }]
  }, {
    title: "Tactics",
    themes: [{
      slug: "pin",
      title: "Pin"
    }, {
      slug: "fork",
      title: "Fork (Double Attack)"
    }, {
      slug: "skewer",
      title: "Skewer"
    }, {
      slug: "discoveredAttack",
      title: "Discovered Attack"
    }, {
      slug: "doubleCheck",
      title: "Double Check"
    }, {
      slug: "attraction",
      title: "Attraction"
    }, {
      slug: "xRayAttack",
      title: "X‑Ray Attack"
    }, {
      slug: "defensiveMove",
      title: "Defensive Move"
    }, {
      slug: "deflection",
      title: "Deflection"
    }, {
      slug: "hangingPiece",
      title: "Hanging Piece"
    }, {
      slug: "sacrifice",
      title: "Sacrifice"
    }, {
      slug: "interference",
      title: "Interference"
    }, {
      slug: "trappedPiece",
      title: "Trapped Piece"
    }, {
      slug: "capturingDefender",
      title: "Capturing Defender"
    }, {
      slug: "clearance",
      title: "Clearance"
    }, {
      slug: "exposedKing",
      title: "Exposed King"
    }, {
      slug: "kingSideAttack",
      title: "Kingside Attack"
    }, {
      slug: "queenSideAttack",
      title: "Queenside Attack"
    }, {
      slug: "quietMove",
      title: "Quiet Move"
    }, {
      slug: "intermezzo",
      title: "Intermezzo"
    }, {
      slug: "middleGame",
      title: "Middle Game"
    }]
  }, {
    title: "Special moves",
    themes: [{
      slug: "enPassant",
      title: "En Passant"
    }, {
      slug: "underPromotion",
      title: "Underpromotion"
    }, {
      slug: "castling",
      title: "Castling"
    }, {
      slug: "promotionSpecial",
      title: "Promotion"
    }]
  }, {
    title: "Length of puzzle",
    themes: [{
      slug: "short",
      title: "Short"
    }, {
      slug: "oneMove",
      title: "One Move"
    }, {
      slug: "long",
      title: "Long"
    }, {
      slug: "veryLong",
      title: "Very Long"
    }]
  }, {
    title: "Goals",
    themes: [{
      slug: "mate",
      title: "Checkmate"
    }, {
      slug: "advantage",
      title: "Advantage"
    }, {
      slug: "crushing",
      title: "Crushing"
    }, {
      slug: "equality",
      title: "Equality"
    }]
  }, {
    title: "Other",
    themes: [{
      slug: "master",
      title: "Master Games"
    }, {
      slug: "mixed",
      title: "Mixed"
    }]
  }];

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
        <div className="relative overflow-hidden bg-gradient-to-br from-chess-dark-maroon via-chess-deep-red to-chess-dark-maroon py-16 px-4">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Tactical Training
            </h1>
            <p className="text-chess-light-pink text-xl max-w-4xl mx-auto mb-8 leading-relaxed">
              Master chess tactics with our comprehensive collection of themed puzzles. 
              Choose from <span className="font-semibold text-white">75+ puzzle categories</span> to sharpen your tactical vision and improve your game.
            </p>
            <div className="flex items-center justify-center gap-2 text-chess-soft-pink">
              <span className="text-sm">Interactive puzzles powered by ChessGo.in</span>
            </div>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 py-16">
            <div className="space-y-16">
              {themeCategories.map((category, categoryIndex) => (
                <section key={category.title} className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      {category.title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-chess-deep-red to-chess-dark-maroon mx-auto rounded-full"></div>
                  </div>
                  <div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    style={{ animationDelay: `${categoryIndex * 100}ms` }}
                  >
                    {category.themes.map((theme, themeIndex) => (
                      <AnimatedButton
                        key={theme.slug}
                        variant="outline"
                        className="group relative h-auto p-6 text-left border-2 border-border hover:border-chess-deep-red hover:bg-chess-deep-red/5 transition-all duration-300 rounded-lg shadow-sm hover:shadow-lg bg-card"
                        showRipple={true}
                        onClick={() => {
                          window.open(themeUrls[theme.slug], '_blank', 'noopener,noreferrer');
                        }}
                        aria-label={`Start ${theme.title} puzzles on ChessGo.in`}
                        style={{ animationDelay: `${themeIndex * 50}ms` }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-sm md:text-base group-hover:text-chess-deep-red transition-colors duration-300">
                            {theme.title}
                          </span>
                          <ChevronRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-chess-deep-red" />
                        </div>
                      </AnimatedButton>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default TacticalPuzzles;