import { README_TXT } from "../content";

// Notepad-style read-only text window. Auto-opens on first boot (see Desktop).
export function Readme() {
  return (
    <div className="bapsos-notepad">
      <pre className="bapsos-notepad-text">{README_TXT}</pre>
    </div>
  );
}
