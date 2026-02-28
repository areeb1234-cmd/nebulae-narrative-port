import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Three.js / WebGL', level: 85 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'UI/UX Design', level: 80 },
  { name: 'Python / AI/ML', level: 75 },
];

const SkillBars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-5">
      {skills.map((skill, i) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
            <span className="text-xs font-mono text-primary">{skill.level}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-neon-glow"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillBars;
