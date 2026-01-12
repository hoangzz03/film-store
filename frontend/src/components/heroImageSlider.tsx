import React, { useState, useEffect, useCallback } from 'react';

interface HeroSlide {
    id: number;
    imageUrl: string;
    title: string;
    subtitle?: string;
}

const HeroImageSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Example hero slides data
    const heroSlides: HeroSlide[] = [
        {
            id: 1,
            imageUrl: "/pshome.jpg",
            title: "Vintage Film Photography",
            subtitle: "Discover the beauty of analog moments"
        },
        {
            id: 2,
            imageUrl: "/ps2.webp",
            title: "Classic Camera Collection",
            subtitle: "Explore our selection of timeless designs"
        },
        {
            id: 3,
            imageUrl: "/filmshop.webp",
            title: "Film Photography Workshops",
            subtitle: "Learn the art of analog photography"
        }
    ];

    const TOTAL_SLIDES = heroSlides.length;

    const handlePrevious = useCallback(() => {
        setCurrentSlide(prevSlide => (prevSlide === 0 ? TOTAL_SLIDES - 1 : prevSlide - 1));
    }, [TOTAL_SLIDES]);

    const handleNext = useCallback(() => {
        setCurrentSlide(prevSlide => (prevSlide === TOTAL_SLIDES - 1 ? 0 : prevSlide + 1));
    }, [TOTAL_SLIDES]);

    const goToSlide = useCallback((slideIndex: number) => {
        setCurrentSlide(slideIndex);
    }, []);

    // Auto slide every 6 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            handleNext();
        }, 4000);

        return () => clearTimeout(timer);
    }, [currentSlide, handleNext]);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="w-full relative overflow-hidden bg-gray-900 rounded-lg shadow-xl">
            {/* Max height container */}
            <div className="relative max-h-96 overflow-hidden">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                        <div className="w-12 h-12 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Slider container */}
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {heroSlides.map((slide) => (
                                <div key={slide.id} className="flex-shrink-0 w-full relative">
                                    {/* Image */}
                                    <div className="relative h-96 w-full">
                                        <img
                                            src={slide.imageUrl}
                                            alt={slide.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    </div>

                                    {/* Content overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                        <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                                        {slide.subtitle && (
                                            <p className="text-xl text-gray-200">{slide.subtitle}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation buttons */}
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all duration-300 z-10 backdrop-blur-sm"
                            aria-label="Previous slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all duration-300 z-10 backdrop-blur-sm"
                            aria-label="Next slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Dot indicators */}
            {!isLoading && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-3 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                                ? 'bg-white scale-110'
                                : 'bg-white/40 hover:bg-white/60'
                                }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroImageSlider;