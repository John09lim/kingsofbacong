import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTrainingSession } from '@/hooks/useTrainingSession';
import { TrainingTimeDisplay } from '@/components/TrainingTimeDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, ChevronRight } from "lucide-react";
import OpeningLessonModal from '@/components/OpeningLessonModal';
import OpeningVideos from '@/components/OpeningVideos';

// Import chess opening images
import ruyLopezImage from '@/assets/ruy-lopez-opening.jpg';
import sicilianDefenseImage from '@/assets/sicilian-defense-opening.jpg';
import queensGambitImage from '@/assets/queens-gambit-opening.jpg';
import frenchDefenseImage from '@/assets/french-defense-opening.jpg';
import caroKannDefenseImage from '@/assets/caro-kann-defense-opening.jpg';
import englishOpeningImage from '@/assets/english-opening.jpg';
import italianGameImage from '@/assets/italian-game-opening.jpg';
import slavDefenseImage from '@/assets/slav-defense-opening.jpg';
import londonSystemImage from '@/assets/london-system-opening.jpg';
import kingsIndianDefenseImage from '@/assets/kings-indian-defense-opening.jpg';
import nimzoIndianDefenseImage from '@/assets/nimzo-indian-defense-opening.jpg';
import fourKnightsGameImage from '@/assets/four-knights-game-opening.jpg';
import grunfeldDefenseImage from '@/assets/grunfeld-defense-opening.jpg';
import queensPawnGameImage from '@/assets/queens-pawn-game-opening.jpg';
import scandinavianDefenseImage from '@/assets/scandinavian-defense-opening.jpg';
import viennaGameImage from '@/assets/vienna-game-opening.jpg';
import benkoGambitImage from '@/assets/benko-gambit-opening.jpg';
import alekhinesDefenseImage from '@/assets/alekhines-defense-opening.jpg';
import modernDefenseImage from '@/assets/modern-defense-opening.jpg';
import catalanOpeningImage from '@/assets/catalan-opening.jpg';
import benoniDefenseImage from '@/assets/benoni-defense-opening.jpg';
import najdorfSicilianImage from '@/assets/najdorf-sicilian-opening.jpg';
import kingsGambitDeclinedImage from '@/assets/kings-gambit-declined-opening.jpg';
import philidorDefenseImage from '@/assets/philidor-defense-opening.jpg';

// Separate the opening card as it's used multiple times
const OpeningCard = ({ opening }) => {
  const [showLessons, setShowLessons] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
      <div className="h-56 overflow-hidden">
        <img 
          src={opening.imageUrl} 
          alt={opening.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            console.error(`Failed to load image for ${opening.name}:`, opening.imageUrl);
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{opening.name}</CardTitle>
          <Badge className="bg-chess-deep-red text-white">{opening.ecoCode}</Badge>
        </div>
        <CardDescription className="font-mono text-sm">{opening.moves}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm mb-3">{opening.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="bg-blue-50">
            Popularity: {opening.popularity}%
          </Badge>
          <Badge variant="outline" className={`
            ${opening.complexity === "Low" ? "bg-green-50" : 
              opening.complexity === "Medium" ? "bg-yellow-50" : "bg-red-50"}
          `}>
            Complexity: {opening.complexity}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="mt-auto">
        <div className="flex gap-4 w-full">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setShowLessons(true)}
          >
            <BookOpen size={16} className="mr-2" />
            {opening.lessonsCount} Lessons
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setShowVideos(true)}
          >
            <Video size={16} className="mr-2" />
            {opening.videoCount} Videos
          </Button>
        </div>
      </CardFooter>

      {/* Lesson Modal */}
      <OpeningLessonModal 
        openingName={opening.name}
        lessonCount={opening.lessonsCount}
        isOpen={showLessons}
        onClose={() => setShowLessons(false)}
      />

      {/* Videos Modal */}
      <OpeningVideos
        openingName={opening.name}
        videoCount={opening.videoCount}
        isOpen={showVideos}
        onClose={() => setShowVideos(false)}
      />
    </Card>
  );
};

// Create separate component for Opening Explorer section
const OpeningExplorer = () => (
  <div className="mt-12 border-t border-gray-200 pt-8">
    <h2 className="text-2xl font-bold mb-6">Opening Explorer</h2>
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
      <p className="text-gray-500 mb-6">
        Our interactive Opening Explorer is coming soon! You'll be able to:
      </p>
      <ul className="text-left max-w-lg mx-auto space-y-2 mb-6">
        <li className="flex items-center">
          <ChevronRight className="mr-2 text-chess-deep-red" size={18} />
          <span>Explore move variations on an interactive board</span>
        </li>
        <li className="flex items-center">
          <ChevronRight className="mr-2 text-chess-deep-red" size={18} />
          <span>See statistics from master games and online play</span>
        </li>
        <li className="flex items-center">
          <ChevronRight className="mr-2 text-chess-deep-red" size={18} />
          <span>Learn key concepts for each opening position</span>
        </li>
        <li className="flex items-center">
          <ChevronRight className="mr-2 text-chess-deep-red" size={18} />
          <span>Save your favorite variations for later study</span>
        </li>
      </ul>
      <Button className="bg-chess-deep-red hover:bg-chess-dark-maroon text-white">
        Get Notified When Available
      </Button>
    </div>
  </div>
);

// Main component
const OpeningStudies = () => {
  const { sessionDuration, isTracking } = useTrainingSession('opening_studies');
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("popular");

  const openings = {
    popular: [
      // First 4 existing openings
      {
        id: 1,
        name: "Ruy Lopez",
        ecoCode: "C60-C99",
        moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5",
        description: "One of the oldest and most studied openings. The Ruy Lopez remains popular at all levels of play.",
        popularity: 98,
        complexity: "Medium",
        videoCount: 24,
        lessonsCount: 18,
        imageUrl: ruyLopezImage
      },
      {
        id: 2,
        name: "Sicilian Defense",
        ecoCode: "B20-B99",
        moves: "1. e4 c5",
        description: "Black's most popular response to e4. Leads to complex and asymmetrical positions with rich tactical opportunities.",
        popularity: 95,
        complexity: "High",
        videoCount: 32,
        lessonsCount: 25,
        imageUrl: sicilianDefenseImage
      },
      {
        id: 3,
        name: "Queen's Gambit",
        ecoCode: "D06-D69",
        moves: "1. d4 d5 2. c4",
        description: "A solid opening for White that challenges Black's center control immediately.",
        popularity: 90,
        complexity: "Medium",
        videoCount: 20,
        lessonsCount: 15,
        imageUrl: queensGambitImage
      },
      {
        id: 4,
        name: "French Defense",
        ecoCode: "C00-C19",
        moves: "1. e4 e6",
        description: "A solid choice for Black that often leads to closed, strategic positions with clear plans.",
        popularity: 85,
        complexity: "Medium",
        videoCount: 18,
        lessonsCount: 14,
        imageUrl: frenchDefenseImage
      },
      // Additional openings to add
      {
        id: 9,
        name: "Caro-Kann Defense",
        ecoCode: "B10-B19",
        moves: "1. e4 c6",
        description: "A solid and reliable defense for Black, focused on safe development and solid pawn structure.",
        popularity: 82,
        complexity: "Medium",
        videoCount: 16,
        lessonsCount: 12,
        imageUrl: caroKannDefenseImage
      },
      {
        id: 10,
        name: "English Opening",
        ecoCode: "A10-A39",
        moves: "1. c4",
        description: "A flexible opening that can transpose into many different setups. Popular with positional players.",
        popularity: 78,
        complexity: "Medium",
        videoCount: 14,
        lessonsCount: 10,
        imageUrl: englishOpeningImage
      },
      {
        id: 11,
        name: "Giuoco Piano",
        ecoCode: "C50-C54",
        moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5",
        description: "A classical Italian game that leads to strategic battles. Popular at club level.",
        popularity: 75,
        complexity: "Medium",
        videoCount: 12,
        lessonsCount: 10,
        imageUrl: italianGameImage
      },
      {
        id: 12,
        name: "Slav Defense",
        ecoCode: "D10-D19",
        moves: "1. d4 d5 2. c4 c6",
        description: "A solid option for Black against the Queen's Gambit, maintaining a strong pawn center.",
        popularity: 80,
        complexity: "Medium",
        videoCount: 15,
        lessonsCount: 12,
        imageUrl: slavDefenseImage
      }
    ],
    beginner: [
      // First 2 existing beginner openings
      {
        id: 5,
        name: "Italian Game",
        ecoCode: "C50-C54",
        moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4",
        description: "An excellent opening for beginners that focuses on rapid development and control of the center.",
        popularity: 88,
        complexity: "Low",
        videoCount: 15,
        lessonsCount: 12,
        imageUrl: italianGameImage
      },
      {
        id: 6,
        name: "London System",
        ecoCode: "D02",
        moves: "1. d4 d5 2. Bf4",
        description: "A simple setup-based opening for White that can be played against almost any Black defense.",
        popularity: 80,
        complexity: "Low",
        videoCount: 12,
        lessonsCount: 10,
        imageUrl: londonSystemImage
      },
      // Additional beginner openings to add
      {
        id: 13,
        name: "Four Knights Game",
        ecoCode: "C46-C49",
        moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6",
        description: "A symmetrical opening that focuses on rapid development. Simple to understand for beginners.",
        popularity: 70,
        complexity: "Low",
        videoCount: 10,
        lessonsCount: 8,
        imageUrl: fourKnightsGameImage
      },
      {
        id: 14,
        name: "Queen's Pawn Game",
        ecoCode: "D00",
        moves: "1. d4 d5",
        description: "A flexible opening system that avoids complicated theory. Perfect for beginners.",
        popularity: 65,
        complexity: "Low",
        videoCount: 8,
        lessonsCount: 6,
        imageUrl: queensPawnGameImage
      },
      {
        id: 15,
        name: "Scandinavian Defense",
        ecoCode: "B01",
        moves: "1. e4 d5",
        description: "A straightforward defense where Black immediately challenges White's center. Easy to learn.",
        popularity: 60,
        complexity: "Low",
        videoCount: 7,
        lessonsCount: 5,
        imageUrl: scandinavianDefenseImage
      },
      {
        id: 16,
        name: "Vienna Game",
        ecoCode: "C25-C29",
        moves: "1. e4 e5 2. Nc3",
        description: "A classical opening that develops a knight early and prepares for king-side activity.",
        popularity: 55,
        complexity: "Low",
        videoCount: 6,
        lessonsCount: 5,
        imageUrl: viennaGameImage
      },
      {
        id: 17,
        name: "King's Gambit Declined",
        ecoCode: "C30",
        moves: "1. e4 e5 2. f4 Bc5",
        description: "A safer way to meet the aggressive King's Gambit. Suitable for beginners learning counter-attacking.",
        popularity: 50,
        complexity: "Low",
        videoCount: 5,
        lessonsCount: 4,
        imageUrl: kingsGambitDeclinedImage
      },
      {
        id: 18,
        name: "Philidor Defense",
        ecoCode: "C41",
        moves: "1. e4 e5 2. Nf3 d6",
        description: "A solid but slightly passive defense that beginners can use to learn positional concepts.",
        popularity: 45,
        complexity: "Low",
        videoCount: 4,
        lessonsCount: 4,
        imageUrl: philidorDefenseImage
      }
    ],
    advanced: [
      // First 2 existing advanced openings
      {
        id: 7,
        name: "King's Indian Defense",
        ecoCode: "E60-E99",
        moves: "1. d4 Nf6 2. c4 g6",
        description: "A hypermodern opening where Black allows White to build a strong center with pawns, then challenges it with pieces.",
        popularity: 75,
        complexity: "High",
        videoCount: 28,
        lessonsCount: 22,
        imageUrl: kingsIndianDefenseImage
      },
      {
        id: 8,
        name: "Nimzo-Indian Defense",
        ecoCode: "E20-E59",
        moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4",
        description: "A highly respected defense that puts immediate pressure on White's knight and center.",
        popularity: 82,
        complexity: "High",
        videoCount: 24,
        lessonsCount: 20,
        imageUrl: nimzoIndianDefenseImage
      },
      // Additional advanced openings to add
      {
        id: 19,
        name: "Grünfeld Defense",
        ecoCode: "D70-D99",
        moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5",
        description: "A hypermodern opening that immediately counters in the center. Popular at grandmaster level.",
        popularity: 85,
        complexity: "High",
        videoCount: 25,
        lessonsCount: 20,
        imageUrl: grunfeldDefenseImage
      },
      {
        id: 20,
        name: "Benko Gambit",
        ecoCode: "A57-A59",
        moves: "1. d4 Nf6 2. c4 c5 3. d5 b5",
        description: "A dynamic queen's side gambit where Black sacrifices a pawn for long-term positional pressure.",
        popularity: 60,
        complexity: "High",
        videoCount: 18,
        lessonsCount: 15,
        imageUrl: benkoGambitImage
      },
      {
        id: 21,
        name: "Alekhine's Defense",
        ecoCode: "B02-B05",
        moves: "1. e4 Nf6",
        description: "A provocative defense that lures White's pawns forward, aiming to undermine them later.",
        popularity: 55,
        complexity: "High",
        videoCount: 16,
        lessonsCount: 14,
        imageUrl: alekhinesDefenseImage
      },
      {
        id: 22,
        name: "Modern Defense",
        ecoCode: "B06",
        moves: "1. e4 g6",
        description: "A hypermodern approach giving White the center, then attacking it with fianchettoed bishops.",
        popularity: 50,
        complexity: "High",
        videoCount: 15,
        lessonsCount: 12,
        imageUrl: modernDefenseImage
      },
      {
        id: 23,
        name: "Catalan Opening",
        ecoCode: "E01-E09",
        moves: "1. d4 Nf6 2. c4 e6 3. g3",
        description: "A positional system that combines Queen's Gambit with a kingside fianchetto. Requires deep understanding.",
        popularity: 78,
        complexity: "High",
        videoCount: 20,
        lessonsCount: 18,
        imageUrl: catalanOpeningImage
      },
      {
        id: 24,
        name: "Benoni Defense",
        ecoCode: "A60-A79",
        moves: "1. d4 Nf6 2. c4 c5 3. d5",
        description: "An asymmetrical opening with dynamic counterplay. Popular with tactically aggressive players.",
        popularity: 65,
        complexity: "High",
        videoCount: 19,
        lessonsCount: 16,
        imageUrl: benoniDefenseImage
      },
      {
        id: 25,
        name: "Najdorf Sicilian",
        ecoCode: "B90-B99",
        moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6",
        description: "The most theoretically dense variation of the Sicilian. Extremely complex and double-edged.",
        popularity: 90,
        complexity: "Very High",
        videoCount: 35,
        lessonsCount: 30,
        imageUrl: najdorfSicilianImage
      }
    ]
  };

  const filteredOpenings = Object.values(openings).flat().filter(opening => 
    opening.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opening.ecoCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opening.moves.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-chess-dark-maroon py-10 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Opening Studies</h1>
                <p className="text-chess-light-pink text-lg max-w-3xl">
                  Explore the world of chess openings with our comprehensive guide. Learn theory, watch video analyses, and 
                  master the early phase of the game.
                </p>
              </div>
              <TrainingTimeDisplay sessionDuration={sessionDuration} isTracking={isTracking} />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search openings by name, ECO code, or moves..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {!searchQuery && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="bg-chess-muted-rose/20 w-full md:w-auto">
                  <TabsTrigger value="popular" className="flex-1 md:flex-initial data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                    Popular
                  </TabsTrigger>
                  <TabsTrigger value="beginner" className="flex-1 md:flex-initial data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                    For Beginners
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex-1 md:flex-initial data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                    Advanced
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>

          {searchQuery ? (
            filteredOpenings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpenings.map(opening => (
                  <OpeningCard key={opening.id} opening={opening} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-10">
                <h3 className="text-xl font-medium mb-2">No openings found</h3>
                <p className="text-gray-500">Try searching with different terms</p>
              </div>
            )
          ) : (
            <Tabs value={activeTab} className="w-full">
              {Object.keys(openings).map(category => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {openings[category].map(opening => (
                      <OpeningCard key={opening.id} opening={opening} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          <OpeningExplorer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OpeningStudies;
