import type { Metadata } from "next";
import { Caveat, Fraunces, Karla } from "next/font/google";
import { content } from "@/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Display: Fraunces, with the soft + wonk axes loaded so it reads warm
// rather than editorial. See the .font-display rule in globals.css.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The link-preview image needs an absolute URL, and hardcoding one breaks the
 * moment the site moves. Vercel injects the real production hostname at build
 * time, so read that first and fall back to content.ts only for local dev.
 * This means the preview card keeps working whatever the deployment is called.
 */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : content.meta.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    type: "website",
    title: content.meta.title,
    description: content.meta.description,
    siteName: content.meta.title,
    url: siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        // The card shows the title card, not a photo — no point spoiling the
        // surprise in a chat preview before she's even opened it.
        alt: content.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Scroll reveals start at opacity 0 and are animated in by JS. If JS
            never runs, show everything rather than a blank page. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "main [style*='opacity']{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
