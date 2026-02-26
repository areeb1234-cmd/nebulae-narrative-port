import AnimatedSection from './AnimatedSection';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const skills = [
  { icon: Code2, label: 'Full-Stack Development', desc: 'React, Node, TypeScript' },
  { icon: Palette, label: 'UI/UX Design', desc: 'Figma, Motion Design' },
  { icon: Zap, label: '3D & WebGL', desc: 'Three.js, Shaders' },
  { icon: Globe, label: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <AnimatedSection className="py-32 px-6 relative" delay={0}>
      <div id="about" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Crafting the <span className="gradient-text">future</span> of web
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a passionate developer who lives at the intersection of design and technology.
              With expertise in modern web frameworks and 3D graphics, I create digital experiences
              that push boundaries and captivate users.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every project is an opportunity to innovate. From immersive 3D environments
              to performant web applications, I bring ideas to life with clean code
              and meticulous attention to detail.
            </p>
          </div>

          <div ref={ref} className="grid grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                className="glass rounded-xl p-6 hover:neon-border transition-all duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <skill.icon className="text-primary mb-3 group-hover:text-neon-glow transition-colors" size={28} />
                <h3 className="font-semibold text-sm mb-1">{skill.label}</h3>
                <p className="text-xs text-muted-foreground">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
