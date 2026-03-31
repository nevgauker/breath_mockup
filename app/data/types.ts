export type TechniqueId =
    | "mindful"
    | "physio-sigh"
    | "straw-exhale"
    | "belly"
    | "active-belly"
    | "box"
    | "extended-exhale"
    | "resonance"
    | "4-7-8"
    | "coherent"
    | "kapalabhati"
    | "breath-hold"
    | "tummo"
    | "nadi"
    | "equal";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type TechniqueTag =
    | "Relax"
    | "Focus"
    | "Energy"
    | "Sleep"
    | "Recovery"
    | "Balance";

export type BreathingPattern =
    | "Natural"
    | "Dynamic"
    | `${number} · ${number}`
    | `${number} · ${number} · ${number}`
    | `${number} · ${number} · ${number} · ${number}`;

export interface Phase {
    label: string;
    duration: number; // seconds
    scale: number; // animation scale (0.6–1.4)
    instruction: string;
    icon?: string;
}

export interface Technique {
    // Identity
    id: TechniqueId;
    name: string;
    subtitle: string;

    // Display
    pattern: BreathingPattern;
    duration: string; // keep string for UI ("5 min")
    difficulty: Difficulty;
    tag: TechniqueTag;

    // Visuals
    color: string;
    bg: string;
    accent: string;

    // Engine
    phases: Phase[];

    // Guidance
    script: string;              // voice / guided narration
    steps: string[];             // quick UI checklist
    benefits: string[];

    // Safety
    contraindications: string[];

    // Progression
    variations?: string[];

    // UX
    completionMsg: string;

    // Stats
    sessions: number;
    bestStreak: number;
}