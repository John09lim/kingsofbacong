import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Target, 
  Crown, 
  Trophy, 
  ChevronRight, 
  Clock,
  Star,
  CheckCircle,
  PlayCircle,
  Brain,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';

const ChessImprovement = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const learningLevels = [
    {
      level: 'Beginner',
      title: 'Chess Fundamentals',
      description: 'Master the basics and build a solid foundation',
      icon: BookOpen,
      color: 'text-green-500',
      bgGradient: 'from-green-500/10 to-blue-500/10',
      modules: [
        {
          id: 'chess-fundamentals',
          title: 'Chess Fundamentals',
          subtitle: 'Learn the rules, piece movements, and basic concepts',
          duration: '2-3 weeks',
          difficulty: 'Beginner',
          progress: 0,
          content: {
            overview: 'Master the complete rules of chess, understand how each piece moves, and learn the fundamental concepts that govern the game.',
            topics: [
              'Complete rules and regulations of chess',
              'Piece movements and special moves (castling, en passant)',
              'Board setup and algebraic notation',
              'Piece values and material evaluation',
              'Basic checkmate patterns (Queen & King, Rook & King)',
              'Stalemate, draw conditions, and game endings',
              'Chess etiquette and tournament basics'
            ],
            practiceExercises: [
              'Piece movement drills',
              'Notation practice with sample games',
              'Basic checkmate puzzles',
              'Material counting exercises'
            ],
            commonMistakes: [
              'Forgetting special moves like castling and en passant',
              'Confusion between check and checkmate',
              'Not understanding stalemate conditions',
              'Improper piece development in opening'
            ],
            studyPlan: 'Spend 30-45 minutes daily practicing piece movements and basic tactics. Focus on one piece type per day initially, then combine movements.',
            resources: [
              'Interactive piece movement trainers',
              'Basic tactic puzzle collections',
              'Beginner-friendly chess books',
              'Video tutorials on rules and basics'
            ]
          }
        },
        {
          id: 'opening-principles',
          title: 'Opening Principles',
          subtitle: 'Develop your pieces effectively and control the center',
          duration: '3-4 weeks',
          difficulty: 'Beginner',
          progress: 0,
          content: {
            overview: 'Learn the fundamental principles that guide good opening play, focusing on development, center control, and king safety.',
            topics: [
              'The importance of center control (e4, d4, e5, d5)',
              'Piece development order and priorities',
              'King safety and when to castle',
              'Common opening traps and how to avoid them',
              'The concept of tempo and time in chess',
              'Pawn structure basics in the opening',
              'Coordination between pieces'
            ],
            practiceExercises: [
              'Opening principle violation spotting',
              'Quick development challenges',
              'Center control exercises',
              'Opening trap recognition puzzles'
            ],
            commonMistakes: [
              'Moving the same piece multiple times',
              'Neglecting king safety',
              'Ignoring opponent\'s threats',
              'Premature queen development',
              'Creating unnecessary pawn weaknesses'
            ],
            studyPlan: 'Play practice games focusing only on opening principles. Analyze your first 10-15 moves after each game.',
            resources: [
              'Opening principles video series',
              'Beginner opening repertoire guides',
              'Interactive opening trainers',
              'Famous games with excellent opening play'
            ]
          }
        },
        {
          id: 'essential-tactics',
          title: 'Essential Tactics',
          subtitle: 'Recognize and execute basic tactical patterns',
          duration: '4-6 weeks',
          difficulty: 'Beginner',
          progress: 0,
          content: {
            overview: 'Develop your tactical vision by learning to recognize and execute the most common tactical patterns in chess.',
            topics: [
              'Pin (absolute and relative pins)',
              'Fork (knight forks, pawn forks, queen forks)',
              'Skewer (absolute and relative skewers)',
              'Double attack and discovered attack',
              'Removal of defender and deflection',
              'Basic sacrifice concepts',
              'Tactical awareness and pattern recognition'
            ],
            practiceExercises: [
              'Daily tactical puzzle solving (10-15 puzzles)',
              'Pattern recognition drills',
              'Tactical theme-based exercises',
              'Blitz games with tactical focus'
            ],
            commonMistakes: [
              'Missing opponent\'s tactical threats',
              'Calculating too quickly without verification',
              'Focusing only on your own tactics',
              'Not considering all candidate moves'
            ],
            studyPlan: 'Solve 10-15 tactical puzzles daily, focusing on one tactical theme per week. Review and understand mistakes.',
            resources: [
              'Tactical puzzle websites and apps',
              'Pattern recognition books',
              'Tactical theme collections',
              'Video lessons on specific tactics'
            ]
          }
        },
        {
          id: 'basic-endgames',
          title: 'Basic Endgames',
          subtitle: 'Master essential endgame techniques and positions',
          duration: '3-4 weeks',
          difficulty: 'Beginner',
          progress: 0,
          content: {
            overview: 'Learn the most important basic endgames that every chess player must know to convert winning positions.',
            topics: [
              'King and Queen vs King checkmate',
              'King and Rook vs King checkmate',
              'King and pawn vs King (opposition)',
              'Basic pawn endgames and promotion',
              'Key squares and pawn races',
              'Elementary piece vs pawn endgames',
              'Stalemate tricks and drawing techniques'
            ],
            practiceExercises: [
              'Checkmate pattern practice',
              'Opposition exercises in pawn endgames',
              'Key square identification drills',
              'Endgame position setup and solving'
            ],
            commonMistakes: [
              'Not knowing basic checkmate patterns',
              'Stalemate blunders in winning positions',
              'Poor king activity in endgames',
              'Incorrect pawn promotion timing'
            ],
            studyPlan: 'Practice one endgame type daily. Set up positions and play them out multiple times until mastery.',
            resources: [
              'Endgame trainer apps',
              'Basic endgame books',
              'Video lessons on essential endgames',
              'Online endgame databases'
            ]
          }
        },
        {
          id: 'pattern-recognition',
          title: 'Pattern Recognition',
          subtitle: 'Develop your ability to spot recurring tactical and strategic patterns',
          duration: '4-5 weeks',
          difficulty: 'Beginner',
          progress: 0,
          content: {
            overview: 'Train your brain to quickly recognize common chess patterns, improving your speed and accuracy in games.',
            topics: [
              'Common checkmate patterns (back rank, smothered mate)',
              'Typical tactical motifs and their recognition',
              'Basic positional patterns (weak squares, pawn chains)',
              'Opening pattern recognition',
              'Endgame pattern identification',
              'Visual pattern training techniques',
              'Pattern-based decision making'
            ],
            practiceExercises: [
              'Flash card pattern recognition',
              'Timed pattern identification puzzles',
              'Pattern spotting in master games',
              'Memory training with chess positions'
            ],
            commonMistakes: [
              'Relying too heavily on calculation vs pattern recognition',
              'Not building a sufficient pattern database',
              'Ignoring opponent\'s pattern threats',
              'Overcomplicating simple pattern-based positions'
            ],
            studyPlan: 'Dedicate 20-30 minutes daily to pattern recognition exercises. Review patterns from your own games.',
            resources: [
              'Pattern recognition software',
              'Chess pattern books',
              'Visual training apps',
              'Master game collections organized by patterns'
            ]
          }
        }
      ]
    },
    {
      level: 'Intermediate',
      title: 'Strategic Development',
      description: 'Develop advanced understanding and tactical skills',
      icon: Target,
      color: 'text-orange-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      modules: [
        {
          id: 'positional-chess',
          title: 'Positional Chess',
          subtitle: 'Master the art of positional chess and long-term planning',
          duration: '6-8 weeks',
          difficulty: 'Intermediate',
          progress: 0,
          content: {
            overview: 'Understand the deeper strategic elements of chess positions and learn to formulate long-term plans.',
            topics: [
              'Pawn structure evaluation and planning',
              'Weak squares and how to exploit them',
              'Piece activity and coordination',
              'Space advantage and its utilization',
              'Prophylactic thinking and prevention',
              'Dynamic vs static advantages',
              'Positional sacrifices and exchanges'
            ],
            practiceExercises: [
              'Position evaluation exercises',
              'Plan formulation practice',
              'Weak square identification drills',
              'Prophylactic move finding'
            ],
            commonMistakes: [
              'Focusing only on tactics and ignoring position',
              'Making moves without a plan',
              'Not considering opponent\'s counterplay',
              'Underestimating static positional factors'
            ],
            studyPlan: 'Analyze master games focusing on positional decisions. Practice position evaluation before each move.',
            resources: [
              'Positional chess classics',
              'Master game databases',
              'Position evaluation courses',
              'Strategic planning videos'
            ]
          }
        },
        {
          id: 'advanced-tactics',
          title: 'Advanced Tactics',
          subtitle: 'Study complex tactical patterns and combinations',
          duration: '5-7 weeks',
          difficulty: 'Intermediate',
          progress: 0,
          content: {
            overview: 'Master complex tactical patterns and learn to calculate multi-move combinations with confidence.',
            topics: [
              'Complex combinations and sacrificial attacks',
              'Intermediate sacrifices (exchange, piece sacrifices)',
              'Tactical themes in specific pawn structures',
              'Defensive tactical resources',
              'Calculation techniques and candidate moves',
              'Tactical pattern combinations',
              'Time pressure tactical decisions'
            ],
            practiceExercises: [
              'Complex combination solving',
              'Calculation depth training',
              'Defensive tactic practice',
              'Pattern combination recognition'
            ],
            commonMistakes: [
              'Calculating too many variations without focus',
              'Missing defensive resources',
              'Overcomplicating simple tactical shots',
              'Poor candidate move selection'
            ],
            studyPlan: 'Solve increasingly complex tactical puzzles. Focus on calculation accuracy over speed initially.',
            resources: [
              'Advanced tactical puzzle collections',
              'Combination masterpieces',
              'Calculation training books',
              'Video analysis of complex tactics'
            ]
          }
        },
        {
          id: 'opening-theory',
          title: 'Opening Theory',
          subtitle: 'Expand your opening knowledge with theoretical variations',
          duration: '8-10 weeks',
          difficulty: 'Intermediate',
          progress: 0,
          content: {
            overview: 'Build a solid opening repertoire based on sound theoretical knowledge and understanding.',
            topics: [
              'Building a complete opening repertoire',
              'Understanding opening pawn structures',
              'Transposition possibilities and move orders',
              'Opening preparation methods',
              'Handling opening surprises and novelties',
              'Computer analysis in opening study',
              'Opening psychology and opponent preparation'
            ],
            practiceExercises: [
              'Repertoire building exercises',
              'Opening line memorization',
              'Transposition recognition drills',
              'Opening surprise handling practice'
            ],
            commonMistakes: [
              'Learning too many openings superficially',
              'Memorizing moves without understanding',
              'Neglecting typical middlegame plans',
              'Not updating repertoire regularly'
            ],
            studyPlan: 'Choose 1-2 openings as White and 2-3 defenses as Black. Study deeply rather than broadly.',
            resources: [
              'Opening databases and books',
              'Video opening courses',
              'Computer opening analysis',
              'Master games in your openings'
            ]
          }
        },
        {
          id: 'middlegame-strategy',
          title: 'Middlegame Strategy',
          subtitle: 'Understand complex middlegame structures and plans',
          duration: '6-8 weeks',
          difficulty: 'Intermediate',
          progress: 0,
          content: {
            overview: 'Navigate complex middlegame positions with strategic understanding and concrete planning.',
            topics: [
              'Typical middlegame pawn structures',
              'Piece coordination and harmony',
              'Attack and defense balance',
              'Transition from opening to middlegame',
              'Strategic pawn breaks and timing',
              'Piece exchanges and their evaluation',
              'Initiative and momentum in middlegames'
            ],
            practiceExercises: [
              'Middlegame position analysis',
              'Strategic plan formulation',
              'Pawn break timing exercises',
              'Piece coordination drills'
            ],
            commonMistakes: [
              'Aimless piece shuffling',
              'Poor timing of strategic breaks',
              'Ignoring opponent\'s counterplay',
              'Exchanging pieces without purpose'
            ],
            studyPlan: 'Study typical middlegame structures arising from your openings. Analyze complete games with focus on middlegame plans.',
            resources: [
              'Middlegame strategy books',
              'Pawn structure guides',
              'Master game collections',
              'Strategic planning courses'
            ]
          }
        },
        {
          id: 'advanced-endgames',
          title: 'Advanced Endgames',
          subtitle: 'Master complex endgame positions and techniques',
          duration: '7-9 weeks',
          difficulty: 'Intermediate',
          progress: 0,
          content: {
            overview: 'Study theoretical endgames and practical endgame techniques essential for competitive play.',
            topics: [
              'Rook endgames (Lucena, Philidor positions)',
              'Minor piece endgames (Bishop vs Knight)',
              'Complex pawn endgames and breakthroughs',
              'Practical endgame technique',
              'Endgame studies and compositions',
              'Time trouble endgame decisions',
              'Endgame psychological factors'
            ],
            practiceExercises: [
              'Theoretical position practice',
              'Endgame study solving',
              'Practical endgame play',
              'Technique improvement drills'
            ],
            commonMistakes: [
              'Not knowing key theoretical positions',
              'Poor technique in winning endgames',
              'Panic in difficult defensive endgames',
              'Time management issues in endgames'
            ],
            studyPlan: 'Master one endgame type per week. Practice both theoretical and practical aspects.',
            resources: [
              'Endgame theory books',
              'Endgame databases',
              'Video endgame lessons',
              'Endgame study collections'
            ]
          }
        }
      ]
    },
    {
      level: 'Advanced',
      title: 'Mastery Path',
      description: 'Achieve professional-level understanding and skills',
      icon: Crown,
      color: 'text-purple-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      modules: [
        {
          id: 'master-calculation',
          title: 'Master Calculation',
          subtitle: 'Develop professional-level calculation abilities',
          duration: '10-12 weeks',
          difficulty: 'Advanced',
          progress: 0,
          content: {
            overview: 'Master the art of deep, accurate calculation and develop the mental tools used by chess masters.',
            topics: [
              'Systematic calculation methods',
              'Candidate move selection criteria',
              'Visualization and board vision training',
              'Error checking and verification techniques',
              'Calculation under time pressure',
              'Pattern-based calculation shortcuts',
              'Mental endurance and concentration'
            ],
            practiceExercises: [
              'Deep calculation challenges',
              'Blind calculation training',
              'Candidate move analysis',
              'Calculation verification drills'
            ],
            commonMistakes: [
              'Calculating random variations',
              'Poor candidate move selection',
              'Mental fatigue affecting accuracy',
              'Not double-checking critical variations'
            ],
            studyPlan: 'Daily calculation exercises increasing in complexity. Focus on accuracy before speed.',
            resources: [
              'Calculation training books',
              'Mental training apps',
              'Master game analysis',
              'Calculation methodology courses'
            ]
          }
        },
        {
          id: 'opening-mastery',
          title: 'Opening Mastery',
          subtitle: 'Create a professional-level opening repertoire',
          duration: '12-16 weeks',
          difficulty: 'Advanced',
          progress: 0,
          content: {
            overview: 'Develop a comprehensive, theoretically sound opening repertoire suitable for competitive play.',
            topics: [
              'Professional repertoire construction',
              'Deep theoretical preparation',
              'Novelty preparation and analysis',
              'Computer-assisted opening study',
              'Opening psychology and bluffing',
              'Repertoire maintenance and updates',
              'Anti-computer opening strategies'
            ],
            practiceExercises: [
              'Repertoire gap analysis',
              'Novelty finding exercises',
              'Opening preparation against specific opponents',
              'Computer analysis verification'
            ],
            commonMistakes: [
              'Superficial theoretical knowledge',
              'Ignoring opponent-specific preparation',
              'Not updating repertoire with new theory',
              'Over-reliance on computer evaluation'
            ],
            studyPlan: 'Dedicate significant time to repertoire building and maintenance. Stay current with theoretical developments.',
            resources: [
              'Professional opening databases',
              'Theoretical journals and publications',
              'Master-level opening courses',
              'Computer engines and analysis tools'
            ]
          }
        },
        {
          id: 'positional-mastery',
          title: 'Positional Mastery',
          subtitle: 'Achieve deep understanding of chess strategy',
          duration: '10-14 weeks',
          difficulty: 'Advanced',
          progress: 0,
          content: {
            overview: 'Develop intuitive positional understanding and master the subtle strategic elements of chess.',
            topics: [
              'Advanced positional concepts',
              'Intuitive position evaluation',
              'Strategic planning across multiple phases',
              'Advanced pawn structure understanding',
              'Piece coordination at master level',
              'Positional sacrifices and compensation',
              'Strategic pattern recognition'
            ],
            practiceExercises: [
              'Complex position evaluation',
              'Strategic plan comparison',
              'Positional pattern recognition',
              'Master game recreation'
            ],
            commonMistakes: [
              'Over-analyzing simple positions',
              'Missing subtle positional factors',
              'Poor strategic planning',
              'Inadequate pattern database'
            ],
            studyPlan: 'Study master games with deep positional content. Practice position evaluation without engines.',
            resources: [
              'Classical positional masterpieces',
              'Strategic pattern collections',
              'Master-level position analysis',
              'Strategic planning methodologies'
            ]
          }
        },
        {
          id: 'endgame-mastery',
          title: 'Endgame Mastery',
          subtitle: 'Perfect your endgame technique with theoretical positions',
          duration: '8-12 weeks',
          difficulty: 'Advanced',
          progress: 0,
          content: {
            overview: 'Master theoretical endgames and develop flawless endgame technique for competitive play.',
            topics: [
              'Complete theoretical endgame knowledge',
              'Endgame studies and compositions',
              'Practical endgame psychology',
              'Tablebase understanding and usage',
              'Endgame pattern recognition',
              'Time management in endgames',
              'Endgame preparation and study methods'
            ],
            practiceExercises: [
              'Theoretical position mastery',
              'Endgame study solving',
              'Practical technique training',
              'Tablebase position analysis'
            ],
            commonMistakes: [
              'Incomplete theoretical knowledge',
              'Poor practical technique',
              'Time trouble in endgames',
              'Overconfidence in "simple" positions'
            ],
            studyPlan: 'Systematically master all important theoretical endgames. Practice with tablebases for verification.',
            resources: [
              'Comprehensive endgame manuals',
              'Endgame study collections',
              'Tablebase training tools',
              'Master endgame technique videos'
            ]
          }
        },
        {
          id: 'tournament-mastery',
          title: 'Tournament Mastery',
          subtitle: 'Perfect your competitive approach and psychology',
          duration: '6-8 weeks',
          difficulty: 'Advanced',
          progress: 0,
          content: {
            overview: 'Develop the mental skills, preparation methods, and competitive approach needed for tournament success.',
            topics: [
              'Tournament preparation methodology',
              'Opponent research and preparation',
              'Time management strategies',
              'Handling pressure and nerves',
              'Mental resilience and comeback ability',
              'Post-game analysis techniques',
              'Physical and mental conditioning'
            ],
            practiceExercises: [
              'Tournament simulation',
              'Pressure situation training',
              'Time management practice',
              'Mental resilience building'
            ],
            commonMistakes: [
              'Inadequate tournament preparation',
              'Poor time management',
              'Mental breakdown under pressure',
              'Neglecting physical conditioning'
            ],
            studyPlan: 'Participate in regular tournament play. Develop pre-game routines and post-game analysis habits.',
            resources: [
              'Sports psychology books',
              'Tournament preparation guides',
              'Mental training techniques',
              'Professional coaching resources'
            ]
          }
        }
      ]
    }
  ];

  const handleModuleExpand = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="chess-gradient text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Your Chess Improvement Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-chess-light-pink max-w-4xl mx-auto animate-fade-in">
              Follow our systematic approach to chess mastery. From fundamentals to advanced techniques, 
              each module builds upon the last to create a comprehensive learning experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/tactics">
                <Button className="chess-btn bg-white text-chess-deep-red hover:bg-chess-light-pink">
                  <PlayCircle className="mr-2" />
                  Start with Tactics
                </Button>
              </Link>
              <Link to="/training">
                <Button className="chess-btn-outline border-white text-white hover:bg-white hover:text-chess-deep-red">
                  <BookOpen className="mr-2" />
                  Browse Training
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Learning Path Overview */}
        <div className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Structured Learning Paths
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive curriculum is designed to take you from beginner to advanced player 
                through carefully structured modules that build upon each other.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {learningLevels.map((level) => {
                const IconComponent = level.icon;
                return (
                  <Card key={level.level} className={`relative overflow-hidden bg-gradient-to-br ${level.bgGradient} border-2 hover:border-chess-deep-red/50 transition-all duration-300`}>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-full bg-background/80 ${level.color}`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold">{level.title}</CardTitle>
                      <CardDescription className="text-base">
                        {level.description}
                      </CardDescription>
                      <Badge variant="outline" className="mx-auto">
                        {level.modules.length} Modules
                      </Badge>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Detailed Module Sections */}
            {learningLevels.map((level) => {
              const IconComponent = level.icon;
              return (
                <div key={level.level} className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-full bg-background border-2 ${level.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">{level.level} Level</h3>
                      <p className="text-muted-foreground">{level.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {level.modules.map((module, index) => (
                      <Card key={module.id} className="overflow-hidden border-2 hover:border-chess-deep-red/30 transition-all duration-300">
                        <CardHeader 
                          className="cursor-pointer hover:bg-accent/50 transition-colors"
                          onClick={() => handleModuleExpand(module.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  Module {index + 1}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {module.duration}
                                </Badge>
                                <Badge variant={module.difficulty === 'Beginner' ? 'default' : module.difficulty === 'Intermediate' ? 'secondary' : 'destructive'} className="text-xs">
                                  {module.difficulty}
                                </Badge>
                              </div>
                              <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                              <CardDescription className="text-base">
                                {module.subtitle}
                              </CardDescription>
                              {module.progress > 0 && (
                                <div className="flex items-center gap-2 mt-3">
                                  <Progress value={module.progress} className="flex-1" />
                                  <span className="text-sm text-muted-foreground">{module.progress}%</span>
                                </div>
                              )}
                            </div>
                            <ChevronRight className={`h-5 w-5 transition-transform ${expandedModule === module.id ? 'transform rotate-90' : ''}`} />
                          </div>
                        </CardHeader>

                        {expandedModule === module.id && (
                          <CardContent className="border-t bg-accent/20">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Brain className="h-4 w-4 text-blue-500" />
                                  Overview
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  {module.content.overview}
                                </p>

                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Target className="h-4 w-4 text-green-500" />
                                  Key Topics
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                                  {module.content.topics.map((topic, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckCircle className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>

                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Zap className="h-4 w-4 text-orange-500" />
                                  Practice Exercises
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {module.content.practiceExercises.map((exercise, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <Star className="h-3 w-3 mt-0.5 text-orange-500 flex-shrink-0" />
                                      {exercise}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Trophy className="h-4 w-4 text-red-500" />
                                  Common Mistakes
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                                  {module.content.commonMistakes.map((mistake, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="h-3 w-3 mt-0.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                      {mistake}
                                    </li>
                                  ))}
                                </ul>

                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-purple-500" />
                                  Study Plan
                                </h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                  {module.content.studyPlan}
                                </p>

                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Award className="h-4 w-4 text-blue-500" />
                                  Resources
                                </h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {module.content.resources.map((resource, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <BookOpen className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                                      {resource}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t flex gap-3">
                              <Link to="/tactics" className="flex-1">
                                <Button className="w-full chess">
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Start Practice
                                </Button>
                              </Link>
                              <Link to="/training" className="flex-1">
                                <Button variant="outline" className="w-full">
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  View Lessons
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="chess-gradient text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl mb-8 text-chess-light-pink max-w-2xl mx-auto">
              Start with any module that matches your current level, or begin with our tactical training to build pattern recognition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tactics">
                <Button className="chess-btn bg-white text-chess-deep-red hover:bg-chess-light-pink">
                  <Target className="mr-2" />
                  Start Tactical Training
                </Button>
              </Link>
              <Link to="/community">
                <Button className="chess-btn-outline border-white text-white hover:bg-white hover:text-chess-deep-red">
                  <Trophy className="mr-2" />
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChessImprovement;