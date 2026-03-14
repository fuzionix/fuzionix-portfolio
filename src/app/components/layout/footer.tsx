"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Github } from "lucide-react";
import { EASE } from "@/app/constant";

const CONTACT_EMAIL = "taylon.chan@fuzionix.dev";

const SITE_LINKS = [
  { label: "Home",    href: "#home" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

const COLOPHON_ITEMS = [
  { label: "Typeface",   value: "Stack Sans Headline" },
  { label: "Framework",  value: "Next.js 16" },
  { label: "Motion",     value: "Framer Motion" },
  { label: "Hosted",     value: "Vercel" },
] as const;

interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubData {
  login: string;
  name: string;
  bio: string;
  followers: { totalCount: number };
  repositories: { totalCount: number };
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
      weeks: ContributionWeek[];
    };
  };
  error?: string;
}

function FooterCell({
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
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={`border-r border-b border-border flex flex-col hover:bg-ink/3 transition-colors duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ContributionGrid({ weeks }: { weeks: ContributionWeek[] }) {
  const slicedWeeks = weeks.slice(-32);

  const allCounts = slicedWeeks
    .flatMap((w) => w.contributionDays.map((d) => d.contributionCount))
    .filter((c) => c > 0);
  const peak = allCounts.length > 0 ? Math.max(...allCounts) : 1;

  function getOpacityClass(count: number): string {
    if (count === 0) return "bg-ink/[0.055]";
    const ratio = count / peak;
    if (ratio < 0.2)  return "bg-ink/[0.22]";
    if (ratio < 0.45) return "bg-ink/[0.42]";
    if (ratio < 0.7)  return "bg-ink/[0.65]";
    return "bg-ink/[0.88]";
  }

  const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // Build month label positions from the first day of each week
  const monthMarkers: { label: string; colIndex: number }[] = [];
  slicedWeeks.forEach((week, i) => {
    if (week.contributionDays.length === 0) return;
    const firstDay = new Date(week.contributionDays[0].date);
    if (firstDay.getDate() <= 7) {
      const label = MONTH_LABELS[firstDay.getMonth()];
      // Avoid duplicate adjacent labels
      if (monthMarkers.length === 0 || monthMarkers[monthMarkers.length - 1].label !== label) {
        monthMarkers.push({ label, colIndex: i });
      }
    }
  });

  return (
    <div className="flex flex-col gap-2 w-full overflow-x-auto">
      {/* Grid */}
      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: `repeat(${slicedWeeks.length}, minmax(0, 1fr))`,
          gridTemplateRows:    "repeat(7, minmax(0, 1fr))",
          gridAutoFlow:        "column",
        }}
      >
        {slicedWeeks.map((week, wi) =>
          Array.from({ length: 7 }, (_, dayIndex) => {
            const day = week.contributionDays.find((d) => d.weekday === dayIndex);
            return (
              <motion.div
                key={`${wi}-${dayIndex}`}
                title={day ? `${day.date}: ${day.contributionCount} contributions` : ""}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: (wi * 7 + dayIndex) * 0.0048,
                  ease: EASE,
                }}
                className={`aspect-square w-full transition-all duration-150 cursor-default ${day ? getOpacityClass(day.contributionCount) : "bg-ink/5.5"}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function ContributionSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="h-3 w-full grid gap-px" style={{ gridTemplateColumns: "repeat(32, 1fr)" }}>
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="h-3 bg-ink/6 animate-pulse" style={{ animationDelay: `${i * 30}ms` }} />
        ))}
      </div>
      {Array.from({ length: 7 }).map((_, row) => (
        <div key={row} className="w-full grid gap-px" style={{ gridTemplateColumns: "repeat(32, 1fr)" }}>
          {Array.from({ length: 32 }).map((_, col) => (
            <div
              key={col}
              className="aspect-square bg-ink/6 animate-pulse"
              style={{ animationDelay: `${(row * 32 + col) * 8}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function GitHubCell() {
  const [data, setData]       = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d: GitHubData) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const calendar = data?.contributionsCollection.contributionCalendar;

  return (
    <FooterCell
      delay={0.2}
      className="col-span-12 md:col-span-5 p-8 md:p-12 gap-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs tracking-widest uppercase text-ash">
          GitHub
        </span>
      </div>

      {/* Profile Row */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-ink/[0.07] animate-pulse shrink-0" />
            <div className="flex flex-col gap-1.5">
              <div className="h-3 w-24 bg-ink/[0.07] animate-pulse" />
              <div className="h-2.5 w-36 bg-ink/5 animate-pulse" />
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-ash/50"
          >
            <Github size={14} strokeWidth={1.5} />
            <span className="font-sans text-xs">Failed to load profile</span>
          </motion.div>
        ) : (
          <motion.div
            key="data-profile"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-start gap-3"
          >
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-bold text-4xl sm:text-5xl text-ink tracking-tight leading-tight">
                Fuzionix
              </span>
              <span className="mt-2 font-sans text-sm text-ash/60 leading-snug">
                {data?.bio ?? ""}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contribution Grid */}
      <div className="flex flex-col gap-2">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContributionSkeleton />
            </motion.div>
          ) : error ? (
            <motion.div
              key="grid-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-24 border border-border/50 flex items-center justify-center"
            >
              <span className="font-sans text-xs text-ash/40">
                Could not load contribution data
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="grid-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <ContributionGrid weeks={calendar?.weeks ?? []} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GitHub Link */}
      <div className="flex">
        <a
          href="https://github.com/Fuzionix"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 font-sans text-sm font-medium text-ink hover:text-ash transition-colors duration-300"
        >
          <Github size={14} strokeWidth={1.5} className="text-ash shrink-0" />
          <span className="border-b border-border group-hover:border-ink transition-colors duration-300">
            github.com/Fuzionix
          </span>
          <ArrowUpRight
            size={13}
            strokeWidth={1.5}
            className="text-ash opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
          />
        </a>
      </div>
    </FooterCell>
  );
}

function EmailCell() {
  return (
    <FooterCell
      delay={0.1}
      className="col-span-12 md:col-span-7 p-8 md:p-14 xl:px-16 xl:py-20 justify-between gap-12"
    >
      {/* Eyebrow */}
      <span className="font-sans text-xs tracking-widest uppercase text-ash">
        Get in Touch
      </span>

      {/* Headline */}
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-ink leading-none tracking-tight">
          Let&apos;s build
          <br />
          something
          <br />
          <span className="text-ash">together.</span>
        </h2>
        <p className="font-sans text-sm text-ash leading-relaxed max-w-xs">
          Open to freelance collaborations, product roles, and creative
          engineering projects. Always happy to talk craft.
        </p>
      </div>

      {/* Email Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group flex items-center gap-2.5 font-sans text-sm font-medium text-ink hover:text-ash transition-colors duration-300"
        >
          <Mail size={14} strokeWidth={1.5} className="text-ash shrink-0" />
          <span className="border-b border-border group-hover:border-ink transition-colors duration-300">
            {CONTACT_EMAIL}
          </span>
          <ArrowUpRight
            size={13}
            strokeWidth={1.5}
            className="text-ash opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
          />
        </a>
      </div>
    </FooterCell>
  );
}

/* Site Links Cell */
function SiteLinksCell() {
  return (
    <FooterCell
      delay={0.3}
      className="col-span-12 md:col-span-3 p-8 md:p-10 gap-6"
    >
      <span className="font-sans text-xs tracking-widest uppercase text-ash">
        Navigate
      </span>

      <ul className="flex flex-col gap-3">
        {SITE_LINKS.map(({ label, href }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + i * 0.08, duration: 0.55, ease: EASE }}
          >
            <a
              href={href}
              className="group flex items-center gap-1.5 font-sans text-sm text-ink transition-colors duration-300"
            >
              <span className="w-3 h-px bg-border group-hover:w-5 group-hover:bg-ink transition-all duration-300 shrink-0" />
              {label}
            </a>
          </motion.li>
        ))}
      </ul>
    </FooterCell>
  );
}

/* Colophon Cell */
function ColophonCell() {
  return (
    <FooterCell
      delay={0.35}
      className="col-span-12 md:col-span-5 p-8 md:p-10 gap-6"
    >
      <span className="font-sans text-xs tracking-widest uppercase text-ash">
        Colophon
      </span>

      <ul className="flex flex-col divide-y divide-border/60">
        {COLOPHON_ITEMS.map(({ label, value }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.07, duration: 0.55, ease: EASE }}
            className="flex items-center justify-between py-2.5"
          >
            <span className="font-sans text-xs tracking-widest uppercase text-ash/50">
              {label}
            </span>
            <span className="font-sans text-xs text-ash font-medium">
              {value}
            </span>
          </motion.li>
        ))}
      </ul>
    </FooterCell>
  );
}

/* Copyright Cell */
function CopyrightCell() {
  const year = new Date().getFullYear();

  return (
    <FooterCell
      delay={0.42}
      className="col-span-12 md:col-span-4 p-8 md:p-10 justify-end gap-4"
    >
      <div className="flex flex-col gap-2">
        <span className="font-bold text-sm text-ink tracking-tight">
          Fuzionix
        </span>
        <p className="font-sans text-xs text-ash leading-relaxed">
          Independent design &amp; development studio.
          <br />
          Hong Kong — {year}.
        </p>
      </div>

      <p className="font-sans text-xs text-ash/40">
        © {year} Taylon Chan. All rights reserved.
      </p>
    </FooterCell>
  );
}

/* Assembled Footer */
export function FooterSection() {
  return (
    <footer id="contact" className="grid grid-cols-12 border-l border-border">
      <EmailCell />
      <GitHubCell />
      <SiteLinksCell />
      <ColophonCell />
      <CopyrightCell />
    </footer>
  );
}