import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  // This portfolio is dark-only by design, but the toggle adds a "lighter dark" mode
  const [isLightAccent, setIsLightAccent] = useState(false);

  const toggle = () => {
    setIsLightAccent(!isLightAccent);
    document.documentElement.classList.toggle('light-accent');
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass neon-border flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme accent"
    >
      {isLightAccent ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  );
};

export default DarkModeToggle;
