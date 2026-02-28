import CharacterCanvas from './CharacterCanvas';
import StaggeredText from './StaggeredText';
import MagneticButton from './MagneticButton';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CharacterCanvas />

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            Creative Developer
          </span>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6">
          <StaggeredText text="Hello, I'm" delay={0.5} />
          <br />
          <span className="gradient-text">
            <StaggeredText text="Areeb" delay={0.9} />
          </span>
        </h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          Full-stack developer specializing in immersive web experiences,
          3D interactions, and cutting-edge interfaces.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <MagneticButton>
            <a href="#projects" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg neon-glow-box hover:bg-primary/90 transition-colors">
              View Work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#booking" className="inline-block px-8 py-4 glass neon-border rounded-full font-medium text-lg text-foreground hover:bg-primary/10 transition-colors">
              Book a Service
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
