/* ─────────────────────────────────────────────────────────────
   THIS IS THE ONLY FILE YOU NEED TO EDIT.

   Everything she reads lives here. Photos and videos are listed
   separately in media.ts, which is generated from /public/images.

   The words below are written to be true without pinning down
   dates I don't know. If you'd rather have real ones ("March
   2023", "her rooftop"), just type over the `date` and `place`
   lines — they're the only two fields with anything vague in them.
   ───────────────────────────────────────────────────────────── */

export const content = {
  /* Browser tab + link preview */
  meta: {
    title: "For Alaina",
    description: "A small place on the internet that only exists because of you.",
    // Used for the WhatsApp/iMessage link preview. On Vercel this is overridden
    // by VERCEL_PROJECT_PRODUCTION_URL, so it only matters for local dev — but
    // keep it pointed at the live domain so both agree.
    url: "https://my-alaina.vercel.app",
  },

  her: {
    name: "Alaina",
    nickname: "my Dhakkan",
  },

  hero: {
    eyebrow: "pressed and kept, every one of them",
    title: "A Herbarium of Us",
    lines: [
      "Every flower on this page is a reason I'm still not over you.",
      "Scroll slowly. They open as you go.",
    ],
    scrollCue: "Start here",
  },

  letter: {
    label: "Before anything else",
    heading: "I built you a garden",
    paragraphs: [
      "I'm a developer, so this is the only kind of flower I know how to grow. I couldn't find a card that said the right thing, so I wrote one from scratch.",
      "Everything below is true. I just wanted it somewhere that doesn't fade, somewhere you can come back to on a bad day and remember exactly how loved you are.",
      "Take your time with it, Dhakkan. It's all yours.",
    ],
  },

  /* ── The timeline. Each one adds a flower to the bouquet in the corner. ── */
  memories: [
    {
      title: "The first time you held my hand",
      date: "the beginning",
      place: "your hand, and then mine",
      note: "And it felt complete. Not exciting, not nervous — complete. Like something that had been slightly wrong my whole life had just been set straight.",
      caption: "I didn't let go first",
      image: "/images/moment-13.jpg",
    },
    {
      // The only hard date on the page, and the one that earns it.
      title: "The day we both finally said it",
      date: "8 October",
      place: "both of us, at the same time",
      note: "We'd been circling it for so long, and then it just came out — from both sides, almost in the same breath. I remember the relief more than anything. Every date I care about since gets measured from that one.",
      caption: "8th of October",
      image: "/images/moment-06.jpg",
    },
    {
      title: "The day we got dressed up",
      date: "the day everyone else saw it too",
      place: "I genuinely don't remember where we were going",
      note: "You walked out and I forgot the entire plan. I spent the whole day watching you talk to other people and thinking, that's mine, I get to take that home.",
      caption: "I wasn't looking at the camera",
      image: "/images/moment-08.jpg",
    },
    {
      title: "4:30pm, a Sunday",
      date: "an ordinary Sunday",
      place: "nowhere, doing nothing",
      note: "Nothing happened that day. That's the point. If you asked me to pick one day to live again it would probably be this one, and I couldn't tell you a single thing we did.",
      caption: "the best kind of day",
      image: "/images/moment-11.jpg",
    },
  ],

  /* A single line, given a whole screen to itself. */
  interlude: {
    line: "Teri harr ada qatilana",
    lang: "ur-Latn",
    meaning:
      "Every single thing you do is lethal. I look at you and I lose myself — every time, like it's the first time.",
    // Plays once, all the way through, when she reaches this screen.
    audio: "/audio/qatilana.mp3",
    // Only shown if her browser refuses to start audio on its own.
    audioPrompt: "Tap to hear it",
    audioStop: "Stop",
  },

  clips: {
    label: "Moving pictures",
    heading: "The ones that don't hold still",
    intro: "They play on their own. Tap the speaker if you want to hear us.",
    clipAlt: "A short video of us, number",
  },

  gallery: {
    label: "Loose photographs",
    heading: "Every snap you ever sent me, kept",
    intro:
      "I never deleted a single one. This is what my camera roll actually looks like.",
    photoAlt: "A photo of us, number",
  },

  /* The photo you carry in your wallet. */
  wallet: {
    label: "The one I carry",
    image: "/images/moment-36.jpg",
    alt: "A childhood photo of Alaina, kept in a wallet",
    caption: "it's been in there for years",
    heading: "There's a photo of you as a kid that lives in my wallet.",
    line: "Every time I look at it, I can't wait for our daughter to have the exact same eyes as you.",
    after:
      "That's the whole plan, really. Nothing more complicated than that.",
  },

  /* Bottle & Dhakkan. */
  nicknames: {
    label: "Bottle & Dhakkan",
    heading: "You call me Bottle. I call you Dhakkan.",
    line: "And a bottle is incomplete without its dhakkan. That was never a joke. That's just what it is.",
  },

  reasons: {
    label: "Pick a flower",
    heading: "Reasons, in no particular order",
    intro: "Tap any of them. There's something written inside.",
    items: [
      "I love the way you spam me with your snaps. I open every single one and just melt.",
      "You are the most beautiful person. Ever. Everrrrr.",
      "The childishness that only comes out in front of me. I know that's a version of you nobody else gets.",
      "The way your eyes fill up with joy when you're with me. I'd do anything to keep putting that there.",
      "You held my hand once and fixed something I didn't know was broken.",
      "You make being loved feel like the easiest thing in the world.",
    ],
  },

  closing: {
    label: "The last page",
    heading: "So here's the whole bouquet",
    paragraphs: [
      "Every flower up there is yours. You collected them just by reading.",
      "Thank you for being the person I get to be completely myself around. And for every ordinary Sunday since.",
    ],
    signoff: "All my love,",
    from: "— your Bottle",
  },
} as const;

export type Memory = (typeof content.memories)[number];
