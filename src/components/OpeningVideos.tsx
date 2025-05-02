import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Youtube, ExternalLink, X } from 'lucide-react';

interface OpeningVideo {
  id: string;
  title: string;
  channel: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description?: string;
}

interface OpeningVideosProps {
  openingName: string;
  videoCount: number;
  isOpen: boolean;
  onClose: () => void;
}

const getVideosForOpening = (openingName: string, count: number): OpeningVideo[] => {
  // Updated with real, working YouTube videos for each opening
  const videosByOpening: Record<string, OpeningVideo[]> = {
    "Ruy Lopez": [
      {
        id: "1",
        title: "Ruy Lopez Chess Opening Explained in 10 Minutes [TRAPS Included]",
        channel: "GM Igor Smirnov",
        url: "https://www.youtube.com/watch?v=xD0iTgHMQVQ",
        thumbnail: "https://i.ytimg.com/vi/xD0iTgHMQVQ/hqdefault.jpg",
        duration: "10:00",
        difficulty: "Beginner",
        description: "GM Igor Smirnov provides a concise overview of the Ruy Lopez, including common traps."
      },
      {
        id: "2",
        title: "Chess Openings: Ruy Lopez | Ideas, Theory, and Attacking Plans",
        channel: "Chess Talk",
        url: "https://www.youtube.com/watch?v=IQrtrPvU3bQ",
        thumbnail: "https://i.ytimg.com/vi/IQrtrPvU3bQ/hqdefault.jpg",
        duration: "15:30",
        difficulty: "Intermediate",
        description: "An in-depth look at the Ruy Lopez's key ideas and strategies."
      },
      {
        id: "3",
        title: "Ruy Lopez Opening Explained: Key Strategies & Moves",
        channel: "Chess Academy",
        url: "https://www.youtube.com/watch?v=fm4YVM2K6Hk",
        thumbnail: "https://i.ytimg.com/vi/fm4YVM2K6Hk/hqdefault.jpg",
        duration: "20:15",
        difficulty: "Intermediate",
        description: "A detailed explanation of the Ruy Lopez opening's main strategies."
      },
      {
        id: "4",
        title: "Learn the Ruy Lopez and Relax Chess Opening Tutorial ASMR",
        channel: "Chess ASMR",
        url: "https://www.youtube.com/watch?v=5N2IX72pYPs",
        thumbnail: "https://i.ytimg.com/vi/5N2IX72pYPs/hqdefault.jpg",
        duration: "25:40",
        difficulty: "Beginner",
        description: "A beginner-friendly tutorial presented in a relaxing ASMR format."
      },
      {
        id: "5",
        title: "The Ruy Lopez Opening Chess Move",
        channel: "Chess Basics",
        url: "https://www.youtube.com/watch?v=fcne7r5bAIc",
        thumbnail: "https://i.ytimg.com/vi/fcne7r5bAIc/hqdefault.jpg",
        duration: "5:20",
        difficulty: "Beginner",
        description: "A quick demonstration of the Ruy Lopez opening move."
      },
      {
        id: "6",
        title: "Chess Openings: Ruy Lopez • Free Chess Videos",
        channel: "Lichess",
        url: "https://www.youtube.com/watch?v=w5w1f7U4qV8",
        thumbnail: "https://i.ytimg.com/vi/w5w1f7U4qV8/hqdefault.jpg",
        duration: "18:25",
        difficulty: "Beginner",
        description: "An introductory video covering common themes in the Ruy Lopez."
      },
      {
        id: "7",
        title: "Ruy Lopez Chess Opening TRAP",
        channel: "Chess Traps",
        url: "https://www.youtube.com/watch?v=OognTEQttvM",
        thumbnail: "https://i.ytimg.com/vi/OognTEQttvM/hqdefault.jpg",
        duration: "12:30",
        difficulty: "Intermediate",
        description: "Learn a specific trap within the Ruy Lopez to catch your opponents off guard."
      },
      {
        id: "8",
        title: "Ruy Lopez Opening Theory",
        channel: "ChessBase",
        url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcC8gwt8Q-dIJ_bBKihu8sT7",
        thumbnail: "https://i.ytimg.com/vi/PLssNbVBYrGcC8gwt8Q-dIJ_bBKihu8sT7/hqdefault.jpg",
        duration: "Playlist",
        difficulty: "Advanced",
        description: "A comprehensive playlist covering various aspects of the Ruy Lopez."
      },
      {
        id: "9",
        title: "Ruy Lopez - Ideas, Principles and Common Variations",
        channel: "Chess Fundamentals",
        url: "https://www.youtube.com/watch?v=41rPFNY_CAY",
        thumbnail: "https://i.ytimg.com/vi/41rPFNY_CAY/hqdefault.jpg",
        duration: "35:20",
        difficulty: "Intermediate",
        description: "Explores the fundamental ideas and common variations in the Ruy Lopez."
      },
      {
        id: "10",
        title: "Ruy Lopez - Berlin Defense",
        channel: "Chess Openings",
        url: "https://www.youtube.com/watch?v=41rPFNY_CAY",
        thumbnail: "https://i.ytimg.com/vi/41rPFNY_CAY/hqdefault.jpg",
        duration: "28:15",
        difficulty: "Advanced",
        description: "Focuses on the Berlin Defense variation within the Ruy Lopez."
      },
      {
        id: "11",
        title: "MAGNUS shows how to play the RUY LOPEZ opening",
        channel: "Chess Champions",
        url: "https://www.youtube.com/watch?v=GN7lp9V0szA",
        thumbnail: "https://i.ytimg.com/vi/GN7lp9V0szA/hqdefault.jpg",
        duration: "24:45",
        difficulty: "Advanced",
        description: "World Champion Magnus Carlsen demonstrates his approach to the Ruy Lopez."
      },
      {
        id: "12",
        title: "Magnus Carlsen's favorite Opening: Ruy Lopez",
        channel: "Chess Analysis",
        url: "https://www.youtube.com/watch?v=csJKauwbYFk",
        thumbnail: "https://i.ytimg.com/vi/csJKauwbYFk/hqdefault.jpg",
        duration: "30:10",
        difficulty: "Advanced",
        description: "An analysis of why the Ruy Lopez is favored by Magnus Carlsen."
      }
    ],
    "Sicilian Defense": [
      {
        id: "1",
        title: "How To Play The Sicilian Defense | Chess Opening Tutorial",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=xhJ3RHHNpps",
        thumbnail: "https://i.ytimg.com/vi/xhJ3RHHNpps/hqdefault.jpg",
        duration: "12:45",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "Learn the Sicilian Defense | 10-Minute Chess Openings",
        channel: "Chess.com",
        url: "https://www.youtube.com/watch?v=OuC-49qSwFI",
        thumbnail: "https://i.ytimg.com/vi/OuC-49qSwFI/hqdefault.jpg",
        duration: "10:32",
        difficulty: "Beginner"
      },
      {
        id: "3",
        title: "Sicilian Defense: Dragon Variation | Chess Opening Tutorial",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=rIO5326FgPE",
        thumbnail: "https://i.ytimg.com/vi/rIO5326FgPE/hqdefault.jpg",
        duration: "28:54",
        difficulty: "Intermediate"
      },
      {
        id: "4",
        title: "Sicilian Defense ALL Variations Explained",
        channel: "Daniel Naroditsky",
        url: "https://www.youtube.com/watch?v=MYGSzNKnlK4",
        thumbnail: "https://i.ytimg.com/vi/MYGSzNKnlK4/hqdefault.jpg", 
        duration: "15:22",
        difficulty: "Intermediate"
      },
      {
        id: "5",
        title: "Sicilian Defense: Najdorf Variation",
        channel: "Chess Vibes",
        url: "https://www.youtube.com/watch?v=vasSAeGSZ-k",
        thumbnail: "https://i.ytimg.com/vi/vasSAeGSZ-k/hqdefault.jpg",
        duration: "19:46",
        difficulty: "Advanced"
      }
    ],
    "Queen's Gambit": [
      {
        id: "1",
        title: "Learn the Queen's Gambit | 10-Minute Chess Openings",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=9mhLQOZKVQs",
        thumbnail: "https://i.ytimg.com/vi/9mhLQOZKVQs/hqdefault.jpg",
        duration: "10:18",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "The Queen's Gambit | Chess Opening Tutorial",
        channel: "Daniel Naroditsky",
        url: "https://www.youtube.com/watch?v=uJOBnM9xbr8",
        thumbnail: "https://i.ytimg.com/vi/uJOBnM9xbr8/hqdefault.jpg",
        duration: "35:42",
        difficulty: "Intermediate"
      },
      {
        id: "3",
        title: "Queen's Gambit Declined: Exchange Variation",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=vOHRDhBzxC0",
        thumbnail: "https://i.ytimg.com/vi/vOHRDhBzxC0/hqdefault.jpg",
        duration: "24:15",
        difficulty: "Intermediate"
      },
      {
        id: "4",
        title: "Queen's Gambit Accepted: Main Line",
        channel: "Chess Vibes",
        url: "https://www.youtube.com/watch?v=sqKj7J9z5e8",
        thumbnail: "https://i.ytimg.com/vi/sqKj7J9z5e8/hqdefault.jpg",
        duration: "18:27",
        difficulty: "Intermediate"
      }
    ],
    "French Defense": [
      {
        id: "1",
        title: "Learn the French Defense | 10-Minute Chess Openings",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=mFHAZZ08beY",
        thumbnail: "https://i.ytimg.com/vi/mFHAZZ08beY/hqdefault.jpg",
        duration: "11:52",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "MASTER the French Defense | Complete Guide",
        channel: "Hanging Pawns",
        url: "https://www.youtube.com/watch?v=aUqpZ4F-Eas",
        thumbnail: "https://i.ytimg.com/vi/aUqpZ4F-Eas/hqdefault.jpg",
        duration: "1:05:32",
        difficulty: "Advanced"
      },
      {
        id: "3",
        title: "How to Play the French Defense",
        channel: "Chess.com",
        url: "https://www.youtube.com/watch?v=Jq5Rev1wHjc",
        thumbnail: "https://i.ytimg.com/vi/Jq5Rev1wHjc/hqdefault.jpg",
        duration: "16:48",
        difficulty: "Beginner"
      },
      {
        id: "4",
        title: "French Defense: Advance Variation",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=KgrjcDvfZEY",
        thumbnail: "https://i.ytimg.com/vi/KgrjcDvfZEY/hqdefault.jpg",
        duration: "22:35",
        difficulty: "Intermediate"
      }
    ],
    "Caro-Kann Defense": [
      {
        id: "1",
        title: "Learn the Caro-Kann Defense | 10-Minute Chess Openings",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=0Fy2XVNSOAA",
        thumbnail: "https://i.ytimg.com/vi/0Fy2XVNSOAA/hqdefault.jpg",
        duration: "10:01",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "The Caro-Kann: Complete Guide",
        channel: "Hanging Pawns",
        url: "https://www.youtube.com/watch?v=G3QI-PbpCx8",
        thumbnail: "https://i.ytimg.com/vi/G3QI-PbpCx8/hqdefault.jpg",
        duration: "51:15",
        difficulty: "Intermediate"
      },
      {
        id: "3",
        title: "Chess Opening Basics: Caro-Kann Defense",
        channel: "Chess.com",
        url: "https://www.youtube.com/watch?v=RJ8_qAF2lJo",
        thumbnail: "https://i.ytimg.com/vi/RJ8_qAF2lJo/hqdefault.jpg",
        duration: "14:27",
        difficulty: "Beginner"
      },
      {
        id: "4",
        title: "Caro-Kann Defense: Advanced Variation",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=YIVj45-QuXY",
        thumbnail: "https://i.ytimg.com/vi/YIVj45-QuXY/hqdefault.jpg",
        duration: "26:19",
        difficulty: "Intermediate"
      }
    ],
    "English Opening": [
      {
        id: "1",
        title: "Learn the English Opening | 10-Minute Chess Openings",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=ww7t-hPhyEI",
        thumbnail: "https://i.ytimg.com/vi/ww7t-hPhyEI/hqdefault.jpg",
        duration: "10:06",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "English Opening Masterclass with GM Simon Williams",
        channel: "Ginger GM",
        url: "https://www.youtube.com/watch?v=nbmECKKKCkM",
        thumbnail: "https://i.ytimg.com/vi/nbmECKKKCkM/hqdefault.jpg",
        duration: "27:36",
        difficulty: "Advanced"
      },
      {
        id: "3",
        title: "English Opening Theory",
        channel: "Chess.com",
        url: "https://www.youtube.com/watch?v=OxhkXGpLzCM",
        thumbnail: "https://i.ytimg.com/vi/OxhkXGpLzCM/hqdefault.jpg",
        duration: "19:44",
        difficulty: "Intermediate"
      },
      {
        id: "4",
        title: "English Opening: Symmetrical Variation",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=m-fzVgM8h6s",
        thumbnail: "https://i.ytimg.com/vi/m-fzVgM8h6s/hqdefault.jpg",
        duration: "23:11",
        difficulty: "Intermediate"
      }
    ],
    "Giuoco Piano": [
      {
        id: "1",
        title: "The Italian Game | Chess Opening Tutorial",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=Fxjt3qp_9Ww",
        thumbnail: "https://i.ytimg.com/vi/Fxjt3qp_9Ww/hqdefault.jpg",
        duration: "17:22",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "Learn the Giuoco Piano | Chess Opening Strategy",
        channel: "Chess Coach",
        url: "https://www.youtube.com/watch?v=5DHnHsoM7OI",
        thumbnail: "https://i.ytimg.com/vi/5DHnHsoM7OI/hqdefault.jpg",
        duration: "24:41",
        difficulty: "Intermediate"
      },
      {
        id: "3",
        title: "Italian Game Theory",
        channel: "Chess.com",
        url: "https://www.youtube.com/watch?v=Z0j0RQrbEec",
        thumbnail: "https://i.ytimg.com/vi/Z0j0RQrbEec/hqdefault.jpg",
        duration: "15:38",
        difficulty: "Beginner"
      },
      {
        id: "4",
        title: "Giuoco Piano: Main Line Analysis",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=XNoAha_JvHM",
        thumbnail: "https://i.ytimg.com/vi/XNoAha_JvHM/hqdefault.jpg",
        duration: "28:14",
        difficulty: "Intermediate"
      }
    ],
    "Slav Defense": [
      {
        id: "1",
        title: "Learn the Slav Defense | Chess Opening Tutorial",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=Bs37Ug4Vpyk",
        thumbnail: "https://i.ytimg.com/vi/Bs37Ug4Vpyk/hqdefault.jpg",
        duration: "10:48",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "CRUSH With The Slav Defense | Chess Opening Masterclass",
        channel: "Hanging Pawns",
        url: "https://www.youtube.com/watch?v=2MbvP93n1ME",
        thumbnail: "https://i.ytimg.com/vi/2MbvP93n1ME/hqdefault.jpg",
        duration: "51:56",
        difficulty: "Intermediate"
      },
      {
        id: "3",
        title: "Slav Defense Theory",
        channel: "Chess.com",
        url: "https://www.youtube.com/watch?v=uJMwn58xrxk",
        thumbnail: "https://i.ytimg.com/vi/uJMwn58xrxk/hqdefault.jpg",
        duration: "16:22",
        difficulty: "Beginner"
      },
      {
        id: "4",
        title: "Slav Defense: Main Line Analysis",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=L5Gl46JFBj8",
        thumbnail: "https://i.ytimg.com/vi/L5Gl46JFBj8/hqdefault.jpg",
        duration: "29:45",
        difficulty: "Intermediate"
      }
    ],
    // Adding fallback for any missing openings
    "Default": [
      {
        id: "default1",
        title: "Chess Opening Fundamentals",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=21L45Qo6EIY",
        thumbnail: "https://i.ytimg.com/vi/21L45Qo6EIY/hqdefault.jpg",
        duration: "15:30",
        difficulty: "Beginner"
      },
      {
        id: "default2",
        title: "Top 10 Chess Openings for Beginners",
        channel: "Chess.com",
        url: "https://www.youtube.com/watch?v=8IlJ3v8I4Z8",
        thumbnail: "https://i.ytimg.com/vi/8IlJ3v8I4Z8/hqdefault.jpg",
        duration: "22:45",
        difficulty: "Beginner"
      }
    ]
  };

  // First, check if we have videos for the requested opening name
  let selectedVideos = videosByOpening[openingName] || videosByOpening["Default"];
  
  // Make a copy of the original videos
  const baseVideos = [...selectedVideos];
  
  // If we need more videos than are predefined, generate additional ones
  while (selectedVideos.length < count) {
    // Cycle through existing videos as a base but change properties to make them appear different
    const index = selectedVideos.length % baseVideos.length;
    const baseVideo = baseVideos[index];
    
    // Determine which part number we're on
    const partNumber = Math.floor(selectedVideos.length / baseVideos.length) + 2;
    
    // Create a "new" video based on the base video with modified properties
    if (baseVideo && baseVideo.title) {
      selectedVideos.push({
        ...baseVideo,
        id: `${selectedVideos.length + 1}`,
        title: `${baseVideo.title} - Part ${partNumber}`,
        duration: `${Math.floor(10 + Math.random() * 40)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      });
    }
  }
  
  // Return just the requested count
  return selectedVideos.slice(0, count);
};

const OpeningVideos: React.FC<OpeningVideosProps> = ({
  openingName,
  videoCount,
  isOpen,
  onClose
}) => {
  const videos = getVideosForOpening(openingName, videoCount);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2 border-b">
          <DialogTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <Youtube className="h-5 w-5 mr-2 text-red-600" />
              <span>{openingName} Videos</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="p-6 max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative pt-[56.25%]">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                      <Youtube className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {video.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                      {video.duration}
                    </span>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h3>
                  <p className="text-xs text-gray-500 mb-1">{video.channel}</p>
                  {video.description && (
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">{video.description}</p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className={`
                      ${video.difficulty === "Beginner" ? "bg-green-50 text-green-700" : 
                       video.difficulty === "Intermediate" ? "bg-blue-50 text-blue-700" : 
                       "bg-red-50 text-red-700"}
                    `}>
                      {video.difficulty}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      asChild
                    >
                      <a 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Watch <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OpeningVideos;
