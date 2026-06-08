"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";
import Navbar from "./Navbar";
import DemoConsole from "./DemoConsole";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-brand-warm-white min-h-screen flex items-center justify-center">
        {/* Simple placeholder during hydration to avoid layout shifts */}
        <div className="w-6 h-6 rounded-full border-2 border-brand-navy border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!loadingComplete && (
          <Loader key="loader" onComplete={() => setLoadingComplete(true)} />
        )}
      </AnimatePresence>

      <SmoothScroll>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col min-h-screen"
          style={{ visibility: loadingComplete ? "visible" : "hidden" }}
        >
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <DemoConsole />
        </motion.div>
      </SmoothScroll>
    </>
  );
}
