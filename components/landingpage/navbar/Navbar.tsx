"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { navItems, schoolLogo } from "../landingData";
import type { NavItem } from "../index";

/* ─── Logo ─── */
function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 flex-shrink-0">
      <div className="relative w-[46px] h-[46px] flex-shrink-0">
        <Image
          src={schoolLogo.png}
          alt="eSchool logo"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <div>
        <span className="text-[#1D4B6E] font-extrabold text-xl leading-none">e-School</span>
        {/* <span className="block text-[#888] text-[9px] tracking-widest uppercase leading-none mt-0.5">SAAS Version</span> */}
      </div>
    </a>
  );
}

/* ─── Desktop dropdown item ─── */
function NavLinkItem({
  item,
  openDropdown,
  toggleDropdown,
}: {
  item: NavItem;
  openDropdown: string | null;
  toggleDropdown: (l: string) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openDropdown === item.label;
  return (
    <li className="relative">
      <button
        onClick={() => hasChildren && toggleDropdown(item.label)}
        className="flex items-center gap-1 px-3 py-2 text-[15px] text-gray-700 hover:text-[#1D8FA0] font-medium rounded-lg transition-colors duration-150 cursor-pointer"
      >
        {item.label}
        {hasChildren && (
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {hasChildren && isOpen && (
        <ul className="absolute top-full left-0 mt-1 min-w-[160px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {item.children!.map((child) => (
            <li key={child.label}>
              <a href={child.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#e8f8f5] hover:text-[#1D8FA0] transition-colors">
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/* ─── Mobile drawer item (with inline accordion for children) ─── */
function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-3.5 px-0 text-[#1D4B6E] font-semibold text-[17px] text-left"
        onClick={() => (hasChildren ? setOpen((v) => !v) : onClose())}
      >
        <span>{item.label}</span>
        {hasChildren && (
          <svg className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      {hasChildren && open && (
        <div className="pl-4 pb-2 flex flex-col gap-1">
          {item.children!.map((child) => (
            <a key={child.label} href={child.href} className="block py-2 text-gray-600 text-[15px]" onClick={onClose}>
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? "py-0" : "py-7"}`}>
        {/* Nav pill / bar */}
        <nav
          ref={dropdownRef}
          className={`bg-white transition-all duration-500 ${
            scrolled ? "w-full rounded-none shadow-md px-4 sm:px-6 py-3" : "w-[96%] max-w-7xl rounded-2xl shadow-lg px-4 sm:px-6 py-3"
          } flex items-center justify-between`}
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLinkItem key={item.label} item={item} openDropdown={openDropdown} toggleDropdown={toggleDropdown} />
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="bg-[#2DC8A8] hover:bg-[#26b096] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap">
              Admission Open
            </a>
            <a href="#" className="bg-[#1D4B6E] hover:bg-[#163a57] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger (≡) */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition flex flex-col justify-center items-center gap-[5px]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-[2.5px] bg-[#1D4B6E] rounded-full" />
            <span className="block w-6 h-[2.5px] bg-[#1D4B6E] rounded-full" />
            <span className="block w-6 h-[2.5px] bg-[#1D4B6E] rounded-full" />
          </button>
        </nav>
      </header>

      {/* ─── Mobile slide-in drawer (from right) ─── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-[82vw] max-w-[360px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Logo />
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 text-xl font-bold"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-5 pt-2 pb-6">
          {navItems.map((item) => (
            <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
          ))}
        </nav>

        {/* CTA buttons at bottom of drawer */}
        <div className="px-5 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-3">
          <a
            href="#"
            className="block w-full text-center bg-[#2DC8A8] hover:bg-[#26b096] text-white font-semibold text-base py-3 rounded-xl transition-colors duration-200"
          >
            Admission Open
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 w-full text-center bg-[#1D4B6E] hover:bg-[#163a57] text-white font-semibold text-base py-3 rounded-xl transition-colors duration-200"
          >
            Login
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
}