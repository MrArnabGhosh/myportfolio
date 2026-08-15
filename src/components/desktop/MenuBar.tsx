"use client";

import { useEffect, useState } from "react";
import {
  Apple,
  BatteryFull,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Wifi,
} from "lucide-react";

const DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(date: Date) {
  const day = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const dateNumber = date.getDate();

  return `${day}, ${month} ${dateNumber}`;
}

function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  const formattedMinutes = minutes
    .toString()
    .padStart(2, "0");

  return `${hours}:${formattedMinutes} ${period}`;
}

export default function MenuBar() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Only start reading the browser clock after hydration.
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /*
   * Important:
   * During SSR and the first client render we use the same
   * static values. This prevents hydration mismatch.
   */
  const displayDate = time
    ? formatDate(time)
    : "Fri, Aug 14";

  const displayTime = time
    ? formatTime(time)
    : "--:-- --";

  return (
    <header className="mac-menubar">
      {/* ================================
          Left Side
      ================================= */}

      <div className="mac-menubar-left">
        {/* Apple */}
        <button
          className="apple-button"
          aria-label="Apple menu"
        >
          <Apple
            size={17}
            strokeWidth={2}
            fill="currentColor"
          />
        </button>

        {/* App Name */}
        <span className="active-app">
          Arnab
        </span>

        {/* Menu Items */}
        <button className="menu-item">
          File
        </button>

        <button className="menu-item">
          Edit
        </button>

        <button className="menu-item">
          View
        </button>

        <button className="menu-item">
          Window
        </button>

        <button className="menu-item">
          Help
        </button>
      </div>

      {/* ================================
          Right Side
      ================================= */}

      <div className="mac-menubar-right">
        {/* Wi-Fi */}
        <Wifi
          size={16}
          strokeWidth={2.2}
        />

        {/* Battery */}
        <BatteryFull
          size={18}
          strokeWidth={2}
        />

        {/* Search */}
        <Search
          size={16}
          strokeWidth={2}
        />

        {/* Control Center */}
        <SlidersHorizontal
          size={17}
          strokeWidth={2}
        />

        {/* Date */}
        <span className="date">
          {displayDate}
        </span>

        {/* Time */}
        <span className="time">
          {displayTime}
        </span>

        {/* Dropdown */}
        <ChevronDown
          size={13}
          strokeWidth={2}
        />
      </div>
    </header>
  );
}