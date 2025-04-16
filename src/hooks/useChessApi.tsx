
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChessApiService, ChessAPIParams } from '@/services/chessApiService';
import { toast } from '@/hooks/use-toast';

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
  return useChessApi(`/player/profile`, { username }, options);
};

export const usePlayerRatingHistory = (username: string, options: UseChessApiOptions = {}) => {
  return useChessApi(`/player/rating/history`, { username }, options);
};

export const useOpeningByEco = (eco: string, options: UseChessApiOptions = {}) => {
  return useChessApi(`/openings/eco`, { eco }, options);
};

export const usePuzzleOfTheDay = (options: UseChessApiOptions = {}) => {
  return useChessApi(`/puzzle/daily`, undefined, options);
};
