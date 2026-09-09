import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { PROJECTS } from "./portfolio-content";

interface Props {
  editions: readonly { color: string; type: string; number: string }[];
  renderCartridge: (index: number) => ReactNode;
  onOpen: (index: number, source: HTMLElement) => void;
}

/** A compact shelf: selection previews a cartridge; View project opens its details. */
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
          const spread = selected === null ? 0 : Math.sign(offset);
          return (
            <div
              key={project.name}
              className="shelf-position"
              data-active={active}
              style={
                {
                  "--offset": offset,
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
                  <span className="spine-number">{editions[index].number}</span>
                </span>
                <span className="shelf-edge shelf-edge--top" />
                <span className="shelf-edge shelf-edge--bottom" />
                {renderCartridge(index)}
              </span>
              <span className="shelf-number" aria-hidden="true">
                {editions[index].number}
              </span>
              <button
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                className="shelf-item"
                aria-label={`Preview ${project.name}`}
                aria-pressed={active}
                aria-controls="shelf-preview"
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
            <button
              className="text-link"
              aria-haspopup="dialog"
              onClick={(event) => onOpen(selected, event.currentTarget)}
            >
              View project <span aria-hidden="true">↗</span>
            </button>
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

      <details className="project-index">
        <summary>
          All projects <span aria-hidden="true">+</span>
        </summary>
        <div className="project-index-list">
          {PROJECTS.map((project, index) => (
            <button
              key={project.name}
              onClick={(event) => onOpen(index, event.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="index-number">{editions[index].number}</span>
              <span>
                <strong>{project.name}</strong>
                <span>{project.blurb}</span>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
