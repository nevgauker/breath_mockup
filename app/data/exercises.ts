import { Technique } from "./types";
export type { Phase as BreathingPhase, Technique } from "./types";

export const CATEGORIES = [
  { name: "Relaxation", sub: "Calm & restore", icon: "🌿", color: "#5EC394" },
  { name: "Focus", sub: "Sharpen attention", icon: "◎", color: "#4A9EAF" },
  { name: "Energy", sub: "Activate & uplift", icon: "⚡", color: "#D4634A" },
  { name: "Balance", sub: "Regulate & reset", icon: "〜", color: "#8B7EC3" },
];

export const ROUTINES = [
  {
    name: "Morning Activation",
    desc: "Wake up your body and mind",
    icon: "☀️",
    color: "#D4634A",
    difficulty: "Moderate" as const,
    techniques: 3,
    duration: 10,
  },
  {
    name: "Wind Down",
    desc: "Prepare for deep sleep",
    icon: "🌙",
    color: "#8B7EC3",
    difficulty: "Gentle" as const,
    techniques: 3,
    duration: 8,
  },
  {
    name: "Stress Reset",
    desc: "Quick nervous system reset",
    icon: "🌿",
    color: "#5EC394",
    difficulty: "Gentle" as const,
    techniques: 2,
    duration: 5,
  },
  {
    name: "Peak Performance",
    desc: "Maximize focus and output",
    icon: "⚡",
    color: "#4A9EAF",
    difficulty: "Intense" as const,
    techniques: 4,
    duration: 15,
  },
];

export const TECHNIQUES: Technique[] = [
  {
    id: "mindful",
    name: "Mindful Breathing",
    subtitle: "Awareness Without Control",

    pattern: "Natural",
    duration: "5 min",
    difficulty: "Beginner",
    tag: "Focus",

    color: "#4A9EAF",
    bg: "linear-gradient(160deg, #0d2535 0%, #0a1e2e 60%, #071520 100%)",
    accent: "#4A9EAF",

    phases: [
      {
        label: "Observe",
        duration: 4,
        scale: 1,
        instruction: "Observe without control",
        icon: "◎",
      },
    ],

    script: `Sit or lie down comfortably. Close your eyes. Don't try to change anything — just notice your breath as it is.

Ask yourself: Is it fast or slow? Are you breathing into your belly or your chest? Are there any pauses?

Just observe. Don't change anything.`,

    steps: [
      "Sit or lie comfortably",
      "Close your eyes",
      "Observe your natural breath",
      "Notice rhythm, depth, and pauses",
      "Return attention when distracted",
    ],

    benefits: [
      "Reduces stress and blood pressure",
      "Improves focus and awareness",
      "Activates parasympathetic system",
    ],

    contraindications: ["None known"],

    variations: [
      "Count exhales from 1–10",
      "Focus on nostril sensation only",
    ],

    completionMsg: "You have deepened your awareness.",

    sessions: 0,
    bestStreak: 0,
  },

  {
    id: "physio-sigh",
    name: "Physiological Sigh",
    subtitle: "Double Inhale Reset",

    pattern: "2 · 1 · 6",
    duration: "3 min",
    difficulty: "Beginner",
    tag: "Relax",

    color: "#5EC394",
    bg: "linear-gradient(160deg, #0a2018 0%, #071a12 60%, #050f0a 100%)",
    accent: "#5EC394",

    phases: [
      {
        label: "Inhale",
        duration: 2,
        scale: 1.2,
        instruction: "Deep inhale",
        icon: "↑",
      },
      {
        label: "Top-Up",
        duration: 1,
        scale: 1.35,
        instruction: "Short second inhale",
        icon: "↑↑",
      },
      {
        label: "Exhale",
        duration: 6,
        scale: 0.65,
        instruction: "Slow release",
        icon: "↓",
      },
    ],

    script: `Take a deep breath through your nose. Pause slightly. Without exhaling, take one more short inhale to fully expand your lungs.

Exhale slowly through your mouth and let your shoulders drop.

Repeat up to three times, then return to slow natural breathing.`,

    steps: [
      "Inhale deeply through the nose",
      "Take a second short inhale",
      "Exhale slowly through the mouth",
      "Repeat up to 3 times",
      "Return to slow breathing",
    ],

    benefits: [
      "Instant stress reduction",
      "Releases breath tension",
      "Helps regulate nervous system",
    ],

    contraindications: [
      "Avoid excessive repetition",
      "Not for people prone to dizziness",
    ],

    variations: [
      "Add longer exhale (8s)",
      "Do only 1–2 cycles for quick reset",
    ],

    completionMsg: "Reset complete.",

    sessions: 0,
    bestStreak: 0,
  },

  {
    id: "straw-exhale",
    name: "Straw Exhale",
    subtitle: "Pulsed Exhale Training",

    pattern: "Dynamic",
    duration: "4 min",
    difficulty: "Beginner",
    tag: "Relax",

    color: "#5EC394",
    bg: "linear-gradient(160deg, #0a2018 0%, #071a12 60%, #050f0a 100%)",
    accent: "#5EC394",

    phases: [
      {
        label: "Inhale",
        duration: 4,
        scale: 1.35,
        instruction: "Slow nasal inhale",
        icon: "↑",
      },
      {
        label: "Pulse Exhale",
        duration: 6,
        scale: 0.65,
        instruction: "Short bursts out",
        icon: "···",
      },
    ],

    script: `Inhale slowly through your nose.

Exhale through your mouth in short bursts, like inflating a balloon with pulses. Continue until your lungs are empty.

Repeat and notice if your inhale becomes deeper each round.`,

    steps: [
      "Inhale slowly through the nose",
      "Exhale in short pulsed bursts",
      "Continue until empty",
      "Repeat and observe expansion",
    ],

    benefits: [
      "Improves lung capacity",
      "Strengthens exhale control",
      "Engages diaphragm",
    ],

    contraindications: ["None known"],

    variations: [
      "Use a real straw for resistance",
      "Extend exhale duration gradually",
    ],

    completionMsg: "Your lungs feel more open.",

    sessions: 0,
    bestStreak: 0,
  },

  {
    id: "belly",
    name: "Belly Breathing",
    subtitle: "Diaphragmatic Foundation",

    pattern: "3 · 3 · 1",
    duration: "5 min",
    difficulty: "Beginner",
    tag: "Relax",

    color: "#5EC394",
    bg: "linear-gradient(160deg, #0a2018 0%, #071a12 60%, #050f0a 100%)",
    accent: "#5EC394",

    phases: [
      {
        label: "Inhale",
        duration: 3,
        scale: 1.35,
        instruction: "Belly rises",
        icon: "↑",
      },
      {
        label: "Exhale",
        duration: 3,
        scale: 0.65,
        instruction: "Belly falls",
        icon: "↓",
      },
      {
        label: "Pause",
        duration: 1,
        scale: 0.65,
        instruction: "Gentle pause",
        icon: "■",
      },
    ],

    script: `Lie down and place your hands on your belly.

Inhale slowly through your nose and let your belly rise. Keep your chest relaxed.

Exhale slowly and feel your belly fall.

Continue with a calm, steady rhythm.`,

    steps: [
      "Lie down comfortably",
      "Place hands on belly",
      "Inhale and expand belly",
      "Exhale and relax belly",
      "Keep chest still",
    ],

    benefits: [
      "Builds breathing foundation",
      "Reduces anxiety",
      "Improves oxygen efficiency",
    ],

    contraindications: [
      "Start lying down if unfamiliar",
    ],

    variations: [
      "Practice seated once mastered",
      "Add longer exhales",
    ],

    completionMsg: "Your diaphragm is activated.",

    sessions: 0,
    bestStreak: 0,
  },

  {
    id: "active-belly",
    name: "Active Belly Breathing",
    subtitle: "Core Activation Breath",

    pattern: "Dynamic",
    duration: "5 min",
    difficulty: "Intermediate",
    tag: "Energy",

    color: "#D4634A",
    bg: "linear-gradient(160deg, #2a1008 0%, #1e0c06 60%, #120804 100%)",
    accent: "#D4634A",

    phases: [
      {
        label: "Inhale",
        duration: 2,
        scale: 1.35,
        instruction: "Expand lower back",
        icon: "↑",
      },
      {
        label: "Exhale",
        duration: 2,
        scale: 0.65,
        instruction: "Engage core",
        icon: "↓",
      },
    ],

    script: `Inhale deeply into your lower back and sides.

As you exhale, gently engage your core and press your feet slightly inward.

Release and repeat with control.`,

    steps: [
      "Inhale into lower back",
      "Exhale and engage core",
      "Press feet inward slightly",
      "Release and repeat slowly",
    ],

    benefits: [
      "Activates core muscles",
      "Builds breath control",
      "Increases energy",
    ],

    contraindications: [
      "Avoid if you have abdominal injury",
      "Master basic belly breathing first",
    ],

    variations: [
      "Increase intensity gradually",
      "Add breath holds after inhale",
    ],

    completionMsg: "Energy activated.",

    sessions: 0,
    bestStreak: 0,
  },
];