export type Gender = "male" | "female" | "other";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Grade = "Grade 1" | "Grade 2" | "Grade 3" | "Grade 4" | "Grade 5" | "Grade 6" | "Grade 7" | "Grade 8" | "Grade 9" | "Grade 10" | "Grade 11" | "Grade 12";
export type Section = "A" | "B" | "C" | "D" | "E";
export type TransportMode = "school_bus" | "private" | "walking" | "other";
export type StudentStatus = "active" | "inactive" | "transferred";

export interface SubjectProgress {
  subject: string;
  score: number;       // 0-100
  grade: string;       // A+, A, B+, etc.
  attendance: number;  // %
}

export interface Attendance {
  month: string;
  present: number;
  absent: number;
  total: number;
}

export interface Achievement {
  title: string;
  date: string;
  category: "academic" | "sports" | "arts" | "leadership";
}

export interface Student {
  id: string;
  // Personal
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  nationality: string;
  religion: string;
  profilePhoto?: string;
  status: StudentStatus;

  // Academic
  studentId: string;
  grade: Grade;
  section: Section;
  rollNumber: string;
  admissionDate: string;
  previousSchool?: string;
  gpa: number; // 0-4.0

  // Contact
  email?: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  country: string;

  // Guardian
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  parentOccupation?: string;

  // Medical
  medicalConditions?: string;
  allergies?: string;

  // Progress
  subjectProgress: SubjectProgress[];
  attendanceHistory: Attendance[];
  achievements: Achievement[];

  // Other
  transportMode: TransportMode;
  extracurriculars: string[];
}
