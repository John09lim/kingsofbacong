import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { BookOpen, Target, Crown, Zap } from "lucide-react";

// Import chess-related images
import openingPrinciples from "@/assets/opening-principles.jpg";
import positionalPlay from "@/assets/positional-play.jpg";
import advancedEndgames from "@/assets/advanced-endgames.jpg";
import tacticalPatterns from "@/assets/tactical-patterns.jpg";

const ChessTrainingOverview = () => {
  const trainingAreas = [
    {
      id: 'openings',
      title: 'Opening Studies',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'Master the fundamental principles of chess openings and learn popular opening systems that will give you a solid foundation for every game.',
      detailedDescription: 'Opening studies focus on the first phase of the game where proper development and central control are crucial. Learn classical openings like the Italian Game, Ruy Lopez, and Queen\'s Gambit, understand opening principles, and develop a solid repertoire that suits your playing style.',
      image: openingPrinciples,
      route: '/openings',
      features: [
        'Classical opening principles',
        'Popular opening systems',
        'Opening repertoire building',
        'Theory and practical play'
      ]
    },
    {
      id: 'middlegame',
      title: 'Middlegame Strategies',
      icon: <Target className="w-8 h-8" />,
      description: 'Develop your positional understanding and tactical awareness in the complex middlegame phase where most games are decided.',
      detailedDescription: 'Middlegame strategies encompass both positional play and tactical combinations. Learn to evaluate positions, create and exploit weaknesses, master piece coordination, and develop the ability to calculate complex variations. This is where creativity meets technique.',
      image: positionalPlay,
      route: '/middlegame',
      features: [
        'Positional evaluation',
        'Tactical combinations',
        'Piece coordination',
        'Strategic planning'
      ]
    },
    {
      id: 'endgame',
      title: 'Endgame Techniques',
      icon: <Crown className="w-8 h-8" />,
      description: 'Master essential endgame patterns and techniques that will help you convert winning positions and save difficult games.',
      detailedDescription: 'Endgame technique is the foundation of chess mastery. Study basic checkmate patterns, pawn endgames, piece vs. pawn scenarios, and complex theoretical positions. Understanding endgames will improve your entire game by helping you evaluate middle game positions more accurately.',
      image: advancedEndgames,
      route: '/endgame',
      features: [
        'Basic checkmate patterns',
        'Pawn endgame theory',
        'Piece coordination in endgames',
        'Practical endgame skills'
      ]
    },
    {
      id: 'tactics',
      title: 'Tactical Puzzles',
      icon: <Zap className="w-8 h-8" />,
      description: 'Sharpen your tactical vision with daily puzzle challenges featuring pins, forks, skewers, and other tactical motifs.',
      detailedDescription: 'Tactical training is essential for chess improvement. Solve puzzles featuring common tactical themes like pins, forks, discovered attacks, deflection, and sacrifice patterns. Regular tactical practice will help you spot combinations quickly and avoid tactical blunders.',
      image: tacticalPatterns,
      route: '/tactics',
      features: [
        'Daily puzzle challenges',
        'Common tactical motifs',
        'Pattern recognition',
        'Combination training'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-chess-dark-maroon py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Chess Training Hub
            </h1>
            <p className="text-chess-light-pink text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Master every aspect of chess through our comprehensive training modules. 
              From opening principles to endgame mastery, develop the skills you need to excel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                asChild
                className="bg-white text-chess-dark-maroon hover:bg-chess-light-pink hover:text-white font-semibold px-8 py-3"
                showRipple
              >
                <Link to="/training">Start Structured Learning</Link>
              </AnimatedButton>
              <AnimatedButton 
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-chess-dark-maroon font-semibold px-8 py-3"
                showRipple
              >
                <Link to="/tactics">Practice Puzzles</Link>
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Training Areas Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-chess-dark-maroon mb-4">
              Four Pillars of Chess Mastery
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Each training area focuses on a crucial aspect of chess improvement. 
              Master all four to become a complete chess player.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {trainingAreas.map((area, index) => (
              <Card key={area.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={area.image} 
                    alt={area.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      {area.icon}
                      <h3 className="text-2xl font-bold">{area.title}</h3>
                    </div>
                    <p className="text-white/90 text-sm">{area.description}</p>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-chess-dark-maroon">What You'll Learn</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {area.detailedDescription}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-6">
                    <h4 className="font-semibold text-chess-dark-maroon mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {area.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-chess-deep-red rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <AnimatedButton 
                    asChild
                    className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon text-white font-medium"
                    showRipple
                  >
                    <Link to={area.route}>
                      Start {area.title}
                    </Link>
                  </AnimatedButton>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-chess-deep-red to-chess-dark-maroon rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Elevate Your Chess Game?
            </h3>
            <p className="text-chess-light-pink text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of chess players who have improved their game through structured training. 
              Start with any area that interests you most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-chess-dark-maroon font-semibold px-8 py-3"
                showRipple
              >
                <Link to="/profile">Track Your Progress</Link>
              </AnimatedButton>
              <AnimatedButton 
                asChild
                className="bg-white text-chess-dark-maroon hover:bg-chess-light-pink hover:text-white font-semibold px-8 py-3"
                showRipple
              >
                <Link to="/community">Join Community</Link>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChessTrainingOverview;