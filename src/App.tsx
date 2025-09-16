
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen from './components/SplashScreen';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import OpeningStudies from './pages/OpeningStudies';
import MiddlegameStrategies from './pages/MiddlegameStrategies';
import EndgameTechniques from './pages/EndgameTechniques';
import TacticalPuzzles from './pages/TacticalPuzzles';
import ThemePuzzlePage from './pages/ThemePuzzlePage';
import Auth from './pages/Auth';
import Training from './pages/Training';
import ChessTrainingOverview from './pages/ChessTrainingOverview';
import Resources from './pages/Resources';
import Community from './pages/Community';
import Profile from './pages/Profile';
import MonthlyCalendar from './pages/MonthlyCalendar';
import ChessImprovement from './pages/ChessImprovement';
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/openings" element={<OpeningStudies />} />
          <Route path="/middlegame" element={<MiddlegameStrategies />} />
          <Route path="/endgame" element={<EndgameTechniques />} />
          <Route path="/tactics" element={<TacticalPuzzles />} />
          <Route path="/tactics/:theme" element={<ThemePuzzlePage />} />
          <Route path="/training" element={<Training />} />
          <Route path="/chess-training" element={<ChessTrainingOverview />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<MonthlyCalendar />} />
          <Route path="/improvement" element={<ChessImprovement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <SplashScreen />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
