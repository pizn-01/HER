import { BouquetProvider } from "@/components/BouquetContext";
import { Clips } from "@/components/Clips";
import { Closing } from "@/components/Closing";
import { CornerBouquet } from "@/components/CornerBouquet";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Interlude } from "@/components/Interlude";
import { Letter } from "@/components/Letter";
import { Memories } from "@/components/Memories";
import { Nicknames } from "@/components/Nicknames";
import { Reasons } from "@/components/Reasons";
import { Wallet } from "@/components/Wallet";

export default function Home() {
  return (
    <BouquetProvider>
      <main>
        <Hero />
        <Letter />
        <Memories />
        <Interlude />
        <Clips />
        <Gallery />
        <Reasons />
        <Wallet />
        <Nicknames />
        <Closing />
      </main>
      <CornerBouquet />
    </BouquetProvider>
  );
}
