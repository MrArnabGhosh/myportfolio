"use client";

import {
  ChevronLeft,
  ChevronRight,
  Folder,
  Grid2X2,
  List,
  Search,
  ExternalLink,
} from "lucide-react";

import { projects } from "@/data/projects";

interface ProjectsAppProps {
  onOpenProject: (projectId: string) => void;
}

/* =========================================================
   macOS Folder Icon
========================================================= */

function ProjectFolderIcon() {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="projectFolder"
          x1="10"
          y1="10"
          x2="58"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A8DCFF" />
          <stop offset="0.45" stopColor="#62B5F4" />
          <stop offset="1" stopColor="#2879D0" />
        </linearGradient>

        <linearGradient
          id="projectFolderBody"
          x1="12"
          y1="24"
          x2="56"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#79C6FF" />
          <stop offset="0.5" stopColor="#469BE6" />
          <stop offset="1" stopColor="#236FC2" />
        </linearGradient>

        <filter
          id="projectFolderShadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="150%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3"
            floodColor="#000000"
            floodOpacity="0.35"
          />
        </filter>
      </defs>

      {/* Folder tab */}

      <path
        d="
          M8 18
          C8 14.686 10.686 12 14 12
          H28
          L33 18
          H54
          C57.314 18 60 20.686 60 24
          V28
          H8
          Z
        "
        fill="url(#projectFolder)"
        filter="url(#projectFolderShadow)"
      />

      {/* Folder body */}

      <path
        d="
          M7 25
          C7 21.686 9.686 19 13 19
          H55
          C58.314 19 61 21.686 61 25
          V50
          C61 55.523 56.523 60 51 60
          H17
          C11.477 60 7 55.523 7 50
          Z
        "
        fill="url(#projectFolderBody)"
        filter="url(#projectFolderShadow)"
      />

      {/* Folder highlight */}

      <path
        d="
          M11 26
          C11 23.791 12.791 22 15 22
          H53
          C55.209 22 57 23.791 57 26
        "
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* =========================================================
   Projects App
========================================================= */

export default function ProjectsApp({
  onOpenProject,
}: ProjectsAppProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#0d0d0f] text-white">

      {/* ===================================================
          TOOLBAR
      =================================================== */}

      <div
        className="
          flex
          h-[58px]
          shrink-0
          items-center
          gap-4
          border-b
          border-white/[0.08]
          bg-[#18181a]/95
          px-4
        "
      >

        {/* Navigation */}

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Back"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              text-white/50
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Forward"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              text-white/25
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Current folder */}

        <div className="flex items-center gap-2">
          <Folder
            size={18}
            className="text-blue-400"
            fill="currentColor"
          />

          <span className="text-sm font-semibold">
            Projects
          </span>
        </div>

        {/* Spacer */}

        <div className="flex-1" />

        {/* View controls */}

        <div
          className="
            flex
            items-center
            rounded-md
            border
            border-white/10
            bg-white/[0.04]
            p-0.5
          "
        >
          <button
            type="button"
            aria-label="Grid view"
            className="
              flex
              h-7
              w-8
              items-center
              justify-center
              rounded
              bg-white/10
              text-white
            "
          >
            <Grid2X2 size={15} />
          </button>

          <button
            type="button"
            aria-label="List view"
            className="
              flex
              h-7
              w-8
              items-center
              justify-center
              rounded
              text-white/40
              hover:text-white
            "
          >
            <List size={15} />
          </button>
        </div>

        {/* Search */}

        <div
          className="
            flex
            h-8
            w-[170px]
            items-center
            gap-2
            rounded-md
            border
            border-white/10
            bg-white/[0.06]
            px-2.5
          "
        >
          <Search
            size={14}
            className="text-white/40"
          />

          <span className="text-xs text-white/35">
            Search
          </span>
        </div>
      </div>

      {/* ===================================================
          BODY
      =================================================== */}

      <div className="flex min-h-0 flex-1">

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className="
            hidden
            w-[175px]
            shrink-0
            border-r
            border-white/[0.08]
            bg-[#151517]
            px-3
            py-4
            md:block
          "
        >

          {/* Favorites */}

          <p
            className="
              mb-2
              px-2
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-white/30
            "
          >
            Favorites
          </p>

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-2
              rounded-md
              bg-blue-500/20
              px-2
              py-1.5
              text-left
              text-sm
              text-white
            "
          >
            <Folder
              size={15}
              className="text-blue-400"
              fill="currentColor"
            />

            Projects
          </button>

          <button
            type="button"
            className="
              mt-1
              flex
              w-full
              items-center
              gap-2
              rounded-md
              px-2
              py-1.5
              text-left
              text-sm
              text-white/55
              transition
              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <Folder
              size={15}
              className="text-blue-400/60"
            />

            All Projects
          </button>

          {/* Portfolio */}

          <p
            className="
              mb-2
              mt-7
              px-2
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-white/30
            "
          >
            Portfolio
          </p>

          <div className="space-y-1">
            {[
              "Projects",
              "Education",
              "Experience",
              "Skills",
              "Resume",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-md
                  px-2
                  py-1.5
                  text-sm
                  text-white/45
                "
              >
                <Folder
                  size={14}
                  className="text-blue-400/60"
                />

                {item}
              </div>
            ))}
          </div>
        </aside>

        {/* =================================================
            PROJECT AREA
        ================================================= */}

        <main className="min-w-0 flex-1 overflow-auto">

          <div className="p-6">

            {/* Header */}

            <div className="mb-6">
              <h1 className="text-xl font-semibold tracking-tight">
                Projects
              </h1>

              <p className="mt-1 text-xs text-white/40">
                {projects.length} items
              </p>
            </div>

            {/* Project Grid */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {projects.map(
                (project) => (
                  <button
                    key={project.id}
                    type="button"
                    onDoubleClick={() =>
                      onOpenProject(
                        project.id,
                      )
                    }
                    className="
                      group
                      min-w-0
                      cursor-default
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.035]
                      p-4
                      text-left
                      transition-all
                      duration-200
                      hover:border-white/[0.16]
                      hover:bg-white/[0.065]
                      hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                    "
                  >

                    {/* Folder */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                      "
                    >
                      <div
                        className="
                          transition-transform
                          duration-200
                          group-hover:scale-105
                        "
                      >
                        <ProjectFolderIcon />
                      </div>

                      {/* External link */}

                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-md
                          text-white/30
                          opacity-0
                          transition
                          group-hover:opacity-100
                        "
                      >
                        <ExternalLink
                          size={15}
                        />
                      </span>
                    </div>

                    {/* Project Name */}

                    <h2
                      className="
                        mt-3
                        truncate
                        text-[15px]
                        font-semibold
                        text-white
                      "
                    >
                      {project.name}
                    </h2>

                    {/* Description */}

                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-xs
                        leading-5
                        text-white/45
                      "
                    >
                      {project.description}
                    </p>

                    {/* Technologies */}

                    <div
                      className="
                        mt-4
                        flex
                        flex-wrap
                        gap-1.5
                      "
                    >
                      {project.technologies
                        .slice(0, 4)
                        .map(
                          (
                            technology,
                          ) => (
                            <span
                              key={
                                technology
                              }
                              className="
                                rounded
                                bg-white/[0.07]
                                px-2
                                py-1
                                text-[10px]
                                text-white/45
                              "
                            >
                              {
                                technology
                              }
                            </span>
                          ),
                        )}
                    </div>
                  </button>
                ),
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ===================================================
          STATUS BAR
      =================================================== */}

      <div
        className="
          flex
          h-[30px]
          shrink-0
          items-center
          justify-center
          border-t
          border-white/[0.08]
          bg-[#151517]/95
        "
      >
        <span className="text-[11px] text-white/30">
          {projects.length} projects
        </span>
      </div>
    </div>
  );
}