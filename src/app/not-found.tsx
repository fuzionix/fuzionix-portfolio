"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/app/components/layout/navigation";
import { CursorFollower } from "@/app/components/effects";
import { ThemeContext, CursorContext } from "@/app/components/utils/contexts";
import { EASE } from "@/app/constant";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>[]#@!_~";

function useScramble(target: string, autoDelay = 350) {
  const [output, setOutput] = useState(target);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    let i = 0;
    const total = target.length * 7;

    timerRef.current = setInterval(() => {
      setOutput(
        target
          .split("")
          .map((ch, idx) => {
            if (ch === " ") return " ";
            if (idx < Math.floor(i / 7)) return ch;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join("")
      );
      i++;
      if (i > total) {
        clearInterval(timerRef.current!);
        setOutput(target);
      }
    }, 30);
  }, [target]);

  useEffect(() => {
    const t = setTimeout(play, autoDelay);
    return () => {
      clearTimeout(t);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { output, play };
}

function GlitchStripes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-full bg-border"
          style={{ top: `${20 + i * 15}%` }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0],
            x: ["-30%", "0%", "30%"],
          }}
          transition={{
            duration: 3 + i * 0.7,
            delay: i * 0.9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Cell({
  children,
  className = "",
  delay = 0,
  onMouseEnter,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onMouseEnter?: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={`border-r border-b border-border flex flex-col justify-between hover:bg-ink/3 transition-colors duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function NotFound() {
  const [isHovering, setIsHovering] = useState(false);
  const [dark, setDark]             = useState(false);

  const { output: code,  play: playCode  } = useScramble("Error",      300);
  const { output: label, play: playLabel } = useScramble("NOT FOUND",  600);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleHeroHover = useCallback(() => {
    playCode();
    playLabel();
  }, [playCode, playLabel]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <CursorContext.Provider value={{ isHovering, setIsHovering }}>
        <div className="min-h-screen w-full bg-paper text-ink md:cursor-none">
          <CursorFollower />
          <Navigation />

          <main className="pt-14 grid grid-cols-12 border-l border-t border-border">

            {/* 404 Hero */}
            <Cell
              delay={0.1}
              onMouseEnter={handleHeroHover}
              className="col-span-12 md:col-span-8 p-8 md:p-14 gap-6 relative overflow-hidden select-none cursor-default"
            >
              <GlitchStripes />

              <div className="relative flex items-center justify-between">
                <span className="font-sans text-xs tracking-widest uppercase text-ash">
                  Error — Page
                </span>
                <motion.span
                  className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-ash/50"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                  Unresolved
                </motion.span>
              </div>

              {/* Giant 404 */}
              <div className="relative">
                <h1 className="text-8xl sm:text-9xl font-bold text-ink leading-none tracking-tighter tabular-nums">
                  {code}
                </h1>

                {/* Underline rule */}
                <motion.div
                  className="h-px bg-border mt-5 mb-4 w-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
                />

                <p className="font-sans text-xs tracking-[0.5em] uppercase text-ash">
                  {label}
                </p>
              </div>
            </Cell>

            {/* Status / Diagnostics */}
            <Cell
              delay={0.2}
              className="col-span-12 md:col-span-4 p-8 md:p-12 gap-8"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-ash">
                Diagnostics
              </span>

              <div>
                <p className="font-sans text-xs tracking-widest uppercase text-ash/40 mb-2">
                  HTTP Status
                </p>
                <p className="text-5xl font-bold text-ink tracking-tight leading-none">
                  404
                </p>
                <p className="font-sans text-sm text-ash leading-relaxed mt-3 max-w-xs">
                  The requested route does not exist within this system. Navigation has failed.
                </p>
              </div>

              {/* Metadata Table */}
              <div className="border-t border-border pt-6">
                {[
                  { label: "Code",     value: "ERR_NOT_FOUND" },
                  { label: "Protocol", value: "HTTPS / 2.0"   },
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.09, duration: 0.6, ease: EASE }}
                    className="flex justify-between items-center py-3 border-b border-border/50 last:border-0"
                  >
                    <span className="font-sans text-xs uppercase tracking-widest text-ash/40">
                      {label}
                    </span>
                    <span className="font-sans text-xs text-ink font-medium">
                      {value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Cell>

            {/* Message + CTA */}
            <Cell
              delay={0.3}
              className="col-span-12 md:col-span-5 p-8 md:p-14 gap-10"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-ash">
                Redirect
              </span>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight mb-4">
                  Lost in<br />the Grid.
                </h2>
                <p className="font-sans text-sm text-ash leading-relaxed max-w-xs">
                  The coordinates you entered don&apos;t resolve to any known destination. The route back to the main grid remains clear.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Primary CTA */}
                <Link
                  href="/"
                  className="group flex items-center gap-3 px-6 py-4 bg-ink text-paper font-sans text-sm font-medium tracking-wide hover:bg-ink/85 transition-colors duration-300"
                >
                  <span>Return to Homepage</span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </Link>
              </div>
            </Cell>

            {/* Radar / Signal Visual */}
            <Cell
              delay={0.4}
              className="col-span-12 md:col-span-7 min-h-60 p-8 md:p-12 gap-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs tracking-widest uppercase text-ash">
                  Signal
                </span>
                <motion.span
                  className="font-sans text-xs tracking-widest uppercase text-ash/35"
                  animate={{ opacity: [0.25, 0.75, 0.25] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  Scanning …
                </motion.span>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-sans text-xs tracking-widest uppercase text-ash/30">
                  No route found — destination unreachable
                </p>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="block w-1 h-1 rounded-full bg-ash/30"
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            </Cell>
          </main>
        </div>
      </CursorContext.Provider>
    </ThemeContext.Provider>
  );
}