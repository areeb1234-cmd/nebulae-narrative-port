import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Monitor, Smartphone, Box, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: 'Web Development',
    desc: 'High-performance web applications built with React, Next.js, and modern frameworks.',
    price: 'From $3,000',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile experiences with React Native and native-like performance.',
    price: 'From $5,000',
  },
  {
    icon: Box,
    title: '3D & Interactive',
    desc: 'Immersive 3D web experiences using Three.js, WebGL, and custom shaders.',
    price: 'From $4,000',
  },
  {
    icon: Sparkles,
    title: 'UI/UX Design',
    desc: 'User-centered design with prototyping, motion design, and design systems.',
    price: 'From $2,000',
  },
];

const ServicesSection = () => {
  return (
    <AnimatedSection className="py-32 px-6 relative">
      <div id="services" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <motion.span
          className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          What I Offer
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          My <span className="gradient-text">Services</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass rounded-2xl p-8 group hover:neon-border transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>
                <span className="text-sm font-mono text-primary">{service.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ServicesSection;
