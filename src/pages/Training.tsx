
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Play, Clock, Trophy, Target } from "lucide-react";
import { TrainingLessonModal } from "@/components/TrainingLessonModal";
import { TrainingTimeDisplay } from "@/components/TrainingTimeDisplay";
import { useTrainingSession } from "@/hooks/useTrainingSession";

// Import chess-related images
import chessBoardBasics from "@/assets/chess-board-basics.jpg";
import pawnPromotion from "@/assets/pawn-promotion.jpg";
import checkmatePosition from "@/assets/checkmate-position.jpg";
import openingPrinciples from "@/assets/opening-principles.jpg";
import advancedOpening from "@/assets/advanced-opening.jpg";
import tacticalPatterns from "@/assets/tactical-patterns.jpg";
import positionalPlay from "@/assets/positional-play.jpg";
import middlegameTransition from "@/assets/middlegame-transition.jpg";
import complexMiddlegame from "@/assets/complex-middlegame.jpg";
import advancedEndgames from "@/assets/advanced-endgames.jpg";
import tournamentPreparation from "@/assets/tournament-preparation.jpg";

const Training = () => {
  const [activeLevel, setActiveLevel] = useState("beginner");
  const [selectedModule, setSelectedModule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isTracking, sessionDuration } = useTrainingSession('general_training');

  // Define training modules for each level
  const modules = {
    beginner: [
      {
        id: 1,
        title: "Chessboard Basics",
        description: "Learn about files, ranks, diagonals, and how to set up the board.",
        progress: 100,
        completed: true,
        locked: false,
        lessons: 5,
        quizzes: 2,
        exercises: 3,
        imageUrl: chessBoardBasics,
        level: "beginner",
        url: "https://www.chess.com/learn"
      },
      {
        id: 2,
        title: "Pawn Promotion & Special Moves",
        description: "Master en passant, castling, and pawn promotion.",
        progress: 75,
        completed: false,
        locked: false,
        lessons: 4,
        quizzes: 2,
        exercises: 5,
        imageUrl: pawnPromotion,
        level: "beginner",
        url: "https://www.chess.com/learn/article/view/special-chess-rules"
      },
      {
        id: 3,
        title: "Check, Checkmate & Stalemate",
        description: "Understand the different game-ending scenarios.",
        progress: 40,
        completed: false,
        locked: false,
        lessons: 3,
        quizzes: 1,
        exercises: 4,
        imageUrl: checkmatePosition,
        level: "beginner",
        url: "https://www.chess.com/learn/article/view/how-to-checkmate"
      },
      {
        id: 4,
        title: "Basic Opening Principles",
        description: "Learn how to control the center and develop pieces effectively.",
        progress: 0,
        completed: false,
        locked: true,
        lessons: 6,
        quizzes: 2,
        exercises: 4,
        imageUrl: openingPrinciples,
        level: "beginner",
        url: "https://www.chess.com/learn/article/view/chess-opening-principles"
      }
    ],
    intermediate: [
      {
        id: 1,
        title: "Advanced Opening Principles",
        description: "Explore pawn structures and gambits for an effective start.",
        progress: 60,
        completed: false,
        locked: false,
        lessons: 7,
        quizzes: 3,
        exercises: 5,
        imageUrl: advancedOpening,
        level: "intermediate",
        url: "https://lichess.org/study"
      },
      {
        id: 2,
        title: "Tactical Patterns",
        description: "Master discovered attacks and double attacks.",
        progress: 30,
        completed: false,
        locked: false,
        lessons: 5,
        quizzes: 2,
        exercises: 8,
        imageUrl: tacticalPatterns,
        level: "intermediate",
        url: "https://www.chess.com/puzzles/tactical"
      },
      {
        id: 3,
        title: "Positional Play",
        description: "Identify weak squares and establish outposts.",
        progress: 0,
        completed: false,
        locked: true,
        lessons: 6,
        quizzes: 3,
        exercises: 4,
        imageUrl: positionalPlay,
        level: "intermediate",
        url: "https://lichess.org/study/topic/Strategy"
      },
      {
        id: 4,
        title: "Opening to Middlegame Transition",
        description: "Learn how to smoothly transition between game phases.",
        progress: 0,
        completed: false,
        locked: true,
        lessons: 5,
        quizzes: 2,
        exercises: 6,
        imageUrl: middlegameTransition,
        level: "intermediate",
        url: "https://www.chess.com/learn/article/view/middlegame-principles"
      }
    ],
    advanced: [
      {
        id: 1,
        title: "Advanced Openings",
        description: "Study theoretical lines and novelties in modern openings.",
        progress: 25,
        completed: false,
        locked: false,
        lessons: 8,
        quizzes: 3,
        exercises: 5,
        imageUrl: advancedOpening,
        level: "advanced",
        url: "https://lichess.org/study/topic/Opening"
      },
      {
        id: 2,
        title: "Complex Middlegame Strategies",
        description: "Master sacrifices and favorable exchanges.",
        progress: 0,
        completed: false,
        locked: true,
        lessons: 7,
        quizzes: 3,
        exercises: 6,
        imageUrl: complexMiddlegame,
        level: "advanced",
        url: "https://www.chess.com/learn/article/view/middlegame-strategy"
      },
      {
        id: 3,
        title: "Advanced Endgames",
        description: "Study complex endgames like Rook vs. Pawn and Queen vs. Rook.",
        progress: 0,
        completed: false,
        locked: true,
        lessons: 6,
        quizzes: 4,
        exercises: 7,
        imageUrl: advancedEndgames,
        level: "advanced",
        url: "https://lichess.org/study/topic/Endgame"
      },
      {
        id: 4,
        title: "Tournament Preparation",
        description: "Develop study plans and practice strategies for competitive play.",
        progress: 0,
        completed: false,
        locked: true,
        lessons: 5,
        quizzes: 2,
        exercises: 4,
        imageUrl: tournamentPreparation,
        level: "advanced",
        url: "https://www.chess.com/learn/article/view/tournament-preparation"
      }
    ]
  };

  // Calculate overall progress for each level
  const calculateOverallProgress = (level) => {
    const levelModules = modules[level];
    if (!levelModules || levelModules.length === 0) return 0;
    
    const totalProgress = levelModules.reduce((sum, module) => sum + module.progress, 0);
    return Math.round(totalProgress / levelModules.length);
  };

  // Handle module selection
  const handleModuleClick = (module) => {
    if (!module.locked) {
      window.open(module.url, '_blank');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModule(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-chess-dark-maroon py-10 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Chess Training</h1>
                <p className="text-chess-light-pink text-lg max-w-3xl">
                  Structured learning paths for players of all levels. Track your progress, 
                  take quizzes, and solve interactive puzzles to improve your chess skills.
                </p>
              </div>
              {(isTracking || sessionDuration > 0) && (
                <div className="flex items-center gap-4">
                  <TrainingTimeDisplay 
                    sessionDuration={sessionDuration} 
                    isTracking={isTracking} 
                  />
                  {isTracking && (
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">Active Session</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="beginner" value={activeLevel} onValueChange={setActiveLevel} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <TabsList className="bg-chess-muted-rose/20">
                <TabsTrigger value="beginner" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                  Beginner
                </TabsTrigger>
                <TabsTrigger value="intermediate" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                  Intermediate
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                  Advanced
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Overall Progress:</span>
                <Progress value={calculateOverallProgress(activeLevel)} className="w-48 h-2" />
                <span className="text-sm font-medium">{calculateOverallProgress(activeLevel)}%</span>
              </div>
            </div>

            {Object.keys(modules).map((level) => (
              <TabsContent key={level} value={level} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {modules[level].map((module) => (
                    <Card key={module.id} className={`overflow-hidden flex flex-col transition-all ${module.locked ? 'opacity-70' : 'hover:shadow-lg'}`}>
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={module.imageUrl} 
                          alt={module.title} 
                          className="w-full h-full object-cover"
                        />
                        {module.completed && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                            <CheckCircle size={20} />
                          </div>
                        )}
                        {module.locked && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Lock size={40} className="text-white/80" />
                          </div>
                        )}
                      </div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{module.title}</CardTitle>
                        </div>
                        <CardDescription>{module.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-2 pt-0">
                        <div className="flex gap-2 mb-3">
                          <Badge variant="outline" className="bg-blue-50">{module.lessons} Lessons</Badge>
                          <Badge variant="outline" className="bg-purple-50">{module.quizzes} Quizzes</Badge>
                          <Badge variant="outline" className="bg-orange-50">{module.exercises} Exercises</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={module.progress} className="h-2 flex-1" />
                          <span className="text-xs font-medium">{module.progress}%</span>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="mt-auto">
                        <Button 
                          className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon" 
                          disabled={module.locked}
                          onClick={() => handleModuleClick(module)}
                        >
                          <Play size={16} className="mr-2" />
                          {module.progress > 0 && module.progress < 100 ? 'Continue' : 'Start'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
      
      {/* Training Lesson Modal */}
      <TrainingLessonModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        module={selectedModule}
      />
    </div>
  );
};

export default Training;
