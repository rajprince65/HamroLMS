import { FooterData } from "./footer.types";

export const footerData: FooterData = {
  contact: [
    {
      icon: "location",
      label: "School Address",
      value: "Biratnagar-10, Morang, Koshi Province, Nepal",
    },
    {
      icon: "mail",
      label: "Mail Us",
      value: "info@HamroLMS.edu.np",
      href: "mailto:info@HamroLMS.edu.np",
    },
    {
      icon: "phone",
      label: "Call Us",
      value: "+977-021-123456",
      href: "tel:+977021123456",
    },
  ],

  brand: {
    name: "HamroLMS",
    tagline:
      "Our school is committed to providing quality education that nurtures knowledge, character, and leadership.",
  },

  social: [
    { platform: "facebook", href: "https://facebook.com" },
    { platform: "instagram", href: "https://instagram.com" },
    { platform: "linkedin", href: "https://linkedin.com" },
  ],

  usefulLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Photos", href: "/gallery" },
    { label: "Videos", href: "/videos" },
    { label: "Contact Us", href: "/contact" },
  ],

  quickLinks: [
    { label: "Admin Login", href: "/admin/login" },
    { label: "Student Login", href: "/student/login" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Cancellation", href: "/refund" },
  ],

  copyright: "© 2026 HamroLMS Biratnagar. All Rights Reserved",
};
