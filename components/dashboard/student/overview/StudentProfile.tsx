"use client";

import React, { useState } from "react";
import type { Student, Achievement } from "./student";

// ── helpers ──────────────────────────────────────────────────
const gradeColor = (score: number) => {
  if (score >= 90) return "#2ec7a8";
  if (score >= 80) return "#3b82f6";
  if (score >= 70) return "#f59e0b";
  if (score >= 60) return "#f97316";
  return "#ef4444";
};

const achievementBadge: Record<Achievement["category"], { emoji: string; bg: string; text: string }> = {
  academic:   { emoji: "🏆", bg: "bg-amber-50",   text: "text-amber-700" },
  sports:     { emoji: "⚽", bg: "bg-blue-50",    text: "text-blue-700" },
  arts:       { emoji: "🎨", bg: "bg-purple-50",  text: "text-purple-700" },
  leadership: { emoji: "🌟", bg: "bg-[#2ec7a8]/10", text: "text-[#2ec7a8]" },
};

const transportLabel: Record<string, string> = {
  school_bus: "🚌 School Bus",
  private: "🚗 Private",
  walking: "🚶 Walking",
  other: "🔄 Other",
};

const overallAttendance = (s: Student) => {
  const total = s.attendanceHistory.reduce((a, m) => a + m.total, 0);
  const present = s.attendanceHistory.reduce((a, m) => a + m.present, 0);
  return total ? Math.round((present / total) * 100) : 0;
};

const avgScore = (s: Student) =>
  s.subjectProgress.length
    ? Math.round(s.subjectProgress.reduce((a, x) => a + x.score, 0) / s.subjectProgress.length)
    : 0;

// ── Sub-components ────────────────────────────────────────────
const StatCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow">
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color ?? "text-slate-800"}`}>{value}</p>
    {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
  </div>
);

const ScoreBar = ({ label, score, grade, attendance }: { label: string; score: number; grade: string; attendance: number }) => {
  const color = gradeColor(score);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{attendance}% attend.</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>{grade}</span>
          <span className="text-sm font-bold text-slate-700">{score}</span>
        </div>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
    </div>
  );
};

const RadarChart = ({ subjects }: { subjects: { subject: string; score: number }[] }) => {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 75;
  const n = subjects.length;

  const points = subjects.map((s, i) => {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
    const factor = s.score / 100;
    return { x: cx + r * factor * Math.cos(angle), y: cy + r * factor * Math.sin(angle) };
  });

  const gridPoints = (factor: number) =>
    subjects.map((_, i) => {
      const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
      return `${cx + r * factor * Math.cos(angle)},${cy + r * factor * Math.sin(angle)}`;
    }).join(" ");

  const labelPos = subjects.map((s, i) => {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
    return { x: cx + (r + 20) * Math.cos(angle), y: cy + (r + 20) * Math.sin(angle), label: s.subject.split(" ")[0] };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[200px] mx-auto">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={gridPoints(f)} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {subjects.map((_, i) => {
        const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="#e2e8f0" strokeWidth="1" />;
      })}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="#2ec7a8"
        fillOpacity="0.2"
        stroke="#2ec7a8"
        strokeWidth="2"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#2ec7a8" />
      ))}
      {labelPos.map((l, i) => (
        <text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#64748b" fontWeight="600">
          {l.label}
        </text>
      ))}
    </svg>
  );
};

const AttendanceChart = ({ data }: { data: Student["attendanceHistory"] }) => {
  const max = Math.max(...data.map((d) => d.total));
  return (
    <div className="flex items-end justify-between gap-2 h-28 mt-2">
      {data.map((d) => {
        const pct = d.total ? (d.present / d.total) * 100 : 0;
        const barH = d.total ? (d.total / max) * 100 : 0;
        return (
          <div key={d.month} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[10px] font-semibold text-[#2ec7a8]">{Math.round(pct)}%</span>
            <div className="w-full rounded-t-lg overflow-hidden bg-slate-100" style={{ height: `${barH}%`, minHeight: 8 }}>
              <div
                className="w-full rounded-t-lg transition-all duration-700"
                style={{ height: `${pct}%`, background: "#2ec7a8" }}
              />
            </div>
            <span className="text-[10px] text-slate-400">{d.month}</span>
          </div>
        );
      })}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────
interface Props {
  student: Student;
  onBack:  () => void;
  onEdit:  (student: Student) => void;
}

type Tab = "overview" | "academic" | "attendance" | "personal";

export default function StudentProfile({ student, onBack, onEdit }: Props) {
  const [tab, setTab] = useState<Tab>("overview");

  const attendance = overallAttendance(student);
  const score = avgScore(student);

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "overview",   label: "Overview",   icon: "📊" },
    { key: "academic",   label: "Academic",   icon: "📚" },
    { key: "attendance", label: "Attendance", icon: "📅" },
    { key: "personal",   label: "Personal",   icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf9] via-white to-slate-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#2ec7a8] to-[#1ea88e] pt-6 pb-16 px-4 md:px-8 relative overflow-hidden z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white -translate-x-16 translate-y-16" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Directory
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={student.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.firstName}`}
              alt={student.firstName}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl border-4 border-white/30 shadow-xl object-cover bg-white/20"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">
                {student.firstName} {student.lastName}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className="text-white/80 text-sm">{student.grade} — Section {student.section}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-white/80 text-sm">Roll #{student.rollNumber}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="font-mono text-white/70 text-xs bg-white/15 px-2 py-0.5 rounded-md">{student.studentId}</span>
              </div>
            </div>
            <button
              onClick={() => onEdit(student)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all backdrop-blur-sm border border-white/20"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-12 pb-12 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard label="GPA" value={student.gpa.toFixed(1)} sub="out of 4.0" color="text-[#2ec7a8]" />
          <StatCard label="Avg Score" value={`${score}%`} sub="across subjects" color={score >= 80 ? "text-[#2ec7a8]" : score >= 65 ? "text-amber-500" : "text-red-500"} />
          <StatCard label="Attendance" value={`${attendance}%`} sub="overall rate" color={attendance >= 90 ? "text-[#2ec7a8]" : attendance >= 75 ? "text-amber-500" : "text-red-500"} />
          <StatCard label="Activities" value={`${student.extracurriculars.length}`} sub="clubs & sports" />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-all ${
                  tab === t.key
                    ? "text-[#2ec7a8] border-b-2 border-[#2ec7a8] bg-[#2ec7a8]/5"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview */}
            {tab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Radar */}
                  <div>
                      <h3 className="text-sm font-bold text-slate-700 mb-3">Subject Performance Radar</h3>
                      <div className="max-w-[260px] md:max-w-[320px] mx-auto md:mx-0">
                        <RadarChart subjects={student.subjectProgress} />
                      </div>
                    </div>
                  {/* Achievements */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 mb-3">
                      Achievements
                      <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#2ec7a8]/10 text-[#2ec7a8]">{student.achievements.length}</span>
                    </h3>
                    {student.achievements.length === 0 ? (
                      <p className="text-sm text-slate-400 italic">No achievements recorded yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {student.achievements.map((a, i) => {
                          const cfg = achievementBadge[a.category];
                          return (
                            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl ${cfg.bg}`}>
                              <span className="text-xl">{cfg.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold truncate ${cfg.text}`}>{a.title}</p>
                                <p className="text-xs text-slate-400">{new Date(a.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Extracurriculars */}
                <div>
                  <h3 className="text-sm font-bold text-slate-700 mb-3">Extracurricular Activities</h3>
                  <div className="flex flex-wrap gap-2">
                    {student.extracurriculars.length === 0
                      ? <p className="text-sm text-slate-400 italic">None enrolled</p>
                      : student.extracurriculars.map((e) => (
                          <span key={e} className="px-3 py-1.5 rounded-full bg-[#2ec7a8]/10 text-[#2ec7a8] text-xs font-semibold border border-[#2ec7a8]/20">
                            {e}
                          </span>
                        ))}
                  </div>
                </div>
              </div>
            )}

            {/* Academic */}
            {tab === "academic" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-700">Subject-wise Performance</h3>
                  {student.subjectProgress.map((sp) => (
                    <ScoreBar key={sp.subject} label={sp.subject} score={sp.score} grade={sp.grade} attendance={sp.attendance} />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Admission Date</p>
                    <p className="text-sm font-semibold text-slate-700">{new Date(student.admissionDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                  {student.previousSchool && (
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Previous School</p>
                      <p className="text-sm font-semibold text-slate-700">{student.previousSchool}</p>
                    </div>
                  )}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Transport</p>
                    <p className="text-sm font-semibold text-slate-700">{transportLabel[student.transportMode] ?? student.transportMode}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Attendance */}
            {tab === "attendance" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-700">Monthly Attendance</h3>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="w-3 h-3 rounded bg-[#2ec7a8]" /> Present
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="w-3 h-3 rounded bg-slate-200" /> Absent
                    </span>
                  </div>
                </div>
                <AttendanceChart data={student.attendanceHistory} />

                {/* Monthly breakdown */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[400px]">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left py-2 text-xs font-bold text-slate-400 uppercase">Month</th>
                        <th className="text-center py-2 text-xs font-bold text-slate-400 uppercase">Present</th>
                        <th className="text-center py-2 text-xs font-bold text-slate-400 uppercase">Absent</th>
                        <th className="text-center py-2 text-xs font-bold text-slate-400 uppercase">Total</th>
                        <th className="text-right py-2 text-xs font-bold text-slate-400 uppercase">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {student.attendanceHistory.map((m) => {
                        const rate = m.total ? Math.round((m.present / m.total) * 100) : 0;
                        return (
                          <tr key={m.month}>
                            <td className="py-2.5 font-medium text-slate-700">{m.month}</td>
                            <td className="py-2.5 text-center text-[#2ec7a8] font-semibold">{m.present}</td>
                            <td className="py-2.5 text-center text-red-400 font-semibold">{m.absent}</td>
                            <td className="py-2.5 text-center text-slate-500">{m.total}</td>
                            <td className="py-2.5 text-right">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rate >= 90 ? "bg-[#2ec7a8]/10 text-[#2ec7a8]" : rate >= 75 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-500"}`}>
                                {rate}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Personal */}
            {tab === "personal" && (
              <div className="space-y-6">
                {/* Personal Info */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Personal Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      ["Date of Birth", new Date(student.dateOfBirth).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })],
                      ["Gender", student.gender.charAt(0).toUpperCase() + student.gender.slice(1)],
                      ["Blood Group", student.bloodGroup],
                      ["Nationality", student.nationality],
                      ["Religion", student.religion],
                      ["City", student.city],
                      ["Country", student.country],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-slate-50 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-slate-400 mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-slate-700">{value || "—"}</p>
                      </div>
                    ))}
                    {student.phone && (
                      <div className="bg-slate-50 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-slate-400 mb-0.5">Phone</p>
                        <p className="text-sm font-semibold text-slate-700">{student.phone}</p>
                      </div>
                    )}
                    {student.email && (
                      <div className="bg-slate-50 rounded-xl px-4 py-3 sm:col-span-2">
                        <p className="text-xs font-semibold text-slate-400 mb-0.5">Email</p>
                        <p className="text-sm font-semibold text-slate-700">{student.email}</p>
                      </div>
                    )}
                    <div className="bg-slate-50 rounded-xl px-4 py-3 sm:col-span-2">
                      <p className="text-xs font-semibold text-slate-400 mb-0.5">Address</p>
                      <p className="text-sm font-semibold text-slate-700">{student.address}, {student.city}, {student.state}, {student.country}</p>
                    </div>
                  </div>
                </section>

                {/* Guardian */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Parent / Guardian</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      ["Parent Name", student.parentName],
                      ["Phone", student.parentPhone],
                      ["Email", student.parentEmail],
                      ["Occupation", student.parentOccupation],
                    ].filter(([, v]) => v).map(([label, value]) => (
                      <div key={label} className="bg-slate-50 rounded-xl px-4 py-3">
                        <p className="text-xs font-semibold text-slate-400 mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-slate-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Medical */}
                {(student.medicalConditions || student.allergies) && (
                  <section>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Medical Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {student.medicalConditions && (
                        <div className="bg-red-50 rounded-xl px-4 py-3">
                          <p className="text-xs font-semibold text-red-400 mb-0.5">Medical Conditions</p>
                          <p className="text-sm font-semibold text-red-700">{student.medicalConditions}</p>
                        </div>
                      )}
                      {student.allergies && (
                        <div className="bg-orange-50 rounded-xl px-4 py-3">
                          <p className="text-xs font-semibold text-orange-400 mb-0.5">Allergies</p>
                          <p className="text-sm font-semibold text-orange-700">{student.allergies}</p>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
