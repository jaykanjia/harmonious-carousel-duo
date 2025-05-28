
import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: number;
  image: string;
  title: string;
}

const DualCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const mainCarouselRef = useRef<HTMLDivElement>(null);
  const thumbCarouselRef = useRef<HTMLDivElement>(null);

  // Extended sample data with 15 images
  const items: CarouselItem[] = [
    { id: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", title: "Mountain Vista" },
    { id: 2, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", title: "Ocean Waves" },
    { id: 3, image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800", title: "Tropical Beach" },
    { id: 4, image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800", title: "Forest Path" },
    { id: 5, image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800", title: "Desert Landscape" },
    { id: 6, image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800", title: "Sunset View" },
    { id: 7, image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800", title: "City Skyline" },
    { id: 8, image: "https://images.unsplash.com/photo-1464822759844-d150baec3e5d?w=800", title: "Snow Mountains" },
    { id: 9, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", title: "Green Forest" },
    { id: 10, image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800", title: "Lake Reflection" },
    { id: 11, image: "https://images.unsplash.com/photo-1418065460487-3d7dd550c390?w=800", title: "River Valley" },
    { id: 12, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", title: "Golden Hour" },
    { id: 13, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800", title: "Misty Hills" },
    { id: 14, image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800", title: "Autumn Colors" },
    { id: 15, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", title: "Alpine Peak" },
  ];

  // Update container height when main carousel changes
  useEffect(() => {
    const updateHeight = () => {
      if (mainCarouselRef.current) {
        const height = mainCarouselRef.current.offsetHeight;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Scroll thumbnail carousel to keep active item visible
  useEffect(() => {
    if (thumbCarouselRef.current && containerHeight > 0) {
      const thumbHeight = 80; // Fixed thumbnail height
      const scrollTop = currentIndex * (thumbHeight + 8) - (containerHeight / 2) + (thumbHeight / 2); // 8px is gap
      thumbCarouselRef.current.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      });
    }
  }, [currentIndex, containerHeight]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const scrollThumbUp = () => {
    if (thumbCarouselRef.current) {
      thumbCarouselRef.current.scrollBy({ top: -100, behavior: 'smooth' });
    }
  };

  const scrollThumbDown = () => {
    if (thumbCarouselRef.current) {
      thumbCarouselRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex gap-4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Thumbnail Carousel - Vertical */}
        <div className="relative w-24" style={{ height: containerHeight || 'auto' }}>
          {/* Scroll Up Button */}
          <button
            onClick={scrollThumbUp}
            className="absolute top-0 left-0 right-0 z-10 bg-black/50 hover:bg-black/70 text-white p-2 transition-colors"
          >
            <ChevronUp className="w-4 h-4 mx-auto" />
          </button>

          {/* Thumbnail Container */}
          <div
            ref={thumbCarouselRef}
            className="h-full overflow-y-auto scrollbar-hide px-2 py-8"
          >
            <div className="flex flex-col gap-2">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                    index === currentIndex
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Scroll Down Button */}
          <button
            onClick={scrollThumbDown}
            className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 hover:bg-black/70 text-white p-2 transition-colors"
          >
            <ChevronDown className="w-4 h-4 mx-auto" />
          </button>
        </div>

        {/* Main Carousel */}
        <div className="flex-1 relative">
          <div ref={mainCarouselRef} className="w-full aspect-square relative overflow-hidden rounded-lg">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="w-full h-full">
              <img
                src={items[currentIndex].image}
                alt={items[currentIndex].title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Title */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">{items[currentIndex].title}</h3>
                <p className="text-sm opacity-90">{currentIndex + 1} / {items.length}</p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualCarousel;
