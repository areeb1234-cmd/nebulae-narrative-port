import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Clock, Video, MapPin } from 'lucide-react';

const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

const BookingSection = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState<'video' | 'inperson'>('video');

  return (
    <AnimatedSection className="py-32 px-6 relative">
      <div id="booking" className="absolute -top-20" />
      <div className="max-w-4xl mx-auto">
        <motion.span
          className="text-sm font-mono text-primary tracking-widest uppercase mb-4 block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Schedule a Call
        </motion.span>
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
          Book a <span className="gradient-text">Meeting</span>
        </h2>

        <div className="glass rounded-2xl p-8 neon-border">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar */}
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
            </div>

            {/* Time & Options */}
            <div>
              {/* Meeting type */}
              <h3 className="font-semibold mb-4">Meeting Type</h3>
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => setMeetingType('video')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300',
                    meetingType === 'video'
                      ? 'bg-primary text-primary-foreground'
                      : 'glass text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Video size={16} /> Video Call
                </button>
                <button
                  onClick={() => setMeetingType('inperson')}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300',
                    meetingType === 'inperson'
                      ? 'bg-primary text-primary-foreground'
                      : 'glass text-muted-foreground hover:text-foreground'
                  )}
                >
                  <MapPin size={16} /> In Person
                </button>
              </div>

              {/* Time slots */}
              <h3 className="font-semibold mb-4">Available Times</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-mono transition-all duration-300',
                      selectedTime === time
                        ? 'bg-primary text-primary-foreground neon-glow-box'
                        : 'glass text-muted-foreground hover:text-foreground hover:neon-border'
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Confirm */}
              <button
                className={cn(
                  'w-full mt-8 py-3 rounded-xl font-medium transition-all duration-300',
                  date && selectedTime
                    ? 'bg-primary text-primary-foreground neon-glow-box hover:bg-primary/90'
                    : 'bg-secondary text-muted-foreground cursor-not-allowed'
                )}
                disabled={!date || !selectedTime}
              >
                {date && selectedTime ? 'Confirm Booking' : 'Select date & time'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BookingSection;
