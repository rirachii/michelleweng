import React from "react";
import { useDesktop } from "./store";
import { APPS, appById } from "./apps/registry";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { BootSplash } from "./BootSplash";

function DesktopIcon({
  icon,
  label,
  onOpen,
}: {
  icon: string;
  label: string;
  onOpen: () => void;
}) {
  return (
    <button className="bapsos-desktop-icon" onDoubleClick={onOpen} onClick={(e) => e.preventDefault()}>
      <span className="bapsos-desktop-icon-glyph">{icon}</span>
      <span className="bapsos-desktop-icon-label">{label}</span>
    </button>
  );
}

export function Desktop() {
  const { windows, open } = useDesktop();

  // On a fresh visit (no restored windows) greet with the welcome note, so the
  // desktop never opens empty. Runs once; the store dedupes by appId anyway.
  const greeted = React.useRef(false);
  React.useEffect(() => {
    if (greeted.current) return;
    greeted.current = true;
    if (useDesktop.getState().windows.length === 0) {
      const rm = appById("readme");
      if (rm) open(rm.id, { title: rm.title, icon: rm.icon, w: rm.w, h: rm.h });
    }
  }, [open]);

  return (
    <div className="bapsos-root">
      <BootSplash />
      <div className="bapsos-desktop">
        <div className="bapsos-icons">
          {APPS.filter((a) => a.onDesktop).map((a) => (
            <DesktopIcon
              key={a.id}
              icon={a.icon}
              label={a.title}
              onOpen={() => open(a.id, { title: a.title, icon: a.icon, w: a.w, h: a.h })}
            />
          ))}
        </div>

        {(() => {
          // The visible window with the highest z is the active one (win98
          // paints its title bar navy; all others render inactive/gray).
          const topZ = Math.max(
            0,
            ...windows.filter((w) => !w.minimized).map((w) => w.z),
          );
          return windows.map((w) => (
            <Window key={w.id} win={w} active={!w.minimized && w.z === topZ} />
          ));
        })()}
      </div>
      <Taskbar />
    </div>
  );
}
