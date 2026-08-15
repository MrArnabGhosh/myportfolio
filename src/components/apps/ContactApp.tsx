"use client";

import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Send,
  UserRound,
} from "lucide-react";

const EMAIL = "ghosharnab460@gmail.com";
const PHONE = "+91 8145595626";
const LOCATION = "Kolkata, India";

export default function ContactApp() {
  const [copied, setCopied] = useState(false);

  // =====================================================
  // COPY EMAIL
  // =====================================================

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      console.error("Unable to copy email.");
    }
  };

  // =====================================================
  // OPEN GMAIL
  // =====================================================

  const openGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#0d0d0f] text-white">

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

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

          <Mail
            size={18}
            className="text-blue-400"
          />

          <span className="text-sm font-semibold">
            Contact
          </span>

        </div>

        <span className="text-xs text-white/30">
          Get in touch
        </span>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="min-h-0 flex-1 overflow-auto">

        <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10">

          {/* =================================================
              HEADER
          ================================================= */}

          <section>

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-blue-400/70
              "
            >
              Contact
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Let&apos;s Connect
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
              I&apos;m currently open to full-time opportunities
              in software engineering, backend development,
              and cloud computing. Feel free to reach out.
            </p>

          </section>

          {/* =================================================
              CONTACT CARDS
          ================================================= */}

          <section className="mt-7 grid gap-4 md:grid-cols-2">

            {/* =================================================
                EMAIL
            ================================================= */}

            <div
              className="
                group
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-5
                transition-all
                duration-200
                hover:border-blue-400/20
                hover:bg-white/[0.05]
              "
            >

              <div className="flex items-start justify-between">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-400/[0.08]
                  "
                >
                  <Mail
                    size={20}
                    className="text-blue-300"
                  />
                </div>

                {/* Copy */}

                <button
                  type="button"
                  onClick={copyEmail}
                  title="Copy email"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-white/30
                    transition
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  {copied ? (
                    <Check
                      size={15}
                      className="text-green-400"
                    />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>

              </div>

              <p className="mt-5 text-xs text-white/30">
                Email
              </p>

              <p className="mt-1 break-all text-sm font-medium text-white/75">
                {EMAIL}
              </p>

              <button
                type="button"
                onClick={openGmail}
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-medium
                  text-blue-300/80
                  transition
                  hover:text-blue-200
                "
              >
                <Send size={13} />

                Open Gmail

                <ExternalLink size={12} />
              </button>

            </div>

            {/* =================================================
                PHONE
            ================================================= */}

            <div
              className="
                rounded-2xl
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

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-400/[0.08]
                "
              >
                <Phone
                  size={20}
                  className="text-green-300"
                />
              </div>

              <p className="mt-5 text-xs text-white/30">
                Phone
              </p>

              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="
                  mt-1
                  block
                  text-sm
                  font-medium
                  text-white/75
                  transition
                  hover:text-white
                "
              >
                {PHONE}
              </a>

              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-medium
                  text-green-300/70
                  transition
                  hover:text-green-200
                "
              >
                <Phone size={13} />

                Call me
              </a>

            </div>

            {/* =================================================
                LOCATION
            ================================================= */}

            <div
              className="
                rounded-2xl
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

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-orange-400/[0.08]
                "
              >
                <MapPin
                  size={20}
                  className="text-orange-300"
                />
              </div>

              <p className="mt-5 text-xs text-white/30">
                Location
              </p>

              <p className="mt-1 text-sm font-medium text-white/75">
                {LOCATION}
              </p>

              <p className="mt-4 text-xs text-white/30">
                Available for opportunities
              </p>

            </div>

            {/* =================================================
                AVAILABILITY
            ================================================= */}

            <div
              className="
                rounded-2xl
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

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-400/[0.08]
                "
              >
                <UserRound
                  size={20}
                  className="text-purple-300"
                />
              </div>

              <p className="mt-5 text-xs text-white/30">
                Availability
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-green-400" />

                <span className="text-sm font-medium text-white/75">
                  Open to opportunities
                </span>

              </div>

              <p className="mt-3 text-xs leading-5 text-white/35">
                Software Engineering · Backend · Cloud
              </p>

            </div>

          </section>

          {/* =================================================
              ONLINE PRESENCE
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
                Online Presence
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Find Me Online
              </h2>

            </div>

            <div className="grid gap-3 sm:grid-cols-3">

              {/* =================================================
                  GITHUB
              ================================================= */}

              <SocialLink
                icon={
                  <span
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/60
                      text-[11px]
                      font-bold
                      text-white/80
                    "
                  >
                    GH
                  </span>
                }
                title="GitHub"
                handle="@MrArnabGhosh"
                href="https://github.com/MrArnabGhosh"
              />

              {/* =================================================
                  LINKEDIN
              ================================================= */}

              <SocialLink
                icon={
                  <span
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-[3px]
                      bg-[#0a66c2]
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    in
                  </span>
                }
                title="LinkedIn"
                handle="/in/arnab-ghosh404"
                href="https://www.linkedin.com/in/arnab-ghosh404/"
              />

              {/* =================================================
                  LEETCODE
              ================================================= */}

              <SocialLink
                icon={
                  <Code2
                    size={19}
                    className="text-yellow-300/80"
                  />
                }
                title="LeetCode"
                handle="@Arnab404"
                href="https://leetcode.com/Arnab404"
              />

            </div>

          </section>

          {/* =================================================
              CTA
          ================================================= */}

          <section
            className="
              relative
              mt-8
              overflow-hidden
              rounded-2xl
              border
              border-blue-400/[0.10]
              bg-blue-400/[0.035]
              p-6
              sm:p-7
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-blue-500/[0.08]
                blur-3xl
              "
            />

            <div className="relative">

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-blue-300/60
                "
              >
                Have an opportunity?
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Let&apos;s build something together.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                Whether it&apos;s a software engineering role,
                backend project, or cloud opportunity, I&apos;d
                be happy to connect.
              </p>

              <button
                type="button"
                onClick={openGmail}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-black
                  transition
                  hover:bg-white/85
                  active:scale-[0.98]
                "
              >
                <Mail size={14} />

                Send me an email

                <ExternalLink size={12} />
              </button>

            </div>

          </section>

        </div>

      </main>

      {/* =====================================================
          STATUS BAR
      ===================================================== */}

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
          Contact
        </span>

        <span className="text-[11px] text-white/25">
          {EMAIL}
        </span>
      </div>

    </div>
  );
}

/* =========================================================
   SOCIAL LINK
========================================================= */

function SocialLink({
  icon,
  title,
  handle,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  handle: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-white/[0.08]
        bg-white/[0.03]
        p-4
        transition-all
        duration-200
        hover:border-white/[0.16]
        hover:bg-white/[0.055]
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
            bg-white/[0.05]
          "
        >
          {icon}
        </div>

        <div>

          <p className="text-sm font-medium text-white/75">
            {title}
          </p>

          <p className="mt-0.5 text-[11px] text-white/30">
            {handle}
          </p>

        </div>

      </div>

      <ExternalLink
        size={14}
        className="
          text-white/20
          transition
          group-hover:text-white/60
        "
      />

    </a>
  );
}