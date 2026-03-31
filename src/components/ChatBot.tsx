"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "bot" | "user";
  text: string;
  options?: string[];
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !hasGreeted) {
      setMessages([
        {
          role: "bot",
          text: "Welcome to Kreator AI. We build custom websites powered by AI — fast, affordable, and designed to convert.\n\nWhat can we help you with?",
          options: ["I need a new website", "What services do you offer?", "How does it work?"],
        },
      ]);
      setHasGreeted(true);
      setShowPulse(false);
    }
  }, [open, hasGreeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setShowPulse(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [open]);

  async function sendMessage(text: string) {
    const userMsg: Message = { role: "user", text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();
      const botMsg: Message = { role: "bot", text: data.text };

      // Add contextual quick replies
      const lower = text.toLowerCase();
      if (lower.match(/website|site|redesign|landing/)) {
        botMsg.options = ["How long does it take?", "Book a consultation"];
      } else if (lower.match(/chatbot|automation|content/)) {
        botMsg.options = ["Tell me more", "Book a consultation"];
      } else if (lower.match(/price|cost|how much|budget/)) {
        botMsg.options = ["Book a free consultation", "What do you build?"];
      } else if (lower.match(/get started|book|call|consult|ready/)) {
        botMsg.options = ["Fill out the form below"];
      } else if (!botMsg.options) {
        botMsg.options = ["I need a website", "What do you offer?", "Book a consultation"];
      }

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Apologies — something went wrong on our end. Please try again or fill out the contact form below and we'll get back to you within 24 hours." },
      ]);
    }

    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
  }

  function handleOptionClick(option: string) {
    if (loading) return;
    if (option === "Fill out the form below") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
      return;
    }
    if (option === "Book a consultation" || option === "Book a free consultation") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
      return;
    }
    sendMessage(option);
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          open ? "bg-gray-800 hover:bg-gray-700" : "bg-violet-600 hover:bg-violet-700"
        }`}
      >
        {open ? (
          <span className="text-white text-xl">✕</span>
        ) : (
          <>
            <span className="text-white text-2xl">💬</span>
            {showPulse && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            )}
          </>
        )}
      </button>

      {/* Teaser bubble */}
      {!open && showPulse && (
        <div
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-lg border border-gray-200 p-3 max-w-[240px] cursor-pointer hover:shadow-xl transition animate-fade-in"
        >
          <p className="text-sm text-gray-700">Got questions about AI for your business? We can help.</p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-violet-600 text-white px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">K</div>
              <div>
                <p className="font-semibold text-sm">Kreator AI</p>
                <p className="text-xs text-violet-200">
                  {loading ? "Typing..." : "Typically replies instantly"}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-h-[320px]">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-violet-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                {/* Quick reply options */}
                {msg.role === "bot" && msg.options && i === messages.length - 1 && !loading && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="text-xs bg-white border border-violet-200 text-violet-700 px-3 py-1.5 rounded-full hover:bg-violet-50 transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-gray-400">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 px-4 py-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask us anything..."
              disabled={loading}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-900 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-violet-600 text-white w-9 h-9 rounded-lg flex items-center justify-center hover:bg-violet-700 transition shrink-0 disabled:opacity-50"
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </>
  );
}
