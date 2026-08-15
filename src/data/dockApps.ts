export interface DockApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  type:
    | "finder"
    | "safari"
    | "terminal"
    | "files"
    | "mail"
    | "ai"
    | "notes"
    | "settings";
  separator?: boolean;
}

export const dockApps: DockApp[] = [
  {
    id: "finder",
    name: "Finder",
    description: "Explore my portfolio",
    icon: "finder",
    type: "finder",
  },

  {
    id: "safari",
    name: "Safari",
    description: "Explore my web presence",
    icon: "safari",
    type: "safari",
  },

  {
    id: "terminal",
    name: "Terminal",
    description: "Developer terminal",
    icon: "terminal",
    type: "terminal",
  },

  {
    id: "files",
    name: "Files",
    description: "Projects, education and experience",
    icon: "files",
    type: "files",
  },

  {
    id: "mail",
    name: "Mail",
    description: "Contact me",
    icon: "mail",
    type: "mail",
  },

  {
    id: "ai",
    name: "AI Assistant",
    description: "Ask my AI assistant",
    icon: "ai",
    type: "ai",
  },

  {
    id: "notes",
    name: "Notes",
    description: "Developer notes",
    icon: "notes",
    type: "notes",
  },

  {
    id: "settings",
    name: "Settings",
    description: "Portfolio settings",
    icon: "settings",
    type: "settings",
  },
];