"use client";

import WindowManager from "@/components/windows/WindowManager";
import MenuBar from "@/components/desktop/MenuBar";
import WelcomeText from "@/components/desktop/WelcomeHero";


import {
  PortfolioSettingsProvider,
  usePortfolioSettings,
} from "@/context/PortfolioSettings";

function Desktop() {
  const {
    appearance,
    wallpaper,
  } = usePortfolioSettings();

  return (
    <main
      className={`
        mac-desktop
        ${
          appearance === "light"
            ? "portfolio-light"
            : "portfolio-dark"
        }
        wallpaper-${wallpaper}
      `}
    >
      {/* Wallpaper */}
      <div
        className="mac-wallpaper"
        aria-hidden="true"
      />

      {/* macOS Menu Bar */}
      <MenuBar />

      {/* Center Welcome Text */}
      <WelcomeText />

      {/* Windows + Desktop Icons + Dock */}
      <div className="mac-desktop-content">
        <WindowManager />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <PortfolioSettingsProvider>
      <Desktop />
    </PortfolioSettingsProvider>
  );
}