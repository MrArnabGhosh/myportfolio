"use client";

import {
  Bot,
  Send,
  Sparkles,
  User,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const suggestions = [
  "Tell me about Arnab",
  "What are Arnab's skills?",
  "Show me Arnab's projects",
  "What is Arnab's experience?",
];

export default function AIAssistantApp() {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: 1,
        role: "assistant",
        content:
          "Hi! 👋 I'm Arnab's portfolio assistant. How can I help you?",
      },
    ]);

  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // =====================================================
  // SEND MESSAGE - STREAMING
  // =====================================================

  const sendMessage = async (text?: string) => {
    const message = (text ?? input).trim();

    if (!message || isTyping) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    const history = messages.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    const assistantId = Date.now() + 1;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message,
          history,
        }),
      });

      if (!response.ok) {
        const errorText =
          await response.text();

        let errorMessage =
          "Gemini request failed.";

        try {
          const errorData =
            JSON.parse(errorText);

          errorMessage =
            errorData?.error ||
            errorMessage;
        } catch {
          if (errorText) {
            errorMessage = errorText;
          }
        }

        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error(
          "Streaming is not supported by this response.",
        );
      }

      // ---------------------------------------------------
      // CREATE EMPTY ASSISTANT MESSAGE
      // ---------------------------------------------------

      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          content: "",
        },
      ]);

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let fullResponse = "";

      // ---------------------------------------------------
      // READ STREAM
      // ---------------------------------------------------

      while (true) {
        const { value, done } =
          await reader.read();

        if (done) {
          break;
        }

        const chunk =
          decoder.decode(value, {
            stream: true,
          });

        fullResponse += chunk;

        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  content: fullResponse,
                }
              : item,
          ),
        );
      }

      // Flush remaining decoder content
      const finalChunk =
        decoder.decode();

      if (finalChunk) {
        fullResponse += finalChunk;

        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  content: fullResponse,
                }
              : item,
          ),
        );
      }

      if (!fullResponse.trim()) {
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  content:
                    "Gemini returned an empty response.",
                }
              : item,
          ),
        );
      }
    } catch (error) {
      console.error(
        "AI Assistant error:",
        error,
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setMessages((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          content:
            `Sorry, I couldn't get an answer right now.\n\n${errorMessage}`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
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
    }
  };

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const clearChat = () => {
    if (isTyping) {
      return;
    }

    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Chat cleared. What would you like to know about Arnab?",
      },
    ]);
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

              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

              <span className="text-[11px] text-white/35">
                Online
              </span>

            </div>

          </div>

        </div>

        <button
          type="button"
          onClick={clearChat}
          disabled={isTyping}
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
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
          title="Clear chat"
        >
          <Trash2 size={15} />
        </button>

      </header>

      {/* =================================================
          MESSAGES
          ================================================= */}

      <main className="min-h-0 flex-1 overflow-y-auto px-5 py-5">

        <div className="mx-auto max-w-2xl space-y-5">

          {messages.map((message) => {

            const isUser =
              message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${
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
                    whitespace-pre-wrap
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-6
                    ${
                      isUser
                        ? "rounded-br-md bg-white text-black"
                        : "rounded-bl-md border border-white/10 bg-white/[0.045] text-white/70"
                    }
                  `}
                >
                  {message.content}
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

          {isTyping &&
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

      {messages.length === 1 && (
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
                      sendMessage(
                        suggestion,
                      )
                    }
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
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask me about Arnab..."
              rows={1}
              disabled={isTyping}
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
                disabled:opacity-50
              "
            />

            <button
              type="button"
              onClick={() =>
                sendMessage()
              }
              disabled={
                !input.trim() ||
                isTyping
              }
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

          </div>

          <p className="mt-2 text-center text-[10px] text-white/20">
            Arnab&apos;s Portfolio Assistant
          </p>

        </div>

      </footer>

    </div>
  );
}