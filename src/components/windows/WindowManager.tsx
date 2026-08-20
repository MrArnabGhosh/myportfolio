"use client";

import Dock from "@/components/desktop/Dock";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
import { useAssistantChat } from "@/context/AssistantChat";

import {
  dockIdForWindow,
  windowIdForDock,
} from "@/data/dockApps";

// =======================================================
// WINDOW IDS → DOCK IDS
// =======================================================

function toDockIds(windowList: WindowState[]) {
  return windowList
    .map((currentWindow) =>
      dockIdForWindow(currentWindow.id),
    )
    .filter(
      (dockId): dockId is string =>
        dockId !== null,
    );
}

export default function WindowManager() {
  // =====================================================
  // PORTFOLIO SETTINGS
  // =====================================================

  const { playSound } = usePortfolioSettings();

  // =====================================================
  // AI ASSISTANT (runs in the background)
  // =====================================================

  const {
    unreadCount: assistantUnreadCount,
    isStreaming: assistantIsStreaming,
  } = useAssistantChat();

  // =====================================================
  // WINDOW SIZE
  // =====================================================

  const WINDOW_WIDTH = 900;
  const WINDOW_HEIGHT = 600;

  // =====================================================
  // GENIE ANIMATION DURATIONS
  // =====================================================
  //
  // Must stay in sync with the keyframes in
  // globals.css (.window-minimizing / .window-restoring).
  //
  // =====================================================

  const MINIMIZE_DURATION = 450;
  const RESTORE_DURATION = 420;

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
      isRestoring: false,
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
  // MINIMIZED WINDOW THUMBNAILS
  // =====================================================
  //
  // A snapshot of each window's content, taken the
  // instant it's minimized, so the Dock can show a
  // small preview instead of (or alongside) its icon.
  //
  // =====================================================

  const [thumbnails, setThumbnails] = useState<
    Record<string, string>
  >({});

  const captureThumbnail = useCallback((id: string) => {
    const frame = document.querySelector(
      `[data-window-id="${id}"] .mac-window`,
    ) as HTMLElement | null;

    if (!frame) {
      return;
    }

    import("html2canvas")
      .then(({ default: html2canvas }) =>
        html2canvas(frame, {
          backgroundColor: null,
          scale: 0.3,
          logging: false,
        }),
      )
      .then((canvas) => {
        setThumbnails((current) => ({
          ...current,
          [id]: canvas.toDataURL("image/png"),
        }));
      })
      .catch(() => {
        /* Preview is a nice-to-have — fall back to the icon. */
      });
  }, []);

  // =====================================================
  // LATEST WINDOWS (for handlers that must read
  // the current state without re-creating themselves)
  // =====================================================

  const windowsRef = useRef<WindowState[]>(windows);

  useEffect(() => {
    windowsRef.current = windows;
  }, [windows]);

  // =====================================================
  // DOCK GENIE TRANSFORM
  // =====================================================
  //
  // Measures the real window frame and the Dock tile
  // that owns it, so a window sucks into (and springs
  // back out of) its own icon — like macOS.
  //
  // =====================================================

  const getDockTransform = useCallback((id: string) => {
    const frame = document.querySelector(
      `[data-window-id="${id}"] .mac-window`,
    ) as HTMLElement | null;

    if (!frame) {
      return null;
    }

    const dockId = dockIdForWindow(id);

    const dockTile = dockId
      ? (document.querySelector(
          `[data-dock-id="${dockId}"]`,
        ) as HTMLElement | null)
      : null;

    const target =
      dockTile ??
      document.getElementById("portfolio-dock");

    if (!target) {
      return null;
    }

    /*
     * A genie animation may still be running on the
     * frame (minimize clicked, then the Dock clicked
     * straight away). Measuring while transformed
     * would give a shrunken rect, so the animation
     * is muted for the measurement only.
     */

    const previousAnimation = frame.style.animation;

    frame.style.animation = "none";

    const frameRect = frame.getBoundingClientRect();

    frame.style.animation = previousAnimation;

    const targetRect = target.getBoundingClientRect();

    if (!frameRect.width || !frameRect.height) {
      return null;
    }

    const scale = Math.min(
      0.16,
      Math.max(
        0.05,
        targetRect.width / frameRect.width,
      ),
    );

    const translateX =
      targetRect.left +
      targetRect.width / 2 -
      (frameRect.left + frameRect.width / 2);

    const translateY =
      targetRect.top +
      targetRect.height / 2 -
      (frameRect.top + frameRect.height / 2);

    frame.style.setProperty(
      "--minimize-transform",
      `translate(${translateX}px, ${translateY}px) scale(${scale})`,
    );

    return frame;
  }, []);

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
              isRestoring: false,
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

    setThumbnails((current) => {
      if (!(id in current)) {
        return current;
      }

      const next = { ...current };

      delete next[id];

      return next;
    });
  }, []);

  // =====================================================
  // MINIMIZE WINDOW
  // =====================================================
  //
  // The window is NOT unmounted. It plays the genie
  // animation into its Dock tile and is then hidden,
  // so the app keeps running in the background with
  // its scroll position and state intact.
  //
  // =====================================================

  const minimizeWindow = useCallback(
    (id: string) => {
      captureThumbnail(id);

      const frame = getDockTransform(id);

      // -------------------------------------------------
      // FALLBACK (no frame / no dock on screen)
      // -------------------------------------------------

      if (!frame) {
        setWindows((currentWindows) =>
          currentWindows.map((currentWindow) =>
            currentWindow.id === id
              ? {
                  ...currentWindow,

                  isMinimized: true,
                  isMinimizing: false,
                  isRestoring: false,
                }
              : currentWindow,
          ),
        );

        return;
      }

      // -------------------------------------------------
      // START ANIMATION
      // -------------------------------------------------

      setWindows((currentWindows) =>
        currentWindows.map((currentWindow) =>
          currentWindow.id === id
            ? {
                ...currentWindow,

                isMinimizing: true,
                isRestoring: false,
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
      }, MINIMIZE_DURATION);
    },
    [captureThumbnail, getDockTransform, MINIMIZE_DURATION],
  );

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

      // -------------------------------------------------
      // RESTORING FROM THE DOCK?
      // -------------------------------------------------

      const target = windowsRef.current.find(
        (currentWindow) => currentWindow.id === id,
      );

      const isReturningFromDock = Boolean(
        target?.isOpen &&
          (target.isMinimized || target.isMinimizing),
      );

      /*
       * Prime the genie transform while the window is
       * still hidden, so the restore animation starts
       * from the Dock tile.
       */

      const isGenieReady =
        isReturningFromDock &&
        Boolean(getDockTransform(id));

      if (isGenieReady) {
        setTimeout(() => {
          setWindows((currentWindows) =>
            currentWindows.map((currentWindow) =>
              currentWindow.id === id
                ? {
                    ...currentWindow,

                    isRestoring: false,
                  }
                : currentWindow,
            ),
          );
        }, RESTORE_DURATION);
      }

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
                  isRestoring: isGenieReady,

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
    [
      playSound,
      getCenteredPosition,
      getCascadePosition,
      getDockTransform,
      RESTORE_DURATION,
    ],
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

      const existingWindow = windowsRef.current.find(
        (currentWindow) => currentWindow.id === windowId,
      );

      if (existingWindow) {
        /*
         * openWindow already handles focus, restoring
         * from the Dock and the genie animation.
         */

        openWindow(windowId);

        return;
      }

      // -------------------------------------------------
      // NEW PROJECT WINDOW
      // -------------------------------------------------

      playSound();

      setHighestZIndex((currentZIndex) => {
        const newZIndex = currentZIndex + 1;

        setWindows((currentWindows) => {
          if (
            currentWindows.some(
              (currentWindow) => currentWindow.id === windowId,
            )
          ) {
            return currentWindows;
          }

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
              isRestoring: false,
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
    [
      playSound,
      openWindow,
      getCenteredPosition,
      getCascadePosition,
    ],
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
  //
  // A Dock tile and its window do not always share an
  // id (Files → projects, AI Assistant → assistant),
  // so the mapping lives in data/dockApps.
  //
  // =====================================================

  const handleDockAppClick = useCallback(
    (dockId: string) => {
      handleDockClick(windowIdForDock(dockId));
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
        return (
          <AIAssistantApp
            isVisible={
              !currentWindow.isMinimized &&
              !currentWindow.isMinimizing
            }
          />
        );

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
        // CLOSED
        // -------------------------------------------
        //
        // Minimized windows stay mounted so the app
        // keeps running in the background.
        //
        // -------------------------------------------

        if (!currentWindow.isOpen) {
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
              isMinimized={currentWindow.isMinimized}
              isRestoring={currentWindow.isRestoring}
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
        runningApps={toDockIds(
          windows.filter(
            (currentWindow) => currentWindow.isOpen,
          ),
        )}
        minimizedApps={toDockIds(
          windows.filter(
            (currentWindow) =>
              currentWindow.isOpen &&
              (currentWindow.isMinimized ||
                currentWindow.isMinimizing),
          ),
        )}
        thumbnails={thumbnails}
        minimizedWindows={windows
          .filter(
            (currentWindow) =>
              currentWindow.isOpen &&
              (currentWindow.isMinimized ||
                currentWindow.isMinimizing) &&
              dockIdForWindow(currentWindow.id) === null,
          )
          .map((currentWindow) => ({
            id: currentWindow.id,
            title: currentWindow.title,
          }))}
        onRestoreWindow={openWindow}
        badges={{
          ai: assistantUnreadCount,
        }}
        busyApps={
          assistantIsStreaming ? ["ai"] : []
        }
      />
    </>
  );
}
