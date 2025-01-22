import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    url: '../../public/images/USD_campus.jpg',
    title:"USD CAMPUS"
  },
  {
    url: "../../public/images/Snow-Campus.jpg",
    title: "USD CAMPUS"
  },
  {
    url: "../../public/images/USD-44929.jpg",
    title: "USD CAMPUS"
  }
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="h-screen w-full relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500 relative"
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="flex flex-col items-center justify-center h-full text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center px-4">
              Bangaldesh Student Association
            </h1>
            <p className="text-xl md:text-2xl text-center px-4">
              Celebrating the Rich Cultural Heritage of Bangaldesh
            </p>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <ChevronLeft size={30} />
      </button>
      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
};