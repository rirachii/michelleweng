import { useState } from "react";
import type { PortfolioProject } from "./portfolio-content";

/** Mounted only after a visitor selects a project, keeping screenshots off the initial request path. */
export function ProjectPreview({ project }: { project: PortfolioProject }) {
  const [selected, setSelected] = useState(0);
  const screenshots = project.screenshots;
  if (!screenshots?.length) return null;
  const screen = screenshots[selected];

  return (
    <section className="project-preview" aria-label={`Inside ${project.name}`}>
      <div className="preview-heading">
        <h3>Inside {project.name}</h3>
        <a href={screen.src} target="_blank" rel="noopener noreferrer"
          aria-label={`Open ${project.name}: ${screen.caption} full size (opens in a new tab)`}>
          Full size <span aria-hidden="true">↗</span>
        </a>
      </div>
      <figure className="preview-figure">
        <div className="preview-stage" data-portrait={screen.height > screen.width}>
          <img key={screen.src} src={screen.src} alt={screen.alt}
            width={screen.width} height={screen.height} decoding="async" />
        </div>
        <figcaption aria-live="polite">{screen.caption}</figcaption>
      </figure>
      {screenshots.length > 1 && (
        <div className="preview-thumbnails" role="group" aria-label={`${project.name} screenshots`}>
          {screenshots.map((item, index) => (
            <button key={item.src} aria-pressed={index === selected}
              onClick={() => setSelected(index)}>
              <img src={item.thumbnail} alt="" width={item.width} height={item.height} decoding="async" />
              <span>{item.caption}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
