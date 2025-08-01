import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
  videoId, 
  title, 
  difficulty, 
  description 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-gray-900">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleIframeLoad}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-sm leading-tight flex-1 mr-2">{title}</h3>
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
        {description && (
          <p className="text-xs text-gray-600 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};