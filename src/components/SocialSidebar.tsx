import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const socials = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const SocialSidebar = () => {
  return (
    <motion.div
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      {socials.map((social, i) => (
        <motion.a
          key={social.label}
          href={social.href}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all duration-300"
          data-magnetic
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7 + i * 0.1, duration: 0.4 }}
          aria-label={social.label}
        >
          <social.icon size={18} />
        </motion.a>
      ))}
      <div className="w-px h-20 bg-border mx-auto" />
    </motion.div>
  );
};

export default SocialSidebar;
