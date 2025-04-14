
import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-chess-dark-maroon text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/5fe0e08d-fe57-4d84-a091-26c935749a2f.png" 
            alt="Kings of Bacong Chess Club" 
            className="h-12 w-12 object-contain"
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
          <button className="chess-btn-outline bg-transparent border-white text-white hover:bg-white hover:text-chess-dark-maroon">
            Sign In
          </button>
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
            <button className="chess-btn-outline bg-transparent border-white text-white hover:bg-white hover:text-chess-dark-maroon w-full">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
