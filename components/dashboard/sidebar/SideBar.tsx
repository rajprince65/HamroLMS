"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import Logo from "./logo";
import { Icon } from '@iconify/react';

// ─── Types ────────────────────────────────────────────────────────────────────

type SubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

type NavItem = {
  name: string;
  icon: string;
  path?: string;
  subItems?: SubItem[];
};

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    icon: "material-symbols:dashboard-rounded",
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: "ph:student-bold",
    name: "Students",
    subItems: [
      { name: "Add Student", path: "/dashboard/students/add" },
      { name: "View Students", path: "/dashboard/students/view" },
    ],
  },
  {
    icon: "clarity:employee-group-solid",
    name: "Staff",
    path: "/dashboard/staff",
  },
  {
    icon: "ion:time",
    name: "Classes & Timetables",
    path: "/dashboard/classes",
  },
  {
    icon: "material-symbols:co-present-rounded",
    name: "Attendance",
    path: "/dashboard/attendance",
  },
  {
    icon: "healthicons:i-exam-multiple-choice",
    name: "Exams & Grades",
    path: "/dashboard/exams",
  },
  {
    icon: "fluent:task-list-square-24-filled",
    name: "Assignments",
    path: "/dashboard/assignments",
  },
  {
    icon: "bi:megaphone-fill",
    name: "Communications",
    path: "/dashboard/communications",
  },
  {
    icon: "fluent:payment-24-filled",
    name: "Fee & Payments",
    path: "/dashboard/payments",
  },
  {
    icon: "bxs:book-reader",
    name: "Library",
    path: "/dashboard/library",
  },
  {
    icon: "mdi:bus-school",
    name: "Transport",
    path: "/dashboard/transport",
  },
  {
    icon: "material-symbols:inventory-2",
    name: "Inventory",
    path: "/dashboard/inventory",
  },
  {
    icon: "icon-park-solid:report",
    name: "Reports",
    path: "/dashboard/reports",
  },
  {
    icon: "uiw:setting",
    name: "Settings",
    path: "/dashboard/settings",
  },

];
// ─── Sub-item badge ───────────────────────────────────────────────────────────

function Badge({ label, active }: { label: string; active: boolean }) {
  return (
    <span className={`ml-auto menu-dropdown-badge ${active ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"}`}>
      {label}
    </span>
  );
}

// ─── Single nav item ──────────────────────────────────────────────────────────

function NavItemRow({
  item,
  isOpen,
  showLabel,
  isActive,
  isSubItemActive,
  onToggle,
}: {
  item: NavItem;
  isOpen: boolean;
  showLabel: boolean;
  isActive: (path: string) => boolean;
  isSubItemActive: (path: string) => boolean;
  onToggle: () => void;
}) {
  const subMenuRef = useRef<HTMLDivElement>(null);
  const active = item.path ? isActive(item.path) : false;

  const sharedIconClass = active || isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive";
  const sharedItemClass = `menu-item group ${active || isOpen ? "menu-item-active" : "menu-item-inactive"} ${!showLabel ? "lg:justify-center" : "lg:justify-start"}`;

  // ── Has sub-items: render a toggle button ──
  if (item.subItems) {
    return (
      <li>
        <button
          onClick={onToggle}
          className={`${sharedItemClass} cursor-pointer !flex !items-center !justify-between !w-full`}
        >
          {/* Icon + Label grouped tightly */}
          <div className="flex items-center gap-2">
            <span className={sharedIconClass}>
              <Icon icon={item.icon} width={20} height={20} />
            </span>
            {showLabel && <span className="menu-item-text">{item.name}</span>}
          </div>

          {/* Arrow pushed to far right */}
          {showLabel && (
            <Icon icon="line-md:chevron-down" width={20} height={20} />
          )}
        </button>
        {/* Animated submenu */}
        {showLabel && (
          <div
            ref={subMenuRef}
            className="overflow-hidden transition-all duration-300"
            style={{ height: isOpen ? (subMenuRef.current?.scrollHeight ?? 0) : 0 }}
          >
            <ul className="mt-2 space-y-1 ml-9">
              {item.subItems.map((sub) => (
                <li key={sub.name}>
                  <Link
                    href={sub.path}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isSubItemActive(sub.path)
                        ? "text-[#2ec7a8] bg-[#e6f7f4]"
                        : "text-gray-800 hover:text-gray-800 hover:translate-x-1"
                      }`}
                  >
                    {/* Dot indicator */}
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${isSubItemActive(sub.path) ? "bg-gray-600" : "bg-gray-400 group-hover:bg-gray-500"}`} />
                    {sub.name}
                    <span className="flex items-center gap-1 ml-auto">
                      {sub.new && <Badge label="new" active={isSubItemActive(sub.path)} />}
                      {sub.pro && <Badge label="pro" active={isSubItemActive(sub.path)} />}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    );
  }

  // ── Direct link ──
  return (
    <li>
      <Link href={item.path!} className={`${sharedItemClass} flex items-center gap-2`}>
        <span className={sharedIconClass}>
          <Icon icon={item.icon} width="24" height="24" />
        </span>
        {showLabel && <span className="menu-item-text">{item.name}</span>}
      </Link>
    </li>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, setIsExpanded } = useSidebar();
  const pathname = usePathname();

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isActive = (path: string) => path === pathname;
  const isSubItemActive = (path: string) => path !== "/dashboard" && path === pathname;
  const showLabel = isExpanded || isHovered || isMobileOpen;

  // Auto-open the submenu that contains the active route
  useEffect(() => {
    const activeIndex = NAV_ITEMS.findIndex((item) =>
      item.subItems?.some((sub) => isSubItemActive(sub.path))
    );
    setOpenIndex(activeIndex !== -1 ? activeIndex : null);
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/dashboard/order_food")) {
      setIsExpanded(false);
      return;
    }

    setIsExpanded(true);
  }, [pathname, setIsExpanded]);

  const toggleSubmenu = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  const sidebarWidth =
    isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]";

  return (
    <aside
      className={`
        group
        fixed mt-16 lg:mt-0 top-0 left-0 h-screen z-50
        flex flex-col px-5 overflow-hidden
        bg-white 
        shadow-lg border-gray-300
        text-gray-900 transition-all duration-300 ease-in-out
        ${sidebarWidth}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className={`py-4 flex ${!showLabel ? "lg:justify-center" : "justify-start"}`}>
        <Logo />
      </div>

      {/* Nav */}
      <div className="flex flex-1 min-h-0 flex-col overflow-y-auto no-scrollbar group-hover:custom-scrollbar pb-6">
        <nav className="mb-6">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, index) => (
              <NavItemRow
                key={item.name}
                item={item}
                isOpen={openIndex === index}
                showLabel={showLabel}
                isActive={isActive}
                isSubItemActive={isSubItemActive}
                onToggle={() => toggleSubmenu(index)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}