import React from "react";

// Classic Snake on a canvas. Arrow keys / WASD to steer, eat the food, don't
// hit the walls or yourself. Fully self-contained.
const CELL = 16;
const GRID = 17; // 17×17 board → 272px canvas
const SIZE = CELL * GRID;
const SPEED = 110; // ms per tick

type P = { x: number; y: number };
const eq = (a: P, b: P) => a.x === b.x && a.y === b.y;
const randCell = (): P => ({
  x: Math.floor(Math.random() * GRID),
  y: Math.floor(Math.random() * GRID),
});

export function Snake() {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const [score, setScore] = React.useState(0);
  const [over, setOver] = React.useState(false);
  const [running, setRunning] = React.useState(false);

  // Mutable game state kept in refs so the tick loop never goes stale.
  const snake = React.useRef<P[]>([{ x: 8, y: 8 }]);
  const dir = React.useRef<P>({ x: 1, y: 0 });
  const nextDir = React.useRef<P>({ x: 1, y: 0 });
  const food = React.useRef<P>({ x: 12, y: 8 });

  const draw = React.useCallback(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0a1410";
    ctx.fillRect(0, 0, SIZE, SIZE);
    // food
    ctx.fillStyle = "#f5d76e";
    ctx.fillRect(food.current.x * CELL + 2, food.current.y * CELL + 2, CELL - 4, CELL - 4);
    // snake
    snake.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#7dffb0" : "#37c66f";
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const reset = () => {
    snake.current = [{ x: 8, y: 8 }];
    dir.current = { x: 1, y: 0 };
    nextDir.current = { x: 1, y: 0 };
    food.current = { x: 12, y: 8 };
    setScore(0);
    setOver(false);
    setRunning(true);
  };

  React.useEffect(() => {
    draw();
  }, [draw]);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      dir.current = nextDir.current;
      const head = {
        x: snake.current[0].x + dir.current.x,
        y: snake.current[0].y + dir.current.y,
      };
      const hitWall = head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID;
      const hitSelf = snake.current.some((s) => eq(s, head));
      if (hitWall || hitSelf) {
        setOver(true);
        setRunning(false);
        return;
      }
      const grew = eq(head, food.current);
      const body = [head, ...snake.current];
      if (grew) {
        setScore((s) => s + 1);
        let f = randCell();
        while (body.some((b) => eq(b, f))) f = randCell();
        food.current = f;
      } else {
        body.pop();
      }
      snake.current = body;
      draw();
    }, SPEED);
    return () => clearInterval(id);
  }, [running, draw]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, P> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const nd = map[e.key];
      if (!nd) return;
      e.preventDefault();
      // Ignore direct reversals.
      if (nd.x === -dir.current.x && nd.y === -dir.current.y) return;
      nextDir.current = nd;
      if (!running && !over) setRunning(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, over]);

  return (
    <div className="bapsos-pad bapsos-snake">
      <div className="bapsos-snake-head">
        <span className="bapsos-strong">Score: {score}</span>
        <button className="bapsos-btn" onClick={reset}>
          {over ? "Play again" : running ? "Restart" : "Start"}
        </button>
      </div>
      <div className="bapsos-snake-stage">
        <canvas ref={canvas} width={SIZE} height={SIZE} className="bapsos-snake-canvas" />
        {!running && (
          <div className="bapsos-snake-overlay">
            {over ? `Game over — ${score} point${score === 1 ? "" : "s"}` : "Press an arrow key to begin"}
          </div>
        )}
      </div>
      <div className="bapsos-muted bapsos-snake-hint">Arrow keys or WASD to steer</div>
    </div>
  );
}
