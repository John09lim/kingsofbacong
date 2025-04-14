
import React from 'react';
import { ChessIcon, BookOpen, Brain, TrendingUp, Users, Award } from 'lucide-react';

// Custom chess icon
const ChessIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8 16l-1.447.724a1 1 0 000 1.8l4.5 2.25a1 1 0 00.894 0l4.5-2.25a1 1 0 000-1.8l-1.447-.724" />
    <path d="M8 13.5V12a1 1 0 011-1h6a1 1 0 011 1v1.5" />
    <path d="M12 4v4" />
    <path d="M8 9h8" />
    <path d="M18 18l-6-6-6 6" />
    <path d="M12 10v10" />
  </svg>
);

const featureItems = [
  {
    icon: ChessIcon,
    title: "Tactical Training",
    description: "Sharpen your tactical skills with thousands of puzzles tailored to your level."
  },
  {
    icon: BookOpen,
    title: "Opening Repertoire",
    description: "Build a solid foundation with opening studies for both Black and White pieces."
  },
  {
    icon: Brain,
    title: "Strategic Thinking",
    description: "Learn positional play concepts from masters to improve your decision making."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed statistics and performance metrics."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with other players, join tournaments, and participate in discussions."
  },
  {
    icon: Award,
    title: "Grandmaster Insights",
    description: "Access exclusive lessons featuring perspectives from chess grandmasters."
  }
];

const Features = () => {
  return (
    <div className="bg-chess-light-pink section">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-chess-dark-maroon mb-4">
            Why Train With Us
          </h2>
          <p className="text-chess-dark-blue max-w-2xl mx-auto">
            Our comprehensive training platform offers everything you need to improve your chess skills,
            regardless of your current level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border border-chess-muted-rose hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-chess-deep-red bg-opacity-10 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-chess-deep-red" />
                </div>
                <h3 className="text-xl font-semibold text-chess-dark-maroon mb-2">
                  {feature.title}
                </h3>
                <p className="text-chess-dark-blue">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
