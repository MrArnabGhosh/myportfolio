"use client";

import {
  ArrowLeft,
  Code2,
  ExternalLink,
  FolderGit2,
} from "lucide-react";

import { projects } from "@/data/projects";

interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
}

export default function ProjectDetails({
  projectId,
  onBack,
}: ProjectDetailsProps) {
  const project = projects.find(
    (item) => item.id === projectId,
  );

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center bg-[#0d0d0f] text-white">
        <div className="text-center">
          <p className="text-lg font-semibold">
            Project not found
          </p>

          <button
            type="button"
            onClick={onBack}
            className="
              mt-4
              rounded-lg
              bg-white/10
              px-4
              py-2
              text-sm
              text-white/70
              transition
              hover:bg-white/15
              hover:text-white
            "
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
          border-b
          border-white/[0.08]
          bg-[#18181a]/95
          px-4
        "
      >
        {/* Back */}

        <button
          type="button"
          onClick={onBack}
          className="
            flex
            h-8
            items-center
            gap-1.5
            rounded-md
            px-2.5
            text-sm
            text-white/55
            transition
            hover:bg-white/[0.08]
            hover:text-white
          "
        >
          <ArrowLeft size={16} />

          <span>
            Projects
          </span>
        </button>

        {/* Center title */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            -translate-x-1/2
          "
        >
          <div className="flex items-center gap-2">
            <FolderGit2
              size={15}
              className="text-blue-400"
            />

            <span className="text-sm font-medium text-white/85">
              {project.name}
            </span>
          </div>
        </div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="min-h-0 flex-1 overflow-auto">

        <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10">

          {/* =================================================
              PROJECT HEADER
          ================================================= */}

          <section
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-6
              shadow-[0_20px_50px_rgba(0,0,0,0.2)]
              sm:p-8
            "
          >
            <div className="flex flex-col gap-6 sm:flex-row">

              {/* Folder */}

              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-gradient-to-br
                  from-blue-400/20
                  to-blue-600/10
                  shadow-lg
                "
              >
                <FolderGit2
                  size={42}
                  strokeWidth={1.5}
                  className="text-blue-300"
                />
              </div>

              {/* Title */}

              <div className="min-w-0">

                <p className="text-xs font-medium uppercase tracking-wider text-blue-400/80">
                  Project
                </p>

                <h1
                  className="
                    mt-1
                    break-words
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  {project.name}
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-6
                    text-white/50
                  "
                >
                  {project.description}
                </p>

              </div>
            </div>
          </section>

          {/* =================================================
              TECHNOLOGIES
          ================================================= */}

          <section className="mt-6">

            <div className="flex items-center gap-2">
              <Code2
                size={17}
                className="text-blue-400"
              />

              <h2 className="text-sm font-semibold text-white/85">
                Technologies
              </h2>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">

              {project.technologies.map(
                (technology) => (
                  <span
                    key={technology}
                    className="
                      rounded-lg
                      border
                      border-white/[0.08]
                      bg-white/[0.045]
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white/60
                      transition
                      hover:border-blue-400/20
                      hover:bg-blue-400/10
                      hover:text-blue-200
                    "
                  >
                    {technology}
                  </span>
                ),
              )}

            </div>
          </section>

          {/* =================================================
              PROJECT INFORMATION
          ================================================= */}

          <section className="mt-8">

            <h2 className="text-sm font-semibold text-white/85">
              About this project
            </h2>

            <div
              className="
                mt-3
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-5
              "
            >
              <p className="text-sm leading-7 text-white/55">
                {project.description}
              </p>
            </div>

          </section>

          {/* =================================================
              ACTIONS
          ================================================= */}

          {(project.github ||
            project.live) && (
            <section className="mt-8">

              <h2 className="text-sm font-semibold text-white/85">
                Links
              </h2>

              <div className="mt-3 flex flex-wrap gap-3">

                {/* GitHub */}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-black
                      transition
                      hover:bg-white/90
                      hover:shadow-lg
                    "
                  >
                    <Code2
                      size={16}
                    />

                    <span>
                      View on GitHub
                    </span>
                  </a>
                )}

                {/* Live Demo */}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-white/[0.12]
                      bg-white/[0.045]
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-white/80
                      transition
                      hover:border-white/20
                      hover:bg-white/[0.08]
                      hover:text-white
                    "
                  >
                    <ExternalLink
                      size={16}
                    />

                    <span>
                      Live Demo
                    </span>
                  </a>
                )}

              </div>
            </section>
          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              mt-10
              border-t
              border-white/[0.07]
              pt-5
            "
          >
            <div className="flex items-center justify-between">

              <span className="text-[11px] text-white/25">
                Portfolio Project
              </span>

              <span className="text-[11px] text-white/25">
                {project.technologies.length} technologies
              </span>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}