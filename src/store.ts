import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WinState {
  id: string;
  appId: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
}

interface DesktopState {
  windows: WinState[];
  z: number; // top-most z counter
  open: (appId: string, meta: { title: string; icon: string; w?: number; h?: number }) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  toggleMinimize: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  cascade: () => void;
}

let seq = 0;
const nextId = () => `w${Date.now().toString(36)}${(seq++).toString(36)}`;

export const useDesktop = create<DesktopState>()(
  persist(
    (set) => ({
      windows: [],
      z: 1,
      open: (appId, meta) =>
        set((s) => {
          // If an instance of this app is already open, focus it instead of duplicating.
          const existing = s.windows.find((w) => w.appId === appId);
          if (existing) {
            const z = s.z + 1;
            return {
              z,
              windows: s.windows.map((w) =>
                w.id === existing.id ? { ...w, z, minimized: false } : w,
              ),
            };
          }
          const z = s.z + 1;
          const offset = (s.windows.length % 6) * 26;
          const win: WinState = {
            id: nextId(),
            appId,
            title: meta.title,
            icon: meta.icon,
            x: 120 + offset,
            y: 90 + offset,
            w: meta.w ?? 520,
            h: meta.h ?? 360,
            z,
            minimized: false,
          };
          return { z, windows: [...s.windows, win] };
        }),
      close: (id) => set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),
      focus: (id) =>
        set((s) => {
          const z = s.z + 1;
          return { z, windows: s.windows.map((w) => (w.id === id ? { ...w, z } : w)) };
        }),
      toggleMinimize: (id) =>
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === id ? { ...w, minimized: !w.minimized } : w,
          ),
        })),
      move: (id, x, y) =>
        set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)) })),
      cascade: () =>
        set((s) => {
          // Un-minimize and fan all windows out from the top-left in a tidy
          // staircase, preserving stacking order.
          let z = s.z;
          const ordered = [...s.windows].sort((a, b) => a.z - b.z);
          const windows = ordered.map((w, i) => ({
            ...w,
            x: 60 + i * 30,
            y: 50 + i * 30,
            minimized: false,
            z: ++z,
          }));
          return { z, windows };
        }),
    }),
    {
      name: "bapsos-portfolio-desktop",
      storage: createJSONStorage(() => localStorage),
      // Persist only layout/session, not the transient z counter fights.
      partialize: (s) => ({ windows: s.windows, z: s.z }),
    },
  ),
);
