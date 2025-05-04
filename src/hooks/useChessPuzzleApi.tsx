
import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from "@/integrations/supabase/client";

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

export const useChessPuzzleApi = () => {
  const [puzzle, setPuzzle] = useState<RapidApiPuzzle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      // Use the Supabase edge function to fetch the puzzle
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
        throw error;
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
      setError(err.message || 'Failed to fetch puzzle');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, []);

  return { puzzle, isLoading, error, refetch: fetchPuzzle };
};
