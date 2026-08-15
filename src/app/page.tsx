"use client";

import WindowManager from "@/components/windows/WindowManager";
import MenuBar from "@/components/desktop/MenuBar";
import WelcomeHero from "@/components/desktop/WelcomeHero";

export default function Home() {
  return (
    <main className="mac-desktop">

      {/* Wallpaper */}
      <div
        className="mac-wallpaper"
        aria-hidden="true"
      />

      {/* Menu Bar */}
      <MenuBar />

      {/* Welcome Text */}
      <WelcomeHero />

      {/* Desktop / Windows / Dock */}
      <div className="mac-desktop-content">
        <WindowManager />
      </div>

    </main>
  );
}