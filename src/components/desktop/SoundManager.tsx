"use client";

import { useCallback, useRef } from "react";

import { usePortfolioSettings } from "@/context/PortfolioSettings";

export default function SoundManager() {
  const { sounds } = usePortfolioSettings();

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const playClick = useCallback(() => {
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
        return;
      }

      if (!audioContextRef.current) {
        audioContextRef.current =
          new AudioContextClass();
      }

      const audioContext =
        audioContextRef.current;

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

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
        audioContext.currentTime + 0.06,
      );

      gain.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime,
      );

      gain.gain.exponentialRampToValueAtTime(
        0.035,
        audioContext.currentTime + 0.01,
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.08,
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime + 0.08,
      );
    } catch {
      // Audio is optional.
    }
  }, [sounds]);

  return null;
}