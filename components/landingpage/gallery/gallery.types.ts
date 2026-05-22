export interface GalleryItem {
  id: number;
  imageSrc: string;
  alt: string;
  category: GalleryCategory;
}

export type GalleryCategory =
  | "All"
  | "Sports"
  | "Science"
  | "Arts"
  | "Events"
  | "Classroom";

export interface GallerySectionMeta {
  badge: string;
  heading: string;
  description: string;
}
