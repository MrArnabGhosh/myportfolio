"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, Minus, X } from "lucide-react";

interface WindowProps {
  title: string;
  children: React.ReactNode;

  isMaximized: boolean;
  isMinimizing: boolean;
  isMinimized: boolean;
  isRestoring: boolean;

  zIndex: number;

  position: {
    x: number;
    y: number;
  };

  onMove: (x: number, y: number) => void;

  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export default function Window({
  title,
  children,
  isMaximized,
  isMinimizing,
  isMinimized,
  isRestoring,
  zIndex,
  position,
  onMove,
  onClose,
  onMinimize,
  onMaximize,
}: WindowProps) {
  // =====================================================
  // DRAGGING
  // =====================================================

  const [isDragging, setIsDragging] = useState(false);

  const dragOffset = useRef({
    x: 0,
    y: 0,
  });

  // =====================================================
  // START DRAGGING
  // =====================================================

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (isMaximized) {
      return;
    }

    setIsDragging(true);

    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  // =====================================================
  // HANDLE DRAGGING
  // =====================================================

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const newX =
        event.clientX - dragOffset.current.x;

      const newY =
        event.clientY - dragOffset.current.y;

      onMove(newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp,
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp,
      );
    };
  }, [isDragging, onMove]);

  // =====================================================
  // WINDOW Z-INDEX
  // =====================================================
  //
  // Normal window:
  //     Uses WindowManager z-index
  //
  // Maximized window:
  //     Must appear above desktop icons
  //     but below the Menu Bar and Dock.
  //
  // =====================================================

  const finalZIndex = isMaximized
    ? 500
    : zIndex;

  // =====================================================
  // WINDOW STATE CLASS
  // =====================================================
  //
  // minimizing → genie animation into the Dock
  // restoring  → genie animation back out of the Dock
  // minimized  → kept mounted but hidden, so the app
  //              keeps running in the background
  //
  // =====================================================

  const stateClass = isMinimizing
    ? "window-minimizing"
    : isRestoring
      ? "window-restoring"
      : isMinimized
        ? "window-hidden"
        : "";

  // =====================================================
  // WINDOW STYLE
  // =====================================================

  const windowStyle = isMaximized
    ? {
        zIndex: finalZIndex,
      }
    : {
        zIndex: finalZIndex,
        left: position.x,
        top: position.y,
      };

  // =====================================================
  // WINDOW
  // =====================================================

  return (
    <div
      style={windowStyle}
      data-window-frame="true"
      className={`
        mac-window

        ${
          isMaximized
            ? `
              fixed
              left-0
              right-0
              top-[24px]
              bottom-0
              h-auto
              w-auto
              rounded-none
            `
            : `
              fixed
              h-[600px]
              w-[900px]
              rounded-xl
            `
        }

        ${stateClass}

        overflow-hidden
        border
        border-white/20
        bg-[#0d0d0f]
        shadow-2xl
        backdrop-blur-xl
      `}
    >
      {/* =================================================
          WINDOW HEADER
      ================================================= */}

      <div
        onMouseDown={handleMouseDown}
        className={`
          relative
          flex
          h-12
          shrink-0
          items-center
          border-b
          border-white/10
          bg-[#18181a]/95
          px-4

          ${
            isMaximized
              ? "cursor-default"
              : isDragging
                ? "cursor-grabbing"
                : "cursor-grab"
          }
        `}
      >
        {/* =================================================
            TRAFFIC LIGHTS
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
          "
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
        >
          {/* ================================================
              CLOSE
          ================================================= */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close window"
            className="
              group
              flex
              h-[14px]
              w-[14px]
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-[#ff5f57]
            "
          >
            <X
              size={9}
              strokeWidth={2.5}
              className="
                text-black
                opacity-0
                transition-opacity
                group-hover:opacity-100
              "
            />
          </button>

          {/* ================================================
              MINIMIZE
          ================================================= */}

          <button
            type="button"
            onClick={onMinimize}
            aria-label="Minimize window"
            className="
              group
              flex
              h-[14px]
              w-[14px]
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-[#febc2e]
            "
          >
            <Minus
              size={9}
              strokeWidth={2.5}
              className="
                text-black
                opacity-0
                transition-opacity
                group-hover:opacity-100
              "
            />
          </button>

          {/* ================================================
              MAXIMIZE / RESTORE
          ================================================= */}

          <button
            type="button"
            onClick={onMaximize}
            aria-label={
              isMaximized
                ? "Restore window"
                : "Maximize window"
            }
            className="
              group
              flex
              h-[14px]
              w-[14px]
              cursor-pointer
              items-center
              justify-center
              rounded-full
              bg-[#28c840]
            "
          >
            <Maximize2
              size={8}
              strokeWidth={2.5}
              className="
                text-black
                opacity-0
                transition-opacity
                group-hover:opacity-100
              "
            />
          </button>
        </div>

        {/* =================================================
            WINDOW TITLE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            -translate-x-1/2
          "
        >
          <p className="text-sm font-medium text-white">
            {title}
          </p>
        </div>
      </div>

      {/* =================================================
          WINDOW CONTENT
      ================================================= */}

      <div
        className="
          min-h-0
          h-[calc(100%-3rem)]
          overflow-hidden
        "
      >
        {children}
      </div>
    </div>
  );
}