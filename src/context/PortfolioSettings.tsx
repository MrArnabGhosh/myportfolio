"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Appearance = "dark" | "light";

interface PortfolioSettingsContextType {
  appearance: Appearance;
  setAppearance: (value: Appearance) => void;

  animations: boolean;
  setAnimations: (value: boolean) => void;

  sounds: boolean;
  setSounds: (value: boolean) => void;

  wallpaper: string;
  setWallpaper: (value: string) => void;

  playSound: () => void;
}

const PortfolioSettingsContext =
  createContext<PortfolioSettingsContextType | null>(
    null,
  );

export function PortfolioSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  // =====================================================
  // SETTINGS
  // =====================================================

  const [appearance, setAppearance] =
    useState<Appearance>("dark");

  const [animations, setAnimations] =
    useState(true);

  const [sounds, setSounds] =
    useState(false);

  const [wallpaper, setWallpaper] =
    useState("default");

  // =====================================================
  // LOAD SAVED SETTINGS
  // =====================================================

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "portfolio-settings",
      );

    if (!saved) {
      return;
    }

    try {
      const settings = JSON.parse(saved);

      if (
        settings.appearance === "dark" ||
        settings.appearance === "light"
      ) {
        setAppearance(settings.appearance);
      }

      if (
        typeof settings.animations ===
        "boolean"
      ) {
        setAnimations(settings.animations);
      }

      if (
        typeof settings.sounds === "boolean"
      ) {
        setSounds(settings.sounds);
      }

      if (
        typeof settings.wallpaper ===
        "string"
      ) {
        setWallpaper(settings.wallpaper);
      }
    } catch {
      console.warn(
        "Unable to load portfolio settings.",
      );
    }
  }, []);

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "portfolio-settings",
      JSON.stringify({
        appearance,
        animations,
        sounds,
        wallpaper,
      }),
    );
  }, [
    appearance,
    animations,
    sounds,
    wallpaper,
  ]);

  // =====================================================
  // SOUND
  // =====================================================

 const playSound = useCallback(() => {
  if (!sounds) {
    return;
  }

  try {
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) {
      console.warn("Web Audio API is not supported.");
      return;
    }

    const audioContext = new AudioContextClass();

    const play = () => {
      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        520,
        audioContext.currentTime,
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        760,
        audioContext.currentTime + 0.08,
      );

      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime,
      );

      gain.gain.exponentialRampToValueAtTime(
        0.08,
        audioContext.currentTime + 0.01,
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.12,
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + 0.12,
      );

      oscillator.addEventListener(
        "ended",
        () => {
          audioContext.close();
        },
      );
    };

    if (audioContext.state === "suspended") {
      audioContext.resume().then(play);
    } else {
      play();
    }
  } catch (error) {
    console.error(
      "Unable to play portfolio sound:",
      error,
    );
  }
}, [sounds]);

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <PortfolioSettingsContext.Provider
      value={{
        appearance,
        setAppearance,

        animations,
        setAnimations,

        sounds,
        setSounds,

        wallpaper,
        setWallpaper,

        playSound,
      }}
    >
      {children}
    </PortfolioSettingsContext.Provider>
  );
}

// =======================================================
// HOOK
// =======================================================

export function usePortfolioSettings() {
  const context = useContext(
    PortfolioSettingsContext,
  );

  if (!context) {
    throw new Error(
      "usePortfolioSettings must be used inside PortfolioSettingsProvider",
    );
  }

  return context;
}