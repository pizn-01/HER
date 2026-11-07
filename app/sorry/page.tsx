import type { Metadata } from "next";
import Link from "next/link";
import { Apology } from "@/components/Apology";
import { Bud } from "@/components/Bud";
import { Ending } from "@/components/Ending";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.sorry.meta,
};

/**
 * The apology, on its own. Kept apart from the garden so that page stays a
 * celebration, and so this one can be sent first.
 */
export default function SorryPage() {
  return (
    <main className="pt-10">
      <Apology />
      <Bud />
      <Ending />
      <div className="-mt-24 pb-24 text-center sm:-mt-32">
        <Link
          href="/"
          className="font-[family-name:var(--font-hand)] text-[1.35rem] text-[#a8556c] underline decoration-[#e2a4b1] underline-offset-4 transition-colors hover:text-[#3b2b33]"
        >
          {content.sorry.toGarden} →
        </Link>
      </div>
    </main>
  );
}
