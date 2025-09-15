
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Crown, Users } from 'lucide-react';

const Hero = () => {
  const [showLearningModal, setShowLearningModal] = useState(false);

  const handleExploreResources = () => {
    window.open('https://chesstempo.com/chess-tactics/', '_blank');
  };

  const learningOptions = [
    {
      title: 'Training',
      description: 'Structured lessons and exercises',
      icon: BookOpen,
      link: '/training',
      color: 'text-blue-500'
    },
    {
      title: 'Tactics',
      description: 'Puzzle solving and tactical patterns',
      icon: Target,
      link: '/tactics',
      color: 'text-red-500'
    },
    {
      title: 'Openings',
      description: 'Master chess opening principles',
      icon: Crown,
      link: '/openings',
      color: 'text-yellow-500'
    },
    {
      title: 'Community',
      description: 'Connect with fellow chess players',
      icon: Users,
      link: '/community',
      color: 'text-green-500'
    }
  ];

  return (
    <div className="chess-gradient text-white py-20 md:py-32 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in">
            Master the Royal Game
          </h1>
          <p className="text-lg md:text-xl mb-8 text-chess-light-pink animate-fade-in">
            Join the Kings of Bacong Chess Club's comprehensive training platform. 
            Elevate your skills from beginner to master with structured learning paths.
          </p>
          <blockquote className="border-l-4 border-chess-light-pink pl-4 italic my-8 animate-fade-in">
            <p className="text-white text-lg">
              "A strong chess player isn't born overnight. It's built one consistent practice at a time."
            </p>
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setShowLearningModal(true)}
              className="chess-btn bg-white text-chess-deep-red hover:bg-chess-light-pink animate-fade-in"
            >
              Start Learning
            </button>
            <button 
              onClick={handleExploreResources}
              className="chess-btn-outline border-white text-white hover:bg-white hover:text-chess-deep-red animate-fade-in"
            >
              Explore Resources
            </button>
            <button 
              onClick={() => window.open('https://wintrchess.com/analysis', '_blank')}
              className="chess-btn-outline border-white text-white hover:bg-white hover:text-chess-deep-red animate-fade-in"
            >
              Analyze a Game
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center animate-fade-in">
          <div className="relative">
            <img 
              src="/lovable-uploads/46dedfa8-7159-42f0-a0eb-76829b4dc416.png"
              alt="Kings of Bacong Chess Club"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Learning Options Modal */}
      <Dialog open={showLearningModal} onOpenChange={setShowLearningModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-chess-deep-red">
              Choose Your Learning Path
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {learningOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={option.title}
                  asChild
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-lg transition-all duration-200 border-2 hover:border-chess-deep-red"
                  onClick={() => setShowLearningModal(false)}
                >
                  <Link to={option.link}>
                    <IconComponent className={`h-8 w-8 ${option.color}`} />
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </Link>
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Hero;
