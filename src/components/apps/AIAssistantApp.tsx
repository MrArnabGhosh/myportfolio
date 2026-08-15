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

function getResponse(message: string) {
  const text = message.toLowerCase();

  if (
    text.includes("who") ||
    text.includes("about") ||
    text.includes("arnab")
  ) {
    return `Hi! I'm Arnab's portfolio assistant. Arnab Ghosh is a Software Engineer from Kolkata, India, with a B.Tech background in Computer Science and Engineering, specializing in Cyber Security. He works across full-stack development, backend engineering and cloud technologies.`;
  }

  if (
    text.includes("skill") ||
    text.includes("technology") ||
    text.includes("tech stack")
  ) {
    return `Arnab's technical skills include Java, Python, C/C++, JavaScript, TypeScript, React, Next.js, Node.js, Express.js, Django, REST APIs, MongoDB, PostgreSQL, SQL, AWS, Git/GitHub and Linux. He also has a strong foundation in DSA, DBMS, Operating Systems and Computer Networks.`;
  }

  if (
    text.includes("project") ||
    text.includes("projects")
  ) {
    return `Some of Arnab's key projects include CloudKeep, an AI Resume Builder, an AI Blog application, and a Secure Voting System built with Django and MongoDB.`;
  }

  if (
    text.includes("experience") ||
    text.includes("internship")
  ) {
    return `Arnab has internship experience in Cloud Computing and Backend Development. His experience includes AWS services such as EC2, S3 and IAM, as well as Django, MongoDB, authentication and backend application development.`;
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("hire")
  ) {
    return `You can contact Arnab through the Mail application in this portfolio. His email is ghosharnab460@gmail.com.`;
  }

  if (
    text.includes("aws") ||
    text.includes("cloud")
  ) {
    return `Arnab has hands-on cloud experience with AWS, particularly EC2, S3 and IAM. He has worked on deploying and managing secure, scalable cloud applications.`;
  }

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {
    return `Hey! 👋 I'm Arnab's AI portfolio assistant. Ask me about his skills, projects, experience, education or how to contact him.`;
  }

  return `I can tell you about Arnab's skills, projects, experience, education and contact information. Try asking something like "What projects has Arnab built?"`;
}

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

  const [input, setInput] =
    useState("");

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
  // SEND MESSAGE
  // =====================================================

  const sendMessage = (text?: string) => {
    const message =
      (text ?? input).trim();

    if (!message || isTyping) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getResponse(message),
      };

      setMessages((current) => [
        ...current,
        response,
      ]);

      setIsTyping(false);
    }, 700);
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
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Chat cleared. What would you like to know about Arnab?",
      },
    ]);
  };

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

          {/* Typing */}

          {isTyping && (
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
                      animationDelay: "120ms",
                    }}
                  />

                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                    style={{
                      animationDelay: "240ms",
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

            <button
              type="button"
              onClick={() => sendMessage()}
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