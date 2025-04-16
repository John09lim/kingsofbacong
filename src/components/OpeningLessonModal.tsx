
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, MessageSquare, ChevronRight, Lightbulb } from "lucide-react";

// Define the lesson type
export type LessonType = {
  id: number;
  title: string;
  content: string;
  discussion: string;
  detailedExplanation: string; // Added detailed explanation field
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
      detailedExplanation: generateDetailedExplanation(openingName, i), // Generate detailed explanation
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

// Generate detailed explanation based on opening name
const generateDetailedExplanation = (openingName: string, lessonNumber: number): string => {
  const openingSpecificExplanations = {
    "Ruy Lopez": [
      `<p>The Ruy Lopez provides White with excellent control of the center while developing pieces harmoniously. The Bb5 move creates immediate tension by attacking Black's knight, which is defending the e5 pawn.</p>
      <p>Playing this opening effectively requires understanding several key concepts:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">Piece Activity:</span> White's bishop on b5 isn't just attacking a knight—it's preparing to control the a4-e8 diagonal after Black plays a6 and White retreats to a4.</li>
        <li><span class="font-semibold">Structural Awareness:</span> The possibility of capturing on c6 gives White the option to damage Black's pawn structure, doubling Black's c-pawns.</li>
        <li><span class="font-semibold">Long-term Planning:</span> White often aims for an eventual d4 push to challenge Black's center control fully.</li>
      </ul>
      <p class="mt-3">When studying this opening, pay special attention to how world champions like Garry Kasparov and Magnus Carlsen handle the resulting positions. Their games showcase the rich strategic possibilities.</p>`,
      
      `<p>The Exchange Variation (3...a6 4.Bxc6) represents a strategic choice where White voluntarily gives up the bishop pair in exchange for damaging Black's pawn structure. This decision transforms the character of the position entirely.</p>
      <p>Understanding the resulting pawn structure is critical:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">Doubled Pawns:</span> Black's doubled c-pawns can be both a weakness and a strength. They control important central squares but can become targets in the endgame.</li>
        <li><span class="font-semibold">Bishop Pair Compensation:</span> Black gets the bishop pair as compensation, which is particularly effective in open positions.</li>
        <li><span class="font-semibold">Endgame Implications:</span> The structural weaknesses often become more pronounced in endgames, giving White a clear target.</li>
      </ul>
      <p class="mt-3">Study the classic games of Anatoly Karpov, who frequently employed this variation to great effect, demonstrating how to exploit these structural weaknesses in the long run.</p>`,
      
      `<p>The Berlin Defense (3...Nf6) has been nicknamed "The Berlin Wall" for good reason. It creates a solid position for Black that is notoriously difficult to break down.</p>
      <p>After 4.O-O Nxe4 5.d4, the position requires specific knowledge:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">Queen Exchange:</span> The main line often involves an early queen exchange, leading to an endgame-like position with significant remaining material.</li>
        <li><span class="font-semibold">Pawn Structure:</span> Black typically has a solid but somewhat passive pawn structure. Understanding how to mobilize these pawns at the right moment is crucial.</li>
        <li><span class="font-semibold">Fortress Positions:</span> Black often creates a defensive fortress that requires precise technical skill from White to break down.</li>
      </ul>
      <p class="mt-3">Vladimir Kramnik famously used this defense to defeat Garry Kasparov in their 2000 World Championship match. Modern practitioners like Magnus Carlsen have refined the approach even further.</p>`
    ],
    "Sicilian Defense": [
      `<p>The Sicilian Defense is statistically the most successful response to 1.e4, and for good reason. By immediately creating an asymmetrical pawn structure, Black establishes a fighting game from the very first move.</p>
      <p>To understand the Sicilian deeply, consider these fundamental concepts:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">Pawn Exchange Dynamics:</span> The typical c5xd4 exchange gives Black control of the d4 square and often allows for a quick queenside expansion.</li>
        <li><span class="font-semibold">Piece Development:</span> Black often delays kingside development to focus on queenside activity and central counterplay.</li>
        <li><span class="font-semibold">Tempo Battles:</span> Many Sicilian variations revolve around tempo-sensitive positions where single moves can dramatically shift the evaluation.</li>
      </ul>
      <p class="mt-3">The theoretical density of the Sicilian is unmatched in chess openings. Even grandmasters continue to discover new ideas decades after a particular variation was first played.</p>`,
      
      `<p>The Najdorf Variation is named after Miguel Najdorf and represents one of the most theoretically complex roads Black can take in the Sicilian. The modest a6 move prepares for a later ...e5 advance while preventing Bb5+.</p>
      <p>What makes the Najdorf special:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">Flexible Pawn Structure:</span> Black keeps multiple pawn advance options open, allowing adaptability based on White's setup.</li>
        <li><span class="font-semibold">Key Central Battles:</span> The fight for control of e5 and d5 defines many Najdorf positions.</li>
        <li><span class="font-semibold">Attack vs. Defense:</span> White often launches a kingside attack while Black counterpunches in the center or queenside.</li>
      </ul>
      <p class="mt-3">Studying the games of Bobby Fischer and Garry Kasparov will provide excellent examples of how to handle Black's position. Both champions made significant theoretical contributions to this variation.</p>`,
      
      `<p>The Dragon Variation features Black's bishop fianchetto on g7, aiming the bishop along the h8-a1 diagonal at White's queenside. This creates one of the most double-edged positions in chess.</p>
      <p>Key strategic elements include:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">The Dragon Bishop:</span> The g7 bishop exerts tremendous pressure across the board and is often the centerpiece of Black's strategy.</li>
        <li><span class="font-semibold">Yugoslav Attack:</span> White's most critical response involves castling queenside and launching a pawn storm against Black's king.</li>
        <li><span class="font-semibold">Mutual King Hunts:</span> Many Dragon games feature both sides attacking opposing kings simultaneously in a race to deliver checkmate.</li>
      </ul>
      <p class="mt-3">This variation requires concrete calculation skills and positional understanding. Champions like Veselin Topalov have used the Dragon successfully at the highest levels, demonstrating its viability despite its reputation for danger.</p>`
    ],
    "Queen's Gambit": [
      `<p>The Queen's Gambit is one of the fundamental chess openings, offering a pawn (c4) to establish a strong central presence. Despite its name, it's not truly a gambit in most lines as Black cannot productively maintain the extra pawn.</p>
      <p>Understanding Queen's Gambit positions requires knowledge of:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">Central Control:</span> White aims to control the center with pawns on d4 and e4, often supported by pieces.</li>
        <li><span class="font-semibold">Development Patterns:</span> The opening follows classical development principles with emphasis on controlling key central squares.</li>
        <li><span class="font-semibold">Pawn Structure Variations:</span> Different responses by Black lead to distinctly different pawn structures, each with unique characteristics.</li>
      </ul>
      <p class="mt-3">The Queen's Gambit has stood the test of time and remains popular at all levels of chess. World Champions from Emanuel Lasker to Magnus Carlsen have relied on it in critical games.</p>`,
      
      `<p>In the Queen's Gambit Accepted, Black temporarily gains a pawn but must deal with White's development advantage and control of the center. The pawn is typically difficult to hold.</p>
      <p>Strategic themes to master:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">Rapid Development:</span> White can develop pieces quickly with tempo gains against the c4 pawn.</li>
        <li><span class="font-semibold">Central Domination:</span> White often establishes pawns on e4 and d4, claiming a strong center.</li>
        <li><span class="font-semibold">Timing of ...dxc4:</span> Black must understand when taking the pawn is advantageous versus when it concedes too much central control.</li>
      </ul>
      <p class="mt-3">Study the games of Anatoly Karpov from both sides of this variation to understand the subtle interplay of pieces and the importance of timing in pawn recaptures.</p>`,
      
      `<p>The Queen's Gambit Declined is Black's most solid response, maintaining central control with the e6 pawn move. This creates a strong central pawn chain but temporarily blocks in the c8 bishop.</p>
      <p>The main strategic considerations include:</p>
      <ul class="list-disc list-inside space-y-2 mt-3">
        <li><span class="font-semibold">The Light-Square Bishop Problem:</span> Black needs to find the right moment to develop the c8 bishop, which is initially blocked by pawns.</li>
        <li><span class="font-semibold">Minority Attack:</span> In many QGD positions, White initiates a queenside pawn advance to create weaknesses in Black's structure.</li>
        <li><span class="font-semibold">Central Tension:</span> The management of central tension, particularly when to resolve it with exchanges, is a key skill.</li>
      </ul>
      <p class="mt-3">This opening has been championed by many positional players throughout chess history. Games of Tigran Petrosian showcase how to handle the resulting positions with precision and patience.</p>`
    ]
  };

  // Default explanations for openings without specific content
  const defaultExplanations = [
    `<p>This introductory lesson on the ${openingName} provides the foundation for understanding this opening's core concepts:</p>
    <ul class="list-disc list-inside space-y-2 mt-3">
      <li><span class="font-semibold">Historical Context:</span> This opening has evolved significantly since its first documented use in the 19th century. Understanding its historical development gives insight into its strategic foundations.</li>
      <li><span class="font-semibold">Move Order Significance:</span> Each move in the opening sequence serves multiple purposes—development, center control, and preparation for future plans.</li>
      <li><span class="font-semibold">Common Mistakes:</span> Beginning players often misunderstand the timing of key moves, leading to positions where their pieces lack coordination.</li>
    </ul>
    <p class="mt-3">Practice setting up these positions against a computer or friend to get comfortable with the initial moves before diving deeper into variations.</p>`,
    
    `<p>Pawn structures form the skeleton of chess positions. In the ${openingName}, several distinct structures can arise:</p>
    <ul class="list-disc list-inside space-y-2 mt-3">
      <li><span class="font-semibold">Central Pawn Formations:</span> The configuration of central pawns dictates which squares become important outposts for your pieces.</li>
      <li><span class="font-semibold">Pawn Breaks:</span> Understanding when and how to execute pawn breaks is essential. These moves release tension and can completely transform the position.</li>
      <li><span class="font-semibold">Structural Weaknesses:</span> Each pawn move creates potential weaknesses. Learning to minimize your own weaknesses while exploiting your opponent's is a key skill.</li>
    </ul>
    <p class="mt-3">Study master games featuring this opening and pay special attention to how the pawn structure evolves throughout the game. This will develop your positional understanding.</p>`,
    
    `<p>Advanced middlegame play in the ${openingName} requires synthesizing tactical and strategic elements:</p>
    <ul class="list-disc list-inside space-y-2 mt-3">
      <li><span class="font-semibold">Piece Coordination:</span> The interplay between pieces determines the success of your plans. Practice visualizing how your pieces work together.</li>
      <li><span class="font-semibold">Transition to Endgame:</span> Recognizing favorable moment to transition to an endgame is a crucial skill that many players overlook.</li>
      <li><span class="font-semibold">Dynamic vs. Static Advantages:</span> Learn to distinguish between temporary tactical advantages and lasting positional ones.</li>
    </ul>
    <p class="mt-3">Analyzing your own games is perhaps the most valuable practice. Pay attention to critical decision points where the character of the position changed significantly.</p>`
  ];

  // Use opening-specific explanations if available, otherwise use default
  const explanationArray = openingSpecificExplanations[openingName] || defaultExplanations;
  return explanationArray[Math.min(lessonNumber - 1, explanationArray.length - 1)] || defaultExplanations[0];
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
                      
                      {/* Key points section */}
                      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
                        <h3 className="font-semibold mb-2">Key Points to Remember:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Focus on central control in the opening phase</li>
                          <li>Develop your pieces toward the center</li>
                          <li>Castle early to secure your king's safety</li>
                          <li>Watch for typical tactical motifs in this opening</li>
                        </ul>
                      </div>
                      
                      {/* Detailed explanation section */}
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <h3 className="font-semibold mb-3 flex items-center">
                          <Lightbulb size={18} className="mr-2 text-yellow-600" />
                          Detailed Explanation
                        </h3>
                        <div 
                          className="text-sm prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: currentLesson.detailedExplanation }}
                        />
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
