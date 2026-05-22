"use client";
import "@/CSS/form.css";
import React, { useState, useCallback, ChangeEvent, FC, ReactNode } from "react";
import { GRADES, SECTIONS, BLOOD_GROUPS, INITIAL_FORM_DATA } from "@/app/api/studentData";

type FormState = typeof INITIAL_FORM_DATA;
type FormErrors = { [key in keyof FormState]?: string };

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

const Field: FC<FieldProps> = ({ label, required, error, children, className = "" }) => (
  <div className={`form-field ${className}`}>
    <label className="form-label">
      {label}
      {required && <span className="form-label-required">*</span>}
    </label>
    {children}
    {error && <p className="form-error">{error}</p>}
  </div>
);

const SectionHeader: FC<{ label: string }> = ({ label }) => (
  <div className="form-section-header">
    <span className="form-section-label">{label}</span>
    <div className="form-section-line" />
  </div>
);

export default function AddStudentForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [done, setDone] = useState(false);

  const set = useCallback((field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.gender) e.gender = "Gender is required";
    if (!form.grade) e.grade = "Grade is required";
    if (!form.section) e.section = "Section is required";
    if (!form.admissionDate) e.admissionDate = "Admission date is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.parentName.trim()) e.parentName = "Parent name is required";
    if (!form.parentPhone.trim()) e.parentPhone = "Parent phone is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", form);
      setDone(true);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM_DATA);
    setErrors({});
    setDone(false);
  };

  if (done) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon-wrapper">
            <svg className="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="success-title">Student Enrolled!</h2>
          <p className="success-message">
            <span className="success-student-name">{form.firstName} {form.lastName}</span> has been successfully registered.
          </p>
          <p className="success-student-details">
            {form.grade} &middot; Section {form.section}
          </p>
          <button onClick={handleReset} className="success-button">
            Add Another Student
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="w-full max-w-4xl mx-auto">
        <div className="form-header">
          <div className="form-header-icon">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h1 className="form-title">Add New Student</h1>
            <p className="form-subtitle">Fill in the student's details below.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="form-grid">
            <SectionHeader label="Personal Information" />
            <Field label="First Name" required error={errors.firstName}>
              <input type="text" placeholder="e.g., Aarav" className="form-input" value={form.firstName} onChange={set("firstName")} />
            </Field>
            <Field label="Last Name" required error={errors.lastName}>
              <input type="text" placeholder="e.g., Sharma" className="form-input" value={form.lastName} onChange={set("lastName")} />
            </Field>
            <Field label="Date of Birth" required error={errors.dob}>
              <input title="date" type="date" className="form-input" value={form.dob} onChange={set("dob")} />
            </Field>
            <Field label="Gender" required error={errors.gender}>
              <select title="gender" className="form-input" value={form.gender} onChange={set("gender")}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </Field>

            <SectionHeader label="Academic Details" />
            <Field label="Grade" required error={errors.grade}>
              <select title="grade" className="form-input" value={form.grade} onChange={set("grade")}>
                <option value="">Select Grade</option>
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Section" required error={errors.section}>
              <select title="section" className="form-input" value={form.section} onChange={set("section")}>
                <option value="">Select Section</option>
                {SECTIONS.map(s => <option key={s} value={s}>Section {s}</option>)}
              </select>
            </Field>
            <Field label="Admission Date" required error={errors.admissionDate}>
              <input title="date" type="date" className="form-input" value={form.admissionDate} onChange={set("admissionDate")} />
            </Field>
            <Field label="Roll Number">
              <input type="text" placeholder="e.g., 42" className="form-input" value={form.rollNumber} onChange={set("rollNumber")} />
            </Field>

            <SectionHeader label="Contact & Guardian" />
            <Field label="Street Address" required error={errors.address} className="sm:col-span-2">
              <input type="text" placeholder="e.g., 123 Thamel, Kathmandu" className="form-input" value={form.address} onChange={set("address")} />
            </Field>
            <Field label="Phone Number">
              <input type="tel" placeholder="+977-98XXXXXXXX" className="form-input" value={form.phone} onChange={set("phone")} />
            </Field>
            <Field label="Email Address" error={errors.email}>
              <input type="email" placeholder="student@example.com" className="form-input" value={form.email} onChange={set("email")} />
            </Field>
            <Field label="Parent / Guardian Name" required error={errors.parentName} className="sm:col-span-2">
              <input type="text" placeholder="e.g., Ramesh Sharma" className="form-input" value={form.parentName} onChange={set("parentName")} />
            </Field>
            <Field label="Parent Phone" required error={errors.parentPhone}>
              <input type="tel" placeholder="+977-98XXXXXXXX" className="form-input" value={form.parentPhone} onChange={set("parentPhone")} />
            </Field>
            <Field label="Blood Group">
              <select title="blood group" className="form-input" value={form.bloodGroup} onChange={set("bloodGroup")}>
                <option value="">Select Blood Group</option>
                {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>

            <SectionHeader label="Medical Notes" />
            <Field label="Allergies & Medical Conditions" className="sm:col-span-2">
              <textarea
                rows={3}
                placeholder="List any known allergies, chronic conditions, or important medical notes..."
                className="form-input"
                value={form.medical}
                onChange={set("medical")}
              />
            </Field>
          </div>

          <div className="form-footer">
            <p className="form-footer-note">
              <span className="text-teal-500">*</span> Indicates a required field.
            </p>
            <div className="form-button-group">
              <button type="button" onClick={handleReset} className="form-button form-button-clear">
                Clear Form
              </button>
              <button type="submit" className="form-button form-button-submit">
                Add Student
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}