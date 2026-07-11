import React from "react";
import { PROFILE, PROJECTS, WRITING, CONTACT } from "../content";

// A tiny, self-contained terminal easter egg. No shell, no eval - just a
// lookup table of canned commands that read from content.ts, so it stays in
// sync with the rest of the portfolio for free.
type Line = { kind: "in" | "out"; text: string };

const PROMPT = "michelle@wired:~$";

const HELP = `available commands:
  help        this list
  whoami      who is michelle
  about       short bio
  projects    things i've built
  writing     things i've been thinking about
  contact     how to reach me
  social      my links
  ls          list the "programs"
  date        current date/time
  clear       clear the screen`;

function run(cmd: string): string {
  const c = cmd.trim().toLowerCase();
  if (!c) return "";
  switch (c) {
    case "help":
    case "?":
      return HELP;
    case "whoami":
      return `${PROFILE.name} - ${PROFILE.role} (${PROFILE.location})`;
    case "about":
      return PROFILE.bio;
    case "projects":
      return PROJECTS.map((p) => `• ${p.name} - ${p.blurb}  [${p.tags.join(", ")}]`).join("\n");
    case "writing":
      return WRITING.map((p) => `• [${p.date}] ${p.title}`).join("\n");
    case "contact":
      return `email: ${CONTACT.email}`;
    case "social":
    case "links":
      return CONTACT.links.map((l) => `• ${l.label}: ${l.url}`).join("\n");
    case "ls":
      return "about  projects  writing  resume  contact  terminal";
    case "date":
      return new Date().toString();
    case "sudo":
    case "sudo su":
      return "nice try :)";
    case "exit":
      return "there's no escape from the wired.";
    default:
      return `command not found: ${c}. type 'help'.`;
  }
}

export function Terminal() {
  const [lines, setLines] = React.useState<Line[]>([
    { kind: "out", text: "MICHELLE_OS shell [version 1.0]" },
    { kind: "out", text: "type 'help' for a list of commands." },
  ]);
  const [value, setValue] = React.useState("");
  const scroller = React.useRef<HTMLDivElement>(null);
  const input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = value;
    setValue("");
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const out = run(cmd);
    setLines((ls) => [
      ...ls,
      { kind: "in", text: `${PROMPT} ${cmd}` },
      ...(out ? [{ kind: "out" as const, text: out }] : []),
    ]);
  };

  return (
    <div className="bapsos-term" onClick={() => input.current?.focus()}>
      <div className="bapsos-term-scroll" ref={scroller}>
        {lines.map((l, i) => (
          <div key={i} className={"bapsos-term-line" + (l.kind === "in" ? " bapsos-term-in" : "")}>
            {l.text}
          </div>
        ))}
        <form className="bapsos-term-form" onSubmit={submit}>
          <span className="bapsos-term-prompt">{PROMPT}</span>
          <input
            ref={input}
            className="bapsos-term-input"
            value={value}
            spellCheck={false}
            autoComplete="off"
            autoFocus
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
