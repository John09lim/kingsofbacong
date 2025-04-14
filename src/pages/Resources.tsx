import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search, Download, Video, BookOpen, FileText, Star, 
  PlayCircle, FileDown, ExternalLink, Clock
} from "lucide-react";

interface BaseResource {
  id: number;
  title: string;
  description: string;
  author: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  thumbnail: string;
  type: string;
}

interface VideoResource extends BaseResource {
  type: 'video';
  duration: string;
}

interface ArticleResource extends BaseResource {
  type: 'article';
  readTime: string;
}

interface DownloadResource extends BaseResource {
  type: 'pdf' | 'pgn';
  size: string;
}

type Resource = VideoResource | ArticleResource | DownloadResource;

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const resources: {
    videos: VideoResource[];
    articles: ArticleResource[];
    downloads: DownloadResource[];
  } = {
    videos: [
      {
        id: 1,
        title: "Opening Principles for Beginners",
        description: "Learn the core concepts of chess openings that you can apply to any game.",
        type: "video",
        duration: "23:45",
        author: "GM John Bartholomew",
        rating: 4.8,
        reviewCount: 452,
        tags: ["beginner", "openings"],
        thumbnail: "https://images.unsplash.com/photo-1529699310859-b163e33e4556?q=80&w=3271&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "Tactical Patterns: Forks & Pins",
        description: "Master the basic tactical motifs that win material and games.",
        type: "video",
        duration: "31:18",
        author: "IM Anna Rudolf",
        rating: 4.9,
        reviewCount: 378,
        tags: ["intermediate", "tactics"],
        thumbnail: "https://images.unsplash.com/photo-1582294395039-a44ade722a26?q=80&w=3270&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Endgame Essentials: King and Pawn",
        description: "Learn the fundamental concepts of king and pawn endgames.",
        type: "video",
        duration: "42:05",
        author: "GM Daniel King",
        rating: 4.7,
        reviewCount: 312,
        tags: ["intermediate", "endgame"],
        thumbnail: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=3348&auto=format&fit=crop"
      }
    ],
    articles: [
      {
        id: 4,
        title: "10 Opening Traps Every Player Should Know",
        description: "Common opening traps and how to avoid falling into them.",
        type: "article",
        readTime: "10 min",
        author: "FM Mike Klein",
        rating: 4.5,
        reviewCount: 215,
        tags: ["beginner", "openings", "traps"],
        thumbnail: "https://images.unsplash.com/photo-1587888191477-e74ac6bc9c4b?q=80&w=3270&auto=format&fit=crop"
      },
      {
        id: 5,
        title: "The Psychology of Chess: Handling Pressure",
        description: "Mental techniques to stay calm and focused during critical moments.",
        type: "article",
        readTime: "15 min",
        author: "WGM Jenn Shahade",
        rating: 4.6,
        reviewCount: 184,
        tags: ["advanced", "psychology"],
        thumbnail: "https://images.unsplash.com/photo-1611195973819-2b1d42b5afa7?q=80&w=3387&auto=format&fit=crop"
      },
      {
        id: 6,
        title: "Building Your Opening Repertoire",
        description: "A systematic approach to developing an opening repertoire for both White and Black.",
        type: "article",
        readTime: "12 min",
        author: "IM Levy Rozman",
        rating: 4.7,
        reviewCount: 247,
        tags: ["intermediate", "openings", "strategy"],
        thumbnail: "https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?q=80&w=3270&auto=format&fit=crop"
      }
    ],
    downloads: [
      {
        id: 7,
        title: "Beginner's Opening Guide",
        description: "Comprehensive PDF covering the basics of popular chess openings.",
        type: "pdf",
        size: "3.2 MB",
        author: "Chess.com Team",
        rating: 4.6,
        reviewCount: 324,
        tags: ["beginner", "openings", "pdf"],
        thumbnail: "https://images.unsplash.com/photo-1536679545597-c2e5e1946495?q=80&w=3368&auto=format&fit=crop"
      },
      {
        id: 8,
        title: "Tactical Motifs Cheat Sheet",
        description: "Quick reference guide for common tactical patterns.",
        type: "pdf",
        size: "1.8 MB",
        author: "IM Christof Sielecki",
        rating: 4.9,
        reviewCount: 431,
        tags: ["all-levels", "tactics", "pdf"],
        thumbnail: "https://images.unsplash.com/photo-1579267276051-231783a690de?q=80&w=3270&auto=format&fit=crop"
      },
      {
        id: 9,
        title: "Annotated Games Collection: Modern Classics",
        description: "PGN file with 50 annotated modern grandmaster games.",
        type: "pgn",
        size: "5.4 MB",
        author: "GM Robert Hess",
        rating: 4.8,
        reviewCount: 287,
        tags: ["advanced", "analysis", "pgn"],
        thumbnail: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=3258&auto=format&fit=crop"
      }
    ]
  };

  const allResources: Resource[] = [
    ...resources.videos,
    ...resources.articles,
    ...resources.downloads
  ];

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = 
      searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "all") {
      return matchesSearch;
    }
    
    return matchesSearch && resource.type === activeTab;
  });

  const getResourceIcon = (type) => {
    switch(type) {
      case 'video':
        return <PlayCircle className="h-5 w-5 text-red-600" />;
      case 'article':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'pdf':
        return <FileDown className="h-5 w-5 text-pink-600" />;
      case 'pgn':
        return <FileDown className="h-5 w-5 text-green-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-chess-dark-maroon py-10 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Resources</h1>
            <p className="text-chess-light-pink text-lg max-w-3xl">
              Access our comprehensive collection of learning materials, including videos, articles, 
              downloadable guides, PGN files, and more.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search resources by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-chess-muted-rose/20 w-full md:w-auto">
                <TabsTrigger value="all" className="flex-1 md:flex-initial data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="video" className="flex-1 md:flex-initial data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                  Videos
                </TabsTrigger>
                <TabsTrigger value="article" className="flex-1 md:flex-initial data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                  Articles
                </TabsTrigger>
                <TabsTrigger value="pdf" className="flex-1 md:flex-initial data-[state=active]:bg-chess-deep-red data-[state=active]:text-white">
                  Downloads
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredResources.length > 0 ? (
                filteredResources.slice(0, 6).map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <h3 className="text-xl font-medium mb-2">No resources found</h3>
                  <p className="text-gray-500">Try searching with different terms</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Recent Additions</h2>
              <div className="space-y-4">
                {allResources.slice(0, 5).map(resource => (
                  <div key={resource.id} className="flex gap-4 p-4 border rounded-lg hover:border-chess-deep-red hover:shadow-sm transition-all">
                    <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <img 
                        src={resource.thumbnail} 
                        alt={resource.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-medium truncate">{resource.title}</h3>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs">{resource.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-1">{resource.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          {getResourceIcon(resource.type)}
                          <span className="ml-1 capitalize">{resource.type}</span>
                        </div>
                        {'duration' in resource && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{resource.duration}</span>
                          </div>
                        )}
                        {'readTime' in resource && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{resource.readTime}</span>
                          </div>
                        )}
                        {'size' in resource && (
                          <div className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            <span>{resource.size}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Resource Categories</h2>
              <Card>
                <CardContent className="pt-6">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      <CategoryLink 
                        title="Video Lessons" 
                        description="Visual learning with expert instructors" 
                        count={resources.videos.length} 
                        icon={<Video className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="Articles" 
                        description="In-depth analysis and strategies" 
                        count={resources.articles.length} 
                        icon={<FileText className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="Downloadable PDFs" 
                        description="Guides and reference materials" 
                        count={resources.downloads.filter(d => d.type === 'pdf').length} 
                        icon={<FileDown className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="PGN Files" 
                        description="Annotated games and studies" 
                        count={resources.downloads.filter(d => d.type === 'pgn').length} 
                        icon={<Download className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="Opening Resources" 
                        description="Opening theory and repertoire development" 
                        count={12} 
                        icon={<BookOpen className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="Middlegame Strategy" 
                        description="Positional concepts and planning" 
                        count={8} 
                        icon={<BookOpen className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="Endgame Studies" 
                        description="Theoretical positions and techniques" 
                        count={10} 
                        icon={<BookOpen className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="Tactical Training" 
                        description="Pattern recognition and calculation" 
                        count={15} 
                        icon={<BookOpen className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="Chess Psychology" 
                        description="Mental aspects of the game" 
                        count={6} 
                        icon={<BookOpen className="h-5 w-5" />}
                      />
                      <CategoryLink 
                        title="Tournament Preparation" 
                        description="Competition strategies and tips" 
                        count={4} 
                        icon={<BookOpen className="h-5 w-5" />}
                      />
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Submit a Resource</CardTitle>
                  <CardDescription>
                    Have a valuable chess resource to share? Submit it for review.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon">
                    Submit Resource
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
      <div className="h-40 overflow-hidden">
        <img 
          src={resource.thumbnail} 
          alt={resource.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-1 mb-1">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs">{resource.rating}</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="flex gap-2 flex-wrap mb-3">
          {resource.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-chess-light-pink/10 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>By {resource.author}</span>
          {'duration' in resource && <span>{resource.duration}</span>}
          {'readTime' in resource && <span>{resource.readTime}</span>}
          {'size' in resource && <span>{resource.size}</span>}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          className="w-full bg-chess-deep-red hover:bg-chess-dark-maroon flex items-center gap-2"
        >
          {resource.type === 'video' ? (
            <>
              <PlayCircle className="h-4 w-4" /> Watch Now
            </>
          ) : resource.type === 'article' ? (
            <>
              <ExternalLink className="h-4 w-4" /> Read Article
            </>
          ) : (
            <>
              <Download className="h-4 w-4" /> Download
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface CategoryLinkProps {
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
}

const CategoryLink = ({ title, description, count, icon }: CategoryLinkProps) => {
  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start h-auto p-3 hover:bg-chess-light-pink/10"
    >
      <div className="flex items-start gap-3 text-left">
        <div className="mt-1 text-chess-deep-red">
          {icon}
        </div>
        <div className="flex-grow min-w-0">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-500 truncate">{description}</div>
        </div>
        <Badge variant="outline" className="flex-shrink-0">
          {count}
        </Badge>
      </div>
    </Button>
  );
};

export default Resources;
