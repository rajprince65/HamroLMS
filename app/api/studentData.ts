import type {
  Gender,
  BloodGroup,
  Grade,
  Section,
  TransportMode,
} from "@/types/student";

export const GENDERS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export const BLOOD_GROUPS: BloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const GRADES: Grade[] = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

export const SECTIONS: Section[] = ["A", "B", "C", "D", "E"];

export const TRANSPORT_MODES: { value: TransportMode; label: string }[] = [
  { value: "school_bus", label: "School Bus" },
  { value: "private", label: "Private Vehicle" },
  { value: "walking", label: "Walking" },
  { value: "other", label: "Other" },
];

export const EXTRACURRICULAR_OPTIONS: string[] = [
  "Football",
  "Basketball",
  "Cricket",
  "Swimming",
  "Tennis",
  "Badminton",
  "Chess",
  "Debate Club",
  "Drama",
  "Music",
  "Dance",
  "Art & Craft",
  "Science Club",
  "Math Olympiad",
  "Coding Club",
  "Photography",
  "Robotics",
  "Volunteer Work",
];

export const COUNTRIES: string[] = [
  "Nepal",
  "India",
  "Bangladesh",
  "Pakistan",
  "Sri Lanka",
  "Bhutan",
  "China",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "UAE",
  "Other",
];

export const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  grade: "",
  section: "",
  rollNumber: "",
  admissionDate: "",
  address: "",
  phone: "",
  email: "",
  parentName: "",
  parentPhone: "",
  medical: "",
  nationality: "",
  religion: "",
  emergencyContact: {
    name: "",
    relationship: "",
    phone: "",
  },
};
