import CountUp from "../components/CountUp";

const Statics = () => {
  return (
    <div className="relative w-full h-50 max-lg:h-120 flex items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute z-10 text-white text-5xl font-bold flex max-lg:flex-col max-lg:gap-6 items-center justify-between w-full max-w-5xl p-8">
        <div className="flex flex-col items-center justify-center">
          <span className="inline-block font-bold text-6xl font-[Poppins]">
            <CountUp
              from={0}
              to={30}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
            +</span>
          <span className="text-lg font-semibold text-gray-400">STUDENTS GRADUATED</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="inline-block font-bold text-6xl font-[Poppins]">
            <CountUp
              from={0}
              to={800}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
            +</span>
          <span className="text-lg font-semibold text-gray-400">PRACTICE HOURS</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="inline-block font-bold text-6xl font-[Poppins]">
            <CountUp
              from={0}
              to={8}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
            />
            +</span>
          <span className="text-lg font-semibold text-gray-400">YEARS OF EXPERIENCE</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="inline-block font-bold text-6xl font-[Poppins]">
            <CountUp
              from={0}
              to={10}
              separator=","
              direction="up"
              duration={1}
            />
            +</span>
          <span className="text-lg font-semibold text-gray-400">MODERN TECHNIQUES</span>
        </div>
      </div>
    </div>
  )
}

export default Statics;
