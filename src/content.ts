// ─────────────────────────────────────────────────────────────────────────
// EDIT ME — this is the only file you need to change to make the portfolio
// yours. All windows read from here. Replace the placeholder values below.
// ─────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "[Your Name]", // TODO
  role: "[Your role — e.g. Software Engineer]", // TODO
  location: "[City, Country]", // TODO
  // A short intro shown in the About window. A few sentences is plenty.
  bio: "Hi, I'm [Your Name] — [what you do in one line]. TODO: write two or three sentences about who you are, what you build, and what you're into. This text lives in src/content.ts.",
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
    name: "Project One", // TODO
    blurb: "A short one-liner about it.",
    description:
      "TODO: describe what this project is, the problem it solves, your role, and the tech used. Add as many projects as you like — they render automatically.",
    tags: ["TypeScript", "React"],
    link: "https://example.com",
    linkLabel: "Visit",
  },
  {
    name: "Project Two", // TODO
    blurb: "Another one-liner.",
    description: "TODO: description for the second project.",
    tags: ["Node", "API"],
    link: "https://github.com/yourname/project-two",
    linkLabel: "GitHub",
  },
  {
    name: "Project Three", // TODO
    blurb: "One more one-liner.",
    description: "TODO: description for the third project.",
    tags: ["Design"],
  },
];

// Résumé rendered as simple Markdown-ish text in the Résumé window.
// Swap in your own, and optionally drop a PDF in /public and set RESUME_PDF.
export const RESUME_MD = `# [Your Name]
[Your role] · [City, Country] · [email@example.com]

## Experience
**[Company]** — [Title]  (20XX–present)
- TODO: a bullet about impact you had.
- TODO: another bullet.

**[Company]** — [Title]  (20XX–20XX)
- TODO: a bullet.

## Education
**[School]** — [Degree]  (20XX)

## Skills
TODO, comma, separated, skills
`;

// If you add a PDF to /public (e.g. public/resume.pdf), set this to "/resume.pdf"
// to enable the Download button. Leave null to offer the Markdown as a download.
export const RESUME_PDF: string | null = null;

export const CONTACT = {
  email: "your@email.com", // TODO
  links: [
    { label: "GitHub", url: "https://github.com/yourname" }, // TODO
    { label: "X / Twitter", url: "https://x.com/yourname" }, // TODO
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname" }, // TODO
  ],
};
