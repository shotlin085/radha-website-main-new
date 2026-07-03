"use client";

import { useEffect, useRef, useState } from "react";
import { AgentChat, createAgentChat } from "@21st-sdk/nextjs";
import { useChat } from "@ai-sdk/react";
import { MessageCircle, X } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import theme from "../../../app/theme.json";

// Module-level: one persistent chat connection for the whole site, per
// the 21st SDK quickstart pattern. Requires the agent to be deployed —
// see the TODO in src/agent.ts for the manual CLI steps.
const chat = createAgentChat({
  agent: "radha-assistant",
  tokenUrl: "/api/an-token",
});

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { messages, status, stop, error, sendMessage } = useChat({ chat });

  useEffect(() => {
    if (!open) return;

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        aria-controls="radha-chat-panel"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:scale-105 tablet:bottom-8 tablet:right-8"
      >
        <Icon icon={open ? X : MessageCircle} size={24} />
      </button>

      {open ? (
        <div
          id="radha-chat-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="RADHA assistant chat"
          className="fixed bottom-24 right-5 z-50 h-[70vh] max-h-[600px] w-[calc(100vw-2.5rem)] max-w-[420px] overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-2xl tablet:bottom-28 tablet:right-8"
        >
          <AgentChat
            messages={messages}
            onSend={(message) => sendMessage({ text: message.content })}
            status={status}
            onStop={stop}
            error={error}
            theme={theme}
          />
        </div>
      ) : null}
    </>
  );
}
