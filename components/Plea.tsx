"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { burstHearts } from "@/components/HeartShower";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { plea } = content;

/**
 * Where "Not yet" flees to, as fractions of the screen. Corners and edges,
 * and once it hides half off the right edge, peeking back in.
 */
const SPOTS: { x: number; y: number; peek?: boolean }[] = [
  { x: 0.04, y: 0.08 }, // top-left corner
  { x: 0.96, y: 0.9 }, // bottom-right corner
  { x: 0.96, y: 0.1 }, // top-right corner
  { x: 0.04, y: 0.88 }, // bottom-left corner
  { x: 1.0, y: 0.5, peek: true }, // half-hiding at the right edge, still readable
  { x: 0.5, y: 0.06 }, // top middle
  { x: 0.04, y: 0.5 }, // left edge
];

const SPINS = [-14, 18, -22, 12, -8, 25, -16];

/**
 * "Not yet" runs away around the screen for the laugh, with a more desperate
 * label each time, while "Yes" grows. Once the labels run out it comes home
 * and can be caught, so it's still a real answer with a gentle reply.
 * Nothing is sent anywhere either way.
 */
export function Plea() {
  const [answer, setAnswer] = useState<"yes" | "notYet" | null>(null);
  const [dodges, setDodges] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const homeRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  // The tap that triggers a dodge must not also count as a click.
  const justDodged = useRef(false);

  const maxDodges = plea.notYetLabels.length - 1;
  const caught = dodges >= maxDodges;

  const dodge = (e: React.PointerEvent) => {
    if (caught || answer) return;
    e.preventDefault();
    justDodged.current = true;

    const next = dodges + 1;
    if (next >= maxDodges) {
      // Out of tries: wander back home, ready to be caught.
      setOffset({ x: 0, y: 0 });
      setDodges(next);
      return;
    }

    const home = homeRef.current?.getBoundingClientRect();
    const btn = btnRef.current?.getBoundingClientRect();
    if (!home || !btn) return;

    const spot = SPOTS[dodges % SPOTS.length];
    const margin = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Target top-left of the button. Kept on screen, except when peeking.
    let left = spot.x * vw - btn.width / 2;
    let top = spot.y * vh - btn.height / 2;
    left = spot.peek
      ? vw - btn.width * 0.68
      : Math.min(Math.max(left, margin), vw - btn.width - margin);
    top = Math.min(Math.max(top, margin), vh - btn.height - margin);

    setOffset({ x: left - home.left, y: top - home.top });
    setDodges(next);
  };

  const sayYes = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnswer("yes");
    setOffset({ x: 0, y: 0 });
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    burstHearts({ x, y, count: 28 });
    setTimeout(() => burstHearts({ x: window.innerWidth * 0.25, y: y - 120, count: 18 }), 250);
    setTimeout(() => burstHearts({ x: window.innerWidth * 0.75, y: y - 160, count: 18 }), 450);
  };

  const fleeing = dodges > 0 && !caught && !answer;
  const yesScale = answer ? 1 : 1 + Math.min(dodges, maxDodges) * 0.06;

  return (
    <section className="px-6 py-20 sm:py-28">
      <Stagger className="mx-auto max-w-md text-center" gap={0.14}>
        <StaggerItem>
          {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF; next/image would freeze it */}
          <img
            src={plea.gif}
            alt={plea.gifAlt}
            className="mx-auto mb-10 w-[170px] rotate-2 rounded-3xl border-[5px] border-[#fdf8f5] shadow-[0_16px_32px_-16px_rgba(59,43,51,0.5)] sm:w-[200px]"
          />
        </StaggerItem>

        <StaggerItem>
          <h2 className="font-display text-[clamp(2rem,6.5vw,3rem)] font-light leading-tight text-[#3b2b33]">
            {plea.question}
          </h2>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-12 flex items-center justify-center gap-5">
            <motion.button
              type="button"
              onClick={sayYes}
              whileTap={{ scale: yesScale * 0.94 }}
              animate={answer ? { scale: 1 } : { scale: [yesScale, yesScale * 1.05, yesScale] }}
              transition={{ duration: 1.6, repeat: answer ? 0 : Infinity, ease: "easeInOut" }}
              className="relative z-10 rounded-full bg-[#c9748a] px-8 py-3.5 text-[16px] text-white shadow-[0_12px_26px_-12px_rgba(168,85,108,0.8)] transition-colors hover:bg-[#a8556c]"
            >
              {plea.yes}
            </motion.button>

            {/* The home spot stays put so every escape is measured from it. */}
            <span ref={homeRef} className="relative inline-block">
              <motion.button
                ref={btnRef}
                type="button"
                onPointerEnter={(e) => e.pointerType === "mouse" && dodge(e)}
                onPointerDown={dodge}
                onClick={() => {
                  if (justDodged.current) {
                    justDodged.current = false;
                    return;
                  }
                  if (caught) setAnswer("notYet");
                }}
                animate={{
                  x: offset.x,
                  y: offset.y,
                  rotate: fleeing ? SPINS[(dodges - 1) % SPINS.length] : 0,
                  scale: fleeing ? 0.9 : 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                whileTap={caught ? { scale: 0.96 } : undefined}
                className="relative z-40 whitespace-nowrap rounded-full border border-[#e6d3cc] bg-[#fdf8f5] px-6 py-3.5 text-[16px] text-[#6e5a61] shadow-[0_10px_24px_-14px_rgba(59,43,51,0.5)] transition-colors hover:border-[#c9748a]/40"
              >
                {plea.notYetLabels[Math.min(dodges, maxDodges)]}
              </motion.button>
            </span>
          </div>
        </StaggerItem>

        <AnimatePresence mode="wait">
          {answer && (
            <motion.p
              key={answer}
              role="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="font-[family-name:var(--font-hand)] mx-auto mt-8 text-[1.55rem] leading-snug text-[#a8556c]"
            >
              {answer === "yes" ? plea.yesReply : plea.notYetReply}
            </motion.p>
          )}
        </AnimatePresence>
      </Stagger>
    </section>
  );
}
