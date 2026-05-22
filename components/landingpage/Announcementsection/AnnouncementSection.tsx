"use client";

import { useState } from "react";
import Image from "next/image";
import { announcements, announcementMeta, heroImageSrc } from "./announcement.data";
import { Announcement } from "./announcement.types";

const VISIBLE = 4; // 2 columns × 2 rows

/* ── Single announcement card ── */
function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <div className="flex items-stretch rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition-shadow duration-200 group">
      {/* Date badge */}
      <div className="flex flex-col items-center justify-center bg-emerald-400 text-white px-4 min-w-[72px]">
        <span className="text-2xl font-extrabold leading-none">{item.day}</span>
        <span className="text-xs font-semibold mt-0.5 tracking-wide">{item.month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-[#1a2d45] text-sm sm:text-base leading-snug">
            {item.title}
          </h4>
          <button title="next" className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-emerald-50 flex items-center justify-center flex-shrink-0 ml-2 transition-colors">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-1">
          {item.description}
        </p>
        <p className="text-gray-400 text-xs mt-2 line-clamp-1">
          {item.classes}
        </p>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function AnnouncementSection() {
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, announcements.length - VISIBLE);

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  const visible = announcements.slice(offset, offset + VISIBLE);

  return (
    <section className="bg-white py-14 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* ── Left: stacked images ── */}
        <div className="relative flex-shrink-0 w-full max-w-[340px] lg:max-w-[400px] h-[380px] sm:h-[420px]">
          {/* Dashed border box behind */}
          <div className="absolute top-4 left-4 w-[220px] h-[260px] rounded-2xl border-2 border-dashed border-emerald-400 z-0" />

          {/* Main large image */}
          <div className="absolute top-0 left-4 w-[220px] h-[260px] rounded-2xl overflow-hidden  z-10">
            <Image
              src={heroImageSrc}
              alt="Student with backpack"
              fill
              sizes="220px"
              className="object-cover object-top"
              unoptimized
            />
          </div>

          {/* Second overlapping image */}
          <div className="absolute bottom-0 right-0 w-[180px] h-[210px] rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-white">
            <Image
              src="https://i1-c.pinimg.com/736x/89/76/02/897602fdbfcbdf1fb91d911b069b0a01.jpg"
              alt="Student with megaphone"
              fill
              sizes="180px"
              className="object-cover object-top"
            />
          </div>

            {/* Decorative circles
            <div className="absolute top-[270px] left-[200px] w-8 h-8 rounded-full border-2 border-emerald-300 opacity-60 z-30" />
            <div className="absolute top-[290px] left-[224px] w-4 h-4 rounded-full border-2 border-emerald-300 opacity-40 z-30" />
            <div className="absolute top-[60px] right-[10px] w-6 h-6 rounded-full border-2 border-emerald-300 opacity-50 z-30" /> */}

          {/* Paper plane SVG decoration */}
          <svg
            className="absolute top-[100px] right-[-10px] w-20 h-20 text-emerald-400 opacity-70 z-30"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 60 Q30 20 60 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
            {/* Paper plane */}
            <g transform="translate(52,8) rotate(30)">
              <polygon points="0,0 -8,4 -6,0 -8,-4" fill="currentColor" />
            </g>
          </svg>
        </div>

        {/* ── Right: announcement cards ── */}
        <div className="flex-1 w-full">
          {/* Top row: badge + nav */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 bg-[#279689] rounded-full inline-block" />
              <span className="text-[#279689] font-semibold text-sm tracking-wide">
                {announcementMeta.badge}
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2d45] leading-tight mb-2">
            {announcementMeta.heading}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-7 max-w-md leading-relaxed">
            {announcementMeta.subtext}
          </p>

          {/* 2×2 grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visible.map((item) => (
              <AnnouncementCard key={item.id} item={item} />
            ))}
          </div>
          <div className="flex items-center justify-end mt-4">
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={offset === 0}
                aria-label="Previous"
                className="w-9 h-9 rounded-lg border-2 border-[#00d491] flex items-center justify-center text-[#00d491] hover:border-blue-700 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={offset === maxOffset}
                aria-label="Next"
                className="w-9 h-9 rounded-lg border-2 border-[#00d491] flex items-center justify-center text-[#00d491] hover:border-blue-700 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
