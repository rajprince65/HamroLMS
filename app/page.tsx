import Navbar from "@/components/landingpage/navbar/Navbar";
import HeroCarousel from "@/components/landingpage/hero/HeroCarousel";
import AboutUs from "@/components/landingpage/aboutus/AboutUs";
import EducationalPrograms from "@/components/landingpage/educationamprogram/EducationalPrograms";
import AnnouncementSection from "@/components/landingpage/Announcementsection/AnnouncementSection";
import ExpertTeachers from "@/components/landingpage/expertteachers/ExpertTeachers";
import FaqSection from "@/components/landingpage/FAQ/FaqSection";
import GallerySection from "@/components/landingpage/gallery/GallerySection";
import Footer from "@/components/landingpage/footer/Footer";

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
        <section id="home">
          <HeroCarousel />
        </section>

        {/* About Us section */}
        <section id="about">
          <AboutUs />
        </section>

        {/* Educational Programs with horizontal scroll on mobile */}
        <section id="programs">
          <EducationalPrograms />
        </section>

        {/* Announcement section */}
        <AnnouncementSection />

        {/* Expert Teachers section */}
        <section id="teachers">
          <ExpertTeachers />
        </section>

        {/* FAQ section */}
        <section id="faqs">
          <FaqSection />
        </section>

        {/* Gallery section */}
        <section id="gallery">
          <GallerySection />
        </section>
      </div>
      <section id="contact">
        <Footer />
      </section>
    </main>
  );
}