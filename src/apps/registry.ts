import type React from "react";
import { AboutMe } from "./AboutMe";
import { Projects } from "./Projects";
import { Writing } from "./Writing";
import { Terminal } from "./Terminal";
import { Readme } from "./Readme";
import { Resume } from "./Resume";
import { Contact } from "./Contact";
import { Minesweeper } from "./Minesweeper";
import { Snake } from "./Snake";
import { Paint } from "./Paint";
import { Calculator } from "./Calculator";
import { Guestbook } from "./Guestbook";

export interface AppDef {
  id: string;
  title: string;
  icon: string; // emoji glyph, retro-desktop style
  component: React.ComponentType;
  w?: number;
  h?: number;
  onDesktop?: boolean; // show an icon on the desktop
}

// The "programs" of the portfolio OS. Single source of truth for the desktop
// icons and the Start menu.
export const APPS: AppDef[] = [
  // Portfolio
  { id: "about", title: "About Me", icon: "🙋", component: AboutMe, w: 460, h: 380, onDesktop: true },
  { id: "projects", title: "Projects", icon: "🗂️", component: Projects, w: 640, h: 440, onDesktop: true },
  { id: "writing", title: "Writing", icon: "📝", component: Writing, w: 640, h: 420, onDesktop: true },
  { id: "resume", title: "Résumé", icon: "📄", component: Resume, w: 560, h: 480, onDesktop: true },
  { id: "contact", title: "Contact", icon: "✉️", component: Contact, w: 460, h: 380, onDesktop: true },
  { id: "guestbook", title: "Guestbook", icon: "📖", component: Guestbook, w: 440, h: 460, onDesktop: true },
  // Games
  { id: "minesweeper", title: "Minesweeper", icon: "💣", component: Minesweeper, w: 320, h: 400, onDesktop: true },
  { id: "snake", title: "Snake", icon: "🐍", component: Snake, w: 320, h: 400, onDesktop: true },
  // Utilities
  { id: "terminal", title: "Terminal", icon: "🖥️", component: Terminal, w: 560, h: 360, onDesktop: true },
  { id: "paint", title: "Paint", icon: "🎨", component: Paint, w: 560, h: 440, onDesktop: true },
  { id: "calculator", title: "Calculator", icon: "🧮", component: Calculator, w: 240, h: 320, onDesktop: true },
  { id: "readme", title: "read_me.txt", icon: "📃", component: Readme, w: 420, h: 460, onDesktop: false },
];

export const appById = (id: string): AppDef | undefined => APPS.find((a) => a.id === id);
