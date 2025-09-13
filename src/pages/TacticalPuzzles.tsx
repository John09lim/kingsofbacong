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
  
  // Comprehensive list of Lichess puzzle themes organized by categories
  const themeCategories: ThemeCategory[] = [
    {
      title: "Recommended",
      themes: [
        { slug: "mix", title: "Healthy mix" }
      ]
    },
    {
      title: "Phases",
      themes: [
        { slug: "opening", title: "Opening" },
        { slug: "middlegame", title: "Middlegame" },
        { slug: "endgame", title: "Endgame" },
        { slug: "rookEndgame", title: "Rook endgame" },
        { slug: "bishopEndgame", title: "Bishop endgame" },
        { slug: "pawnEndgame", title: "Pawn endgame" },
        { slug: "knightEndgame", title: "Knight endgame" },
        { slug: "queenEndgame", title: "Queen endgame" },
        { slug: "queenRookEndgame", title: "Queen and Rook endgame" }
      ]
    },
    {
      title: "Openings",
      themes: [
        { slug: "sicilianDefense", title: "Sicilian Defense" },
        { slug: "frenchDefense", title: "French Defense" },
        { slug: "queensPawnGame", title: "Queen's Pawn Game" },
        { slug: "italianGame", title: "Italian Game" },
        { slug: "caroKannDefense", title: "Caro-Kann Defense" },
        { slug: "scandinavianDefense", title: "Scandinavian Defense" },
        { slug: "queensGambitDeclined", title: "Queen's Gambit Declined" },
        { slug: "englishOpening", title: "English Opening" },
        { slug: "ruyLopez", title: "Ruy Lopez" },
        { slug: "scotchGame", title: "Scotch Game" },
        { slug: "indianDefense", title: "Indian Defense" },
        { slug: "philidorDefense", title: "Philidor Defense" }
      ]
    },
    {
      title: "Motifs",
      themes: [
        { slug: "advancedPawn", title: "Advanced pawn" },
        { slug: "attackingF2F7", title: "Attacking f2 or f7" },
        { slug: "capturingDefender", title: "Capture the defender" },
        { slug: "discoveredAttack", title: "Discovered attack" },
        { slug: "doubleCheck", title: "Double check" },
        { slug: "exposedKing", title: "Exposed king" },
        { slug: "fork", title: "Fork" },
        { slug: "hangingPiece", title: "Hanging piece" },
        { slug: "kingsideAttack", title: "Kingside attack" },
        { slug: "pin", title: "Pin" },
        { slug: "queensideAttack", title: "Queenside attack" },
        { slug: "sacrifice", title: "Sacrifice" },
        { slug: "skewer", title: "Skewer" },
        { slug: "trappedPiece", title: "Trapped piece" }
      ]
    },
    {
      title: "Advanced Motifs",
      themes: [
        { slug: "attraction", title: "Attraction" },
        { slug: "clearance", title: "Clearance" },
        { slug: "defensiveMove", title: "Defensive move" },
        { slug: "deflection", title: "Deflection" },
        { slug: "interference", title: "Interference" },
        { slug: "intermezzo", title: "Intermezzo" },
        { slug: "quietMove", title: "Quiet move" },
        { slug: "xRayAttack", title: "X-Ray attack" },
        { slug: "zugzwang", title: "Zugzwang" }
      ]
    },
    {
      title: "Mates & Checkmates",
      themes: [
        { slug: "mate", title: "Checkmate" },
        { slug: "mateIn1", title: "Mate in 1" },
        { slug: "mateIn2", title: "Mate in 2" },
        { slug: "mateIn3", title: "Mate in 3" },
        { slug: "mateIn4", title: "Mate in 4" },
        { slug: "mateIn5", title: "Mate in 5 or more" },
        { slug: "anastasiaMate", title: "Anastasia's mate" },
        { slug: "arabianMate", title: "Arabian mate" },
        { slug: "backRankMate", title: "Back rank mate" },
        { slug: "bodenMate", title: "Boden's mate" },
        { slug: "doubleBishopMate", title: "Double bishop mate" },
        { slug: "dovetailMate", title: "Dovetail mate" },
        { slug: "hookMate", title: "Hook mate" },
        { slug: "killBoxMate", title: "Kill box mate" },
        { slug: "vukovicMate", title: "Vuković mate" },
        { slug: "smotheredMate", title: "Smothered mate" }
      ]
    },
    {
      title: "Special Moves",
      themes: [
        { slug: "castling", title: "Castling" },
        { slug: "enPassant", title: "En passant" },
        { slug: "promotion", title: "Promotion" },
        { slug: "underPromotion", title: "Underpromotion" }
      ]
    },
    {
      title: "Goals",
      themes: [
        { slug: "equality", title: "Equality" },
        { slug: "advantage", title: "Advantage" },
        { slug: "crushing", title: "Crushing" }
      ]
    },
    {
      title: "Lengths",
      themes: [
        { slug: "oneMove", title: "One-move puzzle" },
        { slug: "short", title: "Short puzzle" },
        { slug: "long", title: "Long puzzle" },
        { slug: "veryLong", title: "Very long puzzle" }
      ]
    },
    {
      title: "Origin",
      themes: [
        { slug: "master", title: "Master games" },
        { slug: "masterVsMaster", title: "Master vs Master games" },
        { slug: "superGM", title: "Super GM games" },
        { slug: "playerGames", title: "Player games" }
      ]
    }
  ];

  // Mapping of theme slugs to Lichess training URLs
  const themeUrls: Record<string, string> = {
    // Recommended
    mix: "https://lichess.org/training/mix",
    
    // Phases
    opening: "https://lichess.org/training/opening",
    middlegame: "https://lichess.org/training/middlegame",
    endgame: "https://lichess.org/training/endgame",
    rookEndgame: "https://lichess.org/training/rookEndgame",
    bishopEndgame: "https://lichess.org/training/bishopEndgame",
    pawnEndgame: "https://lichess.org/training/pawnEndgame",
    knightEndgame: "https://lichess.org/training/knightEndgame",
    queenEndgame: "https://lichess.org/training/queenEndgame",
    queenRookEndgame: "https://lichess.org/training/queenRookEndgame",
    
    // Openings
    sicilianDefense: "https://lichess.org/training/sicilianDefense",
    frenchDefense: "https://lichess.org/training/frenchDefense",
    queensPawnGame: "https://lichess.org/training/queensPawnGame",
    italianGame: "https://lichess.org/training/italianGame",
    caroKannDefense: "https://lichess.org/training/caroKannDefense",
    scandinavianDefense: "https://lichess.org/training/scandinavianDefense",
    queensGambitDeclined: "https://lichess.org/training/queensGambitDeclined",
    englishOpening: "https://lichess.org/training/englishOpening",
    ruyLopez: "https://lichess.org/training/ruyLopez",
    scotchGame: "https://lichess.org/training/scotchGame",
    indianDefense: "https://lichess.org/training/indianDefense",
    philidorDefense: "https://lichess.org/training/philidorDefense",
    
    // Motifs
    advancedPawn: "https://lichess.org/training/advancedPawn",
    attackingF2F7: "https://lichess.org/training/attackingF2F7",
    capturingDefender: "https://lichess.org/training/capturingDefender",
    discoveredAttack: "https://lichess.org/training/discoveredAttack",
    doubleCheck: "https://lichess.org/training/doubleCheck",
    exposedKing: "https://lichess.org/training/exposedKing",
    fork: "https://lichess.org/training/fork",
    hangingPiece: "https://lichess.org/training/hangingPiece",
    kingsideAttack: "https://lichess.org/training/kingsideAttack",
    pin: "https://lichess.org/training/pin",
    queensideAttack: "https://lichess.org/training/queensideAttack",
    sacrifice: "https://lichess.org/training/sacrifice",
    skewer: "https://lichess.org/training/skewer",
    trappedPiece: "https://lichess.org/training/trappedPiece",
    
    // Advanced Motifs
    attraction: "https://lichess.org/training/attraction",
    clearance: "https://lichess.org/training/clearance",
    defensiveMove: "https://lichess.org/training/defensiveMove",
    deflection: "https://lichess.org/training/deflection",
    interference: "https://lichess.org/training/interference",
    intermezzo: "https://lichess.org/training/intermezzo",
    quietMove: "https://lichess.org/training/quietMove",
    xRayAttack: "https://lichess.org/training/xRayAttack",
    zugzwang: "https://lichess.org/training/zugzwang",
    
    // Mates & Checkmates
    mate: "https://lichess.org/training/mate",
    mateIn1: "https://lichess.org/training/mateIn1",
    mateIn2: "https://lichess.org/training/mateIn2",
    mateIn3: "https://lichess.org/training/mateIn3",
    mateIn4: "https://lichess.org/training/mateIn4",
    mateIn5: "https://lichess.org/training/mateIn5",
    anastasiaMate: "https://lichess.org/training/anastasiaMate",
    arabianMate: "https://lichess.org/training/arabianMate",
    backRankMate: "https://lichess.org/training/backRankMate",
    bodenMate: "https://lichess.org/training/bodenMate",
    doubleBishopMate: "https://lichess.org/training/doubleBishopMate",
    dovetailMate: "https://lichess.org/training/dovetailMate",
    hookMate: "https://lichess.org/training/hookMate",
    killBoxMate: "https://lichess.org/training/killBoxMate",
    vukovicMate: "https://lichess.org/training/vukovicMate",
    smotheredMate: "https://lichess.org/training/smotheredMate",
    
    // Special Moves
    castling: "https://lichess.org/training/castling",
    enPassant: "https://lichess.org/training/enPassant",
    promotion: "https://lichess.org/training/promotion",
    underPromotion: "https://lichess.org/training/underPromotion",
    
    // Goals
    equality: "https://lichess.org/training/equality",
    advantage: "https://lichess.org/training/advantage",
    crushing: "https://lichess.org/training/crushing",
    
    // Lengths
    oneMove: "https://lichess.org/training/oneMove",
    short: "https://lichess.org/training/short",
    long: "https://lichess.org/training/long",
    veryLong: "https://lichess.org/training/veryLong",
    
    // Origin
    master: "https://lichess.org/training/master",
    masterVsMaster: "https://lichess.org/training/masterVsMaster",
    superGM: "https://lichess.org/training/superGM",
    playerGames: "https://lichess.org/training/playerGames"
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
              Click any theme to start training with interactive puzzles on Lichess.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-chess-light-pink text-sm">
                <strong>Note:</strong> Links open Lichess.org in a new tab. If blocked in preview, they work perfectly when deployed.
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
                        aria-label={`Start ${theme.title} puzzles on Lichess`}
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