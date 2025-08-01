import React from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrainingTimeDisplayProps {
  sessionDuration: number;
  isTracking: boolean;
}

export const TrainingTimeDisplay: React.FC<TrainingTimeDisplayProps> = ({
  sessionDuration,
  isTracking
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (!isTracking && sessionDuration === 0) return null;

  return (
    <Badge variant={isTracking ? "default" : "secondary"} className="flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {isTracking ? `Training: ${formatTime(sessionDuration)}` : `Trained: ${formatTime(sessionDuration)}`}
    </Badge>
  );
};