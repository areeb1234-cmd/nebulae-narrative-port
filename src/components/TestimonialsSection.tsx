import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  { name: 'Sarah Chen', role: 'CEO, TechVibe', initials: 'SC', text: 'M. Areeb delivered an exceptional web experience that exceeded our expectations. The 3D elements and animations were stunning.', project: 'Interactive product launch' },
  { name: 'Marcus Johnson', role: 'Product Manager, InnovateCo', initials: 'MJ', text: 'Working with M. Areeb was a game-changer. The attention to detail and performance optimization was incredible.', project: 'Analytics platform' },
  { name: 'Elena Rodriguez', role: 'Founder, DesignLab', initials: 'ER', text: 'The portfolio website M. Areeb built for us is the best investment we made. Client inquiries doubled within a month.', project: 'Brand and portfolio' },
  { name: 'David Kim', role: 'CTO, StartupGrid', initials: 'DK', text: 'Rarely do you find a developer who understands both design and engineering at this level. Highly recommend.', project: 'Full-stack product' },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % testimonials.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const previous = () => setCurrent((value) => (value - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((value) => (value + 1) % testimonials.length);
  const testimonial = testimonials[current];

  return (
    <AnimatedSection className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-30 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <motion.span className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Client Stories</motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">What Clients <span className="gradient-text">Say</span></h2>

        <div className="glass rounded-lg border-primary/20 overflow-hidden">
          <div className="grid md:grid-cols-[180px_1fr] min-h-[360px]">
            <div className="hidden md:flex border-r border-border bg-secondary/20 p-6 flex-col justify-between">
              <Quote className="text-primary" size={38} strokeWidth={1.4} />
              <div>
                <div className="text-5xl font-bold gradient-text">{String(current + 1).padStart(2, '0')}</div>
                <div className="mt-1 text-xs font-mono text-muted-foreground">OF {String(testimonials.length).padStart(2, '0')}</div>
              </div>
            </div>

            <div className="relative p-7 sm:p-12">
              <AnimatePresence mode="wait">
                <motion.div key={current} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.38, ease: 'easeOut' }}>
                  <div className="mb-8 flex gap-1" aria-label="5 out of 5 stars">
                    {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={16} className="fill-primary text-primary" />)}
                  </div>
                  <blockquote className="text-xl sm:text-2xl leading-relaxed text-foreground">“{testimonial.text}”</blockquote>
                  <div className="mt-10 flex items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-bold text-primary">{testimonial.initials}</div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <span className="hidden sm:block text-right text-xs font-mono uppercase text-primary">{testimonial.project}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-border px-6 py-4">
            <Button variant="ghost" size="icon" onClick={previous} aria-label="Previous testimonial" className="rounded-full border border-border hover:border-primary/50 hover:text-primary"><ArrowLeft /></Button>
            <div className="flex flex-1 gap-2">
              {testimonials.map((item, index) => (
                <Button key={item.name} variant="ghost" aria-label={`Show testimonial from ${item.name}`} onClick={() => setCurrent(index)} className="h-2 flex-1 rounded-full bg-secondary p-0 hover:bg-secondary">
                  <motion.span className="block h-full rounded-full bg-primary" animate={{ width: index === current ? '100%' : '0%' }} transition={{ duration: 0.35 }} />
                </Button>
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={next} aria-label="Next testimonial" className="rounded-full border border-border hover:border-primary/50 hover:text-primary"><ArrowRight /></Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TestimonialsSection;