# Student List & Profile Components

Responsive student management UI built with **Next.js**, **TypeScript**, and **Tailwind CSS** using the `#2ec7a8` teal color theme.

## File Structure

```
student-list/
├── components/
│   ├── StudentManagement.tsx  ← Root: wires list ↔ profile navigation
│   ├── StudentList.tsx        ← Table with search, filter, sort, actions
│   └── StudentProfile.tsx     ← Full detail view with charts & tabs
├── types/
│   └── student.ts             ← All TypeScript types & interfaces
├── data/
│   └── students.ts            ← 6 mock students with rich data
└── README.md
```

## Usage

```tsx
// app/students/page.tsx
import StudentManagement from "@/components/StudentManagement";

export default function StudentsPage() {
  return <StudentManagement />;
}
```

## StudentList Features
- Search by name, student ID, phone, city
- Filter by Grade and Status
- Sort by name, grade, GPA, roll number (ascending/descending)
- View / Edit / Delete action buttons per row
- Confirm-delete modal
- Live stats: Active / Inactive / Transferred counts + avg GPA
- Responsive horizontal scroll on mobile

## StudentProfile Features
- Teal hero banner with student avatar + quick-edit button
- 4 stat cards: GPA, Average Score, Attendance, Activities
- 4 tabs:
  - **Overview** — SVG radar chart + achievements + extracurriculars
  - **Academic** — Subject score bars with attendance % + school history
  - **Attendance** — Bar chart + monthly breakdown table
  - **Personal** — Contact, guardian, medical info

## Connecting to AddStudentForm

In `StudentManagement.tsx`, replace the `handleEdit` stub:

```tsx
const handleEdit = (student: Student) => {
  router.push(`/students/edit/${student.id}`);
  // Pre-fill AddStudentForm with student data
};
```
