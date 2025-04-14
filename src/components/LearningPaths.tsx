
import React from 'react';
import { ChevronRight } from 'lucide-react';

const learningPaths = [
  {
    level: "Beginner",
    icon: "♙", // Pawn
    description: "Master the basics of chess including rules, piece movement, and fundamental tactics.",
    topics: ["Basic Rules", "Piece Movement", "Simple Tactics", "Basic Checkmates"]
  },
  {
    level: "Intermediate",
    icon: "♘", // Knight
    description: "Develop advanced positional understanding and strategic concepts to improve your game.",
    topics: ["Opening Principles", "Tactical Patterns", "Endgame Fundamentals", "Positional Play"]
  },
  {
    level: "Advanced",
    icon: "♕", // Queen
    description: "Refine your skills with complex strategies, deep calculation, and high-level concepts.",
    topics: ["Advanced Openings", "Complex Middlegame", "Endgame Mastery", "Tournament Preparation"]
  }
];

const LearningPaths = () => {
  return (
    <div className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-chess-dark-maroon mb-4">
            Learning Paths
          </h2>
          <p className="text-chess-dark-blue max-w-2xl mx-auto">
            Our structured approach ensures consistent progress regardless of your starting point.
            Choose the path that matches your current skill level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {learningPaths.map((path, index) => (
            <div 
              key={index} 
              className="border border-chess-muted-rose rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-chess-deep-red text-white p-6 text-center">
                <span className="text-5xl block mb-2">{path.icon}</span>
                <h3 className="text-2xl font-bold">{path.level}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-chess-dark-blue mb-6">
                  {path.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {path.topics.map((topic, i) => (
                    <div key={i} className="flex items-center text-chess-dark-blue">
                      <ChevronRight className="w-5 h-5 text-chess-deep-red mr-2" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
                
                <button className="chess-btn w-full">
                  Explore Path
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
