import { PROJECTS as ORIGINAL_PROJECTS, type Project } from "./content";

export interface PortfolioProject extends Project {
  icon?: string;
}

// Extend the current collection without changing the original BapOS archive.
export const PROJECTS: PortfolioProject[] = [
  {
    name: "Converty",
    blurb: "Convert and edit files, right on your Mac.",
    description:
      "A free, open-source Mac utility for converting and editing images, video, audio, documents, and archives. Hold Shift while dragging a file in Finder to choose a format, or open the workspace for batches and more tools. Processing stays on your Mac, with a new copy saved beside the original by default.",
    tags: ["SwiftUI", "AppKit", "macOS"],
    link: "https://converty-pi.vercel.app/",
    linkLabel: "Visit Converty",
    icon: "/assets/app-icons/converty-e2e22ee2.webp",
  },
  {
    name: "Oompf",
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
    blurb: "Turn the dishes you try into a collection.",
    description:
      "An iPhone app for building a personal food atlas. Photograph a dish, confirm the match, and collect the meals you discover in your Food-Dex. Explore dishes from different cuisines and keep a record of what you have tried.",
    tags: ["iOS", "Food discovery", "Collection"],
    link: "https://foodex.space/",
    linkLabel: "Visit Foodex",
    icon: "/assets/app-icons/foodex-51845474.webp",
  },
  ...ORIGINAL_PROJECTS.map((project) =>
    project.name === "Umami World"
      ? { ...project, icon: "/assets/app-icons/umami-world-f1bbebd9.webp" }
      : project,
  ),
];
