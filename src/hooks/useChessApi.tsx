
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChessApiService, ChessAPIParams } from '@/services/chessApiService';
import { toast } from '@/hooks/use-toast';

// Define interfaces for API responses
export interface ChessOpeningData {
  name?: string;
  eco?: string;
  fen?: string;
  moves?: string;
  url?: string;
}

export interface ChessPlayerProfile {
  username?: string;
  title?: string;
  name?: string;
  followers?: number;
  country?: string;
  status?: string;
  joined?: number;
  lastOnline?: number;
  url?: string;
}

export interface ChessRatingHistory {
  username?: string;
  history?: Array<{
    date: number;
    rating: number;
  }>;
}

interface UseChessApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

export function useChessApi<T>(
  endpoint: string,
  params?: ChessAPIParams,
  options: UseChessApiOptions = {}
) {
  const { onSuccess, onError, enabled = true } = options;

  const queryResult = useQuery({
    queryKey: ['chess-api', endpoint, params],
    queryFn: async () => {
      try {
        return await ChessApiService.call<T>(endpoint, params);
      } catch (error) {
        toast({
          title: "API Error",
          description: `Failed to load chess data: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        });
        throw error;
      }
    },
    enabled,
    meta: {
      onSuccess,
      onError,
    },
  });

  return queryResult;
}

export const usePlayerProfile = (username: string, options: UseChessApiOptions = {}) => {
  return useChessApi<ChessPlayerProfile>(`/player/profile`, { username }, options);
};

export const usePlayerRatingHistory = (username: string, options: UseChessApiOptions = {}) => {
  return useChessApi<ChessRatingHistory>(`/player/rating/history`, { username }, options);
};

export const useOpeningByEco = (eco: string, options: UseChessApiOptions = {}) => {
  return useChessApi<ChessOpeningData>(`/openings/eco`, { eco }, options);
};

export const usePuzzleOfTheDay = (options: UseChessApiOptions = {}) => {
  return useChessApi<any>(`/puzzle/daily`, undefined, options);
};
