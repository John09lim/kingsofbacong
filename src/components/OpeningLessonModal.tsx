
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
  // Map specific discussions to specific opening + lesson combinations
  const specificDiscussions = {
    // Ruy Lopez specific discussions
    "Ruy Lopez": {
      1: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">RuyFan1972:</p>
          <p>I'm learning the Ruy Lopez basics. The Bishop to b5 move seems counterintuitive at first since it can be chased away with a6. What's the deeper idea here?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">ChessCoachElena:</p>
          <p>Great observation! The bishop retreat to a4 after a6 is actually part of the plan. It maintains pressure on the knight while preparing for a potential exchange that damages Black's structure.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">BeginnerPlayer:</p>
          <p>Should I always castle kingside early in the Ruy Lopez? Sometimes I feel like my king gets attacked there.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">IM_Rodriguez:</p>
          <p>Kingside castling is standard in the Ruy Lopez, but be aware of the potential for attacks. Focus on maintaining your center pawns as a shield and prepare defensive resources.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">HistoryBuff:</p>
          <p>The Ruy Lopez is named after a 16th-century Spanish priest! It's fascinating how an opening analyzed 500 years ago is still a cornerstone of modern chess.</p>
        </div>
      </div>
      `,
      2: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">StructuralAnalyst:</p>
          <p>In the Ruy Lopez Exchange variation, what's the best way to exploit Black's doubled c-pawns? I know it's a weakness but can't seem to make progress against it.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">GM_Insights:</p>
          <p>The doubled c-pawns are a long-term weakness. First establish a strong knight on d5, then create pressure with your rooks on the c-file. Patience is key - the advantage often manifests in the endgame.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">PawnStructureFan:</p>
          <p>What compensation does Black get for the damaged structure in the Exchange variation?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">ClubChampion:</p>
          <p>Black gets the bishop pair, which can be powerful in open positions. Also, the doubled c-pawns control important central squares like d4. Black's plan often involves ...c5 to undouble the pawns.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">KarpovStudent:</p>
          <p>Study Karpov's games in the Exchange Variation - he demonstrates the perfect strategic approach to grind down opponents with minimal risk.</p>
        </div>
      </div>
      `,
      3: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">BerlinWallFan:</p>
          <p>I've tried playing the Berlin Defense, but the resulting endgame-like positions are so difficult to navigate. Any practical advice for club players?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">EndgameSpecialist:</p>
          <p>For club players using the Berlin, focus on two key skills: activity of your remaining pieces and understanding which minor piece exchanges favor you. Practice endgames separately to build confidence.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">PatientDefender:</p>
          <p>Is the Berlin Defense too drawish for someone trying to win with Black?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">GM_Tactics:</p>
          <p>Not at all! While solid, the Berlin has plenty of winning chances for Black against unprepared opponents. The key is understanding the imbalances and knowing when to activate your pieces.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">KramnikFan:</p>
          <p>Kramnik's use of the Berlin against Kasparov in 2000 was revolutionary. He proved it could be a weapon, not just a drawing tool. That match changed opening theory forever!</p>
        </div>
      </div>
      `,
    },
    
    // Sicilian Defense specific discussions
    "Sicilian Defense": {
      1: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">AggressivePlayer:</p>
          <p>The Sicilian seems so complex compared to e5. Why should I spend time learning it as Black when I could play simpler openings?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">StatisticsMaster:</p>
          <p>Statistically, the Sicilian scores better for Black against 1.e4 than any other reply. It creates immediate imbalance and gives Black real winning chances, not just equality. Worth the investment!</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">ClubPlayer500:</p>
          <p>I keep getting crushed by the Grand Prix Attack against my Sicilian. Any advice?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">DefensiveExpert:</p>
          <p>Against the Grand Prix, don't rush to develop your knight to c6. Instead, play an early ...e6, followed by ...d5 at the right moment to counter White's kingside attack with central play.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">OpeningHistorian:</p>
          <p>The Sicilian gained massive popularity in the mid-20th century when players like Tal and Fischer demonstrated its dynamic potential. Before that, 1...e5 was considered almost mandatory!</p>
        </div>
      </div>
      `,
      2: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">NajdorfEnthusiast:</p>
          <p>In the Najdorf, I struggle with White's 6.Bg5 English Attack. The kingside assault always seems to overwhelm me. How should I defend?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">GM_Analyst:</p>
          <p>Defense in the English Attack requires precise timing. Black's key resources include the ...h6/...g5 advance to challenge the bishop, and counterplay on the queenside with ...b5 and ...b4. Study Kasparov's defensive techniques.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">PositionalPlayer:</p>
          <p>Is the Najdorf too risky for a player who prefers quiet positions?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">FM_Advisor:</p>
          <p>Consider the Scheveningen variation (1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e6) instead. It's more solid structurally while still maintaining the Sicilian's counterattacking potential.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">TalDisciple:</p>
          <p>Bobby Fischer's treatment of the Najdorf showed perfect balance between safety and aggression. His Game of the Century against Donald Byrne is essential study material!</p>
        </div>
      </div>
      `,
      3: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">DragonPlayer:</p>
          <p>In the Dragon variation, the Yugoslav Attack with 9.Bc4 always gives me trouble. Any defensive ideas against the h-file assault?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">DefenseMaster:</p>
          <p>Against the Yugoslav Attack, the h-pawn advance is critical. Consider ...h5 early to prevent White's h4-h5. Also, the timely ...Rh8 maneuver can be vital, bringing the rook to the h-file to counter White's pressure.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">CounterattackFan:</p>
          <p>What's more important in the Dragon - defending the kingside or pushing the queenside pawns?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">IM_Perspective:</p>
          <p>It's a delicate balance, but generally the kingside defense must come first. Once you've secured reasonable safety for your king, then accelerate your queenside counterplay with ...b5, ...a5 and ...b4.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">RiskTaker:</p>
          <p>The Dragon is called "Dragon" because the pawn structure resembles a dragon constellation, but I think it's also because of its fiery nature! Not for the faint-hearted.</p>
        </div>
      </div>
      `,
    },
    
    // Queen's Gambit specific discussions
    "Queen's Gambit": {
      1: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">SolidPlayer:</p>
          <p>The Queen's Gambit feels so different from e4 openings. I struggle with knowing when to make pawn breaks or exchanges in the center. Any guidelines?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">StrategicMaster:</p>
          <p>In the Queen's Gambit, central pawn breaks follow typical patterns: White often plays e4 at some point, while Black looks for ...c5 or ...e5. The timing depends on piece development - wait until your pieces support these advances.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">ClassicalFan:</p>
          <p>Should I always recapture the c4 pawn if Black takes it in the Queen's Gambit Accepted?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">GM_Calculator:</p>
          <p>Not immediately! White often delays the recapture to focus on development and central control with e4. The pawn is typically regained later with superior piece activity as compensation for the delay.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">ChessHistory101:</p>
          <p>Despite its name, the "Queen's Gambit" isn't a true gambit since Black struggles to hold onto the c4 pawn. The terminology dates back to the 19th century and has simply stuck.</p>
        </div>
      </div>
      `,
      2: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">AcceptedVariation:</p>
          <p>In the Queen's Gambit Accepted, I struggle with the early e4 push by White. It seems to give White a huge center and development advantage. How should Black respond?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">IM_Center:</p>
          <p>Against an early e4 in the QGA, Black should focus on undermining White's center with moves like ...e6 and ...c5. Don't rush to develop pieces - instead, target that center directly before White consolidates.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">ClubTournament:</p>
          <p>Is returning the pawn with ...c5 always Black's best approach in the QGA?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">GrandmasterCoach:</p>
          <p>Often yes, but not always immediately. Black sometimes plays ...Nc6 first to ensure better piece placement after the c-pawn is pushed. The timing is critical and depends on White's setup.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">KarpovianStyle:</p>
          <p>Karpov's handling of QGA positions demonstrates perfect timing. He knew exactly when to release central tension and when to maintain it. His games against Korchnoi in this variation are masterpieces.</p>
        </div>
      </div>
      `,
      3: `
      <div class="space-y-4">
        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">DeclinedPlayer:</p>
          <p>In the Queen's Gambit Declined, I always struggle with my light-squared bishop. It feels trapped behind the e6 pawn. Any advice on activating it?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">BishopMaster:</p>
          <p>The c8 bishop activation is one of the key challenges in the QGD. Common solutions include the ...b6 and ...Ba6 maneuver, or playing ...dxc4 followed by ...c5 and ...Bc8-b7. Sometimes it must be temporarily sacrificed with ...Bxh2+.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">ExchangeVariation:</p>
          <p>Is the exchange variation (1.d4 d5 2.c4 e6 3.cxd5 exd5) a serious attempt for White to play for an advantage?</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">FM_Symmetry:</p>
          <p>Absolutely! Though it looks symmetrical and drawish, White maintains subtle advantages including easier piece development and potential minority attack on the queenside. Carlsen has won beautiful games in this line.</p>
        </div>

        <div class="bg-gray-50 p-3 rounded-lg">
          <p class="font-semibold">CapablancaFan:</p>
          <p>José Raúl Capablanca's handling of QGD positions was elegant and instructive. His simple but precise approach demonstrates how to create winning chances in seemingly equal positions.</p>
        </div>
      </div>
      `,
    }
  };

  // Generic discussions organized by lesson number/topic (for openings without specific content)
  const genericLessonDiscussions = [
    // Lesson 1: Introduction/Basics
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessMaster92:</p>
        <p>I'm studying the ${openingName} for beginners, and I'm finding the initial move order quite intuitive. Anyone else start with this opening?</p>
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
    
    // Lesson 2: Pawn Structures
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
    
    // Lesson 3: Middlegame Strategies
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
    
    // Lesson 4: Endgame Principles
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
    
    // Lesson 5: Theory Development
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
    
    // Lesson 6: Sidelines and Alternatives
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
    
    // Lesson 7: Psychological Aspects
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
    
    // Lesson 8: Online/Blitz Chess
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
    
    // Lesson 9: Historical Perspective
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
        <p>The ${openingName} gained popularity after some famous historical games in the early 20th century. These classical interpretations still inform our understanding today.</p>
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
    
    // Lesson 10: Computer Analysis
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
    
    // Lesson 11: Advanced tactics
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TacticalGenius:</p>
        <p>The ${openingName} has some incredible tactical possibilities I've been exploring. The sacrifice on d5 followed by Nf5+ is particularly beautiful.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">CalculationStudent:</p>
        <p>How many moves ahead should I calculate in sharp positions from this opening? I get lost in variations beyond 4-5 moves.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Tactical:</p>
        <p>In tactical positions from the ${openingName}, focus on forcing moves first - checks, captures, and threats. This narrows your calculation tree considerably.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PuzzleSolver:</p>
        <p>I've created a collection of tactical puzzles from ${openingName} positions. Solving them regularly has improved my pattern recognition significantly.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">MemoTechniques:</p>
        <p>To remember tactical patterns in the ${openingName}, I name them after the player who first executed them or by a distinctive feature. Makes them easier to recall in games!</p>
      </div>
    </div>
    `,
    
    // Lesson 12: Professional Preparation
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
    
    // Lesson 13: Personal Style
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
    
    // Lesson 14: Practical Application
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PracticalApplication:</p>
        <p>I've started keeping a journal of my ${openingName} games, noting where I deviated from theory and the results. It's helping me build a personalized repertoire.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ClubImprovement:</p>
        <p>How do you suggest practicing this opening? Should I play training games focusing only on the opening phase, or complete games to understand resulting middlegames?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">FM_Practice:</p>
        <p>For mastering the ${openingName}, I recommend themed sparring matches where you play the same opening repeatedly against a practice partner, then analyze together.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">SelfAnalysis:</p>
        <p>I find my biggest improvements come from analyzing my own losses in this opening. The painful lessons somehow stick better than studying grandmaster games!</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TrainingRegimen:</p>
        <p>Set aside 20 minutes daily for focused ${openingName} study. Even this small amount, if consistent, will dramatically improve your understanding over a few months.</p>
      </div>
    </div>
    `,
    
    // Lesson 15: Learning from Masters
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">MasterGames:</p>
        <p>I've been studying how Carlsen handles the ${openingName}. His approach is so practical - sometimes diverging from theory early to get opponents into unfamiliar territory.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ClassicalStudent:</p>
        <p>Which world champion's games would you recommend studying for this opening? I've heard Botvinnik had a particularly instructive approach.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Historian:</p>
        <p>Each champion brings something unique to the ${openingName}. Kasparov demonstrated dynamic possibilities, Karpov showed positional mastery, and Carlsen reveals practical resilience.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">RecentTournament:</p>
        <p>Did anyone see the brilliant ${openingName} game from the Candidates Tournament last week? That exchange sacrifice on move 18 was incredible!</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">AnnotatedGames:</p>
        <p>The best way to learn from masters is to find deeply annotated games. Look for the reasoning behind moves, not just the moves themselves.</p>
      </div>
    </div>
    `,
    
    // Lesson 16: Common Mistakes
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">CommentMistakes:</p>
        <p>I keep making the same mistake in the ${openingName} - developing my queen too early and getting harassed by enemy minor pieces. How do I break this habit?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PatternRecognition:</p>
        <p>Create a personal "mistakes database" - every time you make an error, record it with the correct approach. Review before games to solidify the pattern recognition.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">IM_Advisor:</p>
        <p>The most common mistake in the ${openingName} is rushing developments without understanding why pieces go to certain squares. Take time to understand the purpose of each move.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">BeginnerQuestion:</p>
        <p>I always get the move order mixed up in this opening. Is there a logical progression I can follow to remember the correct sequence?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessMentor:</p>
        <p>For move order issues in the ${openingName}, focus on the purpose of each move rather than rote memorization. Understanding why moves are played in a specific order helps retention.</p>
      </div>
    </div>
    `,
    
    // Lesson 17: Variation Choices
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">VariationSelector:</p>
        <p>With so many variations in the ${openingName}, how do you choose which one to specialize in? I'm overwhelmed by options.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">OpeningExpert:</p>
        <p>Choose variations based on: 1) Your playing style (tactical/positional), 2) Your willingness to take risks, 3) The amount of theory you're willing to learn, and 4) The resulting middlegame types.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ClubChampion:</p>
        <p>I play three different variations of the ${openingName} based on who my opponent is and what I know about their style. Is this too complicated an approach?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Approach:</p>
        <p>Having multiple variations is actually great preparation! Just ensure you understand the ideas deeply rather than memorizing moves. Eventually, you'll develop a main line with situational alternatives.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">VariationMaster:</p>
        <p>Some variations of the ${openingName} are more universal and resilient to changes in theory. These make better long-term investments for your repertoire than currently trendy lines.</p>
      </div>
    </div>
    `,
    
    // Lesson 18: Training Methods
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TrainingMethods:</p>
        <p>What's the most effective training method for mastering the ${openingName}? I've been using spaced repetition with flashcards for key positions.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">ChessImprovement:</p>
        <p>For learning openings, I find the "Woodpecker Method" effective - repeatedly solving the same tactical puzzles from the opening until recognition becomes instant.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">IM_Training:</p>
        <p>For the ${openingName}, combine multiple methods: study master games, analyze with an engine, play practice games, and create position flashcards for typical middlegame plans.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">MemoryTechniques:</p>
        <p>I struggle to remember all the lines. Are there memory techniques specifically for chess openings?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">LearningScience:</p>
        <p>For memorizing ${openingName} variations, create a "memory palace" where you associate specific positions with locations in a familiar place. This spatial memory technique is powerful!</p>
      </div>
    </div>
    `,
    
    // Lesson 19: Opening Transitions
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">TransitionExpert:</p>
        <p>The ${openingName} can sometimes transpose into other openings if moves are played in a different order. How do you prepare for these possibilities?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">FlexiblePlayer:</p>
        <p>I was preparing for a ${openingName} but my opponent transposed into a completely different structure. I was lost by move 10! How to avoid this?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Transpositions:</p>
        <p>Understanding move order nuances is crucial. Study the most common transpositions from the ${openingName} and the key positions to recognize when you're entering a different opening family.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PatternStudy:</p>
        <p>I notice that regardless of transpositions, certain pawn structures keep appearing. Would focusing on these structures rather than move orders be more efficient?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">PrinciplesMaster:</p>
        <p>Absolutely! In the ${openingName}, understanding the core structural patterns and piece placements will serve you better than memorizing exact move orders when transpositions occur.</p>
      </div>
    </div>
    `,
    
    // Lesson 20: Advanced Training
    `
    <div class="space-y-4">
      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">AdvancedStudent:</p>
        <p>I've reached a plateau in my understanding of the ${openingName}. Beyond basic principles, what should I focus on to reach the next level?</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">GM_Mentor:</p>
        <p>At advanced levels, focus on three areas: 1) Precise move orders and their implications, 2) Deep understanding of resulting middlegame plans, and 3) Analyzing your own games to find improvement areas.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">CompetitivePlayer:</p>
        <p>How much does opening preparation matter as rating increases? I'm approaching 2000 and wondering if I need deeper ${openingName} knowledge.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">IM_Perspective:</p>
        <p>Opening knowledge becomes increasingly important above 2000, but the focus shifts from memorizing variations to understanding nuanced middlegame plans from each structure.</p>
      </div>

      <div class="bg-gray-50 p-3 rounded-lg">
        <p class="font-semibold">EliteTraining:</p>
        <p>For advanced ${openingName} training, analyze your own losses in this opening with and without an engine. First find your own improvements, then check what you missed. The gaps reveal your blind spots.</p>
      </div>
    </div>
    `,
  ];

  // First check if we have specific discussions for this opening and lesson
  if (specificDiscussions[openingName] && specificDiscussions[openingName][lessonNumber]) {
    return specificDiscussions[openingName][lessonNumber];
  }
  
  // If not, use generic discussions based on lesson number (with modulo to handle more lessons than we have templates)
  return genericLessonDiscussions[(lessonNumber - 1) % genericLessonDiscussions.length];
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

