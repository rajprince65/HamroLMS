"use client";

import { useRef, useState, useEffect } from "react";
import { schoolInfo } from "./dashboardAPI";
import { Icon } from "@iconify/react";
import { useSidebar } from "@/context/SidebarContext";

export default function Header() {

    const { isMobileOpen, toggleSidebar, toggleMobileSidebar, isExpanded } = useSidebar();

    const handleToggle = () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);



    const [notifCount] = useState(2);


    return (
        <header className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30">
            {/* Left side controls */}
            <div className="flex items-center gap-3">
                {/* Hamburger menu for mobile */}
                <button
                    className="items-center justify-center w-10 h-10 text-[#2ec7a8]rounded-lg z-99999 dark:border-gray-800 lg:flex  lg:h-11 lg:w-11"
                    onClick={handleToggle}
                    aria-label="Toggle Sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 20 20">
                        <path d="M0 0h20v20H0z" fill="none" />
                        <path fill="#2ec7a8" fillRule="evenodd" d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m6 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1" clipRule="evenodd" />
                    </svg>

                    {/* {isExpanded || isMobileOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 25 25">
                            <path d="M0 0h25v25H0z" fill="none" />
                            <path fill="currentColor" d="M13.734 6.78a.75.75 0 0 0-1.061-1.06l-6.25 6.25a.75.75 0 0 0 0 1.06l6.25 6.25a.75.75 0 0 0 1.06-1.06l-5.72-5.72z" />
                            <path fill="currentColor" d="M18.234 6.78a.75.75 0 0 0-1.061-1.06l-6.25 6.25a.75.75 0 0 0 0 1.06l6.25 6.25a.75.75 0 0 0 1.06-1.06l-5.72-5.72z" />
                        </svg>

                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M7.353 8.147a.5.5 0 0 0-.707.707L9.793 12l-3.147 3.146a.5.5 0 1 0 .707.708l3.5-3.5a.5.5 0 0 0 0-.707zm9.5 3.5l-3.5-3.5a.5.5 0 0 0-.707.707L15.793 12l-3.147 3.146a.5.5 0 1 0 .707.708l3.5-3.5a.5.5 0 0 0 0-.707" />
                        </svg>
                    )} */}
                    {/* Cross Icon */}
                </button>

                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon icon="material-symbols:search-rounded" width="24" height="24" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ec7a8] focus:border-[#2ec7a8] transition"
                    />
                </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">


                {/* Notifications */}
                <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition">
                    <Icon icon="material-symbols:notifications-outline" width="24" height="24" />                    {notifCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                            {notifCount}
                        </span>
                    )}
                </button>

                {/* User avatar + info */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-[#edfaf7] text-[#2ec7a8] font-semibold text-sm flex items-center justify-center select-none">
                        {schoolInfo.avatar}
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-sm font-semibold text-gray-800 leading-tight">{schoolInfo.admin}</p>
                        <p className="text-xs text-gray-400 leading-tight">{schoolInfo.role}</p>
                    </div>
                    <span className="text-gray-400 group-hover:text-gray-600 transition">
                        <Icon icon="material-symbols:keyboard-arrow-down" width="24" height="24" />
                    </span>
                </div>
            </div>
        </header>
    );
}
