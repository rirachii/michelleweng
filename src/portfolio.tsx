import { useEffect, useRef, useState } from "react";
import {
  CONTACT,
  PROFILE,
  PROJECTS,
  RESUME_MD,
  RESUME_PDF,
  WRITING,
} from "./content";

// Presentation metadata stays separate so the archived OS keeps its original content.
const EDITIONS = [
  {
    id: "short-transcript",
    type: "AI tool",
    color: "orange",
    title: ["short", "transcript"],
    motif: "wave",
    caption: "LESS WATCHING. MORE MAKING.",
    number: "01",
  },
  {
    id: "umami-world",
    type: "Mobile app",
    color: "green",
    title: ["umami", "world"],
    motif: "bowl",
    caption: "A WORLD WORTH TASTING.",
    number: "02",
  },
  {
    id: "void-mail",
    type: "Web app",
    color: "purple",
    title: ["void", "mail"],
    motif: "portal",
    caption: "HERE TODAY. GONE TOMORROW.",
    number: "03",
  },
  {
    id: "retro-cam",
    type: "Experiment",
    color: "yellow",
    title: ["retro", "cam"],
    motif: "camera",
    caption: "A DIFFERENT WAY TO SEE.",
    number: "04",
  },
] as const;

type Selection =
  | { kind: "project"; index: number }
  | { kind: "writing"; index: number };

function selectionFromHash(): Selection | null {
  const hash = window.location.hash.slice(1);
  const index = EDITIONS.findIndex((edition) => edition.id === hash);
  if (index >= 0) return { kind: "project", index };
  const writingIndex = WRITING.findIndex((_, i) => hash === `note-${i + 1}`);
  return writingIndex >= 0 ? { kind: "writing", index: writingIndex } : null;
}

function Cartridge({ index }: { index: number }) {
  const edition = EDITIONS[index];
  return (
    <span
      className={`cartridge cartridge--${edition.color}`}
      aria-hidden="true"
    >
      <span className="cartridge-top">
        <span>MICHELLE™</span>
        <b>GAME LIBRARY</b>
      </span>
      <span className="cartridge-ridges" />
      <span className="cartridge-label">
        <span className="label-top">
          <span>MW ORIGINALS</span>
          <span>№ {edition.number}</span>
        </span>
        <span className="label-title">
          {edition.title[0]}
          <br />
          {edition.title[1]}
          <span className="label-star">✳</span>
        </span>
        <span className={`label-art label-art--${edition.motif}`}>
          {edition.motif === "wave" && (
            <span className="wave-bars">
              {[16, 28, 42, 22, 55, 72, 43, 28, 57, 36, 20, 34, 14].map(
                (height, i) => (
                  <i key={i} style={{ height: `${height}%` }} />
                ),
              )}
            </span>
          )}
          {edition.motif === "bowl" && (
            <span className="food-art">
              <span className="steam">≈ ≈ ≈</span>
              <span className="chopsticks" />
              <span className="noodles" />
              <span className="bowl" />
              <span className="bowl-foot" />
            </span>
          )}
          {edition.motif === "portal" && (
            <span className="portal-art">
              <span />
              <span />
              <span />
              <span />
              <i>✉</i>
            </span>
          )}
          {edition.motif === "camera" && (
            <span className="camera-art">
              <span className="camera-body">
                <i />
                <b />
                <em />
              </span>
              <span className="camera-spark">✦</span>
            </span>
          )}
        </span>
        <span className="label-bottom">
          <span>{edition.caption}</span>
          <b>MW</b>
        </span>
      </span>
      <span className="cartridge-bottom">
        <span>DMG-MW-{edition.number}</span>
        <i />
        <span>▼</span>
      </span>
    </span>
  );
}

function ResumeLink() {
  return (
    <a
      className="text-link"
      href={
        RESUME_PDF ??
        `data:text/markdown;charset=utf-8,${encodeURIComponent(RESUME_MD)}`
      }
      download={RESUME_PDF ? undefined : "Michelle-Weng-Resume.md"}
    >
      Résumé <span aria-hidden="true">↗</span>
    </a>
  );
}

export function Portfolio() {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const update = () => setSelection(selectionFromHash());
    update();
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("hashchange", update);
      clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selection) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
      returnFocus.current?.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selection]);

  function openSelection(next: Selection, trigger: HTMLElement) {
    returnFocus.current = trigger;
    const hash =
      next.kind === "project"
        ? EDITIONS[next.index].id
        : `note-${next.index + 1}`;
    window.history.pushState(null, "", `#${hash}`);
    setSelection(next);
  }

  function closeSelection() {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    setSelection(null);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setCopyFailed(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-wrap">
        <header className="site-header">
          <a href="#" className="identity" aria-label={`${PROFILE.name}, home`}>
            <span className="pixel-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>
              michelle weng<span className="identity-dot">.</span>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#collection">Work</a>
            <a href="#about">About</a>
            <a href={`mailto:${CONTACT.email}`} className="header-contact">
              Say hello <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </header>

        <main id="main">
          <section className="intro" aria-labelledby="intro-title">
            <div className="intro-copy">
              <p className="eyebrow">
                <span className="status-light" /> SOFTWARE ENGINEER & CURIOUS
                HUMAN
              </p>
              <h1 id="intro-title">
                Thoughtful apps.
                <br />
                <span>A playful spirit.</span>
              </h1>
              <p className="intro-description">
                Hi, I’m Michelle. I build simple app experiences
                <br className="desktop-break" /> and the systems that make them
                work.
              </p>
            </div>
            <div className="player-note">
              <span className="mini-dpad" aria-hidden="true" />
              <span>
                A few things I’ve made.
                <br />
                Pick one. Take a look inside.
              </span>
              <span className="note-arrow" aria-hidden="true">
                ↙
              </span>
            </div>
          </section>

          <section
            className="collection"
            id="collection"
            aria-labelledby="collection-title"
          >
            <div className="section-heading">
              <h2 id="collection-title">
                THE COLLECTION <span>04</span>
              </h2>
              <span className="section-note">
                <span className="tiny-square" /> SELECT A CARTRIDGE
              </span>
            </div>
            <div className="cartridge-grid">
              {PROJECTS.map((project, index) => (
                <button
                  className={`project-card project-card--${EDITIONS[index].color}`}
                  key={project.name}
                  onClick={(event) =>
                    openSelection(
                      { kind: "project", index },
                      event.currentTarget,
                    )
                  }
                  aria-haspopup="dialog"
                >
                  <span className="cartridge-stage">
                    <Cartridge index={index} />
                  </span>
                  <span className="project-info">
                    <span className="project-meta">
                      {EDITIONS[index].type}
                      <span>{EDITIONS[index].number}</span>
                    </span>
                    <span className="project-title">
                      {project.name}
                      <span className="project-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </span>
                    <span className="project-blurb">{project.blurb}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="collection-foot">
              <span>
                <span className="key-cap">A</span> A LITTLE COLLECTION, ALWAYS
                GROWING.
              </span>
              <a href={CONTACT.links[0].url} target="_blank" rel="noreferrer">
                More on GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          <section
            className="about-section"
            id="about"
            aria-labelledby="about-title"
          >
            <div className="about-heading">
              <p className="eyebrow">MEET THE PLAYER</p>
              <h2 id="about-title">Behind the pixels.</h2>
              <div className="location">
                <span aria-hidden="true">◎</span> {PROFILE.location}
              </div>
            </div>
            <div className="about-copy">
              <p>
                I like making complex things feel simple. Sometimes that’s a
                mobile app. Sometimes it’s the backend quietly doing its job.
              </p>
              <p>
                Usually somewhere down a rabbit hole. Currently exploring
                neuromarketing, clean code, and the beauty of digital decay.
              </p>
              <div className="about-links">
                <ResumeLink />
                <a
                  className="text-link"
                  href={CONTACT.links[2].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>

          <section className="writing-section" aria-labelledby="writing-title">
            <div className="section-heading">
              <h2 id="writing-title">SAVE FILES</h2>
              <span className="section-note">NOTES FROM THE RABBIT HOLE</span>
            </div>
            <div className="writing-list">
              {WRITING.map((post, index) => (
                <button
                  className="writing-row"
                  key={post.title}
                  onClick={(event) =>
                    openSelection(
                      { kind: "writing", index },
                      event.currentTarget,
                    )
                  }
                  aria-haspopup="dialog"
                >
                  <time dateTime={post.date}>
                    {new Date(`${post.date}T12:00:00Z`).toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric", timeZone: "UTC" },
                    )}
                  </time>
                  <span>{post.title}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </section>

          <section className="contact-section" aria-labelledby="contact-title">
            <div>
              <p className="eyebrow">
                <span className="status-light" /> TWO-PLAYER MODE
              </p>
              <h2 id="contact-title">
                Good things start
                <br />
                with a hello.
              </h2>
              <a className="email-link" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="contact-actions">
              <a className="hello-button" href={`mailto:${CONTACT.email}`}>
                Let’s talk <span aria-hidden="true">↗</span>
              </a>
              <button className="copy-button" onClick={copyEmail}>
                {copied ? "Email copied ✓" : "Copy email address"}
              </button>
              <span className="copy-status" role="status">
                {copyFailed
                  ? "Please select and copy the email address above."
                  : copied
                    ? "Email address copied to clipboard."
                    : ""}
              </span>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <a href="/bapos/">
            Visit the original BapOS <span aria-hidden="true">↗</span>
          </a>
          <span className="footer-signoff">
            THANKS FOR PLAYING <span aria-hidden="true">✳</span>
          </span>
        </footer>
      </div>

      <dialog
        ref={dialogRef}
        className={`detail-dialog ${selection?.kind === "writing" ? "detail-dialog--writing" : ""}`}
        aria-labelledby="detail-title"
        onCancel={(event) => {
          event.preventDefault();
          closeSelection();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              closeSelection();
          }
        }}
      >
        <button
          className="dialog-close"
          onClick={closeSelection}
          aria-label="Close details"
          autoFocus
        >
          ×
        </button>
        {selection?.kind === "project" && (
          <div className="project-detail">
            <div
              className={`detail-art detail-art--${EDITIONS[selection.index].color}`}
            >
              <Cartridge index={selection.index} />
            </div>
            <div className="detail-copy">
              <p className="eyebrow">
                CARTRIDGE {EDITIONS[selection.index].number} /{" "}
                {EDITIONS[selection.index].type.toUpperCase()}
              </p>
              <h2 id="detail-title">{PROJECTS[selection.index].name}</h2>
              <p className="detail-lead">{PROJECTS[selection.index].blurb}</p>
              <p>{PROJECTS[selection.index].description}</p>
              <h3>BUILT WITH</h3>
              <ul className="stack-list">
                {PROJECTS[selection.index].tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {PROJECTS[selection.index].link ? (
                <a
                  className="hello-button"
                  href={PROJECTS[selection.index].link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {PROJECTS[selection.index].linkLabel ?? "View project"} ↗
                </a>
              ) : (
                <a
                  className="text-link"
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Tell me about ${PROJECTS[selection.index].name}`)}`}
                >
                  Ask me about this project <span aria-hidden="true">↗</span>
                </a>
              )}
              <div className="detail-pagination">
                <button
                  onClick={() =>
                    openSelection(
                      {
                        kind: "project",
                        index: (selection.index + 3) % PROJECTS.length,
                      },
                      returnFocus.current ?? document.body,
                    )
                  }
                  aria-label="Previous project"
                >
                  ← Previous
                </button>
                <span>{EDITIONS[selection.index].number} / 04</span>
                <button
                  onClick={() =>
                    openSelection(
                      {
                        kind: "project",
                        index: (selection.index + 1) % PROJECTS.length,
                      },
                      returnFocus.current ?? document.body,
                    )
                  }
                  aria-label="Next project"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
        {selection?.kind === "writing" && (
          <article className="writing-detail">
            <p className="eyebrow">
              SAVE FILE {String(selection.index + 1).padStart(2, "0")} /{" "}
              <time dateTime={WRITING[selection.index].date}>
                {WRITING[selection.index].date}
              </time>
            </p>
            <h2 id="detail-title">{WRITING[selection.index].title}</h2>
            <p className="detail-lead">{WRITING[selection.index].blurb}</p>
            <p>{WRITING[selection.index].body}</p>
            <a
              className="text-link"
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(WRITING[selection.index].title)}`}
            >
              Let’s talk about it <span aria-hidden="true">↗</span>
            </a>
          </article>
        )}
      </dialog>
    </>
  );
}
