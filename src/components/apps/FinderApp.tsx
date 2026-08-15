"use client";

import {
  ChevronLeft,
  ChevronRight,
  Folder,
  Grid2X2,
  List,
  Search,
  Sidebar,
  FileText,
} from "lucide-react";

import { useState } from "react";

interface FinderAppProps {
  onOpenItem: (id: string) => void;
}

type FinderItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  description: string;
};

const finderItems: FinderItem[] = [
  {
    id: "projects",
    name: "Projects",
    type: "folder",
    description: "My software projects",
  },
  {
    id: "education",
    name: "Education",
    type: "folder",
    description: "Academic background",
  },
  {
    id: "experience",
    name: "Experience",
    type: "folder",
    description: "Professional experience",
  },
  {
    id: "skills",
    name: "Skills",
    type: "folder",
    description: "Technical skills",
  },
  {
    id: "resume",
    name: "Resume",
    type: "file",
    description: "My latest resume",
  },
  {
    id: "about",
    name: "About Me",
    type: "folder",
    description: "A little about me",
  },
  {
    id: "contact",
    name: "Contact",
    type: "folder",
    description: "Get in touch",
  },
];

export default function FinderApp({
  onOpenItem,
}: FinderAppProps) {
  // =====================================================
  // STATE
  // =====================================================

  const [view, setView] =
    useState<"grid" | "list">("grid");

  const [search, setSearch] = useState("");

  const [currentLocation, setCurrentLocation] =
    useState("Arnab");

  const [sidebarVisible, setSidebarVisible] =
    useState(true);

  const [selectedItem, setSelectedItem] =
    useState<string | null>(null);

  // =====================================================
  // FILTER ITEMS
  // =====================================================

  const filteredItems = finderItems.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  // =====================================================
  // SELECT ITEM
  // =====================================================

  const handleSelect = (id: string) => {
    setSelectedItem(id);
  };

  // =====================================================
  // OPEN ITEM
  // =====================================================

  const handleOpen = (item: FinderItem) => {
    setSelectedItem(item.id);

    onOpenItem(item.id);
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

      {sidebarVisible && (
        <aside
          className="
            hidden
            w-52
            shrink-0
            border-r
            border-black/10
            bg-[#eeeeef]/90
            p-3
            sm:block
          "
        >
          {/* ---------------------------------------------
              Favorites
              --------------------------------------------- */}

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
            Favorites
          </p>

          <button
            type="button"
            onClick={() => {
              setCurrentLocation("Arnab");
              setSelectedItem(null);
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              bg-black/10
              px-3
              py-2
              text-left
              text-sm
              font-medium
            "
          >
            <Folder
              size={17}
              strokeWidth={1.8}
              className="
                fill-[#5aa9fa]
                text-[#2878c8]
              "
            />

            Arnab
          </button>

          {/* ---------------------------------------------
              Portfolio
              --------------------------------------------- */}

          <p
            className="
              mt-5
              px-3
              py-2
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-black/35
            "
          >
            Portfolio
          </p>

          {finderItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCurrentLocation(
                  item.name,
                );

                setSelectedItem(item.id);
              }}
              onDoubleClick={() =>
                handleOpen(item)
              }
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-left
                text-sm
                transition
                ${
                  selectedItem === item.id
                    ? "bg-blue-500/15 text-blue-700"
                    : "text-black/65 hover:bg-black/5"
                }
              `}
            >
              {item.type === "folder" ? (
                <Folder
                  size={16}
                  strokeWidth={1.8}
                  className="
                    fill-[#5aa9fa]
                    text-[#2878c8]
                  "
                />
              ) : (
                <FileText
                  size={16}
                  className="text-red-500"
                />
              )}

              <span className="truncate">
                {item.name}
              </span>
            </button>
          ))}
        </aside>
      )}

      {/* =================================================
          MAIN AREA
          ================================================= */}

      <div className="flex min-w-0 flex-1 flex-col">
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
            px-3
          "
        >
          {/* Sidebar */}

          <button
            type="button"
            onClick={() =>
              setSidebarVisible(
                (value) => !value,
              )
            }
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
            aria-label="Toggle sidebar"
          >
            <Sidebar size={17} />
          </button>

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
              text-black/50
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

          {/* Location */}

          <div className="ml-2 min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {currentLocation}
            </p>
          </div>

          {/* View Switcher */}

          <div
            className="
              hidden
              items-center
              rounded-lg
              bg-black/5
              p-0.5
              sm:flex
            "
          >
            {/* Grid */}

            <button
              type="button"
              onClick={() =>
                setView("grid")
              }
              className={`
                flex
                h-7
                w-8
                items-center
                justify-center
                rounded-md
                transition
                ${
                  view === "grid"
                    ? "bg-white text-black shadow-sm"
                    : "text-black/40 hover:text-black/60"
                }
              `}
              aria-label="Grid view"
            >
              <Grid2X2 size={15} />
            </button>

            {/* List */}

            <button
              type="button"
              onClick={() =>
                setView("list")
              }
              className={`
                flex
                h-7
                w-8
                items-center
                justify-center
                rounded-md
                transition
                ${
                  view === "list"
                    ? "bg-white text-black shadow-sm"
                    : "text-black/40 hover:text-black/60"
                }
              `}
              aria-label="List view"
            >
              <List size={15} />
            </button>
          </div>

          {/* Search */}

          <div
            className="
              flex
              h-8
              w-36
              items-center
              rounded-lg
              bg-black/5
              px-2
            "
          >
            <Search
              size={14}
              className="shrink-0 text-black/35"
            />

            <input
              value={search}
              onChange={(event) => {
                setSearch(
                  event.target.value,
                );

                setSelectedItem(null);
              }}
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

        {/* =================================================
            CONTENT
            ================================================= */}

        <div className="flex-1 overflow-auto p-5">
          {filteredItems.length === 0 ? (
            <div
              className="
                flex
                h-full
                min-h-64
                items-center
                justify-center
                text-sm
                text-black/35
              "
            >
              No items found
            </div>
          ) : view === "grid" ? (
            /* =================================================
               GRID VIEW
               ================================================= */

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                lg:grid-cols-4
              "
            >
              {filteredItems.map(
                (item) => {
                  const isSelected =
                    selectedItem ===
                    item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleSelect(
                          item.id,
                        )
                      }
                      onDoubleClick={() =>
                        handleOpen(item)
                      }
                      className={`
                        group
                        flex
                        min-h-32
                        flex-col
                        items-center
                        justify-center
                        rounded-xl
                        p-4
                        text-center
                        transition-all
                        duration-150
                        ${
                          isSelected
                            ? "bg-blue-500/15 ring-1 ring-blue-500/20"
                            : "hover:bg-black/5"
                        }
                      `}
                    >
                      {/* Icon */}

                      {item.type ===
                      "folder" ? (
                        <Folder
                          size={58}
                          strokeWidth={1.4}
                          className="
                            fill-[#5aa9fa]
                            text-[#2878c8]
                            drop-shadow-sm
                            transition-transform
                            duration-150
                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-14
                            w-12
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-black/10
                            bg-white
                            text-[10px]
                            font-semibold
                            shadow-sm
                          "
                        >
                          PDF
                        </div>
                      )}

                      {/* Name */}

                      <span
                        className={`
                          mt-3
                          max-w-full
                          truncate
                          text-sm
                          ${
                            isSelected
                              ? "font-semibold text-blue-700"
                              : "font-medium"
                          }
                        `}
                      >
                        {item.name}
                      </span>

                      {/* Description */}

                      <span
                        className="
                          mt-1
                          max-w-full
                          truncate
                          text-[11px]
                          text-black/35
                        "
                      >
                        {item.description}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          ) : (
            /* =================================================
               LIST VIEW
               ================================================= */

            <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
              {filteredItems.map(
                (item, index) => {
                  const isSelected =
                    selectedItem ===
                    item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleSelect(
                          item.id,
                        )
                      }
                      onDoubleClick={() =>
                        handleOpen(item)
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        gap-4
                        px-4
                        py-3
                        text-left
                        transition
                        ${
                          isSelected
                            ? "bg-blue-500/10"
                            : "hover:bg-black/5"
                        }
                        ${
                          index !==
                          filteredItems.length -
                            1
                            ? "border-b border-black/5"
                            : ""
                        }
                      `}
                    >
                      {/* Icon */}

                      {item.type ===
                      "folder" ? (
                        <Folder
                          size={28}
                          strokeWidth={1.5}
                          className="
                            shrink-0
                            fill-[#5aa9fa]
                            text-[#2878c8]
                          "
                        />
                      ) : (
                        <FileText
                          size={27}
                          className="
                            shrink-0
                            text-red-500
                          "
                        />
                      )}

                      {/* Information */}

                      <div className="min-w-0 flex-1">
                        <p
                          className={`
                            truncate
                            text-sm
                            ${
                              isSelected
                                ? "font-semibold text-blue-700"
                                : "font-medium"
                            }
                          `}
                        >
                          {item.name}
                        </p>

                        <p className="truncate text-xs text-black/35">
                          {item.description}
                        </p>
                      </div>

                      {/* Type */}

                      <span className="hidden text-xs text-black/30 sm:block">
                        {item.type ===
                        "folder"
                          ? "Folder"
                          : "PDF"}
                      </span>
                    </button>
                  );
                },
              )}
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
            border-t
            border-black/10
            px-4
            text-[11px]
            text-black/35
          "
        >
          {filteredItems.length}{" "}
          {filteredItems.length === 1
            ? "item"
            : "items"}
        </div>
      </div>
    </div>
  );
}