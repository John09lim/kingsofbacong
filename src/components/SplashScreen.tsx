
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ finishLoading }: { finishLoading: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 5000);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-chess-dark-maroon z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          delay: 0.2,
          duration: 0.8 
        }}
        className="w-64 h-64 md:w-80 md:h-80 relative"
      >
        <img 
          src="/lovable-uploads/40fd7632-589e-44da-bd7f-d66a49ea58e1.png" 
          alt="Kings of Bacong Chess Club" 
          className="w-full h-full object-contain"
        />
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            repeat: 3, 
            duration: 1.5, 
            repeatType: "reverse" 
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="bg-white/20 absolute inset-0 rounded-full blur-xl"></span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
