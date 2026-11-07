"use client";

import { motion, useReducedMotion } from "motion/react";
import { Petals } from "@/components/Petals";
import { content } from "@/content";

const { hero, her } = content;

export function Hero() {
  const reduceMotion = useReducedMotion();

  // One orchestrated page-load sequence, then the page goes quiet.
  const rise = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0.4 : 1,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 0.61, 0.36, 1] as const,
    },
  });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
      <Petals />

      <div className="relative z-10 w-full max-w-3xl text-center">
        <motion.p
          {...rise(0.1)}
          className="text-[11px] uppercase tracking-[0.32em] text-[#8c9e86]"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.25)}
          className="font-display mt-7 text-[clamp(2.9rem,10vw,6.5rem)] font-light leading-[0.95] text-[#3b2b33]"
        >
          {hero.title}
        </motion.h1>

        {/* A single stem laid across the title, like a real pressed specimen */}
        <motion.svg
          viewBox="0 0 420 40"
          className="mx-auto mt-6 h-9 w-[min(420px,80%)]"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: reduceMotion ? 0 : 0.7 }}
        >
          <motion.path
            d="M8 22 C 110 6, 300 34, 412 16"
            fill="none"
            stroke="#8c9e86"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
          />
          <ellipse cx="128" cy="15" rx="15" ry="7" fill="#8c9e86" opacity="0.8" transform="rotate(-14 128 15)" />
          <ellipse cx="252" cy="27" rx="14" ry="6.5" fill="#6d7f68" opacity="0.75" transform="rotate(11 252 27)" />
          <circle cx="412" cy="16" r="7" fill="#c9748a" />
          <circle cx="399" cy="12" r="4.5" fill="#f0c4cc" />
        </motion.svg>

        <motion.p
          {...rise(0.5)}
          className="font-[family-name:var(--font-hand)] mt-5 text-[clamp(1.7rem,4.5vw,2.6rem)] leading-tight text-[#a8556c]"
        >
          for {her.name}, {her.nickname}
        </motion.p>

        <motion.div {...rise(0.7)} className="mt-10 space-y-1.5">
          {hero.lines.map((line) => (
            <p
              key={line}
              className="text-[15px] leading-relaxed text-[#6e5a61] sm:text-base"
            >
              {line}
            </p>
          ))}
        </motion.div>

        <motion.a
          {...rise(0.95)}
          href="#letter"
          className="group mt-14 inline-flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#6e5a61] transition-colors hover:text-[#a8556c]"
        >
          {hero.scrollCue}
          <motion.span
            aria-hidden="true"
            className="block h-8 w-px bg-[#c2a15b]"
            animate={reduceMotion ? {} : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.a>
      </div>
    </section>
  );
}
