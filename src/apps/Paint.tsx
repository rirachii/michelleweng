import React from "react";

// A tiny paint program: pick a colour and brush size, draw on the canvas with
// the mouse, clear when you want a fresh sheet. Self-contained.
const PALETTE = [
  "#000000", "#808080", "#800000", "#ff0000", "#808000", "#ffff00",
  "#008000", "#00ff00", "#008080", "#00ffff", "#000080", "#0000ff",
  "#800080", "#ff00ff", "#ffffff", "#c0c0c0",
];
const SIZES = [2, 5, 10, 18];

export function Paint() {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const drawing = React.useRef(false);
  const last = React.useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = React.useState("#000080");
  const [size, setSize] = React.useState(5);

  const pos = (e: React.PointerEvent) => {
    const rect = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent) => {
    drawing.current = true;
    last.current = pos(e);
    canvas.current!.setPointerCapture(e.pointerId);
    stroke(e); // a click leaves a dot
  };

  const stroke = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvas.current!.getContext("2d")!;
    const p = pos(e);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current!.x, last.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  };

  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  const clear = () => {
    const ctx = canvas.current!.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.current!.width, canvas.current!.height);
  };

  React.useEffect(() => {
    clear(); // white sheet on mount
  }, []);

  return (
    <div className="bapsos-paint">
      <div className="bapsos-paint-toolbar">
        <div className="bapsos-paint-swatches">
          {PALETTE.map((c) => (
            <button
              key={c}
              className={"bapsos-paint-swatch" + (c === color ? " active" : "")}
              style={{ background: c }}
              onClick={() => setColor(c)}
              aria-label={`Colour ${c}`}
            />
          ))}
        </div>
        <div className="bapsos-paint-sizes">
          {SIZES.map((s) => (
            <button
              key={s}
              className={"bapsos-btn" + (s === size ? " active" : "")}
              onClick={() => setSize(s)}
            >
              <span className="bapsos-paint-dot" style={{ width: s, height: s }} />
            </button>
          ))}
          <button className="bapsos-btn" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
      <canvas
        ref={canvas}
        width={520}
        height={340}
        className="bapsos-paint-canvas"
        onPointerDown={start}
        onPointerMove={stroke}
        onPointerUp={end}
        onPointerLeave={end}
      />
    </div>
  );
}
