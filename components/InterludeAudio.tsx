"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FEATURE_AUDIO_EVENT } from "@/components/BackgroundMusic";
import { content } from "@/content";

const { interlude } = content;

type Status = "idle" | "playing" | "blocked" | "done";

const announce = (detail: "start" | "end") =>
  window.dispatchEvent(new CustomEvent(FEATURE_AUDIO_EVENT, { detail }));

/** Ease the volume up so it doesn't slam in over a silent page. */
function fadeIn(audio: HTMLAudioElement) {
  audio.volume = 0;
  const target = 0.85;
  const started = performance.now();
  const step = () => {
    const t = Math.min((performance.now() - started) / 900, 1);
    audio.volume = target * t;
    if (t < 1 && !audio.paused) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/**
 * Plays the song once, in full, when she reaches this section.
 *
 * Browsers refuse to start audio with sound unless the page has had a real
 * click or tap first — scrolling doesn't count. So this *attempts* to play and,
 * if the browser says no, shows a quiet prompt instead of silently failing.
 * Either way it only ever happens once; scrolling back up won't restart it.
 */
export function InterludeAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const attempted = useRef(false);
  const [status, setStatus] = useState<Status>("idle");

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        announce("start");
        fadeIn(audio);
        setStatus("playing");
      })
      .catch(() => setStatus("blocked"));
  }, []);

  /**
   * Browsers only refuse audio when the page has had no tap or click at all.
   * So the first time she touches anything — "Start here", a flower, a clip,
   * anywhere — we silently prime the element: play muted, immediately pause,
   * rewind. That counts as user-activated, so the real play() at the interlude
   * is allowed and she never sees the button.
   *
   * If she scrolls the whole way without ever tapping, nothing can bypass the
   * policy, and that's exactly when the fallback prompt earns its place.
   */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = ["pointerdown", "touchstart", "keydown"] as const;

    const prime = () => {
      // Never interfere once the real playback has started.
      if (attempted.current) return cleanup();
      const restore = audio.muted;
      audio.muted = true;
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = restore;
        })
        .catch(() => {
          audio.muted = restore;
        });
      cleanup();
    };

    const cleanup = () => {
      events.forEach((e) => document.removeEventListener(e, prime));
    };

    events.forEach((e) =>
      document.addEventListener(e, prime, { once: true, passive: true }),
    );

    return cleanup;
  }, []);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || attempted.current) return;
        attempted.current = true;
        start();
      },
      // Wait until the line genuinely fills the screen, not just peeks in.
      { threshold: 0.6 },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, [start]);

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setStatus("done");
    announce("end");
  };

  return (
    <>
      <div
        ref={markerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />

      <audio
        ref={audioRef}
        src={interlude.audio}
        preload="auto"
        onEnded={() => {
          setStatus("done");
          announce("end");
        }}
      />

      {/* Shown only when the browser blocked playback */}
      <AnimatePresence>
        {status === "blocked" && (
          <motion.button
            key="prompt"
            type="button"
            onClick={start}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mx-auto mt-12 flex items-center gap-2.5 rounded-full border border-[#c2a15b]/50 px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-[#f0c4cc] transition-colors hover:border-[#c9748a] hover:text-[#faf3ef]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
            {interlude.audioPrompt}
          </motion.button>
        )}
      </AnimatePresence>

      {/* A way out, wherever she's scrolled to by then */}
      <AnimatePresence>
        {status === "playing" && (
          <motion.button
            key="stop"
            type="button"
            onClick={stop}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45 }}
            aria-label={interlude.audioStop}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#3b2b33]/90 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#f0c4cc] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#3b2b33]"
          >
            <span aria-hidden="true" className="flex items-end gap-[2px]">
              {[0, 0.2, 0.4].map((d) => (
                <motion.span
                  key={d}
                  className="block w-[3px] rounded-sm bg-[#c9748a]"
                  animate={{ height: [4, 12, 4] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: d,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
            {interlude.audioStop}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
