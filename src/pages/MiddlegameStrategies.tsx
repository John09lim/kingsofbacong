
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, ChessRook } from "lucide-react";

const MiddlegameStrategies = () => {
  const strategies = {
    positional: [
      {
        id: 1,
        title: "Pawn Structure Analysis",
        description: "Learn to evaluate pawn structures and understand their strategic implications.",
        image: "https://images.unsplash.com/photo-1611195973819-2b1d42b5afa7?q=80&w=3387&auto=format&fit=crop",
        difficulty: "Intermediate",
        lessonsCount: 8,
        exercisesCount: 12
      },
      {
        id: 2,
        title: "Outposts & Strong Squares",
        description: "Identify and utilize strong squares for your pieces.",
        image: "https://images.unsplash.com/photo-1587888191477-e74ac6bc9c4b?q=80&w=3270&auto=format&fit=crop",
        difficulty: "Intermediate",
        lessonsCount: 6,
        exercisesCount: 9
      },
      {
        id: 3,
        title: "Exploiting Weaknesses",
        description: "How to identify and exploit weak squares and pawns in your opponent's position.",
        image: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?q=80&w=3270&auto=format&fit=crop",
        difficulty: "Advanced",
        lessonsCount: 7,
        exercisesCount: 10
      }
    ],
    tactical: [
      {
        id: 4,
        title: "Double Attack Patterns",
        description: "Master the art of attacking two targets simultaneously.",
        image: "https://images.unsplash.com/photo-1529699310859-b163e33e4556?q=80&w=3271&auto=format&fit=crop",
        difficulty: "Beginner",
        lessonsCount: 10,
        exercisesCount: 15
      },
      {
        id: 5,
        title: "Piece Sacrifices",
        description: "Learn when and how to sacrifice material for a decisive advantage.",
        image: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?q=80&w=3270&auto=format&fit=crop",
        difficulty: "Advanced",
        lessonsCount: 8,
        exercisesCount: 12
      },
      {
        id: 6,
        title: "Combinations & Calculation",
        description: "Improve your calculation skills and pattern recognition.",
        image: "https://images.unsplash.com/photo-1611195973819-2b1d42b5afa7?q=80&w=3387&auto=format&fit=crop",
        difficulty: "Intermediate",
        lessonsCount: 9,
        exercisesCount: 14
      }
    ],
    planning: [
      {
        id: 7,
        title: "Strategic Planning",
        description: "Develop long-term plans based on the position's characteristics.",
        image: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=3348&auto=format&fit=crop",
        difficulty: "Intermediate",
        lessonsCount: 7,
        exercisesCount: 9
      },
      {
        id: 8,
        title: "Prophylaxis & Prevention",
        description: "Learn to anticipate and prevent your opponent's plans.",
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=3271&auto=format&fit=crop",
        difficulty: "Advanced",
        lessonsCount: 6,
        exercisesCount: 10
      },
      {
        id: 9,
        title: "Initiative & Tempo",
        description: "Understand the importance of initiative and how to maintain it.",
        image: "https://images.unsplash.com/photo-1582294395039-a44ade722a26?q=80&w=3270&auto=format&fit=crop",
        difficulty: "Intermediate",
        lessonsCount: 8,
        exercisesCount: 11
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-chess-dark-maroon py-10 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Middlegame Strategies</h1>
            <p className="text-chess-light-pink text-lg max-w-3xl">
              Master the critical middle phase of the game with our comprehensive lessons on positional play, 
              tactical motifs, and strategic planning.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="positional" className="w-full">
            <TabsList className="mb-8 bg-chess-muted-rose/20">
              <TabsTrigger value="positional" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                Positional Play
              </TabsTrigger>
              <TabsTrigger value="tactical" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                Tactical Motifs
              </TabsTrigger>
              <TabsTrigger value="planning" className="data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                Strategic Planning
              </TabsTrigger>
            </TabsList>

            {Object.keys(strategies).map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {strategies[category].map(strategy => (
                    <StrategyCard key={strategy.id} strategy={strategy} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-chess-dark-maroon mb-8">Featured Annotated Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Kasparov vs. Topalov (1999)</CardTitle>
                  <CardDescription>The famous game featuring Kasparov's incredible queen sacrifice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">Game Viewer Coming Soon</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">
                    This famous encounter features one of the most brilliant combinations in chess history,
                    highlighting the power of sacrifice and calculation in the middlegame.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon">View Analysis</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fischer vs. Spassky (1972)</CardTitle>
                  <CardDescription>Game 6 of the World Championship match</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">Game Viewer Coming Soon</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">
                    Fischer's masterful positional play in this game demonstrates key middlegame principles
                    of piece coordination and strategic planning.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon">View Analysis</Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StrategyCard = ({ strategy }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="h-48 overflow-hidden">
        <img 
          src={strategy.image} 
          alt={strategy.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{strategy.title}</CardTitle>
          <Badge className={`
            ${strategy.difficulty === "Beginner" ? "bg-green-600" : 
              strategy.difficulty === "Intermediate" ? "bg-amber-600" : "bg-red-600"}
            text-white
          `}>
            {strategy.difficulty}
          </Badge>
        </div>
        <CardDescription>{strategy.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex gap-4 pb-2">
        <div className="flex items-center">
          <BookOpen size={16} className="mr-1 text-chess-deep-red" />
          <span className="text-sm">{strategy.lessonsCount} Lessons</span>
        </div>
        <div className="flex items-center">
          <Target size={16} className="mr-1 text-chess-deep-red" />
          <span className="text-sm">{strategy.exercisesCount} Exercises</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon">
          <ChessRook size={16} className="mr-2" />
          Start Learning
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MiddlegameStrategies;
