"use client";

import { useState, type ReactNode } from "react";

type DesktopItem = {
  id: string;
  name: string;
  symbol: string;
};

type DesktopIconsProps = {
  onOpenWindow: (id: string) => void;
};

const desktopItems: DesktopItem[] = [
  {
    id: "projects",
    name: "Projects",
    symbol: "grid",
  },
  {
    id: "education",
    name: "Education",
    symbol: "education",
  },
  {
    id: "experience",
    name: "Experience",
    symbol: "experience",
  },
  {
    id: "skills",
    name: "Skills",
    symbol: "skills",
  },
  {
    id: "about",
    name: "About Me",
    symbol: "about",
  },
  {
    id: "resume",
    name: "Resume",
    symbol: "resume",
  },
  {
    id: "contact",
    name: "Contact",
    symbol: "contact",
  },
];

/* =========================================================
   macOS Folder
========================================================= */

function MacFolderIcon({
  symbol,
}: {
  symbol: string;
}) {
  return (
    <svg
      className="mac-folder-svg"
      viewBox="0 0 64 64"
      width="56"
      height="56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`folderTop-${symbol}`}
          x1="8"
          y1="8"
          x2="56"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A8D8FF" />
          <stop offset="0.45" stopColor="#65B5F8" />
          <stop offset="1" stopColor="#3586DE" />
        </linearGradient>

        <linearGradient
          id={`folderBody-${symbol}`}
          x1="8"
          y1="20"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#79C4FF" />
          <stop offset="0.5" stopColor="#4A9BE8" />
          <stop offset="1" stopColor="#2475C8" />
        </linearGradient>

        <linearGradient
          id={`symbol-${symbol}`}
          x1="20"
          y1="20"
          x2="44"
          y2="45"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D8EDFF" />
        </linearGradient>

        <filter
          id={`shadow-${symbol}`}
          x="-20%"
          y="-20%"
          width="140%"
          height="150%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="2.5"
            floodColor="#000000"
            floodOpacity="0.35"
          />
        </filter>
      </defs>

      {/* Folder tab */}
      <path
        d="
          M7 17
          C7 13.686 9.686 11 13 11
          H25
          L30 17
          H51
          C54.314 17 57 19.686 57 23
          V26
          H7
          Z
        "
        fill={`url(#folderTop-${symbol})`}
        filter={`url(#shadow-${symbol})`}
      />

      {/* Folder body */}
      <path
        d="
          M6 23
          C6 19.686 8.686 17 12 17
          H52
          C55.314 17 58 19.686 58 23
          V47
          C58 52.523 53.523 57 48 57
          H16
          C10.477 57 6 52.523 6 47
          Z
        "
        fill={`url(#folderBody-${symbol})`}
        filter={`url(#shadow-${symbol})`}
      />

      {/* Folder highlight */}
      <path
        d="
          M10 23
          C10 20.791 11.791 19 14 19
          H50
          C52.209 19 54 20.791 54 23
        "
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
      />

      {/* Symbol */}
      <FolderSymbol symbol={symbol} />
    </svg>
  );
}

/* =========================================================
   Folder Symbols
========================================================= */

function FolderSymbol({
  symbol,
}: {
  symbol: string;
}): ReactNode {
  const color = `url(#symbol-${symbol})`;

  if (symbol === "grid") {
    return (
      <g fill={color}>
        <rect x="20" y="27" width="7" height="7" rx="1.5" />
        <rect x="29" y="27" width="7" height="7" rx="1.5" />
        <rect x="38" y="27" width="7" height="7" rx="1.5" />

        <rect x="20" y="36" width="7" height="7" rx="1.5" />
        <rect x="29" y="36" width="7" height="7" rx="1.5" />
        <rect x="38" y="36" width="7" height="7" rx="1.5" />
      </g>
    );
  }

  if (symbol === "education") {
    return (
      <g
        fill="none"
        stroke={color}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 28L32 22L46 28L32 34L18 28Z" />
        <path d="M23 31V37C23 40 27 42 32 42C37 42 41 40 41 37V31" />
        <path d="M46 28V37" />
      </g>
    );
  }

  if (symbol === "experience") {
    return (
      <g
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="19"
          y="27"
          width="26"
          height="17"
          rx="3"
        />
        <path d="M27 27V23C27 21.9 27.9 21 29 21H35C36.1 21 37 21.9 37 23V27" />
        <path d="M19 34H45" />
        <path d="M30 34V37H34V34" />
      </g>
    );
  }

  if (symbol === "skills") {
    return (
      <g
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 27L19 32L24 37" />
        <path d="M40 27L45 32L40 37" />
        <path d="M36 25L28 39" />
      </g>
    );
  }

  if (symbol === "about") {
    return (
      <g
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="27" r="5" />
        <path d="M22 43C22 37.5 26.5 34 32 34C37.5 34 42 37.5 42 43" />
      </g>
    );
  }

  if (symbol === "resume") {
    return (
      <g
        fill="none"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 20H36L42 26V44H22V20Z" />
        <path d="M36 20V27H42" />
        <path d="M27 32H37" />
        <path d="M27 37H37" />
      </g>
    );
  }

  if (symbol === "contact") {
    return (
      <g
        fill="none"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="18"
          y="25"
          width="28"
          height="18"
          rx="3"
        />
        <path d="M19 27L32 36L45 27" />
      </g>
    );
  }

  return null;
}

/* =========================================================
   Desktop Icons
========================================================= */

export default function DesktopIcons({
  onOpenWindow,
}: DesktopIconsProps) {
  const [selected, setSelected] = useState<string | null>(
    null,
  );

  const handleDoubleClick = (item: DesktopItem) => {
    setSelected(item.id);

    onOpenWindow(item.id);
  };

  return (
    <div
      className="desktop-icons"
      onClick={() => setSelected(null)}
    >
      {desktopItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`desktop-icon ${
            selected === item.id ? "selected" : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();

            setSelected(item.id);
          }}
          onDoubleClick={(event) => {
            event.stopPropagation();

            handleDoubleClick(item);
          }}
          aria-label={item.name}
        >
          <div className="desktop-icon-image">
            <MacFolderIcon symbol={item.symbol} />
          </div>

          <span className="desktop-icon-label">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}