"use client";

import Dock from "@/components/desktop/Dock";

import { useCallback, useState } from "react";

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
import SafariApp from "@/components/apps/SafariApp";
import FinderApp from "@/components/apps/FinderApp";
import MailApp from "@/components/apps/MailApp";
import NotesApp from "@/components/apps/NotesApp";
import SettingsApp from "@/components/apps/SettingsApp";
import AIAssistantApp from "@/components/apps/AIAssistantApp";

import { usePortfolioSettings } from "@/context/PortfolioSettings";

export default function WindowManager() {
  // =====================================================
  // PORTFOLIO SETTINGS
  // =====================================================

  const { playSound } = usePortfolioSettings();

  // =====================================================
  // WINDOW SIZE
  // =====================================================

  const WINDOW_WIDTH = 900;
  const WINDOW_HEIGHT = 600;

  // =====================================================
  // CENTER POSITION
  // =====================================================

  const getCenteredPosition = useCallback(() => {
    if (typeof window === "undefined") {
      return {
        x: 100,
        y: 100,
      };
    }

    return {
      x: Math.max(20, (window.innerWidth - WINDOW_WIDTH) / 2),

      y: Math.max(40, (window.innerHeight - WINDOW_HEIGHT) / 2),
    };
  }, []);

  // =====================================================
  // MACOS CASCADE POSITION
  // =====================================================

  const getCascadePosition = useCallback((openWindowCount: number) => {
    if (typeof window === "undefined") {
      return {
        x: 100,
        y: 100,
      };
    }

    const centerX = (window.innerWidth - WINDOW_WIDTH) / 2;

    const centerY = (window.innerHeight - WINDOW_HEIGHT) / 2;

    /*
     * macOS-style cascade
     *
     * 0 open windows → center
     * 1 open window  → +35px
     * 2 open windows → +70px
     * 3 open windows → +105px
     */

    const offset = Math.min(openWindowCount * 35, 140);

    const maxX = window.innerWidth - WINDOW_WIDTH - 20;

    const maxY = window.innerHeight - WINDOW_HEIGHT - 100;

    return {
      x: Math.max(20, Math.min(centerX + offset, maxX)),

      y: Math.max(40, Math.min(centerY + offset, maxY)),
    };
  }, []);

  // =====================================================
  // WINDOWS
  // =====================================================

  const [windows, setWindows] = useState<WindowState[]>(() =>
    apps.map((app) => ({
      id: app.id,
      title: app.name,

      isOpen: false,
      isMinimized: false,
      isMinimizing: false,
      isMaximized: false,

      /*
       * False until the application is opened
       * for the first time.
       */
      hasBeenOpened: false,

      zIndex: 10,

      position: {
        x: 100,
        y: 100,
      },

      type: "app",
    })),
  );

  // =====================================================
  // HIGHEST Z-INDEX
  // =====================================================

  const [highestZIndex, setHighestZIndex] = useState(10);

  // =====================================================
  // CLOSE WINDOW
  // =====================================================

  const closeWindow = useCallback((id: string) => {
    setWindows((currentWindows) =>
      currentWindows.map((currentWindow) =>
        currentWindow.id === id
          ? {
              ...currentWindow,

              isOpen: false,
              isMinimized: false,
              isMinimizing: false,
              isMaximized: false,

              /*
               * Do NOT reset hasBeenOpened.
               *
               * The next time the user opens
               * this app, it keeps its position.
               */
            }
          : currentWindow,
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
        currentWindows.map((currentWindow) =>
          currentWindow.id === id
            ? {
                ...currentWindow,

                isMinimized: true,
                isMinimizing: false,
              }
            : currentWindow,
        ),
      );

      return;
    }

    // -------------------------------------------------
    // WINDOW RECT
    // -------------------------------------------------

    const windowRect = windowElement.getBoundingClientRect();

    // -------------------------------------------------
    // DOCK RECT
    // -------------------------------------------------

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
      currentWindows.map((currentWindow) =>
        currentWindow.id === id
          ? {
              ...currentWindow,

              isMinimizing: true,
            }
          : currentWindow,
      ),
    );

    // -------------------------------------------------
    // FINISH ANIMATION
    // -------------------------------------------------

    setTimeout(() => {
      setWindows((currentWindows) =>
        currentWindows.map((currentWindow) =>
          currentWindow.id === id
            ? {
                ...currentWindow,

                isMinimizing: false,
                isMinimized: true,
              }
            : currentWindow,
        ),
      );
    }, 450);
  }, []);

  // =====================================================
  // MAXIMIZE / RESTORE
  // =====================================================

  const toggleMaximize = useCallback((id: string) => {
    setWindows((currentWindows) =>
      currentWindows.map((currentWindow) =>
        currentWindow.id === id
          ? {
              ...currentWindow,

              isMaximized: !currentWindow.isMaximized,
            }
          : currentWindow,
      ),
    );
  }, []);

  // =====================================================
  // UPDATE WINDOW POSITION
  // =====================================================

  const updateWindowPosition = useCallback(
    (id: string, x: number, y: number) => {
      setWindows((currentWindows) =>
        currentWindows.map((currentWindow) =>
          currentWindow.id === id
            ? {
                ...currentWindow,

                position: {
                  x,
                  y,
                },
              }
            : currentWindow,
        ),
      );
    },
    [],
  );

  // =====================================================
  // FOCUS WINDOW
  // =====================================================

  const focusWindow = useCallback((id: string) => {
    setHighestZIndex((currentZIndex) => {
      const newZIndex = currentZIndex + 1;

      setWindows((currentWindows) =>
        currentWindows.map((currentWindow) =>
          currentWindow.id === id
            ? {
                ...currentWindow,

                zIndex: newZIndex,
              }
            : currentWindow,
        ),
      );

      return newZIndex;
    });
  }, []);

  // =====================================================
  // OPEN / RESTORE WINDOW
  // =====================================================

  const openWindow = useCallback(
    (id: string) => {
      /*
       * Play click sound when an application
       * is opened/restored.
       */
      playSound();

      setHighestZIndex((currentZIndex) => {
        const newZIndex = currentZIndex + 1;

        setWindows((currentWindows) => {
          const selectedWindow = currentWindows.find(
            (currentWindow) => currentWindow.id === id,
          );

          if (!selectedWindow) {
            return currentWindows;
          }

          // -------------------------------------------
          // CURRENTLY VISIBLE WINDOWS
          // -------------------------------------------

          const openWindowCount = currentWindows.filter(
            (currentWindow) =>
              currentWindow.isOpen && !currentWindow.isMinimized,
          ).length;

          // -------------------------------------------
          // FIRST TIME OPENED?
          // -------------------------------------------

          const firstOpen = !selectedWindow.hasBeenOpened;

          // -------------------------------------------
          // POSITION
          // -------------------------------------------

          let position = selectedWindow.position;

          /*
           * FIRST APP
           *
           * If there are no visible windows,
           * open exactly in the center.
           */

          if (firstOpen && openWindowCount === 0) {
            position = getCenteredPosition();
          } else if (firstOpen) {

          /*
           * NEW APP
           *
           * If another application is already
           * open, use the macOS-style cascade.
           */
            position = getCascadePosition(openWindowCount);
          }

          /*
           * EXISTING APP
           *
           * Restore its previous position.
           */

          return currentWindows.map((currentWindow) =>
            currentWindow.id === id
              ? {
                  ...currentWindow,

                  isOpen: true,
                  isMinimized: false,
                  isMinimizing: false,

                  hasBeenOpened: true,

                  zIndex: newZIndex,

                  position,
                }
              : currentWindow,
          );
        });

        return newZIndex;
      });
    },
    [playSound, getCenteredPosition, getCascadePosition],
  );

  // =====================================================
  // OPEN PROJECT DETAIL WINDOW
  // =====================================================

  const openProjectWindow = useCallback(
    (projectId: string) => {
      playSound();

      const project = projects.find((item) => item.id === projectId);

      if (!project) {
        return;
      }

      const windowId = `project-${projectId}`;

      // -------------------------------------------------
      // EXISTING PROJECT WINDOW
      // -------------------------------------------------

      const existingWindow = windows.find(
        (currentWindow) => currentWindow.id === windowId,
      );

      if (existingWindow) {
        setHighestZIndex((currentZIndex) => {
          const newZIndex = currentZIndex + 1;

          setWindows((currentWindows) =>
            currentWindows.map((currentWindow) =>
              currentWindow.id === windowId
                ? {
                    ...currentWindow,

                    isOpen: true,
                    isMinimized: false,
                    isMinimizing: false,

                    zIndex: newZIndex,
                  }
                : currentWindow,
            ),
          );

          return newZIndex;
        });

        return;
      }

      // -------------------------------------------------
      // NEW PROJECT WINDOW
      // -------------------------------------------------

      setHighestZIndex((currentZIndex) => {
        const newZIndex = currentZIndex + 1;

        setWindows((currentWindows) => {
          const openWindowCount = currentWindows.filter(
            (currentWindow) =>
              currentWindow.isOpen && !currentWindow.isMinimized,
          ).length;

          const position =
            openWindowCount === 0
              ? getCenteredPosition()
              : getCascadePosition(openWindowCount);

          return [
            ...currentWindows,

            {
              id: windowId,
              title: project.name,

              isOpen: true,
              isMinimized: false,
              isMinimizing: false,
              isMaximized: false,

              hasBeenOpened: true,

              zIndex: newZIndex,

              position,

              type: "project",

              projectId,
            },
          ];
        });

        return newZIndex;
      });
    },
    [playSound, windows, getCenteredPosition, getCascadePosition],
  );

  // =====================================================
  // PORTFOLIO WINDOW CLICK
  // =====================================================

  const handleDockClick = useCallback(
    (id: string) => {
      const selectedWindow = windows.find(
        (currentWindow) => currentWindow.id === id,
      );

      if (!selectedWindow) {
        return;
      }

      // -------------------------------------------------
      // CLOSED
      // -------------------------------------------------

      if (!selectedWindow.isOpen) {
        openWindow(id);
        return;
      }

      // -------------------------------------------------
      // MINIMIZED
      // -------------------------------------------------

      if (selectedWindow.isMinimized) {
        openWindow(id);
        return;
      }

      // -------------------------------------------------
      // ALREADY OPEN
      // -------------------------------------------------

      focusWindow(id);
    },
    [windows, openWindow, focusWindow],
  );

  // =====================================================
  // DOCK APP HANDLER
  // =====================================================

  const handleDockAppClick = useCallback(
    (id: string) => {
      // =============================================
      // FINDER
      // =============================================

      if (id === "finder") {
        handleDockClick("finder");
        return;
      }

      // =============================================
      // SAFARI
      // =============================================

      if (id === "safari") {
        handleDockClick("safari");
        return;
      }

      // =============================================
      // TERMINAL
      // =============================================

      if (id === "terminal") {
        handleDockClick("terminal");
        return;
      }

      // =============================================
      // FILES
      // =============================================

      if (id === "files") {
        handleDockClick("projects");
        return;
      }

      // =============================================
      // MAIL
      // =============================================

      if (id === "mail") {
        handleDockClick("mail");
        return;
      }

      // =============================================
      // AI
      // =============================================

      if (id === "ai") {
        handleDockClick("assistant");
        return;
      }

      // =============================================
      // NOTES
      // =============================================

      if (id === "notes") {
        handleDockClick("notes");
        return;
      }

      // =============================================
      // SETTINGS
      // =============================================

      if (id === "settings") {
        handleDockClick("settings");
        return;
      }

      // =============================================
      // EXISTING APP
      // =============================================

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
      // FINDER
      // ===============================================

      case "finder":
        return (
          <FinderApp
            onOpenItem={(id) => {
              openWindow(id);
            }}
          />
        );

      // ===============================================
      // SAFARI
      // ===============================================

      case "safari":
        return <SafariApp />;

      // ===============================================
      // TERMINAL
      // ===============================================

      case "terminal":
        return <TerminalApp />;

      // ===============================================
      // MAIL
      // ===============================================

      case "mail":
        return <MailApp />;

      // ===============================================
      // NOTES
      // ===============================================

      case "notes":
        return <NotesApp />;

      // ===============================================
      // PROJECTS
      // ===============================================

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
  return <AIAssistantApp />;

      // ===============================================
      // SETTINGS
      // ===============================================

      case "settings":
        return <SettingsApp />;

      // ===============================================
      // SETTINGS
      // ===============================================

      case "settings":
        return <SettingsApp />;

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
        // -------------------------------------------
        // CLOSED / MINIMIZED
        // -------------------------------------------

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

      <Dock
        onOpenApp={handleDockAppClick}
        runningApps={windows
          .filter(
            (currentWindow) =>
              currentWindow.isOpen && !currentWindow.isMinimized,
          )
          .map((currentWindow) => currentWindow.id)}
      />
    </>
  );
}
