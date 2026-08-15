"use client";

import {
  GraduationCap,
  School,
  BookOpen,
  CalendarDays,
  MapPin,
  Award,
  ChevronRight,
} from "lucide-react";

const education = [
  {
    year: "2026",
    level: "Bachelor's Degree",
    title: "B.Tech in Computer Science Engineering",
    institution: "The Neotia University",
    board: "Specialization: Cyber Security",
    result: "8.45 CGPA",
    passout: "June 2026",
    icon: GraduationCap,
  },
  {
    year: "2022",
    level: "Higher Secondary Education",
    title: "Class 12 — Science",
    institution: "Sultanpur Tulsi Das Vidya Mandir",
    board:
      "West Bengal Council of Higher Secondary Education (WBCHSE)",
    result: "75%",
    icon: BookOpen,
  },
  {
    year: "2020",
    level: "Secondary Education",
    title: "Class 10",
    institution: "Sultanpur Tulsi Das Vidya Mandir",
    board:
      "West Bengal Board of Secondary Education (WBBSE)",
    result: "79%",
    icon: School,
  },
];

export default function EducationApp() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#0d0d0f] text-white">

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div
        className="
          flex
          h-[54px]
          shrink-0
          items-center
          justify-between
          border-b
          border-white/[0.08]
          bg-[#18181a]/95
          px-5
        "
      >
        <div className="flex items-center gap-2">
          <GraduationCap
            size={18}
            className="text-blue-400"
          />

          <span className="text-sm font-semibold">
            Education
          </span>
        </div>

        <span className="text-xs text-white/30">
          Academic Journey
        </span>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="min-h-0 flex-1 overflow-auto">

        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8">

            <div className="flex items-center gap-2 text-xs text-white/30">
              <span>Portfolio</span>

              <ChevronRight size={13} />

              <span className="text-white/55">
                Education
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Education
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
              My academic journey from secondary education
              to computer science and cyber security.
            </p>

          </div>

          {/* =================================================
              TIMELINE
          ================================================= */}

          <div className="relative">

            {/* Timeline line */}

            <div
              className="
                absolute
                bottom-8
                left-[25px]
                top-8
                w-px
                bg-white/[0.09]
              "
            />

            <div className="space-y-6">

              {education.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.year}
                    className="
                      relative
                      flex
                      gap-5
                    "
                  >

                    {/* =================================================
                        TIMELINE ICON
                    ================================================= */}

                    <div className="relative z-10 shrink-0">

                      <div
                        className="
                          flex
                          h-[50px]
                          w-[50px]
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-blue-400/10
                          bg-[#18181a]
                          shadow-[0_8px_25px_rgba(0,0,0,0.3)]
                        "
                      >
                        <Icon
                          size={21}
                          strokeWidth={1.7}
                          className="text-blue-300"
                        />
                      </div>

                    </div>

                    {/* =================================================
                        EDUCATION ITEM
                    ================================================= */}

                    <div
                      className="
                        min-w-0
                        flex-1
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        transition-all
                        duration-200
                        hover:border-white/[0.15]
                        hover:bg-white/[0.055]
                      "
                    >

                      {/* =================================================
                          CARD HEADER
                      ================================================= */}

                      <div
                        className="
                          flex
                          flex-col
                          gap-4
                          border-b
                          border-white/[0.07]
                          px-5
                          py-5
                          sm:flex-row
                          sm:items-start
                          sm:justify-between
                        "
                      >

                        <div className="min-w-0">

                          {/* Year */}

                          <div className="flex items-center gap-2">

                            <span
                              className="
                                rounded-md
                                bg-blue-400/10
                                px-2
                                py-1
                                text-[11px]
                                font-semibold
                                text-blue-300
                              "
                            >
                              {item.year}
                            </span>

                            <span className="text-[11px] text-white/25">
                              {item.level}
                            </span>

                          </div>

                          {/* Title */}

                          <h2
                            className="
                              mt-3
                              text-lg
                              font-semibold
                              leading-7
                              text-white
                            "
                          >
                            {item.title}
                          </h2>

                        </div>

                        {/* Result */}

                        <div
                          className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-white/[0.08]
                            bg-white/[0.04]
                            px-3
                            py-2
                          "
                        >
                          <Award
                            size={14}
                            className="text-yellow-300/70"
                          />

                          <span className="text-xs font-medium text-white/65">
                            {item.result}
                          </span>
                        </div>

                      </div>

                      {/* =================================================
                          CARD BODY
                      ================================================= */}

                      <div className="px-5 py-5">

                        {/* Institution */}

                        <div className="flex items-start gap-3">

                          <div
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-white/[0.05]
                            "
                          >
                            <MapPin
                              size={15}
                              className="text-white/45"
                            />
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-medium text-white/75">
                              {item.institution}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-white/40">
                              {item.board}
                            </p>

                          </div>

                        </div>

                        {/* Bottom metadata */}

                        <div
                          className="
                            mt-5
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >

                          {/* Passout */}

                          {item.passout && (
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                rounded-md
                                bg-white/[0.04]
                                px-2.5
                                py-1.5
                              "
                            >
                              <CalendarDays
                                size={13}
                                className="text-white/35"
                              />

                              <span className="text-[11px] text-white/45">
                                {item.passout}
                              </span>
                            </div>
                          )}

                          {/* Specialization */}

                          {item.year === "2026" && (
                            <div
                              className="
                                rounded-md
                                bg-blue-400/10
                                px-2.5
                                py-1.5
                                text-[11px]
                                text-blue-300/75
                              "
                            >
                              Cyber Security
                            </div>
                          )}

                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* =================================================
              CURRENT FOCUS
          ================================================= */}

          <section className="mt-10">

            <div className="mb-4">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/25">
                Current Focus
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Areas of Interest
              </h2>

            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
              "
            >
              {[
                "Software Engineering",
                "Full-Stack Development",
                "Cyber Security",
                "Machine Learning",
                "Data Analytics",
                "Computer Vision",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    rounded-lg
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-4
                    py-3
                    text-xs
                    text-white/50
                    transition
                    hover:border-blue-400/20
                    hover:bg-blue-400/[0.06]
                    hover:text-white/75
                  "
                >
                  {item}
                </div>
              ))}
            </div>

          </section>

        </div>
      </main>

      {/* =================================================
          STATUS BAR
      ================================================= */}

      <div
        className="
          flex
          h-[30px]
          shrink-0
          items-center
          justify-between
          border-t
          border-white/[0.08]
          bg-[#151517]/95
          px-5
        "
      >
        <span className="text-[11px] text-white/25">
          Education
        </span>

        <span className="text-[11px] text-white/25">
          {education.length} records
        </span>
      </div>

    </div>
  );
}