import type React from "react";
import { AboutMe } from "./AboutMe";
import { Projects } from "./Projects";
import { Resume } from "./Resume";
import { Contact } from "./Contact";

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
  { id: "about", title: "About Me", icon: "🙋", component: AboutMe, w: 460, h: 380, onDesktop: true },
  { id: "projects", title: "Projects", icon: "🗂️", component: Projects, w: 640, h: 440, onDesktop: true },
  { id: "resume", title: "Résumé", icon: "📄", component: Resume, w: 560, h: 480, onDesktop: true },
  { id: "contact", title: "Contact", icon: "✉️", component: Contact, w: 460, h: 380, onDesktop: true },
];

export const appById = (id: string): AppDef | undefined => APPS.find((a) => a.id === id);
