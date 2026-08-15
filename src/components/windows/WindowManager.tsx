"use client";

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

    // ---------------------------------------------------
    // Fallback
    // ---------------------------------------------------

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

    // ---------------------------------------------------
    // Window rectangle
    // ---------------------------------------------------

    const windowRect = windowElement.getBoundingClientRect();

    // ---------------------------------------------------
    // Dock rectangle
    // ---------------------------------------------------

    const dockRect = dockElement.getBoundingClientRect();

    // ---------------------------------------------------
    // Window center
    // ---------------------------------------------------

    const windowCenterX = windowRect.left + windowRect.width / 2;

    const windowCenterY = windowRect.top + windowRect.height / 2;

    // ---------------------------------------------------
    // Dock center
    // ---------------------------------------------------

    const dockCenterX = dockRect.left + dockRect.width / 2;

    const dockCenterY = dockRect.top + dockRect.height / 2;

    // ---------------------------------------------------
    // Movement
    // ---------------------------------------------------

    const translateX = dockCenterX - windowCenterX;

    const translateY = dockCenterY - windowCenterY;

    // ---------------------------------------------------
    // CSS variable
    // ---------------------------------------------------

    windowElement.style.setProperty(
      "--minimize-transform",
      `translate(${translateX}px, ${translateY}px) scale(0.1)`,
    );

    // ---------------------------------------------------
    // Start animation
    // ---------------------------------------------------

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

    // ---------------------------------------------------
    // Finish animation
    // ---------------------------------------------------

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
      // Existing window
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
      // Create new project window
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
  // DOCK CLICK
  // =====================================================

  const handleDockClick = useCallback(
    (id: string) => {
      const selectedWindow = windows.find((window) => window.id === id);

      if (!selectedWindow) {
        return;
      }

      // -----------------------------------------------
      // Closed
      // -----------------------------------------------

      if (!selectedWindow.isOpen) {
        openWindow(id);

        return;
      }

      // -----------------------------------------------
      // Minimized
      // -----------------------------------------------

      if (selectedWindow.isMinimized) {
        openWindow(id);

        return;
      }

      // -----------------------------------------------
      // Already open
      // -----------------------------------------------

      focusWindow(id);
    },
    [windows, openWindow, focusWindow],
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
      // ================================================
      // PROJECTS
      // ================================================

      case "projects":
        return <ProjectsApp onOpenProject={openProjectWindow} />;

      // ================================================
      // EDUCATION
      // ================================================

      case "education":
        return <EducationApp />;

      // ================================================
      // EXPERIENCE
      // ================================================

      case "experience":
        return <ExperienceApp />;

      // ================================================
      // SKILLS
      // ================================================

      case "skills":
        return <SkillsApp />;

      // ================================================
      // RESUME
      // ================================================

      case "resume":
        return <ResumeApp />;

      // ================================================
      // ABOUT ME
      // ================================================

      case "about":
        return <AboutMeApp />;

      // ================================================
      // CONTACT
      // ================================================

      case "contact":
        return <ContactApp />;

      // ================================================
      // AI ASSISTANT
      // ================================================

      case "assistant":
        return (
          <div className="p-8 text-white">
            <h1 className="text-3xl font-bold">AI Assistant</h1>

            <p className="mt-4 text-white/50">
              AI Assistant application coming soon...
            </p>
          </div>
        );

      // ================================================
      // DEFAULT
      // ================================================

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
        // Don't render closed windows
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
          DOCK
          ================================================= */}

      <div
        id="portfolio-dock"
        className="
          fixed
          bottom-5
          left-1/2
          z-[10000]
          -translate-x-1/2
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-white/20
            bg-white/10
            px-3
            py-2
            shadow-2xl
            backdrop-blur-xl
          "
        >
          {apps.map((app) => {
            const windowState = windows.find((window) => window.id === app.id);

            const isRunning = windowState?.isOpen && !windowState?.isMinimized;

            return (
              <button
                key={app.id}
                type="button"
                onClick={() => handleDockClick(app.id)}
                className="
                  group
                  relative
                  flex
                  h-12
                  w-12
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-xl
                  text-2xl
                  transition-all
                  duration-200
                  hover:-translate-y-2
                  hover:scale-110
                  hover:bg-white/10
                "
              >
                {/* App Icon */}

                {app.icon}

                {/* Running Indicator */}

                {isRunning && (
                  <span
                    className="
                      absolute
                      -bottom-1
                      h-1
                      w-1
                      rounded-full
                      bg-white
                    "
                  />
                )}

                {/* Tooltip */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    -top-10
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-md
                    bg-black/80
                    px-2
                    py-1
                    text-xs
                    text-white
                    opacity-0
                    transition-opacity
                    group-hover:opacity-100
                  "
                >
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
