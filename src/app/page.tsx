"use client";
import { useState, useEffect, useRef } from "react";
import ParticleText from "@/components/ParticleText";

const aiShowcase = [
  {
    title: "Custom Websites",
    subtitle: "Your online presence, rebuilt",
    desc: "Fully custom websites designed to convert visitors into customers. Not templates. Not drag-and-drop builders. Every page handcrafted for your brand — clean, modern, mobile-first, and fast. Most agencies charge $3,000+. We deliver the same quality in days, not weeks, at a fraction of the cost.",
    stat: "3-5",
    statLabel: "days from concept to live",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    accent: "violet",
  },
  {
    title: "AI Chatbots",
    subtitle: "Your always-on team member",
    desc: "Add an intelligent chatbot to your new site that knows your business inside and out. It answers customer questions, qualifies leads, and books appointments — 24/7. Trained on your products, your policies, your voice.",
    stat: "80%",
    statLabel: "of inquiries resolved instantly",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    accent: "blue",
  },
  {
    title: "AI Content Systems",
    subtitle: "Your voice, amplified",
    desc: "We build systems that generate social media posts, blog articles, and email campaigns in your brand voice — not generic AI filler, but content that sounds like your team wrote it. A full month of output in minutes.",
    stat: "3 min",
    statLabel: "to produce 30 days of content",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    accent: "amber",
  },
  {
    title: "AI Automation",
    subtitle: "Your business on autopilot",
    desc: "We connect your tools and build intelligent workflows that handle the busywork — lead routing, follow-up emails, data processing, CRM updates, report generation. You focus on growth. The system handles the rest.",
    stat: "20+",
    statLabel: "hours reclaimed every week",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    accent: "emerald",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "It starts with a conversation. You share what's costing you time, money, or both — and we map out exactly where AI creates the most impact." },
  { step: "02", title: "Build", desc: "Our team architects and develops your custom AI system. You see progress at every stage and shape the outcome with real-time collaboration." },
  { step: "03", title: "Launch", desc: "We deliver a production-ready system, walk your team through everything, and provide 30 days of dedicated support post-launch." },
];

const faqs = [
  { q: "Do we need to understand AI?", a: "Not at all. You describe the problem, we build the solution. Everything is explained in plain English — no technical knowledge required." },
  { q: "How long does it take?", a: "Most projects are delivered in 3-10 days depending on complexity. Chatbots typically take 5-7 days. Content systems can be ready in 3." },
  { q: "What if it doesn't work?", a: "Every project comes with 30 days of support. If something breaks, we fix it. If you're not satisfied, we make it right." },
  { q: "Can AI integrate with our existing tools?", a: "If your tool has an API (most do), we can connect AI to it. Shopify, HubSpot, Salesforce, WordPress, Zapier — all supported." },
  { q: "Is our data safe?", a: "Absolutely. We use encrypted connections, never store credentials beyond what's needed, and sign an NDA on every project." },
  { q: "How do we get started?", a: "Book a free consultation. We'll discuss your business, identify where AI can make the biggest impact, and put together a custom plan. No pressure, no obligation." },
];

function StickyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(rawProgress);

      const sectionCount = aiShowcase.length;
      const idx = Math.min(sectionCount - 1, Math.floor(rawProgress * sectionCount));
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = aiShowcase[activeIndex];
  const sectionProgress = (progress * aiShowcase.length) % 1;
  const fadeIn = Math.min(1, sectionProgress * 4);
  const fadeOut = sectionProgress > 0.85 ? Math.max(0, 1 - (sectionProgress - 0.85) * 6.67) : 1;
  const textOpacity = activeIndex === aiShowcase.length - 1 ? fadeIn : fadeIn * fadeOut;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${aiShowcase.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Gradient mesh background that shifts per section */}
        <div className="absolute inset-0 transition-all duration-700">
          {/* Base gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-[0.07] transition-all duration-700`} />
          {/* Mesh blobs */}
          <div className={`absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${current.gradient} opacity-[0.08] blur-[120px] transition-all duration-700`} />
          <div className={`absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr ${current.gradient} opacity-[0.06] blur-[100px] transition-all duration-700`} />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-6xl w-full mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <div
              className="transition-all duration-500"
              style={{ opacity: textOpacity, transform: `translateY(${(1 - textOpacity) * 24}px)` }}
            >
              <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-4">
                0{activeIndex + 1} / 0{aiShowcase.length} — {current.subtitle}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {current.title}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {current.desc}
              </p>
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${current.gradient} text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition shadow-lg`}
              >
                Get Started <span>→</span>
              </a>
            </div>

            {/* Right — Stat */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="transition-all duration-500"
                style={{ opacity: textOpacity, transform: `scale(${0.85 + textOpacity * 0.15})` }}
              >
                <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-12 text-center w-full max-w-sm">
                  <p className={`text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b ${current.gradient} mb-3 leading-none`}>
                    {current.stat}
                  </p>
                  <p className="text-gray-400 text-sm tracking-wide uppercase font-mono">{current.statLabel}</p>
                  <div className={`mt-6 w-16 h-1 rounded-full bg-gradient-to-r ${current.gradient} opacity-40 mx-auto`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {aiShowcase.map((item, i) => (
            <div
              key={i}
              className={`w-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? `h-8 bg-gradient-to-b ${item.gradient}`
                  : "h-2 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100 z-20">
          <div
            className={`h-full bg-gradient-to-r ${current.gradient} transition-all duration-100`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {activeIndex === 0 && progress < 0.05 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-mono">Keep scrolling</p>
            <span className="text-gray-400">↓</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", business: "", services: [] as string[], message: "", website: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-white">
      {/* KREATE Particle Intro */}
      <ParticleText />

      {/* Nav */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm" : "bg-transparent"
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between h-16 items-center">
          <a href="#" className="text-xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Kreator</span> AI
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-gray-500 hover:text-gray-900 transition">Services</a>
            <a href="#process" className="text-sm text-gray-500 hover:text-gray-900 transition">Process</a>
            <a href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition">FAQ</a>
            <a href="#contact" className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
              Get Started
            </a>
          </div>
          <button className="md:hidden text-gray-900 text-xl" onClick={() => setMobileNav(!mobileNav)}>
            {mobileNav ? "✕" : "☰"}
          </button>
        </div>
        {mobileNav && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
            <a href="#services" className="text-gray-500 hover:text-gray-900" onClick={() => setMobileNav(false)}>Services</a>
            <a href="#process" className="text-gray-500 hover:text-gray-900" onClick={() => setMobileNav(false)}>Process</a>
            <a href="#faq" className="text-gray-500 hover:text-gray-900" onClick={() => setMobileNav(false)}>FAQ</a>
            <a href="#contact" className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-medium text-center" onClick={() => setMobileNav(false)}>Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-400/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-400/5 to-pink-400/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="hero-badge inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm font-mono mb-8 shadow-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Accepting new projects
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="hero-line-1 block text-gray-900">A better website.</span>
            <span className="hero-line-2 block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">Powered by AI.</span>
          </h1>
          <p className="hero-desc text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            We build custom websites that look premium, load fast, and convert visitors into customers —
            then supercharge them with AI chatbots, content systems, and automation. Delivered in days. Not weeks.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-gray-900 text-white px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-gray-800 transition shadow-lg"
            >
              Book a Free Consultation
            </a>
            <a
              href="#services"
              className="border border-gray-200 text-gray-700 px-8 py-3.5 rounded-lg font-semibold text-lg hover:bg-gray-50 transition"
            >
              Explore Capabilities
            </a>
          </div>
          <p className="hero-sub text-sm text-gray-400 mt-8 font-mono">Fast delivery &middot; 30 days post-launch support &middot; NDA on every project</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-mono">Scroll to explore</p>
          <span className="text-gray-400">↓</span>
        </div>
      </section>

      {/* Sticky Showcase */}
      <div id="services">
        <StickyShowcase />
      </div>

      {/* Process */}
      <section id="process" className="py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="reveal text-violet-600 text-sm font-mono uppercase tracking-widest mb-4">Our Process</p>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-bold text-gray-900 mb-4">Three Steps. Zero Friction.</h2>
            <p className="reveal reveal-delay-2 text-gray-500">From first conversation to a live AI system — streamlined.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {process.map((p, i) => (
              <div key={p.step} className={`reveal reveal-delay-${i + 1} relative p-10 ${i < 2 ? "md:border-r border-gray-200" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-mono text-sm font-bold shadow-lg shadow-violet-200">
                    {p.step}
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-violet-200 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 px-4 relative overflow-hidden bg-white">
        {/* Gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/5 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-400/10 to-purple-400/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="reveal text-violet-600 text-sm font-mono uppercase tracking-widest mb-4">Measurable Impact</p>
          <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-bold text-gray-900 mb-16">What Changes When AI Takes Over</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { before: "An outdated website losing you customers", after: "A modern, custom site that actually converts", savings: "More leads, more trust", gradient: "from-violet-500 to-fuchsia-500" },
              { before: "Paying $3,000+ and waiting 6 weeks", after: "Premium quality delivered in 3-5 days", savings: "Fraction of the cost", gradient: "from-blue-500 to-cyan-500" },
              { before: "Answering the same questions all day", after: "AI chatbot handles 80% of inquiries on your site", savings: "15+ hrs/week freed", gradient: "from-amber-500 to-orange-500" },
            ].map((item, i) => (
              <div key={i} className="reveal reveal-delay-1 bg-white rounded-2xl border border-gray-100 p-6 text-left shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all">
                <div className="flex items-start gap-2 mb-4">
                  <span className="text-gray-300 mt-1 text-xs">BEFORE</span>
                </div>
                <p className="text-sm text-gray-400 line-through mb-5">{item.before}</p>
                <div className="flex items-start gap-2 mb-4">
                  <span className="text-emerald-500 mt-1 text-xs font-medium">AFTER</span>
                </div>
                <p className="text-sm text-gray-900 font-medium mb-5">{item.after}</p>
                <div className={`h-1 w-full rounded-full bg-gradient-to-r ${item.gradient} opacity-30 mb-3`} />
                <p className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}>{item.savings}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-violet-600 text-sm font-mono uppercase tracking-widest mb-4">Right Fit</p>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who We Work With</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-emerald-600 mb-5 text-lg">Great fit if you:</h3>
              <ul className="space-y-3">
                {[
                  "Your website is outdated or embarrassing",
                  "You're using a DIY builder and it shows",
                  "You're losing customers because your site doesn't convert",
                  "You want a professional site without the agency price tag",
                  "You want AI features like chatbots built right in",
                ].map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-3">
                    <span className="text-emerald-500 mt-0.5 font-bold">+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal reveal-delay-1 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-400 mb-5 text-lg">Not the right fit if:</h3>
              <ul className="space-y-3">
                {[
                  "You're a large enterprise with a dev team",
                  "You want to build the site yourself",
                  "You just need a one-page Linktree-style page",
                  "You don't have a business yet",
                  "You need it in 24 hours",
                ].map((item, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-3">
                    <span className="mt-0.5">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="reveal text-violet-600 text-sm font-mono uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="reveal reveal-delay-1 text-3xl md:text-4xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="reveal border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <span className="text-gray-300 ml-4 text-xl">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-600/10 to-cyan-600/5 blur-[100px]" />

        <div className="relative z-10 max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-violet-400 text-sm font-mono uppercase tracking-widest mb-4">Start Here</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let&apos;s Build Something</h2>
            <p className="text-gray-400">Tell us about your business. We&apos;ll respond within 24 hours with ideas for your new site.</p>
          </div>

          {submitted ? (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Message received.</h3>
              <p className="text-gray-400 mb-2">We&apos;ll get back to you within 24 hours at <strong className="text-white">{formData.email}</strong>.</p>
              <p className="text-sm text-gray-600">Think about what eats up the most time — that&apos;s where AI makes the biggest impact.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Name *</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Business Name</label>
                  <input
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    placeholder="Your business name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Current Website</label>
                  <input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="www.yoursite.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3">What are you interested in? *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "website", label: "Custom Website" },
                    { id: "redesign", label: "Website Redesign" },
                    { id: "landing", label: "Landing Page" },
                    { id: "chatbot", label: "AI Chatbot" },
                    { id: "content", label: "AI Content System" },
                    { id: "automation", label: "AI Automation" },
                  ].map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.services.includes(service.id)
                          ? "border-violet-500 bg-violet-500/10 text-white"
                          : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, services: [...formData.services, service.id] });
                          } else {
                            setFormData({ ...formData, services: formData.services.filter((s) => s !== service.id) });
                          }
                        }}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        formData.services.includes(service.id)
                          ? "border-violet-500 bg-violet-500"
                          : "border-gray-600"
                      }`}>
                        {formData.services.includes(service.id) && (
                          <span className="text-white text-xs">&#10003;</span>
                        )}
                      </div>
                      <span className="text-sm">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Anything else we should know?</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Timeline, budget range, specific features you need, or any other details..."
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none h-24 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={formData.services.length === 0}
                className={`w-full py-3.5 rounded-lg font-semibold text-lg transition shadow-lg ${
                  formData.services.length > 0
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:opacity-90 shadow-violet-600/20"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed shadow-none"
                }`}
              >
                Book a Free Consultation
              </button>
              <p className="text-xs text-gray-600 text-center">No commitment. No pressure. We&apos;ll reach out within 24 hours.</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold">Kreator</span> <span className="font-bold text-gray-600">AI</span> &middot; Custom AI systems for your business
          </p>
          <div className="flex gap-6">
            <a href="#services" className="text-sm text-gray-400 hover:text-gray-600 transition">Services</a>
            <a href="#process" className="text-sm text-gray-400 hover:text-gray-600 transition">Process</a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-gray-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
