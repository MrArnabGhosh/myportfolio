"use client";

import { useEffect, useRef, useState } from "react";

interface TerminalLine {
  type: "command" | "output" | "error";
  text: string;
}

const skills = [
  "Java",
  "Python",
  "C/C++",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "Django",
  "MongoDB",
  "SQL",
  "AWS",
];

const projects = [
  "CloudKeep",
  "AI Resume Builder",
  "AI Blog App",
  "Secure Voting System",
];

export default function TerminalApp() {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      type: "output",
      text: "Last login: portfolio",
    },
    {
      type: "output",
      text: "Welcome to Arnab's portfolio terminal.",
    },
    {
      type: "output",
      text: 'Type "help" to see available commands.',
    },
  ]);

  const [command, setCommand] = useState("");

  const inputRef =
    useRef<HTMLInputElement>(null);

  // =====================================================
  // FOCUS TERMINAL
  // =====================================================

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // =====================================================
  // RUN COMMAND
  // =====================================================

  const runCommand = (value: string) => {
    const trimmedCommand =
      value.trim().toLowerCase();

    if (!trimmedCommand) {
      return;
    }

    // ---------------------------------------------------
    // CLEAR
    // ---------------------------------------------------

    if (trimmedCommand === "clear") {
      setHistory([]);
      setCommand("");

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);

      return;
    }

    const newHistory: TerminalLine[] = [
      ...history,
      {
        type: "command",
        text: value,
      },
    ];

    // ---------------------------------------------------
    // HELP
    // ---------------------------------------------------

    if (trimmedCommand === "help") {
      newHistory.push({
        type: "output",
        text: [
          "Available commands:",
          "",
          "  whoami       About Arnab",
          "  skills       Technical skills",
          "  projects     View projects",
          "  experience   Work experience",
          "  education    Education",
          "  contact      Contact information",
          "  github       GitHub profile",
          "  clear        Clear terminal",
          "  help         Show this help",
        ].join("\n"),
      });
    }

    // ---------------------------------------------------
    // WHOAMI
    // ---------------------------------------------------

    else if (trimmedCommand === "whoami") {
      newHistory.push({
        type: "output",
        text: [
          "Arnab Ghosh",
          "Software Engineer",
          "Kolkata, India",
        ].join("\n"),
      });
    }

    // ---------------------------------------------------
    // SKILLS
    // ---------------------------------------------------

    else if (trimmedCommand === "skills") {
      newHistory.push({
        type: "output",
        text: [
          "Technical Skills:",
          "",
          ...skills.map(
            (skill) => `  ${skill}`,
          ),
        ].join("\n"),
      });
    }

    // ---------------------------------------------------
    // PROJECTS
    // ---------------------------------------------------

    else if (trimmedCommand === "projects") {
      newHistory.push({
        type: "output",
        text: [
          "Projects:",
          "",
          ...projects.map(
            (project) => `  ${project}`,
          ),
        ].join("\n"),
      });
    }

    // ---------------------------------------------------
    // EXPERIENCE
    // ---------------------------------------------------

    else if (
      trimmedCommand === "experience"
    ) {
      newHistory.push({
        type: "output",
        text: [
          "Experience:",
          "",
          "  Cloud Computing Intern",
          "  Euphoria GenX",
          "  Jan 2026 – May 2026",
          "",
          "  Backend Development Intern",
          "  AI Labs",
          "  Jun 2024 – Aug 2024",
        ].join("\n"),
      });
    }

    // ---------------------------------------------------
    // EDUCATION
    // ---------------------------------------------------

    else if (
      trimmedCommand === "education"
    ) {
      newHistory.push({
        type: "output",
        text: [
          "Education:",
          "",
          "  B.Tech in Computer Science Engineering",
          "  Specialization: Cyber Security",
          "  The Neotia University",
          "  June 2026",
        ].join("\n"),
      });
    }

    // ---------------------------------------------------
    // CONTACT
    // ---------------------------------------------------

    else if (
      trimmedCommand === "contact"
    ) {
      newHistory.push({
        type: "output",
        text: [
          "Contact:",
          "",
          "  Email: ghosharnab460@gmail.com",
          "  Location: Kolkata, India",
          "  LinkedIn: linkedin.com/in/arnab404",
          "  GitHub: github.com/MrArnabGhosh",
        ].join("\n"),
      });
    }

    // ---------------------------------------------------
    // GITHUB
    // ---------------------------------------------------

    else if (
      trimmedCommand === "github"
    ) {
      newHistory.push({
        type: "output",
        text: "Opening GitHub...",
      });

      window.open(
        "https://github.com/MrArnabGhosh",
        "_blank",
        "noopener,noreferrer",
      );
    }

    // ---------------------------------------------------
    // UNKNOWN COMMAND
    // ---------------------------------------------------

    else {
      newHistory.push({
        type: "error",
        text: `command not found: ${value}`,
      });
    }

    setHistory(newHistory);
    setCommand("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // =====================================================
  // KEYBOARD
  // =====================================================

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      runCommand(command);
    }
  };

  // =====================================================
  // CLICK
  // =====================================================

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div
      onClick={focusTerminal}
      className="
        flex
        h-full
        min-h-full
        flex-col
        overflow-hidden
        bg-[#111111]
        font-mono
        text-sm
        text-white
      "
    >
      {/* =================================================
          TERMINAL CONTENT
          ================================================= */}

      <div
        className="
          flex-1
          overflow-auto
          p-5
          leading-6
        "
      >
        {history.map((line, index) => (
          <div
            key={`${index}-${line.type}`}
            className="whitespace-pre-wrap"
          >
            {line.type === "command" ? (
              <div>
                <span className="text-[#65d36e]">
                  arnab@portfolio
                </span>

                <span className="text-white">
                  {" ~ % "}
                </span>

                <span className="text-white">
                  {line.text}
                </span>
              </div>
            ) : line.type === "error" ? (
              <div className="text-[#ff6b6b]">
                {line.text}
              </div>
            ) : (
              <div className="text-white/75">
                {line.text}
              </div>
            )}
          </div>
        ))}

        {/* =================================================
            ACTIVE COMMAND
            ================================================= */}

        <div className="flex items-center">
          <span className="shrink-0 text-[#65d36e]">
            arnab@portfolio
          </span>

          <span className="shrink-0 text-white">
            {" ~ % "}
          </span>

          <input
            ref={inputRef}
            value={command}
            onChange={(event) =>
              setCommand(event.target.value)
            }
            onKeyDown={handleKeyDown}
            className="
              min-w-0
              flex-1
              border-none
              bg-transparent
              p-0
              font-mono
              text-sm
              text-white
              outline-none
              caret-white
            "
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command"
          />
        </div>
      </div>
    </div>
  );
}