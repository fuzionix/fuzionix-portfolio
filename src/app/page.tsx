"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import Image from 'next/image';

const NAV_LINKS = ["Work", "Tools", "Writing", "About", "Contact"] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

function Navigation() {
  const [dark, setDark] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 h-14 flex items-center justify-between px-8 md:px-12 border-b border-border bg-paper/90 backdrop-blur-sm"
    >
      {/* ── Brandmark ── */}
      <span className="-mb-1 font-bold text-sm tracking-tight text-ink select-none">
        <Image
          src="/logo/Fuzionix-logo.svg"
          alt="Fuzionix Logo"
          width={18}
          height={18}
          priority
        />
      </span>

      {/* ── Right cluster ── */}
      <nav className="flex items-center gap-6 md:gap-8">
        {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: EASE }}
            className="hidden md:block font-sans text-xs tracking-widest uppercase text-ash hover:text-ink transition-colors duration-300"
          >
            {link}
          </motion.a>
        ))}

        {/* Theme toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.72, duration: 0.5 }}
          onClick={() => setDark((p) => !p)}
          aria-label="Toggle theme"
          className="hidden md:flex relative w-8 h-4 rounded-full border border-border cursor-pointer bg-transparent items-center"
        >
          <span
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-ash transition-all duration-300 ${dark ? "left-4" : "left-0.5"}`}
          />
        </motion.button>

        {/* Mobile menu icon */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          aria-label="Open menu"
          className="md:hidden text-ash hover:text-ink transition-colors duration-200"
        >
          <Menu size={16} strokeWidth={1.5} />
        </motion.button>
      </nav>
    </motion.header>
  );
}

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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={`border-r border-b border-border flex flex-col justify-between hover:bg-white/30 transition-colors duration-500 ${className}`}
    >
      {children}
    </motion.div>
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

      {/* Display headline */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-bold text-ink leading-none tracking-tight">
        Craft at the
        <br />
        intersection
        <br />
        <span className="text-ash">of &#60;code&#62;</span>
        <br />
        and design.
      </h1>

      {/* Sub-copy */}
      <p className="font-sans text-sm text-ash leading-relaxed max-w-sm">
        The finest digital work emerges where structural thinking and aesthetic precision become indistinguishable. Every pixel earns its place. Every function serves its purpose.
      </p>
    </Cell>
  );
}

function IdentityCell() {
  const meta = [
    { label: "Studio", value: "Fuzionix" },
    { label: "Education", value: "Hong Kong Baptist University" },
    { label: "Based in", value: "Hong Kong" },
  ];

  return (
    <Cell
      delay={0.28}
      className="col-span-12 md:col-span-5 p-8 md:p-12 gap-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <span className="font-sans text-xs tracking-widest uppercase text-ash">
          Identity
        </span>
        <ArrowUpRight size={14} className="text-ash" strokeWidth={1.5} />
      </div>

      {/* Name + role */}
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

      {/* Metadata table */}
      <div className="pt-5 border-t border-border space-y-2.5">
        {meta.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="font-sans text-xs text-ash">{label}</span>
            <span className="font-sans text-xs text-ink">{value}</span>
          </div>
        ))}
      </div>
    </Cell>
  );
}

function PracticeCell() {
  return (
    <Cell
      delay={0.38}
      className="col-span-12 md:col-span-4 p-8 md:p-12 gap-6"
    >
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
    <Cell
      delay={0.46}
      className="col-span-6 md:col-span-4 p-8 md:p-12 gap-6"
    >
      {/* Label */}
      <div className="flex items-center gap-1.5 text-ash">
        <span className="font-sans text-xs tracking-widest uppercase">
          Location
        </span>
      </div>

      {/* Place */}
      <div>
        <p className="font-bold text-sm text-ink">Hong Kong</p>
        <p className="font-sans text-xs text-ash mt-0.5">UTC +08:00</p>
      </div>

      {/* Live clock */}
      <div className="flex items-center gap-1.5">
        <span className="font-sans text-xs text-ash tabular-nums">{time}</span>
      </div>
    </Cell>
  );
}

function AvailabilityCell() {
  return (
    <Cell
      delay={0.52}
      className="col-span-6 md:col-span-4 p-8 md:p-12 gap-6"
    >
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

export default function Portfolio() {
  return (
    <div
      className="min-h-screen w-full bg-paper text-ink selection:bg-ink selection:text-paper"
    >
      <Navigation />

      {/* ── Profile / Manifesto ── */}
      <section
        id="home"
        className="min-h-screen pt-14 grid grid-cols-12 border-l border-t border-border"
      >
        {/* Row 1 */}
        <ManifestoCell />
        <IdentityCell />

        {/* Row 2 */}
        <PracticeCell />
        <LocationCell />
        <AvailabilityCell />
      </section>
    </div>
  );
}