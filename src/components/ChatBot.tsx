"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "bot" | "user";
  text: string;
  options?: string[];
}

const knowledgeBase: Record<string, string> = {
  // Services
  "chatbot": "We build custom AI chatbots trained on your business data. They handle customer questions, qualify leads, and book appointments — 24/7. Typically delivered in 5-7 days. Want to book a free consultation to scope it out?",
  "automation": "We build AI automation workflows that connect your tools and handle the busywork — lead routing, follow-ups, data processing, CRM updates. Delivered in 3-7 days. What tasks are eating up your time?",
  "content": "We build AI content systems that generate social media posts, blog articles, and email campaigns in your brand voice. A full month of content in minutes. Delivered in 3-5 days. Want to book a call to discuss?",
  "website": "We build high-converting websites and landing pages — clean, modern, mobile-first, fully custom to your brand. Delivered in 3-5 days. Want to book a consultation?",
  "landing": "We build high-converting websites and landing pages — clean, modern, mobile-first, fully custom to your brand. Delivered in 3-5 days. Want to book a consultation?",

  // Pricing
  "price": "Every project is custom, so pricing depends on what you need. The best way to get a clear picture is to book a free consultation — we'll scope it out together and give you an exact number. No surprises. Want to book a call?",
  "cost": "Every project is custom, so pricing depends on what you need. The best way to get a clear picture is to book a free consultation — we'll scope it out together and give you an exact number. No surprises. Want to book a call?",

  // Timeline
  "how long": "Most projects are delivered in 3-10 days depending on complexity. Chatbots take about 5-7 days. Content systems can be done in 3. Automations vary based on how many tools we're connecting. What are you looking to build?",
  "timeline": "Most projects are delivered in 3-10 days depending on complexity. Chatbots take about 5-7 days. Content systems can be done in 3. Automations vary based on how many tools we're connecting. What are you looking to build?",
  "fast": "Most projects are delivered in 3-10 days depending on complexity. Chatbots take about 5-7 days. Content systems can be done in 3. Automations vary based on how many tools we're connecting. What are you looking to build?",

  // Trust
  "safe": "Absolutely. We use encrypted connections, never store credentials beyond what's needed, and sign an NDA on every project. Your data stays yours. Any other concerns?",
  "security": "Absolutely. We use encrypted connections, never store credentials beyond what's needed, and sign an NDA on every project. Your data stays yours. Any other concerns?",
  "trust": "Every project comes with 30 days of support. If something breaks, we fix it. If you're not satisfied, we make it right. We also sign an NDA on every project to protect your data. Want to see how our process works?",

  // Process
  "how does it work": "It's 3 simple steps:\n\n1. You tell us what's slowing you down\n2. We design and build your custom AI system\n3. We deliver it, walk your team through it, and support you for 30 days\n\nWant to book a free consultation to get started?",
  "process": "It's 3 simple steps:\n\n1. You tell us what's slowing you down\n2. We design and build your custom AI system\n3. We deliver it, walk your team through it, and support you for 30 days\n\nWant to book a free consultation to get started?",

  // About
  "who are you": "We're Kreator AI — we build custom websites and AI systems for small businesses. Websites, chatbots, content systems, automations. We handle the tech so you don't have to. What does your business do?",
  "about": "We're Kreator AI — we build custom websites and AI systems for small businesses. Websites, chatbots, content systems, automations. We handle the tech so you don't have to. What does your business do?",

  // Support
  "support": "Every project comes with 30 days of free support after delivery. If something breaks or needs tweaking, we've got you. After that, ongoing support plans are available. Anything else you want to know?",

  // General
  "help": "We'd love to help! Here's what we can tell you about:\n\nAI Chatbots\nAI Content Systems\nWebsites & Landing Pages\nAI Automation\nPricing\nTimelines\nSecurity\n\nOr just tell us what your business needs and we'll point you in the right direction.",
  "hi": "Welcome to Kreator AI. We build custom websites and AI systems for businesses — fast, affordable, and designed to convert. What does your business do?",
  "hello": "Welcome to Kreator AI. We build custom websites and AI systems for businesses — fast, affordable, and designed to convert. What does your business do?",
  "hey": "Welcome to Kreator AI. We build custom websites and AI systems for businesses — fast, affordable, and designed to convert. What does your business do?",
  "new website": "We'd love to help! We build fully custom websites — not templates — designed specifically for your brand. Mobile-first, fast-loading, built to convert visitors into customers. Typically delivered in 3-5 days. Want to book a free consultation so we can scope it out?",
  "redesign": "Absolutely. We take outdated or underperforming sites and rebuild them from scratch — modern design, fast load times, mobile-friendly, with optional AI features like chatbots built right in. Want to book a call to discuss your current site?",
  "need a website": "You're in the right place. We build custom websites designed to make your business look professional and convert visitors into customers. No templates, no DIY builders — fully custom. Delivered in days. Want to book a free consultation?",
};

function findResponse(input: string): string {
  const lower = input.toLowerCase();

  // Check for keyword matches
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  // Check for specific patterns
  if (lower.match(/get started|start|begin|ready|book|call|consult/)) {
    return "Let's do it! 🚀 Scroll down to the contact form and tell me about your business — or just type your email here and I'll reach out within 24 hours.";
  }

  if (lower.match(/yes|yeah|sure|interested|tell me more|sounds good|ok/)) {
    return "Awesome! The easiest next step is to fill out the contact form below — just tell me what's slowing your business down and I'll get back to you within 24 hours with a plan. Or if you have more questions, fire away!";
  }

  if (lower.match(/no|not really|maybe later|just looking/)) {
    return "No pressure at all. Feel free to look around the site, and if you ever want to chat about what AI could do for your business, I'm right here. 👋";
  }

  if (lower.match(/thanks|thank you|appreciate/)) {
    return "Anytime! If you think of anything else, I'm right here. Good luck with your business! 🙌";
  }

  if (lower.includes("@") && lower.includes(".")) {
    return "Got your email! I'll reach out within 24 hours to chat about what we can build for you. Talk soon! 🙌";
  }

  // Default
  return "Great question! We're best at answering things about our websites, AI services, and process. For a detailed conversation, book a free consultation through the form below — we'll respond within 24 hours. Or ask us about:\n\nCustom Websites\nAI Chatbots\nContent Systems\nAutomation";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !hasGreeted) {
      setMessages([
        {
          role: "bot",
          text: "Welcome to Kreator AI. We build custom websites powered by AI — fast, affordable, and designed to convert.\n\nWhat can we help you with?",
          options: ["I need a new website", "What else do you build?", "How does it work?"],
        },
      ]);
      setHasGreeted(true);
      setShowPulse(false);
    }
  }, [open, hasGreeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-open after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) setShowPulse(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [open]);

  function sendMessage(text: string) {
    const userMsg: Message = { role: "user", text };
    const botResponse = findResponse(text);
    const botMsg: Message = { role: "bot", text: botResponse };

    // Add follow-up options based on context
    const lower = text.toLowerCase();
    if (lower.match(/price|cost|how much/)) {
      botMsg.options = ["Tell me about chatbots", "Tell me about automation", "I want to get started"];
    } else if (lower.match(/chatbot|automation|content|integration/)) {
      botMsg.options = ["How much does it cost?", "How long does it take?", "I want to get started"];
    } else if (lower.match(/how does it work|process|timeline/)) {
      botMsg.options = ["What services do you offer?", "How much does it cost?", "I want to get started"];
    }

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  }

  function handleOptionClick(option: string) {
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
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
              <div>
                <p className="font-semibold text-sm">Kreator AI</p>
                <p className="text-xs text-violet-200">Typically replies instantly</p>
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
                {msg.role === "bot" && msg.options && i === messages.length - 1 && (
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 px-4 py-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-900"
            />
            <button
              type="submit"
              className="bg-violet-600 text-white w-9 h-9 rounded-lg flex items-center justify-center hover:bg-violet-700 transition shrink-0"
            >
              ↑
            </button>
          </form>
        </div>
      )}
    </>
  );
}
