export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  type: "folder" | "app";
}

export const apps: AppDefinition[] = [
  // =====================================================
  // DESKTOP / PORTFOLIO APPS
  // =====================================================

  {
    id: "projects",
    name: "Projects",
    icon: "📁",
    type: "folder",
  },

  {
    id: "education",
    name: "Education",
    icon: "🎓",
    type: "app",
  },

  {
    id: "experience",
    name: "Experience",
    icon: "💼",
    type: "app",
  },

  {
    id: "skills",
    name: "Skills",
    icon: "🧠",
    type: "app",
  },

  {
    id: "resume",
    name: "Resume",
    icon: "📄",
    type: "app",
  },

  {
    id: "about",
    name: "About Me",
    icon: "👤",
    type: "app",
  },

  {
    id: "contact",
    name: "Contact",
    icon: "✉️",
    type: "app",
  },

  {
    id: "assistant",
    name: "AI Assistant",
    icon: "🤖",
    type: "app",
  },

  // =====================================================
  // TERMINAL
  // =====================================================

  {
    id: "terminal",
    name: "Terminal",
    icon: "terminal",
    type: "app",
  },

  {
    id: "safari",
    name: "Safari",
    icon: "safari",
    type: "app",
  },

  {
    id: "finder",
    name: "Finder",
    icon: "finder",
    type: "app",
  },
  {
    id: "mail",
    name: "Mail",
    icon: "mail",
    type: "app",
  },
  {
    id: "notes",
    name: "Notes",
    icon: "notes",
    type: "app",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "settings",
    type: "app",
  },
];
