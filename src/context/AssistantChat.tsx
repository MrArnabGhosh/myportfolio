"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// =======================================================
// TYPES
// =======================================================

export interface AssistantMessage {
  id: string;
  role: "assistant" | "user";
  content: string;

  /*
   * 0 means "no timestamp" (the seeded greeting),
   * which keeps the first render deterministic.
   */
  createdAt: number;

  isError?: boolean;
}

interface AssistantChatContextType {
  messages: AssistantMessage[];

  input: string;
  setInput: (value: string) => void;

  isStreaming: boolean;

  unreadCount: number;

  sendMessage: (text?: string) => void;
  stopStreaming: () => void;
  clearChat: () => void;

  /*
   * The assistant window reports whether it is
   * on screen so replies that arrive while it is
   * minimized (or closed) can raise a Dock badge.
   */
  setAssistantVisible: (visible: boolean) => void;
}

// =======================================================
// CONSTANTS
// =======================================================

const STORAGE_KEY = "portfolio-assistant-chat";

const MAX_STORED_MESSAGES = 60;

const GREETING =
  "Hi! 👋 I'm Arnab's portfolio assistant. Ask me about his skills, projects or experience.";

function createGreeting(): AssistantMessage {
  return {
    id: "greeting",
    role: "assistant",
    content: GREETING,
    createdAt: 0,
  };
}

// =======================================================
// CONTEXT
// =======================================================

const AssistantChatContext =
  createContext<AssistantChatContextType | null>(
    null,
  );

export function AssistantChatProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [messages, setMessages] = useState<
    AssistantMessage[]
  >(() => [createGreeting()]);

  const [input, setInputState] = useState("");

  const [isStreaming, setIsStreaming] =
    useState(false);

  const [unreadCount, setUnreadCount] =
    useState(0);

  // =====================================================
  // REFS
  // =====================================================

  const inputRef = useRef("");

  const messagesRef = useRef<AssistantMessage[]>(
    messages,
  );

  const streamingRef = useRef(false);

  const abortRef = useRef<AbortController | null>(
    null,
  );

  const isVisibleRef = useRef(false);

  const messageCounter = useRef(0);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // =====================================================
  // MESSAGE ID
  // =====================================================

  const createMessageId = useCallback(() => {
    messageCounter.current += 1;

    return `m-${Date.now()}-${messageCounter.current}`;
  }, []);

  // =====================================================
  // INPUT (kept here so drafts survive minimize/close)
  // =====================================================

  const setInput = useCallback(
    (value: string) => {
      inputRef.current = value;

      setInputState(value);
    },
    [],
  );

  // =====================================================
  // LOAD SAVED CONVERSATION
  // =====================================================

  useEffect(() => {
    let saved: string | null = null;

    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }

    if (!saved) {
      return;
    }

    let restored: AssistantMessage[] = [];

    try {
      const parsed = JSON.parse(saved);

      if (
        !Array.isArray(parsed) ||
        parsed.length === 0
      ) {
        return;
      }

      restored = parsed
        .filter(
          (item) =>
            item &&
            (item.role === "user" ||
              item.role === "assistant") &&
            typeof item.content === "string",
        )
        .map(
          (item, index): AssistantMessage => ({
            id:
              typeof item.id === "string"
                ? item.id
                : `restored-${index}`,
            role: item.role,
            content: item.content,
            createdAt:
              typeof item.createdAt === "number"
                ? item.createdAt
                : 0,
            isError: item.isError === true,
          }),
        );

    } catch {
      console.warn(
        "Unable to restore assistant conversation.",
      );

      return;
    }

    if (restored.length === 0) {
      return;
    }

    /*
     * localStorage cannot be read while rendering
     * (it would break hydration), so the restore
     * is handed to the next frame instead of being
     * applied straight inside the effect.
     */

    const frame = requestAnimationFrame(() => {
      setMessages(restored);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  // =====================================================
  // SAVE CONVERSATION
  // =====================================================

  useEffect(() => {
    /*
     * Only persist once the stream settles so a
     * reply is not written on every chunk.
     */

    if (isStreaming) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          messages.slice(-MAX_STORED_MESSAGES),
        ),
      );
    } catch {
      /* Storage full or unavailable */
    }
  }, [messages, isStreaming]);

  // =====================================================
  // VISIBILITY
  // =====================================================

  const setAssistantVisible = useCallback(
    (visible: boolean) => {
      isVisibleRef.current = visible;

      if (visible) {
        setUnreadCount(0);
      }
    },
    [],
  );

  // =====================================================
  // STOP STREAMING
  // =====================================================

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // =====================================================
  // SEND MESSAGE
  // =====================================================
  //
  // Lives in the provider, so a reply keeps
  // streaming while the window is minimized
  // or closed — like a real background app.
  //
  // =====================================================

  const sendMessage = useCallback(
    (text?: string) => {
      const message = (
        text ?? inputRef.current
      ).trim();

      if (!message || streamingRef.current) {
        return;
      }

      const history = messagesRef.current
        .filter(
          (item) =>
            !item.isError &&
            item.content.trim().length > 0,
        )
        .map((item) => ({
          role: item.role,
          content: item.content,
        }));

      const userMessage: AssistantMessage = {
        id: createMessageId(),
        role: "user",
        content: message,
        createdAt: Date.now(),
      };

      const assistantId = createMessageId();

      setMessages((current) => [
        ...current,
        userMessage,
      ]);

      setInput("");

      streamingRef.current = true;
      setIsStreaming(true);

      const controller = new AbortController();

      abortRef.current = controller;

      const updateAssistant = (
        content: string,
        isError = false,
      ) => {
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? {
                  ...item,
                  content,
                  isError,
                }
              : item,
          ),
        );
      };

      const run = async () => {
        let fullResponse = "";

        let assistantAdded = false;

        try {
          const response = await fetch(
            "/api/chat",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                message,
                history,
              }),

              signal: controller.signal,
            },
          );

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

          setMessages((current) => [
            ...current,
            {
              id: assistantId,
              role: "assistant",
              content: "",
              createdAt: Date.now(),
            },
          ]);

          assistantAdded = true;

          const reader =
            response.body.getReader();

          const decoder = new TextDecoder();

          while (true) {
            const { value, done } =
              await reader.read();

            if (done) {
              break;
            }

            fullResponse += decoder.decode(
              value,
              {
                stream: true,
              },
            );

            updateAssistant(fullResponse);
          }

          const finalChunk = decoder.decode();

          if (finalChunk) {
            fullResponse += finalChunk;
          }

          if (!fullResponse.trim()) {
            updateAssistant(
              "Gemini returned an empty response.",
              true,
            );
          } else {
            updateAssistant(fullResponse);
          }
        } catch (error) {
          const wasAborted =
            error instanceof DOMException &&
            error.name === "AbortError";

          if (wasAborted) {
            /*
             * Keep whatever streamed in before
             * the visitor pressed stop.
             */

            if (assistantAdded) {
              updateAssistant(
                fullResponse.trim()
                  ? `${fullResponse}\n\n(stopped)`
                  : "(stopped)",
              );
            }
          } else {
            console.error(
              "AI Assistant error:",
              error,
            );

            const errorMessage =
              error instanceof Error
                ? error.message
                : "Something went wrong.";

            const content = `Sorry, I couldn't get an answer right now.\n\n${errorMessage}`;

            if (assistantAdded) {
              updateAssistant(content, true);
            } else {
              setMessages((current) => [
                ...current,
                {
                  id: assistantId,
                  role: "assistant",
                  content,
                  createdAt: Date.now(),
                  isError: true,
                },
              ]);
            }
          }
        } finally {
          streamingRef.current = false;
          setIsStreaming(false);

          abortRef.current = null;

          /*
           * The reply landed while the window was
           * minimized or closed → badge the Dock.
           */

          if (!isVisibleRef.current) {
            setUnreadCount(
              (current) => current + 1,
            );
          }
        }
      };

      void run();
    },
    [createMessageId, setInput],
  );

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const clearChat = useCallback(() => {
    abortRef.current?.abort();

    setMessages([createGreeting()]);

    setInput("");

    setUnreadCount(0);
  }, [setInput]);

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <AssistantChatContext.Provider
      value={{
        messages,

        input,
        setInput,

        isStreaming,

        unreadCount,

        sendMessage,
        stopStreaming,
        clearChat,

        setAssistantVisible,
      }}
    >
      {children}
    </AssistantChatContext.Provider>
  );
}

// =======================================================
// HOOK
// =======================================================

export function useAssistantChat() {
  const context = useContext(
    AssistantChatContext,
  );

  if (!context) {
    throw new Error(
      "useAssistantChat must be used inside AssistantChatProvider",
    );
  }

  return context;
}
