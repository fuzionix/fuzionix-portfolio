import { useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { ThemeContext } from "@/app/components/utils/contexts";
import { EASE } from "@/app/constant";

const NAV_LINKS = ["Work", "Tools", "Writing", "About", "Contact"] as const;

export function Navigation() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 h-14 flex items-center justify-between px-8 md:px-12 border-b border-border bg-paper/90 backdrop-blur-sm"
    >
      <span className="-mb-1 font-bold text-sm tracking-tight text-ink select-none">
        <Image
          src="/logo/Fuzionix-logo.svg"
          alt="Fuzionix Logo"
          width={18}
          height={18}
          priority
          style={{
            filter: dark ? "invert(1)" : "none",
            transition: "filter 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </span>

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

        {/* Theme Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.72, duration: 0.5 }}
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="flex items-center justify-center w-8 h-8 rounded-sm border border-border cursor-pointer text-ash hover:text-ink hover:border-ink/30 transition-colors duration-300"
        >
          <motion.div
            key={dark ? "sun" : "moon"}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {dark ? (
              <Sun size={13} strokeWidth={1.5} />
            ) : (
              <Moon size={13} strokeWidth={1.5} />
            )}
          </motion.div>
        </motion.button>

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