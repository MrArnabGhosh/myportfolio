export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowState {
  id: string;
  title: string;

  isOpen: boolean;
  isMinimized: boolean;
  isMinimizing: boolean;
  isMaximized: boolean;
  hasBeenOpened: boolean;

  zIndex: number;

  position: WindowPosition;

  type?: "app" | "project";
  projectId?: string;
}