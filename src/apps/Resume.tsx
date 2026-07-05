import type { ReactNode } from "react";
import { RESUME_MD, RESUME_PDF } from "../content";

// Tiny, dependency-free Markdown renderer — enough for headings, bold, and
// bullet lists in a résumé. Swap for a real MD lib if you need more.
function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const out: ReactNode[] = [];
  let list: string[] = [];
  const flush = (key: string) => {
    if (list.length) {
      out.push(
        <ul key={"ul" + key}>
          {list.map((li, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(li) }} />
          ))}
        </ul>,
      );
      list = [];
    }
  };
  const inline = (s: string) =>
    s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  lines.forEach((line, i) => {
    if (line.startsWith("# ")) {
      flush(String(i));
      out.push(<h1 key={i}>{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      flush(String(i));
      out.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith("- ")) {
      list.push(line.slice(2));
    } else if (line.trim() === "") {
      flush(String(i));
    } else {
      flush(String(i));
      out.push(<p key={i} dangerouslySetInnerHTML={{ __html: inline(line) }} />);
    }
  });
  flush("end");
  return out;
}

export function Resume() {
  const download = () => {
    if (RESUME_PDF) {
      window.open(RESUME_PDF, "_blank", "noopener");
      return;
    }
    // Fall back to downloading the Markdown source.
    const blob = new Blob([RESUME_MD], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bapsos-resume">
      <div className="bapsos-resume-toolbar">
        <button onClick={download}>⬇ Download{RESUME_PDF ? " PDF" : ""}</button>
      </div>
      <div className="bapsos-resume-page">{renderMarkdown(RESUME_MD)}</div>
    </div>
  );
}
