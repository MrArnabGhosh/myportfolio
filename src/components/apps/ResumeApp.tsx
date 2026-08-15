"use client";

import { useState } from "react";

import {
  Download,
  FileText,
  Mail,
  Phone,
  Search,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const resumeFile = "/resume/Arnab_Ghosh_Resume.pdf";

export default function ResumeApp() {
  // =====================================================
  // ZOOM
  // =====================================================

  const [zoom, setZoom] = useState(100);

  const zoomIn = () => {
    setZoom((current) => Math.min(current + 10, 150));
  };

  const zoomOut = () => {
    setZoom((current) => Math.max(current - 10, 60));
  };

  const resetZoom = () => {
    setZoom(100);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#1c1c1e] text-white">

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div
        className="
          relative
          flex
          h-12
          shrink-0
          items-center
          justify-between
          border-b
          border-white/10
          bg-[#29292b]
          px-4
        "
      >

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="flex items-center gap-3">

          <FileText
            size={17}
            className="text-white/70"
          />

          <span className="text-sm font-medium">
            Arnab_Ghosh_Resume.pdf
          </span>

        </div>

        {/* =================================================
            PAGE NAVIGATION
        ================================================= */}

        <div
          className="
            absolute
            left-1/2
            flex
            -translate-x-1/2
            items-center
            gap-1
          "
        >

          <button
            type="button"
            aria-label="Previous page"
            disabled
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-white/20
              transition
            "
          >
            <ChevronLeft size={15} />
          </button>

          <span className="px-2 text-xs text-white/50">
            1 / 1
          </span>

          <button
            type="button"
            aria-label="Next page"
            disabled
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-white/20
            "
          >
            <ChevronRight size={15} />
          </button>

        </div>

        {/* =================================================
            ZOOM CONTROLS
        ================================================= */}

        <div className="flex items-center gap-1">

          {/* Zoom Out */}

          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= 60}
            aria-label="Zoom out"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-white/50
              transition
              hover:bg-white/10
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-20
            "
          >
            <ZoomOut size={15} />
          </button>

          {/* Zoom Percentage */}

          <button
            type="button"
            onClick={resetZoom}
            title="Reset zoom"
            className="
              min-w-[48px]
              rounded-md
              px-1
              py-1
              text-xs
              text-white/50
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            {zoom}%
          </button>

          {/* Zoom In */}

          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= 150}
            aria-label="Zoom in"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-white/50
              transition
              hover:bg-white/10
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-20
            "
          >
            <ZoomIn size={15} />
          </button>

          {/* Search */}

          <button
            type="button"
            aria-label="Search resume"
            className="
              ml-1
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-white/50
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <Search size={15} />
          </button>

        </div>

      </div>

      {/* =====================================================
          DOCUMENT AREA
      ===================================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-auto
          bg-[#101011]
          px-4
          py-8
          sm:px-8
        "
      >

        {/* =================================================
            ZOOM WRAPPER
        ================================================= */}

        <div
          className="
            flex
            min-w-max
            justify-center
          "
        >

          <div
            style={{
              width: `${850 * (zoom / 100)}px`,
              transition: "width 180ms ease",
            }}
          >

            {/* =================================================
                RESUME PAPER
            ================================================= */}

            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                marginBottom:
                  zoom > 100
                    ? `${1100 * (zoom / 100 - 1)}px`
                    : "0px",
              }}
              className="
                min-h-[1100px]
                w-[850px]
                bg-white
                px-8
                py-9
                text-[#18181b]
                shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                sm:px-12
                sm:py-10
              "
            >

              {/* =================================================
                  HEADER
              ================================================= */}

              <header className="border-b border-gray-300 pb-5">

                <h1
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-gray-950
                  "
                >
                  ARNAB GHOSH
                </h1>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  Software Engineer | Java, Python, JavaScript |
                  OOP · DBMS · Software Development
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-600">

                  <span>
                    Kolkata, India
                  </span>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ghosharnab460@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    ghosharnab460@gmail.com
                  </a>

                  <a
                    href="tel:+918145595626"
                    className="hover:text-blue-600"
                  >
                    +91 8145595626
                  </a>

                  <a
                    href="https://www.linkedin.com/in/arnab-ghosh404/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    linkedin.com/in/arnab404
                  </a>

                  <a
                    href="https://github.com/MrArnabGhosh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    github.com/MrArnabGhosh
                  </a>

                  <a
                    href="https://leetcode.com/Arnab404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    leetcode.com/Arnab404
                  </a>

                </div>

              </header>

              {/* =================================================
                  PROFESSIONAL SUMMARY
              ================================================= */}

              <section className="mt-5">

                <ResumeHeading>
                  PROFESSIONAL SUMMARY
                </ResumeHeading>

                <p className="mt-2 text-[10.5px] leading-[1.65] text-gray-700">
                  Final-year Computer Science graduate (B.Tech,
                  expected June 2026) with a solid foundation in
                  Object-Oriented Programming, DBMS, Operating
                  Systems, and Computer Networks. Internship
                  experience across cloud computing (AWS) and
                  backend software development (Django,
                  MongoDB), applying structured software
                  engineering practices to build and maintain
                  reliable applications. Comfortable working to
                  direction, quick to learn new tools, and used to
                  collaborating with teams to deliver on shared
                  goals.
                </p>

              </section>

              {/* =================================================
                  TECHNICAL SKILLS
              ================================================= */}

              <section className="mt-5">

                <ResumeHeading>
                  TECHNICAL SKILLS
                </ResumeHeading>

                <div className="mt-2 space-y-1 text-[10.5px] leading-[1.55] text-gray-700">

                  <SkillLine
                    title="Programming & Core CS"
                    text="Java, Python, C/C++, JavaScript, TypeScript — OOPS, DSA, DBMS, Operating Systems, Computer Networks"
                  />

                  <SkillLine
                    title="Software Development"
                    text="Node.js, Express.js, Django, REST APIs, MVC Architecture, JWT Authentication, Agile/collaborative workflows"
                  />

                  <SkillLine
                    title="Frontend"
                    text="React.js, Next.js, HTML5, CSS3"
                  />

                  <SkillLine
                    title="Databases"
                    text="MongoDB, PostgreSQL, SQL, Mongoose, Prisma ORM"
                  />

                  <SkillLine
                    title="Cloud & Tools"
                    text="AWS (EC2, S3, IAM), Git/GitHub, Postman, Linux, VS Code"
                  />

                </div>

              </section>

              {/* =================================================
                  EXPERIENCE
              ================================================= */}

              <section className="mt-5">

                <ResumeHeading>
                  INTERNSHIP EXPERIENCE
                </ResumeHeading>

                <ExperienceItem
                  role="Cloud Computing Intern"
                  company="Euphoria GenX, Kolkata"
                  duration="Jan 2026 – May 2026"
                  bullets={[
                    "Applied software engineering practices to deploy and manage secure, scalable cloud applications using AWS (EC2, S3, IAM), following defined processes with reducing supervision.",
                  ]}
                />

                <ExperienceItem
                  role="Backend Development Intern"
                  company="AI Labs, Kolkata"
                  duration="Jun 2024 – Aug 2024"
                  bullets={[
                    "Built a secure voting system using Django and MongoDB with role-based authentication, following MVC architecture and software design principles.",
                    "Designed an optimized database schema, reducing query response time by 30% through analytical, methodical problem-solving.",
                  ]}
                />

              </section>

              {/* =================================================
                  PROJECTS
              ================================================= */}

              <section className="mt-5">

                <ResumeHeading>
                  ACADEMIC & SELF-INITIATED PROJECTS
                </ResumeHeading>

                <ProjectItem
                  title="Cloud Keep"
                  subtitle="MERN-Based File Storage Platform"
                  bullets={[
                    "Designed and implemented a scalable, cloud-native storage platform (React, Node.js, Express, MongoDB, AWS S3) with JWT-based authentication and role-based access control.",
                    "Reduced file retrieval latency by 35% by applying efficient caching strategies — demonstrating attention to performance and reliability.",
                  ]}
                />

                <ProjectItem
                  title="AI Resume Builder"
                  subtitle="ATS-Ready Resume Builder"
                  bullets={[
                    "Developed with Next.js, TypeScript and Prisma ORM (PostgreSQL), integrating an AI API for job-specific resume optimization, with indexed queries and PDF generation.",
                  ]}
                />

              </section>

              {/* =================================================
                  EDUCATION
              ================================================= */}

              <section className="mt-5">

                <ResumeHeading>
                  EDUCATION
                </ResumeHeading>

                <div className="mt-2 flex items-start justify-between gap-4">

                  <div>

                    <p className="text-[11px] font-bold text-gray-900">
                      B.Tech, Computer Science & Engineering
                    </p>

                    <p className="text-[10.5px] text-gray-700">
                      The Neotia University, Kolkata —
                      Specialization: Cyber Security
                    </p>

                  </div>

                  <div className="shrink-0 text-right text-[10px] text-gray-600">

                    <p>Jun 2026</p>

                    <p className="mt-0.5 font-medium">
                      CGPA: 8.48 / 10.0
                    </p>

                  </div>

                </div>

              </section>

              {/* =================================================
                  ACHIEVEMENTS
              ================================================= */}

              <section className="mt-5">

                <ResumeHeading>
                  ACHIEVEMENTS & INVOLVEMENTS
                </ResumeHeading>

                <ul className="mt-2 space-y-1 text-[10.5px] leading-[1.55] text-gray-700">

                  <ResumeBullet>
                    1st Position — Coding Competition,
                    Parikalpana 2025, The Neotia University
                  </ResumeBullet>

                  <ResumeBullet>
                    Solved 100+ Data Structures and Algorithms
                    problems on LeetCode; participated in Smart
                    India Hackathon 2025
                  </ResumeBullet>

                  <ResumeBullet>
                    Active member, Techniche Club — contributed
                    to technical event organization and teamwork
                  </ResumeBullet>

                </ul>

              </section>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM ACTION BAR
      ===================================================== */}

      <div
        className="
          flex
          h-11
          shrink-0
          items-center
          justify-between
          border-t
          border-white/10
          bg-[#29292b]
          px-4
        "
      >

        {/* LEFT LINKS */}

        <div className="flex items-center gap-4">

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ghosharnab460@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-1.5
              text-xs
              text-white/40
              transition
              hover:text-white
            "
          >
            <Mail size={13} />
            Email
          </a>

          <a
            href="https://github.com/MrArnabGhosh"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-xs
              text-white/40
              transition
              hover:text-white
            "
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/arnab-ghosh404/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-xs
              text-white/40
              transition
              hover:text-white
            "
          >
            LinkedIn
          </a>

          <a
            href="tel:+918145595626"
            className="
              hidden
              items-center
              gap-1.5
              text-xs
              text-white/40
              transition
              hover:text-white
              sm:flex
            "
          >
            <Phone size={13} />
            Contact
          </a>

        </div>

        {/* DOWNLOAD */}

        <a
          href={resumeFile}
          download="Arnab_Ghosh_Resume.pdf"
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-white
            px-3
            py-1.5
            text-xs
            font-medium
            text-black
            transition
            hover:bg-white/85
          "
        >
          <Download size={13} />
          Download Resume
        </a>

      </div>

    </div>
  );
}

/* =========================================================
   RESUME HEADING
========================================================= */

function ResumeHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      className="
        border-b
        border-gray-300
        pb-1
        text-[11px]
        font-bold
        tracking-wide
        text-gray-900
      "
    >
      {children}
    </h2>
  );
}

/* =========================================================
   SKILL LINE
========================================================= */

function SkillLine({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <p>
      <span className="font-bold text-gray-900">
        {title}:
      </span>{" "}
      {text}
    </p>
  );
}

/* =========================================================
   EXPERIENCE
========================================================= */

function ExperienceItem({
  role,
  company,
  duration,
  bullets,
}: {
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}) {
  return (
    <div className="mt-3">

      <div className="flex items-start justify-between gap-4">

        <p className="text-[11px] font-bold text-gray-900">
          {role} — {company}
        </p>

        <p className="shrink-0 text-[10px] text-gray-600">
          {duration}
        </p>

      </div>

      <ul className="mt-1 space-y-0.5 text-[10.5px] leading-[1.5] text-gray-700">

        {bullets.map((bullet) => (
          <ResumeBullet key={bullet}>
            {bullet}
          </ResumeBullet>
        ))}

      </ul>

    </div>
  );
}

/* =========================================================
   PROJECT
========================================================= */

function ProjectItem({
  title,
  subtitle,
  bullets,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
}) {
  return (
    <div className="mt-3">

      <p className="text-[11px] font-bold text-gray-900">
        {title} —{" "}
        <span className="font-medium">
          {subtitle}
        </span>
      </p>

      <ul className="mt-1 space-y-0.5 text-[10.5px] leading-[1.5] text-gray-700">

        {bullets.map((bullet) => (
          <ResumeBullet key={bullet}>
            {bullet}
          </ResumeBullet>
        ))}

      </ul>

    </div>
  );
}

/* =========================================================
   BULLET
========================================================= */

function ResumeBullet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-2">

      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-gray-500" />

      <span>
        {children}
      </span>

    </li>
  );
}