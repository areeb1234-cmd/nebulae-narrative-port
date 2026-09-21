import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';

const socials = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid sm:grid-cols-3 gap-8 items-center">
          <div>
            <span className="text-2xl font-bold gradient-text font-mono block mb-2">{'<M. Areeb />'}</span>
            <p className="text-xs text-muted-foreground">Creative Developer</p>
          </div>

          <div className="flex justify-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border transition-all duration-300"
                whileHover={{ y: -3 }}
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          <div className="text-right">
            <motion.a
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mb-2"
              whileHover={{ y: -2 }}
            >
              Back to top ↑
            </motion.a>
            <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
              © {new Date().getFullYear()} Made with <Heart size={10} className="text-primary" /> by M. Areeb
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
