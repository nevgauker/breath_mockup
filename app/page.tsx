"use client";

import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from "react";

type Screen = "home" | "practice" | "progress" | "routines" | "exercise";
type SessionView = "intro" | "session" | "complete";
type TimerHandle = ReturnType<typeof setInterval>;

type BreathingPhase = {
  label: string;
  duration: number;
  scale: number;
  instruction: string;
  icon: string;
};

type Technique = {
  id: string;
  name: string;
  subtitle: string;
  pattern: string;
  duration: string;
  difficulty: string;
  tag: string;
  color: string;
  bg: string;
  accent: string;
  phases: BreathingPhase[];
  benefits: string[];
  steps: string[];
  completionMsg: string;
  sessions: number;
  bestStreak: number;
};

const clearIntervalSafe = (timer: TimerHandle | null) => {
  if (timer !== null) {
    clearInterval(timer);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS: Array<{ id: Exclude<Screen, "exercise">; icon: string; label: string }> = [
  { id: "home", icon: "⊞", label: "Explore" },
  { id: "practice", icon: "◎", label: "Practice" },
  { id: "progress", icon: "▲", label: "Progress" },
  { id: "routines", icon: "☰", label: "Routines" },
];

const TECHNIQUES: Technique[] = [
  {
    id: "box",
    name: "Box Breathing",
    subtitle: "Navy SEAL Technique",
    pattern: "4 · 4 · 4 · 4",
    duration: "5 min",
    difficulty: "Beginner",
    tag: "Focus",
    color: "#4A9EAF",
    bg: "linear-gradient(160deg, #0d2535 0%, #0a1e2e 60%, #071520 100%)",
    accent: "#4A9EAF",
    phases: [
      { label: "Inhale", duration: 4, scale: 1.38, instruction: "Breathe in slowly through your nose", icon: "↑" },
      { label: "Hold Full", duration: 4, scale: 1.38, instruction: "Hold your breath, stay relaxed", icon: "■" },
      { label: "Exhale", duration: 4, scale: 0.62, instruction: "Release slowly through your mouth", icon: "↓" },
      { label: "Hold Empty", duration: 4, scale: 0.62, instruction: "Rest before the next breath", icon: "■" },
    ],
    benefits: ["Reduces cortisol", "Improves focus", "Calms the nervous system"],
    steps: [
      "Sit upright with your feet flat on the floor",
      "Relax your shoulders and jaw completely",
      "Follow the circle — inhale as it expands",
      "Hold at the peak, then exhale as it contracts",
    ],
    completionMsg: "Well done. Your nervous system has been reset.",
    sessions: 48,
    bestStreak: 14,
  },
  {
    id: "478",
    name: "4-7-8 Breathing",
    subtitle: "Dr. Weil's Sleep Method",
    pattern: "4 · 7 · 8",
    duration: "4 min",
    difficulty: "Intermediate",
    tag: "Sleep",
    color: "#8B7EC3",
    bg: "linear-gradient(160deg, #1a1530 0%, #110f28 60%, #0c0b1e 100%)",
    accent: "#8B7EC3",
    phases: [
      { label: "Inhale", duration: 4, scale: 1.38, instruction: "Breathe in quietly through your nose", icon: "↑" },
      { label: "Hold", duration: 7, scale: 1.38, instruction: "Hold firmly — tongue on roof of mouth", icon: "■" },
      { label: "Exhale", duration: 8, scale: 0.62, instruction: "Exhale completely through your mouth with a whoosh", icon: "↓" },
    ],
    benefits: ["Induces sleep in minutes", "Reduces anxiety", "Activates parasympathetic system"],
    steps: [
      "Place the tip of your tongue behind your upper front teeth",
      "Exhale completely through your mouth making a whoosh sound",
      "Close your mouth and inhale quietly through your nose",
      "Exhale completely again — this is one breath cycle",
    ],
    completionMsg: "Perfect. Your body is ready for deep rest.",
    sessions: 32,
    bestStreak: 21,
  },
  {
    id: "wimhof",
    name: "Wim Hof Method",
    subtitle: "Controlled Hyperventilation",
    pattern: "30 Breaths · Retention",
    duration: "10 min",
    difficulty: "Advanced",
    tag: "Energy",
    color: "#D4634A",
    bg: "linear-gradient(160deg, #2a1008 0%, #1e0c06 60%, #120804 100%)",
    accent: "#D4634A",
    phases: [
      { label: "Power Inhale", duration: 2, scale: 1.5, instruction: "Inhale deeply through mouth — fill completely", icon: "↑↑" },
      { label: "Let Go", duration: 2, scale: 0.5, instruction: "Release naturally — don't force the exhale", icon: "↓" },
      { label: "Retention", duration: 8, scale: 0.68, instruction: "Hold after exhale — stay calm and still", icon: "◎" },
      { label: "Recovery", duration: 3, scale: 1.2, instruction: "Deep recovery breath — hold for 15s", icon: "↑" },
    ],
    benefits: ["Boosts energy instantly", "Strengthens immune system", "Increases cold tolerance"],
    steps: [
      "Find a comfortable seated or lying position",
      "30 rapid deep breaths — in through mouth, out naturally",
      "After 30 breaths, exhale and hold (retention phase)",
      "When you need to breathe, take one deep recovery breath",
    ],
    completionMsg: "Incredible. Your body chemistry has shifted.",
    sessions: 19,
    bestStreak: 7,
  },
  {
    id: "diaphragmatic",
    name: "Diaphragmatic",
    subtitle: "Deep Belly Breathing",
    pattern: "5 · 0 · 5",
    duration: "6 min",
    difficulty: "Beginner",
    tag: "Relax",
    color: "#5EC394",
    bg: "linear-gradient(160deg, #0a2018 0%, #071a12 60%, #050f0a 100%)",
    accent: "#5EC394",
    phases: [
      { label: "Belly Inhale", duration: 5, scale: 1.38, instruction: "Breathe into your belly — let it rise", icon: "↑" },
      { label: "Exhale", duration: 5, scale: 0.62, instruction: "Let your belly fall naturally and fully", icon: "↓" },
    ],
    benefits: ["Lowers heart rate", "Reduces blood pressure", "Maximises oxygen exchange"],
    steps: [
      "Place one hand on your chest, one on your belly",
      "Breathe so only the belly hand rises — chest stays still",
      "Inhale slowly through your nose for a full 5 counts",
      "Exhale through pursed lips — feel your belly hollow",
    ],
    completionMsg: "Beautiful. You've activated your rest-and-digest system.",
    sessions: 61,
    bestStreak: 30,
  },
];

const CATEGORIES = [
  { name: "Relaxation & Stress", icon: "🌊", color: "#4A9EAF", sub: "Calm the nervous system" },
  { name: "Sleep & Wind Down", icon: "🌙", color: "#8B7EC3", sub: "Prepare for deep rest" },
  { name: "Energy & Focus", icon: "⚡", color: "#E8A838", sub: "Sharpen mental clarity" },
  { name: "Anxiety Relief", icon: "🫁", color: "#5EC394", sub: "Ground yourself fast" },
  { name: "Athletic Performance", icon: "🏃", color: "#D4634A", sub: "Optimise oxygen intake" },
  { name: "Mindfulness", icon: "☯", color: "#A47EC3", sub: "Deepen awareness" },
];

const ROUTINES = [
  { name: "Morning Energiser", icon: "🌅", techniques: 3, duration: 10, difficulty: "Moderate", color: "#E8A838", desc: "Box + Wim Hof + Diaphragmatic" },
  { name: "Pre-Sleep Wind Down", icon: "🌙", techniques: 2, duration: 8, difficulty: "Easy", color: "#8B7EC3", desc: "4-7-8 + Diaphragmatic" },
  { name: "Midday Reset", icon: "☀️", techniques: 2, duration: 5, difficulty: "Easy", color: "#4A9EAF", desc: "Box + Diaphragmatic" },
  { name: "Pre-Workout Boost", icon: "💪", techniques: 3, duration: 7, difficulty: "Intense", color: "#D4634A", desc: "Wim Hof + Box + Energy Breath" },
];

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const STREAK_DATA = [3, 5, 4, 6, 5, 3, 4];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED BREATHING CIRCLE (full-featured)
// ─────────────────────────────────────────────────────────────────────────────
function BreathingOrb({ technique, active, size = 200 }: { technique: Technique; active: boolean; size?: number }) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [countdown, setCountdown] = useState(technique.phases[0].duration);
  const [cssScale, setCssScale] = useState(1.0);
  const intervalRef = useRef<TimerHandle | null>(null);
  const phaseIdxRef = useRef(0);
  const countRef = useRef(technique.phases[0].duration);

  useEffect(() => {
    clearIntervalSafe(intervalRef.current);
    if (!active) {
      setPhaseIdx(0);
      setCountdown(technique.phases[0].duration);
      setCssScale(1.0);
      phaseIdxRef.current = 0;
      countRef.current = technique.phases[0].duration;
      return;
    }
    setCssScale(technique.phases[0].scale);
    intervalRef.current = setInterval(() => {
      countRef.current -= 1;
      setCountdown(countRef.current);
      if (countRef.current <= 0) {
        phaseIdxRef.current = (phaseIdxRef.current + 1) % technique.phases.length;
        const next = technique.phases[phaseIdxRef.current];
        countRef.current = next.duration;
        setPhaseIdx(phaseIdxRef.current);
        setCountdown(next.duration);
        setCssScale(next.scale);
      }
    }, 1000);
    return () => clearIntervalSafe(intervalRef.current);
  }, [active, technique]);

  const phase = technique.phases[phaseIdx];
  const c = technique.color;
  const dur = active ? `${phase.duration}s` : "1s";

  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          position: "absolute",
          width: size * (0.95 + i * 0.12),
          height: size * (0.95 + i * 0.12),
          borderRadius: "50%",
          border: `1px solid ${c}`,
          opacity: active ? (0.22 - i * 0.06) : 0.05,
          transform: `scale(${active ? cssScale * (1 + i * 0.05) : 1})`,
          transition: `transform ${dur} ease-in-out, opacity 0.8s`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Glow blob */}
      {active && (
        <div style={{
          position: "absolute",
          width: size * 0.8,
          height: size * 0.8,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c}28 0%, transparent 70%)`,
          transform: `scale(${cssScale * 1.3})`,
          transition: `transform ${dur} ease-in-out`,
          filter: "blur(20px)",
          pointerEvents: "none",
        }} />
      )}

      {/* Main orb */}
      <div style={{
        width: size * 0.72,
        height: size * 0.72,
        borderRadius: "50%",
        background: active
          ? `radial-gradient(circle at 38% 32%, ${c}60, ${c}20)`
          : `radial-gradient(circle at 38% 32%, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
        border: `1.5px solid ${active ? c : "rgba(255,255,255,0.08)"}`,
        transform: `scale(${active ? cssScale : 1})`,
        transition: `transform ${dur} ease-in-out, background 0.8s, border-color 0.8s`,
        boxShadow: active ? `0 0 50px ${c}40, 0 0 20px ${c}20, inset 0 0 30px ${c}18` : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}>
        <div style={{ fontSize: active ? 12 : 20, color: active ? c : "rgba(255,255,255,0.2)", transition: "all 0.3s", lineHeight: 1 }}>
          {active ? phase.icon : "◎"}
        </div>
        <div style={{ fontSize: size * 0.18, fontFamily: "'Courier New', monospace", color: active ? "#fff" : "rgba(255,255,255,0.15)", fontWeight: 300, lineHeight: 1, marginTop: 2 }}>
          {active ? countdown : "·"}
        </div>
        <div style={{ fontSize: 8, color: active ? c : "rgba(255,255,255,0.15)", letterSpacing: 2.5, textTransform: "uppercase", marginTop: 2 }}>
          {active ? phase.label : "tap start"}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXERCISE DETAIL PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ExerciseDetail({ technique, onBack }: { technique: Technique; onBack: () => void }) {
  const [view, setView] = useState<SessionView>("intro"); // intro | session | complete
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const timerRef = useRef<TimerHandle | null>(null);
  const elapsedRef = useRef(0);
  const totalSecs = parseInt(technique.duration) * 60;

  // Track breaths from phase changes via a simple counter approach
  const phaseIdxRef = useRef(0);
  const countRef2 = useRef(technique.phases[0].duration);
  const breathRef = useRef(0);
  const phaseIntervalRef = useRef<TimerHandle | null>(null);

  const startSession = () => {
    setView("session");
    setActive(true);
    elapsedRef.current = 0;
    breathRef.current = 0;
    phaseIdxRef.current = 0;
    countRef2.current = technique.phases[0].duration;
    setPhaseIdx(0);
    setElapsed(0);
    setBreathCount(0);

    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsed((e) => e + 1);
      if (elapsedRef.current >= totalSecs) {
        clearIntervalSafe(timerRef.current);
        clearIntervalSafe(phaseIntervalRef.current);
        setActive(false);
        setView("complete");
      }
    }, 1000);

    phaseIntervalRef.current = setInterval(() => {
      countRef2.current -= 1;
      if (countRef2.current <= 0) {
        const nextIdx = (phaseIdxRef.current + 1) % technique.phases.length;
        phaseIdxRef.current = nextIdx;
        countRef2.current = technique.phases[nextIdx].duration;
        setPhaseIdx(nextIdx);
        if (nextIdx === 0) {
          breathRef.current += 1;
          setBreathCount(breathRef.current);
        }
      }
    }, 1000);
  };

  const endSession = () => {
    clearIntervalSafe(timerRef.current);
    clearIntervalSafe(phaseIntervalRef.current);
    setActive(false);
    setView("complete");
  };

  const resetSession = () => {
    clearIntervalSafe(timerRef.current);
    clearIntervalSafe(phaseIntervalRef.current);
    setActive(false);
    setView("intro");
    setElapsed(0);
    setBreathCount(0);
    setPhaseIdx(0);
  };

  const c = technique.color;
  const progress = Math.min(elapsed / totalSecs, 1);
  const currentPhase = technique.phases[phaseIdx];

  // Waveform bars
  const Waveform = ({ active: a }: { active: boolean }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 2.5 }}>
      <span style={{ fontSize: 9, letterSpacing: 2, color: a ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)", marginRight: 4 }}>AUDIO</span>
      {Array.from({ length: 18 }).map((_, i) => {
        const bars = [8, 14, 10, 18, 12, 20, 9, 16, 11, 19, 8, 15, 12, 17, 10, 14, 9, 16];
        return (
          <div key={i} style={{
            width: 2,
            height: a ? bars[i] : 3,
            background: c,
            borderRadius: 2,
            opacity: a ? (0.4 + (i % 4) * 0.15) : 0.15,
            transition: `height ${0.3 + (i % 3) * 0.1}s ease-in-out`,
          }} />
        );
      })}
      <span style={{ fontSize: 12, marginLeft: 4, opacity: a ? 0.7 : 0.2 }}>♪</span>
    </div>
  );

  // ── INTRO VIEW ──────────────────────────────────────────────────────────────
  if (view === "intro") {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: technique.bg, position: "relative", overflow: "hidden" }}>
        {/* Back + tag row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 0" }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 14px", color: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
          <div style={{ background: `${c}22`, border: `1px solid ${c}44`, borderRadius: 20, padding: "5px 14px", fontSize: 10, letterSpacing: 2, color: c }}>{technique.tag.toUpperCase()}</div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "20px 20px 0" }}>
          {/* Title */}
          <div style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: `${c}bb`, marginBottom: 6 }}>{technique.subtitle.toUpperCase()}</div>
            <div style={{ fontSize: 30, fontWeight: 200, color: "#fff", letterSpacing: -0.5, lineHeight: 1.1 }}>{technique.name}</div>
          </div>

          {/* Meta pills */}
          <div style={{ display: "flex", gap: 8, margin: "14px 0 24px" }}>
            {[["⏱", technique.duration], ["◉", technique.pattern], ["◈", technique.difficulty]].map(([icon, val]) => (
              <div key={val} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "6px 12px", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: c }}>{icon}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Preview orb */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <BreathingOrb technique={technique} active={false} size={180} />
          </div>

          {/* Phase timeline */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "16px", marginBottom: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>BREATHING PATTERN</div>
            <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
              {technique.phases.map((p: BreathingPhase, i: number) => {
                const totalD = technique.phases.reduce((a: number, b: BreathingPhase) => a + b.duration, 0);
                const w = (p.duration / totalD) * 100;
                return (
                  <div key={i} style={{ flex: w, textAlign: "center" }}>
                    <div style={{
                      height: 4,
                      background: `linear-gradient(90deg, ${c}${i % 2 === 0 ? "cc" : "55"}, ${c}${i % 2 === 0 ? "55" : "cc"})`,
                      margin: "0 1px 8px",
                      borderRadius: 2,
                    }} />
                    <div style={{ fontSize: 8, color: c, letterSpacing: 1, marginBottom: 2 }}>{p.label.toUpperCase()}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 14, color: "#fff" }}>{p.duration}s</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "16px", marginBottom: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>BENEFITS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {technique.benefits.map((b: string) => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: c, flexShrink: 0 }} />
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{b}</div>
                </div>
              ))}
            </div>
          </div>

          {/* How to */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "16px", marginBottom: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>HOW TO PREPARE</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {technique.steps.map((s: string, i: number) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${c}22`, border: `1px solid ${c}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: c, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {([
              ["Your Sessions", technique.sessions],
              ["Best Streak", `${technique.bestStreak} days`],
            ] as Array<[string, string | number]>).map(([l, v]) => (
              <div key={l} style={{ background: `${c}10`, border: `1px solid ${c}20`, borderRadius: 14, padding: "14px 12px" }}>
                <div style={{ fontSize: 20, color: "#fff", fontWeight: 200 }}>{v}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, marginTop: 2 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Start CTA */}
        <div style={{ padding: "16px 20px 20px", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
          <button onClick={startSession} style={{
            width: "100%", padding: "16px", background: c, color: "#fff",
            border: "none", borderRadius: 16, fontSize: 12, letterSpacing: 3,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: `0 8px 30px ${c}50`,
          }}>
            ▶  BEGIN SESSION
          </button>
        </div>
      </div>
    );
  }

  // ── SESSION VIEW ────────────────────────────────────────────────────────────
  if (view === "session") {
    const progressCircleR = 32;
    const circumference = 2 * Math.PI * progressCircleR;
    const progressOffset = circumference * (1 - progress);

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: technique.bg, position: "relative" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 0", flexShrink: 0 }}>
          <button onClick={resetSession} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 14px", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>✕ End</button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)" }}>SESSION</div>
            <div style={{ fontSize: 13, color: "#fff", fontWeight: 300 }}>{technique.name}</div>
          </div>
          {/* Timer ring */}
          <div style={{ position: "relative", width: 48, height: 48 }}>
            <svg width="48" height="48" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="24" cy="24" r={progressCircleR} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <circle cx="24" cy="24" r={progressCircleR} fill="none" stroke={c} strokeWidth="2"
                strokeDasharray={circumference} strokeDashoffset={progressOffset}
                style={{ transition: "stroke-dashoffset 1s linear" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontFamily: "monospace" }}>
              {Math.floor((totalSecs - elapsed) / 60)}:{String((totalSecs - elapsed) % 60).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Phase instruction strip */}
        <div style={{ padding: "20px 20px 0", flexShrink: 0 }}>
          <div style={{
            background: `${c}15`,
            border: `1px solid ${c}30`,
            borderRadius: 14,
            padding: "12px 16px",
            textAlign: "center",
            minHeight: 46,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>{currentPhase.instruction}</div>
          </div>
        </div>

        {/* Main orb — center of screen */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <BreathingOrb technique={technique} active={active} size={220} />
          <Waveform active={active} />
        </div>

        {/* Phase progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20, flexShrink: 0 }}>
          {technique.phases.map((p: BreathingPhase, i: number) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i === phaseIdx ? c : `${c}25`,
                border: `1px solid ${i === phaseIdx ? c : `${c}40`}`,
                transition: "all 0.3s",
                transform: i === phaseIdx ? "scale(1.4)" : "scale(1)",
              }} />
              <div style={{ fontSize: 8, color: i === phaseIdx ? c : "rgba(255,255,255,0.2)", letterSpacing: 1, transition: "color 0.3s" }}>
                {p.label.toUpperCase().slice(0, 6)}
              </div>
            </div>
          ))}
        </div>

        {/* Breath counter */}
        <div style={{ textAlign: "center", marginBottom: 20, flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 3 }}>CYCLES COMPLETE </span>
          <span style={{ fontSize: 14, color: c, fontFamily: "monospace" }}>{breathCount}</span>
        </div>

        {/* Pause / end */}
        <div style={{ padding: "0 20px 20px", flexShrink: 0, display: "flex", gap: 10 }}>
          <button onClick={() => setActive(!active)} style={{
            flex: 1, padding: "14px", background: active ? "rgba(255,255,255,0.06)" : c,
            color: "#fff", border: `1px solid ${active ? "rgba(255,255,255,0.12)" : c}`,
            borderRadius: 14, fontSize: 11, letterSpacing: 2, cursor: "pointer", fontFamily: "inherit",
          }}>
            {active ? "⏸  PAUSE" : "▶  RESUME"}
          </button>
          <button onClick={endSession} style={{
            padding: "14px 18px", background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14, fontSize: 11, cursor: "pointer", fontFamily: "inherit",
          }}>FINISH</button>
        </div>
      </div>
    );
  }

  // ── COMPLETE VIEW ───────────────────────────────────────────────────────────
  if (view === "complete") {
    const minutesDone = Math.max(1, Math.floor(elapsed / 60));
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: technique.bg, alignItems: "center", justifyContent: "center", padding: "0 24px", position: "relative", overflow: "hidden" }}>
        {/* Decorative rings */}
        {[160, 220, 290].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: `1px solid ${c}`, opacity: 0.08 - i * 0.02 }} />
        ))}

        <div style={{ textAlign: "center", zIndex: 1 }}>
          {/* Checkmark orb */}
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: `radial-gradient(circle, ${c}44, ${c}11)`, border: `2px solid ${c}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 28px", boxShadow: `0 0 50px ${c}40` }}>
            ✓
          </div>

          <div style={{ fontSize: 10, letterSpacing: 4, color: c, marginBottom: 8 }}>SESSION COMPLETE</div>
          <div style={{ fontSize: 26, fontWeight: 200, color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>{technique.name}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 36, lineHeight: 1.6 }}>{technique.completionMsg}</div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 36 }}>
            {[
              ["⏱", `${minutesDone}`, "minutes"],
              ["◉", `${breathCount}`, "cycles"],
              ["♡", "72", "avg bpm"],
            ].map(([icon, val, label]) => (
              <div key={label} style={{ background: `${c}12`, border: `1px solid ${c}22`, borderRadius: 16, padding: "14px 8px" }}>
                <div style={{ fontSize: 14, color: c, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 22, color: "#fff", fontWeight: 200 }}>{val}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, marginTop: 2 }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>

          {/* Mood check */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "16px", marginBottom: 28 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>HOW DO YOU FEEL?</div>
            <div style={{ display: "flex", justifyContent: "space-around", fontSize: 24 }}>
              {["😩", "😐", "🙂", "😊", "🤩"].map((m, i) => (
                <span key={i} style={{ cursor: "pointer", opacity: i === 3 ? 1 : 0.35, transform: i === 3 ? "scale(1.3)" : "scale(1)", transition: "all 0.2s" }}>{m}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={startSession} style={{ padding: "14px", background: c, color: "#fff", border: "none", borderRadius: 14, fontSize: 11, letterSpacing: 3, cursor: "pointer", fontFamily: "inherit", boxShadow: `0 8px 30px ${c}40` }}>
              ↺  DO IT AGAIN
            </button>
            <button onClick={() => { setView("intro"); setElapsed(0); setBreathCount(0); }} style={{ padding: "14px", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, fontSize: 11, letterSpacing: 2, cursor: "pointer", fontFamily: "inherit" }}>
              ← BACK TO GUIDE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREENS
// ─────────────────────────────────────────────────────────────────────────────
function HomeScreen({ onNavigate }: { onNavigate: Dispatch<SetStateAction<Screen>> }) {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#4A9EAF", marginBottom: 6 }}>GOOD MORNING</div>
        <div style={{ fontSize: 28, fontWeight: 200, color: "#fff", letterSpacing: -0.5 }}>Breathe with intention</div>
      </div>

      {/* Hero */}
      <div onClick={() => onNavigate("practice")} style={{
        background: "linear-gradient(135deg, #1a3a4a, #0f2535)",
        borderRadius: 20, padding: "22px 20px", marginBottom: 24,
        border: "1px solid rgba(74,158,175,0.3)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 110, height: 110, borderRadius: "50%", background: "rgba(74,158,175,0.07)", border: "1px solid rgba(74,158,175,0.12)" }} />
        <div>
          <div style={{ fontSize: 10, color: "#4A9EAF", letterSpacing: 2, marginBottom: 4 }}>TODAY'S FOCUS</div>
          <div style={{ fontSize: 20, color: "#fff", fontWeight: 300 }}>Box Breathing</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>4 · 4 · 4 · 4 · 5 min</div>
          <div style={{ marginTop: 14, display: "inline-block", background: "#4A9EAF", color: "#fff", fontSize: 10, letterSpacing: 2, padding: "7px 16px", borderRadius: 20 }}>BEGIN →</div>
        </div>
        <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1.5px solid rgba(74,158,175,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🫁</div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[["7", "Day Streak"], ["48", "Sessions"], ["3.2h", "This Week"]].map(([v, l]) => (
          <div key={l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 22, color: "#fff", fontWeight: 200 }}>{v}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>CATEGORIES</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.name} style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}25`, borderRadius: 16, padding: "14px 12px", cursor: "pointer" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{cat.icon}</div>
            <div style={{ fontSize: 11, color: "#fff" }}>{cat.name}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{cat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticeScreen({ onSelectTechnique }: { onSelectTechnique: (technique: Technique) => void }) {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ fontSize: 10, letterSpacing: 4, color: "#4A9EAF", marginBottom: 4 }}>PRACTICE</div>
      <div style={{ fontSize: 26, fontWeight: 200, color: "#fff", marginBottom: 6 }}>Techniques</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>Tap any technique to begin a guided session</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {TECHNIQUES.map((t) => (
          <div key={t.id} onClick={() => onSelectTechnique(t)} style={{
            background: `linear-gradient(135deg, ${t.color}14, ${t.color}06)`,
            border: `1px solid ${t.color}28`,
            borderRadius: 20, padding: "20px", cursor: "pointer",
            display: "flex", gap: 16, alignItems: "center",
          }}>
            {/* Mini orb preview */}
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: `radial-gradient(circle, ${t.color}30, ${t.color}10)`, border: `1.5px solid ${t.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {t.tag === "Focus" ? "◎" : t.tag === "Sleep" ? "🌙" : t.tag === "Energy" ? "⚡" : "🌿"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 15, color: "#fff" }}>{t.name}</div>
                <div style={{ background: `${t.color}22`, color: t.color, fontSize: 8, letterSpacing: 1.5, padding: "3px 8px", borderRadius: 8, border: `1px solid ${t.color}33` }}>{t.tag.toUpperCase()}</div>
              </div>
              <div style={{ fontSize: 10, color: t.color, fontFamily: "monospace", letterSpacing: 3, marginBottom: 4 }}>{t.pattern}</div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>⏱ {t.duration}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>◈ {t.difficulty}</span>
              </div>
            </div>
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 16 }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressScreen() {
  const [mood, setMood] = useState(3);
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ fontSize: 10, letterSpacing: 4, color: "#4A9EAF", marginBottom: 4 }}>MONITORING</div>
      <div style={{ fontSize: 26, fontWeight: 200, color: "#fff", marginBottom: 24 }}>Your progress</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[["48", "Sessions", "◉", "#4A9EAF"], ["312", "Total Minutes", "⏱", "#8B7EC3"], ["7 days", "Streak", "🔥", "#E8A838"], ["6.5 min", "Avg Session", "〜", "#5EC394"]].map(([v, l, ic, col]) => (
          <div key={l} style={{ background: `${col}12`, border: `1px solid ${col}22`, borderRadius: 16, padding: "16px 14px" }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{ic}</div>
            <div style={{ fontSize: 22, color: "#fff", fontWeight: 200 }}>{v}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, marginTop: 2 }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "18px 14px", marginBottom: 16 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>WEEKLY SESSIONS</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 72, marginBottom: 6 }}>
          {STREAK_DATA.map((v, i) => (
            <div key={i} style={{ flex: 1, height: `${(v / 6) * 66}px`, background: i === 4 ? "#4A9EAF" : "rgba(74,158,175,0.2)", borderRadius: "4px 4px 0 0", border: i === 4 ? "1px solid #4A9EAF" : "none" }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 9, color: i === 4 ? "#4A9EAF" : "rgba(255,255,255,0.22)" }}>{d}</div>
          ))}
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,99,74,0.18)", borderRadius: 18, padding: "16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 26 }}>❤️</div>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>HRV ESTIMATE</div>
          <div style={{ fontSize: 26, color: "#fff", fontWeight: 200 }}>72 <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>ms</span></div>
          <div style={{ fontSize: 9, color: "#5EC394", letterSpacing: 1 }}>↑ Good recovery</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end", gap: 2 }}>
          {[12, 18, 10, 22, 14, 20, 16, 24, 14, 20].map((h, i) => (
            <div key={i} style={{ width: 3, height: h, background: `rgba(212,99,74,${0.25 + i * 0.07})`, borderRadius: 2 }} />
          ))}
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "16px" }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>HOW DO YOU FEEL TODAY?</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {["😩", "😐", "🙂", "😊", "🤩"].map((m, i) => (
            <button key={i} onClick={() => setMood(i)} style={{ background: mood === i ? "rgba(74,158,175,0.15)" : "transparent", border: mood === i ? "1px solid rgba(74,158,175,0.4)" : "1px solid transparent", borderRadius: 10, padding: "8px 10px", fontSize: 20, cursor: "pointer", transform: mood === i ? "scale(1.2)" : "scale(1)", transition: "all 0.2s" }}>{m}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoutinesScreen() {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ fontSize: 10, letterSpacing: 4, color: "#4A9EAF", marginBottom: 4 }}>DAILY</div>
      <div style={{ fontSize: 26, fontWeight: 200, color: "#fff", marginBottom: 6 }}>Your routines</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 24 }}>Pre-built sequences for every moment</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {ROUTINES.map((r) => (
          <div key={r.name} style={{ background: `${r.color}12`, border: `1px solid ${r.color}25`, borderRadius: 20, padding: "18px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: `${r.color}18`, border: `1px solid ${r.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{r.icon}</div>
                <div>
                  <div style={{ fontSize: 15, color: "#fff" }}>{r.name}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{r.desc}</div>
                </div>
              </div>
              <div style={{ background: r.difficulty === "Intense" ? "rgba(212,99,74,0.18)" : r.difficulty === "Moderate" ? "rgba(232,168,56,0.18)" : "rgba(94,195,148,0.18)", color: r.difficulty === "Intense" ? "#D4634A" : r.difficulty === "Moderate" ? "#E8A838" : "#5EC394", fontSize: 8, letterSpacing: 1.5, padding: "4px 9px", borderRadius: 8, border: "1px solid currentColor" }}>{r.difficulty.toUpperCase()}</div>
            </div>
            <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>● {r.techniques} techniques</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>● {r.duration} min</span>
            </div>
            <button style={{ width: "100%", background: r.color, color: "#fff", border: "none", borderRadius: 12, padding: "11px", fontSize: 10, letterSpacing: 3, cursor: "pointer", fontFamily: "inherit" }}>START ROUTINE →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP SHELL
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);

  const handleSelectTechnique = (t: Technique) => {
    setSelectedTechnique(t);
    setScreen("exercise");
  };

  const handleBack = () => {
    setSelectedTechnique(null);
    setScreen("practice");
  };

  const showNav = screen !== "exercise";

  return (
    <div style={{ minHeight: "100vh", background: "#070e16", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif" }}>
      {/* Phone */}
      <div style={{ width: 390, height: 844, background: "#0d1e2e", borderRadius: 52, border: "1px solid rgba(255,255,255,0.09)", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)" }}>
        {/* Status bar */}
        <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0, background: screen === "exercise" ? "transparent" : "transparent", zIndex: 10 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5 }}>9:41</div>
          <div style={{ width: 110, height: 26, background: "#0d1e2e", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, position: "absolute", left: "50%", transform: "translateX(-50%)" }} />
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>⚡ 87%</div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", display: "flex", flexDirection: "column" }}>
          {screen === "home" && <HomeScreen onNavigate={setScreen} />}
          {screen === "practice" && <PracticeScreen onSelectTechnique={handleSelectTechnique} />}
          {screen === "progress" && <ProgressScreen />}
          {screen === "routines" && <RoutinesScreen />}
          {screen === "exercise" && selectedTechnique && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <ExerciseDetail technique={selectedTechnique} onBack={handleBack} />
            </div>
          )}
        </div>

        {/* Bottom nav */}
        {showNav && (
          <div style={{ height: 78, background: "rgba(10,18,28,0.96)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-around", flexShrink: 0, backdropFilter: "blur(20px)" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => setScreen(item.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 16px", borderRadius: 12 }}>
                <div style={{ fontSize: 17, color: screen === item.id ? "#4A9EAF" : "rgba(255,255,255,0.22)", transition: "color 0.2s" }}>{item.icon}</div>
                <div style={{ fontSize: 8, letterSpacing: 1.5, color: screen === item.id ? "#4A9EAF" : "rgba(255,255,255,0.18)", transition: "color 0.2s" }}>{item.label.toUpperCase()}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
