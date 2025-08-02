import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
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

  const handleThemeClick = (slug: string) => {
    navigate(`/tactics/${slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-chess-dark-maroon py-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tactical Training</h1>
            <p className="text-chess-light-pink text-lg max-w-3xl mx-auto">
              Choose from a variety of puzzle themes to sharpen your tactical skills. 
              Click any theme to start training with interactive puzzles.
            </p>
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
                      onClick={() => handleThemeClick(theme.slug)}
                      variant="chess"
                      className="h-auto p-4 text-left focus:ring-2 focus:ring-chess-deep-red focus:ring-offset-2"
                      aria-label={`Start ${theme.title} puzzles`}
                      showRipple={true}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {theme.title}
                        </span>
                        <ChevronRight className="h-4 w-4 transition-colors" />
                      </div>
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