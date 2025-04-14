
import React from 'react';

const Hero = () => {
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
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="chess-btn bg-white text-chess-deep-red hover:bg-chess-light-pink animate-fade-in">
              Start Learning
            </button>
            <button className="chess-btn-outline border-white text-white hover:bg-white hover:text-chess-deep-red animate-fade-in">
              Explore Resources
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center animate-fade-in">
          <div className="relative">
            <div className="grid grid-cols-4 grid-rows-4 w-64 h-64 md:w-80 md:h-80 rotate-45 bg-white/20 backdrop-blur-sm rounded-lg p-2">
              {[...Array(16)].map((_, index) => {
                const isEven = Math.floor(index / 4) % 2 === 0;
                const isAlternating = isEven ? index % 2 === 0 : index % 2 === 1;
                
                return (
                  <div 
                    key={index} 
                    className={`${isAlternating ? 'bg-chess-deep-red' : 'bg-white'} rounded`}
                  ></div>
                );
              })}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45">
                <img 
                  src="/lovable-uploads/5fe0e08d-fe57-4d84-a091-26c935749a2f.png"
                  alt="Kings of Bacong Chess Club"
                  className="w-40 h-40 md:w-48 md:h-48"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
