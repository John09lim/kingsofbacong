
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
          <blockquote className="border-l-4 border-chess-light-pink pl-4 italic my-8 animate-fade-in">
            <p className="text-white text-lg">
              "A strong chess player isn't born overnight. It's built one consistent practice at a time."
            </p>
          </blockquote>
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
            <img 
              src="/lovable-uploads/46dedfa8-7159-42f0-a0eb-76829b4dc416.png"
              alt="Kings of Bacong Chess Club"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
