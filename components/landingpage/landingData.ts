import type { NavItem, HeroSlide, AboutSection } from "./index";

export const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  {
    label: "Gallery",
    href: "#gallery",
    children: [
      { label: "Photo Gallery", href: "#photos" },
      { label: "Video Gallery", href: "#videos" },
    ],
  },
  { label: "Faqs", href: "#faqs" },
  { label: "Contact Us", href: "#contact" },
  
];

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    badge: "HIGH STANDARD",
    badgeBg: "#E8800A",
    badgeTextColor: "#fff",
    title: "Play-Based Young Learning Syatem",
    description:
      "Imagine a learning environment where children aren't just sitting at desks, but actively engaged in play that sparks curiosity and development. That's the core idea of a Play-Based Young Learning System",
    bgColor: "#1D8FA0",
    accentColor: "#E8800A",
    titleColor: "#fff",
    descColor: "rgba(255,255,255,0.88)",
    imageSide: "right",
    imageAlt: "Boy reading a book",
    imageSrc:
      "https://crestwood-academy.eschool-saas.wrteam.me/storage/12/sliders/6683f36a52f5f5.721773571719923562.jpg",
    decorShape: "circle-orange",
  },
  {
    id: 2,
    badge: "WELCOME TO OUR SCHOOL",
    badgeBg: "#1D4B6E",
    badgeTextColor: "#fff",
    title: "Fun & Educational Adventures for Kids",
    description:
      "Discover a world of interactive lessons, exciting games, and captivating stories, all carefully crafted to make learning an enjoyable.",
    bgColor: "#B8D8EE",
    accentColor: "#1D4B6E",
    titleColor: "#1D4B6E",
    descColor: "#2c3e50",
    imageSide: "right",
    imageAlt: "Teenage student smiling",
    imageSrc:
      "https://crestwood-academy.eschool-saas.wrteam.me/storage/12/sliders/6683f376dddfd1.536822741719923574.jpg",
    decorShape: "blob-blue",
  },
  {
    id: 3,
    badge: "PLAY LEARN AND GROW",
    badgeBg: "#A0520A",
    badgeTextColor: "#fff",
    title: "Creative kid's World",
    description:
      "Imagine a learning environment where children aren't just sitting at desks, but actively engaged in play that sparks curiosity and development. That's the core idea of a Play-Based Young Learning System",
    bgColor: "#F5E8D6",
    accentColor: "#A0520A",
    titleColor: "#A0520A",
    descColor: "#5a3e1b",
    imageSide: "left",
    imageAlt: "Young girl with glasses",
    imageSrc:
      "https://crestwood-academy.eschool-saas.wrteam.me/storage/12/sliders/6683f362626104.103796891719923554.jpg",
    decorShape: "books-right",
  },
];

export const aboutData: AboutSection = {
  sectionLabel: "About Us",
  heading: "Personalized Learning for Every Student",
  body: "Briefly introduce your school, including its name, location, and level of education (elementary, high school, etc.). Highlight your school's mission statement. This concise statement captures the core purpose and philosophy that guides everything you do. Briefly introduce your school, including its name, location, and level of education (elementary, high school, etc.). Highlight your school's mission statement. This concise statement captures the core purpose and philosophy that guides everything you do.",
  images: [
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
      alt: "Teacher with student",
    },
    {
      src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&q=80",
      alt: "Classroom activity",
    },
    {
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
      alt: "Student learning",
    },
  ],
};

// School logo URLs (use in Navbar or anywhere the school logo is needed)
export const schoolLogo = {
  png: "https://similarpng.com/_next/image?url=https%3A%2F%2Fimage.similarpng.com%2Ffile%2Fsimilarpng%2Fvery-thumbnail%2F2021%2F09%2FSuccess-student-Logo-on-transparent-background-PNG.png&w=3840&q=75",
};