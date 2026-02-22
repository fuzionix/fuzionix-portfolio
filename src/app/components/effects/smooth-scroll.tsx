import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  
  // Physics tuned for a calm, editorial momentum feel
  const smoothY = useSpring(scrollY, { damping: 15, mass: 0.1, stiffness: 75 });
  const y = useTransform(smoothY, (value) => -value);

  const contentRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices to fallback to native scrolling (better for touch)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync document height with the fixed container height
  useEffect(() => {
    if (isMobile) return;

    const updateHeight = () => {
      if (contentRef.current) {
        setPageHeight(contentRef.current.scrollHeight);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Invisible element to force the body to have the correct scrollable height */}
      <div style={{ height: pageHeight }} />
      {/* The fixed container that moves smoothly via Framer Motion */}
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 inset-x-0 will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
}