import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { YouTubePlayer } from "@/components/YouTubePlayer";

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

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|m\.youtube\.com\/watch\?v=|youtube\.com\/playlist\?list=)([^&\n?#]+)/);
  return match ? match[1] : '';
};

const getVideosForOpening = (openingName: string, count: number): OpeningVideo[] => {
  // Collection of videos for different openings with your specific YouTube links
  const videosByOpening: Record<string, OpeningVideo[]> = {
    "Ruy Lopez": [
      { id: "1", title: "Ruy Lopez Opening Fundamentals", url: "https://www.youtube.com/watch?v=xD0iTgHMQVQ", difficulty: "Beginner" },
      { id: "2", title: "Ruy Lopez Complete Course", url: "https://www.youtube.com/watch?v=2r-3BprN8BI", difficulty: "Beginner" },
      { id: "3", title: "Ruy Lopez Theory Explained", url: "https://www.youtube.com/watch?v=MP0K_rMCjok", difficulty: "Intermediate" },
      { id: "4", title: "Magnus Plays Ruy Lopez", url: "https://www.youtube.com/watch?v=GN7lp9V0szA", difficulty: "Advanced" },
      { id: "5", title: "Ruy Lopez Tactical Ideas", url: "https://www.youtube.com/watch?v=fm4YVM2K6Hk", difficulty: "Intermediate" },
      { id: "6", title: "Ruy Lopez Master Class", url: "https://www.youtube.com/watch?v=B-R74qvIUWU", difficulty: "Advanced" },
      { id: "7", title: "Ruy Lopez Berlin Defense", url: "https://www.youtube.com/watch?v=2nuysTrmWhw", difficulty: "Advanced" },
      { id: "8", title: "Ruy Lopez Exchange Variation", url: "https://www.youtube.com/watch?v=t0EtxvXm7Ds", difficulty: "Intermediate" },
      { id: "9", title: "Ruy Lopez Steinitz Defense", url: "https://www.youtube.com/watch?v=e_nM0ha_WIA", difficulty: "Intermediate" },
      { id: "10", title: "Ruy Lopez Anti-Marshall", url: "https://www.youtube.com/watch?v=eFzZYlsYMhE", difficulty: "Advanced" },
      { id: "11", title: "Ruy Lopez Morphy Defense", url: "https://www.youtube.com/watch?v=v5P80rEvG00", difficulty: "Intermediate" },
      { id: "12", title: "Ruy Lopez Closed System", url: "https://www.youtube.com/watch?v=IQrtrPvU3bQ", difficulty: "Advanced" },
      { id: "13", title: "Ruy Lopez Breyer Variation", url: "https://www.youtube.com/watch?v=DbDFJqHzeWY", difficulty: "Advanced" },
      { id: "14", title: "Ruy Lopez Chigorin Defense", url: "https://www.youtube.com/watch?v=BZkf_TxnRQ0", difficulty: "Intermediate" },
      { id: "15", title: "Ruy Lopez Bird Defense", url: "https://www.youtube.com/watch?v=GFWI3gkizZg", difficulty: "Beginner" },
      { id: "16", title: "Ruy Lopez Cozio Defense", url: "https://m.youtube.com/watch?v=-65LGRtIZ1k", difficulty: "Intermediate" },
      { id: "17", title: "Ruy Lopez Classical Defense", url: "https://www.youtube.com/watch?v=Hv2hKJYeN28", difficulty: "Intermediate" },
      { id: "18", title: "Ruy Lopez Italian Game", url: "https://www.youtube.com/watch?v=A-7QWfbYA7g", difficulty: "Beginner" },
      { id: "19", title: "Ruy Lopez Schliemann Defense", url: "https://www.youtube.com/watch?v=SBTVi2zhc18", difficulty: "Advanced" },
      { id: "20", title: "Ruy Lopez Marshall Attack", url: "https://www.youtube.com/watch?v=tN5QElOOjfw", difficulty: "Advanced" },
      { id: "21", title: "Ruy Lopez Zaitsev Variation", url: "https://www.youtube.com/watch?v=nm68RV9uYII", difficulty: "Advanced" },
      { id: "22", title: "Ruy Lopez Arkhangelsk", url: "https://www.youtube.com/watch?v=E1b-lOpghgc", difficulty: "Advanced" },
      { id: "23", title: "Ruy Lopez Smyslov Variation", url: "https://www.youtube.com/watch?v=MfD3wROaCmQ", difficulty: "Advanced" },
      { id: "24", title: "Ruy Lopez Karpov Variation", url: "https://www.youtube.com/watch?v=eM1yKnw2g2w", difficulty: "Advanced" }
    ],
    "Sicilian Defense": [
      { id: "1", title: "Sicilian Defense Basics", url: "https://www.youtube.com/watch?v=MYGSzNKnlK4", difficulty: "Beginner" },
      { id: "2", title: "Sicilian Dragon Variation", url: "https://www.youtube.com/watch?v=qyfsb56Cy9g", difficulty: "Advanced" },
      { id: "3", title: "Sicilian Najdorf System", url: "https://www.youtube.com/watch?v=WpwoCaE2ZCs", difficulty: "Advanced" },
      { id: "4", title: "Sicilian Accelerated Dragon", url: "https://www.youtube.com/watch?v=YK8P9JMoj0o", difficulty: "Intermediate" },
      { id: "5", title: "Sicilian English Attack", url: "https://www.youtube.com/watch?v=qM4e7g2RukI", difficulty: "Advanced" },
      { id: "6", title: "Sicilian Scheveningen", url: "https://www.youtube.com/watch?v=vxeB4ZI8osA", difficulty: "Advanced" },
      { id: "7", title: "Sicilian Closed System", url: "https://www.youtube.com/watch?v=fe-A_aPsluc", difficulty: "Intermediate" },
      { id: "8", title: "Sicilian Paulsen Variation", url: "https://www.youtube.com/watch?v=u1Jji8Z4YS0", difficulty: "Intermediate" },
      { id: "9", title: "Sicilian Sveshnikov", url: "https://www.youtube.com/watch?v=0iAyyKxh3zc", difficulty: "Advanced" },
      { id: "10", title: "Sicilian Kan Variation", url: "https://www.youtube.com/watch?v=OXINGVBw2KM", difficulty: "Intermediate" },
      { id: "11", title: "Sicilian Taimanov", url: "https://www.youtube.com/watch?v=h43MLr1UvKs", difficulty: "Advanced" },
      { id: "12", title: "Sicilian Richter-Rauzer", url: "https://www.youtube.com/watch?v=_azN5J5oqQM", difficulty: "Advanced" },
      { id: "13", title: "Sicilian Alapin Variation", url: "https://www.youtube.com/watch?v=2miolLK8DiI", difficulty: "Intermediate" },
      { id: "14", title: "Sicilian Grand Prix Attack", url: "https://www.youtube.com/watch?v=WisFv1fkRy4", difficulty: "Intermediate" },
      { id: "15", title: "Sicilian Anti-Sicilian", url: "https://www.youtube.com/watch?v=gmQIWBc5Z8", difficulty: "Beginner" },
      { id: "16", title: "Sicilian Bb5+ Systems", url: "https://www.youtube.com/watch?v=Uw6iaUxzFw0", difficulty: "Intermediate" },
      { id: "17", title: "Sicilian Wing Gambit", url: "https://www.youtube.com/watch?v=JuLYgClRe-Q", difficulty: "Advanced" },
      { id: "18", title: "Sicilian Morra Gambit", url: "https://www.youtube.com/watch?v=MaR92lHeWPw", difficulty: "Intermediate" },
      { id: "19", title: "Sicilian Bowlder Attack", url: "https://www.youtube.com/watch?v=65VWIFlc4C4", difficulty: "Intermediate" },
      { id: "20", title: "Sicilian f4 Attack", url: "https://www.youtube.com/watch?v=GSzjwkkCNFY", difficulty: "Advanced" },
      { id: "21", title: "Sicilian Be2 Systems", url: "https://www.youtube.com/watch?v=t64yRH8LMtY", difficulty: "Intermediate" },
      { id: "22", title: "Sicilian Hedgehog Setup", url: "https://www.youtube.com/watch?v=RsWr-riDjTg", difficulty: "Advanced" },
      { id: "23", title: "Sicilian Fianchetto", url: "https://www.youtube.com/watch?v=wbmjlCh-8aY", difficulty: "Intermediate" },
      { id: "24", title: "Sicilian Four Knights", url: "https://www.youtube.com/watch?v=DHauRgoTh18", difficulty: "Beginner" },
      { id: "25", title: "Sicilian Hyper-Accelerated Dragon", url: "https://www.youtube.com/watch?v=IRq0C_R30-Q", difficulty: "Advanced" },
      { id: "26", title: "Sicilian O'Kelly Variation", url: "https://www.youtube.com/watch?v=Fx3hVQc0jD0", difficulty: "Advanced" },
      { id: "27", title: "Sicilian Pin Variation", url: "https://www.youtube.com/watch?v=80vDy7-KDUU", difficulty: "Intermediate" },
      { id: "28", title: "Sicilian Kalashnikov", url: "https://www.youtube.com/watch?v=3nyxVHwDCTY", difficulty: "Advanced" },
      { id: "29", title: "Sicilian Lowenthal", url: "https://www.youtube.com/watch?v=-huIi7h9nuk", difficulty: "Advanced" },
      { id: "30", title: "Sicilian Pelikan Variation", url: "https://www.youtube.com/watch?v=QpmTi1uIuGI", difficulty: "Advanced" },
      { id: "31", title: "Sicilian Chekhover", url: "https://www.youtube.com/watch?v=1vaTT8jcDf4", difficulty: "Intermediate" },
      { id: "32", title: "Sicilian Sicilian Maze", url: "https://www.youtube.com/watch?v=cwDkPxJnwVk", difficulty: "Advanced" }
    ],
    "Queen's Gambit": [
      { id: "1", title: "Queen's Gambit Opening Guide", url: "https://www.youtube.com/watch?v=ZEQWwuAa2-o", difficulty: "Beginner" },
      { id: "2", title: "Queen's Gambit Accepted", url: "https://www.youtube.com/watch?v=vWPw3B9yBZY", difficulty: "Intermediate" },
      { id: "3", title: "Queen's Gambit Declined", url: "https://www.youtube.com/watch?v=xiDJ7xApYDQ", difficulty: "Intermediate" },
      { id: "4", title: "Queen's Gambit Orthodox Defense", url: "https://www.youtube.com/watch?v=ONB_yxkpAws", difficulty: "Advanced" },
      { id: "5", title: "Queen's Gambit Tarrasch Defense", url: "https://www.youtube.com/watch?v=RMAgaswaoZ8", difficulty: "Advanced" },
      { id: "6", title: "Queen's Gambit Semi-Slav", url: "https://www.youtube.com/watch?v=S2e_rZ4l6iM", difficulty: "Advanced" },
      { id: "7", title: "Queen's Gambit Cambridge Springs", url: "https://www.youtube.com/watch?v=E3dn_RtIekE", difficulty: "Intermediate" },
      { id: "8", title: "Queen's Gambit Manhattan Variation", url: "https://www.youtube.com/watch?v=KEmkjOL_hCc", difficulty: "Advanced" },
      { id: "9", title: "Queen's Gambit Lasker Defense", url: "https://www.youtube.com/watch?v=hv6TnHwALpw", difficulty: "Advanced" },
      { id: "10", title: "Queen's Gambit Exchange Variation", url: "https://www.youtube.com/watch?v=DlXXfcXcF5o", difficulty: "Intermediate" },
      { id: "11", title: "Queen's Gambit Vienna Variation", url: "https://www.youtube.com/watch?v=gTpRrMMLh4U", difficulty: "Advanced" },
      { id: "12", title: "Queen's Gambit Carlsbad Structure", url: "https://www.youtube.com/watch?v=pXMG4KCXo94", difficulty: "Advanced" },
      { id: "13", title: "Queen's Gambit Minority Attack", url: "https://www.youtube.com/watch?v=18OouJViLgw", difficulty: "Advanced" },
      { id: "14", title: "Queen's Gambit Pillsbury Attack", url: "https://www.youtube.com/watch?v=JgXItLb06vM", difficulty: "Advanced" },
      { id: "15", title: "Queen's Gambit Capablanca Variation", url: "https://www.youtube.com/watch?v=mtsabsZ4wG4", difficulty: "Advanced" },
      { id: "16", title: "Queen's Gambit Anti-Meran", url: "https://www.youtube.com/watch?v=4FkLzafa8YY", difficulty: "Advanced" },
      { id: "17", title: "Queen's Gambit Ragozin Defense", url: "https://www.youtube.com/watch?v=RajtCtk9xwM", difficulty: "Advanced" },
      { id: "18", title: "Queen's Gambit Botvinnik System", url: "https://www.youtube.com/watch?v=Z3dGfxedBo8", difficulty: "Advanced" },
      { id: "19", title: "Queen's Gambit Rubinstein Variation", url: "https://www.youtube.com/watch?v=TSTnJNs9wdw", difficulty: "Advanced" },
      { id: "20", title: "Queen's Gambit Modern Theory", url: "https://www.youtube.com/watch?v=_sp6jBv0EWA", difficulty: "Advanced" }
    ],
    "French Defense": [
      { id: "1", title: "French Defense Fundamentals", url: "https://www.youtube.com/watch?v=5pec-u6PSvA", difficulty: "Beginner" },
      { id: "2", title: "French Defense Advance Variation", url: "https://www.youtube.com/watch?v=l6CA2Pz4ZQE", difficulty: "Intermediate" },
      { id: "3", title: "French Defense Exchange Variation", url: "https://www.youtube.com/watch?v=gs1AFfmt3To", difficulty: "Beginner" },
      { id: "4", title: "French Defense Tarrasch Variation", url: "https://www.youtube.com/watch?v=HEvlWRVr1wM", difficulty: "Advanced" },
      { id: "5", title: "French Defense Winawer Variation", url: "https://www.youtube.com/watch?v=px0rMM4QeKU", difficulty: "Advanced" },
      { id: "6", title: "French Defense Classical System", url: "https://www.youtube.com/watch?v=xC__LrtG-R8", difficulty: "Intermediate" },
      { id: "7", title: "French Defense Rubinstein Variation", url: "https://www.youtube.com/watch?v=wC8Z4-ALiec", difficulty: "Advanced" },
      { id: "8", title: "French Defense King's Indian Attack", url: "https://www.youtube.com/watch?v=IGS68T5FmvM", difficulty: "Intermediate" },
      { id: "9", title: "French Defense Steinitz Variation", url: "https://www.youtube.com/watch?v=BnzcN6KVJqo", difficulty: "Intermediate" },
      { id: "10", title: "French Defense McCutcheon Variation", url: "https://www.youtube.com/watch?v=vOw5BQYCfWA", difficulty: "Advanced" },
      { id: "11", title: "French Defense Burn Variation", url: "https://www.youtube.com/watch?v=jD9WfLNJc_s", difficulty: "Intermediate" },
      { id: "12", title: "French Defense Chatard-Alekhine Attack", url: "https://www.youtube.com/watch?v=Zpof1_ES1d4", difficulty: "Advanced" },
      { id: "13", title: "French Defense Two Knights Variation", url: "https://www.youtube.com/watch?v=Xld_sJwdk8k", difficulty: "Intermediate" },
      { id: "14", title: "French Defense Paulsen Attack", url: "https://www.youtube.com/watch?v=XFwfPAarNus", difficulty: "Advanced" },
      { id: "15", title: "French Defense Fort Knox Variation", url: "https://www.youtube.com/watch?v=0qgW-gKeOS0", difficulty: "Intermediate" },
      { id: "16", title: "French Defense Milner-Barry Gambit", url: "https://www.youtube.com/watch?v=fJ5-GAFR0bQ", difficulty: "Advanced" },
      { id: "17", title: "French Defense Alekhine-Chatard Attack", url: "https://www.youtube.com/watch?v=jdWGkTSuqpA", difficulty: "Advanced" },
      { id: "18", title: "French Defense Modern Ideas", url: "https://www.youtube.com/watch?v=HtzVDvVYRaU", difficulty: "Advanced" }
    ],
    "Caro-Kann Defense": [
      { id: "1", title: "Caro-Kann Defense Basics", url: "https://www.youtube.com/watch?v=HvER2idtW6M", difficulty: "Beginner" },
      { id: "2", title: "Caro-Kann Main Line", url: "https://www.youtube.com/watch?v=d_Rgvyt-tTc", difficulty: "Intermediate" },
      { id: "3", title: "Caro-Kann Advance Variation", url: "https://www.youtube.com/watch?v=mgme0mO_xus", difficulty: "Intermediate" },
      { id: "4", title: "Caro-Kann Exchange Variation", url: "https://www.youtube.com/watch?v=vyDwjpRbdVo", difficulty: "Beginner" },
      { id: "5", title: "Caro-Kann Two Knights Attack", url: "https://www.youtube.com/watch?v=rmbU97iftC8", difficulty: "Intermediate" },
      { id: "6", title: "Caro-Kann Panov-Botvinnik Attack", url: "https://www.youtube.com/watch?v=8erPw1WADrQ", difficulty: "Advanced" },
      { id: "7", title: "Caro-Kann Fantasy Variation", url: "https://www.youtube.com/watch?v=mRJqcNZC91k", difficulty: "Intermediate" },
      { id: "8", title: "Caro-Kann Forgacs Variation", url: "https://www.youtube.com/watch?v=LsMljchiPQk", difficulty: "Advanced" },
      { id: "9", title: "Caro-Kann Bronstein-Larsen Variation", url: "https://www.youtube.com/watch?v=AD93CWJOXGw", difficulty: "Advanced" },
      { id: "10", title: "Caro-Kann Karpov Variation", url: "https://www.youtube.com/watch?v=86onnhhKHMg", difficulty: "Advanced" },
      { id: "11", title: "Caro-Kann Smyslov Variation", url: "https://www.youtube.com/watch?v=75eCBgJyGJY", difficulty: "Advanced" },
      { id: "12", title: "Caro-Kann Accelerated Panov", url: "https://www.youtube.com/watch?v=vS_yagozyy4", difficulty: "Intermediate" },
      { id: "13", title: "Caro-Kann Gurgenidze System", url: "https://www.youtube.com/watch?v=An-04jkIndE", difficulty: "Advanced" },
      { id: "14", title: "Caro-Kann Modern Systems", url: "https://www.youtube.com/watch?v=0yMkAJ6Pyig", difficulty: "Intermediate" },
      { id: "15", title: "Caro-Kann Endgame Ideas", url: "https://www.youtube.com/watch?v=zE5HQv-D9cc", difficulty: "Advanced" },
      { id: "16", title: "Caro-Kann Strategic Plans", url: "https://www.youtube.com/watch?v=DCRj6cMJAOQ", difficulty: "Advanced" }
    ],
    "English Opening": [
      { id: "1", title: "English Opening Fundamentals", url: "https://www.youtube.com/watch?v=eM6d2etuzZU", difficulty: "Beginner" },
      { id: "2", title: "English Opening Symmetrical Variation", url: "https://www.youtube.com/watch?v=-W4Ixq2uudw", difficulty: "Intermediate" },
      { id: "3", title: "English Opening Reversed Sicilian", url: "https://www.youtube.com/watch?v=b22YC1OxaJ4", difficulty: "Intermediate" },
      { id: "4", title: "English Opening King's Indian Setup", url: "https://www.youtube.com/watch?v=aRiD81PRZZs", difficulty: "Advanced" },
      { id: "5", title: "English Opening Mikenas-Carls Variation", url: "https://www.youtube.com/watch?v=va0s92praEM", difficulty: "Advanced" },
      { id: "6", title: "English Opening Four Knights System", url: "https://www.youtube.com/watch?v=Af06rSpt1xM", difficulty: "Intermediate" },
      { id: "7", title: "English Opening Hedgehog System", url: "https://www.youtube.com/watch?v=xE0uUuAcMUg", difficulty: "Advanced" },
      { id: "8", title: "English Opening Botvinnik System", url: "https://www.youtube.com/watch?v=Twv9FExvwSw", difficulty: "Advanced" },
      { id: "9", title: "English Opening Closed System", url: "https://www.youtube.com/watch?v=ZiRJJpEhkSs", difficulty: "Intermediate" },
      { id: "10", title: "English Opening Nimzo-English", url: "https://www.youtube.com/watch?v=YAK569j9bdE", difficulty: "Advanced" },
      { id: "11", title: "English Opening Agincourt Defense", url: "https://www.youtube.com/watch?v=66jeCUftGjw", difficulty: "Intermediate" },
      { id: "12", title: "English Opening Caro-Kann Defensive System", url: "https://www.youtube.com/watch?v=cIAY62zlrGQ", difficulty: "Intermediate" },
      { id: "13", title: "English Opening Ultra-Symmetrical", url: "https://www.youtube.com/watch?v=hlJBYUyS7X8", difficulty: "Advanced" },
      { id: "14", title: "English Opening Modern Ideas", url: "https://www.youtube.com/watch?v=iIPm0erPthg", difficulty: "Advanced" }
    ],
    "Giuoco Piano": [
      { id: "1", title: "Giuoco Piano Introduction", url: "https://www.youtube.com/watch?v=qUews8fEGkc", difficulty: "Beginner" },
      { id: "2", title: "Giuoco Piano Classical Line", url: "https://www.youtube.com/watch?v=9Q2oa73y5PU", difficulty: "Intermediate" },
      { id: "3", title: "Giuoco Piano Main Line", url: "https://www.youtube.com/watch?v=0g0mrGTGe-E", difficulty: "Intermediate" },
      { id: "4", title: "Giuoco Piano Evans Gambit", url: "https://www.youtube.com/watch?v=Bkg3TRGIDZs", difficulty: "Advanced" },
      { id: "5", title: "Giuoco Piano Center Attack", url: "https://www.youtube.com/watch?v=p6VhLuOHxBk", difficulty: "Intermediate" },
      { id: "6", title: "Giuoco Piano Hungarian Defense", url: "https://www.youtube.com/watch?v=MVs7FtDWUAs", difficulty: "Intermediate" },
      { id: "7", title: "Giuoco Piano Paris Defense", url: "https://www.youtube.com/watch?v=Um0LlwI0qqE", difficulty: "Intermediate" },
      { id: "8", title: "Giuoco Piano Greco Attack", url: "https://www.youtube.com/watch?v=MhNs8GLo894", difficulty: "Advanced" },
      { id: "9", title: "Giuoco Piano Modern Ideas", url: "https://www.youtube.com/watch?v=2qBfDE7CjWg", difficulty: "Advanced" },
      { id: "10", title: "Giuoco Piano Theoretical Lines", url: "https://www.youtube.com/watch?v=IREcO52zlYY", difficulty: "Advanced" },
      { id: "11", title: "Giuoco Piano Positional Play", url: "https://www.youtube.com/watch?v=Qewug63GIqc", difficulty: "Intermediate" },
      { id: "12", title: "Giuoco Piano Strategic Concepts", url: "https://www.youtube.com/watch?v=4x5Y62g4UhI", difficulty: "Advanced" }
    ],
    "Italian Game": [
      { id: "1", title: "Italian Game Tutorial", url: "https://www.youtube.com/watch?v=6ACqk117Q7U", difficulty: "Beginner" },
      { id: "2", title: "Italian Game Introduction", url: "https://www.youtube.com/watch?v=qUews8fEGkc", difficulty: "Beginner" },
      { id: "3", title: "Italian Game Paris Defense", url: "https://www.youtube.com/watch?v=Um0LlwI0qqE", difficulty: "Beginner" },
      { id: "4", title: "Italian Game Classical Line", url: "https://www.youtube.com/watch?v=9Q2oa73y5PU", difficulty: "Beginner" },
      { id: "5", title: "Italian Game Theoretical Lines", url: "https://www.youtube.com/watch?v=IREcO52zlYY", difficulty: "Beginner" },
      { id: "6", title: "Italian Game Positional Play", url: "https://www.youtube.com/watch?v=Qewug63GIqc", difficulty: "Beginner" },
      { id: "7", title: "Italian Game Opening", url: "https://www.youtube.com/watch?v=xhO774eUJXs", difficulty: "Beginner" },
      { id: "8", title: "Italian Game Strategy", url: "https://www.youtube.com/watch?v=8YP1iVMG_Rg", difficulty: "Beginner" },
      { id: "9", title: "Italian Game Modern Ideas", url: "https://www.youtube.com/watch?v=3w9-KWUL7k4", difficulty: "Beginner" },
      { id: "10", title: "Italian Game Evans Gambit", url: "https://www.youtube.com/watch?v=Bkg3TRGIDZs", difficulty: "Beginner" },
      { id: "11", title: "Italian Game Tactics", url: "https://www.youtube.com/watch?v=5aM6KP2VJtk", difficulty: "Beginner" },
      { id: "12", title: "Italian Game Complete Guide", url: "https://www.youtube.com/watch?v=I_VXU6dlYOM", difficulty: "Beginner" },
      { id: "13", title: "Italian Game Advanced", url: "https://www.youtube.com/watch?v=bFcBENHS6HA", difficulty: "Beginner" },
      { id: "14", title: "Italian Game Principles", url: "https://www.youtube.com/watch?v=xGttvOKOemk", difficulty: "Beginner" },
      { id: "15", title: "Italian Game Mastery", url: "https://www.youtube.com/watch?v=tOZKaAEZ0A0", difficulty: "Beginner" }
    ],
    "London System": [
      { id: "1", title: "London System Opening", url: "https://www.youtube.com/watch?v=49H728S_VjM", difficulty: "Beginner" },
      { id: "2", title: "London System Tutorial", url: "https://www.youtube.com/watch?v=4GcHcIekBSs", difficulty: "Beginner" },
      { id: "3", title: "London System Guide", url: "https://www.youtube.com/watch?v=_g1xMZhGOuc", difficulty: "Beginner" },
      { id: "4", title: "London System Strategy", url: "https://www.youtube.com/watch?v=ECMMct_jnEM", difficulty: "Beginner" },
      { id: "5", title: "London System Basics", url: "https://www.youtube.com/watch?v=soDuIX_jBWw", difficulty: "Beginner" },
      { id: "6", title: "London System Complete", url: "https://www.youtube.com/watch?v=bDRiAipADeA", difficulty: "Beginner" },
      { id: "7", title: "London System Ideas", url: "https://www.youtube.com/watch?v=ftAqYQQldJo", difficulty: "Beginner" },
      { id: "8", title: "London System Theory", url: "https://www.youtube.com/watch?v=EzNUiOR3Glo", difficulty: "Beginner" },
      { id: "9", title: "London System Explained", url: "https://www.youtube.com/watch?v=xVXqe_Rn-CA", difficulty: "Beginner" },
      { id: "10", title: "London System Mastery", url: "https://www.youtube.com/watch?v=hkhYu3DRTSQ", difficulty: "Beginner" },
      { id: "11", title: "London System Advanced", url: "https://m.youtube.com/watch?v=DIVQ0jAGh5c", difficulty: "Beginner" },
      { id: "12", title: "London System Course", url: "https://www.youtube.com/watch?v=EMcLzhJfxH0", difficulty: "Beginner" }
    ],
    "Four Knights Game": [
      { id: "1", title: "Four Knights Game Opening", url: "https://www.youtube.com/watch?v=432VtltHVaA", difficulty: "Beginner" },
      { id: "2", title: "Four Knights Game Tutorial", url: "https://www.youtube.com/watch?v=HizPoJ_2GPs", difficulty: "Beginner" },
      { id: "3", title: "Four Knights Game Guide", url: "https://www.youtube.com/watch?v=m9C7zbtUMqI", difficulty: "Beginner" },
      { id: "4", title: "Four Knights Game Strategy", url: "https://www.youtube.com/watch?v=zzgAPOoCKUc", difficulty: "Beginner" },
      { id: "5", title: "Four Knights Game Basics", url: "https://www.youtube.com/watch?v=2MlejTQPHEE", difficulty: "Beginner" },
      { id: "6", title: "Four Knights Game Complete", url: "https://www.youtube.com/watch?v=hKUTmN0ruYE", difficulty: "Beginner" },
      { id: "7", title: "Four Knights Game Ideas", url: "https://www.youtube.com/watch?v=QqPVNolnOfw", difficulty: "Beginner" },
      { id: "8", title: "Four Knights Game Theory", url: "https://www.youtube.com/watch?v=CSCtd9ge_GY", difficulty: "Beginner" },
      { id: "9", title: "Four Knights Game Explained", url: "https://www.youtube.com/watch?v=v7mvyshoZ54", difficulty: "Beginner" },
      { id: "10", title: "Four Knights Game Mastery", url: "https://www.youtube.com/watch?v=g8t0ygaEAAc", difficulty: "Beginner" }
    ],
    "Queen's Pawn Game": [
      { id: "1", title: "Queen's Pawn Game Opening", url: "https://www.youtube.com/watch?v=vEK8vPRlt2g", difficulty: "Beginner" },
      { id: "2", title: "Queen's Pawn Game Tutorial", url: "https://www.youtube.com/watch?v=q-pUpuzQM4k", difficulty: "Beginner" },
      { id: "3", title: "Queen's Pawn Game Guide", url: "https://www.youtube.com/watch?v=Dd05J-4LyB8", difficulty: "Beginner" },
      { id: "4", title: "Queen's Pawn Game Strategy", url: "https://www.youtube.com/watch?v=qcNN85OTZYU", difficulty: "Beginner" },
      { id: "5", title: "Queen's Pawn Game Basics", url: "https://www.youtube.com/watch?v=qlRms6SUz8E", difficulty: "Beginner" },
      { id: "6", title: "Queen's Pawn Game Complete", url: "https://www.youtube.com/watch?v=5J_v8RTDPug", difficulty: "Beginner" },
      { id: "7", title: "Queen's Pawn Game Ideas", url: "https://www.youtube.com/watch?v=eH1O3_550Wo", difficulty: "Beginner" },
      { id: "8", title: "Queen's Pawn Game Theory", url: "https://www.youtube.com/watch?v=yQwxPOabpWw", difficulty: "Beginner" }
    ],
    "Scandinavian Defense": [
      { id: "1", title: "Scandinavian Defense Opening", url: "https://www.youtube.com/watch?v=sKoBj-kL0hg", difficulty: "Beginner" },
      { id: "2", title: "Scandinavian Defense Tutorial", url: "https://www.youtube.com/watch?v=4Rrt0Lm176I", difficulty: "Beginner" },
      { id: "3", title: "Scandinavian Defense Guide", url: "https://www.youtube.com/watch?v=OGehkS76Q24", difficulty: "Beginner" },
      { id: "4", title: "Scandinavian Defense Strategy", url: "https://www.youtube.com/watch?v=Up9c5bbMJvE", difficulty: "Beginner" },
      { id: "5", title: "Scandinavian Defense Basics", url: "https://www.youtube.com/watch?v=A2J2OW99lGU", difficulty: "Beginner" },
      { id: "6", title: "Scandinavian Defense Complete", url: "https://www.youtube.com/watch?v=Wpd8jcVKcJw", difficulty: "Beginner" },
      { id: "7", title: "Scandinavian Defense Ideas", url: "https://www.youtube.com/watch?v=U1ATw8wSWos", difficulty: "Beginner" }
    ],
    "Vienna Game": [
      { id: "1", title: "Vienna Game Opening", url: "https://www.youtube.com/watch?v=JVxENCPcCjU", difficulty: "Beginner" },
      { id: "2", title: "Vienna Game Tutorial", url: "https://www.youtube.com/watch?v=6QQ5sw-SgNw", difficulty: "Beginner" },
      { id: "3", title: "Vienna Game Guide", url: "https://www.youtube.com/watch?v=FV67KSxkJQw", difficulty: "Beginner" },
      { id: "4", title: "Vienna Game Strategy", url: "https://www.youtube.com/watch?v=PbteFFxkZIc", difficulty: "Beginner" },
      { id: "5", title: "Vienna Game Basics", url: "https://www.youtube.com/watch?v=T64JJ5850sk", difficulty: "Beginner" },
      { id: "6", title: "Vienna Game Complete", url: "https://www.youtube.com/watch?v=USkSiL-TNQQ", difficulty: "Beginner" }
    ],
    "King's Gambit Declined": [
      { id: "1", title: "King's Gambit Declined Opening", url: "https://www.youtube.com/watch?v=3IxtBxB3H3s", difficulty: "Beginner" },
      { id: "2", title: "King's Gambit Declined Tutorial", url: "https://www.youtube.com/watch?v=YFydlMqz3gk", difficulty: "Beginner" },
      { id: "3", title: "King's Gambit Declined Guide", url: "https://www.youtube.com/watch?v=tCYNsrwyY-Q", difficulty: "Beginner" },
      { id: "4", title: "King's Gambit Declined Strategy", url: "https://www.youtube.com/watch?v=sKfwNPiFIhw", difficulty: "Beginner" },
      { id: "5", title: "King's Gambit Declined Basics", url: "https://www.youtube.com/watch?v=3OTKMrwHP3Y", difficulty: "Beginner" }
    ],
    "Philidor Defense": [
      { id: "1", title: "Philidor Defense Opening", url: "https://www.youtube.com/watch?v=v3XPmRIbono", difficulty: "Beginner" },
      { id: "2", title: "Philidor Defense Tutorial", url: "https://www.youtube.com/watch?v=mAf-YuGPYMo", difficulty: "Beginner" },
      { id: "3", title: "Philidor Defense Guide", url: "https://www.youtube.com/watch?v=Q4bp4qlRqGg", difficulty: "Beginner" },
      { id: "4", title: "Philidor Defense Strategy", url: "https://www.youtube.com/watch?v=6nEI2p3ftgk", difficulty: "Beginner" }
    ],
    "Slav Defense": [
      { id: "1", title: "Slav Defense Basics", url: "https://www.youtube.com/watch?v=cs54KXnGc-0", difficulty: "Beginner" },
      { id: "2", title: "Slav Defense Main Line", url: "https://www.youtube.com/watch?v=AamZUxuyogM", difficulty: "Intermediate" },
      { id: "3", title: "Slav Defense Exchange Variation", url: "https://www.youtube.com/watch?v=qsW7p_keqyA", difficulty: "Beginner" },
      { id: "4", title: "Slav Defense Czech Variation", url: "https://www.youtube.com/watch?v=YX5bLrN2Yxo", difficulty: "Advanced" },
      { id: "5", title: "Slav Defense Chameleon Variation", url: "https://www.youtube.com/watch?v=zx4rRi4xTO4", difficulty: "Advanced" },
      { id: "6", title: "Slav Defense Semi-Slav", url: "https://www.youtube.com/watch?v=7JiCDaqCWPI", difficulty: "Advanced" },
      { id: "7", title: "Slav Defense Steiner Variation", url: "https://www.youtube.com/watch?v=OXffjL9fLAw", difficulty: "Intermediate" },
      { id: "8", title: "Slav Defense Quiet System", url: "https://www.youtube.com/watch?v=SsDeveaYKyI", difficulty: "Intermediate" },
      { id: "9", title: "Slav Defense Schlechter Variation", url: "https://www.youtube.com/watch?v=Bq-VbtT-Icc", difficulty: "Advanced" },
      { id: "10", title: "Slav Defense Winawer Counter-gambit", url: "https://www.youtube.com/watch?v=lISI_mRw4y4", difficulty: "Advanced" },
      { id: "11", title: "Slav Defense Alekhine Variation", url: "https://www.youtube.com/watch?v=efKG3strOdY", difficulty: "Advanced" },
      { id: "12", title: "Slav Defense Geller Gambit", url: "https://www.youtube.com/watch?v=SFcWvkTVUuU", difficulty: "Advanced" },
      { id: "13", title: "Slav Defense Soultanbeieff Variation", url: "https://www.youtube.com/watch?v=0O9CAn0lt6Y", difficulty: "Intermediate" },
      { id: "14", title: "Slav Defense Modern Theory", url: "https://www.youtube.com/watch?v=8dLAbE2joL4", difficulty: "Advanced" },
      { id: "15", title: "Slav Defense Strategic Plans", url: "https://www.youtube.com/watch?v=wM2HHfV1KXE", difficulty: "Advanced" }
    ],
    // Advanced openings with new YouTube links
    "King's Indian Defense": [
      { id: "1", title: "King's Indian Defense Fundamentals", url: "https://www.youtube.com/playlist?list=PL9VW7cVkVYCOm6IumZn_cFutpaA8hHmY2", difficulty: "Beginner" },
      { id: "2", title: "King's Indian Defense Theory", url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcDZufGfkN4vWvVW5OTF4Kky", difficulty: "Intermediate" },
      { id: "3", title: "King's Indian Defense Masterclass", url: "https://www.youtube.com/playlist?list=PLOaFVRf_8WkQv_RtBn59zda2ZEBAy1RG7", difficulty: "Advanced" },
      { id: "4", title: "King's Indian Defense Step by Step", url: "https://www.youtube.com/playlist?list=PLQKBpQZcRycoAiI5p-YWg60mt1jlUjCdQ", difficulty: "Intermediate" },
      { id: "5", title: "King's Indian Defense Mixed Collection", url: "https://www.youtube.com/playlist?list=PL9AQY9ofznmh0mslrvSUsy51kN8l963p1", difficulty: "Intermediate" },
      { id: "6", title: "King's Indian Defense Masters", url: "https://www.youtube.com/playlist?list=PLDnx7w_xuguFcu3bsVb2JPElVHRMxhXaj", difficulty: "Advanced" },
      { id: "7", title: "King's Indian Defense Rating Climb", url: "https://www.youtube.com/playlist?list=PLy7vABK_JsyMwuY5Oo9BK1xl4Ken3f8ob", difficulty: "Advanced" },
      { id: "8", title: "King's Indian Defense Assorted", url: "https://www.youtube.com/playlist?list=PL8gqV9r--YyBj4UI7Q5Q8bUWPSPwRizoN", difficulty: "Intermediate" }
    ],
    "Nimzo-Indian Defense": [
      { id: "1", title: "Nimzo-Indian Defense Theory", url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcAIp1mz9MWi04VJsLVVWjYX", difficulty: "Intermediate" },
      { id: "2", title: "Nimzo-Indian Defense Masterclass", url: "https://www.youtube.com/playlist?list=PLOaFVRf_8WkQIT8DltZVPhQGs8k2vMN9k", difficulty: "Advanced" },
      { id: "3", title: "Nimzo-Indian Defense Mobile Series", url: "https://m.youtube.com/playlist?list=PL79wC55xUgX-6YZRDqfV9jNXNrWRyfvRZ", difficulty: "Intermediate" },
      { id: "4", title: "Learn to Play Nimzo-Indian", url: "https://www.youtube.com/playlist?list=PLLMIfCVLsv1h67cduxxUP8N33Xv6FGdZA", difficulty: "Beginner" },
      { id: "5", title: "Nimzo-Indian Defense - ChessGoals", url: "https://www.youtube.com/playlist?list=PLKY1N5we6Q0BXs1IRoDATwMyafa_PEnZ8", difficulty: "Intermediate" },
      { id: "6", title: "Nimzo-Indian Defense Assorted", url: "https://www.youtube.com/playlist?list=PLDnx7w_xuguHcnXXJ5stWBAJQu6JttUKW", difficulty: "Advanced" },
      { id: "7", title: "Nimzo-Indian Defense Mobile Collection", url: "https://m.youtube.com/playlist?list=PLqBYo5isgO39oXKbiVzX1TfyAGSzJdPKU", difficulty: "Intermediate" },
      { id: "8", title: "Nimzo-Indian Defense - Jozarov", url: "https://www.youtube.com/playlist?list=PLORhN_vW0H0gg199Xcc_0v03t4bltwoHh", difficulty: "Advanced" }
    ],
    "Grünfeld Defense": [
      { id: "1", title: "Grünfeld Defense Theory", url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcAlRd-LHbv9zy9wZ9_RszNy", difficulty: "Intermediate" },
      { id: "2", title: "Grünfeld Defense - Kingscrusher", url: "https://www.youtube.com/playlist?list=PL821A6D839F1B1ADD", difficulty: "Advanced" },
      { id: "3", title: "Grünfeld Defense - Jozarov", url: "https://www.youtube.com/playlist?list=PLORhN_vW0H0hOwACJXo25MhFfks7coh4H", difficulty: "Advanced" },
      { id: "4", title: "Grünfeld Defense Assorted", url: "https://www.youtube.com/playlist?list=PL8gqV9r--YyAaoPEeCc7aOEoymuiyEYLU", difficulty: "Intermediate" },
      { id: "5", title: "Grünfeld Defense ECO", url: "https://www.youtube.com/playlist?list=PLcBtKX9yfyN9Zt2CgexA694ipKvXUMyzZ", difficulty: "Advanced" },
      { id: "6", title: "Grünfeld Defense Shorts Series", url: "https://www.youtube.com/playlist?list=PLxgIRTk1eUDRx0XpdPWzdl_glIbvuQXWr", difficulty: "Intermediate" }
    ],
    "Benko Gambit": [
      { id: "1", title: "Benko Gambit - ChessBase India", url: "https://www.youtube.com/playlist?list=PL9WYcwsWaJ7o1NGlfy0V9C5LKTtJ8TyGZ", difficulty: "Intermediate" },
      { id: "2", title: "Benko Gambit General", url: "https://www.youtube.com/playlist?list=PL9VW7cVkVYCOxgsvKkD3d6KzpZD0aEETg", difficulty: "Beginner" },
      { id: "3", title: "Benko Gambit Series", url: "https://m.youtube.com/playlist?list=PLSMpDnrNJi8SpBp10aVcY3MTRaoVgCKkb", difficulty: "Intermediate" },
      { id: "4", title: "Benko Gambit - Graif", url: "https://www.youtube.com/playlist?list=PLOm4tWEsA0wbPU_Q_uGcDaUyeS5Xqz2be", difficulty: "Advanced" },
      { id: "5", title: "Learn to Play Benko", url: "https://www.youtube.com/playlist?list=PLLMIfCVLsv1jOZ0cN5blERYLkgmkJXn1C", difficulty: "Beginner" },
      { id: "6", title: "Benko Gambit - Kingscrusher", url: "https://www.youtube.com/playlist?list=PLF6A3187B7A13D8CF", difficulty: "Advanced" },
      { id: "7", title: "Benko Gambit - ChessGoals", url: "https://www.youtube.com/playlist?list=PLKY1N5we6Q0DiM7kdsq-kuY-gqkbLg0e8", difficulty: "Intermediate" },
      { id: "8", title: "Benko Gambit - Chess School", url: "https://www.youtube.com/playlist?list=PL8gqV9r--YyA8_tAw0wsarpcULl_CVuCN", difficulty: "Advanced" },
      { id: "9", title: "Benoni/Benko/Budapest", url: "https://www.youtube.com/playlist?list=PLKY1N5we6Q0AdRUEEFdaXHDJ4Cd44DCBq", difficulty: "Advanced" }
    ],
    "Alekhine's Defense": [
      { id: "1", title: "Alekhine's Defense Theory", url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcA1_4uP2KguvKBcsKw5eSgg", difficulty: "Intermediate" },
      { id: "2", title: "Alekhine's Defense Series", url: "https://www.youtube.com/playlist?list=PLxgIRTk1eUDRmnvOqalBGAzqbWDnjGp3i", difficulty: "Advanced" },
      { id: "3", title: "Alekhine's Defense Mini-Lessons", url: "https://www.youtube.com/playlist?list=PLyhJ_dahsw5gW43tIEt2IHdHFY-gg4Nmm", difficulty: "Beginner" },
      { id: "4", title: "Alekhine's Defense - Agadmator", url: "https://www.youtube.com/playlist?list=PLDnx7w_xuguHRVUqOarJzszvxCcuzS4V_", difficulty: "Intermediate" },
      { id: "5", title: "Alekhine's Defense - Kingscrusher", url: "https://www.youtube.com/playlist?list=PL9JCz2Gsbqe7xdhH151QMn1Ep3Gcy-Vgi", difficulty: "Advanced" },
      { id: "6", title: "Alekhine's Defense GM-Level", url: "https://www.youtube.com/playlist?list=PLuwOD40I3Bx403bZUy29OO7Zxcmh4OwOy", difficulty: "Advanced" },
      { id: "7", title: "Best of Alekhine", url: "https://www.youtube.com/playlist?list=PL3VQJmPdtbm37JMnXCKBYi3yVomsm3KjG", difficulty: "Advanced" }
    ],
    "Modern Defense": [
      { id: "1", title: "Modern Defense Theory", url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcABZfxq3XCETF0XBpABDesS", difficulty: "Intermediate" },
      { id: "2", title: "Modern Defense Series", url: "https://www.youtube.com/playlist?list=PLKx6s-gbAEVGQ26qtuseq9Svt7hLpcDpb", difficulty: "Advanced" },
      { id: "3", title: "Modern Defense Assorted", url: "https://m.youtube.com/playlist?list=PLH6EhG7LMA4IOFLDGsOmmyO73HqD5ziRP", difficulty: "Intermediate" },
      { id: "4", title: "Modern Defense General", url: "https://www.youtube.com/playlist?list=PL5X_LrdT7hCVA-sbopy7YIh9X8VmOdh7N", difficulty: "Beginner" },
      { id: "5", title: "Modern Defense Collection", url: "https://www.youtube.com/playlist?list=PLeico9IFGPsNBzpAURT4wD45z2kR_8Ri2", difficulty: "Intermediate" },
      { id: "6", title: "Modern Defense Games", url: "https://www.youtube.com/playlist?list=PL9aCam7Se4tBDKX-ewy2pVl5fbVGvVkd5", difficulty: "Advanced" },
      { id: "7", title: "Pirc & Modern", url: "https://www.youtube.com/playlist?list=PLE6293A02FDE41AE9", difficulty: "Intermediate" },
      { id: "8", title: "Modern Defense Shorts", url: "https://www.youtube.com/playlist?list=PLobkpLLaxwahXiQDn2KmYkzg7ssdtR3kP", difficulty: "Beginner" }
    ],
    "Catalan Opening": [
      { id: "1", title: "Catalan Opening Theory", url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcBwWsSqwig0dAymsPQd0dzy", difficulty: "Intermediate" },
      { id: "2", title: "Catalan Opening Curated", url: "https://www.youtube.com/playlist?list=PLjjYfV8Gz4xtnNfLp2-bhDci9PVwm9tNP", difficulty: "Advanced" },
      { id: "3", title: "Catalan Opening Assorted", url: "https://www.youtube.com/playlist?list=PL8gqV9r--YyD_nZF_H_ldvwXRGc3Q8EVr", difficulty: "Intermediate" },
      { id: "4", title: "Catalan Opening Collection", url: "https://www.youtube.com/playlist?list=PLDnx7w_xuguGEvOMthw0KThGM_-90CzA2", difficulty: "Advanced" },
      { id: "5", title: "Catalan Opening - ChessGoals", url: "https://www.youtube.com/playlist?list=PLKY1N5we6Q0BVD9NUAiP1lKveKNUcQfXU", difficulty: "Intermediate" },
      { id: "6", title: "Catalan Opening - Jozarov", url: "https://www.youtube.com/playlist?list=PLORhN_vW0H0iMbDKTgPJHV6OV6y_lzmGu", difficulty: "Advanced" },
      { id: "7", title: "Catalan Opening - Kingscrusher", url: "https://www.youtube.com/playlist?list=PL9JCz2Gsbqe7rd3enQgPtaHMs63VmFPol", difficulty: "Advanced" },
      { id: "8", title: "Catalan Opening Curated Collection", url: "https://www.youtube.com/playlist?list=PL1O0jlNSD-394tXrBsDTyEdSCC-2mIqSv", difficulty: "Intermediate" },
      { id: "9", title: "Catalan Opening - Ostrovskiy", url: "https://www.youtube.com/playlist?list=PL9RQPxG_e-LknXaRUkDzgqHQmUmHbVuxl", difficulty: "Advanced" }
    ],
    "Benoni Defense": [
      { id: "1", title: "Benoni Defense Theory", url: "https://www.youtube.com/playlist?list=PLssNbVBYrGcB9CsVX8pErxKpIRPc79FVT", difficulty: "Intermediate" },
      { id: "2", title: "Modern Benoni Series", url: "https://www.youtube.com/playlist?list=PL3jRQNcZ6qoyRBwB7g_HeoZpE67ipeft_", difficulty: "Advanced" },
      { id: "3", title: "Benoni Defense Assorted", url: "https://www.youtube.com/playlist?list=PLDnx7w_xuguEC3JnDBDKv-eFpx5efWpWk", difficulty: "Intermediate" },
      { id: "4", title: "Benoni Defense - Kingscrusher", url: "https://www.youtube.com/playlist?list=PL9JCz2Gsbqe59HZOTU6xSgoPFHeKxmJk-", difficulty: "Advanced" },
      { id: "5", title: "Benoni Defense Collection", url: "https://www.youtube.com/playlist?list=PLxpEktlns9TuLJbOjiw3DQgR0lqHI5Rq-", difficulty: "Intermediate" },
      { id: "6", title: "Benoni Defense Games", url: "https://m.youtube.com/playlist?list=PLOBOd3sesuLgn2oeudFChj39rbmINb_cz", difficulty: "Advanced" },
      { id: "7", title: "Old Benoni", url: "https://m.youtube.com/playlist?list=PLHnqML29wIYFBqtFSOvmh_TaHFPMU394w", difficulty: "Intermediate" },
      { id: "8", title: "Benoni Taimanov Variation", url: "https://www.youtube.com/playlist?list=PLORhN_vW0H0ji1A-FUa93_iLSYWk3Tntw", difficulty: "Advanced" },
      { id: "9", title: "Benoni/Benko/Budapest", url: "https://www.youtube.com/playlist?list=PLKY1N5we6Q0AdRUEEFdaXHDJ4Cd44DCBq", difficulty: "Advanced" }
    ],
    "Najdorf Sicilian": [
      { id: "1", title: "Najdorf Sicilian - ChessBase India", url: "https://www.youtube.com/playlist?list=PL9WYcwsWaJ7queNFnHMcxJEqzPSKUrQz7", difficulty: "Intermediate" },
      { id: "2", title: "Najdorf Sicilian - Kingscrusher", url: "https://www.youtube.com/playlist?list=PL1687DFC57CABC540", difficulty: "Advanced" },
      { id: "3", title: "Najdorf Sicilian - James Canty", url: "https://www.youtube.com/playlist?list=PL9VW7cVkVYCN9a2lGPp4X4vcp7x8R0O-w", difficulty: "Advanced" },
      { id: "4", title: "Najdorf Sicilian Series", url: "https://m.youtube.com/playlist?list=PLrTLUmPNfTCJYRU6sZ2J6wL7ckQMxurv-", difficulty: "Intermediate" },
      { id: "5", title: "Najdorf SLCC Episode", url: "https://www.youtube.com/watch?v=dsvvD2eM1-k", difficulty: "Advanced" },
      { id: "6", title: "Najdorf SLCC Lectures", url: "https://www.youtube.com/playlist?list=PLVWaFpMwtaGjo-YcMH8ghDX-OQdDYz2OU", difficulty: "Advanced" },
      { id: "7", title: "Najdorf Tutorial", url: "https://www.youtube.com/watch?v=vxeB4ZI8osA", difficulty: "Beginner" }
    ]
  };

  const videos = videosByOpening[openingName] || videosByOpening["Italian Game"] || [];
  return videos.slice(0, count);
};

const OpeningVideos: React.FC<OpeningVideosProps> = ({ openingName, videoCount, isOpen, onClose }) => {
  const videos = getVideosForOpening(openingName, videoCount);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {openingName} Video Tutorials ({videoCount} videos)
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
            {videos.map((video) => (
              <YouTubePlayer
                key={video.id}
                videoId={extractVideoId(video.url)}
                title={video.title}
                difficulty={video.difficulty}
                description={video.description}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OpeningVideos;
