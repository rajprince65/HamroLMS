export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type Grade =
  | "Grade 1"
  | "Grade 2"
  | "Grade 3"
  | "Grade 4"
  | "Grade 5"
  | "Grade 6"
  | "Grade 7"
  | "Grade 8"
  | "Grade 9"
  | "Grade 10"
  | "Grade 11"
  | "Grade 12";

export type Section = "A" | "B" | "C" | "D" | "E";

export type TransportMode = "school_bus" | "private" | "walking" | "other";

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface StudentFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender | "";
  bloodGroup: BloodGroup | "";
  nationality: string;
  religion: string;
  profilePhoto: File | null;

  // Academic Info
  studentId: string;
  grade: Grade | "";
  section: Section | "";
  rollNumber: string;
  admissionDate: string;
  previousSchool: string;

  // Contact Info
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  // Parent / Guardian
  parentName: string;
  parentRelationship: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;

  // Emergency Contact
  emergencyContact: EmergencyContact;

  // Medical Info
  medicalConditions: string;
  allergies: string;
  medications: string;

  // Other
  transportMode: TransportMode | "";
  extracurriculars: string[];
  notes: string;
}

export interface FormErrors {
  [key: string]: string;
}
