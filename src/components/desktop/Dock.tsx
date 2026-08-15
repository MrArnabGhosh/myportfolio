"use client";

import {
  FileText,
  Folder,
  Mail,
  MessageCircle,
  Settings,
  Terminal,
  Globe,
  Search,
} from "lucide-react";

import { dockApps } from "@/data/dockApps";

interface DockProps {
  onOpenApp: (id: string) => void;
  runningApps?: string[];
}

export default function Dock({
  onOpenApp,
  runningApps = [],
}: DockProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "finder":
        return (
          <div
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              overflow-hidden
              rounded-[13px]
              bg-gradient-to-br
              from-[#63c8ff]
              via-[#2488e8]
              to-[#1261c7]
              shadow-[0_4px_10px_rgba(0,0,0,0.35)]
            "
          >
            <div
              className="
                absolute
                left-[11px]
                top-[9px]
                h-[34px]
                w-[30px]
                rounded-b-[10px]
                rounded-t-[12px]
                bg-white/90
              "
            />

            <div
              className="
                absolute
                left-[11px]
                top-[9px]
                h-[17px]
                w-[15px]
                rounded-tl-[12px]
                border-r
                border-black/10
                bg-[#e9f8ff]
              "
            />

            <div
              className="
                absolute
                bottom-[15px]
                left-[18px]
                h-[3px]
                w-[3px]
                rounded-full
                bg-[#1765b8]
              "
            />

            <div
              className="
                absolute
                bottom-[15px]
                right-[18px]
                h-[3px]
                w-[3px]
                rounded-full
                bg-[#1765b8]
              "
            />

            <div
              className="
                absolute
                bottom-[10px]
                left-1/2
                h-[4px]
                w-[12px]
                -translate-x-1/2
                rounded-b-full
                border-b-2
                border-[#1765b8]
              "
            />
          </div>
        );

      case "safari":
        return (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[13px]
              bg-gradient-to-br
              from-[#dff7ff]
              to-[#4ab9f2]
              shadow-[0_4px_10px_rgba(0,0,0,0.3)]
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border-[2px]
                border-white/80
                bg-[#d9f6ff]
              "
            >
              <Globe
                size={25}
                strokeWidth={1.5}
                className="text-[#0879c9]"
              />
            </div>
          </div>
        );

      case "terminal":
        return (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[13px]
              bg-gradient-to-br
              from-[#3c3c3f]
              to-[#101012]
              shadow-[0_4px_10px_rgba(0,0,0,0.45)]
            "
          >
            <Terminal
              size={27}
              strokeWidth={1.8}
              className="text-white"
            />
          </div>
        );

      case "files":
        return (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[13px]
              bg-gradient-to-b
              from-[#62c9ff]
              to-[#278ee9]
              shadow-[0_4px_10px_rgba(0,0,0,0.3)]
            "
          >
            <Folder
              size={31}
              strokeWidth={1.6}
              fill="rgba(255,255,255,0.25)"
              className="text-white"
            />
          </div>
        );

      case "mail":
        return (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[13px]
              bg-gradient-to-b
              from-[#ffffff]
              to-[#dcecff]
              shadow-[0_4px_10px_rgba(0,0,0,0.3)]
            "
          >
            <Mail
              size={30}
              strokeWidth={1.6}
              className="text-[#1677d2]"
            />
          </div>
        );

      case "ai":
        return (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[13px]
              bg-gradient-to-br
              from-[#9c6cff]
              via-[#6b45dc]
              to-[#3d1b9b]
              shadow-[0_4px_12px_rgba(0,0,0,0.4)]
            "
          >
            <MessageCircle
              size={29}
              strokeWidth={1.8}
              className="text-white"
            />
          </div>
        );

      case "notes":
        return (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[13px]
              bg-gradient-to-b
              from-[#fffef5]
              to-[#e7e5dc]
              shadow-[0_4px_10px_rgba(0,0,0,0.3)]
            "
          >
            <FileText
              size={29}
              strokeWidth={1.6}
              className="text-[#555]"
            />
          </div>
        );

      case "settings":
        return (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[13px]
              bg-gradient-to-br
              from-[#9fa5ad]
              to-[#555b64]
              shadow-[0_4px_10px_rgba(0,0,0,0.4)]
            "
          >
            <Settings
              size={29}
              strokeWidth={1.7}
              className="text-white"
            />
          </div>
        );

      default:
        return (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-white/10
            "
          >
            <Search size={24} />
          </div>
        );
    }
  };

  return (
    <div
      id="portfolio-dock"
      className="
        fixed
        bottom-4
        left-1/2
        z-[10000]
        -translate-x-1/2
      "
    >
      <div
        className="
          flex
          items-end
          gap-1.5
          rounded-[22px]
          border
          border-white/25
          bg-white/[0.14]
          px-3
          pb-2
          pt-3
          shadow-[0_12px_40px_rgba(0,0,0,0.4)]
          backdrop-blur-2xl
        "
      >
        {dockApps.map((app, index) => {
          const isRunning = runningApps.includes(app.id);

          return (
            <div
              key={app.id}
              className="relative flex items-end"
            >
              {/* Separator */}

              {index === 5 && (
                <div
                  className="
                    mx-1.5
                    mb-1
                    h-9
                    w-px
                    bg-white/20
                  "
                />
              )}

              <button
                type="button"
                onClick={() => onOpenApp(app.id)}
                aria-label={app.name}
                className="
                  dock-item
                  group
                  relative
                  flex
                  h-14
                  w-14
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-2xl
                  transition-all
                  duration-200
                  ease-out
                  hover:-translate-y-3
                  hover:scale-[1.18]
                  focus:outline-none
                "
              >
                {getIcon(app.id)}

                {/* Tooltip */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    -top-11
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-lg
                    border
                    border-white/10
                    bg-black/75
                    px-2.5
                    py-1.5
                    text-[11px]
                    font-medium
                    text-white
                    opacity-0
                    shadow-xl
                    backdrop-blur-xl
                    transition-opacity
                    duration-150
                    group-hover:opacity-100
                  "
                >
                  {app.name}
                </span>

                {/* Running indicator */}

                {isRunning && (
                  <span
                    className="
                      absolute
                      -bottom-1
                      left-1/2
                      h-1
                      w-1
                      -translate-x-1/2
                      rounded-full
                      bg-white
                      shadow-[0_0_5px_rgba(255,255,255,0.8)]
                    "
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}