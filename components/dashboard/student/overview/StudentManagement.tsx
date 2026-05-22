"use client";

import React, { useState } from "react";
import type { Student } from "./student";
import StudentList from "./StudentList";
import StudentProfile from "./StudentProfile";

type View = "list" | "profile";

export default function StudentManagement() {
  const [view, setView] = useState<View>("list");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setView("profile");
  };

  const handleEdit = (student: Student) => {
    // Wire to your AddStudentForm/edit route here
    alert(`Edit student: ${student.firstName} ${student.lastName}\n\nConnect this to your AddStudentForm component with the student data pre-filled.`);
  };

  const handleDelete = (id: string) => {
    console.log("Deleted student with id:", id);
    if (selectedStudent?.id === id) {
      setView("list");
      setSelectedStudent(null);
    }
  };

  return (
    <>
      {view === "list" && (
        <StudentList
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {view === "profile" && selectedStudent && (
        <StudentProfile
          student={selectedStudent}
          onBack={() => setView("list")}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}
