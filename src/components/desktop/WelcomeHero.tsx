"use client";

import { useEffect, useState } from "react";

export default function WelcomeHero() {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`
        pointer-events-none
        fixed
        inset-0
        z-[5]
        flex
        items-center
        justify-center
        text-center
        transition-all
        duration-1000
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }
      `}
    >
      <div className="select-none">
        <p
          className="
            text-3xl
            font-medium
            tracking-tight
            text-white
            drop-shadow-[0_3px_8px_rgba(0,0,0,0.45)]
          "
          style={{
            fontFamily:
              "'Comic Sans MS', 'Bradley Hand', 'Segoe Print', cursive",
          }}
        >
          Hey I am Arnab! Welcome to my
        </p>

        <h1
          className="
            mt-2
            text-7xl
            font-black
            uppercase
            tracking-wide
            text-white
            drop-shadow-[0_5px_12px_rgba(0,0,0,0.55)]
          "
          style={{
            fontFamily:
              "'Comic Sans MS', 'Bradley Hand', 'Segoe Print', cursive",
          }}
        >
          PORTFOLIO
        </h1>
      </div>
    </section>
  );
}