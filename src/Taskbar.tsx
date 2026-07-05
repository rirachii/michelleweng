import React from "react";
import { useDesktop } from "./store";
import { APPS } from "./apps/registry";

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
  const label = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return <div className="bapsos-clock">{label}</div>;
}

export function Taskbar() {
  const { windows, open, focus, toggleMinimize, cascade } = useDesktop();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="bapsos-taskbar">
      <button
        className={"bapsos-start" + (menuOpen ? " active" : "")}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="bapsos-start-glyph">★</span> Start
      </button>

      {menuOpen && (
        <div className="bapsos-startmenu" onMouseLeave={() => setMenuOpen(false)}>
          <div className="bapsos-startmenu-rail">BapsOS</div>
          <ul>
            {APPS.map((a) => (
              <li
                key={a.id}
                onClick={() => {
                  open(a.id, { title: a.title, icon: a.icon, w: a.w, h: a.h });
                  setMenuOpen(false);
                }}
              >
                <span className="bapsos-emoji">{a.icon}</span>
                {a.title}
              </li>
            ))}
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
          </ul>
        </div>
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

      <FullscreenToggle />
      <Clock />
    </div>
  );
}
