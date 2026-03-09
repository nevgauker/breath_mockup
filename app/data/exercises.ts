// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export type BreathingPhase = {
  label: string;
  duration: number;
  scale: number;
  instruction: string;
  icon: string;
};

export type Technique = {
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

// ─────────────────────────────────────────────────────────────────────────────
// TECHNIQUES — 15 real breathing exercises
// ─────────────────────────────────────────────────────────────────────────────
export const TECHNIQUES: Technique[] = [
  // 1. Mindful Breathing
  {
    id: "mindful",
    name: "Mindful Breathing",
    subtitle: "Awareness Without Control",
    pattern: "4 · 4",
    duration: "5 min",
    difficulty: "Beginner",
    tag: "Focus",
    color: "#4A9EAF",
    bg: "linear-gradient(160deg, #0d2535 0%, #0a1e2e 60%, #071520 100%)",
    accent: "#4A9EAF",
    phases: [
      { label: "Inhale", duration: 4, scale: 1.38, instruction: "Observe your natural inhale — don't control it", icon: "↑" },
      { label: "Exhale", duration: 4, scale: 0.62, instruction: "Notice the exhale, where it goes, any natural pauses", icon: "↓" },
    ],
    benefits: [
      "Builds breath consistency",
      "Strengthens parasympathetic tone",
      "Lowers blood pressure",
      "Improves focus and concentration",
      "Activates the digestive system",
    ],
    steps: [
      "Sit or lie down comfortably, close your eyes",
      "Direct attention to your breath — don't change it",
      "Notice the rhythm, where in your body it moves, any pauses",
      "If your mind wanders, gently return to the breath",
    ],
    completionMsg: "You have deepened your awareness. The breath teaches itself.",
    sessions: 0,
    bestStreak: 0,
  },

  // 2. Physiological Sigh
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
      { label: "Inhale", duration: 2, scale: 1.2, instruction: "Inhale through your nose — fill about 80%", icon: "↑" },
      { label: "Top-Up", duration: 1, scale: 1.38, instruction: "Quick second sniff — fill the rest completely", icon: "↑↑" },
      { label: "Long Exhale", duration: 6, scale: 0.62, instruction: "Slow full exhale — release shoulders completely", icon: "↓" },
    ],
    benefits: [
      "Instant shift from sympathetic to parasympathetic",
      "Stops breath-holding cycles",
      "Relieves nausea",
      "Full effect in just 3 repetitions",
    ],
    steps: [
      "Take a normal inhale through your nose",
      "At the top, sniff once more — a short sharp top-up",
      "Let out a long, slow exhale — shoulders drop completely",
      "Do not exceed 3 reps in a row to avoid dizziness",
    ],
    completionMsg: "Reset complete. Your nervous system has returned to baseline.",
    sessions: 0,
    bestStreak: 0,
  },

  // 3. Straw Exhale
  {
    id: "straw-exhale",
    name: "Straw Exhale",
    subtitle: "Pulsed Pursed-Lip Breathing",
    pattern: "4 · 6 pulses",
    duration: "4 min",
    difficulty: "Beginner",
    tag: "Relax",
    color: "#5EC394",
    bg: "linear-gradient(160deg, #0a2018 0%, #071a12 60%, #050f0a 100%)",
    accent: "#5EC394",
    phases: [
      { label: "Inhale", duration: 4, scale: 1.38, instruction: "Breathe in fully through your nose", icon: "↑" },
      { label: "Pulse Out", duration: 6, scale: 0.62, instruction: "Exhale through pursed lips in short bursts — puff puff puff", icon: "···" },
    ],
    benefits: [
      "Releases alveoli adhesions in the lungs",
      "Expands chest capacity from the inside",
      "Strengthens exhale muscles",
      "Activates the diaphragm",
    ],
    steps: [
      "Inhale fully through your nose",
      "Purse your lips as if breathing through a straw",
      "Exhale in short pulsed bursts — not one continuous stream",
      "After the exhale, take a full inhale and feel the extra space",
    ],
    completionMsg: "Your lungs are more open. Feel the expanded chest.",
    sessions: 0,
    bestStreak: 0,
  },

  // 4. Belly Breathing
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
      { label: "Belly Inhale", duration: 3, scale: 1.38, instruction: "Relax belly muscles — lower belly fills first", icon: "↑" },
      { label: "Soft Hold", duration: 3, scale: 1.38, instruction: "Gentle pause at the top — stay completely relaxed", icon: "■" },
      { label: "Exhale", duration: 1, scale: 0.62, instruction: "Natural release — let it go without forcing", icon: "↓" },
    ],
    benefits: [
      "Foundation for all other breathing practices",
      "Pure diaphragmatic activation",
      "Strengthens parasympathetic tone",
      "Reduces anxiety and lowers stress hormones",
    ],
    steps: [
      "Lie on your back with one hand above your navel, one below",
      "On inhale, relax your belly muscles — let the lower belly rise first",
      "The chest should stay mostly still — only the belly moves",
      "Exhale naturally without forcing — let the belly fall",
    ],
    completionMsg: "Your diaphragm is awake. This is where all breath begins.",
    sessions: 0,
    bestStreak: 0,
  },

  // 5. Active Belly Breathing
  {
    id: "active-belly",
    name: "Active Belly Breathing",
    subtitle: "Energising Core Activation",
    pattern: "2 · 2",
    duration: "5 min",
    difficulty: "Intermediate",
    tag: "Energy",
    color: "#D4634A",
    bg: "linear-gradient(160deg, #2a1008 0%, #1e0c06 60%, #120804 100%)",
    accent: "#D4634A",
    phases: [
      { label: "Active Inhale", duration: 2, scale: 1.38, instruction: "Expand belly quickly and intentionally", icon: "↑" },
      { label: "Active Exhale", duration: 2, scale: 0.62, instruction: "Contract belly firmly — feel core activate", icon: "↓" },
    ],
    benefits: [
      "Activates core muscles",
      "Increases energy and arousal",
      "Builds breathing awareness and control",
      "Warms the body from the inside",
    ],
    steps: [
      "Master regular belly breathing before starting this",
      "Use the same belly mechanics but increase pace and intensity",
      "Optional: at end of exhale, drop knees to one side for a twist",
      "If you feel dizzy, return to slow belly breathing immediately",
    ],
    completionMsg: "Energy activated. Your core and breath are connected.",
    sessions: 0,
    bestStreak: 0,
  },

  // 6. Full Yogic Breath (Purna Pranayama)
  {
    id: "full-yogic",
    name: "Full Yogic Breath",
    subtitle: "Purna Pranayama",
    pattern: "3 · 2 · 2 · 6",
    duration: "6 min",
    difficulty: "Intermediate",
    tag: "Relax",
    color: "#A47EC3",
    bg: "linear-gradient(160deg, #1a1025 0%, #13091e 60%, #0d0517 100%)",
    accent: "#A47EC3",
    phases: [
      { label: "Belly Fill", duration: 3, scale: 1.15, instruction: "Fill the belly first — diaphragm descends", icon: "↑" },
      { label: "Rib Expand", duration: 2, scale: 1.28, instruction: "Expand ribs sideways — feel the width", icon: "↑" },
      { label: "Chest Rise", duration: 2, scale: 1.38, instruction: "Lift chest up to armpits — completely full", icon: "↑" },
      { label: "Full Exhale", duration: 6, scale: 0.62, instruction: "Release chest, then ribs, then belly — reverse order", icon: "↓" },
    ],
    benefits: [
      "Trains the full range of lung capacity",
      "Improves blood circulation to the hands",
      "Foundation for Nadi Shodhana practice",
      "Deep parasympathetic activation",
    ],
    steps: [
      "Sit tall — spine long, shoulders relaxed",
      "Begin filling from the belly, then expand ribs sideways",
      "Finally lift the chest all the way up to the armpits",
      "Exhale in reverse: chest drops, ribs soften, belly contracts",
    ],
    completionMsg: "Every cell has been fed. This is a complete breath.",
    sessions: 0,
    bestStreak: 0,
  },

  // 7. Bhramari (Humming Bee Breath)
  {
    id: "bhramari",
    name: "Bhramari",
    subtitle: "Humming Bee Breath",
    pattern: "4 · 8 hum",
    duration: "5 min",
    difficulty: "Beginner",
    tag: "Relax",
    color: "#A47EC3",
    bg: "linear-gradient(160deg, #1a1025 0%, #13091e 60%, #0d0517 100%)",
    accent: "#A47EC3",
    phases: [
      { label: "Inhale", duration: 4, scale: 1.38, instruction: "Breathe in gently through the nose", icon: "↑" },
      { label: "Hum Out", duration: 8, scale: 0.62, instruction: "Close mouth — exhale with a steady 'Mmmm' hum", icon: "♫" },
    ],
    benefits: [
      "Quickly calms mental stress via vagal tone",
      "Improves memory and focus",
      "Clears and opens nasal passages",
      "Excellent preparation for meditation",
      "Supports healing after surgery or illness",
    ],
    steps: [
      "Sit comfortably with eyes closed",
      "Inhale through the nose",
      "On exhale, close the mouth and hum steadily — 'Mmmm'",
      "Optional: place fingers on eyes and thumbs over ears to deepen",
    ],
    completionMsg: "The vibration has calmed your mind. Rest in the stillness.",
    sessions: 0,
    bestStreak: 0,
  },

  // 8. Ujjayi (Ocean Breath)
  {
    id: "ujjayi",
    name: "Ujjayi",
    subtitle: "Ocean Breath",
    pattern: "5 · 5 ocean",
    duration: "6 min",
    difficulty: "Intermediate",
    tag: "Focus",
    color: "#4A9EAF",
    bg: "linear-gradient(160deg, #0d2535 0%, #0a1e2e 60%, #071520 100%)",
    accent: "#4A9EAF",
    phases: [
      { label: "Inhale", duration: 5, scale: 1.38, instruction: "Constrict the back of the throat slightly — ocean sound", icon: "↑" },
      { label: "Exhale", duration: 5, scale: 0.62, instruction: "Maintain Ujjayi on exhale — steady wave-like sound", icon: "↓" },
    ],
    benefits: [
      "Slows breathing rate significantly",
      "Directly activates the vagus nerve",
      "Lowers heart rate and blood pressure",
      "Sustains focus and mental presence",
      "Particularly helpful for older adults",
    ],
    steps: [
      "First practice: open mouth and fog a mirror with your breath",
      "Now do the same with your mouth closed — sound comes from throat",
      "Combine Ujjayi with full yogic breaths",
      "After 10 breaths, check: if you feel calm and spacious — you have it right",
    ],
    completionMsg: "Your vagus nerve is singing. Calm and clarity are yours.",
    sessions: 0,
    bestStreak: 0,
  },

  // 9. Surya Bhedana (Right Nostril / Sun Breath)
  {
    id: "surya-bhedana",
    name: "Surya Bhedana",
    subtitle: "Right Nostril — Sun Breath",
    pattern: "4 · 4 right",
    duration: "4 min",
    difficulty: "Beginner",
    tag: "Energy",
    color: "#E8A838",
    bg: "linear-gradient(160deg, #251a04 0%, #1a1203 60%, #100b02 100%)",
    accent: "#E8A838",
    phases: [
      { label: "Inhale Right", duration: 4, scale: 1.38, instruction: "Close left nostril with ring finger — inhale through right", icon: "→↑" },
      { label: "Exhale Right", duration: 4, scale: 0.62, instruction: "Exhale through right nostril — keep left closed", icon: "→↓" },
    ],
    benefits: [
      "Raises energy and alertness",
      "Activates the sympathetic nervous system",
      "Warms the body",
      "Good morning activation practice",
    ],
    steps: [
      "Sit tall, right hand raised to your nose",
      "Use ring finger to gently close left nostril",
      "Both inhale and exhale through right nostril only",
      "Do not practice if one nostril is structurally blocked",
    ],
    completionMsg: "Solar energy activated. You are alert and ready.",
    sessions: 0,
    bestStreak: 0,
  },

  // 10. Chandra Bhedana (Left Nostril / Moon Breath)
  {
    id: "chandra-bhedana",
    name: "Chandra Bhedana",
    subtitle: "Left Nostril — Moon Breath",
    pattern: "4 · 4 left",
    duration: "4 min",
    difficulty: "Beginner",
    tag: "Sleep",
    color: "#8B7EC3",
    bg: "linear-gradient(160deg, #1a1530 0%, #110f28 60%, #0c0b1e 100%)",
    accent: "#8B7EC3",
    phases: [
      { label: "Inhale Left", duration: 4, scale: 1.38, instruction: "Close right nostril with thumb — inhale through left", icon: "←↑" },
      { label: "Exhale Left", duration: 4, scale: 0.62, instruction: "Exhale through left nostril — keep right closed", icon: "←↓" },
    ],
    benefits: [
      "Calms and slows the nervous system",
      "Activates the parasympathetic response",
      "Aids sleep onset",
      "Reduces mental activity and racing thoughts",
    ],
    steps: [
      "Sit comfortably, right hand raised to your nose",
      "Use your thumb to gently close the right nostril",
      "Both inhale and exhale through left nostril only",
      "Do not practice if one nostril is structurally blocked",
    ],
    completionMsg: "Lunar calm. Your body is ready to rest.",
    sessions: 0,
    bestStreak: 0,
  },

  // 11. Nadi Shodhana (Alternate Nostril Breathing)
  {
    id: "nadi-shodhana",
    name: "Nadi Shodhana",
    subtitle: "Alternate Nostril Breathing",
    pattern: "4 · 4 alternate",
    duration: "7 min",
    difficulty: "Intermediate",
    tag: "Focus",
    color: "#7EC3B0",
    bg: "linear-gradient(160deg, #0a2018 0%, #071a14 60%, #051110 100%)",
    accent: "#7EC3B0",
    phases: [
      { label: "Inhale Left", duration: 4, scale: 1.38, instruction: "Close right nostril — inhale slowly through left", icon: "←↑" },
      { label: "Switch", duration: 1, scale: 1.38, instruction: "Close both nostrils briefly — switch fingers gently", icon: "⇄" },
      { label: "Exhale Right", duration: 4, scale: 0.62, instruction: "Open right nostril — exhale completely", icon: "→↓" },
      { label: "Inhale Right", duration: 4, scale: 1.38, instruction: "Inhale through right nostril — keep left closed", icon: "→↑" },
      { label: "Switch", duration: 1, scale: 1.38, instruction: "Close both briefly — switch back", icon: "⇄" },
      { label: "Exhale Left", duration: 4, scale: 0.62, instruction: "Open left nostril — exhale completely", icon: "←↓" },
    ],
    benefits: [
      "Balances the nervous system",
      "Harmonises left and right brain hemispheres",
      "Deepens focus and mental clarity",
      "Reduces anxiety and stress",
    ],
    steps: [
      "Keep your shoulder low when raising your hand to your nose",
      "Support your elbow with the opposite hand like a shelf",
      "Do not squeeze the opposite nostril — just gently rest",
      "Do not combine with Ujjayi. Practice up to 15 minutes.",
    ],
    completionMsg: "Balance restored. Left and right, sun and moon.",
    sessions: 0,
    bestStreak: 0,
  },

  // 12. Kapalabhati (Skull-Shining Breath)
  {
    id: "kapalabhati",
    name: "Kapalabhati",
    subtitle: "Skull-Shining Breath",
    pattern: "rapid pulses",
    duration: "8 min",
    difficulty: "Advanced",
    tag: "Energy",
    color: "#D4634A",
    bg: "linear-gradient(160deg, #2a1008 0%, #1e0c06 60%, #120804 100%)",
    accent: "#D4634A",
    phases: [
      { label: "Sharp Out", duration: 1, scale: 0.62, instruction: "Sharp active exhale from lower belly — only the final third", icon: "↓!" },
      { label: "Passive In", duration: 1, scale: 1.2, instruction: "Let the inhale happen naturally — don't pull it in", icon: "↑" },
    ],
    benefits: [
      "Cleanses airways and clears mucus",
      "Activates the diaphragm",
      "Sharpens mental focus",
      "Increases energy and arousal",
    ],
    steps: [
      "Begin with 5 exhales × 3 sets — build slowly over weeks",
      "The exhale is sharp and active; the inhale is fully passive",
      "Keep the back long — shoulders should not rise",
      "Contraindicated: full stomach, blocked nose, anxiety, migraine, pregnancy, heart conditions, high BP, epilepsy, hernia. Not evenings.",
    ],
    completionMsg: "Skull shining. Your airways are clear and your mind is lit.",
    sessions: 0,
    bestStreak: 0,
  },

  // 13. Wim Hof Method
  {
    id: "wimhof",
    name: "Wim Hof Method",
    subtitle: "Controlled Hyperventilation",
    pattern: "30 Breaths · Retention",
    duration: "12 min",
    difficulty: "Advanced",
    tag: "Energy",
    color: "#D4634A",
    bg: "linear-gradient(160deg, #2a1008 0%, #1e0c06 60%, #120804 100%)",
    accent: "#D4634A",
    phases: [
      { label: "Power Inhale", duration: 2, scale: 1.5, instruction: "Deep inhale through mouth — fill completely", icon: "↑↑" },
      { label: "Let Go", duration: 2, scale: 0.5, instruction: "Release naturally — don't force the exhale", icon: "↓" },
      { label: "Retention", duration: 8, scale: 0.68, instruction: "Hold after exhale — stay calm and still", icon: "◎" },
      { label: "Recovery", duration: 3, scale: 1.2, instruction: "Deep recovery breath — hold for 15 seconds", icon: "↑" },
    ],
    benefits: [
      "Research-backed immune system activation",
      "Boosts energy rapidly",
      "Increases cold tolerance",
      "Shifts body chemistry measurably",
    ],
    steps: [
      "Only practice seated or lying down — never standing or in water",
      "30 rapid deep breaths — in through mouth, out naturally",
      "After 30 breaths, exhale and hold (retention phase)",
      "Warning: may cause calcium loss from bones with regular long-term use",
    ],
    completionMsg: "Incredible. Your body chemistry has shifted.",
    sessions: 0,
    bestStreak: 0,
  },

  // 14. Extended Exhale 1:2
  {
    id: "extended-exhale",
    name: "Extended Exhale 1:2",
    subtitle: "Double the Exhale",
    pattern: "4 · 8",
    duration: "6 min",
    difficulty: "Intermediate",
    tag: "Sleep",
    color: "#8B7EC3",
    bg: "linear-gradient(160deg, #1a1530 0%, #110f28 60%, #0c0b1e 100%)",
    accent: "#8B7EC3",
    phases: [
      { label: "Inhale", duration: 4, scale: 1.38, instruction: "Gentle inhale — use Ujjayi throat or pelvic floor for support", icon: "↑" },
      { label: "Long Exhale", duration: 8, scale: 0.62, instruction: "Slow extended exhale — twice as long as your inhale", icon: "↓" },
    ],
    benefits: [
      "Corrects chest-dominant breathing patterns",
      "Strengthens exhale muscles",
      "Deepens parasympathetic tone",
      "Prepares body and mind for sleep",
    ],
    steps: [
      "Begin at 4:4 — only extend the exhale when it feels effortless",
      "Progress gradually: 4:5 → 4:6 → 4:7 → 4:8 over multiple sessions",
      "Use Ujjayi throat constriction or gentle pelvic floor engagement",
      "If you strain or tense, shorten the exhale and build more slowly",
    ],
    completionMsg: "The exhale is longer than the inhale. Rest lives in the out-breath.",
    sessions: 0,
    bestStreak: 0,
  },

  // 15. Box Breathing
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
    benefits: [
      "Resets the nervous system in minutes",
      "Reduces cortisol and stress hormones",
      "Improves focus and decision-making",
      "Can be used with counting or pure observation",
    ],
    steps: [
      "Sit upright with your feet flat on the floor",
      "Relax your shoulders and jaw completely",
      "Follow the circle — inhale as it expands",
      "Hold at the peak, then exhale as it contracts",
    ],
    completionMsg: "Well done. Your nervous system has been reset.",
    sessions: 0,
    bestStreak: 0,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { name: "Relax & Stress", icon: "🌊", color: "#5EC394", sub: "Calm the nervous system" },
  { name: "Sleep & Wind Down", icon: "🌙", color: "#8B7EC3", sub: "Prepare for deep rest" },
  { name: "Energy & Activation", icon: "⚡", color: "#D4634A", sub: "Raise alertness and vitality" },
  { name: "Focus & Clarity", icon: "◎", color: "#4A9EAF", sub: "Sharpen mental precision" },
  { name: "Pranayama", icon: "☯", color: "#A47EC3", sub: "Classical yogic breathing" },
  { name: "Mindfulness", icon: "🧘", color: "#7EC3B0", sub: "Deepen awareness" },
];

// ─────────────────────────────────────────────────────────────────────────────
// ROUTINES — 7 real use-case groups from the source document
// ─────────────────────────────────────────────────────────────────────────────
export const ROUTINES = [
  {
    name: "Under Stress",
    icon: "😰",
    techniques: 4,
    duration: 10,
    difficulty: "Easy",
    color: "#5EC394",
    desc: "Physio Sigh → Belly Breathing → Bhramari → Left Nostril",
  },
  {
    name: "Relax & Before Sleep",
    icon: "😴",
    techniques: 4,
    duration: 12,
    difficulty: "Easy",
    color: "#8B7EC3",
    desc: "Belly (3:3:1) → Bhramari → Full Yogic → Extended Exhale",
  },
  {
    name: "Boost Energy",
    icon: "⚡",
    techniques: 4,
    duration: 15,
    difficulty: "Intense",
    color: "#D4634A",
    desc: "Active Belly → Kapalabhati → Wim Hof → Right Nostril",
  },
  {
    name: "Meditation Prep",
    icon: "🧘",
    techniques: 4,
    duration: 12,
    difficulty: "Moderate",
    color: "#A47EC3",
    desc: "Mindful Breathing → Full Yogic → Bhramari → Nadi Shodhana",
  },
  {
    name: "Focus & Concentration",
    icon: "🧠",
    techniques: 4,
    duration: 14,
    difficulty: "Moderate",
    color: "#4A9EAF",
    desc: "Mindful → Ujjayi × 10 → Bhramari × 5 → Kapalabhati",
  },
  {
    name: "Before Exam / Meeting",
    icon: "📝",
    techniques: 4,
    duration: 10,
    difficulty: "Easy",
    color: "#E8A838",
    desc: "Physio Sigh × 3 → Straw Exhale → Bhramari → Ujjayi × 10",
  },
  {
    name: "Motion Sickness",
    icon: "🚗",
    techniques: 2,
    duration: 5,
    difficulty: "Easy",
    color: "#5EC394",
    desc: "Physiological Sigh × 3 → Belly Breathing",
  },
];
