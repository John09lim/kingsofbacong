
import React, { useState, useEffect } from 'react';
import { Menu, X, UserCircle } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    setProfile(data);
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-chess-dark-maroon text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/40fd7632-589e-44da-bd7f-d66a49ea58e1.png" 
            alt="Kings of Bacong Chess Club" 
            className="h-12 w-auto object-contain"
          />
          <span className="font-bold text-xl hidden sm:block">Kings of Bacong</span>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-chess-light-pink transition-colors">Home</Link>
          <Link to="/training" className="hover:text-chess-light-pink transition-colors">Training</Link>
          <Link to="/tactics" className="hover:text-chess-light-pink transition-colors">Tactics</Link>
          <Link to="/openings" className="hover:text-chess-light-pink transition-colors">Openings</Link>
          <Link to="/community" className="hover:text-chess-light-pink transition-colors">Community</Link>
          
          {user ? (
            <div className="relative flex items-center group">
              <Avatar className="h-10 w-10 border-2 border-chess-light-pink cursor-pointer">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-chess-deep-red text-white">
                  {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-chess-dark-maroon rounded shadow-lg py-2 hidden group-hover:block">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="font-semibold">{profile?.full_name || 'User'}</div>
                  <div className="text-sm opacity-70">{user.email}</div>
                </div>
                <Link to="/profile" className="block px-4 py-2 hover:bg-chess-light-pink">Profile</Link>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 hover:bg-chess-light-pink"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="chess-btn-outline bg-transparent border-white text-white hover:bg-white hover:text-chess-dark-maroon">
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-chess-dark-maroon text-white p-4 absolute w-full shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="py-2 hover:text-chess-light-pink transition-colors">Home</Link>
            <Link to="/training" className="py-2 hover:text-chess-light-pink transition-colors">Training</Link>
            <Link to="/tactics" className="py-2 hover:text-chess-light-pink transition-colors">Tactics</Link>
            <Link to="/openings" className="py-2 hover:text-chess-light-pink transition-colors">Openings</Link>
            <Link to="/community" className="py-2 hover:text-chess-light-pink transition-colors">Community</Link>
            
            {user ? (
              <>
                <div className="py-2 flex items-center space-x-3">
                  <Avatar className="h-8 w-8 border-2 border-chess-light-pink">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-chess-deep-red text-white">
                      {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span>{profile?.full_name || user.email}</span>
                </div>
                <Link to="/profile" className="py-2 hover:text-chess-light-pink transition-colors">Profile</Link>
                <button 
                  onClick={handleSignOut}
                  className="py-2 text-left w-full hover:text-chess-light-pink transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" className="chess-btn-outline bg-transparent border-white text-white hover:bg-white hover:text-chess-dark-maroon w-full">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
