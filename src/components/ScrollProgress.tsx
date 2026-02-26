import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    >
      <div className="absolute right-0 top-0 w-2 h-2 rounded-full bg-neon-glow -translate-y-[3px] neon-glow-box" />
    </motion.div>
  );
};

export default ScrollProgress;
