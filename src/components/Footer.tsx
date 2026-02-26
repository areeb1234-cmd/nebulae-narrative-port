import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-mono gradient-text">{'<dev />'}</span>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved. Built with passion.
        </p>
        <motion.a
          href="#"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ y: -2 }}
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  );
};

export default Footer;
