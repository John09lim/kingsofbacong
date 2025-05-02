
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
  url: string;
  thumbnail?: string;
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
  // Collection of videos for different openings
  const videosByOpening: Record<string, OpeningVideo[]> = {
    "Ruy Lopez": [
      {
        id: "1",
        title: "Ruy Lopez Chess Opening Explained in 10 Minutes [TRAPS Included]",
        url: "https://www.youtube.com/watch?v=xD0iTgHMQVQ",
        difficulty: "Beginner",
        description: "GM Igor Smirnov provides a concise overview of the Ruy Lopez, including common traps."
      },
      {
        id: "2",
        title: "Chess Openings: Ruy Lopez | Ideas, Theory, and Attacking Plans",
        url: "https://www.youtube.com/watch?v=IQrtrPvU3bQ",
        difficulty: "Beginner",
        description: "An in-depth look at the Ruy Lopez's key ideas and strategies."
      },
      {
        id: "3",
        title: "Ruy Lopez Opening Explained: Key Strategies & Moves",
        url: "https://www.youtube.com/watch?v=fm4YVM2K6Hk",
        difficulty: "Beginner",
        description: "A detailed explanation of the Ruy Lopez opening's main strategies."
      },
      {
        id: "4",
        title: "Learn the Ruy Lopez and Relax Chess Opening Tutorial ASMR",
        url: "https://www.youtube.com/watch?v=5N2IX72pYPs",
        difficulty: "Beginner",
        description: "A beginner-friendly tutorial presented in a relaxing ASMR format."
      },
      {
        id: "5",
        title: "The Ruy Lopez Opening Chess Move",
        url: "https://www.youtube.com/watch?v=fcne7r5bAIc",
        difficulty: "Beginner",
        description: "A quick demonstration of the Ruy Lopez opening move."
      },
      {
        id: "6",
        title: "Chess Openings: Ruy Lopez • Free Chess Videos",
        url: "https://www.youtube.com/watch?v=w5w1f7U4qV8",
        difficulty: "Beginner",
        description: "An introductory video covering common themes in the Ruy Lopez."
      },
      {
        id: "7",
        title: "Ruy Lopez Chess Opening TRAP",
        url: "https://www.youtube.com/watch?v=OognTEQttvM",
        difficulty: "Intermediate",
        description: "Learn a specific trap within the Ruy Lopez to catch your opponents off guard."
      },
      {
        id: "8",
        title: "Ruy Lopez Opening Theory",
        url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcC8gwt8Q-dIJ_bBKihu8sT7",
        difficulty: "Intermediate",
        description: "A comprehensive playlist covering various aspects of the Ruy Lopez."
      },
      {
        id: "9",
        title: "Ruy Lopez - Ideas, Principles and Common Variations",
        url: "https://www.youtube.com/watch?v=41rPFNY_CAY",
        difficulty: "Intermediate",
        description: "Explores the fundamental ideas and common variations in the Ruy Lopez."
      },
      {
        id: "10",
        title: "Ruy Lopez - Berlin Defense",
        url: "https://www.youtube.com/watch?v=41rPFNY_CAY",
        difficulty: "Intermediate",
        description: "Focuses on the Berlin Defense variation within the Ruy Lopez."
      },
      {
        id: "11",
        title: "MAGNUS shows how to play the RUY LOPEZ opening",
        url: "https://www.youtube.com/watch?v=GN7lp9V0szA",
        difficulty: "Advanced",
        description: "World Champion Magnus Carlsen demonstrates his approach to the Ruy Lopez."
      },
      {
        id: "12",
        title: "Magnus Carlsen's favorite Opening: Ruy Lopez",
        url: "https://www.youtube.com/watch?v=csJKauwbYFk",
        difficulty: "Advanced",
        description: "An analysis of why the Ruy Lopez is favored by Magnus Carlsen."
      }
    ],
    "Sicilian Defense": [
      {
        id: "1",
        title: "Sicilian Defense for Beginners",
        url: "https://www.youtube.com/watch?v=s6dquU6SgRI",
        difficulty: "Beginner",
        description: "An introduction to the Sicilian Defense with clear explanations for new players."
      },
      {
        id: "2",
        title: "The Sicilian Defense – A Beginner's Guide",
        url: "https://www.youtube.com/watch?v=wcdVcz1N3TY",
        difficulty: "Beginner",
        description: "Learn the basic ideas of the Sicilian Defense in simple terms."
      },
      {
        id: "3",
        title: "Sicilian Defense Basic Guide",
        url: "https://www.youtube.com/watch?v=OCU8nZjmnIE",
        difficulty: "Beginner",
        description: "A step-by-step walkthrough of the Sicilian Defense for beginners."
      },
      {
        id: "4",
        title: "Sicilian Defense for Beginners: How to Play It",
        url: "https://www.youtube.com/watch?v=G4_4fNwbwYw",
        difficulty: "Beginner",
        description: "Learn the essential moves and ideas of the Sicilian Defense."
      },
      {
        id: "5",
        title: "Sicilian Defense Simplified for Beginners",
        url: "https://www.youtube.com/watch?v=RtqlGdD6s8g",
        difficulty: "Beginner",
        description: "A simple introduction to the Sicilian Defense opening."
      },
      {
        id: "6",
        title: "Sicilian Defense Intermediate Concepts",
        url: "https://www.youtube.com/watch?v=BNvdu_JI2gA",
        difficulty: "Intermediate",
        description: "A look at the main ideas and common traps for intermediate players."
      },
      {
        id: "7",
        title: "Mastering the Sicilian Defense – Intermediate Strategy",
        url: "https://www.youtube.com/watch?v=eMvknU35mYk",
        difficulty: "Intermediate",
        description: "Explains more advanced strategies within the Sicilian Defense."
      },
      {
        id: "8",
        title: "Sicilian Defense – Intermediate Opening Theory",
        url: "https://www.youtube.com/watch?v=2ZyMe9sFT6Q",
        difficulty: "Intermediate",
        description: "A deeper dive into the theory behind the Sicilian Defense."
      },
      {
        id: "9",
        title: "Sicilian Defense: Traps and Tactics for Intermediate Players",
        url: "https://www.youtube.com/watch?v=4n2z7YhA6B8",
        difficulty: "Intermediate",
        description: "Focuses on common traps and tactics to use in the Sicilian Defense."
      },
      {
        id: "10",
        title: "How to Attack Using the Sicilian Defense",
        url: "https://www.youtube.com/watch?v=Opjw3cjl7iY",
        difficulty: "Intermediate",
        description: "Intermediate guide to attacking with the Sicilian Defense."
      },
      {
        id: "11",
        title: "Advanced Sicilian Defense – Theory and Strategy",
        url: "https://www.youtube.com/watch?v=avX7_R9NkKo",
        difficulty: "Advanced",
        description: "A deep dive into high-level concepts and theory of the Sicilian Defense."
      },
      {
        id: "12",
        title: "Advanced Sicilian Defense by GM",
        url: "https://www.youtube.com/watch?v=2AKpEDNVgI0",
        difficulty: "Advanced",
        description: "Learn advanced strategies and tactics used by grandmasters in the Sicilian Defense."
      },
      {
        id: "13",
        title: "Sicilian Defense – Advanced Tactics and Traps",
        url: "https://www.youtube.com/watch?v=PLgHDJuykfs",
        difficulty: "Advanced",
        description: "Advanced analysis of traps in the Sicilian Defense to catch your opponent off guard."
      },
      {
        id: "14",
        title: "Sicilian Defense Masterclass by GM",
        url: "https://www.youtube.com/watch?v=7D1tsF4ALUk",
        difficulty: "Advanced",
        description: "In-depth masterclass for advanced players, taught by a Grandmaster."
      },
      {
        id: "15",
        title: "Top-Level Sicilian Defense: Grandmaster Analysis",
        url: "https://www.youtube.com/watch?v=nzBY5U-o4ws",
        difficulty: "Advanced",
        description: "A high-level analysis of the Sicilian Defense at the elite chess level."
      }
    ],
    "Queen's Gambit": [
      {
        id: "1",
        title: "Queen's Gambit - Beginner Tutorial",
        url: "https://www.youtube.com/watch?v=pXMG4KCXo94",
        difficulty: "Beginner",
        description: "A beginner-friendly introduction to the Queen's Gambit opening."
      },
      {
        id: "2",
        title: "Queen's Gambit Basic Principles",
        url: "https://www.youtube.com/watch?v=R7gs9qxBBew",
        difficulty: "Beginner",
        description: "Learn the core principles of the Queen's Gambit opening."
      },
      {
        id: "3",
        title: "Queen's Gambit Explained for Beginners",
        url: "https://www.youtube.com/watch?v=oRfGbul6MUs",
        difficulty: "Beginner",
        description: "A clear explanation of the Queen's Gambit for those new to chess."
      },
      {
        id: "4",
        title: "First Steps in the Queen's Gambit",
        url: "https://www.youtube.com/watch?v=mtsabsZ4wG4",
        difficulty: "Beginner",
        description: "Starting moves and ideas in the Queen's Gambit."
      },
      {
        id: "5",
        title: "Queen's Gambit Simplified Guide",
        url: "https://www.youtube.com/watch?v=HdHWAuQRG7E",
        difficulty: "Beginner",
        description: "A simplified approach to understanding the Queen's Gambit."
      },
      {
        id: "6",
        title: "Intermediate Queen's Gambit Strategies",
        url: "https://www.youtube.com/watch?v=tVsSmTj46b0",
        difficulty: "Intermediate",
        description: "More advanced strategic concepts in the Queen's Gambit."
      },
      {
        id: "7",
        title: "Queen's Gambit: Common Variations",
        url: "https://www.youtube.com/watch?v=lwPRqMI5YZI",
        difficulty: "Intermediate",
        description: "Exploring the main variations of the Queen's Gambit."
      },
      {
        id: "8",
        title: "Queen's Gambit Middlegame Plans",
        url: "https://www.youtube.com/watch?v=S2e_rZ4l6iM",
        difficulty: "Intermediate",
        description: "Strategic plans for the middlegame arising from the Queen's Gambit."
      },
      {
        id: "9",
        title: "Tactical Patterns in the Queen's Gambit",
        url: "https://www.youtube.com/watch?v=ETG8cCyvnAg",
        difficulty: "Intermediate",
        description: "Recognizing and executing tactical motifs in the Queen's Gambit."
      },
      {
        id: "10",
        title: "Countering the Queen's Gambit",
        url: "https://www.youtube.com/watch?v=mfLWVoXogKo",
        difficulty: "Intermediate",
        description: "How to effectively respond to and counter the Queen's Gambit."
      },
      {
        id: "11",
        title: "Advanced Queen's Gambit Theory",
        url: "https://www.youtube.com/watch?v=YvdcWpL_2gY",
        difficulty: "Advanced",
        description: "Deep theoretical analysis of the Queen's Gambit."
      },
      {
        id: "12",
        title: "Grandmaster Analysis: Queen's Gambit",
        url: "https://www.youtube.com/watch?v=KMavYyCS2uA",
        difficulty: "Advanced",
        description: "High-level analysis of famous games featuring the Queen's Gambit."
      },
      {
        id: "13",
        title: "Queen's Gambit: Modern Interpretation",
        url: "https://www.youtube.com/watch?v=7zfvDFGsRrw",
        difficulty: "Advanced",
        description: "Contemporary approaches to the Queen's Gambit at top levels."
      },
      {
        id: "14",
        title: "Queen's Gambit: Critical Positions",
        url: "https://www.youtube.com/watch?v=wMrOq3ZWHbg",
        difficulty: "Advanced",
        description: "Analysis of crucial positions that arise in the Queen's Gambit."
      },
      {
        id: "15",
        title: "Queen's Gambit: Positional Masterclass",
        url: "https://www.youtube.com/watch?v=zgDdEtXEtRE",
        difficulty: "Advanced",
        description: "Advanced positional concepts in the Queen's Gambit."
      }
    ],
    "French Defense": [
      {
        id: "1",
        title: "French Defense Basics for Beginners",
        url: "https://www.youtube.com/watch?v=5pec-u6PSvA",
        difficulty: "Beginner",
        description: "An introduction to the fundamental concepts of the French Defense."
      },
      {
        id: "2",
        title: "Learn the French Defense Opening",
        url: "https://www.youtube.com/watch?v=P8AuSvrVL3s",
        difficulty: "Beginner",
        description: "A beginner-friendly guide to playing the French Defense."
      },
      {
        id: "3",
        title: "French Defense - Simple Approach",
        url: "https://www.youtube.com/watch?v=HdHWAuQRG7E",
        difficulty: "Beginner",
        description: "A simplified explanation of the French Defense for new players."
      },
      {
        id: "4",
        title: "French Defense First Steps",
        url: "https://www.youtube.com/watch?v=gRUb6EeHKsM",
        difficulty: "Beginner",
        description: "Initial moves and ideas when playing the French Defense."
      },
      {
        id: "5",
        title: "French Defense for Club Players",
        url: "https://www.youtube.com/watch?v=vOw5BQYCfWA",
        difficulty: "Beginner",
        description: "Practical advice for playing the French Defense at the club level."
      },
      {
        id: "6",
        title: "Intermediate French Defense Strategies",
        url: "https://www.youtube.com/watch?v=gs1AFfmt3To",
        difficulty: "Intermediate",
        description: "More advanced strategic concepts in the French Defense."
      },
      {
        id: "7",
        title: "French Defense: Key Variations",
        url: "https://www.youtube.com/watch?v=wVFHiZzNzYM",
        difficulty: "Intermediate",
        description: "An exploration of the main variations in the French Defense."
      },
      {
        id: "8",
        title: "French Defense Advance Variation",
        url: "https://www.youtube.com/watch?v=jdWGkTSuqpA",
        difficulty: "Intermediate",
        description: "Detailed analysis of the Advance Variation in the French Defense."
      },
      {
        id: "9",
        title: "French Defense Tactical Motifs",
        url: "https://www.youtube.com/watch?v=ydg2SPxWnvE",
        difficulty: "Intermediate",
        description: "Common tactical patterns that arise in the French Defense."
      },
      {
        id: "10",
        title: "French Defense Middlegame Plans",
        url: "https://www.youtube.com/watch?v=HEvlWRVr1wM",
        difficulty: "Intermediate",
        description: "Strategic planning for the middlegame in the French Defense."
      },
      {
        id: "11",
        title: "Advanced French Defense Theory",
        url: "https://www.youtube.com/watch?v=ZfopZ77LJPE",
        difficulty: "Advanced",
        description: "Deep theoretical analysis of the French Defense."
      },
      {
        id: "12",
        title: "Grandmaster Secrets in the French Defense",
        url: "https://www.youtube.com/watch?v=dUsEnsLXGwc",
        difficulty: "Advanced",
        description: "High-level insights into playing the French Defense effectively."
      },
      {
        id: "13",
        title: "French Defense Critical Lines",
        url: "https://www.youtube.com/watch?v=192NboTurSI",
        difficulty: "Advanced",
        description: "Analysis of the most critical variations in the French Defense."
      },
      {
        id: "14",
        title: "French Defense Endgame Strategies",
        url: "https://www.youtube.com/watch?v=kJikzNw_5cE",
        difficulty: "Advanced",
        description: "Endgame principles specific to positions arising from the French Defense."
      },
      {
        id: "15",
        title: "French Defense Masters Analysis",
        url: "https://www.youtube.com/watch?v=gYKxwXsPN2Y",
        difficulty: "Advanced",
        description: "Study of games by masters who specialized in the French Defense."
      }
    ],
    "Caro-Kann Defense": [
      {
        id: "1",
        title: "Learn the Caro-Kann Defense | 10-Minute Chess Openings",
        url: "https://www.youtube.com/watch?v=rmbU97iftC8",
        difficulty: "Beginner",
        description: "A concise introduction to the Caro-Kann Defense, ideal for beginners."
      },
      {
        id: "2",
        title: "Learn the Caro-Kann Opening in 10 Minutes",
        url: "https://www.youtube.com/watch?v=RJQRCvSc1J0",
        difficulty: "Beginner",
        description: "A quick guide to understanding the basics of the Caro-Kann Defense."
      },
      {
        id: "3",
        title: "Learn The Caro-Kann Defense | 6-Minutes Chess Opening",
        url: "https://www.youtube.com/watch?v=hgXmJUOWh20",
        difficulty: "Beginner",
        description: "A brief overview of the Caro-Kann Defense, suitable for new players."
      },
      {
        id: "4",
        title: "Learn the Caro-Kann in 15 Minutes [Chess Openings Crash Course]",
        url: "https://www.youtube.com/watch?v=HvER2idtW6M",
        difficulty: "Beginner",
        description: "A crash course covering essential concepts of the Caro-Kann Defense."
      },
      {
        id: "5",
        title: "This makes Caro-Kann the best beginner opening",
        url: "https://www.youtube.com/watch?v=DdjIzdcxLgA",
        difficulty: "Beginner",
        description: "Explains why the Caro-Kann Defense is a solid choice for beginners."
      },
      {
        id: "6",
        title: "The only Caro-Kann guide you will ever need",
        url: "https://www.youtube.com/watch?v=8erPw1WADrQ",
        difficulty: "Intermediate",
        description: "An in-depth guide exploring various lines and strategies of the Caro-Kann Defense."
      },
      {
        id: "7",
        title: "DOMINATE as Black with the Caro-Kann",
        url: "https://www.youtube.com/watch?v=0p_881Nwoo4",
        difficulty: "Intermediate",
        description: "Strategies to control the game using the Caro-Kann Defense as Black."
      },
      {
        id: "8",
        title: "Caro-Kann: Advance Variation, Botvinnik-Carls Defense",
        url: "https://www.youtube.com/watch?v=ZWbIieNky0M",
        difficulty: "Intermediate",
        description: "Detailed analysis of the Advance Variation in the Caro-Kann Defense."
      },
      {
        id: "9",
        title: "Complete Guide Through Caro Kann for Black! Step by Step!!",
        url: "https://www.youtube.com/watch?v=HmZdEP3jYcg",
        difficulty: "Intermediate",
        description: "Step-by-step walkthrough of the Caro-Kann Defense from Black's perspective."
      },
      {
        id: "10",
        title: "Caro-Kann Defense - Advance Variation in Depth Chess Openings",
        url: "https://www.youtube.com/watch?v=m9uHKJ1WgbM",
        difficulty: "Intermediate",
        description: "Deep dive into the Advance Variation of the Caro-Kann Defense."
      },
      {
        id: "11",
        title: "How to CRUSH with the Caro-Kann!",
        url: "https://www.youtube.com/watch?v=ebfzL_GwiIE",
        difficulty: "Advanced",
        description: "Advanced tactics and strategies to dominate with the Caro-Kann Defense."
      },
      {
        id: "12",
        title: "OPENING FOR WHITE Against Caro-Kann Defense",
        url: "https://www.youtube.com/watch?v=B_7KoTYIw64",
        difficulty: "Advanced",
        description: "Explores White's strategies against the Caro-Kann Defense."
      },
      {
        id: "13",
        title: "Caro-Kann Opening Theory",
        url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcBZfLbeAU7d8llHf2jxBEl7",
        difficulty: "Advanced",
        description: "A playlist covering comprehensive theories of the Caro-Kann Defense."
      },
      {
        id: "14",
        title: "Caro-Kann Defense: Opening theory & strategy",
        url: "https://www.youtube.com/playlist?list=PLy7vABK_JsyN5YWC6AUavtKCTsvRizsra",
        difficulty: "Advanced",
        description: "A collection of videos delving into advanced strategies of the Caro-Kann Defense."
      },
      {
        id: "15",
        title: "The only Caro-Kann guide you will ever need (Advanced)",
        url: "https://www.youtube.com/watch?v=8erPw1WADrQ",
        difficulty: "Advanced",
        description: "A thorough guide revisiting complex lines and tactics in the Caro-Kann Defense."
      }
    ],
    "English Opening": [
      {
        id: "1",
        title: "How to Play the English Opening | 10-Minute Chess Openings",
        url: "https://www.youtube.com/watch?v=va0s92praEM",
        difficulty: "Beginner",
        description: "A concise introduction to the English Opening, ideal for beginners."
      },
      {
        id: "2",
        title: "Learn the English Opening in 15 Minutes [Complete Opening Guide]",
        url: "https://www.youtube.com/watch?v=eM6d2etuzZU",
        difficulty: "Beginner",
        description: "A comprehensive guide covering the basics of the English Opening."
      },
      {
        id: "3",
        title: "English Opening: Simple Setup & Quick Guide",
        url: "https://www.youtube.com/watch?v=ZD2-v3hh4mc",
        difficulty: "Beginner",
        description: "A quick-guide video presenting an easy setup similar to the London System."
      },
      {
        id: "4",
        title: "Chess Openings: Learn to Play the English Opening!",
        url: "https://www.youtube.com/watch?v=drIyCySRQYA",
        difficulty: "Beginner",
        description: "An accessible tutorial for those new to the English Opening."
      },
      {
        id: "5",
        title: "Introduction to the English Opening - Hanging Pawns",
        url: "https://www.youtube.com/watch?v=3aedSwUI9UU",
        difficulty: "Beginner",
        description: "Covers basic strategic ideas and common variations in the English Opening."
      },
      {
        id: "6",
        title: "The English Opening: Lecture by GM Ben Finegold",
        url: "https://www.youtube.com/watch?v=hEREhVUGw-c",
        difficulty: "Intermediate",
        description: "A detailed lecture exploring the nuances of the English Opening."
      },
      {
        id: "7",
        title: "Understanding the English Opening with GM Roman Dzindzi",
        url: "https://www.youtube.com/watch?v=IrtGEGhV52I",
        difficulty: "Intermediate",
        description: "A strategic guide to strengthen your opening repertoire."
      },
      {
        id: "8",
        title: "Play The English Opening! Chess Lesson #152",
        url: "https://www.youtube.com/watch?v=nLy9XN3cAPI",
        difficulty: "Intermediate",
        description: "A structured lesson focusing on key concepts of the English Opening."
      },
      {
        id: "9",
        title: "The Cheat Code Of Chess Openings | English Opening",
        url: "https://www.youtube.com/watch?v=6cXn4TpbbM4",
        difficulty: "Intermediate",
        description: "Presents advanced strategies in an accessible manner."
      },
      {
        id: "10",
        title: "English Opening: Complete Repertoire for White with IM David",
        url: "https://www.youtube.com/watch?v=Lg0JUrIOS5k",
        difficulty: "Intermediate",
        description: "Offers a complete repertoire for White using the English Opening."
      },
      {
        id: "11",
        title: "How to Beat the English Opening | 10-Minute Chess Openings",
        url: "https://www.youtube.com/watch?v=FF2M7uXhlnE",
        difficulty: "Advanced",
        description: "Strategies for countering the English Opening effectively."
      },
      {
        id: "12",
        title: "A SIMPLE System To Beat The English Opening",
        url: "https://www.youtube.com/watch?v=N74FM5kG-PA",
        difficulty: "Advanced",
        description: "Provides a straightforward system to challenge the English Opening."
      },
      {
        id: "13",
        title: "The Symmetrical English: 1.c4 c5 · English Opening Theory",
        url: "https://www.youtube.com/watch?v=xE0uUuAcMUg",
        difficulty: "Advanced",
        description: "A detailed guide to the Symmetrical English Opening, covering plans and variations."
      },
      {
        id: "14",
        title: "The English Opening - The BEST Opening For White",
        url: "https://www.youtube.com/watch?v=uKKuHxfmUgE",
        difficulty: "Advanced",
        description: "Explores why the English Opening is a strong choice for White."
      },
      {
        id: "15",
        title: "100% Perfect Opening Response to the English Opening",
        url: "https://www.youtube.com/watch?v=i9-aN-KMlDc",
        difficulty: "Advanced",
        description: "Discusses optimal responses to the English Opening from Black's perspective."
      }
    ],
    "Giuoco Piano": [
      {
        id: "1",
        title: "Giuoco Piano Opening Explained (Italian Game)",
        url: "https://www.youtube.com/watch?v=VyKsn3m4Uoc",
        difficulty: "Beginner",
        description: "A beginner-level introduction explaining key moves and concepts."
      },
      {
        id: "2",
        title: "Chess Openings: Giuoco Piano",
        url: "https://www.youtube.com/watch?v=6x2aKeFazIs",
        difficulty: "Beginner",
        description: "Covers the basics of this classical Italian Game variation."
      },
      {
        id: "3",
        title: "Learn Giuoco Piano - Chess Opening Ideas for Beginners",
        url: "https://www.youtube.com/watch?v=PyU3aWOmOEw",
        difficulty: "Beginner",
        description: "Simplifies the opening for those new to it."
      },
      {
        id: "4",
        title: "Chess Openings for Beginners: Giuoco Piano",
        url: "https://www.youtube.com/watch?v=q0T0rBzgaWg",
        difficulty: "Beginner",
        description: "A fundamental lesson for complete beginners."
      },
      {
        id: "5",
        title: "The Italian Game | Giuoco Piano | Opening Principles for White",
        url: "https://www.youtube.com/watch?v=hf8KPeU8qIo",
        difficulty: "Beginner",
        description: "Focuses on general principles with the Giuoco Piano structure."
      },
      {
        id: "6",
        title: "Giuoco Piano | Traps & Ideas",
        url: "https://www.youtube.com/watch?v=GUb_GvnEqbc",
        difficulty: "Intermediate",
        description: "Looks at common traps and intermediate-level concepts."
      },
      {
        id: "7",
        title: "Chess Openings: Giuoco Piano - Strategic Principles",
        url: "https://www.youtube.com/watch?v=QF5t0mDjZmw",
        difficulty: "Intermediate",
        description: "Breaks down strategy beyond basic moves."
      },
      {
        id: "8",
        title: "Italian Game: Giuoco Piano & Giuoco Pianissimo | Opening Theory",
        url: "https://www.youtube.com/watch?v=AvmMEtI3_HI",
        difficulty: "Intermediate",
        description: "Covers multiple branches including the quieter Pianissimo."
      },
      {
        id: "9",
        title: "How to Play Giuoco Piano with Confidence",
        url: "https://www.youtube.com/watch?v=35eGOSJuv0E",
        difficulty: "Intermediate",
        description: "Aimed at players ready to deepen their understanding."
      },
      {
        id: "10",
        title: "Chess Opening Strategy: Giuoco Piano Middlegame Ideas",
        url: "https://www.youtube.com/watch?v=wBGQ0PqFV2E",
        difficulty: "Intermediate",
        description: "Discusses transitions from opening to middlegame."
      },
      {
        id: "11",
        title: "Giuoco Piano - Advanced Theory & GM Ideas",
        url: "https://www.youtube.com/watch?v=RCm46PgAHB8",
        difficulty: "Advanced",
        description: "A high-level look at theory used by grandmasters."
      },
      {
        id: "12",
        title: "Theoretical Depth in the Giuoco Piano | ChessBase India",
        url: "https://www.youtube.com/watch?v=QQc-xuZpD7g",
        difficulty: "Advanced",
        description: "Explores deeply analyzed lines and novelties."
      },
      {
        id: "13",
        title: "Masterclass on Giuoco Piano (GM-level Analysis)",
        url: "https://www.youtube.com/watch?v=qZdV9H07jzY",
        difficulty: "Advanced",
        description: "Game analysis and prep ideas for tournament players."
      },
      {
        id: "14",
        title: "Attacking Chess: Giuoco Piano vs Modern Defenses",
        url: "https://www.youtube.com/watch?v=f8ArTKmqE1k",
        difficulty: "Advanced",
        description: "Discusses how to counter modern responses to the classical setup."
      },
      {
        id: "15",
        title: "High-Level Opening Prep: Giuoco Piano for White",
        url: "https://www.youtube.com/watch?v=BP4ttsl4eLQ",
        difficulty: "Advanced",
        description: "Explains how elite players prepare with this opening."
      }
    ],
    "Slav Defense": [
      {
        id: "1",
        title: "Slav Defense for Beginners",
        url: "https://www.youtube.com/watch?v=s5V6HciNGME",
        difficulty: "Beginner",
        description: "An introduction to the Slav Defense with clear explanations for new players."
      },
      {
        id: "2",
        title: "Slav Defense – Basic Concepts for Beginners",
        url: "https://www.youtube.com/watch?v=w7FOTbu3FhA",
        difficulty: "Beginner",
        description: "Explains the essential principles of the Slav Defense."
      },
      {
        id: "3",
        title: "Learn the Slav Defense in 5 Minutes",
        url: "https://www.youtube.com/watch?v=RhOQRo-_1T4",
        difficulty: "Beginner",
        description: "A quick beginner tutorial on how to play the Slav Defense."
      },
      {
        id: "4",
        title: "Slav Defense Explained in Detail for Beginners",
        url: "https://www.youtube.com/watch?v=Rwxz7F1okdQ",
        difficulty: "Beginner",
        description: "Detailed introduction to the Slav Defense opening."
      },
      {
        id: "5",
        title: "The Slav Defense: A Complete Beginner's Guide",
        url: "https://www.youtube.com/watch?v=7Hq3xUpAdk8",
        difficulty: "Beginner",
        description: "A basic walkthrough of the Slav Defense."
      },
      {
        id: "6",
        title: "Slav Defense Intermediate Strategy",
        url: "https://www.youtube.com/watch?v=7g0cYSNVm60",
        difficulty: "Intermediate",
        description: "An intermediate-level guide to playing the Slav Defense effectively."
      },
      {
        id: "7",
        title: "Advanced Tips on the Slav Defense",
        url: "https://www.youtube.com/watch?v=HRYy3tnsBIE",
        difficulty: "Intermediate",
        description: "Learn deeper ideas and strategies within the Slav Defense for more advanced play."
      },
      {
        id: "8",
        title: "Slav Defense with Traps and Tactics",
        url: "https://www.youtube.com/watch?v=BJ6cEDczmrA",
        difficulty: "Intermediate",
        description: "Intermediate-level exploration of traps and tactical ideas in the Slav Defense."
      },
      {
        id: "9",
        title: "Slav Defense Strategy: How to Play It Like a Pro",
        url: "https://www.youtube.com/watch?v=8c6Z9aEUnTg",
        difficulty: "Intermediate",
        description: "Strategies and ideas to improve your game using the Slav Defense."
      },
      {
        id: "10",
        title: "Counterplay in Slav Defense",
        url: "https://www.youtube.com/watch?v=-q4RI18RS-I",
        difficulty: "Intermediate",
        description: "Explains common counter strategies for playing against the Slav Defense."
      },
      {
        id: "11",
        title: "Advanced Slav Defense Theory",
        url: "https://www.youtube.com/watch?v=xVvhkgqciAc",
        difficulty: "Advanced",
        description: "In-depth exploration of high-level Slav Defense lines."
      },
      {
        id: "12",
        title: "GM Analysis: Slav Defense in Top-Level Play",
        url: "https://www.youtube.com/watch?v=g3xa4C2QAFI",
        difficulty: "Advanced",
        description: "Grandmaster-level analysis of the Slav Defense."
      },
      {
        id: "13",
        title: "Slav Defense: Advanced Traps and Attacking Ideas",
        url: "https://www.youtube.com/watch?v=Uy7hDYo-0Ro",
        difficulty: "Advanced",
        description: "Advanced tricks and traps to gain an edge in the Slav Defense."
      },
      {
        id: "14",
        title: "Slav Defense Masterclass by GM",
        url: "https://www.youtube.com/watch?v=HME_lycLQhY",
        difficulty: "Advanced",
        description: "A deep dive into the Slav Defense with expert-level strategies."
      },
      {
        id: "15",
        title: "Top-Level Slav Defense – Advanced Analysis and Ideas",
        url: "https://www.youtube.com/watch?v=z6-dP7XJ-GA",
        difficulty: "Advanced",
        description: "Advanced exploration of the Slav Defense at the highest levels of chess."
      }
    ],
    // Default videos in case the opening is not found
    "Default": [
      {
        id: "default1",
        title: "Chess Opening Fundamentals",
        url: "https://www.youtube.com/watch?v=21L45Qo6EIY",
        difficulty: "Beginner",
        description: "Learn the fundamental principles of chess openings."
      },
      {
        id: "default2",
        title: "Top 10 Chess Openings for Beginners",
        url: "https://www.youtube.com/watch?v=8IlJ3v8I4Z8",
        difficulty: "Beginner",
        description: "A guide to the most popular openings for beginners."
      }
    ]
  };

  // First, check if we have videos for the requested opening name
  let selectedVideos = videosByOpening[openingName] || videosByOpening["Default"];
  
  // Return the number of videos requested or all available if less
  return selectedVideos.slice(0, Math.min(count, selectedVideos.length));
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
          <div className="grid grid-cols-1 gap-4">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-base mb-1">{video.title}</h3>
                    
                    {video.description && (
                      <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                    )}
                    
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className={`
                        ${video.difficulty === "Beginner" ? "bg-green-50 text-green-700" : 
                         video.difficulty === "Intermediate" ? "bg-yellow-50 text-yellow-700" : 
                         "bg-red-50 text-red-700"}
                      `}>
                        {video.difficulty}
                      </Badge>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
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
