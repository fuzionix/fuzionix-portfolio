import { useContext, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CursorContext, ThemeContext } from "@/app/components/utils/contexts";

export function CursorFollower() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const { isHovering } = useContext(CursorContext);
  const { dark } = useContext(ThemeContext);

  const dotX = useSpring(mx, { stiffness: 700, damping: 45 });
  const dotY = useSpring(my, { stiffness: 700, damping: 45 });
  const ringX = useSpring(mx, { stiffness: 90, damping: 12 });
  const ringY = useSpring(my, { stiffness: 90, damping: 12 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const idleBorder = dark
    ? "rgba(240, 237, 232, 0.28)"
    : "rgba(136, 136, 136, 0.3)";
  const hoverBg = dark
    ? "rgba(240, 237, 232, 0.07)"
    : "rgba(26, 26, 26, 0.06)";
  const hoverBorder = dark
    ? "rgba(240, 237, 232, 0.2)"
    : "rgba(26, 26, 26, 0.15)";

  return (
    <div className="pointer-events-none fixed inset-0 z-10000 hidden md:block">
      {/* Lagging Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovering ? 0.75 : 1,
          backgroundColor: isHovering ? hoverBg : "rgba(0,0,0,0)",
          borderColor: isHovering ? hoverBorder : idleBorder,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute w-36 h-36 rounded-full border box-border"
      />

      {/* Fast Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute w-1.5 h-1.5 rounded-full border border-paper box-content bg-ink/70"
      />
    </div>
  );
}