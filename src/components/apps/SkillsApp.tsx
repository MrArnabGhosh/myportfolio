"use client";

import {
  Code2,
  Database,
  Cloud,
  Server,
  Monitor,
  Terminal,
  GitBranch,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const skillCategories = [
  {
    title: "Programming & Core CS",
    icon: Code2,
    skills: [
      "Java",
      "Python",
      "C/C++",
      "JavaScript",
      "TypeScript",
      "OOPS",
      "DSA",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
    ],
  },
  {
    title: "Software Development",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "Django",
      "REST APIs",
      "MVC Architecture",
      "JWT Authentication",
      "Agile / Collaborative Workflows",
    ],
  },
  {
    title: "Frontend",
    icon: Monitor,
    skills: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      "MongoDB",
      "PostgreSQL",
      "SQL",
      "Mongoose",
      "Prisma ORM",
    ],
  },
  {
    title: "Cloud & Tools",
    icon: Cloud,
    skills: [
      "AWS",
      "EC2",
      "S3",
      "IAM",
      "Git",
      "GitHub",
      "Postman",
      "Linux",
      "VS Code",
    ],
  },
];

export default function SkillsApp() {
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
          <Code2
            size={18}
            className="text-blue-400"
          />

          <span className="text-sm font-semibold">
            Skills
          </span>
        </div>

        <span className="text-xs text-white/30">
          Technical Skills
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
                Skills
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight">
              Technical Skills
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
              Technologies, programming languages and
              software engineering tools I work with.
            </p>

          </div>

          {/* =================================================
              SKILL CATEGORIES
          ================================================= */}

          <div className="space-y-4">

            {skillCategories.map((category) => {
              const Icon = category.icon;

              return (
                <section
                  key={category.title}
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    transition
                    hover:border-white/[0.14]
                    hover:bg-white/[0.045]
                  "
                >

                  {/* =========================================
                      CATEGORY HEADER
                  ========================================= */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      border-b
                      border-white/[0.07]
                      px-5
                      py-4
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-400/[0.08]
                      "
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.7}
                        className="text-blue-300"
                      />
                    </div>

                    <div className="min-w-0">

                      <h2 className="text-sm font-semibold text-white/80">
                        {category.title}
                      </h2>

                      <p className="mt-0.5 text-[10px] text-white/25">
                        {category.skills.length} skills
                      </p>

                    </div>

                  </div>

                  {/* =========================================
                      SKILLS
                  ========================================= */}

                  <div className="p-5">

                    <div className="flex flex-wrap gap-2">

                      {category.skills.map(
                        (skill) => (
                          <div
                            key={skill}
                            className="
                              group
                              flex
                              items-center
                              gap-2
                              rounded-lg
                              border
                              border-white/[0.07]
                              bg-white/[0.025]
                              px-3
                              py-2
                              text-xs
                              text-white/55
                              transition
                              hover:border-blue-400/20
                              hover:bg-blue-400/[0.06]
                              hover:text-white/85
                            "
                          >

                            <span
                              className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-blue-400/50
                                transition
                                group-hover:bg-blue-300
                              "
                            />

                            <span>
                              {skill}
                            </span>

                          </div>
                        ),
                      )}

                    </div>

                  </div>

                </section>
              );
            })}

          </div>

          {/* =================================================
              CORE CS
          ================================================= */}

          <section
            className="
              mt-8
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
                <Terminal
                  size={17}
                  className="text-blue-300"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white/80">
                  Core Engineering
                </p>

                <p className="mt-0.5 text-[10px] text-white/25">
                  Fundamental software development knowledge
                </p>
              </div>

            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

              {[
                "Object-Oriented Programming",
                "Data Structures & Algorithms",
                "Database Management",
                "Operating Systems",
                "Computer Networks",
                "REST API Development",
                "MVC Architecture",
                "Agile Workflows",
              ].map((skill) => (
                <div
                  key={skill}
                  className="
                    rounded-lg
                    border
                    border-white/[0.06]
                    bg-white/[0.025]
                    px-3
                    py-2.5
                    text-xs
                    text-white/45
                  "
                >
                  {skill}
                </div>
              ))}

            </div>

          </section>

          {/* =================================================
              DEVELOPMENT TOOLKIT
          ================================================= */}

          <section className="mt-8">

            <div className="mb-4 flex items-center gap-2">

              <GitBranch
                size={16}
                className="text-blue-400"
              />

              <div>
                <h2 className="text-sm font-semibold text-white/80">
                  Development Toolkit
                </h2>

                <p className="text-[10px] text-white/25">
                  Tools used during development
                </p>
              </div>

            </div>

            <div className="flex flex-wrap gap-2">

              {[
                "Git",
                "GitHub",
                "Postman",
                "Linux",
                "VS Code",
              ].map((tool) => (
                <span
                  key={tool}
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
                  {tool}
                </span>
              ))}

            </div>

          </section>

          {/* =================================================
              SECURITY / CLOUD
          ================================================= */}

          <section
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-2
            "
          >

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

                <ShieldCheck
                  size={18}
                  className="text-blue-300"
                />

                <h3 className="text-sm font-semibold text-white/80">
                  Security
                </h3>

              </div>

              <p className="mt-3 text-xs leading-6 text-white/40">
                JWT Authentication, role-based access control
                and secure application development.
              </p>

            </div>

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

                <Cloud
                  size={18}
                  className="text-blue-300"
                />

                <h3 className="text-sm font-semibold text-white/80">
                  Cloud
                </h3>

              </div>

              <p className="mt-3 text-xs leading-6 text-white/40">
                AWS services including EC2, S3 and IAM for
                deploying and managing cloud applications.
              </p>

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
          Skills
        </span>

        <span className="text-[11px] text-white/25">
          {skillCategories.reduce(
            (total, category) =>
              total + category.skills.length,
            0,
          )}{" "}
          technologies
        </span>
      </div>

    </div>
  );
}