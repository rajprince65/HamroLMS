"use client";

import { useState } from "react";
import Image from "next/image";
import {
  galleryItems,
  galleryCategories,
  gallerySectionMeta,
} from "./gallery.data";
import { GalleryCategory, GalleryItem } from "./gallery.types";

const VISIBLE = 8;

/* ── Lightbox overlay ── */
function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.imageSrc}
          alt={item.alt}
          width={900}
          height={600}
          className="object-cover w-full h-full"
          unoptimized
        />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
          <p className="text-white text-sm font-semibold">{item.alt}</p>
          <span className="text-xs text-emerald-300 font-medium">
            {item.category}
          </span>
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Single gallery card ── */
function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3]"
      onClick={onClick}
    >
      <Image
        src={item.imageSrc}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        unoptimized
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#1a2d45]/0 group-hover:bg-[#1a2d45]/50 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </div>
          <span className="text-white text-xs font-semibold bg-emerald-500 px-3 py-0.5 rounded-full">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Gallery Section ── */
export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [offset, setOffset] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((i) => i.category === activeCategory);

  const maxOffset = Math.max(0, filtered.length - VISIBLE);
  const visible = filtered.slice(offset, offset + VISIBLE);

  const handleCategoryChange = (cat: GalleryCategory) => {
    setActiveCategory(cat);
    setOffset(0);
  };

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <>
      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}

      <section className="bg-[#ffffff] py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">

          {/* ── Header ── */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-1 h-5 bg-[#279689] rounded-full inline-block" />
              <span className="text-[#279689] font-semibold text-sm tracking-wide">
                {gallerySectionMeta.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2d45] leading-tight mb-4">
              {gallerySectionMeta.heading}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              {gallerySectionMeta.description}
            </p>
          </div>

          {/* ── Category filter tabs ── */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#279689] text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-[#279689] hover:text-[#279689]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Image grid ── */}
          {visible.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {visible.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onClick={() => setLightboxItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-16 text-sm">
              No images found for this category.
            </div>
          )}

          {/* ── Navigation arrows ── */}
          {filtered.length > VISIBLE && (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={prev}
                disabled={offset === 0}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#279689] hover:text-[#279689] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page dots */}
              <div className="flex gap-1.5">
                {Array.from({
                  length: Math.ceil(filtered.length / VISIBLE),
                }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setOffset(i * (VISIBLE > 1 ? 1 : 1))}
                    aria-label={`Page ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      offset === i
                        ? "w-5 h-2 bg-[#279689]"
                        : "w-2 h-2 bg-gray-300 hover:bg-[#279689]"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={offset === maxOffset}
                aria-label="Next"
                className="w-10 h-10 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-[#279689] hover:text-[#279689] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
