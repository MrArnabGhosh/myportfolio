"use client";

import {
  Bot,
  Check,
  Copy,
  Send,
  Sparkles,
  Square,
  Trash2,
  User,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useAssistantChat } from "@/context/AssistantChat";

const suggestions = [
  "Tell me about Arnab",
  "What are Arnab's skills?",
  "Show me Arnab's projects",
  "What is Arnab's experience?",
];

// =======================================================
// TIME
// =======================================================

function formatTime(value: number) {
  const date = new Date(value);

  let hours = date.getHours();

  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${period}`;
}

interface AIAssistantAppProps {
  /*
   * False while the window is minimized. The chat
   * itself keeps running either way — this only
   * tells the provider whether replies should
   * raise a Dock badge.
   */
  isVisible?: boolean;
}

export default function AIAssistantApp({
  isVisible = true,
}: AIAssistantAppProps) {
  const {
    messages,
    input,
    setInput,
    isStreaming,
    sendMessage,
    stopStreaming,
    clearChat,
    setAssistantVisible,
  } = useAssistantChat();

  const [copiedId, setCopiedId] = useState<
    string | null
  >(null);

  const scrollRef =
    useRef<HTMLElement | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const textareaRef =
    useRef<HTMLTextAreaElement | null>(null);

  const shouldStickToBottom = useRef(true);

  // =====================================================
  // REPORT VISIBILITY
  // =====================================================

  useEffect(() => {
    setAssistantVisible(isVisible);

    return () => setAssistantVisible(false);
  }, [isVisible, setAssistantVisible]);

  // =====================================================
  // AUTO SCROLL (only when already at the bottom)
  // =====================================================

  useEffect(() => {
    if (!shouldStickToBottom.current) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isStreaming]);

  // =====================================================
  // JUMP TO LATEST WHEN REOPENED
  // =====================================================

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    shouldStickToBottom.current = true;

    messagesEndRef.current?.scrollIntoView({
      behavior: "auto",
    });
  }, [isVisible]);

  // =====================================================
  // AUTO GROWING INPUT
  // =====================================================

  useEffect(() => {
    const element = textareaRef.current;

    if (!element) {
      return;
    }

    element.style.height = "auto";

    element.style.height = `${Math.min(
      element.scrollHeight,
      120,
    )}px`;
  }, [input]);

  // =====================================================
  // SCROLL TRACKING
  // =====================================================

  const handleScroll = () => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    shouldStickToBottom.current =
      element.scrollHeight -
        element.scrollTop -
        element.clientHeight <
      120;
  };

  // =====================================================
  // KEYBOARD
  // =====================================================

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();

      return;
    }

    if (event.key === "Escape" && isStreaming) {
      event.preventDefault();

      stopStreaming();
    }
  };

  // =====================================================
  // COPY
  // =====================================================

  const copyMessage = async (
    id: string,
    content: string,
  ) => {
    try {
      await navigator.clipboard.writeText(
        content,
      );

      setCopiedId(id);

      window.setTimeout(
        () => setCopiedId(null),
        1400,
      );
    } catch {
      /* Clipboard blocked */
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0b0b0d] text-white">

      {/* =================================================
          HEADER
          ================================================= */}

      <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            <Bot
              size={19}
              className="text-white/80"
            />
          </div>

          <div>

            <h1 className="text-sm font-semibold">
              AI Assistant
            </h1>

            <div className="mt-0.5 flex items-center gap-1.5">

              <span
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${
                    isStreaming
                      ? "animate-pulse bg-amber-300"
                      : "bg-green-400"
                  }
                `}
              />

              <span className="text-[11px] text-white/35">
                {isStreaming
                  ? "Thinking…"
                  : "Online"}
              </span>

            </div>

          </div>

        </div>

        <button
          type="button"
          onClick={clearChat}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-white/35
            transition
            hover:bg-white/10
            hover:text-white
          "
          title="Clear chat"
        >
          <Trash2 size={15} />
        </button>

      </header>

      {/* =================================================
          MESSAGES
          ================================================= */}

      <main
        ref={scrollRef}
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-y-auto px-5 py-5"
      >

        <div className="mx-auto max-w-2xl space-y-5">

          {messages.map((message) => {

            const isUser =
              message.role === "user";

            return (
              <div
                key={message.id}
                className={`group flex gap-3 ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Sparkles
                      size={15}
                      className="text-white/70"
                    />
                  </div>
                )}

                <div
                  className={`
                    max-w-[78%]
                    ${
                      isUser
                        ? "items-end"
                        : "items-start"
                    }
                  `}
                >

                  <div
                    className={`
                      whitespace-pre-wrap
                      rounded-2xl
                      px-4
                      py-3
                      text-sm
                      leading-6
                      ${
                        isUser
                          ? "rounded-br-md bg-white text-black"
                          : message.isError
                            ? "rounded-bl-md border border-red-400/30 bg-red-400/[0.07] text-red-100/80"
                            : "rounded-bl-md border border-white/10 bg-white/[0.045] text-white/70"
                      }
                    `}
                  >
                    {message.content}

                    {isStreaming &&
                      !isUser &&
                      !message.content && (
                        <span className="text-white/30">
                          …
                        </span>
                      )}
                  </div>

                  {/* Meta row */}

                  <div
                    className={`
                      mt-1
                      flex
                      items-center
                      gap-2
                      px-1
                      text-[10px]
                      text-white/25
                      ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >

                    {message.createdAt > 0 && (
                      <span>
                        {formatTime(
                          message.createdAt,
                        )}
                      </span>
                    )}

                    {!isUser &&
                      message.content && (
                        <button
                          type="button"
                          onClick={() =>
                            copyMessage(
                              message.id,
                              message.content,
                            )
                          }
                          title="Copy reply"
                          className="
                            flex
                            items-center
                            gap-1
                            rounded
                            px-1
                            py-0.5
                            opacity-0
                            transition
                            hover:bg-white/10
                            hover:text-white/70
                            focus:opacity-100
                            group-hover:opacity-100
                          "
                        >
                          {copiedId ===
                          message.id ? (
                            <>
                              <Check size={11} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              Copy
                            </>
                          )}
                        </button>
                      )}

                  </div>

                </div>

                {isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <User
                      size={15}
                      className="text-white/60"
                    />
                  </div>
                )}

              </div>
            );
          })}

          {/* =================================================
              TYPING
              ================================================= */}

          {isStreaming &&
            messages[
              messages.length - 1
            ]?.role === "user" && (
              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Sparkles
                    size={15}
                    className="text-white/70"
                  />
                </div>

                <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.045] px-4 py-3">

                  <div className="flex gap-1">

                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />

                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                      style={{
                        animationDelay:
                          "120ms",
                      }}
                    />

                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                      style={{
                        animationDelay:
                          "240ms",
                      }}
                    />

                  </div>

                </div>

              </div>
            )}

          <div ref={messagesEndRef} />

        </div>

      </main>

      {/* =================================================
          SUGGESTIONS
          ================================================= */}

      {messages.length <= 1 && (
        <div className="shrink-0 px-5 pb-3">

          <div className="mx-auto max-w-2xl">

            <div className="mb-2 flex items-center gap-2 text-[11px] text-white/30">
              <Sparkles size={12} />
              Suggested questions
            </div>

            <div className="flex flex-wrap gap-2">

              {suggestions.map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      sendMessage(suggestion)
                    }
                    disabled={isStreaming}
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.035]
                      px-3
                      py-1.5
                      text-xs
                      text-white/50
                      transition
                      hover:border-white/20
                      hover:bg-white/[0.08]
                      hover:text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    {suggestion}
                  </button>
                ),
              )}

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          INPUT
          ================================================= */}

      <footer className="shrink-0 border-t border-white/10 p-4">

        <div className="mx-auto max-w-2xl">

          <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.045] p-2 focus-within:border-white/20">

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask me about Arnab..."
              rows={1}
              className="
                max-h-28
                min-h-10
                flex-1
                resize-none
                bg-transparent
                px-3
                py-2.5
                text-sm
                text-white
                outline-none
                placeholder:text-white/25
              "
            />

            {isStreaming ? (
              <button
                type="button"
                onClick={stopStreaming}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/15
                  bg-white/10
                  text-white
                  transition
                  hover:bg-white/20
                "
                title="Stop generating (Esc)"
              >
                <Square
                  size={13}
                  fill="currentColor"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-black
                  transition
                  hover:bg-white/90
                  disabled:cursor-not-allowed
                  disabled:opacity-20
                "
                title="Send"
              >
                <Send size={16} />
              </button>
            )}

          </div>

          <p className="mt-2 text-center text-[10px] text-white/20">
            {isStreaming
              ? "Replying — you can minimize this window, the answer keeps coming."
              : "Arnab's Portfolio Assistant"}
          </p>

        </div>

      </footer>

    </div>
  );
}
