import { Reveal } from "@/components/Reveal";
import { content } from "@/content";

/**
 * The one flower left out of the garden's bouquet: a closed bud for her to
 * "give back" whenever she's ready. It asks nothing, it just waits.
 */
export function Bud() {
  return (
    <Reveal className="px-6">
      <figure className="mx-auto flex max-w-xs items-center justify-center gap-4">
        <svg width="58" height="110" viewBox="-22 -40 44 84" aria-hidden="true" className="shrink-0 -rotate-12">
          <path d="M0 4 C 4 18, -4 30, 2 44" stroke="#8c9e86" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M1 22 C 12 16, 16 24, 2 28" fill="#8c9e86" opacity="0.85" />
          <path d="M0 -34 C 9 -26, 10 -6, 0 6 C -10 -6, -9 -26, 0 -34 Z" fill="#f0c4cc" stroke="#e2a4b1" strokeWidth="1.2" />
          <path d="M0 -30 C 3 -18, 2 -6, 0 4" stroke="#e2a4b1" strokeWidth="1" fill="none" />
          <path d="M-6 0 C -3 6, 3 6, 6 0" fill="#8c9e86" />
        </svg>
        <figcaption className="font-[family-name:var(--font-hand)] text-left text-[1.25rem] leading-snug text-[#6e5a61]">
          {content.closing.bud}
        </figcaption>
      </figure>
    </Reveal>
  );
}
