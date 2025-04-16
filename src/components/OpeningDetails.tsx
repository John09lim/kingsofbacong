
import React from 'react';
import { useOpeningByEco } from '@/hooks/useChessApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface OpeningDetailsProps {
  eco: string;
  name: string;
  onClose: () => void;
}

const OpeningDetails = ({ eco, name, onClose }: OpeningDetailsProps) => {
  const { data, isLoading, error } = useOpeningByEco(eco);

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto border-red-200">
        <CardHeader>
          <CardTitle>Error Loading {name}</CardTitle>
          <CardDescription>Unable to fetch opening details</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">
            There was a problem loading the details for this opening.
            Please try again later or check your connection.
          </p>
          <Button onClick={onClose} className="mt-4">
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-chess-deep-red shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl mb-1">{name}</CardTitle>
            <CardDescription className="text-base">ECO Code: {eco}</CardDescription>
          </div>
          <Badge className="bg-chess-deep-red text-white">{eco}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.fen && (
            <div className="border border-gray-200 p-2 rounded">
              <p className="font-mono text-xs mb-1 text-gray-500">FEN:</p>
              <p className="font-mono text-xs break-all">{data.fen}</p>
            </div>
          )}
          
          {data?.moves && (
            <div>
              <h3 className="text-lg font-medium mb-2">Main Line</h3>
              <p className="font-mono">{data.moves}</p>
            </div>
          )}
          
          {data?.name && (
            <div>
              <h3 className="text-lg font-medium mb-2">Full Name</h3>
              <p>{data.name}</p>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <Button onClick={onClose}>
              Close Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpeningDetails;
