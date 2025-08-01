import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useTrainingSession = (activityType: string) => {
  const [isTracking, setIsTracking] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const sessionStartRef = useRef<Date | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSession = useCallback(async () => {
    if (isTracking) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const sessionStart = new Date();
    sessionStartRef.current = sessionStart;
    setIsTracking(true);

    // Create training session record (using any to bypass type issues)
    try {
      const { data, error } = await (supabase as any)
        .from('training_sessions')
        .insert({
          user_id: session.user.id,
          session_start: sessionStart.toISOString(),
          activity_type: activityType,
          duration_minutes: 0
        })
        .select()
        .single();

      if (data && !error) {
        sessionIdRef.current = data.id;
      }
    } catch (error) {
      console.error('Error creating training session:', error);
    }

    // Start timer
    intervalRef.current = setInterval(() => {
      if (sessionStartRef.current) {
        const duration = Math.floor((Date.now() - sessionStartRef.current.getTime()) / 1000 / 60);
        setSessionDuration(duration);
      }
    }, 60000); // Update every minute
  }, [isTracking, activityType]);

  const endSession = useCallback(async () => {
    if (!isTracking || !sessionStartRef.current || !sessionIdRef.current) return;

    const sessionEnd = new Date();
    const durationMinutes = Math.floor((sessionEnd.getTime() - sessionStartRef.current.getTime()) / 1000 / 60);

    try {
      // Update training session record
      await (supabase as any)
        .from('training_sessions')
        .update({
          session_end: sessionEnd.toISOString(),
          duration_minutes: durationMinutes
        })
        .eq('id', sessionIdRef.current);

      // Update total training minutes in profile
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await (supabase as any)
          .from('profiles')
          .select('total_training_minutes')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          await (supabase as any)
            .from('profiles')
            .update({
              total_training_minutes: (profile.total_training_minutes || 0) + durationMinutes,
              last_activity_at: new Date().toISOString()
            })
            .eq('id', session.user.id);
        }
      }
    } catch (error) {
      console.error('Error updating training session:', error);
    }

    // Clean up
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsTracking(false);
    setSessionDuration(0);
    sessionStartRef.current = null;
    sessionIdRef.current = null;
  }, [isTracking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-start and end session based on page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isTracking) {
        endSession();
      } else if (!document.hidden && !isTracking) {
        startSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Start session when component mounts
    startSession();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      endSession();
    };
  }, [startSession, endSession, isTracking]);

  return {
    isTracking,
    sessionDuration,
    startSession,
    endSession
  };
};