import React from "react";
import { useDesktop } from "./store";
import { APPS } from "./apps/registry";
import { PROFILE } from "./content";

function FullscreenToggle() {
  const [fs, setFs] = React.useState(false);
  React.useEffect(() => {
    const onChange = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);
  const toggle = () => {
    const root = document.querySelector(".bapsos-root");
    if (document.fullscreenElement) document.exitFullscreen();
    else root?.requestFullscreen?.();
  };
  return (
    <button className="bapsos-fsbtn" onClick={toggle} title={fs ? "Exit full screen" : "Boot full screen"}>
      {fs ? "🗗" : "⛶"}
    </button>
  );
}

function Clock() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const date = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  return (
    <div className="bapsos-clock" title={date}>
      {time}
    </div>
  );
}

// Classic "it is now safe to turn off your computer" send-off. Rendered fixed
// so it covers everything regardless of the taskbar's place in the tree.
function ShutdownScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="bapsos-shutdown">
      <div className="bapsos-shutdown-text">
        It's now safe to turn off
        <br />
        your computer.
      </div>
      <button className="bapsos-shutdown-btn" onClick={onRestart}>
        ⏻ Restart MichelleOS
      </button>
    </div>
  );
}

export function Taskbar() {
  const { windows, open, focus, toggleMinimize, cascade } = useDesktop();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [off, setOff] = React.useState(false);

  const launch = (id: string, meta: { title: string; icon: string; w?: number; h?: number }) => {
    open(id, meta);
    setMenuOpen(false);
    setQuery("");
  };

  const openCount = windows.filter((w) => !w.minimized).length;
  const filtered = APPS.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()));

  if (off) return <ShutdownScreen onRestart={() => window.location.reload()} />;

  return (
    <div className="bapsos-taskbar">
      <button
        className={"bapsos-start" + (menuOpen ? " active" : "")}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="bapsos-start-glyph">★</span> Start
      </button>

      {menuOpen && (
        <>
          <div className="bapsos-startmenu-scrim" onClick={() => setMenuOpen(false)} />
          <div className="bapsos-startmenu">
            <div className="bapsos-startmenu-rail">
              MICHELLE<span className="bapsos-rail-os">OS</span>
            </div>
            <div className="bapsos-startmenu-main">
              <div className="bapsos-startmenu-head">
                <span className="bapsos-startmenu-avatar">🙋</span>
                <span>
                  <div className="bapsos-strong">{PROFILE.name}</div>
                  <div className="bapsos-muted">{PROFILE.role}</div>
                </span>
              </div>
              <input
                className="bapsos-startmenu-search"
                placeholder="Search programs…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <ul>
                {filtered.map((a) => (
                  <li
                    key={a.id}
                    onClick={() => launch(a.id, { title: a.title, icon: a.icon, w: a.w, h: a.h })}
                  >
                    <span className="bapsos-emoji">{a.icon}</span>
                    {a.title}
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="bapsos-startmenu-empty">No programs found.</li>
                )}
                <li className="bapsos-startmenu-sep" />
                <li
                  onClick={() => {
                    cascade();
                    setMenuOpen(false);
                  }}
                >
                  <span className="bapsos-emoji">🗂️</span>
                  Cascade Windows
                </li>
                <li
                  onClick={() => {
                    setMenuOpen(false);
                    setOff(true);
                  }}
                >
                  <span className="bapsos-emoji">⏻</span>
                  Shut Down…
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      <div className="bapsos-tasks">
        {windows.map((w) => (
          <button
            key={w.id}
            className={"bapsos-taskbtn" + (w.minimized ? "" : " active")}
            onClick={() => (w.minimized ? toggleMinimize(w.id) : focus(w.id))}
          >
            <span className="bapsos-emoji">{w.icon}</span>
            {w.title}
          </button>
        ))}
      </div>

      <div className="bapsos-tray">
        <span className="bapsos-tray-apps" title={`${openCount} open`}>
          ⚙ {openCount}
        </span>
        <span className="bapsos-tray-icon" title="Sound">
          🔊
        </span>
        <FullscreenToggle />
        <Clock />
      </div>
    </div>
  );
}
