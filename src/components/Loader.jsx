"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Navigation2, Compass, Layers } from "lucide-react";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const duration = 2800; // 2.8s loading
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600); // Small pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setStage(0);
    else if (progress < 50) setStage(1);
    else if (progress < 75) setStage(2);
    else if (progress < 90) setStage(3);
    else setStage(4);
  }, [progress]);

  const stages = [
    {
      text: "Loading city grid database...",
      icon: <Layers className="w-4 h-4 text-brand-teal" />,
    },
    {
      text: "Drawing delivery vectors...",
      icon: <Navigation2 className="w-4 h-4 text-brand-blue" />,
    },
    {
      text: "Scanning available locations...",
      icon: <Compass className="w-4 h-4 text-brand-teal" />,
    },
    {
      text: "Optimizing reservation routes...",
      icon: <Navigation2 className="w-4 h-4 text-brand-blue rotate-45" />,
    },
    {
      text: "Ready to reserve.",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        clipPath: "circle(0% at 50% 50%)",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-warm-white select-none overflow-hidden"
    >
      {/* City Map Drawing Canvas */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <motion.div
          initial={{ scale: 1.05, rotate: -3 }}
          animate={{ scale: 1.25, rotate: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="w-[1200px] h-[800px] relative flex items-center justify-center"
        >
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full text-brand-cream-dark"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {/* Background Grids / Blocks */}
            <rect
              x="50"
              y="50"
              width="300"
              height="200"
              rx="12"
              fill="#F7F4EF"
              strokeWidth="0.5"
            />
            <rect
              x="380"
              y="50"
              width="200"
              height="350"
              rx="12"
              fill="#F7F4EF"
              strokeWidth="0.5"
            />
            <rect
              x="610"
              y="50"
              width="540"
              height="150"
              rx="12"
              fill="#F7F4EF"
              strokeWidth="0.5"
            />
            <rect
              x="50"
              y="280"
              width="300"
              height="470"
              rx="12"
              fill="#F7F4EF"
              strokeWidth="0.5"
            />
            <rect
              x="380"
              y="430"
              width="450"
              height="320"
              rx="12"
              fill="#F7F4EF"
              strokeWidth="0.5"
            />
            <rect
              x="860"
              y="230"
              width="290"
              height="350"
              rx="12"
              fill="#F7F4EF"
              strokeWidth="0.5"
            />
            <rect
              x="860"
              y="600"
              width="290"
              height="150"
              rx="12"
              fill="#F7F4EF"
              strokeWidth="0.5"
            />

            {/* River / Blue corridor */}
            <path
              d="M-100,600 C300,580 500,200 1300,150"
              stroke="#E0F2FE"
              strokeWidth="45"
              strokeLinecap="round"
              className="opacity-70"
            />

            <path
              d="M-100,600 C300,580 500,200 1300,150"
              stroke="#0EA5E9"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              className="opacity-40"
            />

            {/* Major Roads (Paths that will auto-draw) */}
            <path
              d="M100,-50 L100,850"
              strokeWidth="3"
              className="route-path text-brand-slate/10"
            />

            <path
              d="M380,-50 L380,850"
              strokeWidth="3"
              className="route-path text-brand-slate/10"
            />

            <path
              d="M850,-50 L850,850"
              strokeWidth="3"
              className="route-path text-brand-slate/10"
            />

            <path
              d="M-50,250 L1250,250"
              strokeWidth="3"
              className="route-path text-brand-slate/10"
            />

            <path
              d="M-50,420 L1250,420"
              strokeWidth="3"
              className="route-path text-brand-slate/10"
            />

            <path
              d="M-50,590 L1250,590"
              strokeWidth="3"
              className="route-path text-brand-slate/10"
            />

            {/* Food Truck Routes Drawing Themselves */}
            <motion.path
              d="M380,850 L380,420 L850,420 L850,230"
              stroke="#0D9488"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="600"
              initial={{ strokeDashoffset: 600 }}
              animate={{
                strokeDashoffset:
                  progress > 15 ? 600 - (progress - 15) * 7 : 600,
              }}
              transition={{ ease: "linear" }}
            />

            <motion.path
              d="M100,-50 L100,250 L380,250 L380,590 L850,590"
              stroke="#0EA5E9"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="800"
              initial={{ strokeDashoffset: 800 }}
              animate={{
                strokeDashoffset:
                  progress > 5 ? 800 - (progress - 5) * 9.5 : 800,
              }}
              transition={{ ease: "linear" }}
            />
          </svg>

          {/* Pulsing Reservation Pins that appear based on progress percentage */}
          {progress >= 20 && (
            <div className="absolute top-[250px] left-[100px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-12 w-12 rounded-full bg-brand-teal/20 pulse-ring"></span>
              <span className="relative flex h-4 w-4 rounded-full bg-brand-teal pulse-dot"></span>
            </div>
          )}

          {progress >= 45 && (
            <div className="absolute top-[420px] left-[380px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-12 w-12 rounded-full bg-brand-blue/20 pulse-ring"></span>
              <span className="relative flex h-4 w-4 rounded-full bg-brand-blue pulse-dot"></span>
            </div>
          )}

          {progress >= 70 && (
            <div className="absolute top-[250px] left-[380px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-12 w-12 rounded-full bg-brand-teal/20 pulse-ring"></span>
              <span className="relative flex h-4 w-4 rounded-full bg-brand-teal pulse-dot"></span>
            </div>
          )}

          {progress >= 85 && (
            <div className="absolute top-[590px] left-[850px] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-12 w-12 rounded-full bg-brand-blue/20 pulse-ring"></span>
              <span className="relative flex h-4 w-4 rounded-full bg-brand-blue pulse-dot"></span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Main Info Card */}
      <div className="relative z-10 text-center max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Logo / Brand Name */}
          <div className="flex items-center space-x-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-brand-navy flex items-center justify-center shadow-md shadow-brand-navy/10">
              <span className="text-brand-warm-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-navy">
              Spot<span className="text-brand-teal">Reserve</span>
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest text-brand-slate font-semibold mb-12">
            Premium Food Truck Location Management
          </p>

          {/* Loading Dial / Circle */}
          <div className="relative flex items-center justify-center w-36 h-36 mb-10">
            {/* Outer ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="text-brand-cream"
                strokeWidth="2.5"
                fill="transparent"
                stroke="currentColor"
              />

              <motion.circle
                cx="72"
                cy="72"
                r="64"
                className="text-brand-navy"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={402}
                strokeDashoffset={402 - (402 * progress) / 100}
                strokeLinecap="round"
                stroke="currentColor"
              />
            </svg>

            {/* Inner Percentage text */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-brand-navy font-mono">
                {Math.round(progress)}%
              </span>
              <span className="text-[10px] text-brand-slate font-medium uppercase tracking-wider mt-0.5">
                Optimizing
              </span>
            </div>
          </div>

          {/* Micro stage indicators */}
          <div className="h-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex items-center space-x-2 bg-brand-cream/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-navy/5 shadow-sm"
              >
                {stages[stage].icon}
                <span className="text-xs text-brand-navy font-medium font-sans">
                  {stages[stage].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Aesthetic bottom indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center text-[10px] text-brand-slate/40 tracking-wider">
        SECURE ENTERPRISE ENCRYPTED LINK
      </div>
    </motion.div>
  );
}
