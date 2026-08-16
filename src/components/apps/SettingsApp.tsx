"use client";

import {
  Check,
  Monitor,
  Moon,
  Sun,
  Sparkles,
  Volume2,
  Info,
  ChevronRight,
} from "lucide-react";

import { usePortfolioSettings } from "@/context/PortfolioSettings";

<<<<<<< HEAD
const wallpapers = [
  {
    id: "default",
    name: "Default",
    className: "wallpaper-preview-default",
  },
  {
    id: "aurora",
    name: "Aurora",
    className: "wallpaper-preview-aurora",
  },
  {
    id: "ocean",
    name: "Ocean",
    className: "wallpaper-preview-ocean",
  },
  {
    id: "purple",
    name: "Purple",
    className: "wallpaper-preview-purple",
  },
];

export default function SettingsApp() {
  const {
  appearance,
  setAppearance,
  animations,
  setAnimations,
  sounds,
  setSounds,
  playSound,
  wallpaper,
  setWallpaper,
} = usePortfolioSettings();
=======
export default function SettingsApp() {
  const {
    appearance,
    setAppearance,
    animations,
    setAnimations,
    sounds,
    setSounds,
  } = usePortfolioSettings();
>>>>>>> e5f1f630588a3f885cfa3da93d30e191c219a889

  return (
    <div className="flex h-full min-h-full overflow-hidden bg-[#f5f5f7] text-black">
      {/* =================================================
          SIDEBAR
          ================================================= */}

      <aside
        className="
          hidden
          w-56
          shrink-0
          border-r
          border-black/10
          bg-[#eeeeef]
          p-3
          sm:block
        "
      >
        <div className="px-3 py-3">
          <p className="text-xs font-medium text-black/35">
            System Preferences
          </p>

          <h2 className="mt-1 text-lg font-semibold">Settings</h2>
        </div>

        <div className="mt-2 space-y-1">
          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              bg-white
              px-3
              py-2.5
              text-left
              text-sm
              font-medium
              shadow-sm
            "
          >
            <Monitor size={17} className="text-blue-500" />
            Appearance
          </button>

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-left
              text-sm
              text-black/55
              hover:bg-black/5
            "
          >
            <Sparkles size={17} className="text-purple-500" />
            Animations
          </button>

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-left
              text-sm
              text-black/55
              hover:bg-black/5
            "
          >
            <Volume2 size={17} className="text-orange-500" />
            Sound
          </button>

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-left
              text-sm
              text-black/55
              hover:bg-black/5
            "
          >
            <Info size={17} className="text-gray-500" />
            About
          </button>
        </div>
      </aside>

      {/* =================================================
          MAIN CONTENT
          ================================================= */}

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Toolbar */}

        <div
          className="
            flex
            h-12
            shrink-0
            items-center
            border-b
            border-black/10
            bg-[#f6f6f6]/95
            px-5
          "
        >
          <div>
            <p className="text-sm font-semibold">Appearance</p>

            <p className="text-[11px] text-black/35">
              Customize your portfolio
            </p>
          </div>
        </div>

        {/* Content */}

        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-2xl px-6 py-8">
            {/* =================================================
                APPEARANCE
                ================================================= */}

            <section>
              <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                Appearance
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                Choose your appearance
              </h1>

              <p className="mt-2 text-sm leading-6 text-black/45">
                Choose how the portfolio applications should look.
              </p>

              {/* Appearance cards */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Dark */}

                <button
                  type="button"
                  onClick={() => setAppearance("dark")}
                  className={`
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition
                    ${
                      appearance === "dark"
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-black/10 hover:border-black/20"
                    }
                  `}
                >
                  <div className="relative overflow-hidden rounded-xl bg-[#111]">
                    <div className="flex h-24 items-center justify-center">
                      <Moon size={28} className="text-white/80" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Dark</p>

                      <p className="mt-1 text-xs text-black/40">
                        macOS dark appearance
                      </p>
                    </div>

                    {appearance === "dark" && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                </button>

                {/* Light */}

                <button
                  type="button"
                  onClick={() => setAppearance("light")}
                  className={`
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition
                    ${
                      appearance === "light"
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-black/10 hover:border-black/20"
                    }
                  `}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white">
                    <div className="flex h-24 items-center justify-center">
                      <Sun size={28} className="text-black/60" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Light</p>

                      <p className="mt-1 text-xs text-black/40">
                        macOS light appearance
                      </p>
                    </div>

                    {appearance === "light" && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </section>

            {/* =================================================
<<<<<<< HEAD
                WALLPAPER
                ================================================= */}   
                
            <section className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                Wallpaper
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Choose your wallpaper
              </h2>

              <p className="mt-2 text-sm text-black/45">
                Personalize the desktop background of your portfolio.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {wallpapers.map((item) => {
                  const selected = wallpaper === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setWallpaper(item.id);
                        playSound();
                      }}
                      className={`
            group
            rounded-2xl
            border
            p-2
            text-left
            transition
            ${
              selected
                ? "border-blue-500 ring-2 ring-blue-500/20"
                : "border-black/10 hover:border-black/20"
            }
          `}
                    >
                      <div
                        className={`
              ${item.className}
              h-24
              w-full
              rounded-xl
              transition
              group-hover:scale-[1.02]
            `}
                      />

                      <div className="flex items-center justify-between px-1 pt-3">
                        <span className="text-xs font-medium">{item.name}</span>

                        {selected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                            <Check size={12} />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* =================================================
=======
>>>>>>> e5f1f630588a3f885cfa3da93d30e191c219a889
                ANIMATIONS
                ================================================= */}

            <section className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                Experience
              </p>

              <h2 className="mt-1 text-lg font-semibold">Portfolio behavior</h2>

              <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
                {/* Animations */}

                <div className="flex items-center gap-4 border-b border-black/5 px-5 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                    <Sparkles size={18} className="text-purple-600" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">Window animations</p>

                    <p className="mt-1 text-xs text-black/40">
                      Enable smooth opening and minimizing animations.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAnimations(!animations)}
                    className={`
                      relative
                      h-6
                      w-11
                      rounded-full
                      transition
                      ${animations ? "bg-green-500" : "bg-black/15"}
                    `}
                    aria-label="Toggle animations"
                  >
                    <span
                      className={`
                        absolute
                        top-0.5
                        h-5
                        w-5
                        rounded-full
                        bg-white
                        shadow
                        transition
                        ${animations ? "left-5.5" : "left-0.5"}
                      `}
                    />
                  </button>
                </div>

                {/* Sound */}

                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                    <Volume2 size={18} className="text-orange-600" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">Interface sounds</p>

                    <p className="mt-1 text-xs text-black/40">
                      Play subtle sounds for desktop interactions.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSounds(!sounds)}
                    className={`
                      relative
                      h-6
                      w-11
                      rounded-full
                      transition
                      ${sounds ? "bg-green-500" : "bg-black/15"}
                    `}
                    aria-label="Toggle sounds"
                  >
                    <span
                      className={`
                        absolute
                        top-0.5
                        h-5
                        w-5
                        rounded-full
                        bg-white
                        shadow
                        transition
                        ${sounds ? "left-5.5" : "left-0.5"}
                      `}
                    />
                  </button>
<<<<<<< HEAD
                  
=======
>>>>>>> e5f1f630588a3f885cfa3da93d30e191c219a889
                </div>
              </div>
            </section>

            {/* =================================================
                ABOUT
                ================================================= */}

            <section className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                System
              </p>

              <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
                <div className="flex items-center gap-4 px-5 py-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black">
                    <span className="text-lg font-semibold text-white">A</span>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      Arnab&apos;s Portfolio
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      macOS-inspired developer portfolio
                    </p>
                  </div>

                  <ChevronRight size={17} className="text-black/25" />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Status */}

        <div
          className="
            flex
            h-7
            shrink-0
            items-center
            justify-center
            border-t
            border-black/10
            bg-[#f6f6f6]
            text-[11px]
            text-black/35
          "
        >
          Settings • Arnab&apos;s Portfolio
        </div>
      </main>
    </div>
  );
}
