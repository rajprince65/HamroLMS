import { GalleryCategory, GalleryItem, GallerySectionMeta } from "./gallery.types";

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    imageSrc: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=600&q=80",
    alt: "Students playing football on the field",
    category: "Sports",
  },
  {
    id: 2,
    imageSrc: "https://images.unsplash.com/photo-1532094349884-543559244e05?w=600&q=80",
    alt: "Science lab experiment with students",
    category: "Science",
  },
  {
    id: 3,
    imageSrc: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    alt: "Students painting in art class",
    category: "Arts",
  },
  {
    id: 4,
    imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    alt: "Annual school event celebration",
    category: "Events",
  },
  {
    id: 5,
    imageSrc: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    alt: "Students engaged in classroom discussion",
    category: "Classroom",
  },
  {
    id: 6,
    imageSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    alt: "Kids running during sports day",
    category: "Sports",
  },
  {
    id: 7,
    imageSrc: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=600&q=80",
    alt: "Chemistry experiment in the lab",
    category: "Science",
  },
  {
    id: 8,
    imageSrc: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    alt: "Student drawing and sketching",
    category: "Arts",
  },
  {
    id: 9,
    imageSrc: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    alt: "Teacher explaining on whiteboard",
    category: "Classroom",
  },
  {
    id: 10,
    imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
    alt: "School cultural event performance",
    category: "Events",
  },
  {
    id: 11,
    imageSrc: "https://images.unsplash.com/photo-1552581234-26160f608093?w=600&q=80",
    alt: "Basketball practice after school",
    category: "Sports",
  },
  {
    id: 12,
    imageSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    alt: "Students reading books in library",
    category: "Classroom",
  },
];

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Sports",
  "Science",
  "Arts",
  "Events",
  "Classroom",
];

export const gallerySectionMeta: GallerySectionMeta = {
  badge: "Our Gallery",
  heading: "Glimpses of School Life",
  description:
    "Explore the vibrant moments from our school — from sports days and science labs to art sessions and cultural events.",
};
