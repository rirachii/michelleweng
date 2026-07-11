// ─────────────────────────────────────────────────────────────────────────
// EDIT ME - this is the only file you need to change to make the portfolio
// yours. All windows read from here.
//
// Content sourced from Michelle Weng's cyberdeck portfolio, wengmichelle.com.
// ─────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Michelle Weng",
  role: "Software Engineer · apps & backend systems",
  location: "NYC / SF / Asia",
  // A short intro shown in the About window. A few sentences is plenty.
  bio: "Dwelling in the wired. I build simple app experiences and efficient backend systems, and I'm usually somewhere down a rabbit hole. Lately I'm learning neuromarketing, clean code, and digital decay.",
  // Optional avatar. Drop an image in /public and set e.g. "/avatar.png",
  // or leave as null to show a placeholder tile.
  avatar: null as string | null,
};

export interface Project {
  name: string;
  blurb: string; // one-line summary in the list
  description: string; // longer detail shown in the preview pane
  tags: string[];
  link?: string; // live site / repo
  linkLabel?: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Short Transcript",
    blurb: "Auto-transcription for short-form video.",
    description:
      "Automated transcription service for short-form video content - YouTube Shorts, TikTok, and Reels - powered by OpenAI Whisper and deployed on Cloud Run.",
    tags: ["Python", "Flask", "Whisper", "Cloud Run"],
  },
  {
    name: "Umami World",
    blurb: "Catalog dishes from cuisines around the world.",
    description:
      "A mobile app for collecting and categorizing dishes you've tried from cuisines around the world - a personal, taggable food journal.",
    tags: ["React Native", "TypeScript", "Firebase"],
  },
  {
    name: "Void Mail",
    blurb: "Encrypted email that self-destructs in 24 hours.",
    description:
      "A secure, encrypted email client that deletes messages after 24 hours - ephemeral by design, with end-to-end crypto and real-time delivery.",
    tags: ["Node.js", "Cryptography", "Socket.io"],
  },
  {
    name: "Retro Cam",
    blurb: "Dithering and CRT effects in the browser.",
    description:
      "A web-based image processor that applies dithering and CRT effects to uploaded photos, with the heavy pixel work compiled to WebAssembly for speed.",
    tags: ["Canvas API", "WASM", "Rust"],
  },
];

// Résumé rendered as simple Markdown-ish text in the Résumé window.
export const RESUME_MD = `# Michelle Weng
Software Engineer · NYC / SF / Asia · michelleweng25@gmail.com

## Summary
Builder of simple app experiences and efficient backend systems. Comfortable
across the stack - from React Native mobile apps to Python and Node backends
deployed on the cloud. Curious about neuromarketing, consumer app growth, and
the aesthetics of digital decay.

## Selected Projects
**Short Transcript** - Auto-transcription for short-form video
- Transcribes YouTube Shorts, TikTok, and Reels with OpenAI Whisper.
- Python / Flask service deployed on Cloud Run.

**Umami World** - World-cuisine dish journal
- Mobile app to collect and categorize dishes tried around the world.
- React Native + TypeScript, backed by Firebase.

**Void Mail** - Ephemeral encrypted email
- Encrypted client that self-destructs messages after 24 hours.
- Node.js with real-time delivery over Socket.io.

**Retro Cam** - In-browser dithering & CRT effects
- Applies dithering and CRT effects to uploaded photos.
- Canvas API front end with a Rust/WASM processing core.

## Writing
- Consumer App Growth Framework (LSDCP): Lab, Scale, Distribution, Creators, Paid.
- Market analyses for localized AI calorie-tracking apps (Philippines, Malaysia).

## Skills
Python, Flask, Node.js, TypeScript, React Native, Rust, WebAssembly, Firebase,
Cloud Run, Socket.io, Whisper, Canvas API, cryptography, consumer growth

## Currently exploring
Neuromarketing, clean code, digital decay
`;

// If you add a PDF to /public (e.g. public/resume.pdf), set this to "/resume.pdf"
// to enable the Download button. Leave null to offer the Markdown as a download.
export const RESUME_PDF: string | null = null;

export const CONTACT = {
  email: "michelleweng25@gmail.com",
  links: [
    { label: "GitHub", url: "https://github.com/rirachii" },
    { label: "X / Twitter", url: "https://twitter.com/mykov20" },
    { label: "LinkedIn", url: "https://linkedin.com/in/wengmichelle" },
  ],
};

// ── Writing window ─────────────────────────────────────────────────────────
// Notes and essays, shown in the Writing (MEMORY_DUMP) window as a
// master-detail list. Sourced from wengmichelle.com's blog.
export interface Post {
  date: string; // YYYY-MM-DD
  title: string;
  blurb: string; // one-line summary in the list
  body: string; // rendered in the reading pane (plain paragraphs)
}

export const WRITING: Post[] = [
  {
    date: "2025-12-11",
    title: "Idea: Calorie tracking app for the Philippines",
    blurb: "Localizing a calorie tracker for a 'Rice is Life' culture.",
    body: "Market analysis for a Filipino-localized calorie tracker. The thesis: food logging has to fit a 'Rice is Life' culture rather than fight it, lean on high social engagement, and take advantage of the Innovative Startup Act. Localization isn't translation - it's meeting people where their meals already are.",
  },
  {
    date: "2025-12-09",
    title: "Idea: Calorie tracking app for Malaysia",
    blurb: "Market viability, the LSDCP growth framework, and hospital partnerships.",
    body: "Strategic analysis for launching a localized AI calorie tracker in Malaysia. Looks at market viability, applies the LSDCP growth framework end to end, and explores hospital partnerships as a distribution wedge into a health-conscious but under-served market.",
  },
  {
    date: "2025-12-04",
    title: "Consumer App Growth Framework (LSDCP)",
    blurb: "Lab, Scale, Distribution, Creators, Paid.",
    body: "A full-funnel marketing system for growing consumer apps. Five stages: Lab (find what works), Scale (repeat it), Distribution (own the channels), Creators (borrow trust), and Paid (pour fuel on the fire). The point is sequencing - each stage only earns the right to the next once it's actually working.",
  },
];

// ── Welcome note ───────────────────────────────────────────────────────────
// Auto-opens on first boot in a Notepad-style window. Plain text.
export const README_TXT = `        WELCOME TO MICHELLE_OS  v1.0
  ============================================

  hi, i'm michelle :)

  you've booted into my portfolio OS - a little
  desktop you can actually poke around in.

  > double-click the icons to open programs
  > drag windows around by their title bars
  > try the Terminal if you like keyboards
  > everything is also in the Start menu

  what's inside:
    About Me ... who i am
    Projects ... things i've built
    Writing .... things i think about
    Terminal ... for the curious
    Résumé ..... the formal version
    Contact .... say hi

  currently: dwelling in the wired, constructing
  simple apps and efficient backends, learning
  neuromarketing, clean code, and digital decay.

  - michelle
`;
