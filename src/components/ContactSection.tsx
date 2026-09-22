import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import MagneticButton from './MagneticButton';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  message: z.string().trim().min(1, 'Message is required').max(2000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
      });

      if (error) throw error;

      const body = [
        `Name: ${result.data.name}`,
        `Email: ${result.data.email}`,
        '',
        result.data.message,
      ].join('\n');
      window.location.href = `mailto:alliareeb650@gmail.com?subject=${encodeURIComponent(
        `Portfolio message: ${result.data.subject}`,
      )}&body=${encodeURIComponent(body)}`;

      setIsSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 text-sm';

  return (
    <AnimatedSection className="py-32 px-6 relative">
      <div id="contact" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        <motion.span
          className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          Let's <span className="gradient-text">Connect</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind or want to collaborate? Drop me a message and I'll get back to you within 24 hours.
            </p>
            {[
              { icon: Mail, label: 'alliareeb650@gmail.com', href: 'mailto:alliareeb650@gmail.com' },
               { icon: Phone, label: '03306528075', href: 'tel:03306528075' },
               { icon: MapPin, label: 'North Karachi, Karachi, Pakistan' },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="glass rounded-xl p-4 flex items-center gap-4 hover:neon-border transition-all duration-500"
                whileHover={{ y: -2 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                {item.href ? (
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <input placeholder="Your Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <input placeholder="Subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className={inputClass} />
              {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
            </div>
            <div>
              <textarea placeholder="Your Message" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={`${inputClass} resize-none`} />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>
             <MagneticButton className="w-full">
               <Button
                type="submit"
                disabled={isSubmitting}
                 className="h-14 w-full rounded-lg neon-glow-box"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {isSubmitting ? 'Sending...' : 'Send Message'}
               </Button>
            </MagneticButton>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 px-6 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-success-title"
          >
            <motion.div
              className="glass-strong relative w-full max-w-md overflow-hidden rounded-lg border-primary/40 p-9 text-center neon-glow-box"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            >
              <div className="absolute inset-0 radial-glow opacity-70 pointer-events-none" />
              <motion.div
                className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/50 bg-primary/10"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 280, damping: 16 }}
              >
                <CheckCircle className="h-10 w-10 text-neon-glow" />
              </motion.div>
              <div className="relative">
                <p className="mb-2 font-mono text-xs uppercase text-primary">Transmission complete</p>
                <h3 id="message-success-title" className="mb-3 text-2xl font-bold text-foreground">Message sent successfully</h3>
                <p className="mb-7 text-sm leading-relaxed text-muted-foreground">Thank you for reaching out. M. Areeb will get back to you within 24 hours.</p>
                <Button onClick={() => setIsSuccess(false)} className="h-11 w-full rounded-lg">Done</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
};

export default ContactSection;
