"use client";

import WindowManager from "@/components/windows/WindowManager";
import MenuBar from "@/components/desktop/MenuBar";
import WelcomeHero from "@/components/desktop/WelcomeHero";

export default function Home() {
  return (
    <main className="mac-desktop">
      {/* =================================================
          WALLPAPER
          ================================================= */}

      <div
        className="mac-wallpaper"
        aria-hidden="true"
      />

      {/* =================================================
          MENU BAR
          ================================================= */}

      <MenuBar />

      {/* =================================================
          WELCOME HERO
          ================================================= */}

      <WelcomeHero />

      {/* =================================================
          DESKTOP / WINDOWS / DOCK
          ================================================= */}

      <div className="mac-desktop-content">
        <WindowManager />
      </div>
    </main>
  );
}