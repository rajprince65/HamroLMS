// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertBadge = {
  text: string;
  variant: "success" | "warn";
};

export type StatCard = {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconKey: "patients" | "discharge" | "critical" | "surgery" | "ambulance" | "revenue" | "bills" | "cash" | "insurance" | "dues" | "supplier" | "expenses" | "refunds";
  iconBg: "teal" | "red" | "amber" | "purple" | "blue";
  badge: AlertBadge | null;
};

export type Appointment = {
  id: string;
  ward: string;
  total: string;
  status: "Discharged" | "Waiting" | "In Treatment";
  time: string;
};

export type StaffMember = {
  name: string;
  initials: string;
  role: string;
  status: "Active" | "On Break";
};

export type SchoolInfo = {
  name: string;
  branch: string;
  admin: string;
  role: string;
  avatar: string;
};


// ─── School Info ─────────────────────────────────────────────────────────────

export const schoolInfo: SchoolInfo = {
  name: "MediCare General",
  branch: "Central Campus",
  admin: "Raj Sharma",
  role: "Principal",
  avatar: "RS",
};
