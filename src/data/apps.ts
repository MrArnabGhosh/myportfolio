export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  type: "folder" | "app";
}

export const apps: AppDefinition[] = [
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
    id: "assistant",
    name: "AI Assistant",
    icon: "🤖",
    type: "app",
  },

  // =====================================================
  // CONTACT
  // =====================================================

  {
    id: "contact",
    name: "Contact",
    icon: "✉️",
    type: "app",
  },
];