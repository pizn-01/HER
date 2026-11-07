import { Hearts } from "@/components/Hearts";
import { Photo } from "@/components/Photo";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { content } from "@/content";

const { ending } = content;

/**
 * The last screen. No question, no deadline: just an open door. The button
 * opens WhatsApp straight to his chat, with nothing pre-typed, so whatever
 * she says (or doesn't) is entirely hers.
 */
export function Ending() {
  const href = `https://wa.me/${ending.whatsapp}`;

  return (
    <section className="relative overflow-hidden px-6 pb-36 pt-10 sm:pb-48">
      <Hearts />
      <Stagger className="relative z-10 mx-auto max-w-md text-center" gap={0.14}>
        <StaggerItem>
          <div className="mx-auto w-[150px] -rotate-3 sm:w-[170px]">
            <Photo
              src={ending.sticker}
              alt={ending.stickerAlt}
              mode="natural"
              sizes="170px"
              className="drop-shadow-[0_8px_14px_rgba(59,43,51,0.18)]"
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-10 text-[11px] uppercase tracking-[0.3em] text-[#8c9e86]">
            {ending.label}
          </p>
        </StaggerItem>
        <StaggerItem>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,7vw,3.4rem)] font-light leading-tight text-[#3b2b33]">
            {ending.heading}
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="font-[family-name:var(--font-hand)] mx-auto mt-6 text-[clamp(1.5rem,4.4vw,1.9rem)] leading-snug text-[#a8556c]">
            <span className="heartbeat mr-2 inline-block" aria-hidden="true">♥</span>
            {ending.strong}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mx-auto mt-6 text-[15.5px] leading-[1.8] text-[#4d3b43] sm:text-[17px]">
            {ending.line}
          </p>
        </StaggerItem>

        <StaggerItem>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#3b2b33] px-7 py-3.5 text-[15px] text-[#faf3ef] shadow-[0_12px_28px_-12px_rgba(59,43,51,0.6)] transition hover:-translate-y-0.5 hover:bg-[#4a3540]"
          >
            <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" fill="#f0c4cc">
              <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2.1 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.6l-.4-.2-3.8 1.2 1.2-3.7-.3-.4C5.6 19.9 5 17.9 5 15.8 5 9.8 9.9 5 16 5s11 4.8 11 10.8-4.9 10.6-11 10.6zm6-7.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.2.9.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4z" />
            </svg>
            {ending.button}
          </a>
        </StaggerItem>
      </Stagger>
    </section>
  );
}
