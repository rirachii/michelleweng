import React from "react";
import { useDesktop, type WinState } from "./store";
import { appById } from "./apps/registry";
import { useDragHandle } from "./useDrag";

export function Window({ win, active }: { win: WinState; active: boolean }) {
  const { focus, close, toggleMinimize, toggleMaximize, move, resize } = useDesktop();
  const app = appById(win.appId);
  const drag = useDragHandle({ x: win.x, y: win.y }, (x, y) => move(win.id, x, y));

  // Bottom-right resize grip. Same pointer-capture pattern as useDrag, kept
  // inline since it's the only place that needs it.
  const rz = React.useRef<{ px: number; py: number; w: number; h: number } | null>(null);
  const onResizeDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    rz.current = { px: e.clientX, py: e.clientY, w: win.w, h: win.h };
  };
  const onResizeMove = (e: React.PointerEvent) => {
    const o = rz.current;
    if (!o) return;
    resize(win.id, o.w + (e.clientX - o.px), o.h + (e.clientY - o.py));
  };
  const onResizeUp = (e: React.PointerEvent) => {
    rz.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  if (win.minimized) return null;
  const Body = app?.component;
  const maximized = !!win.maximized;

  return (
    <div
      className={"bapsos-window" + (maximized ? " bapsos-window-max" : "")}
      style={
        maximized
          ? { zIndex: win.z }
          : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }
      }
      onPointerDown={() => focus(win.id)}
    >
      <div
        className={"bapsos-titlebar" + (active ? "" : " bapsos-titlebar-inactive")}
        onPointerDown={maximized ? undefined : drag.onPointerDown}
        onPointerMove={maximized ? undefined : drag.onPointerMove}
        onPointerUp={maximized ? undefined : drag.onPointerUp}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        <span className="bapsos-titlebar-text">
          <span className="bapsos-titlebar-icon">{win.icon}</span>
          {win.title}
        </span>
        <span className="bapsos-titlebar-buttons">
          <button aria-label="Minimize" onClick={() => toggleMinimize(win.id)}>
            _
          </button>
          <button
            aria-label={maximized ? "Restore" : "Maximize"}
            onClick={() => toggleMaximize(win.id)}
          >
            {maximized ? "🗗" : "🗖"}
          </button>
          <button aria-label="Close" onClick={() => close(win.id)}>
            ✕
          </button>
        </span>
      </div>
      <div className="bapsos-window-body">
        {Body ? <Body /> : <div className="bapsos-pad">Unknown program.</div>}
      </div>
      {!maximized && (
        <div
          className="bapsos-resize-grip"
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
