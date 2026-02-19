"use client";

import React from 'react';
import { motion } from 'framer-motion';

const GridCell = ({ 
  children, 
  className = "", 
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
  delay?: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative border-r border-b border-neutral-300 p-6 md:p-10 flex flex-col justify-between
        bg-paper hover:bg-white/40 transition-colors duration-500
        ${colSpan} ${rowSpan} ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default function Portfolio() {
  return (
    <div className="min-h-screen w-full bg-paper text-ink font-sans selection:bg-ink selection:text-paper">
      
    </div>
  );
}