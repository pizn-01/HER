import { Head, kindFor } from "@/components/Flower";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { promises } = content;

export function Promises() {
  return (
    <section className="px-6 py-16 sm:py-24">
      <Stagger className="mx-auto max-w-xl" gap={0.12}>
        <StaggerItem>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">{promises.label}</p>
        </StaggerItem>
        <ul className="mt-8 space-y-4">
          {promises.items.map((item, i) => (
            <StaggerItem key={item} as="li" className="flex items-start gap-4">
              <Head kind={kindFor(i)} tone={i % 2 ? "deep" : "light"} size={34} className="mt-0.5 shrink-0" />
              <span className="font-[family-name:var(--font-hand)] text-[1.45rem] leading-snug text-[#3b2b33]">
                {item}
              </span>
            </StaggerItem>
          ))}
        </ul>
      </Stagger>
    </section>
  );
}
