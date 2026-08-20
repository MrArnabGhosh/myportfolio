export interface DockApp {
  id: string;
  name: string;
  description: string;
  icon: string;

  /*
   * Id of the window this Dock tile controls.
   * Most tiles match their own id, a few
   * (Files, AI Assistant) do not.
   */
  windowId: string;

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
    windowId: "finder",
    name: "Finder",
    description: "Explore my portfolio",
    icon: "finder",
    type: "finder",
  },

  {
    id: "safari",
    windowId: "safari",
    name: "Safari",
    description: "Explore my web presence",
    icon: "safari",
    type: "safari",
  },

  {
    id: "terminal",
    windowId: "terminal",
    name: "Terminal",
    description: "Developer terminal",
    icon: "terminal",
    type: "terminal",
  },

  {
    id: "files",
    windowId: "projects",
    name: "Files",
    description: "Projects, education and experience",
    icon: "files",
    type: "files",
  },

  {
    id: "mail",
    windowId: "mail",
    name: "Mail",
    description: "Contact me",
    icon: "mail",
    type: "mail",
  },

  {
    id: "ai",
    windowId: "assistant",
    name: "AI Assistant",
    description: "Ask my AI assistant",
    icon: "ai",
    type: "ai",
  },

  {
    id: "notes",
    windowId: "notes",
    name: "Notes",
    description: "Developer notes",
    icon: "notes",
    type: "notes",
  },

  {
    id: "settings",
    windowId: "settings",
    name: "Settings",
    description: "Portfolio settings",
    icon: "settings",
    type: "settings",
  },
];

// =======================================================
// DOCK <-> WINDOW MAPPING
// =======================================================

export function windowIdForDock(dockId: string) {
  return (
    dockApps.find((app) => app.id === dockId)
      ?.windowId ?? dockId
  );
}

export function dockIdForWindow(
  windowId: string,
) {
  return (
    dockApps.find(
      (app) => app.windowId === windowId,
    )?.id ?? null
  );
}
