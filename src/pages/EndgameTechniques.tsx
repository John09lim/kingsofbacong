
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Play, BookOpen, Trophy } from "lucide-react";

const EndgameTechniques = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const endgameCategories = [
    {
      id: "pawn",
      title: "Pawn Endgames",
      description: "Master the fundamentals of pawn endgames, including opposition, zugzwang, and pawn breakthrough techniques."
    },
    {
      id: "rook",
      title: "Rook Endgames",
      description: "Learn the principles of rook endgames, including Lucena and Philidor positions, active rooks, and rook vs. pawns."
    },
    {
      id: "minor",
      title: "Minor Piece Endgames",
      description: "Study bishop and knight endgames, good vs. bad bishop, and the strengths and weaknesses of knights in the endgame."
    },
    {
      id: "queen",
      title: "Queen Endgames",
      description: "Explore queen vs. pawn endgames, queen vs. rook, and other queen endgame scenarios."
    }
  ];

  const endgameScenarios = {
    pawn: [
      {
        id: 1,
        title: "King and Pawn vs. King",
        description: "The foundation of endgame study. Learn the critical concepts of opposition and key squares.",
        difficulty: "Beginner",
        importance: "Essential",
        lessonsCount: 7,
        exercisesCount: 15,
        image: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=3348&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Pawn Breakthroughs",
        description: "Learn how to create and exploit passed pawns to win the endgame.",
        difficulty: "Intermediate",
        importance: "Very Important",
        lessonsCount: 5,
        exercisesCount: 12,
        image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=3258&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Zugzwang Positions",
        description: "Master the concept of zugzwang where any move worsens the position.",
        difficulty: "Intermediate",
        importance: "Important",
        lessonsCount: 4,
        exercisesCount: 10,
        image: "https://images.unsplash.com/photo-1582294395039-a44ade722a26?q=80&w=3270&auto=format&fit=crop"
      }
    ],
    rook: [
      {
        id: 4,
        title: "Lucena Position",
        description: "The fundamental winning position in rook and pawn vs. rook endgames.",
        difficulty: "Intermediate",
        importance: "Essential",
        lessonsCount: 4,
        exercisesCount: 8,
        image: "https://images.unsplash.com/photo-1529699310859-b163e33e4556?q=80&w=3271&auto=format&fit=crop"
      },
      {
        id: 5,
        title: "Philidor Position",
        description: "The key defensive setup in rook and pawn vs. rook endgames.",
        difficulty: "Intermediate",
        importance: "Essential",
        lessonsCount: 3,
        exercisesCount: 8,
        image: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?q=80&w=3270&auto=format&fit=crop"
      },
      {
        id: 6,
        title: "Rook vs. Multiple Pawns",
        description: "Learn how to use your rook effectively against multiple pawns.",
        difficulty: "Advanced",
        importance: "Important",
        lessonsCount: 6,
        exercisesCount: 12,
        image: "https://images.unsplash.com/photo-1611195973819-2b1d42b5afa7?q=80&w=3387&auto=format&fit=crop"
      }
    ],
    minor: [
      {
        id: 7,
        title: "Bishop vs. Knight Endgames",
        description: "Compare the strengths of bishops and knights in various pawn structures.",
        difficulty: "Intermediate",
        importance: "Important",
        lessonsCount: 5,
        exercisesCount: 9,
        image: "https://images.unsplash.com/photo-1587888191477-e74ac6bc9c4b?q=80&w=3270&auto=format&fit=crop"
      },
      {
        id: 8,
        title: "Same-Colored Bishops",
        description: "Understanding the drawing tendencies of same-colored bishop endgames.",
        difficulty: "Advanced",
        importance: "Useful",
        lessonsCount: 4,
        exercisesCount: 7,
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=3271&auto=format&fit=crop"
      },
      {
        id: 9,
        title: "Knight vs. Pawns",
        description: "Understand the Knight's abilities and limitations against pawns.",
        difficulty: "Intermediate",
        importance: "Important",
        lessonsCount: 5,
        exercisesCount: 10,
        image: "https://images.unsplash.com/photo-1608841443433-d139301dd5ed?q=80&w=3000&auto=format&fit=crop"
      }
    ],
    queen: [
      {
        id: 10,
        title: "Queen vs. Pawn Endgames",
        description: "Learn how to handle queen vs. pawn scenarios, especially with pawns close to promotion.",
        difficulty: "Advanced",
        importance: "Important",
        lessonsCount: 6,
        exercisesCount: 12,
        image: "https://images.unsplash.com/photo-1543092587-d8b8feaf362b?q=80&w=3270&auto=format&fit=crop"
      },
      {
        id: 11,
        title: "Queen vs. Rook",
        description: "Master the techniques to win with a queen against a rook.",
        difficulty: "Advanced",
        importance: "Useful",
        lessonsCount: 5,
        exercisesCount: 10,
        image: "https://images.unsplash.com/photo-1579267276051-231783a690de?q=80&w=3270&auto=format&fit=crop"
      },
      {
        id: 12,
        title: "Queen and Pawn Endgames",
        description: "Complex scenarios with queens and pawns on the board.",
        difficulty: "Advanced",
        importance: "Useful",
        lessonsCount: 7,
        exercisesCount: 14,
        image: "https://images.unsplash.com/photo-1536679545597-c2e5e1946495?q=80&w=3368&auto=format&fit=crop"
      }
    ]
  };

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const endgamePrinciples = [
    "Activate your king in the endgame",
    "Create passed pawns whenever possible",
    "The side with material advantage should generally exchange pieces, not pawns",
    "Rooks belong behind passed pawns",
    "Don't rush - calculate carefully and be patient"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-chess-dark-maroon py-10 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Endgame Techniques</h1>
            <p className="text-chess-light-pink text-lg max-w-3xl">
              Master the critical final phase of the game. Study essential endgame positions, 
              learn key principles, and practice with interactive exercises.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <div className="bg-chess-light-pink/20 p-6 rounded-lg border border-chess-muted-rose">
              <h2 className="text-2xl font-bold text-chess-dark-maroon mb-4">Key Endgame Principles</h2>
              <ul className="space-y-2">
                {endgamePrinciples.map((principle, index) => (
                  <li key={index} className="flex items-center">
                    <Trophy size={20} className="mr-3 text-chess-deep-red flex-shrink-0" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-chess-dark-maroon mb-8">Endgame Categories</h2>
            <div className="space-y-4">
              {endgameCategories.map((category) => (
                <div key={category.id} className="border border-chess-muted-rose rounded-lg overflow-hidden">
                  <button 
                    className={`w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 ${expandedSection === category.id ? 'border-b border-chess-muted-rose' : ''}`}
                    onClick={() => toggleSection(category.id)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                    {expandedSection === category.id ? (
                      <ChevronUp className="flex-shrink-0 text-chess-deep-red" />
                    ) : (
                      <ChevronDown className="flex-shrink-0 text-chess-deep-red" />
                    )}
                  </button>
                  
                  {expandedSection === category.id && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {endgameScenarios[category.id].map((scenario) => (
                          <EndgameCard key={scenario.id} scenario={scenario} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold text-chess-dark-maroon mb-8">Featured Endgame Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Reti's Famous Endgame Study</CardTitle>
                  <CardDescription>A classic endgame puzzle that demonstrates the power of king activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">Interactive Board Coming Soon</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">
                    This famous study by Richard Reti shows how a king can chase two objectives simultaneously,
                    demonstrating the importance of king activity in the endgame.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon">Start Interactive Lesson</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Saavedra Position</CardTitle>
                  <CardDescription>A brilliant rook promotion leads to an unexpected win</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">Interactive Board Coming Soon</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-700">
                    The Saavedra position is one of the most famous endgame studies in chess history,
                    featuring an unexpected rook promotion to avoid stalemate and secure the win.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon">Start Interactive Lesson</Button>
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

const EndgameCard = ({ scenario }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
      <div className="h-40 overflow-hidden">
        <img 
          src={scenario.image} 
          alt={scenario.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base">{scenario.title}</CardTitle>
          <Badge className={`
            ${scenario.difficulty === "Beginner" ? "bg-green-600" : 
              scenario.difficulty === "Intermediate" ? "bg-amber-600" : "bg-red-600"}
            text-white text-xs
          `}>
            {scenario.difficulty}
          </Badge>
        </div>
        <CardDescription className="text-xs">{scenario.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2 pt-0 flex-grow">
        <Badge variant="outline" className="mb-2">Importance: {scenario.importance}</Badge>
        <div className="flex gap-4 mt-2 text-xs">
          <div className="flex items-center">
            <BookOpen size={14} className="mr-1 text-chess-deep-red" />
            <span>{scenario.lessonsCount} Lessons</span>
          </div>
          <div className="flex items-center">
            <Trophy size={14} className="mr-1 text-chess-deep-red" />
            <span>{scenario.exercisesCount} Exercises</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button size="sm" className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon text-xs h-8">
          <Play size={14} className="mr-1" />
          Start Learning
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EndgameTechniques;
