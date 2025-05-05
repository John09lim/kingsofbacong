
import React from 'react';

interface FeedbackMessageProps {
  message: string;
  isCorrect: boolean;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ message, isCorrect }) => {
  if (!message) return null;
  
  return (
    <p className={`mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
      {message}
    </p>
  );
};

export default FeedbackMessage;
