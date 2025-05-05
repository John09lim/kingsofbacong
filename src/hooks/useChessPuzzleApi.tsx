
import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface RapidApiPuzzle {
  id: string;
  fen: string;
  moves: string[];
  rating: string;
  openingFamily: string;
  openingVariation: string;
  themes: string;
  color?: string; // Add optional color property
}

// Sample puzzles to use when API is unavailable
const FALLBACK_PUZZLES = [
  {
    id: "fallback1",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    moves: ["g1f3", "b8c6", "f1c4", "g8f6"],
    rating: "1200",
    openingFamily: "Italian Game",
    openingVariation: "Classical Variation",
    themes: "opening,development",
    color: "white"
  },
  {
    id: "fallback2",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    moves: ["f1b5", "a7a6", "b5a4", "b8c6"],
    rating: "1100",
    openingFamily: "Ruy Lopez",
    openingVariation: "Exchange Variation",
    themes: "opening,development",
    color: "white"
  },
  {
    id: "fallback3",
    fen: "rnbqkbnr/ppp2ppp/8/3pp3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    moves: ["e4d5", "d8d5", "d2d4", "d5e6"],
    rating: "1300",
    openingFamily: "Scandinavian Defense",
    openingVariation: "Modern Variation",
    themes: "opening,tactics",
    color: "white"
  },
  {
    id: "fallback4",
    fen: "rnbqkb1r/pppppp1p/5np1/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
    moves: ["b1c3", "f8g7", "c1e3", "e8g8"],
    rating: "1400",
    openingFamily: "King's Indian Defense",
    openingVariation: "Main Line",
    themes: "opening,fianchetto",
    color: "white"
  },
  {
    id: "fallback5",
    fen: "r1bqkb1r/pp2pppp/2np1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R b KQkq - 3 6",
    moves: ["c8d7", "d1d2", "d7c6", "e1c1"],
    rating: "1500",
    openingFamily: "Sicilian Defense",
    openingVariation: "Najdorf Variation",
    themes: "middlegame,development",
    color: "black"
  }
];

export const useChessPuzzleApi = () => {
  const [puzzle, setPuzzle] = useState<RapidApiPuzzle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiUnavailable, setApiUnavailable] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  const getFallbackPuzzle = () => {
    // Get random fallback puzzle
    const randomIndex = Math.floor(Math.random() * FALLBACK_PUZZLES.length);
    return FALLBACK_PUZZLES[randomIndex];
  };

  const fetchPuzzle = async (options?: {
    rating?: string;
    numberOfMoves?: string;
    openingFamily?: string;
    openingVariation?: string;
    themes?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // If we already know API is unavailable, use fallback immediately
      if (apiUnavailable) {
        const fallbackPuzzle = getFallbackPuzzle();
        setPuzzle(fallbackPuzzle);
        setIsLoading(false);
        toast({
          title: "Using offline puzzle",
          description: "Using built-in puzzle since the API is unavailable"
        });
        return;
      }
      
      // Try to use the Supabase edge function to fetch the puzzle
      console.log("Attempting to fetch puzzle from API...");
      const { data, error } = await supabase.functions.invoke('chess-api', {
        body: { 
          endpoint: '/puzzles', 
          params: {
            rating: options?.rating || '1200',
            number_of_moves: options?.numberOfMoves || '4',
            opening_family: options?.openingFamily || '',
            opening_variation: options?.openingVariation || '',
            themes: options?.themes || 'kingsideAttack,middlegame',
            theme_search_type: 'AND',
            number_of_puzzles: '1',
          }
        },
      });
      
      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }
      
      // Check if we got a response indicating we should use fallback
      if (data && data.fallback) {
        console.log("API indicated to use fallback");
        setApiUnavailable(true);
        const fallbackPuzzle = getFallbackPuzzle();
        setPuzzle(fallbackPuzzle);
        toast({
          title: "API Unavailable",
          description: "Using built-in puzzles instead.",
          variant: "destructive",
        });
        return;
      }
      
      if (data && data.puzzles && data.puzzles.length > 0) {
        // Add the color property to the puzzle data
        // Determine color based on FEN if possible, defaulting to white
        const fen = data.puzzles[0]?.fen || '';
        const color = fen.includes(' w ') ? 'white' : fen.includes(' b ') ? 'black' : 'white';
        
        const puzzleWithColor = {
          id: data.puzzles[0].puzzleid,
          fen: data.puzzles[0].fen,
          moves: data.puzzles[0].moves,
          rating: data.puzzles[0].rating.toString(),
          themes: data.puzzles[0].themes.join(','),
          openingFamily: '',
          openingVariation: '',
          color: color
        };
        
        setPuzzle(puzzleWithColor);
      } else {
        throw new Error("No puzzles returned from API");
      }
    } catch (err: any) {
      console.error("Failed to fetch puzzle:", err);
      
      // Check for various API error conditions that should trigger fallback
      const errorMessage = err.message || '';
      const useOffline = errorMessage.includes("429") || 
                         errorMessage.includes("quota") ||
                         errorMessage.includes("API key") ||
                         errorMessage.includes("Too Many Requests") ||
                         errorMessage.includes("configuration error") ||
                         retryCount >= 2;
      
      if (useOffline) {
        setApiUnavailable(true);
        toast({
          title: "Using Offline Puzzles",
          description: "The Chess Puzzles API is currently unavailable. Using built-in puzzles instead.",
          variant: "destructive",
        });
        
        // Use a fallback puzzle
        const fallbackPuzzle = getFallbackPuzzle();
        setPuzzle(fallbackPuzzle);
      } else {
        setError(err.message || 'Failed to fetch puzzle');
        setRetryCount(prev => prev + 1);
        
        if (retryCount < 2) {
          // Auto-retry once with fallback puzzles if this is the first failure
          console.log("Auto-retrying with fallback puzzle");
          const fallbackPuzzle = getFallbackPuzzle();
          setPuzzle(fallbackPuzzle);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, []);

  return { 
    puzzle, 
    isLoading, 
    error, 
    refetch: fetchPuzzle, 
    apiUnavailable, 
    retryCount 
  };
};
