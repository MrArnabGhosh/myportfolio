"use client";

import {
  Cloud,
  Server,
  CalendarDays,
  MapPin,
  Code2,
  ShieldCheck,
  Database,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const experiences = [
  {
    year: "2026",
    role: "Cloud Computing Intern",
    company: "Euphoria GenX",
    location: "Kolkata",
    duration: "Jan 2026 – May 2026",
    description:
      "Applied software engineering practices to deploy and manage secure, scalable cloud applications using AWS, following defined processes with reducing supervision.",
    technologies: ["AWS", "EC2", "S3", "IAM"],
    icon: Cloud,
  },
  {
    year: "2024",
    role: "Backend Development Intern",
    company: "AI Labs",
    location: "Kolkata",
    duration: "Jun 2024 – Aug 2024",
    description:
      "Built a secure voting system using Django and MongoDB with role-based authentication, following MVC architecture and software design principles.",
    technologies: [
      "Django",
      "MongoDB",
      "Authentication",
      "MVC",
    ],
    achievement:
      "Designed an optimized database schema, reducing query response time by 30% through analytical and methodical problem solving.",
    icon: Server,
  },
];

export default function ExperienceApp() {
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
          <Server
            size={18}
            className="text-blue-400"
          />

          <span className="text-sm font-semibold">
            Experience
          </span>
        </div>

        <span className="text-xs text-white/30">
          Professional Journey
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
                Experience
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Experience
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
              My internship experience and the practical
              engineering skills I developed along the way.
            </p>

          </div>

          {/* =================================================
              EXPERIENCE TIMELINE
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

              {experiences.map(
                (experience) => {
                  const Icon = experience.icon;

                  return (
                    <div
                      key={`${experience.company}-${experience.year}`}
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
                          EXPERIENCE CARD
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
                                {experience.year}
                              </span>

                              <span className="text-[11px] text-white/25">
                                Internship
                              </span>

                            </div>

                            {/* Role */}

                            <h2
                              className="
                                mt-3
                                text-lg
                                font-semibold
                                leading-7
                                text-white
                              "
                            >
                              {experience.role}
                            </h2>

                            {/* Company */}

                            <p className="mt-1 text-sm font-medium text-white/60">
                              {experience.company}
                            </p>

                          </div>

                          {/* Duration */}

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
                            <CalendarDays
                              size={14}
                              className="text-white/35"
                            />

                            <span className="text-xs text-white/50">
                              {experience.duration}
                            </span>
                          </div>

                        </div>

                        {/* =================================================
                            CARD BODY
                        ================================================= */}

                        <div className="px-5 py-5">

                          {/* Location */}

                          <div className="flex items-center gap-2">

                            <div
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-white/[0.05]
                              "
                            >
                              <MapPin
                                size={14}
                                className="text-white/40"
                              />
                            </div>

                            <span className="text-xs text-white/45">
                              {experience.location}
                            </span>

                          </div>

                          {/* Description */}

                          <div className="mt-5">

                            <div className="mb-2 flex items-center gap-2">

                              <Code2
                                size={15}
                                className="text-blue-400/60"
                              />

                              <span
                                className="
                                  text-[10px]
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-white/30
                                "
                              >
                                Role Overview
                              </span>

                            </div>

                            <p
                              className="
                                text-sm
                                leading-6
                                text-white/50
                              "
                            >
                              {experience.description}
                            </p>

                          </div>

                          {/* Technologies */}

                          <div className="mt-6">

                            <div className="mb-3 flex items-center gap-2">

                              <Server
                                size={15}
                                className="text-blue-400/60"
                              />

                              <span
                                className="
                                  text-[10px]
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-white/30
                                "
                              >
                                Technologies
                              </span>

                            </div>

                            <div className="flex flex-wrap gap-2">

                              {experience.technologies.map(
                                (technology) => (
                                  <span
                                    key={technology}
                                    className="
                                      rounded-md
                                      border
                                      border-white/[0.07]
                                      bg-white/[0.04]
                                      px-2.5
                                      py-1.5
                                      text-[11px]
                                      text-white/50
                                      transition
                                      hover:border-blue-400/20
                                      hover:bg-blue-400/[0.06]
                                      hover:text-blue-200
                                    "
                                  >
                                    {technology}
                                  </span>
                                ),
                              )}

                            </div>

                          </div>

                          {/* Achievement */}

                          {experience.achievement && (
                            <div
                              className="
                                mt-6
                                rounded-xl
                                border
                                border-emerald-400/[0.08]
                                bg-emerald-400/[0.025]
                                p-4
                              "
                            >

                              <div className="flex gap-3">

                                <div
                                  className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-emerald-400/[0.08]
                                  "
                                >
                                  <CheckCircle2
                                    size={15}
                                    className="text-emerald-300/70"
                                  />
                                </div>

                                <div className="min-w-0">

                                  <p
                                    className="
                                      text-[10px]
                                      font-semibold
                                      uppercase
                                      tracking-wider
                                      text-white/30
                                    "
                                  >
                                    Achievement
                                  </p>

                                  <p
                                    className="
                                      mt-2
                                      text-sm
                                      leading-6
                                      text-white/50
                                    "
                                  >
                                    {experience.achievement}
                                  </p>

                                </div>

                              </div>

                            </div>
                          )}

                        </div>

                      </div>

                    </div>
                  );
                },
              )}

            </div>
          </div>

          {/* =================================================
              CORE EXPERIENCE
          ================================================= */}

          <section className="mt-10">

            <div className="mb-4">

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-white/25
                "
              >
                What I&apos;ve Worked With
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Core Experience Areas
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
                {
                  icon: Cloud,
                  title: "Cloud Computing",
                },
                {
                  icon: Server,
                  title: "Backend Development",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Applications",
                },
                {
                  icon: Database,
                  title: "Database Design",
                },
                {
                  icon: Code2,
                  title: "Software Engineering",
                },
                {
                  icon: CheckCircle2,
                  title: "Problem Solving",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      flex
                      items-center
                      gap-3
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
                      hover:bg-blue-400/[0.05]
                      hover:text-white/75
                    "
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.7}
                      className="text-blue-300/60"
                    />

                    <span>
                      {item.title}
                    </span>
                  </div>
                );
              })}
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
          Experience
        </span>

        <span className="text-[11px] text-white/25">
          {experiences.length} positions
        </span>
      </div>

    </div>
  );
}