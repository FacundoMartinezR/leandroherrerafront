import AnimatedOnScrollRight from "../components/AnimatedOnScrollRight";

const About = () => {
  return (
    <section
      id="about"
      className="w-full bg-[#050505] lg:bg-[url('/background_about.png')] bg-contain bg-no-repeat bg-left-top flex flex-col md:flex-row items-center justify-center lg:justify-end py-20"
    >
      <div className="w-full md:w-1/2 h-auto md:h-full px-4 max-md:px-20 sm:px-8 py-40 max-md:py-20 flex items-center">
        <div className="flex flex-col lg:items-end items-center justify-center space-y-4">
          {/* Logo */}
          <AnimatedOnScrollRight offsetX={200} duration={1.2}>
            <h1 className="text-white text-2xl sm:text-3xl font-bold max-lg:text-center text-right">LOGO</h1>
          </AnimatedOnScrollRight>
          {/* Párrafo 1 */}
          <AnimatedOnScrollRight offsetX={200} duration={1.0}>
            <p className="text-white text-base text-xl max-lg:text-center text-right">
              My name is Elson Leandro Herrera Osorio, and I am a professional barber with over 10 years of experience. I spent 5 years working in different barbershops in Spain, where I refined my scissor techniques, customer service skills, work protocols, and sales abilities.
            </p>
          </AnimatedOnScrollRight>
          {/* Párrafo 2 */}
          <AnimatedOnScrollRight offsetX={200} duration={0.9}>
            <p className="text-white text-base text-xl max-lg:text-center text-right">
              Later, I decided to move to New Zealand, where I have continued my professional and personal growth, focusing on improving my skills in sales, client acquisition, entrepreneurship, and overall physical and mental well-being.
            </p>
          </AnimatedOnScrollRight>
        </div>
      </div>
    </section>
  );
};

export default About;
