import Navbar from "@/components/landingpage/navbar/Navbar";
import HeroCarousel from "@/components/landingpage/hero/HeroCarousel";
import AboutUs from "@/components/landingpage/aboutus/AboutUs";

/**
 * Drop this page.tsx (or use it as reference in your app/page.tsx).
 * Make sure your layout.tsx / globals.css has Tailwind set up.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sticky navbar — floated pill that expands on scroll */}
      <Navbar />

      {/* Push content below the fixed navbar */}
      <div className="pt-[0px]">
        {/* Hero with 3-slide carousel + cloud divider */}
        <HeroCarousel />

        {/* About Us section */}
        <AboutUs />
      </div>
    </main>
  );
}