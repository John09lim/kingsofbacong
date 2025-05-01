
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
}

interface OpeningVideosProps {
  openingName: string;
  videoCount: number;
  isOpen: boolean;
  onClose: () => void;
}

const getVideosForOpening = (openingName: string, count: number): OpeningVideo[] => {
  // Predefined videos for each opening
  const videosByOpening: Record<string, OpeningVideo[]> = {
    "Ruy Lopez": [
      {
        id: "1",
        title: "The Ruy Lopez Opening - Chess Openings Explained",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=nH-m0QoB5vs",
        thumbnail: "https://i.ytimg.com/vi/nH-m0QoB5vs/hqdefault.jpg",
        duration: "20:15",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "Master the Ruy Lopez | Opening Repertoire & Ideas",
        channel: "Daniel Naroditsky",
        url: "https://www.youtube.com/watch?v=eiZ31n3_xM4",
        thumbnail: "https://i.ytimg.com/vi/eiZ31n3_xM4/hqdefault.jpg",
        duration: "32:47",
        difficulty: "Intermediate"
      },
      {
        id: "3",
        title: "Crushing The Ruy Lopez with GM Ben Finegold",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=qM4e7g-KxxY",
        thumbnail: "https://i.ytimg.com/vi/qM4e7g-KxxY/hqdefault.jpg",
        duration: "28:34",
        difficulty: "Intermediate"
      },
      {
        id: "4",
        title: "Ruy Lopez Exchange Variation | Chess Openings",
        channel: "thechesswebsite",
        url: "https://www.youtube.com/watch?v=6IFY9-VoNZw",
        thumbnail: "https://i.ytimg.com/vi/6IFY9-VoNZw/hqdefault.jpg",
        duration: "15:43",
        difficulty: "Beginner"
      }
    ],
    "Sicilian Defense": [
      {
        id: "1",
        title: "Basic Chess Openings Explained - Sicilian Defense",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=Yio77hScEf8",
        thumbnail: "https://i.ytimg.com/vi/Yio77hScEf8/hqdefault.jpg",
        duration: "19:48",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "Mastering the Sicilian Najdorf | Chess Opening Tutorial",
        channel: "Daniel Naroditsky",
        url: "https://www.youtube.com/watch?v=Ma4Ig3-MDSE",
        thumbnail: "https://i.ytimg.com/vi/Ma4Ig3-MDSE/hqdefault.jpg",
        duration: "39:12",
        difficulty: "Advanced"
      },
      {
        id: "3",
        title: "Sicilian Defense: Dragon Variation | Complete Guide",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=PU6c4rdqsHo",
        thumbnail: "https://i.ytimg.com/vi/PU6c4rdqsHo/hqdefault.jpg",
        duration: "35:23",
        difficulty: "Intermediate"
      }
    ],
    "Queen's Gambit": [
      {
        id: "1",
        title: "The Queen's Gambit | Chess Opening Tutorial",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=U9hleXVtvyg",
        thumbnail: "https://i.ytimg.com/vi/U9hleXVtvyg/hqdefault.jpg",
        duration: "22:47",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "Queen's Gambit Declined: Main Lines | Chess Opening Tutorial",
        channel: "Daniel Naroditsky",
        url: "https://www.youtube.com/watch?v=iIkAR2qfmel",
        thumbnail: "https://i.ytimg.com/vi/iIkAR2qfmel/hqdefault.jpg",
        duration: "30:18",
        difficulty: "Intermediate"
      }
    ],
    "French Defense": [
      {
        id: "1",
        title: "Learn the French Defense | 10-Minute Chess Openings",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=LSonPow5cOQ",
        thumbnail: "https://i.ytimg.com/vi/LSonPow5cOQ/hqdefault.jpg",
        duration: "14:32",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "Master the French Defense | Complete Guide",
        channel: "Hanging Pawns",
        url: "https://www.youtube.com/watch?v=5pec-u6PSvA",
        thumbnail: "https://i.ytimg.com/vi/5pec-u6PSvA/hqdefault.jpg",
        duration: "45:13",
        difficulty: "Advanced"
      }
    ],
    "Caro-Kann Defense": [
      {
        id: "1",
        title: "Learn the Caro-Kann Defense | 10-Minute Chess Openings",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=QC_yByhes1o",
        thumbnail: "https://i.ytimg.com/vi/QC_yByhes1o/hqdefault.jpg",
        duration: "12:18",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "How to Play the Caro-Kann | Complete Guide",
        channel: "Hanging Pawns",
        url: "https://www.youtube.com/watch?v=gZ_Gbu7MiU0",
        thumbnail: "https://i.ytimg.com/vi/gZ_Gbu7MiU0/hqdefault.jpg",
        duration: "38:45",
        difficulty: "Intermediate"
      }
    ],
    "English Opening": [
      {
        id: "1",
        title: "Learn the English Opening | 10-Minute Chess Openings",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=W4XLFBxDaEM",
        thumbnail: "https://i.ytimg.com/vi/W4XLFBxDaEM/hqdefault.jpg",
        duration: "13:27",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "English Opening Masterclass with GM Yasser Seirawan",
        channel: "Saint Louis Chess Club",
        url: "https://www.youtube.com/watch?v=lZ-FsR16TLM",
        thumbnail: "https://i.ytimg.com/vi/lZ-FsR16TLM/hqdefault.jpg",
        duration: "48:36",
        difficulty: "Advanced"
      }
    ],
    "Giuoco Piano": [
      {
        id: "1",
        title: "Learn the Giuoco Piano | Chess Opening Tutorial",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=cY9zitJFglc",
        thumbnail: "https://i.ytimg.com/vi/cY9zitJFglc/hqdefault.jpg",
        duration: "18:52",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "Mastering the Italian Game | Chess Opening Strategy",
        channel: "Daniel Naroditsky",
        url: "https://www.youtube.com/watch?v=zZQMbiIE0R8",
        thumbnail: "https://i.ytimg.com/vi/zZQMbiIE0R8/hqdefault.jpg",
        duration: "32:14",
        difficulty: "Intermediate"
      }
    ],
    "Slav Defense": [
      {
        id: "1",
        title: "Learn the Slav Defense | Chess Opening Tutorial",
        channel: "GothamChess",
        url: "https://www.youtube.com/watch?v=EnpWG1nO2j4",
        thumbnail: "https://i.ytimg.com/vi/EnpWG1nO2j4/hqdefault.jpg",
        duration: "21:36",
        difficulty: "Beginner"
      },
      {
        id: "2",
        title: "Mastering the Slav Defense | Chess Opening Guide",
        channel: "Hanging Pawns",
        url: "https://www.youtube.com/watch?v=bpKK99MXaYM",
        thumbnail: "https://i.ytimg.com/vi/bpKK99MXaYM/hqdefault.jpg",
        duration: "41:28",
        difficulty: "Intermediate"
      }
    ]
  };

  // Extend the videos array to match the requested count if needed
  let selectedVideos = videosByOpening[openingName] || [];
  
  // If we need more videos than are predefined, duplicate some
  while (selectedVideos.length < count) {
    const videosToAdd = [...selectedVideos].slice(0, Math.min(5, selectedVideos.length));
    selectedVideos = [...selectedVideos, ...videosToAdd.map((v, i) => ({
      ...v,
      id: `${parseInt(v.id) + selectedVideos.length + i}`,
      title: `${v.title} - Part ${Math.floor(selectedVideos.length / videosByOpening[openingName].length) + 1}`
    }))];
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
                  <p className="text-xs text-gray-500 mb-2">{video.channel}</p>
                  <div className="flex justify-between items-center">
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
