import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { apology } = content;

/**
 * Plain on purpose, apart from the GIF: this part should read as just him,
 * talking to her.
 */
export function Apology() {
  return (
    <section id="note" className="px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Stagger className="mx-auto max-w-xl" gap={0.14}>
        {/* The GIF opens the page: centered, sticker-sized, tilted a touch,
            so it greets her instead of swallowing the screen. */}
        <div className="flex justify-center gap-4">
          {apology.gifs.map((src, i) => (
            <StaggerItem key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF; next/image would freeze it */}
              <img
                src={src}
                alt={apology.gifAlt}
                className="w-[170px] rounded-3xl border-[5px] border-[#fdf8f5] shadow-[0_16px_32px_-16px_rgba(59,43,51,0.5)] sm:w-[200px]"
                style={{ transform: `rotate(${i % 2 ? 3 : -3}deg)` }}
              />
            </StaggerItem>
          ))}
        </div>

        <StaggerItem>
          <p className="mt-10 text-center text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
            {apology.label}
          </p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="font-display mt-4 text-center text-[clamp(2rem,5.5vw,3.1rem)] font-light leading-tight text-[#3b2b33]">
            {apology.heading}
          </h2>
        </StaggerItem>

        <div className="mt-10 space-y-5">
          {apology.paragraphs.map((paragraph) => (
            <StaggerItem key={paragraph} as="p">
              <span className="block text-[16px] leading-[1.8] text-[#4d3b43] sm:text-[17.5px]">
                {paragraph}
              </span>
            </StaggerItem>
          ))}
        </div>

        <StaggerItem>
          <div className="mt-10">
            <p className="font-[family-name:var(--font-hand)] text-[1.8rem] leading-tight text-[#a8556c]">
              {apology.signoff}
            </p>
            <p className="mt-1 text-sm tracking-wide text-[#6e5a61]">{apology.from}</p>
          </div>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
