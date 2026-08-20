"use client";

import { useCallback, useState } from "react";

import WindowManager from "@/components/windows/WindowManager";
import MenuBar from "@/components/desktop/MenuBar";
import WelcomeText from "@/components/desktop/WelcomeHero";
import BootScreen from "@/components/desktop/BootScreen";

import {
  PortfolioSettingsProvider,
  usePortfolioSettings,
} from "@/context/PortfolioSettings";

import { AssistantChatProvider } from "@/context/AssistantChat";

function Desktop() {
  const {
    appearance,
    wallpaper,
  } = usePortfolioSettings();

  // =====================================================
  // BOOT
  // =====================================================

  const [hasBooted, setHasBooted] =
    useState(false);

  const handleBootFinish = useCallback(() => {
    setHasBooted(true);
  }, []);

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

      {/* Center Welcome Text (after the boot sequence) */}
      {hasBooted && <WelcomeText />}

      {/* Windows + Desktop Icons + Dock */}
      <div className="mac-desktop-content">
        <WindowManager />
      </div>

      {/* Multilingual macOS boot screen */}
      <BootScreen onFinish={handleBootFinish} />
    </main>
  );
}

export default function Home() {
  return (
    <PortfolioSettingsProvider>
      <AssistantChatProvider>
        <Desktop />
      </AssistantChatProvider>
    </PortfolioSettingsProvider>
  );
}