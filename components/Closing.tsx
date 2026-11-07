"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { kindFor, Stem } from "@/components/Flower";
import { useBouquet } from "@/components/BouquetContext";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { closing, memories } = content;
const TOTAL = memories.length;

/** The corner bouquet, handed over at full size. */
function FullBouquet({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const spread = 62;
  const step = TOTAL > 1 ? spread / (TOTAL - 1) : 0;

  return (
    <svg
      viewBox="-120 -50 240 270"
      className="mx-auto h-[300px] w-auto sm:h-[380px]"
      aria-label={`A bouquet of ${TOTAL} flowers`}
      role="img"
    >
      {Array.from({ length: TOTAL }, (_, i) => {
        const angle = -spread / 2 + step * i;
        return (
          <g key={i} transform={`rotate(${angle} 0 190)`}>
            <motion.g
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3 }}
              animate={active ? { opacity: 1, scale: 1 } : undefined}
              transition={
                reduceMotion
                  ? { duration: 0.4, delay: i * 0.05 }
                  : {
                      type: "spring",
                      stiffness: 110,
                      damping: 13,
                      delay: 0.15 + i * 0.13,
                    }
              }
              style={{ transformOrigin: "0px 190px" }}
            >
              <Stem
                kind={kindFor(i)}
                tone={i % 3 === 1 ? "deep" : "light"}
                curve={i % 2 === 0 ? 14 : -14}
                length={188}
              />
            </motion.g>
          </g>
        );
      })}

      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={active ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, delay: 0.05 }}
      >
        <path
          d="M-34 168 L34 168 L22 218 L-22 218 Z"
          fill="#e6d3cc"
          stroke="#c2a15b"
          strokeWidth="1.6"
        />
        <path d="M-34 168 L0 189 L34 168" fill="none" stroke="#c2a15b" strokeWidth="1.6" />
        <path
          d="M-25 189 C -9 197, 9 197, 25 189"
          fill="none"
          stroke="#c9748a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M25 189 C 33 184, 37 192, 30 196"
          fill="none"
          stroke="#c9748a"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
}

export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const { setFinale } = useBouquet();

  // Hand the bouquet over: the corner copy retires as this comes into view.
  useEffect(() => {
    if (inView) setFinale(true);
  }, [inView, setFinale]);

  return (
    <section ref={ref} className="px-6 pb-32 pt-16 sm:pb-44">
      <div className="mx-auto max-w-2xl text-center">
        <FullBouquet active={inView} />

        {/* The one flower deliberately left out of the bouquet: a closed bud
            for her to "give back". It asks nothing, it just waits. */}
        <motion.figure
          className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <svg width="58" height="110" viewBox="-22 -40 44 84" aria-hidden="true" className="shrink-0 -rotate-12">
            <path d="M0 4 C 4 18, -4 30, 2 44" stroke="#8c9e86" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M1 22 C 12 16, 16 24, 2 28" fill="#8c9e86" opacity="0.85" />
            <path d="M0 -34 C 9 -26, 10 -6, 0 6 C -10 -6, -9 -26, 0 -34 Z" fill="#f0c4cc" stroke="#e2a4b1" strokeWidth="1.2" />
            <path d="M0 -30 C 3 -18, 2 -6, 0 4" stroke="#e2a4b1" strokeWidth="1" fill="none" />
            <path d="M-6 0 C -3 6, 3 6, 6 0" fill="#8c9e86" />
          </svg>
          <figcaption className="font-[family-name:var(--font-hand)] text-left text-[1.25rem] leading-snug text-[#6e5a61]">
            {closing.bud}
          </figcaption>
        </motion.figure>

        {/* Held back until the bouquet has finished assembling, then read out
            one line at a time. */}
        <Stagger gap={0.13} delay={0.55}>
          <StaggerItem>
            <p className="mt-12 text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
              {closing.label}
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-display mt-4 text-[clamp(1.9rem,5vw,2.9rem)] font-light leading-tight text-[#3b2b33]">
              {closing.heading}
            </h2>
          </StaggerItem>

          <div className="mt-8 space-y-5">
            {closing.paragraphs.map((paragraph) => (
              <StaggerItem key={paragraph} as="p">
                <span className="block text-[15.5px] leading-[1.75] text-[#4d3b43] sm:text-[17px]">
                  {paragraph}
                </span>
              </StaggerItem>
            ))}
          </div>

          <StaggerItem>
            <div className="mt-12">
              <p className="font-[family-name:var(--font-hand)] text-[1.7rem] leading-tight text-[#a8556c]">
                {closing.signoff}
              </p>
              <p className="mt-1 text-sm tracking-wide text-[#6e5a61]">
                {closing.from}
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
