export interface Announcement {
  id: number;
  day: string;
  month: string;
  title: string;
  description: string;
  classes: string;
}

export interface AnnouncementSectionMeta {
  badge: string;
  heading: string;
  subtext: string;
}
