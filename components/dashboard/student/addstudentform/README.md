# Add Student Form

A responsive, multi-step student registration form built with **Next.js**, **TypeScript**, and **Tailwind CSS** using the `#2ec7a8` teal color theme.

## File Structure

```
add-student-form/
├── components/
│   └── AddStudentForm.tsx   ← Main form component (6 steps)
├── types/
│   └── student.ts           ← All TypeScript types & interfaces
├── app/api
│   └── studentData.ts       ← Constants, dropdown options, initial state
└── README.md
```

## Setup

1. Copy the three source files into your Next.js project.
2. Make sure Tailwind CSS is configured in your project.
3. Add the custom color to `tailwind.config.ts` (optional — inline classes are used so it works without this):

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: "#2ec7a8",
    },
  },
},
```

## Usage

```tsx
// app/students/add/page.tsx  (or any page)
import AddStudentForm from "@/components/AddStudentForm";

export default function AddStudentPage() {
  return <AddStudentForm />;
}
```

## Form Sections

| Step | Section   | Fields |
|------|-----------|--------|
| 1    | Personal  | Name, DOB, Gender, Blood Group, Nationality, Religion, Photo |
| 2    | Academic  | Student ID, Grade, Section, Roll Number, Admission Date, Previous School |
| 3    | Contact   | Email, Phone, Address, City, State, Postal Code, Country |
| 4    | Guardian  | Parent details + Emergency contact |
| 5    | Medical   | Medical conditions, Allergies, Medications |
| 6    | Other     | Transport mode, Extracurriculars, Notes |

## Features

- ✅ 6-step wizard with progress indicator
- ✅ Per-step validation with inline error messages
- ✅ Profile photo upload with preview
- ✅ Fully responsive (mobile + desktop)
- ✅ Multi-select extracurricular activity chips
- ✅ Success screen on submission
- ✅ Reset / add another student flow
- ✅ TypeScript strict types throughout
