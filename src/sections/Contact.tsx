import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa';
import AnimatedOnScrollRight from '../components/AnimatedOnScrollRight';

const socialLinks = [
  { icon: <FaFacebookF />, url: 'https://www.facebook.com/yourpage', label: 'Facebook' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/yourprofile', label: 'Instagram' },
  { icon: <FaTiktok />, url: 'https://www.tiktok.com/@yourprofile', label: 'TikTok' },
  { icon: <FaEnvelope />, url: 'mailto:youremail@gmail.com', label: 'Email' },
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-[#050505] py-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center text-white">
        <AnimatedOnScrollRight offsetX={200} duration={1.2}>
      <h2 className="text-5xl font-extrabold text-white text-center mb-6 font-[Poppins] uppercase">CONTACT US</h2>
      <div className="w-16 h-1 bg-white mx-auto mt-2 mb-10" />
        </AnimatedOnScrollRight>
        <AnimatedOnScrollRight offsetX={200} duration={1}>
          <p className="mb-8 text-gray-300">
            We'd love to hear from you! Follow us on social media or send us an email.
          </p>
        </AnimatedOnScrollRight>
        <AnimatedOnScrollRight offsetX={200} duration={0.8}>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-transform transform hover:scale-110"
              aria-label={link.label}
            >
              <span className="text-2xl text-white">{link.icon}</span>
            </a>
          ))}
        </div>
        </AnimatedOnScrollRight>
      </div>
    </section>
  );
};

export default Contact;
