import React from "react";

// Classic beginner Minesweeper (9×9, 10 mines). Self-contained, no deps.
const ROWS = 9;
const COLS = 9;
const MINES = 10;

interface Cell {
  mine: boolean;
  adj: number;
  revealed: boolean;
  flagged: boolean;
}

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, adj: 0, revealed: false, flagged: false })),
  );
}

// Mines are placed on the first click, never on the clicked cell or its
// neighbours — so the opening move is always safe, like real Minesweeper.
function placeMines(board: Cell[][], safeR: number, safeC: number) {
  const safe = (r: number, c: number) => Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1;
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine && !safe(r, c)) {
      board[r][c].mine = true;
      placed++;
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) n++;
        }
      }
      board[r][c].adj = n;
    }
  }
}

const NUM_COLORS = ["", "#0000ff", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000000", "#808080"];

export function Minesweeper() {
  const [board, setBoard] = React.useState(emptyBoard);
  const [status, setStatus] = React.useState<"play" | "won" | "lost">("play");
  const [flags, setFlags] = React.useState(0);
  const started = React.useRef(false);

  const reset = () => {
    started.current = false;
    setBoard(emptyBoard());
    setStatus("play");
    setFlags(0);
  };

  const flood = (b: Cell[][], r: number, c: number) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    const cell = b[r][c];
    if (cell.revealed || cell.flagged) return;
    cell.revealed = true;
    if (cell.adj === 0 && !cell.mine) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) if (dr || dc) flood(b, r + dr, c + dc);
    }
  };

  const reveal = (r: number, c: number) => {
    if (status !== "play" || board[r][c].revealed || board[r][c].flagged) return;
    const b = board.map((row) => row.map((cell) => ({ ...cell })));
    if (!started.current) {
      placeMines(b, r, c);
      started.current = true;
    }
    if (b[r][c].mine) {
      b.forEach((row) => row.forEach((cell) => cell.mine && (cell.revealed = true)));
      setBoard(b);
      setStatus("lost");
      return;
    }
    flood(b, r, c);
    const safeLeft = b.flat().filter((cell) => !cell.mine && !cell.revealed).length;
    setBoard(b);
    if (safeLeft === 0) setStatus("won");
  };

  const flag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (status !== "play" || board[r][c].revealed) return;
    const b = board.map((row) => row.map((cell) => ({ ...cell })));
    b[r][c].flagged = !b[r][c].flagged;
    setBoard(b);
    setFlags(b.flat().filter((cell) => cell.flagged).length);
  };

  const face = status === "won" ? "😎" : status === "lost" ? "😵" : "🙂";

  return (
    <div className="bapsos-pad bapsos-mine">
      <div className="bapsos-mine-head">
        <span className="bapsos-mine-counter">💣 {String(MINES - flags).padStart(2, "0")}</span>
        <button className="bapsos-mine-face" onClick={reset} aria-label="New game">
          {face}
        </button>
        <span className="bapsos-mine-counter">{status === "won" ? "WIN" : status === "lost" ? "BOOM" : "···"}</span>
      </div>
      <div className="bapsos-mine-grid" onContextMenu={(e) => e.preventDefault()}>
        {board.map((row, r) => (
          <div key={r} className="bapsos-mine-row">
            {row.map((cell, c) => (
              <button
                key={c}
                className={
                  "bapsos-mine-cell" + (cell.revealed ? " bapsos-mine-open" : "")
                }
                onClick={() => reveal(r, c)}
                onContextMenu={(e) => flag(e, r, c)}
              >
                {cell.revealed
                  ? cell.mine
                    ? "💣"
                    : cell.adj > 0
                      ? <span style={{ color: NUM_COLORS[cell.adj] }}>{cell.adj}</span>
                      : ""
                  : cell.flagged
                    ? "🚩"
                    : ""}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="bapsos-muted bapsos-mine-hint">Left-click to reveal · right-click to flag</div>
    </div>
  );
}
