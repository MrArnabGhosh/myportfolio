"use client";

import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Globe,
  Lock,
  RefreshCw,
  Search,
} from "lucide-react";

import { useState } from "react";

interface SafariPage {
  title: string;
  url: string;
  description: string;
  icon: string;
}

const pages: SafariPage[] = [
  {
    title: "GitHub",
    url: "github.com/MrArnabGhosh",
    description:
      "Explore my projects, repositories and development work.",
    icon: "⌘",
  },
  {
    title: "LinkedIn",
    url: "www.linkedin.com/in/arnab-ghosh404/",
    description:
      "Connect with me and explore my professional experience.",
    icon: "in",
  },
  {
    title: "LeetCode",
    url: "leetcode.com/u/Arnab404",
    description:
      "View my coding practice and problem-solving journey.",
    icon: "LC",
  },
];

export default function SafariApp() {
  const [currentPage, setCurrentPage] =
    useState<SafariPage | null>(null);

  const [search, setSearch] = useState("");

  const [history, setHistory] =
    useState<SafariPage[]>([]);

  const [historyIndex, setHistoryIndex] =
    useState(-1);

  // =====================================================
  // OPEN PAGE
  // =====================================================

  const openPage = (page: SafariPage) => {
    setCurrentPage(page);

    setHistory((currentHistory) => {
      const nextHistory =
        currentHistory.slice(
          0,
          historyIndex + 1,
        );

      return [...nextHistory, page];
    });

    setHistoryIndex(
      (currentIndex) => currentIndex + 1,
    );

    setSearch(page.url);
  };

  // =====================================================
  // OPEN EXTERNAL WEBSITE
  // =====================================================

  const openExternal = (url: string) => {
    window.open(
      `https://${url}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    const value =
      search.trim().toLowerCase();

    if (!value) {
      return;
    }

    const matchedPage = pages.find(
      (page) =>
        page.title.toLowerCase() ===
          value ||
        page.url
          .toLowerCase()
          .includes(value),
    );

    if (matchedPage) {
      openPage(matchedPage);
      return;
    }

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      window.open(
        value,
        "_blank",
        "noopener,noreferrer",
      );

      return;
    }

    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        search,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // =====================================================
  // BACK
  // =====================================================

  const goBack = () => {
    if (historyIndex <= 0) {
      return;
    }

    const newIndex =
      historyIndex - 1;

    const page =
      history[newIndex];

    setHistoryIndex(newIndex);
    setCurrentPage(page);
    setSearch(page.url);
  };

  // =====================================================
  // FORWARD
  // =====================================================

  const goForward = () => {
    if (
      historyIndex >=
      history.length - 1
    ) {
      return;
    }

    const newIndex =
      historyIndex + 1;

    const page =
      history[newIndex];

    setHistoryIndex(newIndex);
    setCurrentPage(page);
    setSearch(page.url);
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
        flex-col
        overflow-hidden
        bg-[#f5f5f7]
        text-black
      "
    >
      {/* =================================================
          SAFARI TOOLBAR
          ================================================= */}

      <div
        className="
          flex
          h-14
          shrink-0
          items-center
          gap-3
          border-b
          border-black/10
          bg-[#f6f6f6]/95
          px-4
          backdrop-blur-xl
        "
      >
        {/* Navigation */}

        <button
          type="button"
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-black/60
            transition
            hover:bg-black/5
            disabled:cursor-default
            disabled:opacity-25
          "
          aria-label="Back"
        >
          <ArrowLeft size={17} />
        </button>

        <button
          type="button"
          onClick={goForward}
          disabled={
            historyIndex >=
            history.length - 1
          }
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-black/60
            transition
            hover:bg-black/5
            disabled:cursor-default
            disabled:opacity-25
          "
          aria-label="Forward"
        >
          <ArrowRight size={17} />
        </button>

        {/* Address Bar */}

        <form
          onSubmit={handleSearch}
          className="
            flex
            h-9
            min-w-0
            flex-1
            items-center
            rounded-lg
            bg-black/[0.06]
            px-3
          "
        >
          <Lock
            size={13}
            className="mr-2 shrink-0 text-black/40"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search or enter website name"
            className="
              min-w-0
              flex-1
              bg-transparent
              text-center
              text-sm
              text-black/70
              outline-none
              placeholder:text-black/35
            "
          />

          <Search
            size={14}
            className="ml-2 shrink-0 text-black/30"
          />
        </form>

        {/* Refresh */}

        <button
          type="button"
          onClick={() => {
            if (currentPage) {
              setCurrentPage({
                ...currentPage,
              });
            }
          }}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-black/60
            transition
            hover:bg-black/5
          "
          aria-label="Refresh"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* =================================================
          CONTENT
          ================================================= */}

      <div className="flex-1 overflow-auto">
        {!currentPage ? (
          /* =================================================
             SAFARI START PAGE
             ================================================= */

          <div className="mx-auto max-w-4xl px-8 py-12">
            <div className="text-center">
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-black
                  text-2xl
                  text-white
                  shadow-lg
                "
              >
                <Globe size={30} />
              </div>

              <h1 className="mt-6 text-3xl font-semibold">
                Arnab&apos;s Safari
              </h1>

              <p className="mt-2 text-sm text-black/45">
                Explore my web presence
              </p>
            </div>

            {/* Favorites */}

            <div className="mt-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-black/40">
                Favorites
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {pages.map((page) => (
                  <button
                    key={page.title}
                    type="button"
                    onClick={() =>
                      openPage(page)
                    }
                    className="
                      group
                      rounded-2xl
                      border
                      border-black/10
                      bg-white
                      p-5
                      text-left
                      shadow-sm
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:shadow-lg
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
                        bg-black
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      {page.icon}
                    </div>

                    <h2 className="mt-4 font-semibold">
                      {page.title}
                    </h2>

                    <p className="mt-1 text-xs text-black/40">
                      {page.url}
                    </p>

                    <p className="mt-3 text-sm leading-5 text-black/55">
                      {page.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}

            <div className="mt-12 rounded-2xl border border-black/10 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                Quick Links
              </p>

              <div className="mt-4 space-y-2">
                {pages.map((page) => (
                  <button
                    key={page.url}
                    type="button"
                    onClick={() =>
                      openExternal(page.url)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      transition
                      hover:bg-black/5
                    "
                  >
                    <span className="text-sm font-medium">
                      {page.title}
                    </span>

                    <ExternalLink
                      size={15}
                      className="text-black/30"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* =================================================
             WEBSITE PREVIEW
             ================================================= */

          <div className="mx-auto max-w-4xl px-8 py-12">
            <div
              className="
                rounded-3xl
                border
                border-black/10
                bg-white
                p-10
                shadow-sm
              "
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-black
                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    {currentPage.icon}
                  </div>

                  <h1 className="mt-6 text-3xl font-semibold">
                    {currentPage.title}
                  </h1>

                  <p className="mt-2 text-sm text-black/40">
                    {currentPage.url}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openExternal(
                      currentPage.url,
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-black
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-black/80
                  "
                >
                  Open Website

                  <ExternalLink size={15} />
                </button>
              </div>

              <div className="mt-8 border-t border-black/10 pt-8">
                <p className="max-w-2xl text-base leading-7 text-black/60">
                  {currentPage.description}
                </p>
              </div>
            </div>
          </div>
        )}
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
        <span>
          Safari • Arnab&apos;s Portfolio
        </span>
      </div>
    </div>
  );
}