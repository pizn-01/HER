import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { apology } = content;

/**
 * Deliberately plain: no tape, no flowers, no tilt. Everything else on the page
 * is decorated; this is the one part that should read as just him, talking.
 */
export function Apology() {
  return (
    <section id="note" className="px-6 py-28 sm:py-36">
      <Stagger className="mx-auto max-w-xl" gap={0.14}>
        <StaggerItem>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
            {apology.label}
          </p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="font-display mt-4 text-[clamp(2rem,5.5vw,3.1rem)] font-light leading-tight text-[#3b2b33]">
            {apology.heading}
          </h2>
        </StaggerItem>

        <div className="mt-8 space-y-5">
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
