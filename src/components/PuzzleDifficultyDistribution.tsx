
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

interface PuzzleDifficultyDistributionProps {
  data: {
    range: string;
    count: number;
    color: string;
  }[];
  isLoading?: boolean;
}

const PuzzleDifficultyDistribution: React.FC<PuzzleDifficultyDistributionProps> = ({ 
  data, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Puzzle Difficulty Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="range" 
                tick={{ fontSize: 10 }} 
                stroke="#888888"
                tickMargin={10}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                stroke="#888888"
              />
              <Tooltip 
                formatter={(value) => [`${value} puzzles`, 'Count']}
                labelStyle={{ color: "#333" }}
                contentStyle={{ 
                  backgroundColor: "white", 
                  borderColor: "#ddd",
                  borderRadius: "4px",
                  fontSize: "12px"
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleDifficultyDistribution;
