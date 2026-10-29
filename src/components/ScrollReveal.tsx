import React, { type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  scale?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 36,
  className = '',
  scale = true,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPos,
        scale: scale ? 0.97 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 28,
        mass: 0.8,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Top Apple hairline scroll progress indicator
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.04] z-50 pointer-events-none">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-full bg-gradient-to-r from-[#2997ff] via-[#64d2ff] to-[#bf5af2]"
      />
    </div>
  );
};
