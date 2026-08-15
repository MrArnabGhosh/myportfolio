"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CalendarPopover() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [currentMonth, setCurrentMonth] = useState<Date | null>(
    null,
  );

  const calendarRef = useRef<HTMLDivElement>(null);

  // =====================================================
  // MOUNT
  // =====================================================

  useEffect(() => {
    const today = new Date();

    setCurrentMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ),
    );

    setMounted(true);
  }, []);

  // =====================================================
  // CLOSE WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [isOpen]);

  // =====================================================
  // TODAY
  // =====================================================

  const today = useMemo(() => {
    if (!mounted) {
      return null;
    }

    return new Date();
  }, [mounted]);

  // =====================================================
  // CALENDAR DAYS
  // =====================================================

  const calendarDays = useMemo(() => {
    if (!currentMonth) {
      return [];
    }

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(
      year,
      month,
      1,
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0,
    ).getDate();

    const previousMonthDays = new Date(
      year,
      month,
      0,
    ).getDate();

    const days: {
      date: number;
      monthOffset: number;
    }[] = [];

    // Previous month

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: previousMonthDays - i,
        monthOffset: -1,
      });
    }

    // Current month

    for (
      let date = 1;
      date <= daysInMonth;
      date++
    ) {
      days.push({
        date,
        monthOffset: 0,
      });
    }

    // Next month

    let nextDate = 1;

    while (days.length < 42) {
      days.push({
        date: nextDate,
        monthOffset: 1,
      });

      nextDate++;
    }

    return days;
  }, [currentMonth]);

  // =====================================================
  // MONTH NAME
  // =====================================================

  const monthName = currentMonth
    ? currentMonth.toLocaleDateString(
        "en-US",
        {
          month: "long",
          year: "numeric",
        },
      )
    : "";

  // =====================================================
  // CHANGE MONTH
  // =====================================================

  const changeMonth = (amount: number) => {
    if (!currentMonth) {
      return;
    }

    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + amount,
        1,
      ),
    );
  };

  // =====================================================
  // GO TO TODAY
  // =====================================================

  const goToToday = () => {
    const now = new Date();

    setCurrentMonth(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
      ),
    );
  };

  // =====================================================
  // CHECK TODAY
  // =====================================================

  const isToday = (
    date: number,
    monthOffset: number,
  ) => {
    if (!today || !currentMonth) {
      return false;
    }

    const dateToCheck = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthOffset,
      date,
    );

    return (
      dateToCheck.getFullYear() ===
        today.getFullYear() &&
      dateToCheck.getMonth() ===
        today.getMonth() &&
      dateToCheck.getDate() ===
        today.getDate()
    );
  };

  // =====================================================
  // BEFORE MOUNT
  // =====================================================

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={calendarRef}
      className="relative"
    >
      {/* =================================================
          DATE BUTTON
          ================================================= */}

      <button
        type="button"
        onClick={() =>
          setIsOpen((value) => !value)
        }
        className="
          rounded-md
          px-2
          py-1
          text-sm
          text-white
          transition
          hover:bg-white/10
        "
        aria-label="Open calendar"
        aria-expanded={isOpen}
      >
        {today?.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
            month: "short",
            day: "numeric",
          },
        )}
      </button>

      {/* =================================================
          CALENDAR POPOVER
          ================================================= */}

      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+10px)]
            z-[1000]
            w-[330px]
            overflow-hidden
            rounded-2xl
            border
            border-white/15
            bg-[#1c1c1e]/95
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
          "
        >
          {/* =============================================
              HEADER
              ============================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-5
              py-4
            "
          >
            <div>
              <p className="text-sm font-semibold text-white">
                {monthName}
              </p>

              <p className="mt-0.5 text-[11px] text-white/35">
                Calendar
              </p>
            </div>

            <div className="flex items-center gap-1">

              <button
                type="button"
                onClick={() =>
                  changeMonth(-1)
                }
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  text-white/50
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={() =>
                  changeMonth(1)
                }
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  text-white/50
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
                aria-label="Next month"
              >
                <ChevronRight size={16} />
              </button>

            </div>
          </div>

          {/* =============================================
              CALENDAR
              ============================================= */}

          <div className="px-5 py-4">

            {/* Weekdays */}

            <div className="grid grid-cols-7">

              {[
                "S",
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
              ].map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="
                    flex
                    h-8
                    items-center
                    justify-center
                    text-[11px]
                    font-medium
                    text-white/30
                  "
                >
                  {day}
                </div>
              ))}

            </div>

            {/* Days */}

            <div className="grid grid-cols-7 gap-y-1">

              {calendarDays.map(
                (day, index) => {
                  const selected = isToday(
                    day.date,
                    day.monthOffset,
                  );

                  return (
                    <button
                      key={`${day.date}-${day.monthOffset}-${index}`}
                      type="button"
                      className={`
                        flex
                        h-9
                        items-center
                        justify-center
                        rounded-full
                        text-xs
                        transition
                        ${
                          selected
                            ? "bg-[#0a84ff] font-semibold text-white shadow-[0_0_12px_rgba(10,132,255,0.35)]"
                            : day.monthOffset !== 0
                              ? "text-white/20 hover:bg-white/5"
                              : "text-white/75 hover:bg-white/10"
                        }
                      `}
                    >
                      {day.date}
                    </button>
                  );
                },
              )}

            </div>
          </div>

          {/* =============================================
              FOOTER
              ============================================= */}

          <div
            className="
              border-t
              border-white/10
              px-5
              py-3
            "
          >
            <button
              type="button"
              onClick={goToToday}
              className="
                text-xs
                font-medium
                text-[#0a84ff]
                transition
                hover:text-[#409cff]
              "
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}