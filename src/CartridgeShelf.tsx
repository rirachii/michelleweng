import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ProjectPreview } from "./ProjectPreview";
import { PROJECTS } from "./portfolio-content";

interface Props {
  editions: readonly { color: string; type: string; number: string }[];
  renderCartridge: (index: number) => ReactNode;
  onOpen: (index: number, source: HTMLElement) => void;
}

/** Selection previews a cartridge, with separate website and detail actions. */
export function CartridgeShelf({ editions, renderCartridge, onOpen }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const gesture = useRef<{ x: number; y: number; swiping: boolean } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const wheel = useRef({ distance: 0, lastStep: 0, lastEvent: 0 });
  const count = PROJECTS.length;
  const move = (direction: number) => {
    setSelected((current) =>
      current === null
        ? direction > 0
          ? 0
          : count - 1
        : (current + direction + count) % count,
    );
  };

  return (
    <div className="cartridge-library">
      <div className="section-heading collection-heading">
        <h2 id="collection-title">
          Selected work <span>{String(count).padStart(2, "0")}</span>
        </h2>
        <ProjectIndex editions={editions} onOpen={onOpen} />
      </div>
      <div
        className="shelf-viewport"
        role="group"
        aria-label="Project cartridges"
        aria-describedby="shelf-help"
        data-selected={selected !== null}
        onKeyDown={(event) => {
          const index = buttons.current.indexOf(
            event.target as HTMLButtonElement,
          );
          if (index < 0) return;
          let next: number;
          if (event.key === "ArrowRight") next = (index + 1) % count;
          else if (event.key === "ArrowLeft")
            next = (index - 1 + count) % count;
          else if (event.key === "Home") next = 0;
          else if (event.key === "End") next = count - 1;
          else return;
          event.preventDefault();
          buttons.current[next]?.focus({ preventScroll: true });
        }}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse") return;
          suppressClick.current = false;
          gesture.current = {
            x: event.clientX,
            y: event.clientY,
            swiping: false,
          };
        }}
        onPointerMove={(event) => {
          const start = gesture.current;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (
            !start.swiping &&
            Math.abs(dx) > 14 &&
            Math.abs(dx) > Math.abs(dy) * 1.3
          ) {
            start.swiping = true;
            event.currentTarget.setPointerCapture(event.pointerId);
          }
        }}
        onPointerUp={(event) => {
          const start = gesture.current;
          gesture.current = null;
          if (!start?.swiping) return;
          suppressClick.current = true;
          const dx = event.clientX - start.x;
          if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          gesture.current = null;
        }}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          suppressClick.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
        onWheel={(event) => {
          // Horizontal trackpad gestures browse; vertical scrolling remains native.
          if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
          const now = performance.now();
          if (now - wheel.current.lastEvent > 180) wheel.current.distance = 0;
          wheel.current.lastEvent = now;
          if (now - wheel.current.lastStep < 220) return;
          wheel.current.distance +=
            event.deltaX * (event.deltaMode === 1 ? 16 : 1);
          if (Math.abs(wheel.current.distance) < 45) return;
          move(wheel.current.distance > 0 ? 1 : -1);
          wheel.current = { distance: 0, lastStep: now, lastEvent: now };
        }}
      >
        {PROJECTS.map((project, index) => {
          const active = selected === index;
          const offset = index - (selected ?? (count - 1) / 2);
          // Keep the first five readable on phones as the collection grows.
          const compactOffset =
            index - (selected ?? (Math.min(count, 5) - 1) / 2);
          const spread = selected === null ? 0 : Math.sign(offset);
          return (
            <div
              key={project.name}
              className="shelf-position"
              data-active={active}
              style={
                {
                  "--offset": offset,
                  "--compact-offset": compactOffset,
                  "--spread-direction": spread,
                  zIndex: active ? 20 : count - index,
                } as CSSProperties
              }
            >
              <span
                className={`shelf-object cartridge--${editions[index].color}`}
                aria-hidden="true"
              >
                <span className="shelf-back" />
                <span className="shelf-spine">
                  <span className="spine-grip" />
                  <span className="spine-name">{project.name}</span>
                </span>
                <span className="shelf-edge shelf-edge--top" />
                <span className="shelf-edge shelf-edge--bottom" />
                {renderCartridge(index)}
              </span>
              <span className="shelf-name" aria-hidden="true">
                {project.name.split(" ").map((word, wordIndex, words) => (
                  <span key={wordIndex}>
                    {word}
                    {wordIndex < words.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
              <button
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                className="shelf-item"
                aria-label={`Preview ${project.name}`}
                aria-pressed={active}
                aria-controls="shelf-preview"
                tabIndex={index === (selected ?? 0) ? 0 : -1}
                data-active={active}
                onClick={() => setSelected(index)}
                onFocus={() => setSelected(index)}
              />
            </div>
          );
        })}
      </div>

      <div className="shelf-preview" id="shelf-preview">
        <div className="shelf-caption" aria-live="polite" aria-atomic="true">
          {selected === null ? (
            <>
              <h3>A few things I’ve made.</h3>
              <p>Pick one to take a look inside.</p>
            </>
          ) : (
            <>
              <h3>{PROJECTS[selected].name}</h3>
              <p>{PROJECTS[selected].blurb}</p>
            </>
          )}
        </div>
        <div className="shelf-action">
          {selected !== null && (
            <>
              {PROJECTS[selected].link && (
                <a
                  className="website-link"
                  href={PROJECTS[selected].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${PROJECTS[selected].linkKind === "source" ? "View" : "Visit"} ${PROJECTS[selected].name} ${PROJECTS[selected].linkKind === "source" ? "source" : "website"} (opens in a new tab)`}
                >
                  {PROJECTS[selected].linkKind === "source" ? "View source" : "Visit website"} <span aria-hidden="true">↗</span>
                </a>
              )}
              <button
                className="text-link"
                aria-haspopup="dialog"
                onClick={(event) => onOpen(selected, event.currentTarget)}
              >
                Project details
              </button>
            </>
          )}
        </div>
        <div className="shelf-navigation">
          <button aria-label="Previous cartridge" onClick={() => move(-1)}>
            ←
          </button>
          <span aria-hidden="true">
            {selected === null ? "—" : editions[selected].number} /{" "}
            {String(count).padStart(2, "0")}
          </span>
          <button aria-label="Next cartridge" onClick={() => move(1)}>
            →
          </button>
        </div>
        <p id="shelf-help">Swipe, use the arrows, or pick a cartridge.</p>
      </div>
      {selected !== null && (
        <ProjectPreview key={selected} project={PROJECTS[selected]} />
      )}
    </div>
  );
}

function ProjectIndex({
  editions,
  onOpen,
}: Pick<Props, "editions" | "onOpen">) {
  const indexRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const dismiss = (event: MouseEvent | KeyboardEvent) => {
      const index = indexRef.current;
      // Keep the index available as the return-focus target for a project dialog.
      if (!index?.open || document.querySelector("dialog[open]")) return;
      if (event instanceof KeyboardEvent) {
        if (event.key !== "Escape") return;
        index.open = false;
        index.querySelector("summary")?.focus();
      } else if (!index.contains(event.target as Node)) {
        index.open = false;
      }
    };
    document.addEventListener("click", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("click", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, []);

  return (
    <details
      className="project-index"
      ref={indexRef}
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget) &&
          !document.querySelector("dialog[open]")
        ) {
          event.currentTarget.open = false;
        }
      }}
    >
      <summary>
        All projects <span aria-hidden="true">+</span>
      </summary>
      <div className="project-index-list">
        {PROJECTS.map((project, index) => (
          <div className="project-index-row" key={project.name}>
            <button
              onClick={(event) => onOpen(index, event.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="index-number">{editions[index].number}</span>
              <span>
                <strong>{project.name}</strong>
                <span>{project.blurb}</span>
              </span>
              <span aria-hidden="true">→</span>
            </button>
            {project.link && (
              <a
                className="index-website text-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.linkKind === "source" ? "View" : "Visit"} ${project.name} ${project.linkKind === "source" ? "source" : "website"} (opens in a new tab)`}
              >
                {new URL(project.link).hostname}{" "}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </details>
  );
}
