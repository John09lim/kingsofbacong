
import { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get(
        'https://chess-puzzles2.p.rapidapi.com/advanced',
        {
          params: {
            rating: options?.rating || '1200',
            number_of_moves: options?.numberOfMoves || '4',
            opening_family: options?.openingFamily || '',
            opening_variation: options?.openingVariation || '',
            themes: options?.themes || 'kingsideAttack,middlegame',
            theme_search_type: 'AND',
            number_of_puzzles: '1',
          },
          headers: {
            'x-rapidapi-host': 'chess-puzzles2.p.rapidapi.com',
            'x-rapidapi-key': 'a0300f8454msh9b4ee5e304028ebp16e757jsnff1958562942',
          },
        }
      );
      
      // Add the color property to the puzzle data
      // Determine color based on FEN if possible, defaulting to white
      const fen = response.data[0]?.fen || '';
      const color = fen.includes(' w ') ? 'white' : fen.includes(' b ') ? 'black' : 'white';
      
      const puzzleWithColor = {
        ...response.data[0],
        color: color
      };
      
      setPuzzle(puzzleWithColor);
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
