
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PuzzleHistoryChartProps {
  data: Array<{date: string; rating: number}>;
  isLoading?: boolean;
}

const PuzzleHistoryChart: React.FC<PuzzleHistoryChartProps> = ({ 
  data, 
  isLoading = false 
}) => {
  // Format tooltip value
  const formatTooltip = (value: number) => `${value} ELO`;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-7 w-40" />
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
        <CardTitle>Puzzle Rating History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                dataKey="date" 
                tick={{ fontSize: 11 }} 
                stroke="#888888"
              >
                <Label 
                  value="Date" 
                  offset={0} 
                  position="insideBottom" 
                  dy={20} 
                  style={{ fontSize: 12, fill: "#888888" }}
                />
              </XAxis>
              <YAxis 
                tick={{ fontSize: 11 }} 
                stroke="#888888"
                domain={['dataMin - 100', 'dataMax + 100']}
              >
                <Label 
                  value="Rating" 
                  angle={-90} 
                  position="insideLeft" 
                  dx={-10}
                  style={{ fontSize: 12, fill: "#888888", textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip formatter={formatTooltip} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#ab2b2d"
                strokeWidth={2}
                dot={{ r: 3, fill: "#ab2b2d", stroke: "#ab2b2d" }}
                activeDot={{ r: 5, fill: "#ab2b2d", stroke: "#fff", strokeWidth: 2 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PuzzleHistoryChart;
