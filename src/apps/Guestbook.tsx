import React from "react";

// A retro guestbook. Entries persist in the visitor's own browser via
// localStorage — no backend, no server. Seeded with a note from Michelle.
interface Entry {
  name: string;
  message: string;
  at: number;
}

const KEY = "michelleos-guestbook";
const SEED: Entry[] = [
  {
    name: "michelle",
    message: "thanks for stopping by my little OS :) leave a note!",
    at: Date.parse("2025-12-01T00:00:00Z"),
  },
];

function load(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Entry[];
  } catch {
    /* ignore */
  }
  return SEED;
}

export function Guestbook() {
  const [entries, setEntries] = React.useState<Entry[]>(load);
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const sign = () => {
    if (!message.trim()) return;
    const next: Entry[] = [
      { name: name.trim() || "anon", message: message.trim(), at: Date.now() },
      ...entries,
    ];
    setEntries(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setMessage("");
  };

  const when = (at: number) =>
    new Date(at).toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="bapsos-pad bapsos-guest">
      <fieldset className="bapsos-fieldset">
        <legend>Sign the guestbook</legend>
        <input
          className="bapsos-contact-input"
          placeholder="Your name"
          value={name}
          maxLength={32}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="bapsos-contact-textarea"
          placeholder="Leave a message…"
          value={message}
          maxLength={280}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bapsos-contact-send" onClick={sign} disabled={!message.trim()}>
          Sign ✍
        </button>
      </fieldset>

      <div className="bapsos-guest-list">
        {entries.map((e, i) => (
          <div key={i} className="bapsos-guest-entry">
            <div className="bapsos-guest-meta">
              <span className="bapsos-strong">{e.name}</span>
              <span className="bapsos-muted">{when(e.at)}</span>
            </div>
            <div className="bapsos-guest-msg">{e.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
