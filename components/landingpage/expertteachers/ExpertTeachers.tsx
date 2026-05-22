"use client";

import { useState } from "react";
import Image from "next/image";
import { teachers, teacherSectionMeta } from "./teachers.data";
import { Teacher } from "./teachers.types";

const VISIBLE = 4;

function TeacherCard({ teacher }: { teacher: Teacher }) {
  const isCircle = teacher.imageShape === "circle";

  return (
    <div className="flex flex-col items-center group">
      {/* Image container */}
      <div
        className={`relative overflow-hidden w-full aspect-[3/3.5] mb-4 transition-transform duration-300 group-hover:-translate-y-1 ${
          isCircle
            ? "rounded-full w-[200px] h-[200px] aspect-auto mx-auto"
            : "rounded-2xl"
        }`}
      >
        <Image
          src={teacher.imageSrc}
          alt={teacher.name}
          fill
          sizes="(max-width: 768px) 45vw, 22vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <h3 className="font-extrabold text-[#1a2d45] text-base sm:text-lg text-center leading-snug">
        {teacher.name}
      </h3>
      <p className="text-gray-400 text-sm text-center mt-0.5">
        {teacher.qualification}
      </p>
    </div>
  );
}

export default function ExpertTeachers() {
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, teachers.length - VISIBLE);

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  const visible = teachers.slice(offset, offset + VISIBLE);

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1 h-5 bg-[#279689] rounded-full inline-block" />
            <span className="text-[#279689] font-semibold text-sm tracking-wide">
              {teacherSectionMeta.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2d45] leading-tight mb-4 whitespace-pre-line">
            {teacherSectionMeta.heading}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            {teacherSectionMeta.description}
          </p>
        </div>

        {/* ── Cards grid — desktop ── */}
        <div className="hidden sm:grid grid-cols-4 gap-6 mb-10">
          {visible.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>

        {/* ── Cards — mobile horizontal scroll ── */}
        <div className="flex sm:hidden gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide px-1 mb-8">
          {teachers.map((t) => (
            <div key={t.id} className="snap-start flex-shrink-0 w-[200px]">
              <TeacherCard teacher={t} />
            </div>
          ))}
        </div>

        {/* ── Navigation arrows (desktop) ── */}
        <div className="hidden sm:flex items-center justify-center gap-3">
          <button
            onClick={prev}
            disabled={offset === 0}
            aria-label="Previous"
            className="w-10 h-10 rounded-full border-2 border-[#279689] flex items-center justify-center text-gray-500 hover:border-blue-700 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={next}
            disabled={offset === maxOffset}
            aria-label="Next"
            className="w-10 h-10 rounded-full border-2 border-[#279689] flex items-center justify-center text-gray-500 hover:border-blue-700 hover:text-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
