import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        navbar
        fixed top-0 left-0 right-0 z-50
        text-neutral-content
        transition-colors duration-300 lg:pl-42
        ${scrolled ? 'bg-[#050505]' : 'bg-transparent'}
      `}
    >
      {/* Izquierda: logo + hamburguesa */}
      <div className="flex items-center justify-start w-full lg:w-auto px-4">
        <div className="relative lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost p-2"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {menuOpen && (
            <ul className="absolute top-full left-0 mt-2 w-48 bg-[#050505] rounded shadow-lg z-50 flex flex-col divide-y divide-gray-700">
              {[
                ['#home','HOME'],
                ['#about','ABOUT ME'],
                ['#services','SERVICES'],
                ['#gallery','MY WORK'],
                ['#testimonials','TESTIMONIALS'],
                ['#faq','FAQ'],
                ['#contact','CONTACT'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block px-4 py-2 text-white font-[Poppins] font-bold hover:bg-gray-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <a className="ml-4 text-3xl font-bold">LOGO</a>
      </div>

      {/* Centro: menú desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li><a className="text-white text-sm font-[Poppins] font-bold" href="#home">HOME</a></li>
          <li><a className="text-white text-sm font-[Poppins] font-bold" href="#about">ABOUT ME</a></li>
          <li><a className="text-white text-sm font-[Poppins] font-bold" href="#services">SERVICES</a></li>
          <li><a className="text-white text-sm font-[Poppins] font-bold" href="#gallery">MY WORK</a></li>
          <li><a className="text-white text-sm font-[Poppins] font-bold" href="#testimonials">TESTIMONIALS</a></li>
          <li><a className="text-white text-sm font-[Poppins] font-bold" href="#faq">FAQ</a></li>
          <li><a className="text-white text-sm font-[Poppins] font-bold" href="#contact">CONTACT</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
