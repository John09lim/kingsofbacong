
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { CheckCircle, X } from "lucide-react";

interface PuzzleItem {
  id: string;
  date: string;
  rating: number;
  theme?: string;
  success: boolean;
  timeSpent?: number;
}

interface PuzzleHistoryProps {
  history: PuzzleItem[];
  isLoading?: boolean;
}

const PuzzleHistory: React.FC<PuzzleHistoryProps> = ({ 
  history, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent className="px-0">
          <div className="divide-y">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="px-6 py-3">
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!history.length) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Puzzle History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-4">
            <p>No puzzles solved yet.</p>
            <p>Start solving puzzles to build your history!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Puzzle History</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-y">
          {history.map((puzzle) => (
            <div key={puzzle.id} className="px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    Puzzle #{puzzle.id}
                    {puzzle.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(puzzle.date), "MMM d, yyyy - h:mm a")}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className={puzzle.success ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}>
                    {puzzle.rating} ELO
                  </Badge>
                  {puzzle.theme && (
                    <Badge variant="outline" className="text-xs">
                      {puzzle.theme}
                    </Badge>
                  )}
                  {puzzle.timeSpent && (
                    <span className="text-xs text-gray-500">
                      {puzzle.timeSpent}s
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleHistory;
