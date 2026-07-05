import React from "react";

/**
 * Minimal pointer-based drag hook for window title bars.
 * Calls onMove with the new top-left as the pointer moves. No external deps so
 * it shares the dashboard's single React instance cleanly.
 */
export function useDragHandle(
  start: { x: number; y: number },
  onMove: (x: number, y: number) => void,
) {
  const origin = React.useRef<{ px: number; py: number; ox: number; oy: number } | null>(null);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      // Ignore drags that begin on interactive controls (e.g. the close button).
      if ((e.target as HTMLElement).closest("button")) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      origin.current = { px: e.clientX, py: e.clientY, ox: start.x, oy: start.y };
    },
    [start.x, start.y],
  );

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      const o = origin.current;
      if (!o) return;
      onMove(o.ox + (e.clientX - o.px), Math.max(0, o.oy + (e.clientY - o.py)));
    },
    [onMove],
  );

  const onPointerUp = React.useCallback((e: React.PointerEvent) => {
    origin.current = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp };
}
