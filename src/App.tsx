
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Training from "./pages/Training";
import OpeningStudies from "./pages/OpeningStudies";
import MiddlegameStrategies from "./pages/MiddlegameStrategies";
import EndgameTechniques from "./pages/EndgameTechniques";
import TacticalPuzzles from "./pages/TacticalPuzzles";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  const finishLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    // Preload the logo image
    const preloadImage = new Image();
    preloadImage.src = "/lovable-uploads/f1e63ef7-1bfa-4e62-b7ee-9a5ecf99af6e.png";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {loading ? (
            <SplashScreen finishLoading={finishLoading} />
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/training" element={<Training />} />
                <Route path="/openings" element={<OpeningStudies />} />
                <Route path="/middlegame" element={<MiddlegameStrategies />} />
                <Route path="/endgame" element={<EndgameTechniques />} />
                <Route path="/tactics" element={<TacticalPuzzles />} />
                <Route path="/resources" element={<Resources />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
