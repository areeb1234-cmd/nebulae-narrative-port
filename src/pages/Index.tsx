import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingSection from '@/components/BookingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import SocialSidebar from '@/components/SocialSidebar';
import SplashScreen from '@/components/SplashScreen';
import DarkModeToggle from '@/components/DarkModeToggle';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <SocialSidebar />
          <DarkModeToggle />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ServicesSection />
          <TestimonialsSection />
          <BookingSection />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
