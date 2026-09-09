import { PROJECTS as ORIGINAL_PROJECTS, type Project } from "./content";

export interface ProjectScreenshot {
  src: string;
  thumbnail: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
}

export interface PortfolioProject extends Project {
  icon?: string;
  linkKind?: "source";
  screenshots?: ProjectScreenshot[];
}

// Extend the current collection without changing the original BapOS archive.
export const PROJECTS: PortfolioProject[] = [
  {
    name: "Chirpberry",
    screenshots: [
      {
        src: "/assets/project-previews/chirpberry-notebook-1bc967b9.webp",
        thumbnail: "/assets/project-previews/chirpberry-notebook-thumb-15de0103.webp",
        width: 1200,
        height: 768,
        caption: "Notes and bilingual transcripts",
        alt: "Chirpberry native Mac notebook showing example personal notes beside an English and Chinese meeting transcript.",
      },
      {
        src: "/assets/project-previews/chirpberry-summary-fc55a375.webp",
        thumbnail: "/assets/project-previews/chirpberry-summary-thumb-6e6b6411.webp",
        width: 1200,
        height: 768,
        caption: "Example summary and action items",
        alt: "Chirpberry Enhanced view showing a clearly marked example summary and checklist, separate from the original notes.",
      },
    ],
    blurb: "One notebook for every voice in the room.",
    description:
      "An open-source native Mac notebook for multilingual meetings. Keep your own notes alongside bilingual transcripts, then review summaries and action items without replacing what you wrote. Saved notes stay on your Mac; live speech, translation, and summaries use your own paid Valsea account. Built with SwiftUI for Apple Silicon and macOS 26 or later.",
    tags: ["SwiftUI", "macOS", "Meeting notes"],
    link: "https://github.com/rirachii/chirpberry",
    linkLabel: "View source",
    linkKind: "source",
    icon: "/assets/app-icons/chirpberry-seamless-09609b30.webp",
  },
  {
    name: "Converty",
    screenshots: [
      {
        src: "/assets/project-previews/converty-workspace-df768c18.webp",
        thumbnail: "/assets/project-previews/converty-workspace-thumb-054860c8.webp",
        width: 1400,
        height: 908,
        caption: "A workspace for everyday file tools",
        alt: "Converty Mac workspace with image, video, audio, document, and archive tools, including compress, resize, crop, and trim.",
      },
    ],
    blurb: "Convert and edit files, right on your Mac.",
    description:
      "A free, open-source Mac utility for converting and editing images, video, audio, documents, and archives. Hold Shift while dragging a file in Finder to choose a format, or open the workspace for batches and more tools. Processing stays on your Mac, with a new copy saved beside the original by default.",
    tags: ["SwiftUI", "AppKit", "macOS"],
    link: "https://converty-pi.vercel.app/",
    linkLabel: "Visit Converty",
    icon: "/assets/app-icons/converty-seamless-f44d737c.webp",
  },
  {
    name: "Oompf",
    screenshots: [
      {
        src: "/assets/project-previews/oompf-dojo-757668cb.webp",
        thumbnail: "/assets/project-previews/oompf-dojo-thumb-1e2259f2.webp",
        width: 480,
        height: 1039,
        caption: "Speaking practice and roleplay",
        alt: "Oompf Dojo with quick speaking topics, interview preparation, conflict resolution roleplay, and practice tools.",
      },
      {
        src: "/assets/project-previews/oompf-practice-7dc2331e.webp",
        thumbnail: "/assets/project-previews/oompf-practice-thumb-f19ba61a.webp",
        width: 480,
        height: 1039,
        caption: "Pick a topic. Practice out loud.",
        alt: "Oompf listening during a timed speaking exercise about living in another country for a year.",
      },
    ],
    blurb: "Practice speaking with more confidence.",
    description:
      "A speaking-practice app for the moments that matter: interviews, meetings, pitches, and everyday conversations. Practice out loud with short lessons and roleplays, then review AI feedback on clarity, pacing, and filler words.",
    tags: ["React Native", "Speaking practice", "AI feedback"],
    link: "https://oompf.app/",
    linkLabel: "Visit Oompf",
    icon: "/assets/app-icons/oompf-ccda7e9a.webp",
  },
  {
    name: "Foodex",
    screenshots: [
      {
        src: "/assets/project-previews/foodex-atlas-86d995f2.webp",
        thumbnail: "/assets/project-previews/foodex-atlas-thumb-37a72a95.webp",
        width: 480,
        height: 1044,
        caption: "Explore dishes around the world",
        alt: "Foodex Country Atlas showing a public discovery map and country guides.",
      },
      {
        src: "/assets/project-previews/foodex-capture-9e7d47aa.webp",
        thumbnail: "/assets/project-previews/foodex-capture-thumb-96df294e.webp",
        width: 480,
        height: 1044,
        caption: "Confirm a dish, then collect it",
        alt: "Foodex dish confirmation screen for tonkatsu with an Add to collection action.",
      },
    ],
    blurb: "Turn the dishes you try into a collection.",
    description:
      "An iPhone app for building a personal food atlas. Photograph a dish, confirm the match, and collect the meals you discover in your Food-Dex. Explore dishes from different cuisines and keep a record of what you have tried.",
    tags: ["iOS", "Food discovery", "Collection"],
    link: "https://foodex.space/",
    linkLabel: "Visit Foodex",
    icon: "/assets/app-icons/foodex-seamless-bbf20b33.webp",
  },
  ...ORIGINAL_PROJECTS.map((project) =>
    project.name === "Umami World"
      ? { ...project, icon: "/assets/app-icons/umami-world-f1bbebd9.webp" }
      : project,
  ),
];
