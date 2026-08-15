"use client";

import {
  UserRound,
  Code2,
  Cloud,
  Database,
  Trophy,
  MapPin,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack & Backend Development",
    description:
      "Built scalable web apps using Node.js, Express, Next.js, React, and Django, leveraging RESTful APIs and clean architecture.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Hands-on experience deploying secure cloud applications and managing IAM access on AWS using EC2 and S3.",
  },
  {
    icon: Database,
    title: "Database Management",
    description:
      "Skilled with PostgreSQL, MongoDB, and SQL, including designing schemas that reduced query response times by 30%.",
  },
  {
    icon: Trophy,
    title: "Problem Solving",
    description:
      "Competitive coder and 1st place winner at the Parikalpana 2025 coding competition.",
  },
];

const interests = [
  "Software Engineering",
  "Full-Stack Development",
  "Backend Development",
  "Cyber Security",
  "Cloud Computing",
  "Database Systems",
];

export default function AboutMeApp() {
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
          <UserRound
            size={18}
            className="text-blue-400"
          />

          <span className="text-sm font-semibold">
            About Me
          </span>
        </div>

        <span className="text-xs text-white/30">
          Profile
        </span>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="min-h-0 flex-1 overflow-auto">

        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10">

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="flex items-center gap-2 text-xs text-white/30">
            <span>Portfolio</span>

            <ChevronRight size={13} />

            <span className="text-white/55">
              About Me
            </span>
          </div>

          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <section className="mt-6">

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.035]
              "
            >

              {/* Background glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-blue-500/[0.08]
                  blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  left-1/3
                  h-48
                  w-48
                  rounded-full
                  bg-purple-500/[0.05]
                  blur-3xl
                "
              />

              <div className="relative p-6 sm:p-8">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                  {/* =================================================
                      PROFILE PHOTO
                  ================================================= */}

                  <div
                    className="
                      relative
                      h-28
                      w-28
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/[0.14]
                      bg-white/[0.05]
                      shadow-[0_15px_35px_rgba(0,0,0,0.4)]
                    "
                  >
                    <img
                      src="/images/arnab-profile.png"
                      alt="Arnab"
                      className="
                        h-full
                        w-full
                        object-cover
                        object-center
                      "
                    />

                    {/* Photo overlay */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-2xl
                        ring-1
                        ring-inset
                        ring-white/[0.08]
                      "
                    />
                  </div>

                  {/* =================================================
                      PROFILE INFORMATION
                  ================================================= */}

                  <div className="min-w-0">

                    <p
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-blue-400/80
                      "
                    >
                      Software Engineer
                    </p>

                    <h1
                      className="
                        mt-1
                        text-3xl
                        font-semibold
                        tracking-tight
                      "
                    >
                      About Me
                    </h1>

                    <p className="mt-2 text-sm text-white/40">
                      Building software, solving problems,
                      and continuously learning.
                    </p>

                    {/* Profile metadata */}

                    <div className="mt-4 flex flex-wrap gap-3">

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-md
                          bg-white/[0.04]
                          px-2.5
                          py-1.5
                          text-xs
                          text-white/45
                        "
                      >
                        <MapPin size={13} />

                        Kolkata, India
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-md
                          bg-white/[0.04]
                          px-2.5
                          py-1.5
                          text-xs
                          text-white/45
                        "
                      >
                        <GraduationCap size={13} />

                        B.Tech CSE
                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          rounded-md
                          bg-blue-400/[0.07]
                          px-2.5
                          py-1.5
                          text-xs
                          text-blue-300/70
                        "
                      >
                        <ShieldCheck size={13} />

                        Cyber Security
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              ABOUT
          ================================================= */}

          <section className="mt-6">

            <div
              className="
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-6
                sm:p-7
              "
            >

              <div className="flex items-center gap-2">

                <UserRound
                  size={16}
                  className="text-blue-400"
                />

                <h2 className="text-sm font-semibold text-white/80">
                  Profile
                </h2>

              </div>

              <div className="mt-5 space-y-4">

                <p className="text-sm leading-7 text-white/55">
                  I&apos;m a Software Engineer based in Kolkata,
                  India, holding a B.Tech in Computer Science
                  and Engineering with a specialization in
                  Cyber Security from The Neotia University.
                </p>

                <p className="text-sm leading-7 text-white/55">
                  My engineering background is built on a
                  strong foundation of core Computer Science
                  principles, coupled with practical
                  experience in full-stack web development,
                  backend optimization, and cloud deployments.
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              KEY HIGHLIGHTS
          ================================================= */}

          <section className="mt-8">

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
                Key Highlights & Expertise
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                What I Work With
              </h2>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.035]
                      p-5
                      transition-all
                      duration-200
                      hover:border-white/[0.15]
                      hover:bg-white/[0.05]
                    "
                  >

                    <div className="flex gap-4">

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-blue-400/[0.08]
                        "
                      >
                        <Icon
                          size={19}
                          strokeWidth={1.7}
                          className="text-blue-300"
                        />
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-sm font-semibold text-white/80">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs leading-6 text-white/45">
                          {item.description}
                        </p>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>

          </section>

          {/* =================================================
              EDUCATION
          ================================================= */}

          <section className="mt-8">

            <div
              className="
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-400/[0.08]
                  "
                >
                  <GraduationCap
                    size={18}
                    className="text-blue-300"
                  />
                </div>

                <div>

                  <p className="text-sm font-semibold text-white/80">
                    Education
                  </p>

                  <p className="mt-0.5 text-xs text-white/30">
                    The Neotia University
                  </p>

                </div>

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                <span
                  className="
                    rounded-md
                    bg-white/[0.04]
                    px-3
                    py-1.5
                    text-xs
                    text-white/50
                  "
                >
                  B.Tech in Computer Science Engineering
                </span>

                <span
                  className="
                    rounded-md
                    bg-blue-400/[0.07]
                    px-3
                    py-1.5
                    text-xs
                    text-blue-300/70
                  "
                >
                  Cyber Security
                </span>

              </div>

            </div>

          </section>

          {/* =================================================
              INTERESTS
          ================================================= */}

          <section className="mt-8">

            <div className="mb-4 flex items-center gap-2">

              <BriefcaseBusiness
                size={16}
                className="text-blue-400"
              />

              <div>

                <h2 className="text-sm font-semibold text-white/80">
                  Areas of Interest
                </h2>

                <p className="text-[10px] text-white/25">
                  Professional interests
                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-2">

              {interests.map((interest) => (
                <span
                  key={interest}
                  className="
                    rounded-lg
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-3
                    py-2
                    text-xs
                    text-white/50
                    transition
                    hover:border-blue-400/20
                    hover:bg-blue-400/[0.05]
                    hover:text-white/80
                  "
                >
                  {interest}
                </span>
              ))}

            </div>

          </section>

          {/* =================================================
              CAREER GOAL
          ================================================= */}

          <section
            className="
              mt-8
              overflow-hidden
              rounded-xl
              border
              border-blue-400/[0.10]
              bg-blue-400/[0.035]
              p-6
            "
          >

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-blue-300/60
              "
            >
              Currently Looking For
            </p>

            <h2 className="mt-2 text-lg font-semibold text-white/85">
              Software Engineering Opportunities
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">
              I&apos;m actively looking for full-time opportunities
              in software engineering, backend development,
              and cloud computing.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-blue-300/70">
              <span>Let&apos;s connect</span>

              <ChevronRight size={13} />
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
          About Me
        </span>

        <span className="text-[11px] text-white/25">
          Profile
        </span>
      </div>

    </div>
  );
}