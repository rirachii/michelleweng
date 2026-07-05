import { useDesktop } from "./store";
import { APPS } from "./apps/registry";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";

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

  return (
    <div className="bapsos-root">
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
