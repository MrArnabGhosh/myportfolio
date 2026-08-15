"use client";

import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Folder,
  Search,
  Plus,
  Pin,
} from "lucide-react";

import { useState } from "react";

interface Note {
  id: string;
  title: string;
  preview: string;
  content: string;
  category: string;
  pinned?: boolean;
}

const notes: Note[] = [
  {
    id: "about",
    title: "About Arnab",
    preview:
      "Software Engineer focused on building useful products.",
    category: "Personal",
    pinned: true,
    content: `I'm Arnab Ghosh, a Software Engineer based in Kolkata, India.

I enjoy building software, exploring new technologies, solving engineering problems, and turning ideas into useful products.

My main interests include full-stack development, backend engineering, cloud computing, cybersecurity, machine learning, and data analytics.`,
  },

  {
    id: "philosophy",
    title: "Developer Philosophy",
    preview:
      "Learn → Build → Solve → Improve",
    category: "Ideas",
    pinned: true,
    content: `My approach to software development is simple:

Learn
Understand the technology and the problem first.

Build
Turn the idea into something functional.

Solve
Find practical solutions to technical challenges.

Improve
Keep refining the product, code, performance, and user experience.

I believe good software is not only about writing code. It is about understanding problems and creating simple, reliable solutions.`,
  },

  {
    id: "currently-building",
    title: "Currently Building",
    preview:
      "A macOS-inspired interactive developer portfolio.",
    category: "Projects",
    content: `Currently building an interactive macOS-inspired portfolio.

The goal is to make the portfolio feel less like a traditional website and more like an actual desktop environment.

Features include:

• macOS-style desktop
• Finder
• Safari
• Terminal
• Mail
• Resume
• Projects
• Education
• Experience
• Skills
• AI Assistant

The project is being developed step-by-step with a strong focus on UI, interactions, and usability.`,
  },

  {
    id: "tech-stack",
    title: "My Tech Stack",
    preview:
      "JavaScript, TypeScript, React, Next.js, Node.js and more.",
    category: "Development",
    content: `Languages

Java
Python
C / C++
JavaScript
TypeScript

Frontend

React.js
Next.js
HTML5
CSS3
Tailwind CSS

Backend

Node.js
Express.js
Django
REST APIs
JWT Authentication

Databases

MongoDB
PostgreSQL
SQL
Mongoose

Cloud & Tools

AWS
EC2
S3
IAM
Git
GitHub
Linux
Postman
VS Code`,
  },

  {
    id: "goals",
    title: "Career Goals",
    preview:
      "Build scalable software and grow as an engineer.",
    category: "Goals",
    content: `My current goal is to grow as a Software Engineer by working on real-world engineering problems.

Areas I want to continue developing:

• Backend engineering
• Full-stack development
• Cloud infrastructure
• System design
• Distributed systems
• Cybersecurity
• AI-powered applications

I want to work with strong engineering teams, learn from experienced developers, and contribute to products that solve meaningful problems.`,
  },

  {
    id: "quick-facts",
    title: "Quick Facts",
    preview:
      "A few things about me outside of code.",
    category: "Personal",
    content: `Name
Arnab Ghosh

Location
Kolkata, India

Role
Software Engineer

Interests
Software Engineering
Full-Stack Development
Cloud Computing
Cybersecurity
Machine Learning
Photography

Favorite mindset

Keep learning.
Keep building.
Keep improving.`,
  },
];

export default function NotesApp() {
  const [selectedNote, setSelectedNote] =
    useState<string>("about");

  const [search, setSearch] = useState("");

  const selected =
    notes.find(
      (note) => note.id === selectedNote,
    ) ?? notes[0];

  const filteredNotes = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.preview
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div
      className="
        flex
        h-full
        min-h-full
        overflow-hidden
        bg-[#f5f5f7]
        text-black
      "
    >
      {/* =================================================
          SIDEBAR
          ================================================= */}

      <aside
        className="
          flex
          w-56
          shrink-0
          flex-col
          border-r
          border-black/10
          bg-[#eeeeef]
        "
      >
        {/* Header */}

        <div
          className="
            flex
            h-12
            items-center
            justify-between
            border-b
            border-black/10
            px-4
          "
        >
          <div className="flex items-center gap-2">
            <FileText
              size={17}
              className="text-yellow-600"
            />

            <span className="text-sm font-semibold">
              Notes
            </span>
          </div>

          <button
            type="button"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              transition
              hover:bg-black/5
            "
            aria-label="New note"
          >
            <Plus size={17} />
          </button>
        </div>

        {/* Search */}

        <div className="px-3 py-3">
          <div
            className="
              flex
              h-8
              items-center
              rounded-lg
              bg-black/5
              px-2
            "
          >
            <Search
              size={14}
              className="text-black/35"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search"
              className="
                min-w-0
                flex-1
                bg-transparent
                px-2
                text-xs
                outline-none
                placeholder:text-black/30
              "
            />
          </div>
        </div>

        {/* Notes */}

        <div className="flex-1 overflow-auto px-2">
          {filteredNotes.map((note) => {
            const isSelected =
              note.id === selected.id;

            return (
              <button
                key={note.id}
                type="button"
                onClick={() =>
                  setSelectedNote(
                    note.id,
                  )
                }
                className={`
                  mb-1
                  w-full
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  transition
                  ${
                    isSelected
                      ? "bg-white shadow-sm"
                      : "hover:bg-black/5"
                  }
                `}
              >
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {note.pinned && (
                        <Pin
                          size={11}
                          className="shrink-0 text-black/35"
                        />
                      )}

                      <p className="truncate text-sm font-semibold">
                        {note.title}
                      </p>
                    </div>

                    <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-black/40">
                      {note.preview}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}

        <div
          className="
            border-t
            border-black/10
            px-4
            py-3
            text-[11px]
            text-black/35
          "
        >
          {filteredNotes.length} notes
        </div>
      </aside>

      {/* =================================================
          NOTE CONTENT
          ================================================= */}

      <main className="flex min-w-0 flex-1 flex-col">
        {/* Toolbar */}

        <div
          className="
            flex
            h-12
            shrink-0
            items-center
            gap-2
            border-b
            border-black/10
            bg-[#f6f6f6]/95
            px-4
          "
        >
          <button
            type="button"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              hover:bg-black/5
            "
            aria-label="Back"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-black/30
            "
            aria-label="Forward"
          >
            <ChevronRight size={18} />
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Folder
              size={15}
              className="text-black/30"
            />

            <span className="text-xs text-black/40">
              {selected.category}
            </span>
          </div>
        </div>

        {/* Content */}

        <article className="flex-1 overflow-auto bg-white">
          <div className="mx-auto max-w-3xl px-8 py-10 sm:px-12">
            {/* Category */}

            <div className="flex items-center gap-2">
              <span
                className="
                  rounded-full
                  bg-yellow-500/10
                  px-3
                  py-1
                  text-[11px]
                  font-medium
                  text-yellow-700
                "
              >
                {selected.category}
              </span>

              {selected.pinned && (
                <span
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-full
                    bg-black/5
                    px-2.5
                    py-1
                    text-[11px]
                    text-black/40
                  "
                >
                  <Pin size={10} />
                  Pinned
                </span>
              )}
            </div>

            {/* Title */}

            <h1
              className="
                mt-5
                text-3xl
                font-bold
                tracking-tight
                text-black
              "
            >
              {selected.title}
            </h1>

            {/* Divider */}

            <div className="mt-7 h-px bg-black/10" />

            {/* Note */}

            <div
              className="
                mt-7
                whitespace-pre-line
                text-[15px]
                leading-7
                text-black/65
              "
            >
              {selected.content}
            </div>
          </div>
        </article>

        {/* Status */}

        <div
          className="
            flex
            h-7
            shrink-0
            items-center
            justify-center
            border-t
            border-black/10
            bg-[#f6f6f6]
            text-[11px]
            text-black/35
          "
        >
          {selected.title} • Notes
        </div>
      </main>
    </div>
  );
}