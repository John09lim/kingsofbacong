import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, Clock, BookOpen, HelpCircle, Target } from "lucide-react";
import { useTrainingSession } from "@/hooks/useTrainingSession";
import { TrainingTimeDisplay } from "@/components/TrainingTimeDisplay";
import { useToast } from "@/hooks/use-toast";

interface TrainingModule {
  id: number;
  title: string;
  description: string;
  progress: number;
  completed: boolean;
  lessons: number;
  quizzes: number;
  exercises: number;
  level: string;
}

interface TrainingLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  module: TrainingModule | null;
}

export const TrainingLessonModal: React.FC<TrainingLessonModalProps> = ({
  isOpen,
  onClose,
  module
}) => {
  const { toast } = useToast();
  const { isTracking, sessionDuration, startSession, endSession } = useTrainingSession(
    module ? `${module.level}_${module.title}` : 'general_training'
  );

  const handleStartLesson = () => {
    if (!isTracking) {
      startSession();
    }
    toast({
      title: "Lesson Started!",
      description: `Beginning "${module?.title}" training session.`,
    });
  };

  const handleCompleteLesson = () => {
    if (isTracking) {
      endSession();
    }
    toast({
      title: "Lesson Completed!",
      description: "Great job! Your progress has been saved.",
    });
    onClose();
  };

  if (!module) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{module.title}</DialogTitle>
            <TrainingTimeDisplay 
              sessionDuration={sessionDuration} 
              isTracking={isTracking} 
            />
          </div>
          <DialogDescription className="text-base">
            {module.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Current Progress</h3>
              <span className="text-sm font-medium">{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>

          {/* Module Content */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium">{module.lessons}</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <div>
                <div className="font-medium">{module.quizzes}</div>
                <div className="text-sm text-muted-foreground">Quizzes</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
              <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <div>
                <div className="font-medium">{module.exercises}</div>
                <div className="text-sm text-muted-foreground">Exercises</div>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="space-y-3">
            <h3 className="font-medium">Learning Objectives</h3>
            <div className="space-y-2">
              {module.title === "Chessboard Basics" && (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Understand ranks, files, and diagonals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Learn proper board setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Master piece movement rules</span>
                  </div>
                </>
              )}
              {module.title === "Pawn Promotion & Special Moves" && (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Master pawn promotion mechanics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Understand en passant capture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Learn castling rules and timing</span>
                  </div>
                </>
              )}
              {!["Chessboard Basics", "Pawn Promotion & Special Moves"].includes(module.title) && (
                <>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Complete interactive lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Test knowledge with quizzes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Practice with exercises</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleStartLesson}
              className="flex-1"
              disabled={isTracking}
            >
              <Play className="h-4 w-4 mr-2" />
              {isTracking ? 'Training in Progress' : (module.progress > 0 ? 'Continue Training' : 'Start Training')}
            </Button>
            
            {isTracking && (
              <Button 
                onClick={handleCompleteLesson}
                variant="outline"
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Session
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};