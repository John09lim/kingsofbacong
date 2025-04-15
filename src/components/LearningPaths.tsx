
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Crown, Target, Trophy, Swords } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const learningPathData = {
  beginner: {
    title: "Beginner",
    description: "Master the fundamentals of chess and develop consistent strategic thinking",
    icon: <Target className="text-chess-light-pink h-8 w-8" />,
    color: "bg-chess-deep-red",
    content: [
      {
        name: "Chess Fundamentals",
        description: "Learn the rules, piece movements, and basic concepts",
        topics: ["Basic Rules & Setup", "Piece Movement", "Simple Tactics", "Basic Checkmates", "Chess Notation"]
      },
      {
        name: "Opening Principles",
        description: "Develop your pieces effectively and control the center",
        topics: ["First Moves", "Center Control", "Piece Development", "King Safety", "Common Openings"]
      },
      {
        name: "Essential Tactics",
        description: "Recognize and execute basic tactical patterns",
        topics: ["Pins", "Forks", "Skewers", "Discovered Attacks", "Double Attacks"]
      },
      {
        name: "Basic Endgames",
        description: "Master essential endgame techniques and positions",
        topics: ["King and Pawn", "Rook Endgames", "Opposition", "Square Rule", "Pawn Promotion"]
      },
      {
        name: "Pattern Recognition",
        description: "Develop your ability to spot recurring tactical and strategic patterns",
        topics: ["Checkmate Patterns", "Tactical Motifs", "Back Rank Weakness", "Knight Fork Patterns"]
      }
    ],
    recommended: ["Basic Principles Course", "Tactical Puzzles (Beginner)", "Opening Explorer"]
  },
  intermediate: {
    title: "Intermediate",
    description: "Refine your strategic understanding and improve your calculation abilities",
    icon: <Swords className="text-chess-light-pink h-8 w-8" />,
    color: "bg-chess-dark-maroon",
    content: [
      {
        name: "Positional Chess",
        description: "Master the art of positional chess and long-term planning",
        topics: ["Weak Squares", "Pawn Weaknesses", "Piece Placement", "Strategic Exchanges", "Long-term Planning"]
      },
      {
        name: "Advanced Tactics",
        description: "Study complex tactical patterns and combinations",
        topics: ["Combination Calculation", "Sacrifice Recognition", "Prophylactic Thinking", "Counter-Intuitive Moves"]
      },
      {
        name: "Opening Theory",
        description: "Expand your opening knowledge with theoretical variations",
        topics: ["Opening Theory", "Transpositions", "Opening Preparation", "Critical Positions", "Move Order Subtleties"]
      },
      {
        name: "Middlegame Strategy",
        description: "Understand complex middlegame structures and plans",
        topics: ["Pawn Structure Analysis", "Piece Coordination", "Dynamic Positions", "Attack & Defense", "Space Advantage"]
      },
      {
        name: "Advanced Endgames",
        description: "Master complex endgame positions and techniques",
        topics: ["Rook and Pawn", "Minor Piece Endgames", "Opposite Bishops", "Zugzwang Applications", "Fortress Positions"]
      }
    ],
    recommended: ["Middlegame Masterclass", "Tactical Puzzles (Intermediate)", "Tournament Preparation"]
  },
  advanced: {
    title: "Advanced",
    description: "Study high-level chess concepts and refine your understanding of complex positions",
    icon: <Crown className="text-chess-light-pink h-8 w-8" />,
    color: "bg-chess-dark-blue",
    content: [
      {
        name: "Master Calculation",
        description: "Develop professional-level calculation abilities",
        topics: ["Deep Calculation", "Complex Combinations", "Position Evaluation", "Visualization Exercises", "Alternative Moves"]
      },
      {
        name: "Opening Mastery",
        description: "Create a professional-level opening repertoire",
        topics: ["Theoretical Novelties", "Critical Variations", "Repertoire Development", "Computer-assisted Analysis"]
      },
      {
        name: "Positional Mastery",
        description: "Achieve deep understanding of chess strategy",
        topics: ["Prophylactic Mastery", "Deep Planning", "Structural Transformation", "Fine Techniques", "Intuitive Decisions"]
      },
      {
        name: "Endgame Mastery",
        description: "Perfect your endgame technique with theoretical positions",
        topics: ["Theoretical Endgames", "Tablebases", "Endgame Studies", "Critical Positions", "Analytical Precision"]
      },
      {
        name: "Tournament Mastery",
        description: "Perfect your competitive approach and psychology",
        topics: ["High-level Preparation", "Mental Toughness", "Energy Management", "Pressure Situations", "Tournament Strategy"]
      }
    ],
    recommended: ["Grandmaster Analysis Course", "Tactical Puzzles (Advanced)", "Strategic Mastery"]
  }
};

const LearningPaths = () => {
  const [expandedPath, setExpandedPath] = useState('beginner');

  return (
    <div className="section bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-chess-dark-maroon mb-4">
            Learning Paths
          </h2>
          <p className="text-chess-dark-blue max-w-2xl mx-auto">
            Our structured approach ensures consistent progress regardless of your starting point.
            Select a level to explore the content designed for your skill level.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {Object.entries(learningPathData).map(([level, pathData]) => (
            <Card 
              key={level} 
              className={`overflow-hidden border-2 transition-all ${expandedPath === level ? 'border-chess-deep-red shadow-lg' : 'border-chess-muted-rose/50 hover:border-chess-muted-rose'}`}
            >
              <div 
                className={`${pathData.color} cursor-pointer`}
                onClick={() => setExpandedPath(prev => prev === level ? null : level)}
              >
                <CardHeader className="p-6 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 rounded-full p-3">
                      {pathData.icon}
                    </div>
                    <div className="text-white">
                      <CardTitle className="text-2xl">{pathData.title} Level</CardTitle>
                      <CardDescription className="text-white/80">{pathData.description}</CardDescription>
                    </div>
                  </div>
                  {expandedPath === level ? 
                    <ChevronUp className="h-6 w-6 text-white/80" /> : 
                    <ChevronDown className="h-6 w-6 text-white/80" />
                  }
                </CardHeader>
              </div>
              
              {expandedPath === level && (
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-3 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-chess-deep-red" />
                        Learning Modules
                      </h4>
                      <Accordion type="single" collapsible className="w-full">
                        {pathData.content.map((module, idx) => (
                          <AccordionItem key={idx} value={`item-${idx}`}>
                            <AccordionTrigger className="text-left hover:no-underline py-3 px-4 bg-gray-50 rounded-md hover:bg-gray-100">
                              <div>
                                <span className="font-medium">{module.name}</span>
                                <p className="text-sm text-gray-500 font-normal">{module.description}</p>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-3 px-2">
                              <div className="space-y-2">
                                {module.topics.map((topic, i) => (
                                  <div key={i} className="flex items-center text-sm py-1">
                                    <div className="w-2 h-2 bg-chess-deep-red rounded-full mr-2"></div>
                                    <span>{topic}</span>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-lg mb-3">Recommended Resources</h4>
                      <div className="flex flex-wrap gap-2">
                        {pathData.recommended.map((resource, idx) => (
                          <Badge key={idx} variant="outline" className="bg-chess-light-pink px-3 py-1 text-chess-dark-maroon">
                            {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
