import CircularGallery from "../components/CircularGallery";
import AnimatedOnScrollRight from "../components/AnimatedOnScrollRight";

const Gallery = () => {
  return (
    <section className="bg-[#050505] w-full pt-16 pb-4 px-4 md:px-12" id="gallery">
      <div className="max-w-6xl mx-auto text-center">
        <AnimatedOnScrollRight offsetX={200} duration={0.8}>
        <h2 className="text-5xl font-extrabold text-white text-center mb-6 font-[Poppins] uppercase">Work showcase</h2>
          <div className="w-16 h-1 bg-white mx-auto mt-2"/>
        </AnimatedOnScrollRight>
            <div className="relative h-[500px] sm:h-[600px]">
            <CircularGallery
            bend={1}
            textColor="#ffffff"
            borderRadius={0.1}
            scrollEase={0.01}
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
