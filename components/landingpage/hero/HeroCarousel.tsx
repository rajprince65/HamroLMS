"use client";

import { useState, useEffect } from "react";
import { heroSlides } from "../landingData";

function CloudDivider() {
  const backPath = `M0,120 L0,36 Q360,90 720,24 Q1080,-18 1440,42 L1440,120 Z`;
  const frontPath = `M0,120 L0,54 Q360,108 720,42 Q1080,0 1440,62 L1440,120 Z`;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[80px] sm:h-[100px] md:h-[120px]"
      >
        <path d={backPath} fill="rgba(255, 255, 255, 0.17)" />
        <path d={frontPath} fill="#ffffff" />
      </svg>
    </div>
  );
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const goTo = (idx: number) => {
    const next = (idx + heroSlides.length) % heroSlides.length;
    setCurrent(next);
  };

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[420px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden">

      {/* Background images */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          aria-hidden="true"
        >
          {heroSlides.map((s) => (
            <div
              key={s.id}
              className="min-w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${s.imageSrc}')` }}
            />
          ))}
        </div>
      </div>

      <CloudDivider />

      {/* Prev arrow */}
      <button
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md rounded-lg w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md rounded-lg w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-12 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-2 sm:w-6 sm:h-2.5 bg-white"
                : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}