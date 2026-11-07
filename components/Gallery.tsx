"use client";

import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";
import { PHOTOS } from "@/media";

const { gallery } = content;

// Fixed tilts so the scatter reads hand-laid rather than generated.
const TILTS = [-2.4, 1.8, -1.1, 2.2, -1.9, 1.3, -2.7, 1.6];

// Photos that already carry a section of their own. Showing them again here
// would spend their impact twice.
const SPOKEN_FOR = new Set<string>([
  ...content.memories.map((m) => m.image),
  content.wallet.image,
  content.ending.sticker,
]);

const LOOSE_PHOTOS = PHOTOS.filter((p) => !SPOKEN_FOR.has(p.src));

export function Gallery() {
  return (
    <section className="px-4 py-28 sm:px-6 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Stagger className="text-center">
          <StaggerItem>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
              {gallery.label}
            </p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.9rem,5vw,2.9rem)] font-light leading-tight text-[#3b2b33]">
              {gallery.heading}
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[#6e5a61]">
              {gallery.intro}
            </p>
          </StaggerItem>
        </Stagger>

        {/* CSS columns keeps every photo at its own height — no cropping faces
            to force a grid, which matters when they're all phone photos. */}
        <div className="mt-16 columns-2 gap-3 sm:gap-5 md:columns-3 lg:columns-4">
          {LOOSE_PHOTOS.map((photo, index) => (
            <Reveal
              key={photo.src}
              // Cascade across the columns so a row settles left-to-right
              delay={(index % 4) * 0.09}
              y={26}
              className="mb-3 break-inside-avoid sm:mb-5"
            >
              <div
                className="deckle snapshot bg-[#fdf8f5] p-1.5 sm:p-2.5"
                style={
                  { "--tilt": `${TILTS[index % TILTS.length]}deg` } as React.CSSProperties
                }
              >
                <Photo
                  src={photo.src}
                  alt={`${gallery.photoAlt} ${index + 1}`}
                  index={index}
                  mode="natural"
                  sizes="(max-width: 640px) 46vw, (max-width: 768px) 30vw, (max-width: 1024px) 30vw, 23vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
