
import React from 'react';
import { ChevronRight } from 'lucide-react';

const learningPaths = {
  beginner: [
    {
      level: "Beginner",
      icon: "♙", // Pawn
      description: "Master the basics of chess including rules, piece movement, and fundamental tactics.",
      topics: [
        "Basic Rules & Setup", 
        "Piece Movement", 
        "Simple Tactics", 
        "Basic Checkmates",
        "Fundamental Principles",
        "Chess Notation",
        "Basic Openings",
        "Elementary Endgames",
        "Common Patterns",
        "Beginner Puzzles"
      ]
    },
    {
      level: "Beginner+",
      icon: "♙", // Pawn
      description: "Strengthen your chess fundamentals and start developing consistent strategic thinking.",
      topics: [
        "Opening Principles", 
        "Tactical Motifs", 
        "Elementary Strategies", 
        "Basic Pawn Structures",
        "King Safety",
        "Piece Coordination",
        "Simple Pin Tactics",
        "Discovered Attacks",
        "Knight Forks",
        "Double Attacks"
      ]
    },
    {
      level: "Beginner Advanced",
      icon: "♙", // Pawn
      description: "Bridge the gap between beginner and intermediate play with more complex concepts.",
      topics: [
        "Pawn Play", 
        "Knight Outposts", 
        "Square Control", 
        "Bishop Pairs",
        "Rook Placement",
        "Attacking with Pawns",
        "Defensive Techniques",
        "Exchange Sacrifices",
        "Basic Combinations",
        "Analyzing Games"
      ]
    },
    {
      level: "Initiative",
      icon: "♟", // Black Pawn
      description: "Learn to seize and maintain the initiative in your games with purposeful play.",
      topics: [
        "Tempo Moves", 
        "Development Speed", 
        "Center Control", 
        "Piece Activity",
        "Pawn Breaks",
        "Space Advantage",
        "Active Defense",
        "Counter-play",
        "Prophylaxis Basics",
        "Attack Preparation"
      ]
    },
    {
      level: "Pattern Recognition",
      icon: "♟", // Black Pawn
      description: "Develop your ability to spot recurring tactical and strategic patterns.",
      topics: [
        "Common Tactical Motifs", 
        "Checkmate Patterns", 
        "Key Endgame Positions", 
        "Opening Traps",
        "Tactical Combinations",
        "Back Rank Weakness",
        "Knight Fork Patterns",
        "Skewer Motifs",
        "Decoy Patterns",
        "Clearance Sacrifices"
      ]
    },
    {
      level: "Basic Endgames",
      icon: "♟", // Black Pawn
      description: "Master essential endgame techniques and positions that frequently occur.",
      topics: [
        "King and Pawn", 
        "Rook Endgames", 
        "Opposition", 
        "Square Rule",
        "Triangulation",
        "Zugzwang",
        "Rook vs. Pawn",
        "Drawing Techniques",
        "Key Squares",
        "Pawn Promotion"
      ]
    },
    {
      level: "Opening Repertoire",
      icon: "♟", // Black Pawn
      description: "Build your first coherent opening repertoire for both White and Black.",
      topics: [
        "First White Repertoire", 
        "First Black Repertoire", 
        "Opening Traps", 
        "Move Order Tricks",
        "Main Line Awareness",
        "Transposition Options",
        "Simple Gambits",
        "Line Memorization",
        "Common Mistakes",
        "Response to Sidelines"
      ]
    },
    {
      level: "Calculation Basics",
      icon: "♟", // Black Pawn
      description: "Develop your calculation abilities with progressive exercises.",
      topics: [
        "One-Move Tactics", 
        "Two-Move Combinations", 
        "Simple Exchanges", 
        "Material Counting",
        "Move Candidates",
        "Elimination Method",
        "Forcing Moves",
        "Capture Sequences",
        "Check Sequences",
        "Threat Evaluation"
      ]
    },
    {
      level: "Strategic Basics",
      icon: "♟", // Black Pawn
      description: "Understand the fundamental strategic concepts that guide chess planning.",
      topics: [
        "Pawn Structure", 
        "Weak Squares", 
        "Piece Placement", 
        "Open Files",
        "Piece Coordination",
        "Knight Outposts",
        "Bishop vs Knight",
        "Central Control",
        "Space Advantage",
        "Active Pieces"
      ]
    },
    {
      level: "Tournament Preparation",
      icon: "♟", // Black Pawn
      description: "Prepare for your first chess tournaments and competitive play.",
      topics: [
        "Time Management", 
        "Tournament Rules", 
        "Game Recording", 
        "Pre-game Preparation",
        "Handling Pressure",
        "Opening Preparation",
        "Competitive Mindset",
        "Between-game Recovery",
        "Post-game Analysis",
        "Rating Systems"
      ]
    }
  ],
  intermediate: [
    {
      level: "Intermediate",
      icon: "♘", // Knight
      description: "Develop advanced positional understanding and strategic concepts to improve your game.",
      topics: [
        "Opening Theory", 
        "Tactical Patterns", 
        "Endgame Fundamentals", 
        "Positional Play",
        "Pawn Structure Analysis",
        "Bishop vs Knight",
        "Strategic Planning",
        "Space Advantage",
        "Piece Activity",
        "Prophylaxis"
      ]
    },
    {
      level: "Intermediate+",
      icon: "♘", // Knight
      description: "Refine your middlegame understanding and improve your calculation abilities.",
      topics: [
        "Advanced Tactics", 
        "Strategic Patterns", 
        "Middlegame Plans", 
        "Complex Pawn Structures",
        "Piece Coordination",
        "Exchange Sacrifices",
        "Counterplay Techniques",
        "Dynamic Positions",
        "Calculation Practice",
        "Attacking Methods"
      ]
    },
    {
      level: "Positional Chess",
      icon: "♘", // Knight
      description: "Master the art of positional chess and long-term planning.",
      topics: [
        "Weak Squares", 
        "Pawn Weaknesses", 
        "Piece Placement", 
        "Strategic Exchanges",
        "Long-term Planning",
        "Prophylactic Thinking",
        "Pawn Majority",
        "Outposts",
        "Restraint Techniques",
        "Transformation of Advantages"
      ]
    },
    {
      level: "Attack & Defense",
      icon: "♞", // Black Knight
      description: "Study advanced attacking methods and defensive techniques.",
      topics: [
        "King Safety", 
        "Attacking Patterns", 
        "Defensive Resources", 
        "Sacrificial Attacks",
        "Counterattacking",
        "Defensive Positioning",
        "Prophylactic Moves",
        "Equal Position Defense",
        "Desperate Defense",
        "Converting Advantages"
      ]
    },
    {
      level: "Advanced Openings",
      icon: "♞", // Black Knight
      description: "Expand your opening knowledge with theoretical variations and key concepts.",
      topics: [
        "Opening Theory", 
        "Strategic Themes", 
        "Transpositions", 
        "Sidelines",
        "Critical Positions",
        "Move Order Subtleties",
        "Modern Variations",
        "Opening Preparation",
        "Anti-Computer Lines",
        "Novelties"
      ]
    },
    {
      level: "Advanced Endgames",
      icon: "♞", // Black Knight
      description: "Master complex endgame positions and technique.",
      topics: [
        "Rook Endgames", 
        "Minor Piece Endgames", 
        "Queen Endgames", 
        "Opposite Bishops",
        "Fortress Positions",
        "Zugzwang Applications",
        "Corresponding Squares",
        "Piece Domination",
        "Theoretical Positions",
        "Conversion Techniques"
      ]
    },
    {
      level: "Calculation",
      icon: "♞", // Black Knight
      description: "Improve your calculation depth and accuracy with progressive exercises.",
      topics: [
        "Visualization", 
        "Candidate Moves", 
        "Variation Analysis", 
        "Critical Positions",
        "Tree of Analysis",
        "Forcing Variations",
        "Position Evaluation",
        "Changing Focus",
        "Time Management",
        "Blunder Prevention"
      ]
    },
    {
      level: "Dynamic Play",
      icon: "♞", // Black Knight
      description: "Learn to handle complex, dynamic positions with changing pawn structures.",
      topics: [
        "Imbalanced Positions", 
        "Piece Sacrifices", 
        "Tactical Alertness", 
        "Structural Changes",
        "Initiative Maintenance",
        "Active Defense",
        "Transitional Moments",
        "Counter-sacrifices",
        "Resource Finding",
        "Critical Moments"
      ]
    },
    {
      level: "Tournament Strategy",
      icon: "♞", // Black Knight
      description: "Refine your approach to competitive chess with advanced preparation.",
      topics: [
        "Opening Preparation", 
        "Opponent Analysis", 
        "Tournament Psychology", 
        "Time Management",
        "Critical Game Moments",
        "Playing for Win/Draw",
        "Endgame Preparation",
        "Between-Round Recovery",
        "Practical Decision Making",
        "Tournament Endurance"
      ]
    },
    {
      level: "Game Analysis",
      icon: "♞", // Black Knight
      description: "Improve your analytical skills and learn to extract insights from your games.",
      topics: [
        "Self-Analysis Methods", 
        "Finding Mistakes", 
        "Evaluating Positions", 
        "Critical Moments",
        "Engine Analysis",
        "Pattern Recognition",
        "Improvement Planning",
        "Opening Repertoire Development",
        "Comparative Analysis",
        "Training Plans"
      ]
    }
  ],
  advanced: [
    {
      level: "Advanced",
      icon: "♕", // Queen
      description: "Refine your skills with complex strategies, deep calculation, and high-level concepts.",
      topics: [
        "Advanced Openings", 
        "Complex Middlegame", 
        "Endgame Mastery", 
        "Tournament Preparation",
        "Strategic Planning",
        "Deep Calculation",
        "Critical Positions",
        "Grandmaster Analysis",
        "Theoretical Battles",
        "Original Ideas"
      ]
    },
    {
      level: "Advanced+",
      icon: "♕", // Queen
      description: "Study high-level chess concepts and refine your understanding of complex positions.",
      topics: [
        "Supreme Positional Play", 
        "Critical Opening Theory", 
        "Dynamic Evaluation", 
        "Prophylactic Thinking",
        "Transformation of Advantages",
        "Intuitive Sacrifices",
        "Deep Calculation",
        "Risk Assessment",
        "Strategic Complexity",
        "Position Transformation"
      ]
    },
    {
      level: "Master Calculation",
      icon: "♕", // Queen
      description: "Reach master-level calculation abilities with advanced visualization and precision.",
      topics: [
        "Deep Calculation", 
        "Candidate Moves", 
        "Complex Combinations", 
        "Position Evaluation",
        "Abstract Thinking",
        "Non-standard Positions",
        "Visualization Exercises",
        "Critical Moment Analysis",
        "Alternative Moves",
        "Defensive Resources"
      ]
    },
    {
      level: "Opening Mastery",
      icon: "♛", // Black Queen
      description: "Develop a professional-level opening repertoire with deep preparation.",
      topics: [
        "Theoretical Novelties", 
        "Critical Variations", 
        "Repertoire Development", 
        "Anti-computer Lines",
        "Opening Philosophy",
        "Specialized Preparation",
        "Transposition Mastery",
        "Surprise Weapons",
        "Fashion Awareness",
        "Computer-assisted Analysis"
      ]
    },
    {
      level: "Positional Mastery",
      icon: "♛", // Black Queen
      description: "Achieve deep understanding of chess strategy and subtle positional nuances.",
      topics: [
        "Prophylactic Mastery", 
        "Deep Planning", 
        "Structural Evaluation", 
        "Piece Configuration",
        "Spatial Control",
        "Restriction Methods",
        "Structural Transformation",
        "Fine Techniques",
        "Intuitive Decisions",
        "Abstract Thinking"
      ]
    },
    {
      level: "Endgame Mastery",
      icon: "♛", // Black Queen
      description: "Perfect your endgame technique with theoretical positions and practical methods.",
      topics: [
        "Theoretical Endgames", 
        "Tablebases", 
        "Endgame Studies", 
        "Critical Positions",
        "Analytical Precision",
        "Conversion Technique",
        "Hidden Resources",
        "Unusual Material Balances",
        "Aesthetic Solutions",
        "Endgame Creativity"
      ]
    },
    {
      level: "Tournament Mastery",
      icon: "♛", // Black Queen
      description: "Perfect your competitive approach and tournament psychology.",
      topics: [
        "High-level Preparation", 
        "Mental Toughness", 
        "Energy Management", 
        "Decision Making",
        "Psychological Warfare",
        "Score Management",
        "Crisis Handling",
        "Peak Performance",
        "Pressure Situations",
        "Tournament Strategy"
      ]
    },
    {
      level: "Competitive Chess",
      icon: "♛", // Black Queen
      description: "Learn techniques specifically designed for competitive success.",
      topics: [
        "Competitive Mindset", 
        "Practical Choices", 
        "Opponent Preparation", 
        "Time Management",
        "Critical Moments",
        "Blunder Avoidance",
        "Playing Style Flexibility",
        "Match Strategy",
        "Competitive Psychology",
        "Performance Optimization"
      ]
    },
    {
      level: "Creative Chess",
      icon: "♛", // Black Queen
      description: "Develop your creative abilities and learn to innovate over the board.",
      topics: [
        "Chess Creativity", 
        "Original Play", 
        "Non-standard Ideas", 
        "Intuitive Decisions",
        "Conceptual Breakthroughs",
        "Innovative Sacrifices",
        "Positional Breakthroughs",
        "Style Development",
        "Abstract Thinking",
        "Inspiration and Execution"
      ]
    },
    {
      level: "Chess Analysis",
      icon: "♛", // Black Queen
      description: "Perfect your analytical skills and learn to produce high-level game analysis.",
      topics: [
        "Critical Thinking", 
        "Position Evaluation", 
        "Comprehensive Analysis", 
        "Error Detection",
        "Computer-assisted Analysis",
        "Pattern Classification",
        "Conceptual Understanding",
        "Objective Assessment",
        "Training Methodologies",
        "Long-term Improvement"
      ]
    }
  ]
};

const LearningPaths = () => {
  return (
    <div className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-chess-dark-maroon mb-4">
            Learning Paths
          </h2>
          <p className="text-chess-dark-blue max-w-2xl mx-auto">
            Our structured approach ensures consistent progress regardless of your starting point.
            Choose the path that matches your current skill level.
          </p>
        </div>
        
        <div className="space-y-12">
          {Object.entries(learningPaths).map(([category, paths]) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-chess-deep-red mb-6 text-center capitalize">{category} Level</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {paths.map((path, index) => (
                  <div 
                    key={index} 
                    className="border border-chess-muted-rose rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-chess-deep-red text-white p-6 text-center">
                      <span className="text-4xl block mb-2">{path.icon}</span>
                      <h3 className="text-xl font-bold truncate">{path.level}</h3>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-chess-dark-blue mb-6 text-sm h-24 overflow-y-auto">
                        {path.description}
                      </p>
                      
                      <div className="space-y-2 mb-6 h-48 overflow-y-auto">
                        {path.topics.map((topic, i) => (
                          <div key={i} className="flex items-center text-chess-dark-blue text-sm">
                            <ChevronRight className="w-4 h-4 text-chess-deep-red mr-1 flex-shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="chess-btn w-full text-sm">
                        Explore Path
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
