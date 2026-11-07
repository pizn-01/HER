"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Anything on the page can ask for a burst of hearts at a point on screen. */
export const HEART_BURST_EVENT = "heart-burst";
export type HeartBurstDetail = { x: number; y: number; count?: number };

export function burstHearts(detail: HeartBurstDetail) {
  window.dispatchEvent(new CustomEvent(HEART_BURST_EVENT, { detail }));
}

const COLORS = ["#f0c4cc", "#e2a4b1", "#c9748a", "#a8556c", "#f5d7dc"];

// Ambient rain. Fixed values, not Math.random(), so server and client agree.
const RAIN = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 7) % 100,
  size: 12 + ((i * 7) % 14),
  duration: 9 + ((i * 5) % 8),
  delay: (i * 1.3) % 11,
  color: COLORS[i % COLORS.length],
}));

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  rot: number;
};

let nextId = 0;

function Heart({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.2 0 3.7 1.3 4.6 2.7.3.5 1.1.5 1.4 0 .9-1.4 2.4-2.7 4.6-2.7 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Showers her in hearts: a gentle rain over the whole page, a small burst
 * wherever she taps, and a big one when another component asks for it.
 * All of it is skipped under reduced motion.
 */
export function HeartShower() {
  const reduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (reduceMotion) return;

    const spawn = ({ x, y, count = 7 }: HeartBurstDetail) => {
      const big = count > 12;
      const fresh: Particle[] = Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
        const dist = 60 + Math.random() * (big ? 220 : 90);
        return {
          id: nextId++,
          x,
          y,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 60,
          size: 14 + Math.random() * (big ? 22 : 12),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rot: (Math.random() - 0.5) * 60,
        };
      });
      setParticles((p) => [...p, ...fresh].slice(-120));
      const ids = new Set(fresh.map((f) => f.id));
      setTimeout(() => setParticles((p) => p.filter((q) => !ids.has(q.id))), 1600);
    };

    const onTap = (e: PointerEvent) => spawn({ x: e.clientX, y: e.clientY, count: 6 });
    const onBurst = (e: Event) => spawn((e as CustomEvent<HeartBurstDetail>).detail);

    document.addEventListener("pointerdown", onTap, { passive: true });
    window.addEventListener(HEART_BURST_EVENT, onBurst);
    return () => {
      document.removeEventListener("pointerdown", onTap);
      window.removeEventListener(HEART_BURST_EVENT, onBurst);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {RAIN.map((h, i) => (
        <span
          key={i}
          className="falling-heart"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <Heart size={h.size} color={h.color} />
        </span>
      ))}

      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute"
            style={{ left: p.x - p.size / 2, top: p.y - p.size / 2 }}
            initial={{ x: 0, y: 0, scale: 0.3, opacity: 1, rotate: 0 }}
            animate={{ x: p.dx, y: p.dy, scale: 1, opacity: 0, rotate: p.rot }}
            transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Heart size={p.size} color={p.color} />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
