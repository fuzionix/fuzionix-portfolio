"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/app/constant";

function ServiceCell({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={`border-r border-b border-border flex flex-col justify-between hover:bg-ink/3 transition-colors duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* 01 — Color Tokens + UI Component Preview */
function DesignSystemVisual() {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);

  const swatches = [
    { token: "Ink",    bg: "bg-ink",                        label: "# 1A1A1A" },
    { token: "Ash",    bg: "bg-ash",                        label: "# 888888" },
    { token: "Border", bg: "bg-border",                     label: "# E5E5E5" },
    { token: "Paper",  bg: "bg-paper border border-border", label: "# F8F7F4" },
  ];

  return (
    <div className="flex flex-col gap-5 py-1">

      {/* Color Tokens */}
      <div>
        <p className="font-sans text-xs tracking-widest uppercase text-ash/50 mb-2.5">
          Tokens
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {swatches.map(({ token, bg, label }) => (
            <div key={token} className="flex flex-col gap-1.5">
              <div className={`h-10 w-full ${bg}`} />
              <div>
                <p className="font-sans text-xs font-medium text-ink leading-none">
                  {token}
                </p>
                <p className="font-sans text-xs text-ash/60 leading-snug">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border/60" />

      {/* Button Components */}
      <div>
        <p className="font-sans text-xs tracking-widest uppercase text-ash/50 mb-2.5">
          Buttons
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {/* Primary */}
          <motion.button
            onMouseEnter={() => setActiveBtn(0)}
            onMouseLeave={() => setActiveBtn(null)}
            className="relative px-4 py-2 text-xs font-sans font-medium tracking-wide bg-ink text-paper overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-ash/20"
              initial={{ x: "-100%" }}
              animate={{ x: activeBtn === 0 ? "0%" : "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative">Primary</span>
          </motion.button>

          {/* Secondary */}
          <motion.button
            onMouseEnter={() => setActiveBtn(1)}
            onMouseLeave={() => setActiveBtn(null)}
            className="relative px-4 py-2 text-xs font-sans font-medium tracking-wide box-border border border-ink text-ink overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-ink/6"
              initial={{ x: "-100%" }}
              animate={{ x: activeBtn === 1 ? "0%" : "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative">Secondary</span>
          </motion.button>

          {/* Ghost */}
          <motion.button
            onMouseEnter={() => setActiveBtn(2)}
            onMouseLeave={() => setActiveBtn(null)}
            className="relative px-4 py-2 text-xs font-sans font-medium tracking-wide border border-border text-ash overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-ink/4"
              initial={{ x: "-100%" }}
              animate={{ x: activeBtn === 2 ? "0%" : "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative">Ghost</span>
          </motion.button>

          {/* Icon Button */}
          <motion.button
            onMouseEnter={() => setActiveBtn(3)}
            onMouseLeave={() => setActiveBtn(null)}
            className="relative flex items-center justify-center w-8 h-8 border border-border text-ash overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-ink/5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: activeBtn === 3 ? 1 : 0,
                opacity: activeBtn === 3 ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
            />
            <ArrowUpRight size={13} strokeWidth={1.5} className="relative" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* 02 — Interactive Repulsion Dot Field */
const CT_COLS = 14;
const CT_ROWS = 6;
const CT_RADIUS = 80;

type DotAnimTarget =
  | { x: number; y: number; scale: number; opacity: number }
  | { scale: number[]; opacity: number[] };

function RepulsionDot({
  baseX,
  baseY,
  mouse,
  idleDelay,
}: {
  baseX: number;
  baseY: number;
  mouse: { x: number; y: number } | null;
  idleDelay: number;
}) {
  let anim: DotAnimTarget;
  let trans: Record<string, unknown>;

  if (mouse) {
    const dx = baseX - mouse.x;
    const dy = baseY - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const force = dist < CT_RADIUS && dist > 0 ? 1 - dist / CT_RADIUS : 0;

    anim = {
      x: force > 0 ? (dx / dist) * force * 24 : 0,
      y: force > 0 ? (dy / dist) * force * 24 : 0,
      scale: 0.4 + force * 1.08,
      opacity: 0.1 + force,
    };
    trans = { type: "spring", stiffness: 440, damping: 26 };
  } else {
    anim = {
      scale: [0.36, 0.72, 0.36],
      opacity: [0.08, 0.36, 0.08],
    };
    trans = {
      duration: 2.6,
      delay: idleDelay,
      repeat: Infinity,
      ease: "easeInOut",
    };
  }

  return (
    <motion.span
      style={{
        position: "absolute",
        left: baseX - 6,
        top: baseY - 6,
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      animate={anim}
      transition={trans as React.ComponentProps<typeof motion.span>["transition"]}
      className="block w-3 h-3 rounded-full bg-ink"
    />
  );
}

function CreativeTechVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [dims, setDims] = useState({ w: 320, h: 160 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (width > 0) setDims({ w: width, h: height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse(null)}
        className="relative w-full select-none overflow-visible p-6"
        style={{ height: "160px" }}
      >
        {Array.from({ length: CT_ROWS }, (_, row) =>
          Array.from({ length: CT_COLS }, (_, col) => {
            const baseX = ((col + 0.5) / CT_COLS) * dims.w;
            const baseY = ((row + 0.5) / CT_ROWS) * dims.h;
            const idleDelay = ((col * 0.11 + row * 0.19) % 2.2);
            return (
              <RepulsionDot
                key={`${row}-${col}`}
                baseX={baseX}
                baseY={baseY}
                mouse={mouse}
                idleDelay={idleDelay}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

/* 03 — Interactive Component State Inspector */
type FieldStateId = "default" | "hover" | "focus" | "error" | "disabled";

interface FieldStateConfig {
  labelOpacity: number;
  borderClass: string;
  bgClass: string;
  borderWidth: string;
  value: string;
  placeholder: string;
  showCursor: boolean;
  hint: string | null;
  hintClass: string;
  disabled: boolean;
  specs: Array<{ key: string; val: string }>;
}

const FIELD_STATES: Array<{ id: FieldStateId; label: string }> = [
  { id: "default",  label: "Default"  },
  { id: "hover",    label: "Hover"    },
  { id: "focus",    label: "Focus"    },
  { id: "error",    label: "Error"    },
  { id: "disabled", label: "Disabled" },
];

const FIELD_CONFIG: Record<FieldStateId, FieldStateConfig> = {
  default: {
    labelOpacity: 0.55,
    borderClass: "border-border",
    bgClass: "",
    borderWidth: "1px",
    value: "",
    placeholder: "your@email.com",
    showCursor: false,
    hint: null,
    hintClass: "",
    disabled: false,
    specs: [
      { key: "Border",  val: "1px · var(--border)"  },
      { key: "Fill",    val: "transparent"          },
      { key: "Opacity", val: "100%"                 },
    ],
  },
  hover: {
    labelOpacity: 0.8,
    borderClass: "border-ash",
    bgClass: "bg-ink/[0.025]",
    borderWidth: "1px",
    value: "",
    placeholder: "your@email.com",
    showCursor: false,
    hint: null,
    hintClass: "",
    disabled: false,
    specs: [
      { key: "Border",  val: "1px · var(--ash)"  },
      { key: "Fill",    val: "ink / 2.5%"        },
      { key: "Opacity", val: "100%"              },
    ],
  },
  focus: {
    labelOpacity: 1,
    borderClass: "border-ink",
    bgClass: "",
    borderWidth: "1.5px",
    value: "taylon@fuzionix.co",
    placeholder: "",
    showCursor: true,
    hint: "Press Enter to continue →",
    hintClass: "text-ash",
    disabled: false,
    specs: [
      { key: "Border", val: "1.5px · var(--ink)" },
      { key: "Fill",   val: "transparent"        },
      { key: "Hint",   val: "visible"            },
    ],
  },
  error: {
    labelOpacity: 1,
    borderClass: "border-red-400",
    bgClass: "",
    borderWidth: "1.5px",
    value: "invalid-email@@",
    placeholder: "",
    showCursor: false,
    hint: "Enter a valid email address.",
    hintClass: "text-red-400",
    disabled: false,
    specs: [
      { key: "Border", val: "1.5px · error"    },
      { key: "Fill",   val: "transparent"      },
      { key: "Hint",   val: "visible · error"  },
    ],
  },
  disabled: {
    labelOpacity: 0.28,
    borderClass: "border-border",
    bgClass: "bg-ink/[0.03]",
    borderWidth: "1px",
    value: "",
    placeholder: "Not available",
    showCursor: false,
    hint: null,
    hintClass: "",
    disabled: true,
    specs: [
      { key: "Border",  val: "1px · var(--border)"  },
      { key: "Opacity", val: "28% global"           },
      { key: "Cursor",  val: "not-allowed"          },
    ],
  },
};

function ComponentStateVisual() {
  const [activeState, setActiveState] = useState<FieldStateId>("default");
  const cfg = FIELD_CONFIG[activeState];

  return (
    <div className="flex flex-col gap-3 w-full">

      {/* State Selector Tabs */}
      <div className="flex flex-wrap gap-1">
        {FIELD_STATES.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => setActiveState(s.id)}
            transition={{ duration: 0.15 }}
            className={`px-2.5 py-1 font-sans text-xs tracking-widest uppercase border transition-colors duration-200 ${
              activeState === s.id
                ? "bg-ink text-paper border-ink"
                : "bg-transparent text-ash border-border hover:border-ash hover:text-ink"
            }`}
          >
            {s.label}
          </motion.button>
        ))}
      </div>

      {/* Component Preview */}
      <div className="relative w-full border border-border p-5 overflow-hidden">

        {/* Corner Annotation — Component Type */}
        <div className="absolute top-3.5 right-4 flex items-center gap-2 select-none">
          {/* Live State Dot */}
          <motion.span
            key={activeState}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className={`w-1.5 h-1.5 rounded-full ${
              activeState === "error"
                ? "bg-red-400"
                : activeState === "disabled"
                ? "bg-border"
                : activeState === "focus"
                ? "bg-ink"
                : "bg-ash/40"
            }`}
          />
          <span className="font-sans text-xs tracking-widest uppercase text-ash/30">
            /{activeState}
          </span>
        </div>

        {/* Field Component */}
        <div className={`w-full max-w-xs ${cfg.disabled ? "cursor-not-allowed" : ""}`}>

          {/* Label */}
          <motion.p
            animate={{ opacity: cfg.labelOpacity }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-xs tracking-widest uppercase text-ink mb-2 select-none"
          >
            Email Address
          </motion.p>

          {/* Input Shell */}
          <div
            className={`flex items-center px-3 py-2.5 border transition-colors duration-300 ${cfg.borderClass} ${cfg.bgClass} ${cfg.disabled ? "cursor-not-allowed select-none" : ""}`}
            style={{ borderWidth: cfg.borderWidth }}
          >
            <span
              className={`font-sans text-sm flex-1 transition-colors duration-300 ${
                cfg.value ? "text-ink" : "text-ash/35"
              } ${cfg.disabled ? "opacity-30" : ""}`}
            >
              {cfg.value || cfg.placeholder}
            </span>

            {/* Blinking Cursor */}
            <AnimatePresence>
              {cfg.showCursor && (
                <motion.span
                  key="cursor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                  className="w-px h-3.5 bg-ink ml-0.5 shrink-0"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Hint / Helper Text */}
          <AnimatePresence mode="wait">
            {cfg.hint && (
              <motion.p
                key={`hint-${activeState}`}
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`font-sans text-xs mt-2 overflow-hidden ${cfg.hintClass}`}
              >
                {cfg.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Spec Readout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`spec-${activeState}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid grid-cols-3 border border-border divide-x divide-border"
        >
          {cfg.specs.map(({ key, val }) => (
            <div key={key} className="px-3 py-2.5">
              <p className="font-sans text-xs text-ash/35 tracking-widest uppercase leading-none mb-1">
                {key}
              </p>
              <p className="font-sans text-xs text-ash font-medium leading-snug">
                {val}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* 04 — Animated Brand Digital Identity Generator */
function BrandIdentityVisual() {
  return (
    <div className="relative flex items-center justify-center w-full h-50 overflow-hidden bg-ink/2 border border-border/50">
      {/* Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-px bg-border/80" />
        <div className="absolute h-full w-px bg-border/80" />
      </div>

      {/* Outer Dashed Orbit */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute w-36 h-36 text-ash/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
      </motion.svg>

      {/* Morphing Brand Shape */}
      <motion.div
        className="absolute w-20 h-20 border-[1.5px] border-ink flex items-center justify-center"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["20%", "40%", "50%", "40%", "20%"],
          scale: [1, 0.75, 1, 0.75, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner Contrasting Shape */}
        <motion.div
          className="w-8 h-8 bg-ink/5 border border-ink"
          animate={{
            rotate: [0, -90, -180, -270, -360],
            borderRadius: ["50%", "25%", "50%", "25%", "50%"],
            scale: [0.5, 1.2, 0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-ink/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-ink/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-ink/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-ink/40" />
    </div>
  );
}

/* 05 — Technical Design Slider */
const TECH_DESIGN_SLIDES = [
  {
    id: "workflow",
    title: "Design Engineering",
    desc: "Converting Figma designs into semantic HTML and accessible React components. Building responsive layouts that work flawlessly across devices while maintaining design fidelity to the pixel.",
    code: "DS-ENG"
  },
  {
    id: "tooling",
    title: "Bespoke Tooling",
    desc: "Creating custom Figma plugins, build scripts, and automation tools that streamline design-to-code workflows. Reduces manual handoff errors and speeds up iteration cycles by 40-60%.",
    code: "TL-SYS"
  },
  {
    id: "api",
    title: "Component API",
    desc: "Designing TypeScript-first component APIs with strict prop validation. Preventing misuse at compile-time. Clear documentation with live Storybook examples for every pattern.",
    code: "CP-API"
  },
  {
    id: "perf",
    title: "Performance",
    desc: "Optimizing bundle size, rendering performance, and Core Web Vitals. Implementing lazy loading, code splitting, and animation frame optimization to hit 60fps on all devices.",
    code: "PF-OPT"
  }
];

function TechnicalDesignSlider() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TECH_DESIGN_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const activeSlide = TECH_DESIGN_SLIDES[activeIdx];

  return (
    <div className="flex flex-col md:flex-row w-full gap-8 md:gap-0">
      {/* Left: Header & Controls */}
      <div className="md:w-72 shrink-0 flex flex-col justify-between pr-8">
        <div>
          <span className="font-sans text-xs tracking-widest uppercase text-ash block mb-6">05</span>
          <h3 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8 md:mb-12">
            Technical<br />Design
          </h3>
        </div>

        {/* Slider Controls */}
        <div className="flex gap-2 w-full max-w-50">
          {TECH_DESIGN_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className="relative h-1 flex-1 bg-border overflow-hidden group cursor-pointer"
              aria-label={`Go to slide ${i + 1}`}
            >
              <motion.div
                key={activeIdx === i ? `active-${i}` : `inactive-${i}`}
                className="absolute top-0 left-0 h-full bg-ink"
                initial={{ width: activeIdx === i ? "0%" : "0%" }}
                animate={{ width: activeIdx === i ? "100%" : "0%" }}
                transition={{ duration: activeIdx === i ? 7 : 0, ease: "linear" }}
              />
              <div className="absolute top-0 left-0 h-full bg-ash/30 w-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Dynamic Content */}
      <div className="flex-1 md:border-l border-border md:pl-14 flex flex-col justify-center relative">
        <div className="absolute top-0 right-0 hidden md:block">
          <ArrowUpRight size={18} className="text-ash" strokeWidth={1.5} />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col md:flex-row gap-8 md:items-center justify-between w-full h-full pt-2 md:pt-0"
          >
            <div className="max-w-md flex flex-col justify-center">
              <h4 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-3">
                {activeSlide.title}
              </h4>
              <p className="font-sans text-sm text-ash leading-relaxed">
                {activeSlide.desc}
              </p>
            </div>

            {/* Abstract Visual / Code Badge */}
            <div className="hidden md:flex relative items-center justify-center w-28 h-28 shrink-0 bg-ink/2 border border-border/50">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-ink/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-ink/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-ink/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-ink/40" />
              <span className="font-sans text-xs font-medium text-ash tracking-wider">
                {activeSlide.code}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="grid grid-cols-12 border-l border-border">

      <ServiceCell
        delay={0.1}
        className="col-span-12 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <span className="font-sans text-xs tracking-widest uppercase text-ash block mb-4">
            Discipline
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight">
            What Fuzionix Do
          </h2>
        </div>
        <span className="font-sans text-xs tracking-widest uppercase text-ash">
          01 — 05
        </span>
      </ServiceCell>

      {/* 01 — Design System Architecture */}
      <ServiceCell
        delay={0.2}
        className="col-span-12 md:col-span-5 p-8 md:p-12 gap-10 min-h-96"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs tracking-widest uppercase text-ash">01</span>
          <ArrowUpRight size={18} className="text-ash" strokeWidth={1.5} />
        </div>

        <DesignSystemVisual />

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-3">
            Design System<br />Architecture
          </h3>
          <p className="font-sans text-sm text-ash leading-relaxed">
            Building scalable, token-based design systems that unify visual language across products — from atomic foundations to complex component libraries.
          </p>
        </div>
      </ServiceCell>

      {/* 02 — Creative Technology */}
      <ServiceCell
        delay={0.3}
        className="col-span-12 md:col-span-7 p-8 md:p-12 gap-10 min-h-96"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs tracking-widest uppercase text-ash">02</span>
          <ArrowUpRight size={18} className="text-ash" strokeWidth={1.5} />
        </div>

        <CreativeTechVisual />

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-3">
            Creative<br />Technology
          </h3>
          <p className="font-sans text-sm text-ash leading-relaxed max-w-xl">
            Merging engineering rigor with creative exploration — interactive experiments, generative UI, and motion-rich experiences that push the boundary of the medium.
          </p>
        </div>
      </ServiceCell>

      {/* 03 — Product Interface Development */}
      <ServiceCell
        delay={0.35}
        className="col-span-12 md:col-span-7 p-8 md:p-12 gap-10"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs tracking-widest uppercase text-ash">03</span>
          <ArrowUpRight size={18} className="text-ash" strokeWidth={1.5} />
        </div>

        <ComponentStateVisual />

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-3">
            Product Interface<br />Development
          </h3>
          <p className="font-sans text-sm text-ash leading-relaxed max-w-xl">
            Engineering pixel-precise interfaces where design intent and technical execution are in complete alignment. Every state, transition, and edge case considered.
          </p>
        </div>
      </ServiceCell>

      {/* 04 — Brand Digital Identity */}
      <ServiceCell
        delay={0.4}
        className="col-span-12 md:col-span-5 p-8 md:p-12 gap-10"
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs tracking-widest uppercase text-ash">04</span>
          <ArrowUpRight size={18} className="text-ash" strokeWidth={1.5} />
        </div>

        <BrandIdentityVisual />

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-3">
            Brand Digital<br />Identity
          </h3>
          <p className="font-sans text-sm text-ash leading-relaxed">
            Translating brand essence into cohesive digital expressions — from mark-making to full identity systems that hold integrity across every surface.
          </p>
        </div>
      </ServiceCell>

      {/* 05 — Technical Design */}
      <ServiceCell
        delay={0.45}
        className="col-span-12 p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-0"
      >
        <TechnicalDesignSlider />
      </ServiceCell>

    </section>
  );
}