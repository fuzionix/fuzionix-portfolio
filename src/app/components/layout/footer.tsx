"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { EASE } from "@/app/constant";

const CONTACT_EMAIL = "taylon.chan@fuzionix.io";

const SOCIAL_LINKS = [
  { label: "GitHub",   handle: "fuzionix",   href: "https://github.com/fuzionix" },
  { label: "DEV",      handle: "fuzionix",   href: "https://dev.to/fuzionix" },
  { label: "Threads",  handle: "@fuzion.ix", href: "https://www.threads.com/@fuzion.ix" },
] as const;

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
      className={`border-r border-b border-border flex flex-col hover:bg-ink/3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Email Cell */
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

/* Social Links Cell */
function SocialCell() {
  return (
    <FooterCell
      delay={0.2}
      className="col-span-12 md:col-span-5 p-8 md:p-12 justify-between gap-10"
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs tracking-widest uppercase text-ash">
          Elsewhere
        </span>
        <ArrowUpRight size={18} className="text-ash" strokeWidth={1.5} />
      </div>

      <ul className="flex flex-col divide-y divide-border">
        {SOCIAL_LINKS.map(({ label, handle, href }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.65, ease: EASE }}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 transition-all duration-300"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-xs tracking-widest uppercase text-ash/50">
                  {label}
                </span>
                <span className="text-2xl font-bold text-ink tracking-tight leading-tight group-hover:text-ash transition-colors duration-300">
                  {handle}
                </span>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Availability Pulse */}
      <div className="flex items-center gap-2 pt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-700 animate-pulse shrink-0" />
        <span className="font-sans text-xs text-ash">
          Available for new projects
        </span>
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

/* Copyright Bar Cell */
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

      {/* Row 1 — Email hero + Socials */}
      <EmailCell />
      <SocialCell />

      {/* Row 2 — Site links + Colophon + Copyright */}
      <SiteLinksCell />
      <ColophonCell />
      <CopyrightCell />

    </footer>
  );
}