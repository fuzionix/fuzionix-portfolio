"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { EASE } from "@/app/constant";

const STEPS = [
  {
    id: "01",
    phase: "Discover",
    tagline: "Map before you make.",
    designLens:
      "Audit the landscape. Understand constraints, user mental models, and latent opportunity. Draw the invisible architecture before drawing the visible surface.",
    codeLens: `// define scope\nconst constraints = await audit(landscape);\nconst intent = derive(scope, users);\n\nreturn { constraints, intent };`,
    tags: ["Research", "Audit", "Constraints"],
  },
  {
    id: "02",
    phase: "Architect",
    tagline: "Structure creates freedom.",
    designLens:
      "Define spatial logic — grid, hierarchy, typographic scale. Build the skeleton before the skin. Every column, row, and breakpoint is a deliberate decision.",
    codeLens: `<Grid cols={12} gap={0}>\n  <Cell span={7}>{primary}</Cell>\n  <Cell span={5}>{secondary}</Cell>\n</Grid>`,
    tags: ["Grid", "Hierarchy", "Scale"],
  },
  {
    id: "03",
    phase: "Craft",
    tagline: "Language before pixels.",
    designLens:
      "Build the visual system — token architecture, component anatomy, motion grammar. Design that scales because it is systematic, not because it is applied manually.",
    codeLens: `const system = {\n  tokens:     defineTokens(palette),\n  motion:     choreograph(EASE),\n  components: compose(atoms, molecules),\n};`,
    tags: ["Tokens", "Motion", "Components"],
  },
  {
    id: "04",
    phase: "Engineer",
    tagline: "Code is design made real.",
    designLens:
      "Translate intent into precision. Every spacing decision, every interaction state, every accessibility consideration — implemented faithfully, in-medium, exactly.",
    codeLens: `export default function Component<T>(\n  { variant, ...props }: Props<T>\n) {\n  return <Root data-variant={variant} {...props} />;\n}`,
    tags: ["Accessibility", "Performance", "Fidelity"],
  },
  {
    id: "05",
    phase: "Refine",
    tagline: "Iteration is the craft.",
    designLens:
      "Polish at the microscale. Stress-test edge cases, tune micro-interactions, audit at every breakpoint until the experience feels inevitable — not designed.",
    codeLens: `git commit -m "refine: micro-interactions,\n  accessibility audit,\n  edge-case coverage\n  — v1.0.0-rc.3"`,
    tags: ["Iteration", "Polish", "QA"],
  },
];

const PRINCIPLES = [
  {
    n: "I",
    title: "Systems, not solutions.",
    body: "One-off fixes compound into debt. Reusable foundations multiply into leverage.",
  },
  {
    n: "II",
    title: "Precision by default.",
    body: "Nothing arbitrary. Every sizing, spacing, and color decision carries a rationale.",
  },
  {
    n: "III",
    title: "Code is the final design tool.",
    body: "The browser is the canvas. Working in-medium eliminates the translation gap entirely.",
  },
  {
    n: "IV",
    title: "Reduce until honest.",
    body: "Restraint as a design act. Whitespace is not emptiness — it is pure intention.",
  },
];

function HCell({
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
      className={`border-r border-b border-border flex flex-col hover:bg-ink/3 transition-colors duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ProcessAccordion() {
  const [open, setOpen] = useState<string>("01");

  return (
    <div className="flex flex-col border-t border-border/75">
      {STEPS.map((step) => {
        const isOpen = open === step.id;
        return (
          <div key={step.id} className="border-b border-border/75">
            <button
              onClick={() => setOpen(isOpen ? "" : step.id)}
              className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
            >
              <div className="flex items-baseline gap-5">
                <span className="text-xs tracking-widest text-ash/40 w-5 shrink-0">
                  {step.id}
                </span>
                <span
                  className={`text-4xl font-bold tracking-tight transition-colors duration-300 ${
                    isOpen ? "text-ink" : "text-ash/60 group-hover:text-ink"
                  }`}
                >
                  {step.phase}
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0 ml-4">
                <span className="text-sm tracking-wide text-ash/40 hidden lg:block">
                  {step.tagline}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <Plus size={18} strokeWidth={1.5} className="text-ash/50" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 grid grid-cols-1 md:grid-cols-2">
                    {/* Design Lens */}
                    <div className="pb-6 md:pb-0 md:pr-8 md:border-r border-border/40">
                      <p className="text-xs tracking-widest uppercase text-ash/40 mb-3">
                        Design Lens
                      </p>
                      <p className="text-sm text-ash leading-relaxed">
                        {step.designLens}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs border border-border text-ash/55 px-2.5 py-1 tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Code Lens */}
                    <div className="pt-6 md:pt-0 md:pl-8 border-t border-border/40 md:border-t-0">
                      <p className="text-xs tracking-widest uppercase text-ash/40 mb-3">
                        Code Lens
                      </p>
                      <div className="bg-ink/3 border border-border/50 p-4 overflow-x-hidden">
                        <pre
                          className="text-xs font-mono text-ash/75 whitespace-pre"
                        >
                          {step.codeLens}
                        </pre>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function PrinciplesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/50 border border-border/50">
      {PRINCIPLES.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: EASE }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={`relative p-6 flex flex-col justify-between aspect-square sm:aspect-4/5 lg:aspect-square bg-paper group cursor-default transition-colors duration-500
            ${hoveredIndex === i ? "bg-ink text-paper" : "hover:bg-ink/3"}
          `}
        >
          <div className="flex justify-between items-start w-full">
            <span
              className={`text-xs tracking-widest transition-colors duration-300 ${
                hoveredIndex === i ? "text-ash/60" : "text-ash/40"
              }`}
            >
              {p.n}
            </span>
            <motion.div
              animate={{ rotate: hoveredIndex === i ? 90 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-ash/40"
            >
              <Plus size={14} />
            </motion.div>
          </div>

          <div className="mt-auto">
            <h4
              className={`text-lg font-bold leading-tight mb-3 transition-colors duration-300 ${
                hoveredIndex === i ? "text-paper" : "text-ink"
              }`}
            >
              {p.title}
            </h4>
            <div className="overflow-hidden">
               <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredIndex === i ? "auto" : 0,
                  opacity: hoveredIndex === i ? 1 : 0
                }}
                className={`text-xs leading-relaxed transition-colors duration-300 ${
                  hoveredIndex === i ? "text-ash/80" : "text-ash/60"
                }`}
              >
                {p.body}
              </motion.p>
            </div>
            {/* Fallback for non-hover state title position or static view if preferred */}
             <motion.div
                initial={{ opacity: 1, height: "auto" }}
                animate={{ 
                  opacity: hoveredIndex === i ? 0 : 1,
                  height: hoveredIndex === i ? 0 : "auto" 
                }}
                className="text-xs text-ash/60 leading-relaxed line-clamp-2 md:hidden"
             >
                {p.body}
             </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const TICKER_ITEMS = [
  "Design + Engineering",
  "Systems Thinking",
  "Token Architecture",
  "In-Medium Craft",
  "Motion Design",
  "Accessible by Default",
  "Component APIs",
  "Swiss Minimalism",
  "Creative Technology",
  "Pixel Precision",
];

function TickerBand() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-b border-border py-3.5 select-none">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-xs tracking-widest uppercase text-ash/30 px-8">
              {item}
            </span>
            <span className="w-px h-3 bg-border/60 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="grid grid-cols-12 border-l border-border">

      {/* 01 Header */}
      <HCell
        delay={0.05}
        className="col-span-12 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <span className="text-xs tracking-widest uppercase text-ash block mb-4">
            Pathway of craft
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight">
            Methodology
          </h2>
        </div>
        <p className="text-sm text-ash max-w-xs leading-relaxed">
          A discipline of dual fluency — thinking in grids and thinking in
          components simultaneously, until the boundary dissolves.
        </p>
      </HCell>

      {/* 02 Scrolling Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
        className="col-span-12 border-r border-b border-border"
      >
        <TickerBand />
      </motion.div>

      {/* 03 Process Accordion */}
      <HCell delay={0.2} className="col-span-12 md:col-span-7 p-8 md:p-12">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs tracking-widest uppercase text-ash">
            Process
          </span>
          <span className="text-xs tracking-widest uppercase text-ash">
            01 — 05
          </span>
        </div>
        <ProcessAccordion />
      </HCell>

      {/* 04 Principles */}
      <HCell delay={0.25} className="col-span-12 md:col-span-5 p-8 md:p-12 hover:bg-ink/0! ">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs tracking-widest uppercase text-ash">
            Principles
          </span>
          <ArrowUpRight size={18} className="text-ash" strokeWidth={1.5} />
        </div>
        <PrinciplesList />
      </HCell>

      {/* 05 Closing Statement */}
      <HCell
        delay={0.35}
        className="col-span-12 p-8 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8"
      >
        <h3 className="text-3xl md:text-5xl font-bold text-ink tracking-tight leading-tight">
          Every line has intent.
          <br />
          <span className="text-ash">Every component has purpose.</span>
        </h3>
        <a
          href="#work"
          className="flex items-center gap-2 text-sm text-ash hover:text-ink border-b border-border hover:border-ink/40 pb-0.5 transition-all duration-300 self-start md:self-auto shrink-0"
        >
          See the work
          <ArrowUpRight size={13} strokeWidth={1.5} />
        </a>
      </HCell>

    </section>
  );
}