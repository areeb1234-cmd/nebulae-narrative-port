import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Clock, Video, MapPin, Loader2, CheckCircle, User, Mail, Phone } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const services = ['Web Development', 'Mobile App', '3D & Interactive', 'UI/UX Design', 'Digital Marketing', 'Full-Stack Project', 'Consultation'];

const bookingSchema = z.object({
  fullName: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().trim().min(1, 'Phone is required').max(20),
  service: z.string().min(1, 'Select a service'),
  date: z.date({ required_error: 'Select a date' }),
  message: z.string().max(1000).optional(),
});

const BookingSection = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse({ ...form, date });
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
      const { error } = await supabase.from('bookings').insert({
        full_name: result.data.fullName,
        email: result.data.email,
        phone: result.data.phone,
        service: result.data.service,
        booking_date: result.data.date.toISOString().split('T')[0],
        message: result.data.message || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({ title: 'Booking confirmed!', description: "We'll send you a confirmation email shortly." });
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 text-sm';

  return (
    <AnimatedSection className="py-32 px-6 relative">
      <div id="booking" className="absolute -top-20" />
      <div className="max-w-5xl mx-auto">
        <motion.span
          className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Schedule a Call
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          Book a <span className="gradient-text">Service</span>
        </h2>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              className="glass rounded-2xl p-12 neon-border text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle size={64} className="text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Booking Confirmed!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you, {form.fullName}. We've received your booking and will get back to you at {form.email}.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setForm({ fullName: '', email: '', phone: '', service: '', message: '' });
                  setDate(undefined);
                }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Book Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 neon-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left - Calendar */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    Select Date
                  </h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date() || d.getDay() === 0 || d.getDay() === 6}
                    className={cn("p-3 pointer-events-auto rounded-xl bg-secondary/50")}
                  />
                  {errors.date && <p className="text-xs text-destructive mt-2">{errors.date}</p>}
                </div>

                {/* Right - Form */}
                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input placeholder="Full Name" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} className={`${inputClass} pl-10`} />
                    </div>
                    {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input placeholder="Email Address" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={`${inputClass} pl-10`} />
                    </div>
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input placeholder="Phone Number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={`${inputClass} pl-10`} />
                    </div>
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <select
                      value={form.service}
                      onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                      className={inputClass}
                    >
                      <option value="">Select a Service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
                  </div>
                  <div>
                    <textarea
                      placeholder="Message (optional)"
                      rows={3}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      'w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2',
                      'bg-primary text-primary-foreground neon-glow-box hover:bg-primary/90 disabled:opacity-50'
                    )}
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
                    {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
};

export default BookingSection;
