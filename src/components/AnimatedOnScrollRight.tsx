// src/components/AnimatedOnScroll.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Props {
  children: React.ReactNode;
  /** Umbral para que comience la animación (0–1) */
  threshold?: number;
  /** Distancia inicial en px (positiva = viene desde la derecha) */
  offsetX?: number;
  duration?: number;
}

const AnimatedOnScrollRight: React.FC<Props> = ({
  children,
  threshold = 0.2,
  offsetX = 100,
  duration = 0.6,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  return (
    <motion.div
  ref={ref}
  initial={{
    opacity: 0,
    x: -offsetX,            // ← negativo para venir desde la izquierda
    filter: 'blur(4px)',    // ← empieza algo difuminado
  }}
  animate={
    inView
      ? { opacity: 1, x: 0, filter: 'blur(0px)' }
      : {}
  }
  transition={{
    duration,
    ease: 'easeOut',
  }}
>
  {children}
</motion.div>
  );
};

export default AnimatedOnScrollRight;
