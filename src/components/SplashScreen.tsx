import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCanvas from './CharacterCanvas';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 radial-glow pointer-events-none" />

          {/* 3D Character */}
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] relative">
            <CharacterCanvas />
          </div>

          {/* Name */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold gradient-text mt-4 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Areeb
          </motion.h1>

          <motion.p
            className="text-sm text-muted-foreground font-mono tracking-widest uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Creative Developer
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="w-48 h-[2px] bg-secondary rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          <motion.span
            className="text-xs text-muted-foreground font-mono mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
