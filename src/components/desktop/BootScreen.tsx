"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Apple } from "lucide-react";

import { usePortfolioSettings } from "@/context/PortfolioSettings";

// =======================================================
// PHASES
// =======================================================
//
// power    → Apple logo + progress bar
// greeting → multilingual "hello" sequence
// exit     → fade / zoom into the desktop
// done     → unmounted
//
// =======================================================

type BootPhase =
  | "power"
  | "greeting"
  | "exit"
  | "done";

interface Greeting {
  text: string;
  lang: string;
}

// =======================================================
// GREETINGS
// =======================================================

const GREETINGS: Greeting[] = [
  { text: "hello", lang: "en" },
  { text: "নমস্কার", lang: "bn" },
  { text: "नमस्ते", lang: "hi" },
  { text: "bonjour", lang: "fr" },
  { text: "hola", lang: "es" },
  { text: "ciao", lang: "it" },
  { text: "hallo", lang: "de" },
  { text: "olá", lang: "pt" },
  { text: "こんにちは", lang: "ja" },
  { text: "안녕하세요", lang: "ko" },
  { text: "你好", lang: "zh" },
  { text: "привет", lang: "ru" },
  { text: "مرحبا", lang: "ar" },
  { text: "γεια", lang: "el" },

  /*
   * The final greeting is held on screen
   * before the desktop is revealed.
   */
  { text: "hello", lang: "en" },
];

// =======================================================
// TIMINGS
// =======================================================

const POWER_DURATION = 1150;

const GREETING_INTERVAL = 155;

const FINAL_HOLD = 900;

const EXIT_DURATION = 700;

const SESSION_KEY = "portfolio-boot-complete";

/*
 * Fired from Settings to play the boot
 * sequence again without a reload.
 */
export const REPLAY_BOOT_EVENT =
  "portfolio-replay-boot";

// =======================================================
// SESSION HELPERS
// =======================================================

function hasBootedThisSession() {
  try {
    return (
      sessionStorage.getItem(SESSION_KEY) === "1"
    );
  } catch {
    return false;
  }
}

function rememberBoot() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* Private mode / storage disabled */
  }
}

function forgetBoot() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* Private mode / storage disabled */
  }
}

interface BootScreenProps {
  onFinish?: () => void;
}

export default function BootScreen({
  onFinish,
}: BootScreenProps) {
  const { animations } = usePortfolioSettings();

  const [phase, setPhase] =
    useState<BootPhase>("power");

  const [greetingIndex, setGreetingIndex] =
    useState(0);

  const [progress, setProgress] = useState(0);

  /*
   * Bumped by a replay request, which restarts
   * the boot sequence effect below.
   */
  const [runId, setRunId] = useState(0);

  const isFinished = useRef(false);

  const isExiting = useRef(false);

  // =====================================================
  // FINISH
  // =====================================================

  const finishNow = useCallback(() => {
    if (isFinished.current) {
      return;
    }

    isFinished.current = true;

    rememberBoot();

    setPhase("done");

    onFinish?.();
  }, [onFinish]);

  // =====================================================
  // START EXIT ANIMATION
  // =====================================================

  const startExit = useCallback(() => {
    if (
      isFinished.current ||
      isExiting.current
    ) {
      return;
    }

    isExiting.current = true;

    setPhase("exit");

    window.setTimeout(
      finishNow,
      EXIT_DURATION,
    );
  }, [finishNow]);

  // =====================================================
  // BOOT SEQUENCE
  // =====================================================

  useEffect(() => {
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    /*
     * macOS only shows the boot screen once
     * per session — and never when the visitor
     * asked for reduced motion.
     */

    if (
      hasBootedThisSession() ||
      prefersReducedMotion
    ) {
      finishNow();
      return;
    }

    const progressTimer = window.setTimeout(
      () => setProgress(100),
      80,
    );

    const greetingTimer = window.setTimeout(
      () =>
        setPhase((current) =>
          current === "power"
            ? "greeting"
            : current,
        ),
      POWER_DURATION,
    );

    return () => {
      window.clearTimeout(progressTimer);
      window.clearTimeout(greetingTimer);
    };
  }, [finishNow, runId]);

  // =====================================================
  // REPLAY (from Settings)
  // =====================================================

  useEffect(() => {
    const replay = () => {
      forgetBoot();

      isFinished.current = false;
      isExiting.current = false;

      setGreetingIndex(0);
      setProgress(0);
      setPhase("power");

      setRunId((current) => current + 1);
    };

    window.addEventListener(
      REPLAY_BOOT_EVENT,
      replay,
    );

    return () =>
      window.removeEventListener(
        REPLAY_BOOT_EVENT,
        replay,
      );
  }, []);

  // =====================================================
  // GREETING SEQUENCE
  // =====================================================

  useEffect(() => {
    if (phase !== "greeting") {
      return;
    }

    const isFinalGreeting =
      greetingIndex >= GREETINGS.length - 1;

    const timer = window.setTimeout(
      () => {
        if (isFinalGreeting) {
          startExit();
          return;
        }

        setGreetingIndex(
          (current) => current + 1,
        );
      },
      isFinalGreeting
        ? FINAL_HOLD
        : GREETING_INTERVAL,
    );

    return () => window.clearTimeout(timer);
  }, [phase, greetingIndex, startExit]);

  // =====================================================
  // SKIP
  // =====================================================

  useEffect(() => {
    if (
      phase === "exit" ||
      phase === "done"
    ) {
      return;
    }

    const skip = () => startExit();

    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      window.removeEventListener(
        "keydown",
        skip,
      );

      window.removeEventListener(
        "pointerdown",
        skip,
      );
    };
  }, [phase, startExit]);

  // =====================================================
  // ANIMATIONS DISABLED IN SETTINGS
  // =====================================================

  useEffect(() => {
    if (!animations) {
      finishNow();
    }
  }, [animations, finishNow]);

  // =====================================================
  // RENDER
  // =====================================================

  if (phase === "done") {
    return null;
  }

  const greeting = GREETINGS[greetingIndex];

  const isFinalGreeting =
    greetingIndex === GREETINGS.length - 1;

  return (
    <div
      role="presentation"
      className={`
        boot-screen
        ${phase === "exit" ? "boot-screen-exit" : ""}
      `}
    >
      {/* =================================================
          POWER ON
          ================================================= */}

      {phase === "power" ? (
        <div className="boot-power">
          <Apple
            size={62}
            strokeWidth={1.1}
            className="boot-logo"
            aria-hidden="true"
          />

          <div
            className="boot-progress"
            role="progressbar"
            aria-label="Starting up"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="boot-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      ) : (
        /* =============================================
           MULTILINGUAL HELLO
           ============================================= */

        <p className="boot-greeting">
          <span
            key={greetingIndex}
            lang={greeting.lang}
            className={`
              boot-word
              ${isFinalGreeting ? "boot-word-final" : ""}
            `}
          >
            {greeting.text}
          </span>
        </p>
      )}

      {/* =================================================
          SKIP HINT
          ================================================= */}

      {phase !== "exit" && (
        <p className="boot-skip">
          click anywhere to skip
        </p>
      )}
    </div>
  );
}
