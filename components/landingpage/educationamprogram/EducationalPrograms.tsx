"use client";

import { useState } from "react";
import Image from "next/image";
import { programs, sectionMeta } from "./educationalPrograms.data";
import { Program } from "./educationalPrograms.types";

const VISIBLE = 4;

/* ─── Wave divider at the TOP (flipped from HeroCarousel's bottom wave) ─── */
function WaveTop() {
  const backPath = `M0,0 L0,84 Q360,30 720,96 Q1080,138 1440,78 L1440,0 Z`;
  const frontPath = `M0,0 L0,66 Q360,12 720,78 Q1080,120 1440,58 L1440,0 Z`;

  return (
    <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none overflow-hidden">
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

function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0 w-[260px] sm:w-[280px] md:w-[calc(25%-12px)]">
      <div className="relative h-[300px] sm:h-[320px] w-full overflow-hidden">
        <Image
          src={program.imageSrc}
          alt={program.alt}
          fill
          sizes="(max-width: 768px) 280px, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-bold text-base sm:text-lg leading-tight drop-shadow">
          {program.title}
        </p>
        <p
          className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full inline-block"
          style={{ backgroundColor: program.color, color: "#fff" }}
        >
        </p>
      </div>
    </div>
  );
}

export default function EducationalPrograms() {
  const [offset, setOffset] = useState(0);
  const maxOffset = programs.length - VISIBLE;

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  const visiblePrograms = programs.slice(offset, offset + VISIBLE);

  return (
    <section className="relative bg-[#f0f4f8] pt-24 pb-14 px-4 sm:px-8 overflow-hidden">

      {/* ── Top wave (mirrors HeroCarousel's bottom wave, flipped) ── */}
      <WaveTop />

      {/* Decorative icons */}
      {/* <div className="absolute top-10 left-6 opacity-60 pointer-events-none select-none text-5xl">🎒</div> */}
      <div className="absolute bottom-6 right-6 opacity-60 pointer-events-none select-none text-5xl">🎨</div>

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-1 h-5 bg-teal-600 rounded-full inline-block" />
          <span className="text-teal-600 font-semibold text-sm tracking-wide">
            {sectionMeta.badge}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2d45] leading-tight mb-4">
          {sectionMeta.heading}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          {sectionMeta.description}
        </p>
      </div>

      {/* Cards — desktop grid */}
      <div className="hidden md:flex gap-4 max-w-6xl mx-auto">
        {visiblePrograms.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>

      {/* Cards — mobile horizontal scroll */}
      <div className="flex md:hidden gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide px-1">
        {programs.map((p) => (
          <div key={p.id} className="snap-start flex-shrink-0">
            <ProgramCard program={p} />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="hidden md:flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          disabled={offset === 0}
          aria-label="Previous"
          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-teal-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: maxOffset + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setOffset(i)}
              aria-label={`Go to set ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === offset
                  ? "w-5 h-2 bg-teal-500"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={offset === maxOffset}
          aria-label="Next"
          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 hover:border-teal-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}