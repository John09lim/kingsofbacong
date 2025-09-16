
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="chess-gradient text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/5fe0e08d-fe57-4d84-a091-26c935749a2f.png" 
                alt="Kings of Bacong Chess Club" 
                className="h-12 w-12 object-contain"
              />
              <span className="font-bold text-xl">Kings of Bacong</span>
            </div>
            <p className="text-chess-light-pink mb-4">
              Elevating chess skills through structured learning and community support since 2020.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://lichess.org/forum" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-chess-light-pink transition-colors"
                aria-label="Lichess Forum"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://lichess.org/tv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-chess-light-pink transition-colors"
                aria-label="Lichess TV"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://lichess.org/tournament" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-chess-light-pink transition-colors"
                aria-label="Lichess Tournaments"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://lichess.org/broadcast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-chess-light-pink transition-colors"
                aria-label="Lichess Broadcasts"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Chess Training</h3>
            <p className="text-chess-light-pink text-sm mb-4">
              Master chess through our comprehensive training modules designed for all skill levels.
            </p>
            <div className="space-y-3">
              <div>
                <Link 
                  to="/openings"
                  className="text-white hover:text-chess-light-pink transition-colors font-medium block"
                >
                  Opening Studies
                </Link>
                <p className="text-chess-light-pink text-xs mt-1">
                  Learn fundamental opening principles and popular opening systems
                </p>
              </div>
              <div>
                <Link 
                  to="/middlegame"
                  className="text-white hover:text-chess-light-pink transition-colors font-medium block"
                >
                  Middlegame Strategies
                </Link>
                <p className="text-chess-light-pink text-xs mt-1">
                  Develop positional understanding and tactical awareness
                </p>
              </div>
              <div>
                <Link 
                  to="/endgame"
                  className="text-white hover:text-chess-light-pink transition-colors font-medium block"
                >
                  Endgame Techniques
                </Link>
                <p className="text-chess-light-pink text-xs mt-1">
                  Master essential endgame patterns and techniques
                </p>
              </div>
              <div>
                <Link 
                  to="/tactics"
                  className="text-white hover:text-chess-light-pink transition-colors font-medium block"
                >
                  Tactical Puzzles
                </Link>
                <p className="text-chess-light-pink text-xs mt-1">
                  Sharpen your tactical vision with daily puzzle challenges
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://lichess.org/video" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-chess-light-pink hover:text-white transition-colors"
                >
                  Video Lessons
                </a>
              </li>
              <li>
                <a 
                  href="https://lichess.org/blog" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-chess-light-pink hover:text-white transition-colors"
                >
                  Articles
                </a>
              </li>
              <li>
                <a 
                  href="https://lichess.org/practice" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-chess-light-pink hover:text-white transition-colors"
                >
                  Practice Lessons
                </a>
              </li>
              <li>
                <a 
                  href="https://lichess.org/forum/general-chess-discussion/how-do-i-become-a-grandmaster" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-chess-light-pink hover:text-white transition-colors"
                >
                  Grandmaster Insights
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="flex items-center gap-2 mb-2 text-chess-light-pink">
              <Mail size={16} />
              <span>contact@kingsofbacong.com</span>
            </p>
            <form className="mt-4">
              <p className="mb-2 text-sm">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 rounded-l-md text-chess-dark-blue w-full focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-white text-chess-deep-red px-4 py-2 rounded-r-md hover:bg-chess-light-pink transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-chess-muted-rose/30 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Kings of Bacong Chess Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
