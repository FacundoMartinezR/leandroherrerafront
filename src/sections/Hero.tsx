import React from 'react';
import AnimatedOnScrollRight from '../components/AnimatedOnScrollRight';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative w-full max-md:h-[1200px] h-screen max-md:bg-[url('/bg_hero_mobile.png')] bg-[url('/background_hero.png')] bg-cover bg-center overflow-hidden"
    >
      {/* CONTENIDO */}
      <div className="relative z-10 h-full px-4 md:px-8 flex flex-col max-md:justify-start max-md:pt-40 items-start justify-center">
        {/* Columna izquierda: texto y botones */}
        <div className="w-full max-w-4xl justify-start flex flex-col text-left items-center">
          <div className="text-white text-center">
            {/* Pre-títulos */} 
            <AnimatedOnScrollRight offsetX={200} duration={1.4}>
              <div className="mb-2 md:mb-0">
                <p className="font-['Oswald',sans-serif] text-xl md:text-3xl font-bold">
                  TAKE YOUR <span className="text-[#bb0501]">CAREER</span>
                </p>
                <p className="font-['Oswald',sans-serif] text-2xl md:text-4xl font-bold">
                  FOR THE <span className="text-[#bb0501]">NEXT LEVEL</span>
                </p>
              </div>
            </AnimatedOnScrollRight>

            {/* Título principal */}
            <AnimatedOnScrollRight offsetX={200} duration={1.2}>
              <h1 className="font-['Horizon',sans-serif] font-extrabold leading-[0.9] mt-4 md:mt-6 mb-3 md:mb-4">
                <span className="text-[60px] md:text-[80px]">LEANDRO</span>
                <br />
                <span className="text-[65px] md:text-[92px]">
                  HERRERA
                </span>
              </h1>
            </AnimatedOnScrollRight>

            {/* Subtítulo */}
            <AnimatedOnScrollRight offsetX={200} duration={1.0}>
              <p className="font-['Oswald',sans-serif] text-[24px] md:text-[32px] mb-6 md:mb-12 max-md:mt-4">
                PROFESSIONAL BARBER
              </p>
            </AnimatedOnScrollRight>

            {/* Botones CTA con efecto paralelogramo */}
            <AnimatedOnScrollRight offsetX={200} duration={0.8}>
              <div className="flex flex-row max-md:flex-col gap-4 sm:gap-12 justify-center items-center max-md:gap-8 max-md:mt-12">
              <a
                href="#services"
                className="inline-block transform skew-x-[-28deg] bg-[#bb0501] px-20 py-4 hover:bg-[#a00400] transition-colors"
              >
                <span className="block transform skew-x-[28deg] font-bold text-sm sm:text-base text-white">
                  PRICING
                </span>
              </a>

              <a
                href="#"
                className="inline-block transform skew-x-[-28deg] bg-white px-20 py-4 hover:bg-gray-200 transition-colors"
              >
                <span className="block transform skew-x-[28deg] font-bold text-[#bb0501] text-sm sm:text-base">
                  TRAILER
                </span>
              </a>
            </div>
            </AnimatedOnScrollRight>
          </div>
        </div>
      </div>
      
      {/* Agregar estilos de texto responsivos en el globals.css */}
      {/* Mueve las clases .text-clamp-* a tu archivo globals.css */}
    </section>
  );
};

export default Hero;