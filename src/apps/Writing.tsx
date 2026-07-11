import React from "react";
import { WRITING } from "../content";

// Master-detail reader for notes/essays. Mirrors the Projects window pattern:
// a list of records on the left, the selected entry rendered on the right.
export function Writing() {
  const [selected, setSelected] = React.useState(0);
  const post = WRITING[selected];

  return (
    <div className="bapsos-projects">
      <div className="bapsos-projects-list">
        {WRITING.map((p, i) => (
          <div
            key={p.date + i}
            className={"bapsos-project-row" + (i === selected ? " bapsos-project-selected" : "")}
            onClick={() => setSelected(i)}
          >
            <span className="bapsos-file-icon">📄</span>
            <span className="bapsos-file-name">{p.title}</span>
          </div>
        ))}
      </div>
      <div className="bapsos-projects-detail">
        {post && (
          <div className="bapsos-pad">
            <div className="bapsos-post-date">[{post.date}]</div>
            <div className="bapsos-strong bapsos-project-title">{post.title}</div>
            <p className="bapsos-project-desc">{post.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}
