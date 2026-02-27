"use client";

import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code,
  CircleSlash2,
  Pyramid,
  Origami,
} from "lucide-react";
import { CursorContext, ThemeContext } from "@/app/components/utils/contexts";
import { CursorFollower, SmoothScroll } from "@/app/components/effects";
import { Navigation } from "@/app/components/layout/navigation";
import { FooterSection } from "@/app/components/layout/footer";
import { ServicesSection } from "@/app/components/sections/services";
import { ProcessSection } from "@/app/components/sections/process";
import { EASE } from "@/app/constant";

function Cell({
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

function WorkCell({
  title,
  link,
  description,
  delay = 0,
  Icon,
}: {
  title: string;
  link: string;
  description: string;
  delay?: number;
  Icon: React.FC;
}) {
  const { setIsHovering } = useContext(CursorContext);

  return (
    <motion.a
      href={link}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className="col-span-12 md:col-span-6 p-8 md:p-12 border-r border-b border-border flex flex-col justify-between hover:bg-ink/4 transition-colors duration-500 group md:cursor-none min-h-80"
    >
      <div className="flex justify-between items-start mb-12">
        <div className="p-3 border border-border rounded-sm bg-paper group-hover:bg-ink/3 transition-colors duration-500">
          <Icon />
        </div>
        <ArrowUpRight
          size={18}
          className="text-ash group-hover:text-ink transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1"
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h3 className="text-3xl md:text-4xl font-bold text-ink mb-2 tracking-tight">
          {title}
        </h3>
        <p className="sm:pr-16 md:pr-0 xl:pr-16 font-sans text-sm text-ash leading-relaxed">
          {description}
        </p>
      </div>
    </motion.a>
  );
}

function ManifestoCell() {
  return (
    <Cell
      delay={0.15}
      className="col-span-12 md:col-span-7 p-8 md:p-14 xl:px-16 xl:py-20 gap-8 md:gap-14"
    >
      {/* Eyebrow */}
      <span className="font-sans text-xs tracking-widest uppercase text-ash">
        Manifesto — 2026
      </span>

      {/* Display Headline */}
      <h1 className="text-5xl sm:text-5xl md:text-7xl xl:text-8xl font-bold text-ink leading-none tracking-tight">
        Craft at the
        <br />
        intersection
        <br />
        <span className="text-ash">of &#60;code&#62;</span>
        <br />
        and design.
      </h1>

      {/* Supporting Text */}
      <p className="font-sans text-sm text-ash leading-relaxed max-w-sm">
        The finest digital work emerges where structural thinking and aesthetic precision become indistinguishable. Every pixel earns its place. Every function serves its purpose.
      </p>
    </Cell>
  );
}

const META_ITEMS = [
  { label: "Studio", value: "Fuzionix" },
  { label: "Education", value: "Hong Kong Baptist University" },
  { label: "Based in", value: "Hong Kong" },
] as const;

function IdentityCell() {
  return (
    <Cell delay={0.28} className="col-span-12 md:col-span-5 p-8 md:p-12 gap-8">
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs tracking-widest uppercase text-ash">
          Identity
        </span>
        <ArrowUpRight size={18} className="text-ash" strokeWidth={1.5} />
      </div>

      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight">
          Taylon Chan
        </h2>
        <p className="font-sans text-sm text-ash mt-3 leading-relaxed">
          Full-Stack Developer
          <br />
          UI Designer
        </p>
      </div>

      <div className="pt-5 border-t border-border">
        {META_ITEMS.map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.52 + i * 0.11, duration: 0.65, ease: EASE }}
            className={`group flex items-center gap-4 py-3.5 ${
              i < META_ITEMS.length - 1 ? "border-b border-border/50" : ""
            }`}
          >
            {/* Label + Value Stacked */}
            <div className="flex-1 min-w-0">
              <p className="font-sans text-xs uppercase tracking-widest text-ash mb-0.5 leading-none">
                {label}
              </p>
              <p className="font-sans text-sm text-ink font-medium truncate group-hover:text-ash transition-colors duration-300">
                {value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Cell>
  );
}

function PracticeCell() {
  return (
    <Cell delay={0.38} className="col-span-12 md:col-span-4 p-8 md:p-12 gap-6">
      <span className="font-sans text-xs tracking-widest uppercase text-ash">
        Practice
      </span>
      <p className="font-sans text-sm text-ink leading-relaxed">
        Specializing in digital craft, product design systems, and creative technology. Blending modernist sensibility with technical precision to engineer thoughtful, sustainable interfaces and tools.
      </p>
    </Cell>
  );
}

function LocationCell() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-HK", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Hong_Kong",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Cell delay={0.46} className="col-span-6 md:col-span-4 p-8 md:p-12 gap-6">
      <div className="flex items-center gap-1.5 text-ash">
        <span className="font-sans text-xs tracking-widest uppercase">
          Location
        </span>
      </div>

      <div>
        <p className="font-bold text-sm text-ink">Hong Kong</p>
        <p className="font-sans text-xs text-ash mt-0.5">
          UTC +08:00 — {time}
        </p>
      </div>
    </Cell>
  );
}

function AvailabilityCell() {
  return (
    <Cell delay={0.52} className="col-span-6 md:col-span-4 p-8 md:p-12 gap-6">
      <span className="font-sans text-xs tracking-widest uppercase text-ash">
        Availability
      </span>

      <div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-700 animate-pulse" />
          <span className="font-bold text-sm text-ink">Available</span>
        </div>
        <p className="font-sans text-xs text-ash mt-2 leading-relaxed">
          Open to collaboration
        </p>
      </div>
    </Cell>
  );
}

const DevToolIcon = () => <Code strokeWidth={1} />;
const CurzrIcon = () => <Pyramid strokeWidth={1} />;
const PseudoIpsumIcon = () => <Origami strokeWidth={1} />;
const AudioPlusIcon = () => <CircleSlash2 strokeWidth={1} />;

export default function Portfolio() {
  const [isHovering, setIsHovering] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <CursorContext.Provider value={{ isHovering, setIsHovering }}>
        <div className="min-h-screen w-full bg-paper text-ink selection:bg-ink selection:text-paper md:cursor-none">
          <CursorFollower />
          <Navigation />

          <SmoothScroll>
            <main className="pt-14">
              {/* Profile / Manifesto */}
              <section
                id="home"
                className="grid grid-cols-12 border-l border-t border-border"
              >
                <ManifestoCell />
                <IdentityCell />
                <PracticeCell />
                <LocationCell />
                <AvailabilityCell />
              </section>

              {/* Services */}
              <ServicesSection />

              {/* Selected Works */}
              <section
                id="work"
                className="grid grid-cols-12 border-l border-border"
              >
                <Cell
                  delay={0.1}
                  className="col-span-12 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-paper"
                >
                  <div>
                    <span className="font-sans text-xs tracking-widest uppercase text-ash block mb-4">
                      Index
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight">
                      Selected Works
                    </h2>
                  </div>
                  <span className="font-sans text-xs tracking-widest uppercase text-ash">
                    01 — 04
                  </span>
                </Cell>

                <WorkCell
                  title="DevTool Plus"
                  link="#"
                  description="A code editor extension that provides common developer tools directly in your editor. The extension runs entirely on your local machine. No network requests are involved."
                  delay={0.2}
                  Icon={DevToolIcon}
                />
                <WorkCell
                  title="Curzr"
                  link="#"
                  description="A library of high-quality custom cursors and effects. It showcases creative designs with live demos. Developers can access easy-to-use code examples for every cursor."
                  delay={0.3}
                  Icon={CurzrIcon}
                />
                <WorkCell
                  title="Pseudo Ipsum"
                  link="#"
                  description="This tool provides Lorem Ipsum for code. It generates syntactically valid and non-functional syntax. Support is included for various popular programming languages."
                  delay={0.4}
                  Icon={PseudoIpsumIcon}
                />
                <WorkCell
                  title="Youtube Audio Plus"
                  link="#"
                  description="A browser extension for advanced YouTube audio control. It features an equalizer and bass adjustments. Visual effects enhance the listening experience for every user."
                  delay={0.5}
                  Icon={AudioPlusIcon}
                />
              </section>

              <ProcessSection />
              <FooterSection />
            </main>
          </SmoothScroll>
        </div>
      </CursorContext.Provider>
    </ThemeContext.Provider>
  );
}