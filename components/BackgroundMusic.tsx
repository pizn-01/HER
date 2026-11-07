"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Head } from "@/components/Flower";
import { content } from "@/content";

const { music } = content;
const MUTE_KEY = "bg-music-muted";

/** Other audio on the page announces itself with this event so the
 *  background song can step aside and come back afterwards. */
export const FEATURE_AUDIO_EVENT = "feature-audio";
export type FeatureAudioDetail = "start" | "end";

function fade(audio: HTMLAudioElement, to: number, ms: number, done?: () => void) {
  const from = audio.volume;
  const t0 = performance.now();
  const step = () => {
    const t = Math.min((performance.now() - t0) / ms, 1);
    audio.volume = from + (to - from) * t;
    if (t < 1) requestAnimationFrame(step);
    else done?.();
  };
  requestAnimationFrame(step);
}

/**
 * The song that plays softly under everything. Browsers won't start sound on a
 * page nobody has touched, so it fades in on her first tap or key press. If the
 * mp3 isn't in /public yet, the player never appears.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Read once on mount. The button only renders client-side (after the mp3's
  // metadata loads), so this can't cause a hydration mismatch.
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [featureOn, setFeatureOn] = useState(false);
  const mutedRef = useRef(muted);
  const resumeAfterFeature = useRef(false);

  // The file can finish loading before React hydrates, so an onLoadedMetadata
  // prop would miss it. Check the element's real state, then subscribe.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const ready = () => setAvailable(true);
    const gone = () => setAvailable(false);
    if (audio.readyState >= 1) void Promise.resolve().then(ready);
    audio.addEventListener("loadedmetadata", ready);
    audio.addEventListener("error", gone);
    return () => {
      audio.removeEventListener("loadedmetadata", ready);
      audio.removeEventListener("error", gone);
    };
  }, []);

  const start = (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio || mutedRef.current) return Promise.resolve(false);
    audio.volume = 0;
    return audio
      .play()
      .then(() => {
        setPlaying(true);
        fade(audio, music.volume, 2200);
        return true;
      })
      .catch(() => false);
  };

  // Try to play the moment she lands. Most phones refuse sound before a tap;
  // when they do, a soft "tap to open" screen appears instead, and that one
  // tap starts the song straight away.
  const [gate, setGate] = useState(false);
  useEffect(() => {
    if (!available || mutedRef.current) return;
    void start().then((ok) => {
      if (!ok) setGate(true);
    });
  }, [available]);

  // First interaction anywhere starts it.
  useEffect(() => {
    if (!available) return;
    const events = ["pointerdown", "touchstart", "keydown"] as const;
    const onFirst = () => {
      events.forEach((e) => document.removeEventListener(e, onFirst));
      if (audioRef.current?.paused) void start();
    };
    events.forEach((e) => document.addEventListener(e, onFirst, { passive: true }));
    return () => events.forEach((e) => document.removeEventListener(e, onFirst));
  }, [available]);

  // Step aside for the featured track, then come back.
  useEffect(() => {
    const onFeature = (e: Event) => {
      const audio = audioRef.current;
      if (!audio) return;
      const detail = (e as CustomEvent<FeatureAudioDetail>).detail;
      if (detail === "start") {
        setFeatureOn(true);
        resumeAfterFeature.current = !audio.paused;
        if (!audio.paused) fade(audio, 0, 600, () => audio.pause());
      } else {
        setFeatureOn(false);
        if (resumeAfterFeature.current && !mutedRef.current) {
          void audio.play().then(() => fade(audio, music.volume, 1800)).catch(() => {});
        }
      }
    };
    window.addEventListener(FEATURE_AUDIO_EVENT, onFeature);
    return () => window.removeEventListener(FEATURE_AUDIO_EVENT, onFeature);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    mutedRef.current = next;
    setMuted(next);
    try {
      localStorage.setItem(MUTE_KEY, next ? "1" : "0");
    } catch {}
    if (next) fade(audio, 0, 500, () => audio.pause());
    else void start();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="metadata"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <AnimatePresence>
        {gate && (
          <motion.button
            key="gate"
            type="button"
            onClick={() => {
              setGate(false);
              void start();
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#faf3ef] text-center"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, rgba(240,196,204,0.45), transparent 50%), radial-gradient(circle at 75% 85%, rgba(140,158,134,0.2), transparent 50%)",
            }}
            aria-label={`${music.gateLabel}, ${music.gateCta}`}
          >
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Head kind="daisy" size={84} />
            </motion.span>
            <span className="font-[family-name:var(--font-hand)] text-[clamp(2rem,7vw,2.8rem)] text-[#a8556c]">
              {music.gateLabel}
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#6e5a61]">
              {music.gateCta}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {available && !featureOn && !gate && (
          <motion.button
            type="button"
            onClick={toggle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label={muted || !playing ? `Play ${music.title}` : `Mute ${music.title}`}
            title={music.title}
            className="fixed right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#faf3ef]/85 text-[#a8556c] shadow-[0_6px_18px_-8px_rgba(59,43,51,0.5)] backdrop-blur-sm transition hover:bg-[#faf3ef]"
          >
            {playing && !muted ? (
              <span aria-hidden="true" className="flex items-end gap-[2px]">
                {[0, 0.25, 0.5].map((d) => (
                  <motion.span
                    key={d}
                    className="block w-[3px] rounded-sm bg-[#c9748a]"
                    animate={{ height: [4, 13, 4] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: d, ease: "easeInOut" }}
                  />
                ))}
              </span>
            ) : (
              <span aria-hidden="true" className="text-lg leading-none">♪</span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
