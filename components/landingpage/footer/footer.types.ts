export interface ContactInfo {
  icon: "location" | "mail" | "phone";
  label: string;
  value: string;
  href?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin";
  href: string;
}

export interface FooterData {
  contact: ContactInfo[];
  brand: {
    name: string;
    tagline: string;
  };
  social: SocialLink[];
  usefulLinks: FooterLink[];
  quickLinks: FooterLink[];
  copyright: string;
}
