"use client";

import React, { useState, useMemo } from "react";
import type { Student, StudentStatus } from "./student";
import { MOCK_STUDENTS } from "./students";

// ── helpers ──────────────────────────────────────────────────
const statusConfig: Record<StudentStatus, { label: string; bg: string; dot: string }> = {
  active:      { label: "Active",      bg: "bg-emerald-50 text-emerald-700",  dot: "bg-emerald-500" },
  inactive:    { label: "Inactive",    bg: "bg-slate-100 text-slate-500",     dot: "bg-slate-400" },
  transferred: { label: "Transferred", bg: "bg-amber-50 text-amber-700",      dot: "bg-amber-500" },
};

const gpaColor = (gpa: number) => {
  if (gpa >= 3.7) return "text-[#2ec7a8]";
  if (gpa >= 3.0) return "text-blue-500";
  if (gpa >= 2.0) return "text-amber-500";
  return "text-red-500";
};

interface Props {
  onView:   (student: Student) => void;
  onEdit:   (student: Student) => void;
  onDelete: (id: string) => void;
}

export default function StudentList({ onView, onEdit, onDelete }: Props) {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [search, setSearch]     = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"name" | "grade" | "gpa" | "rollNumber">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const grades = useMemo(() => Array.from(new Set(MOCK_STUDENTS.map((s) => s.grade))).sort(), []);

  const filtered = useMemo(() => {
    return students
      .filter((s) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q) ||
          s.phone?.includes(q) ||
          s.city.toLowerCase().includes(q);
        const matchGrade  = gradeFilter  === "all" || s.grade  === gradeFilter;
        const matchStatus = statusFilter === "all" || s.status === statusFilter;
        return matchSearch && matchGrade && matchStatus;
      })
      .sort((a, b) => {
        let va: string | number = "";
        let vb: string | number = "";
        if (sortKey === "name")        { va = `${a.firstName} ${a.lastName}`; vb = `${b.firstName} ${b.lastName}`; }
        if (sortKey === "grade")       { va = a.grade; vb = b.grade; }
        if (sortKey === "gpa")         { va = a.gpa; vb = b.gpa; }
        if (sortKey === "rollNumber")  { va = parseInt(a.rollNumber); vb = parseInt(b.rollNumber); }
        if (va < vb) return sortDir === "asc" ? -1 : 1;
        if (va > vb) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [students, search, gradeFilter, statusFilter, sortKey, sortDir]);

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    onDelete(id);
    setConfirmDelete(null);
  };

  const SortIcon = ({ k }: { k: typeof sortKey }) => (
    <span className="ml-1 inline-flex flex-col gap-[1px]">
      <span className={`block w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-l-transparent border-r-transparent ${sortKey === k && sortDir === "asc" ? "border-b-[#2ec7a8]" : "border-b-slate-300"}`} />
      <span className={`block w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent ${sortKey === k && sortDir === "desc" ? "border-t-[#2ec7a8]" : "border-t-slate-300"}`} />
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf9] via-white to-slate-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2ec7a8] flex items-center justify-center shadow-lg shadow-[#2ec7a8]/30">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Student Directory</h1>
            <p className="text-xs text-slate-400">{filtered.length} of {students.length} students</p>
          </div>
        </div>
        {/* Stats chips */}
        <div className="flex gap-2 flex-wrap">
          {(["active", "inactive", "transferred"] as StudentStatus[]).map((s) => {
            const count = students.filter((st) => st.status === s).length;
            const cfg = statusConfig[s];
            return (
              <span key={s} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label}: {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, ID, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#2ec7a8] focus:ring-2 focus:ring-[#2ec7a8]/20 transition-all"
          />
        </div>
        {/* Grade */}
        <select
        title="Filter by Grade"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-[#2ec7a8] focus:ring-2 focus:ring-[#2ec7a8]/20 bg-white transition-all appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="all">All Grades</option>
          {grades.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        {/* Status */}
        <select
        title="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-[#2ec7a8] focus:ring-2 focus:ring-[#2ec7a8]/20 bg-white transition-all appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="transferred">Transferred</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <button className="flex items-center" onClick={() => handleSort("name")}>
                    Student <SortIcon k="name" />
                  </button>
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Student ID</th>
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <button className="flex items-center" onClick={() => handleSort("grade")}>
                    Class <SortIcon k="grade" />
                  </button>
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <button className="flex items-center" onClick={() => handleSort("gpa")}>
                    GPA <SortIcon k="gpa" />
                  </button>
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-slate-400 text-sm">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🔍</span>
                      <p>No students found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((student) => (
                  <tr key={student.id} className="hover:bg-[#2ec7a8]/3 transition-colors group">
                    {/* Student */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.firstName}`}
                          alt={student.firstName}
                          className="w-9 h-9 rounded-xl object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-[#2ec7a8] transition-colors">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-xs text-slate-400">{student.city}</p>
                        </div>
                      </div>
                    </td>
                    {/* ID */}
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">{student.studentId}</span>
                    </td>
                    {/* Class */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-slate-700">{student.grade.replace("Grade ", "Gr.")}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[#2ec7a8]/10 text-[#2ec7a8] font-bold">{student.section}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Roll #{student.rollNumber}</p>
                    </td>
                    {/* Phone */}
                    <td className="px-4 py-3.5 text-sm text-slate-600">
                      {student.phone || <span className="text-slate-300">—</span>}
                    </td>
                    {/* GPA */}
                    <td className="px-4 py-3.5">
                      <span className={`text-sm font-bold ${gpaColor(student.gpa)}`}>{student.gpa.toFixed(1)}</span>
                      <span className="text-xs text-slate-400">/4.0</span>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[student.status].bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[student.status].dot}`} />
                        {statusConfig[student.status].label}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View */}
                        <button
                          onClick={() => onView(student)}
                          title="View Details"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#2ec7a8] hover:bg-[#2ec7a8]/10 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => onEdit(student)}
                          title="Edit Student"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => setConfirmDelete(student.id)}
                          title="Delete Student"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{filtered.length}</span> student{filtered.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-slate-400">
              Avg GPA:{" "}
              <span className="font-semibold text-[#2ec7a8]">
                {(filtered.reduce((a, s) => a + s.gpa, 0) / filtered.length).toFixed(2)}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {confirmDelete && (() => {
        const s = students.find((x) => x.id === confirmDelete);
        return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-7 max-w-sm w-full">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 text-center mb-1">Delete Student?</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                This will permanently remove <span className="font-semibold text-slate-700">{s?.firstName} {s?.lastName}</span> from the system.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
