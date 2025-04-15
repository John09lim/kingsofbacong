
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, ChevronRight } from "lucide-react";

const OpeningStudies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("popular");

  const openings = {
    popular: [
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
        imageUrl: "https://images.unsplash.com/photo-1543092587-d8b8feaf362b?q=80&w=3270&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1579267276051-231783a690de?q=80&w=3270&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1536679545597-c2e5e1946495?q=80&w=3368&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1613332954647-8720ce9d8b5d?q=80&w=3348&auto=format&fit=crop"
      }
    ],
    beginner: [
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
        imageUrl: "https://images.unsplash.com/photo-1559480671-14661589e81c?q=80&w=3300&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=3258&auto=format&fit=crop"
      }
    ],
    advanced: [
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
        imageUrl: "https://images.unsplash.com/photo-1609903943122-f8f9613e93f3?q=80&w=3432&auto=format&fit=crop"
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
        imageUrl: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?q=80&w=3270&auto=format&fit=crop"
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Opening Studies</h1>
            <p className="text-chess-light-pink text-lg max-w-3xl">
              Explore the world of chess openings with our comprehensive guide. Learn theory, watch video analyses, and 
              master the early phase of the game.
            </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchQuery ? (
              filteredOpenings.length > 0 ? (
                filteredOpenings.map(opening => (
                  <OpeningCard key={opening.id} opening={opening} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-xl font-medium mb-2">No openings found</h3>
                  <p className="text-gray-500">Try searching with different terms</p>
                </div>
              )
            ) : (
              // Here's the fix: Wrap all Tabs related content in a Tabs component
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
          </div>

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
        </div>
      </main>
      <Footer />
    </div>
  );
};

const OpeningCard = ({ opening }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="h-48 overflow-hidden">
        <img 
          src={opening.imageUrl} 
          alt={opening.name} 
          className="w-full h-full object-cover"
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
      
      <CardFooter className="flex gap-4">
        <Button variant="outline" className="flex-1">
          <BookOpen size={16} className="mr-2" />
          {opening.lessonsCount} Lessons
        </Button>
        <Button variant="outline" className="flex-1">
          <Video size={16} className="mr-2" />
          {opening.videoCount} Videos
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpeningStudies;
