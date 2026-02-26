import { motion } from 'framer-motion';

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const StaggeredText = ({ text, className = '', delay = 0 }: StaggeredTextProps) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 40, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export default StaggeredText;
