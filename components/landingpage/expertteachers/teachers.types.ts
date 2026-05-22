export interface Teacher {
  id: number;
  name: string;
  qualification: string;
  imageSrc: string;
  imageShape: "square" | "circle";
}

export interface TeacherSectionMeta {
  badge: string;
  heading: string;
  description: string;
}
