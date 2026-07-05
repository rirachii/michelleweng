import React from "react";
import { PROJECTS } from "../content";

// Master-detail: project list on the left, details on the right (no extra
// windows needed). Mirrors the Files window pattern.
export function Projects() {
  const [selected, setSelected] = React.useState(0);
  const p = PROJECTS[selected];

  return (
    <div className="bapsos-projects">
      <div className="bapsos-projects-list">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.name + i}
            className={"bapsos-project-row" + (i === selected ? " bapsos-project-selected" : "")}
            onClick={() => setSelected(i)}
          >
            <span className="bapsos-file-icon">📦</span>
            <span className="bapsos-file-name">{proj.name}</span>
          </div>
        ))}
      </div>
      <div className="bapsos-projects-detail">
        {p && (
          <div className="bapsos-pad">
            <div className="bapsos-strong bapsos-project-title">{p.name}</div>
            <div className="bapsos-muted">{p.blurb}</div>
            <div className="bapsos-tags">
              {p.tags.map((t) => (
                <span key={t} className="bapsos-tag">
                  {t}
                </span>
              ))}
            </div>
            <p className="bapsos-project-desc">{p.description}</p>
            {p.link && (
              <a
                className="bapsos-btn-link"
                href={p.link}
                target="_blank"
                rel="noreferrer noopener"
              >
                {p.linkLabel ?? "Open"} ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
