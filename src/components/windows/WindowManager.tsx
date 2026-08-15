"use client";

import Dock from "@/components/desktop/Dock";

import { useCallback, useEffect, useState } from "react";

import Window from "../windows/window";

import { WindowState } from "@/types/window";

import { apps } from "@/data/apps";
import { projects } from "@/data/projects";

import DesktopIcons from "@/components/desktop/DesktopIcons";

import ProjectsApp from "@/components/apps/ProjectsApp";
import ProjectDetails from "@/components/apps/ProjectDetails";
import EducationApp from "@/components/apps/EducationApp";
import ExperienceApp from "@/components/apps/ExperienceApp";
import SkillsApp from "@/components/apps/SkillsApp";
import AboutMeApp from "@/components/apps/AboutMeApp";
import ResumeApp from "@/components/apps/ResumeApp";
import ContactApp from "@/components/apps/ContactApp";
import TerminalApp from "@/components/apps/TerminalApp";

export default function WindowManager() {
  // =====================================================
  // WINDOW POSITION
  // =====================================================

  const getNewWindowPosition = useCallback((index: number) => {
    const offset = index * 40;

    return {
      x: 100 + offset,
      y: 100 + offset,
    };
  }, []);

  // =====================================================
  // WINDOWS
  // =====================================================

  const [windows, setWindows] = useState<WindowState[]>(() =>
    apps.map((app, index) => ({
      id: app.id,
      title: app.name,

      isOpen: false,
      isMinimized: false,
      isMinimizing: false,
      isMaximized: false,

      zIndex: index + 10,

      position: getNewWindowPosition(index),

      type: "app",
    })),
  );

  // =====================================================
  // HIGHEST Z-INDEX
  // =====================================================

  const [highestZIndex, setHighestZIndex] = useState(10);

  // =====================================================
  // CENTER WINDOWS AFTER HYDRATION
  // =====================================================

  useEffect(() => {
    const windowWidth = 900;
    const windowHeight = 600;

    const centerX = (window.innerWidth - windowWidth) / 2;

    const centerY = (window.innerHeight - windowHeight) / 2;

    setWindows((currentWindows) =>
      currentWindows.map((window, index) => ({
        ...window,

        position: {
          x: Math.max(20, centerX + index * 40),

          y: Math.max(40, centerY + index * 40),
        },
      })),
    );
  }, []);

  // =====================================================
  // CLOSE WINDOW
  // =====================================================

  const closeWindow = useCallback((id: string) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === id
          ? {
              ...window,

              isOpen: false,
              isMinimized: false,
              isMinimizing: false,
              isMaximized: false,
            }
          : window,
      ),
    );
  }, []);

  // =====================================================
  // MINIMIZE WINDOW
  // =====================================================

  const minimizeWindow = useCallback((id: string) => {
    const windowElement = document.querySelector(
      `[data-window-id="${id}"]`,
    ) as HTMLElement | null;

    const dockElement = document.getElementById("portfolio-dock");

    // -------------------------------------------------
    // FALLBACK
    // -------------------------------------------------

    if (!windowElement || !dockElement) {
      setWindows((currentWindows) =>
        currentWindows.map((window) =>
          window.id === id
            ? {
                ...window,

                isMinimized: true,
                isMinimizing: false,
              }
            : window,
        ),
      );

      return;
    }

    // -------------------------------------------------
    // RECTANGLES
    // -------------------------------------------------

    const windowRect = windowElement.getBoundingClientRect();

    const dockRect = dockElement.getBoundingClientRect();

    // -------------------------------------------------
    // WINDOW CENTER
    // -------------------------------------------------

    const windowCenterX = windowRect.left + windowRect.width / 2;

    const windowCenterY = windowRect.top + windowRect.height / 2;

    // -------------------------------------------------
    // DOCK CENTER
    // -------------------------------------------------

    const dockCenterX = dockRect.left + dockRect.width / 2;

    const dockCenterY = dockRect.top + dockRect.height / 2;

    // -------------------------------------------------
    // MOVEMENT
    // -------------------------------------------------

    const translateX = dockCenterX - windowCenterX;

    const translateY = dockCenterY - windowCenterY;

    // -------------------------------------------------
    // MINIMIZE TRANSFORM
    // -------------------------------------------------

    windowElement.style.setProperty(
      "--minimize-transform",
      `translate(${translateX}px, ${translateY}px) scale(0.1)`,
    );

    // -------------------------------------------------
    // START ANIMATION
    // -------------------------------------------------

    setWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              isMinimizing: true,
            }
          : window,
      ),
    );

    // -------------------------------------------------
    // FINISH ANIMATION
    // -------------------------------------------------

    setTimeout(() => {
      setWindows((currentWindows) =>
        currentWindows.map((window) =>
          window.id === id
            ? {
                ...window,

                isMinimizing: false,
                isMinimized: true,
              }
            : window,
        ),
      );
    }, 450);
  }, []);

  // =====================================================
  // MAXIMIZE / RESTORE
  // =====================================================

  const toggleMaximize = useCallback((id: string) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) =>
        window.id === id
          ? {
              ...window,

              isMaximized: !window.isMaximized,
            }
          : window,
      ),
    );
  }, []);

  // =====================================================
  // UPDATE WINDOW POSITION
  // =====================================================

  const updateWindowPosition = useCallback(
    (id: string, x: number, y: number) => {
      setWindows((currentWindows) =>
        currentWindows.map((window) =>
          window.id === id
            ? {
                ...window,

                position: {
                  x,
                  y,
                },
              }
            : window,
        ),
      );
    },
    [],
  );

  // =====================================================
  // FOCUS WINDOW
  // =====================================================

  const focusWindow = useCallback(
    (id: string) => {
      const newZIndex = highestZIndex + 1;

      setHighestZIndex(newZIndex);

      setWindows((currentWindows) =>
        currentWindows.map((window) =>
          window.id === id
            ? {
                ...window,

                zIndex: newZIndex,
              }
            : window,
        ),
      );
    },
    [highestZIndex],
  );

  // =====================================================
  // OPEN / RESTORE WINDOW
  // =====================================================

  const openWindow = useCallback(
    (id: string) => {
      const newZIndex = highestZIndex + 1;

      setHighestZIndex(newZIndex);

      setWindows((currentWindows) =>
        currentWindows.map((window) =>
          window.id === id
            ? {
                ...window,

                isOpen: true,
                isMinimized: false,
                isMinimizing: false,

                zIndex: newZIndex,
              }
            : window,
        ),
      );
    },
    [highestZIndex],
  );

  // =====================================================
  // OPEN PROJECT DETAIL WINDOW
  // =====================================================

  const openProjectWindow = useCallback(
    (projectId: string) => {
      const project = projects.find((item) => item.id === projectId);

      if (!project) {
        return;
      }

      const windowId = `project-${projectId}`;

      // -------------------------------------------------
      // EXISTING PROJECT WINDOW
      // -------------------------------------------------

      const existingWindow = windows.find((window) => window.id === windowId);

      if (existingWindow) {
        const newZIndex = highestZIndex + 1;

        setHighestZIndex(newZIndex);

        setWindows((currentWindows) =>
          currentWindows.map((window) =>
            window.id === windowId
              ? {
                  ...window,

                  isOpen: true,
                  isMinimized: false,
                  isMinimizing: false,

                  zIndex: newZIndex,
                }
              : window,
          ),
        );

        return;
      }

      // -------------------------------------------------
      // NEW PROJECT WINDOW
      // -------------------------------------------------

      const newZIndex = highestZIndex + 1;

      setHighestZIndex(newZIndex);

      setWindows((currentWindows) => [
        ...currentWindows,

        {
          id: windowId,
          title: project.name,

          isOpen: true,
          isMinimized: false,
          isMinimizing: false,
          isMaximized: false,

          zIndex: newZIndex,

          position: {
            x: Math.max(
              20,
              Math.min(
                (window.innerWidth - 900) / 2 + 60,

                window.innerWidth - 900 - 20,
              ),
            ),

            y: Math.max(
              40,
              Math.min(
                (window.innerHeight - 600) / 2 + 40,

                window.innerHeight - 600 - 100,
              ),
            ),
          },

          type: "project",

          projectId,
        },
      ]);
    },
    [windows, highestZIndex],
  );

  // =====================================================
  // PORTFOLIO WINDOW CLICK
  // =====================================================

  const handleDockClick = useCallback(
    (id: string) => {
      const selectedWindow = windows.find((window) => window.id === id);

      if (!selectedWindow) {
        return;
      }

      // Closed

      if (!selectedWindow.isOpen) {
        openWindow(id);
        return;
      }

      // Minimized

      if (selectedWindow.isMinimized) {
        openWindow(id);
        return;
      }

      // Already open

      focusWindow(id);
    },
    [windows, openWindow, focusWindow],
  );

  // =====================================================
  // NEW DOCK APP HANDLER
  // =====================================================

  const handleDockAppClick = useCallback(
    (id: string) => {
      // ===============================================
      // FINDER
      // ===============================================

      if (id === "finder") {
        handleDockClick("projects");
        return;
      }

      // ===============================================
      // SAFARI
      // ===============================================

      if (id === "safari") {
        console.log("Safari will be implemented next.");
        return;
      }

      // ===============================================
      // TERMINAL
      // ===============================================

      if (id === "terminal") {
        handleDockClick("terminal");
        return;
      }

      // ===============================================
      // FILES
      // ===============================================

      if (id === "files") {
        handleDockClick("projects");
        return;
      }

      // ===============================================
      // MAIL
      // ===============================================

      if (id === "mail") {
        handleDockClick("contact");
        return;
      }

      // ===============================================
      // AI
      // ===============================================

      if (id === "ai") {
        handleDockClick("assistant");
        return;
      }

      // ===============================================
      // NOTES
      // ===============================================

      if (id === "notes") {
        console.log("Notes will be implemented next.");
        return;
      }

      // ===============================================
      // SETTINGS
      // ===============================================

      if (id === "settings") {
        console.log("Settings will be implemented next.");
        return;
      }

      // ===============================================
      // EXISTING APP
      // ===============================================

      handleDockClick(id);
    },
    [handleDockClick],
  );

  // =====================================================
  // RENDER APPLICATION
  // =====================================================

  const renderApp = (currentWindow: WindowState) => {
    // ---------------------------------------------------
    // PROJECT DETAIL
    // ---------------------------------------------------

    if (currentWindow.type === "project" && currentWindow.projectId) {
      return (
        <ProjectDetails
          projectId={currentWindow.projectId}
          onBack={() => closeWindow(currentWindow.id)}
        />
      );
    }

    // ---------------------------------------------------
    // APPLICATIONS
    // ---------------------------------------------------

    switch (currentWindow.id) {
      // ===============================================
      // PROJECTS
      // ===============================================

      case "terminal":
        return <TerminalApp />;

      case "projects":
        return <ProjectsApp onOpenProject={openProjectWindow} />;

      // ===============================================
      // EDUCATION
      // ===============================================

      case "education":
        return <EducationApp />;

      // ===============================================
      // EXPERIENCE
      // ===============================================

      case "experience":
        return <ExperienceApp />;

      // ===============================================
      // SKILLS
      // ===============================================

      case "skills":
        return <SkillsApp />;

      // ===============================================
      // RESUME
      // ===============================================

      case "resume":
        return <ResumeApp />;

      // ===============================================
      // ABOUT
      // ===============================================

      case "about":
        return <AboutMeApp />;

      // ===============================================
      // CONTACT
      // ===============================================

      case "contact":
        return <ContactApp />;

      // ===============================================
      // AI ASSISTANT
      // ===============================================

      case "assistant":
        return (
          <div className="p-8 text-white">
            <h1 className="text-3xl font-bold">AI Assistant</h1>

            <p className="mt-4 text-white/50">
              AI Assistant application coming soon...
            </p>
          </div>
        );

      // ===============================================
      // DEFAULT
      // ===============================================

      default:
        return (
          <div className="p-8 text-white">
            <h1 className="text-3xl font-bold">{currentWindow.title}</h1>

            <p className="mt-4 text-white/50">Application coming soon...</p>
          </div>
        );
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =================================================
          DESKTOP ICONS
          ================================================= */}

      <DesktopIcons onOpenWindow={openWindow} />

      {/* =================================================
          WINDOWS
          ================================================= */}

      {windows.map((currentWindow) => {
        // ---------------------------------------------
        // CLOSED / MINIMIZED
        // ---------------------------------------------

        if (!currentWindow.isOpen || currentWindow.isMinimized) {
          return null;
        }

        return (
          <div
            key={currentWindow.id}
            data-window-id={currentWindow.id}
            onMouseDown={() => focusWindow(currentWindow.id)}
          >
            <Window
              title={currentWindow.title}
              isMaximized={currentWindow.isMaximized}
              isMinimizing={currentWindow.isMinimizing}
              zIndex={currentWindow.zIndex}
              position={currentWindow.position}
              onMove={(x, y) => updateWindowPosition(currentWindow.id, x, y)}
              onClose={() => closeWindow(currentWindow.id)}
              onMinimize={() => minimizeWindow(currentWindow.id)}
              onMaximize={() => toggleMaximize(currentWindow.id)}
            >
              {renderApp(currentWindow)}
            </Window>
          </div>
        );
      })}

      {/* =================================================
          NEW MACOS DOCK
          ================================================= */}

      <Dock
        onOpenApp={handleDockAppClick}
        runningApps={windows
          .filter((window) => window.isOpen && !window.isMinimized)
          .map((window) => window.id)}
      />
    </>
  );
}
