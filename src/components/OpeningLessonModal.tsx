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
  detailedExplanation: string;
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
      detailedExplanation: generateDetailedExplanation(openingName, i),
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

// Generate discussion content based on opening name and lesson number
const generateDiscussionContent = (openingName: string, lessonNumber: number): string => {
  // Create an array of different discussions for each lesson number
  const lessonDiscussions = [
    // Lesson 1 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessMaster92:</p>
        <p>I've been studying the ${openingName} for beginners, and I'm finding the initial move order quite intuitive. Anyone else start with this opening?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">NewToChess:</p>
        <p>I struggle with remembering when to develop knights before bishops in this opening. Any memory tricks that helped you?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">Coach_David:</p>
        <p>For beginners learning the ${openingName}, focus on the principles: control the center, develop pieces, and castle early. Don't get lost in variations yet.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessEnthusiast:</p>
        <p>What's a common mistake to avoid in the first few moves of this opening? I tend to develop my queen too early.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GrandmasterFan:</p>
        <p>The history behind the ${openingName} is fascinating. It was popularized in the early 20th century and has evolved significantly since then!</p>
      </div>
    </div>
    `,
    
    // Lesson 2 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TacticalPlayer:</p>
        <p>The pawn structure in the ${openingName} creates interesting tactical opportunities around move 10-15. I've found success with the knight maneuver to e5.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PawnStructureStudent:</p>
        <p>When the central pawns get locked in this opening, where should I focus my attention? Kingside or queenside play?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">IM_Sarah:</p>
        <p>The pawn breaks in the ${openingName} are critical to understand. Timing the c5 or f5 break (depending on which side you're playing) often determines your success.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessStudent2023:</p>
        <p>I always get confused about which pawn structures lead to which middlegame plans. Is there a systematic approach to learning this?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PawnChain_Pro:</p>
        <p>Study Kramnik's games in the ${openingName} for perfect examples of how to handle the resulting pawn structures. His positional understanding was unmatched!</p>
      </div>
    </div>
    `,
    
    // Lesson 3 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">AttackingChess:</p>
        <p>The middlegame positions from the ${openingName} offer amazing attacking chances if you know the typical sacrifices. Anyone else love the bishop sacrifice on h7?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">DefensiveMinded:</p>
        <p>I struggle with defending against the typical kingside attack in this opening. Any advice on prophylactic moves I should consider?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Analyst:</p>
        <p>In the ${openingName}'s middlegame, piece coordination is more important than material. Sometimes sacrificing an exchange leads to the strongest attack.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PatientPlayer:</p>
        <p>How do you know when to pull the trigger on a tactical sequence vs. building up the position more? I often miscalculate and lose momentum.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessTimer:</p>
        <p>Time management in complex ${openingName} positions is crucial. I recommend practicing the common tactical motifs so you can spot them quickly in games.</p>
      </div>
    </div>
    `,
    
    // Lesson 4 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">EndgameMaster:</p>
        <p>The ${openingName} often leads to specific endgame types. I've been studying the rook endgames that arise when the queens get exchanged around move 20.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PawnRaceExpert:</p>
        <p>Does anyone have tips for handling the opposite-colored bishop endings from this opening? I find them much harder to win than they appear.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">FM_Endgames:</p>
        <p>When transitioning to the endgame in the ${openingName}, remember that the pawn structure often determines whether your bishop or knight is superior.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">RookLift:</p>
        <p>I've been losing endgames where I have a material advantage but can't break through. Any recommendations for technique improvement?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">KingActivity:</p>
        <p>The key to many ${openingName} endgames is early king activation. Don't wait until all pieces are off - start marching your king to the center around move 25-30.</p>
      </div>
    </div>
    `,
    
    // Lesson 5 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GrandMaster_Reviewer:</p>
        <p>Analyzing ${openingName} games from recent super tournaments reveals interesting new ideas. Carlsen's treatment of the position against Caruana last month was revolutionary.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TheoryBuff:</p>
        <p>How often should we revisit our opening preparation? I've been using the ${openingName} for years but wonder if my knowledge is outdated.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">IM_Theoretician:</p>
        <p>The theory in the ${openingName} is constantly evolving. What was considered refuted five years ago is now making a comeback with subtle improvements.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PracticalPlayer:</p>
        <p>How deep should club players study this opening? I feel overwhelmed by all the theory but don't want to be caught unprepared.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">EngineAnalyst:</p>
        <p>Modern engines have revealed surprising resources in positions from the ${openingName} that were previously considered lost. The defensive techniques are fascinating!</p>
      </div>
    </div>
    `,
    
    // Lesson 6 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">SideLine_Expert:</p>
        <p>I've been experimenting with the less common variations of the ${openingName} with surprising results. The sideline with an early h4 is particularly effective at the club level.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">RepertoireBuilder:</p>
        <p>How do you incorporate unusual lines into your repertoire without getting confused with move orders? I'm trying to add a few surprise weapons.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Alternative:</p>
        <p>Don't underestimate sidelines in the ${openingName}. Sometimes avoiding main lines where opponents are well-prepared can yield better practical results.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ClubPlayerPlus:</p>
        <p>I got destroyed by an unusual move order in this opening last week. How do you handle unexpected deviations without going wrong early?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">CreativeChesster:</p>
        <p>The most interesting games in the ${openingName} often come from early deviations around move 5-7. These positions are less explored and require original thinking.</p>
      </div>
    </div>
    `,
    
    // Lesson 7 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PsychologyOfChess:</p>
        <p>Playing the ${openingName} has psychological effects on opponents who aren't familiar with it. I've seen players consume too much time early trying to recall their preparation.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TournamentTactician:</p>
        <p>How do you mentally prepare for facing different responses to this opening? I get flustered when my opponent plays something I haven't studied.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">MentalCoach:</p>
        <p>The ${openingName} creates imbalanced positions where confidence in your calculation ability matters more than memorizing variations. Trust your skills!</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">RatedRising:</p>
        <p>I notice I play this opening better when I'm relaxed versus when I'm stressed about the outcome. Any mental techniques to stay calm in critical positions?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessMindset:</p>
        <p>The strategic complexity of the ${openingName} requires a clear mind. I recommend meditation before games where you expect to enter these complex positions.</p>
      </div>
    </div>
    `,
    
    // Lesson 8 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">OnlinePlayer:</p>
        <p>Playing the ${openingName} in online blitz is completely different from over-the-board tournaments. I've found simplifying variations work better in faster time controls.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TimeScramble:</p>
        <p>How do you handle time pressure in complex ${openingName} positions? I often find myself with less than 5 minutes after just 15 moves.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">IM_Online:</p>
        <p>For online play in the ${openingName}, having a clear understanding of the typical tactical patterns matters more than memorizing long variations.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">BlitzMaster:</p>
        <p>I perform much better in this opening when playing 5+3 versus 3+0. The increment makes a huge difference in handling critical positions.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PracticalTips:</p>
        <p>For playing the ${openingName} online, I recommend studying the common "mouse slip" positions. Know how to recover if you accidentally play e3 instead of e4!</p>
      </div>
    </div>
    `,
    
    // Lesson 9 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">HistoricalGames:</p>
        <p>The evolution of the ${openingName} through chess history is fascinating. Comparing how Morphy played it versus modern grandmasters shows how the understanding has deepened.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessBookworm:</p>
        <p>What are the best books specifically on this opening? I've read general opening books but want something more specialized.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Historian:</p>
        <p>The ${openingName} gained popularity after the famous game between Capablanca and Alekhine in 1927. Their treatment of the resulting middlegame set the standard for decades.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ResearchMinded:</p>
        <p>I'm working on a database of critical ${openingName} games throughout history. Any suggestions for particularly influential games I shouldn't miss?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessArchives:</p>
        <p>Studying how the ${openingName} was played in the pre-computer era versus today shows interesting differences in evaluation. What was once considered dubious is now mainline!</p>
      </div>
    </div>
    `,
    
    // Lesson 10 discussions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ComputerAnalysis:</p>
        <p>Engine evaluation of the ${openingName} has shifted dramatically in the last decade. Positions once considered slightly better for White are now seen as equal.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">NeuralNetFan:</p>
        <p>How has AlphaZero's approach to this opening changed our understanding? I've noticed more emphasis on long-term piece activity.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">IM_Technology:</p>
        <p>Modern neural network engines have revolutionized our understanding of the ${openingName}. What was considered a weakness (isolated d-pawn) is now seen as dynamic potential.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ClassicalPlayer:</p>
        <p>I find I learn more by analyzing these positions myself before checking the engine. How do you balance computer analysis with developing your own understanding?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">EngineSkeptic:</p>
        <p>Not everything in the ${openingName} is concrete calculation. The artistic and intuitive aspects of these positions can't be fully captured by engine evaluations.</p>
      </div>
    </div>
    `,
    
    // Lesson 11+ discussions - for openings with more lessons
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PersonalStyle:</p>
        <p>Adapting the ${openingName} to suit your personal style is essential. I've modified the standard approach to include more queenside play since I prefer that tension.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">StyleQuestion:</p>
        <p>I'm a very tactical player trying to incorporate this opening. Should I aim for the sharpest lines, or would learning the strategic aspects benefit my overall game more?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">Coach_Maria:</p>
        <p>The ${openingName} can be adapted to any style of play. The key is identifying the plans that resonate with your chess personality and developing expertise in those variations.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">VersatilePlayer:</p>
        <p>After studying this opening for months, I've found my results improved when I started focusing on understanding plans rather than memorizing moves. Anyone else?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">StrongPreference:</p>
        <p>Even at the highest levels, we see players bring their unique stamp to the ${openingName}. Study how different elite players handle the same position to expand your understanding.</p>
      </div>
    </div>
    `,
    
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">CompetitiveEdge:</p>
        <p>Preparing the ${openingName} for tournament play requires a systematic approach. I create a file for each major variation and update it after every game.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TournamentPrep:</p>
        <p>How do you prepare against specific opponents who play this opening? I struggle with adjusting my preparation based on my opponent's style.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Preparation:</p>
        <p>For tournament success with the ${openingName}, maintain a balance between surprise value and positions you understand well. Don't play lines just because they're theoretically good.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">WeekendWarrior:</p>
        <p>As an amateur with limited preparation time, should I focus on one specific line in this opening or have broader but shallower knowledge?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PragmaticApproach:</p>
        <p>Tournament success with the ${openingName} often comes down to preparation efficiency. Focus on the variations you're most likely to face at your level.</p>
      </div>
    </div>
    `,
  ];

  // Use modulo to cycle through the discussions if we have more lessons than discussions
  const discussionIndex = (lessonNumber - 1) % lessonDiscussions.length;
  return lessonDiscussions[discussionIndex];
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
