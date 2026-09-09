import { PROJECTS as ORIGINAL_PROJECTS, type Project } from "./content";

export interface PortfolioProject extends Project {
  icon?: string;
}

// Extend the current collection without changing the original BapOS archive.
export const PROJECTS: PortfolioProject[] = [
  ...ORIGINAL_PROJECTS.map((project) =>
    project.name === "Umami World"
      ? { ...project, icon: "/assets/app-icons/umami-world-f1bbebd9.webp" }
      : project,
  ),
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
];
