"use client";

import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Mail,
  MapPin,
  Phone,
  Send,
  Star,
  Trash2,
} from "lucide-react";

const EMAIL = "ghosharnab460@gmail.com";

const PHONE = "+91 8145595626";

const LINKEDIN =
  "https://www.linkedin.com/in/arnab-ghosh404/";

const GITHUB =
  "https://github.com/MrArnabGhosh";

export default function MailApp() {
  // =====================================================
  // OPEN GMAIL
  // =====================================================

  const openGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        EMAIL,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // =====================================================
  // OPEN LINKEDIN
  // =====================================================

  const openLinkedIn = () => {
    window.open(
      LINKEDIN,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // =====================================================
  // OPEN GITHUB
  // =====================================================

  const openGitHub = () => {
    window.open(
      GITHUB,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

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
          hidden
          w-52
          shrink-0
          border-r
          border-black/10
          bg-[#eeeeef]
          p-3
          sm:block
        "
      >
        {/* Mailboxes */}

        <p
          className="
            px-3
            py-2
            text-[11px]
            font-semibold
            uppercase
            tracking-wider
            text-black/35
          "
        >
          Mailboxes
        </p>

        {/* Inbox */}

        <button
          type="button"
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            bg-blue-500/15
            px-3
            py-2
            text-left
            text-sm
            font-medium
            text-blue-700
          "
        >
          <Inbox size={17} />

          <span>Inbox</span>

          <span className="ml-auto text-xs">
            1
          </span>
        </button>

        {/* Starred */}

        <button
          type="button"
          className="
            mt-1
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            text-left
            text-sm
            text-black/55
            transition
            hover:bg-black/5
          "
        >
          <Star size={17} />

          <span>Starred</span>
        </button>

        {/* Sent */}

        <button
          type="button"
          className="
            mt-1
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            text-left
            text-sm
            text-black/55
            transition
            hover:bg-black/5
          "
        >
          <Send size={17} />

          <span>Sent</span>
        </button>

        {/* Archive */}

        <button
          type="button"
          className="
            mt-1
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            text-left
            text-sm
            text-black/55
            transition
            hover:bg-black/5
          "
        >
          <Archive size={17} />

          <span>Archive</span>
        </button>

        {/* Trash */}

        <button
          type="button"
          className="
            mt-1
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            text-left
            text-sm
            text-black/55
            transition
            hover:bg-black/5
          "
        >
          <Trash2 size={17} />

          <span>Trash</span>
        </button>
      </aside>

      {/* =================================================
          MAIN AREA
          ================================================= */}

      <main className="flex min-w-0 flex-1 flex-col">
        {/* =================================================
            TOOLBAR
            ================================================= */}

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
          {/* Back */}

          <button
            type="button"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              transition
              hover:bg-black/5
            "
            aria-label="Back"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Forward */}

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
              transition
              hover:bg-black/5
            "
            aria-label="Forward"
          >
            <ChevronRight size={18} />
          </button>

          {/* Title */}

          <div className="ml-2 flex-1">
            <p className="text-sm font-semibold">
              Contact
            </p>
          </div>

          {/* Compose */}

          <button
            type="button"
            onClick={openGmail}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-black
              px-3
              py-1.5
              text-xs
              font-medium
              text-white
              transition
              hover:bg-black/80
            "
          >
            <Mail size={14} />

            Compose
          </button>
        </div>

        {/* =================================================
            CONTENT
            ================================================= */}

        <div className="flex-1 overflow-auto">
          <div
            className="
              mx-auto
              max-w-3xl
              px-6
              py-10
              sm:px-10
            "
          >
            {/* =================================================
                PROFILE
                ================================================= */}

            <div className="flex flex-col items-center text-center">
              {/* Avatar */}

              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-white
                  shadow-lg
                "
              >
                AG
              </div>

              {/* Name */}

              <h1 className="mt-5 text-2xl font-semibold">
                Arnab Ghosh
              </h1>

              {/* Role */}

              <p className="mt-1 text-sm text-black/45">
                Software Engineer
              </p>

              {/* Location */}

              <p className="mt-1 text-xs text-black/35">
                Kolkata, India
              </p>
            </div>

            {/* =================================================
                CONTACT CARD
                ================================================= */}

            <div
              className="
                mt-10
                overflow-hidden
                rounded-2xl
                border
                border-black/10
                bg-white
                shadow-sm
              "
            >
              {/* =================================================
                  EMAIL
                  ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  border-b
                  border-black/5
                  px-5
                  py-4
                "
              >
                {/* Icon */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-500/10
                  "
                >
                  <Mail
                    size={18}
                    className="text-blue-600"
                  />
                </div>

                {/* Information */}

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-black/35">
                    Email
                  </p>

                  <p className="truncate text-sm font-medium">
                    {EMAIL}
                  </p>
                </div>

                {/* Button */}

                <button
                  type="button"
                  onClick={openGmail}
                  className="
                    shrink-0
                    rounded-lg
                    bg-black
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-white
                    transition
                    hover:bg-black/80
                  "
                >
                  Email Me
                </button>
              </div>

              {/* =================================================
                  PHONE
                  ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  border-b
                  border-black/5
                  px-5
                  py-4
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-green-500/10
                  "
                >
                  <Phone
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="text-xs text-black/35">
                    Phone
                  </p>

                  <p className="text-sm font-medium">
                    {PHONE}
                  </p>
                </div>
              </div>

              {/* =================================================
                  LOCATION
                  ================================================= */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  border-b
                  border-black/5
                  px-5
                  py-4
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-500/10
                  "
                >
                  <MapPin
                    size={18}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <p className="text-xs text-black/35">
                    Location
                  </p>

                  <p className="text-sm font-medium">
                    Kolkata, India
                  </p>
                </div>
              </div>

              {/* =================================================
                  LINKEDIN
                  ================================================= */}

              <button
                type="button"
                onClick={openLinkedIn}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  border-b
                  border-black/5
                  px-5
                  py-4
                  text-left
                  transition
                  hover:bg-black/[0.03]
                "
              >
                {/* LinkedIn Icon */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-600/10
                  "
                >
                  <span className="text-lg font-bold text-blue-600">
                    in
                  </span>
                </div>

                {/* Information */}

                <div className="min-w-0">
                  <p className="text-xs text-black/35">
                    LinkedIn
                  </p>

                  <p className="truncate text-sm font-medium">
                    linkedin.com/in/arnab-ghosh404
                  </p>
                </div>
              </button>

              {/* =================================================
                  GITHUB
                  ================================================= */}

              <button
                type="button"
                onClick={openGitHub}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  px-5
                  py-4
                  text-left
                  transition
                  hover:bg-black/[0.03]
                "
              >
                {/* GitHub Icon */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-black/5
                  "
                >
                  <span className="text-sm font-bold text-black/70">
                    GH
                  </span>
                </div>

                {/* Information */}

                <div className="min-w-0">
                  <p className="text-xs text-black/35">
                    GitHub
                  </p>

                  <p className="truncate text-sm font-medium">
                    github.com/MrArnabGhosh
                  </p>
                </div>
              </button>
            </div>

            {/* =================================================
                MESSAGE
                ================================================= */}

            <div className="mt-8 text-center">
              <p className="text-sm leading-6 text-black/45">
                Interested in working together,
                discussing a project, or just
                saying hello?
              </p>

              <button
                type="button"
                onClick={openGmail}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-black
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:bg-black/80
                "
              >
                <Send size={16} />

                Start a Conversation
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            STATUS BAR
            ================================================= */}

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
          Mail • Arnab&apos;s Portfolio
        </div>
      </main>
    </div>
  );
}