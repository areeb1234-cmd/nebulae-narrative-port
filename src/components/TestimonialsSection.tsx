import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechVibe',
    text: 'Areeb delivered an exceptional web experience that exceeded our expectations. The 3D elements and animations were stunning.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager, InnovateCo',
    text: 'Working with Areeb was a game-changer. The attention to detail and performance optimization was incredible.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Founder, DesignLab',
    text: 'The portfolio website Areeb built for us is the best investment we made. Client inquiries doubled within a month.',
  },
  {
    name: 'David Kim',
    role: 'CTO, StartupGrid',
    text: 'Rarely do you find a developer who understands both design and engineering at this level. Highly recommend.',
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatedSection className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.span
          className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Testimonials
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          What Clients <span className="gradient-text">Say</span>
        </h2>

        <div className="relative glass rounded-2xl p-8 sm:p-12 neon-border min-h-[220px]">
          <Quote className="text-primary/20 absolute top-6 left-6" size={40} />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center relative z-10"
            >
              <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <p className="font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
            <button
              onClick={() => setCurrent(prev => (prev + 1) % testimonials.length)}
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TestimonialsSection;
