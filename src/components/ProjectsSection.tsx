import { useRef, MouseEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Quantum Dashboard',
    desc: 'Real-time analytics platform with 3D data visualization and predictive AI insights.',
    tags: ['React', 'Three.js', 'Python', 'AI'],
    color: 'from-primary/20 to-neon-soft/20',
  },
  {
    title: 'Neural Interface',
    desc: 'Brain-computer interface prototype for accessible web navigation using ML models.',
    tags: ['TensorFlow', 'WebGL', 'Node.js'],
    color: 'from-neon-soft/20 to-primary/10',
  },
  {
    title: 'Synthwave Studio',
    desc: 'Web-based music production tool with real-time audio processing and visual feedback.',
    tags: ['Web Audio', 'Canvas', 'React'],
    color: 'from-primary/15 to-neon-glow/10',
  },
  {
    title: 'CryptoVerse',
    desc: 'Decentralized portfolio tracker with animated charts and real-time market data.',
    tags: ['Solidity', 'React', 'D3.js'],
    color: 'from-neon-glow/10 to-primary/20',
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass rounded-2xl overflow-hidden transition-transform duration-300 ease-out group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      {/* Project visual */}
      <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(270_100%_60%/0.1),transparent)]" />
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors" aria-label="View on GitHub">
            <Github size={14} />
          </a>
          <a href="#" className="w-8 h-8 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors" aria-label="View live">
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <AnimatedSection className="py-32 px-6 relative">
      <div id="projects" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <motion.span
          className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Selected Work
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
