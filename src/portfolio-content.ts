import { PROJECTS as ORIGINAL_PROJECTS, type Project } from "./content";

// Extend the current collection without changing the original BapOS archive.
export const PROJECTS: Project[] = [
  ...ORIGINAL_PROJECTS,
  {
    name: "Converty",
    blurb: "Convert and edit files, right on your Mac.",
    description:
      "A free, open-source Mac utility for converting and editing images, video, audio, documents, and archives. Hold Shift while dragging a file in Finder to choose a format, or open the workspace for batches and more tools. Processing stays on your Mac, with a new copy saved beside the original by default.",
    tags: ["SwiftUI", "AppKit", "macOS"],
    link: "https://converty-pi.vercel.app/",
    linkLabel: "Visit Converty",
  },
];
