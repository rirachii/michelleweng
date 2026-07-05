import { useDesktop, type WinState } from "./store";
import { appById } from "./apps/registry";
import { useDragHandle } from "./useDrag";

export function Window({ win, active }: { win: WinState; active: boolean }) {
  const { focus, close, toggleMinimize, move } = useDesktop();
  const app = appById(win.appId);
  const drag = useDragHandle({ x: win.x, y: win.y }, (x, y) => move(win.id, x, y));

  if (win.minimized) return null;
  const Body = app?.component;

  return (
    <div
      className="bapsos-window"
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
      onPointerDown={() => focus(win.id)}
    >
      <div
        className={"bapsos-titlebar" + (active ? "" : " bapsos-titlebar-inactive")}
        onPointerDown={drag.onPointerDown}
        onPointerMove={drag.onPointerMove}
        onPointerUp={drag.onPointerUp}
        onDoubleClick={() => toggleMinimize(win.id)}
      >
        <span className="bapsos-titlebar-text">
          <span className="bapsos-titlebar-icon">{win.icon}</span>
          {win.title}
        </span>
        <span className="bapsos-titlebar-buttons">
          <button aria-label="Minimize" onClick={() => toggleMinimize(win.id)}>
            _
          </button>
          <button aria-label="Close" onClick={() => close(win.id)}>
            ✕
          </button>
        </span>
      </div>
      <div className="bapsos-window-body">
        {Body ? <Body /> : <div className="bapsos-pad">Unknown program.</div>}
      </div>
    </div>
  );
}
