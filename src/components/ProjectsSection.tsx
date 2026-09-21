import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { ArrowUpRight, BarChart3, BrainCircuit, Music2, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const projects = [
  {
    title: 'Quantum Dashboard',
    desc: 'Real-time analytics platform with 3D data visualization and predictive AI insights.',
    tags: ['React', 'Three.js', 'Python', 'AI'],
    icon: BarChart3,
    metric: 'Live intelligence',
  },
  {
    title: 'Neural Interface',
    desc: 'Brain-computer interface prototype for accessible web navigation using ML models.',
    tags: ['TensorFlow', 'WebGL', 'Node.js'],
    icon: BrainCircuit,
    metric: 'Accessible by design',
  },
  {
    title: 'Synthwave Studio',
    desc: 'Web-based music production tool with real-time audio processing and visual feedback.',
    tags: ['Web Audio', 'Canvas', 'React'],
    icon: Music2,
    metric: 'Zero-latency workflow',
  },
  {
    title: 'CryptoVerse',
    desc: 'Decentralized portfolio tracker with animated charts and real-time market data.',
    tags: ['Solidity', 'React', 'D3.js'],
    icon: WalletCards,
    metric: 'Markets in motion',
  },
];

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  return (
    <AnimatedSection className="py-32 px-6 relative">
      <div id="projects" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <motion.span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Selected Work
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12, duration: 0.55 }}>
              <Button
                variant="ghost"
                onClick={() => setActiveProject(project)}
                className="group glass h-auto w-full items-stretch justify-start whitespace-normal rounded-lg p-0 text-left hover:bg-glass/80 hover:neon-border focus-visible:ring-primary"
              >
                <div className="w-full">
                  <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-border bg-secondary/30">
                    <div className="absolute inset-0 radial-glow opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                    <project.icon className="relative z-10 h-20 w-20 text-primary/70 transition-all duration-500 group-hover:scale-110 group-hover:text-neon-glow" strokeWidth={1} />
                    <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur-md transition-all duration-300 group-hover:border-primary/50 group-hover:text-primary">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">{project.title}</h3>
                      <span className="text-xs font-mono text-primary">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-mono text-secondary-foreground">{tag}</span>)}
                    </div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeProject)} onOpenChange={(open) => !open && setActiveProject(null)}>
        <DialogContent className="glass-strong overflow-hidden rounded-lg border-primary/30 p-0 sm:max-w-xl">
          {activeProject && (
            <>
              <div className="relative flex h-48 items-center justify-center border-b border-border bg-secondary/30">
                <div className="absolute inset-0 radial-glow" />
                <activeProject.icon className="relative h-24 w-24 text-neon-glow" strokeWidth={1} />
              </div>
              <DialogHeader className="p-7">
                <span className="mb-2 font-mono text-xs uppercase text-primary">{activeProject.metric}</span>
                <DialogTitle className="text-3xl text-foreground">{activeProject.title}</DialogTitle>
                <DialogDescription className="pt-3 text-base leading-relaxed">{activeProject.desc}</DialogDescription>
                <div className="flex flex-wrap gap-2 pt-5">
                  {activeProject.tags.map((tag) => <span key={tag} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-mono text-secondary-foreground">{tag}</span>)}
                </div>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
};

export default ProjectsSection;