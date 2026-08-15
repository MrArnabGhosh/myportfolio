"use client";

import { useEffect, useState } from "react";

export default function WelcomeHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-[20]
        w-full
        -translate-x-1/2
        -translate-y-1/2
        px-6
        text-center
        transition-all
        duration-[1400ms]
        ease-out
        ${
          visible
            ? "opacity-100"
            : "translate-y-5 opacity-0"
        }
      `}
    >
      <p
        className="
          font-['Patrick_Hand']
          text-3xl
          tracking-wide
          text-white
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]
          sm:text-3xl
          md:text-4xl
        "
      >
        Hey, I am Arnab! Welcome to my
      </p>

      <h1
        className="
          mt-2
          font-['Permanent_Marker']
          text-6xl
          uppercase
          leading-none
          tracking-wide
          text-white
          drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
        "
      >
        PORTFOLIO
      </h1>
    </div>
  );
}