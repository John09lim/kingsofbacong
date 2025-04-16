
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, MessageSquare, ChevronRight } from "lucide-react";

// Define the lesson type
export type LessonType = {
  id: number;
  title: string;
  content: string;
  discussion: string;
};

// Mock data for opening lessons
const generateLessons = (openingName: string, count: number): LessonType[] => {
  const lessons: LessonType[] = [];
  
  for (let i = 1; i <= count; i++) {
    lessons.push({
      id: i,
      title: `${openingName}: Lesson ${i}`,
      content: generateLessonContent(openingName, i),
      discussion: generateDiscussionContent(openingName, i),
    });
  }
  
  return lessons;
};

// Generate lesson content based on opening name
const generateLessonContent = (openingName: string, lessonNumber: number): string => {
  const openingSpecificContent = {
    "Ruy Lopez": [
      "The Ruy Lopez, also called the Spanish Opening, is one of the oldest and most studied openings. It begins with 1. e4 e5 2. Nf3 Nc6 3. Bb5. White develops the bishop to an active square where it attacks the knight defending e5.",
      "The Ruy Lopez Exchange Variation (3...a6 4. Bxc6) simplifies the position early. White voluntarily gives up the bishop pair but damages Black's pawn structure. This variation leads to positions where White aims for a strong center and kingside attack.",
      "The Berlin Defense (3...Nf6) has gained popularity at the highest levels due to its solid nature. The main line continues 4. O-O Nxe4 5. d4, where White sacrifices a pawn for development and attacking chances."
    ],
    "Sicilian Defense": [
      "The Sicilian Defense begins with 1. e4 c5 and is Black's most popular response to e4. The opening immediately creates an asymmetrical position, which leads to complex play and fighting chess.",
      "The Najdorf Variation (1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6) is one of the sharpest lines in the Sicilian. Black prepares ...e5 and development of the queenside, while controlling the b5 square.",
      "The Dragon Variation (1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6) features a fianchettoed bishop on g7. Black creates pressure on the central light squares while preparing for kingside castling."
    ],
    "Queen's Gambit": [
      "The Queen's Gambit starts with 1. d4 d5 2. c4, offering a pawn sacrifice for central control. This classical opening leads to rich strategic battles.",
      "In the Queen's Gambit Accepted (1. d4 d5 2. c4 dxc4), Black temporarily gains a pawn but must deal with White's development advantage and control of the center.",
      "The Queen's Gambit Declined (1. d4 d5 2. c4 e6) is one of the most solid responses. Black creates a strong pawn chain but must be careful about developing the queenside bishop."
    ]
  };

  // Default content for openings without specific content
  const defaultContent = [
    `In this first lesson on the ${openingName}, we'll cover the basic move order and key ideas behind this opening. Understanding the initial moves and their purposes is essential for any player looking to add this opening to their repertoire.`,
    `Our second lesson on the ${openingName} focuses on common pawn structures that arise from this opening. The pawn structure dictates much of the middlegame strategy and understanding these formations will guide your piece placement and plans.`,
    `In this advanced lesson on the ${openingName}, we'll examine typical middlegame positions and strategic concepts. You'll learn how to formulate plans, identify weaknesses in your opponent's position, and convert your opening advantage into a win.`
  ];

  // Use opening-specific content if available, otherwise use default
  const contentArray = openingSpecificContent[openingName] || defaultContent;
  return contentArray[Math.min(lessonNumber - 1, contentArray.length - 1)] || defaultContent[0];
};

// Generate discussion content based on opening name
const generateDiscussionContent = (openingName: string, lessonNumber: number): string => {
  return `
  <div class="space-y-4">
    <div class="bg-gray-50 p-3 rounded-lg">
      <p class="font-semibold">GrandmasterX:</p>
      <p>I've been playing the ${openingName} for years, and I've found that the key to success is understanding the typical middlegame positions. Anyone else have specific preparation against popular responses?</p>
    </div>

    <div class="bg-gray-50 p-3 rounded-lg">
      <p class="font-semibold">ChessNewbie2023:</p>
      <p>I'm struggling with the timing of pawn breaks in this opening. Sometimes I feel like my position gets too cramped. Any advice from experienced players?</p>
    </div>

    <div class="bg-gray-50 p-3 rounded-lg">
      <p class="font-semibold">Coach_Emma:</p>
      <p>For beginners learning the ${openingName}, I recommend focusing on proper piece development before worrying about theoretical lines. A common mistake is moving the same pieces multiple times in the opening without completing development.</p>
    </div>

    <div class="bg-gray-50 p-3 rounded-lg">
      <p class="font-semibold">TacticalTom:</p>
      <p>In my experience, this opening leads to rich tactical opportunities around move 15-20. I'd suggest practicing tactical patterns that commonly arise from these positions.</p>
    </div>

    <div class="bg-gray-50 p-3 rounded-lg">
      <p class="font-semibold">EndgameExpert:</p>
      <p>Don't forget that the ${openingName} often leads to specific endgame types. Understanding these endgame patterns is just as important as knowing the opening theory!</p>
    </div>
  </div>
  `;
};

interface OpeningLessonModalProps {
  openingName: string;
  lessonCount: number;
  isOpen: boolean;
  onClose: () => void;
}

const OpeningLessonModal: React.FC<OpeningLessonModalProps> = ({
  openingName,
  lessonCount,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [lessons, setLessons] = React.useState<LessonType[]>([]);
  const [currentLessonId, setCurrentLessonId] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState("content");

  // Load lessons when the modal is opened
  React.useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate API call with setTimeout
      setTimeout(() => {
        setLessons(generateLessons(openingName, lessonCount));
        setLoading(false);
      }, 1000);
    }
  }, [isOpen, openingName, lessonCount]);

  const currentLesson = lessons.find(lesson => lesson.id === currentLessonId);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{openingName} Lessons</DialogTitle>
          <DialogDescription>
            Master the {openingName} through our comprehensive lessons and community discussions.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          {/* Lesson navigation sidebar */}
          <div className="bg-gray-50 rounded-md p-4 overflow-y-auto">
            <h3 className="font-semibold mb-4 flex items-center">
              <BookOpen size={18} className="mr-2 text-chess-deep-red" />
              Lesson Navigator
            </h3>
            
            {loading ? (
              <div className="space-y-3">
                {[...Array(lessonCount)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <ul className="space-y-2">
                {lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => setCurrentLessonId(lesson.id)}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        currentLessonId === lesson.id
                          ? "bg-chess-deep-red text-white"
                          : "hover:bg-gray-200"
                      } transition-colors text-sm flex items-center`}
                    >
                      <ChevronRight
                        size={16}
                        className={`mr-2 ${
                          currentLessonId === lesson.id ? "text-white" : "text-chess-deep-red"
                        }`}
                      />
                      {lesson.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Lesson content area */}
          <div className="md:col-span-2 overflow-hidden flex flex-col">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full overflow-hidden flex flex-col"
            >
              <TabsList className="mb-4">
                <TabsTrigger value="content" className="flex items-center">
                  <BookOpen size={16} className="mr-2" />
                  Lesson Content
                </TabsTrigger>
                <TabsTrigger value="discussion" className="flex items-center">
                  <MessageSquare size={16} className="mr-2" />
                  Discussion
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="flex-1 overflow-hidden m-0">
                <ScrollArea className="h-[400px] pr-4">
                  {loading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ) : currentLesson ? (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">{currentLesson.title}</h2>
                      <p className="leading-relaxed">{currentLesson.content}</p>
                      
                      {/* Additional lesson content would go here */}
                      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
                        <h3 className="font-semibold mb-2">Key Points to Remember:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Focus on central control in the opening phase</li>
                          <li>Develop your pieces toward the center</li>
                          <li>Castle early to secure your king's safety</li>
                          <li>Watch for typical tactical motifs in this opening</li>
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="discussion" className="flex-1 overflow-hidden m-0">
                <ScrollArea className="h-[400px] pr-4">
                  {loading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ) : currentLesson ? (
                    <div dangerouslySetInnerHTML={{ __html: currentLesson.discussion }} />
                  ) : null}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpeningLessonModal;
