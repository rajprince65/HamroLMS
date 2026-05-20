export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeroSlide {
  id: number;
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  title: string;
  description: string;
  /** CSS colour used as a semi-transparent tint over the background image */
  bgColor: string;
  accentColor: string;
  titleColor: string;
  descColor: string;
  /** Full-bleed background image URL for the slide */
  imageSrc: string;
  imageAlt: string;
  /** Optional layout hint kept for backwards-compat */
  imageSide?: "left" | "right";
  decorShape?: string;
}

export interface AboutSection {
  sectionLabel: string;
  heading: string;
  body: string;
  images: {
    src: string;
    alt: string;
  }[];
}