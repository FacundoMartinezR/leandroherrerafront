import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export interface ServiceCardProps {
  id: string;
  badge?: {
    text: string;
    backgroundColor?: string;
    textColor?: string;
  };
  title: string;
  price: number;
  description: string;
  features: string[];
  actionText: string;
  duration: number;
  onAction: () => void;
}

// Typing variants to satisfy TS
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    transition: { duration: 0.3 },
  },
};

const ServiceCard: React.FC<ServiceCardProps> = ({

  badge,
  title,
  description,
  features,
  actionText,
  onAction,
}) => {
  const badgeStyle: React.CSSProperties | undefined = badge
    ? {
        backgroundColor: badge.backgroundColor || '#FFB400',
        color: badge.textColor || '#000',
      }
    : undefined;

  return (
    <motion.div
      className="relative bg-gray-900 rounded-2xl p-6 w-80 h-full flex flex-col justify-between border border-transparent hover:border-white/20"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover="hover"
    >
      {/* Neon glow behind card */}
      <div className="absolute inset-0 rounded-2xl blur-xl bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-400 opacity-20 pointer-events-none" />

      {/* Badge opcional */}
      {badge && (
        <span
          className="absolute top-[-10px] left-4 px-3 py-1 rounded-full text-xs font-semibold"
          style={badgeStyle}
        >
          {badge.text}
        </span>
      )}

      {/* Icon and title */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h3 className="text-2xl font-extrabold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{description}</p>
      </div>

      {/* Feature list */}
      <ul className="relative z-10 flex-1 mb-6 space-y-2 text-gray-200 text-sm">
        {features.map((feat, idx) => (
          <li key={idx} className="flex items-center">
            <span className="block w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse" />
            {feat}
          </li>
        ))}
      </ul>

      {/* Action button */}
      <div className="relative z-10">
        <motion.button
          className="w-full py-3 bg-[#bb0501] hover:bg-[#a00401] cursor-pointer rounded-lg text-white font-semibold uppercase tracking-wide shadow-md"
          whileHover={{ scale: 1.03, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onAction}
        >
          {actionText}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
