import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import Jordan from "../assets/avatar_jordan.jpg";
import Alex from "../assets/avatar_alex.jpg";
import Samantha from "../assets/avatar_women.jpg";
import AnimatedOnScrollRight from '../components/AnimatedOnScrollRight';

interface Testimonial {
  author: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number; // 1 to 5 stars
}

const testimonials: Testimonial[] = [
  {
    author: 'Alex Mercer',
    role: 'Barber Shop Owner',
    avatar: Alex,
    quote: 'This mentorship program transformed my business. The insights on branding and customer engagement were invaluable.',
    rating: 5,
  },
  {
    author: 'Samantha Ray',
    role: 'Barbering Influencer',
    avatar: Samantha,
    quote: 'The techniques I learned here elevated my skills to a whole new level. Highly recommend for anyone serious about barbering.',
    rating: 4,
  },
  {
    author: 'Jordan Steele',
    role: 'Barber Novice',
    avatar: Jordan,
    quote: 'As someone new to the industry, this mentorship provided me with the foundational skills I needed to start my career confidently.',
    rating: 5,
  },
];

const variants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

const Testimonials: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const testimonialIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <section className="relative w-full py-18 bg-[url('/background_varios.png')] bg-cover bg-center overflow-hidden" id="testimonials">
        <AnimatedOnScrollRight offsetX={200} duration={0.8}>
      <h2 className="text-5xl font-extrabold text-white text-center mb-6 font-[Poppins] uppercase">TESTIMONIALS</h2>
      <div className="w-16 h-1 bg-white mx-auto mt-2 mb-10" />
        </AnimatedOnScrollRight>
      <div className="relative max-w-xl mx-auto h-78 max-md:w-[80%] max-md:h-[400px]">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 bg-gray-800 rounded-2xl p-8 text-white shadow-2xl flex flex-col items-center text-center"
          >
            <img
              src={testimonials[testimonialIndex].avatar}
              alt={testimonials[testimonialIndex].author}
              className="w-20 h-20 rounded-full border-2 border-indigo-400 mb-4"
            />
            <p className="italic text-lg mb-4">“{testimonials[testimonialIndex].quote}”</p>

            {/* Stars */}
            <div className="flex mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`mr-1 ${i < testimonials[testimonialIndex].rating ? 'text-yellow-400' : 'text-gray-600'}`}
                />
              ))}
            </div>

            <span className="font-bold text-xl">{testimonials[testimonialIndex].author}</span>
            <span className="text-indigo-300 text-sm">{testimonials[testimonialIndex].role}</span>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={() => paginate(-1)}
          className="absolute top-1/2 left-[-100px] transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 transition z-10 max-md:left-[-14px]"
        >
          <FaChevronLeft className="text-white" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute top-1/2 right-[-100px] transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur hover:bg-white/30 transition z-10 max-md:right-[-14px]"
        >
          <FaChevronRight className="text-white" />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
