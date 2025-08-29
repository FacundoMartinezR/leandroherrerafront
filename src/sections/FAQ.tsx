import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AnimatedOnScrollRight from '../components/AnimatedOnScrollRight';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Ask nro 1?',
    answer:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Ask nro 2?',
    answer:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Ask nro 3?',
    answer:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Ask nro 4?',
    answer:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#050505] py-16 px-4 sm:px-8 lg:px-16" id="faq">
      <div className="max-w-3xl mx-auto">
        <AnimatedOnScrollRight offsetX={200} duration={0.8}>
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-[Poppins] text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="w-16 h-1 bg-white mx-auto mt-2 mb-10" />
        </AnimatedOnScrollRight>
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-transparent border-b border-gray-700">
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex justify-between items-center px-6 py-4 focus:outline-none text-white text-lg font-medium"
                >
                  <span>{item.question}</span>
                  <span className="ml-4">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out px-6 pb-4 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {isOpen && <p className="text-white">{item.answer}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
