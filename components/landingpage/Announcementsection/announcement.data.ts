import { Announcement, AnnouncementSectionMeta } from "./announcement.types";

export const announcements: Announcement[] = [
  {
    id: 1,
    day: "16",
    month: "July",
    title: "Sports Day",
    description:
      "Get ready for an exciting day of athletic competition and team spirit!",
    classes: "1 - A English, 2 - A English, 1 - B English",
  },
  {
    id: 2,
    day: "23",
    month: "November",
    title: "Attention Students!",
    description:
      "Get ready to showcase your knowledge and skills in the upcoming academic event.",
    classes: "1 - A English",
  },
  {
    id: 3,
    day: "23",
    month: "November",
    title: "Attention Parents!",
    description:
      "Exciting new updates regarding the school calendar and upcoming events.",
    classes: "1 - A English, 2 - B English",
  },
  {
    id: 4,
    day: "20",
    month: "November",
    title: "Career Day",
    description:
      "Explore future possibilities with professionals from various industries.",
    classes: "10 - A English, 10 - B English",
  },
  {
    id: 5,
    day: "05",
    month: "December",
    title: "Annual Science Fair",
    description:
      "Present your projects and compete for the top science award of the year.",
    classes: "8 - A English, 9 - A English",
  },
  {
    id: 6,
    day: "12",
    month: "December",
    title: "Winter Concert",
    description:
      "Join us for a wonderful evening of music, dance, and performances.",
    classes: "All Classes",
  },
];

export const announcementMeta: AnnouncementSectionMeta = {
  badge: "Announcement",
  heading: "Important Update",
  subtext:
    "Don't miss out on these upcoming events! Check the schedule and mark your calendar.",
};

export const heroImageSrc =
  "https://i.pinimg.com/736x/eb/cc/83/ebcc83a51c9e97357d393e71a1212125.jpg";
