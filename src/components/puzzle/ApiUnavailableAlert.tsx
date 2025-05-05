
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ApiUnavailableAlertProps {
  isVisible: boolean;
}

const ApiUnavailableAlert: React.FC<ApiUnavailableAlertProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <Alert variant="destructive" className="mt-2">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Using Offline Puzzles</AlertTitle>
      <AlertDescription>
        The Chess Puzzles API is currently unavailable. Using built-in puzzles instead. 
        You can continue solving puzzles in offline mode.
      </AlertDescription>
    </Alert>
  );
};

export default ApiUnavailableAlert;
