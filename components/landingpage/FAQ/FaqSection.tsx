"use client";

import { useState } from "react";
import { faqItems, faqSectionMeta } from "./faq.data";
import { FaqItem } from "./faq.types";

/* ── Single accordion item ── */
function FaqAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-gray-200 bg-white shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Question row */}
      <button
        title="FAQ"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`font-bold text-sm sm:text-base transition-colors duration-200 ${
            isOpen ? "text-[#1a2d45]" : "text-[#1a2d45]"
          }`}
        >
          {item.id}. {item.question}
        </span>

        {/* Icon: minus when open, plus when closed */}
        <span
          className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isOpen
              ? "bg-[#1a2d45] text-white"
              : "bg-[#1a2d45] text-white group-hover:bg-[#243d5c]"
          }`}
        >
          {isOpen ? (
            // Minus icon
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          ) : (
            // Plus icon
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </span>
      </button>

      {/* Answer — animated expand/collapse */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-gray-500 text-sm sm:text-base leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

/* ── Main FAQ section ── */
export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-[#f0f4f8] py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1 h-5 bg-[#279689] rounded-full inline-block" />
            <span className="text-[#279689] font-semibold text-sm tracking-wide">
              {faqSectionMeta.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2d45] leading-tight mb-4">
            {faqSectionMeta.heading}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            {faqSectionMeta.description}
          </p>
        </div>

        {/* ── Accordion list ── */}
        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <FaqAccordion
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
