
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PuzzleLoadingState: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full bg-muted rounded-md overflow-hidden">
            <Skeleton className="w-full h-[384px] rounded-md" />
            <div className="p-2">
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleLoadingState;
