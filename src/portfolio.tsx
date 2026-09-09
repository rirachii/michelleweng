import { useEffect, useRef, useState } from "react";
import { animateDetails, usePortfolioMotion } from "./usePortfolioMotion";
import { PROJECTS } from "./portfolio-content";
import { CartridgeShelf } from "./CartridgeShelf";
import { CONTACT, PROFILE, RESUME_MD, RESUME_PDF, WRITING } from "./content";

// Presentation metadata stays separate so the archived OS keeps its original content.
const EDITIONS = [
  {
    id: "short-transcript",
    type: "AI tool",
    color: "orange",
    motif: "wave",
    number: "01",
  },
  {
    id: "umami-world",
    type: "Mobile app",
    color: "green",
    motif: "bowl",
    number: "02",
  },
  {
    id: "void-mail",
    type: "Web app",
    color: "purple",
    motif: "portal",
    number: "03",
  },
  {
    id: "retro-cam",
    type: "Experiment",
    color: "yellow",
    motif: "camera",
    number: "04",
  },
  {
    id: "converty",
    type: "Mac app",
    color: "blue",
    motif: "files",
    number: "05",
  },
] as const;

const COLLECTION_COUNT = String(PROJECTS.length).padStart(2, "0");

type Selection =
  { kind: "project"; index: number } | { kind: "writing"; index: number };

function selectionFromHash(): Selection | null {
  const hash = window.location.hash.slice(1);
  const index = EDITIONS.findIndex((edition) => edition.id === hash);
  if (index >= 0) return { kind: "project", index };
  const writingIndex = WRITING.findIndex((_, i) => hash === `note-${i + 1}`);
  return writingIndex >= 0 ? { kind: "writing", index: writingIndex } : null;
}

function Cartridge({ index }: { index: number }) {
  const edition = EDITIONS[index];
  const icon = PROJECTS[index].icon;
  return (
    <span
      className={`cartridge cartridge--${edition.color}`}
      aria-hidden="true"
    >
      <span className="cartridge-top">
        <span>MICHELLE</span>
      </span>
      <span className="cartridge-ridges" />
      <span className="cartridge-label">
        <span className="label-title">{PROJECTS[index].name}</span>
        <span
          className={`label-art label-art--${icon ? "app-icon" : edition.motif}`}
        >
          {icon && (
            <img
              className="app-icon"
              src={icon}
              width={256}
              height={256}
              alt=""
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
            />
          )}
          {!icon && edition.motif === "wave" && (
            <span className="wave-bars">
              {[16, 28, 42, 22, 55, 72, 43, 28, 57, 36, 20, 34, 14].map(
                (height, i) => (
                  <i key={i} style={{ height: `${height}%` }} />
                ),
              )}
            </span>
          )}
          {!icon && edition.motif === "bowl" && (
            <span className="food-art">
              <span className="steam">≈ ≈ ≈</span>
              <span className="chopsticks" />
              <span className="noodles" />
              <span className="bowl" />
              <span className="bowl-foot" />
            </span>
          )}
          {!icon && edition.motif === "portal" && (
            <span className="portal-art">
              <span />
              <span />
              <span />
              <span />
              <i>✉</i>
            </span>
          )}
          {!icon && edition.motif === "camera" && (
            <span className="camera-art">
              <span className="camera-body">
                <i />
                <b />
                <em />
              </span>
              <span className="camera-spark">✦</span>
            </span>
          )}
          {!icon && edition.motif === "files" && (
            <span className="file-art">
              <span className="file-sheet file-sheet--source">HEIC</span>
              <b className="file-arrow">→</b>
              <span className="file-sheet file-sheet--output">JPG</span>
            </span>
          )}
        </span>
        <span className="label-category">{edition.type}</span>
      </span>
      <span className="cartridge-bottom">
        <span />
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
  // Retain content during the native dialog's CSS exit transition.
  const [displayedSelection, setDisplayedSelection] =
    useState<Selection | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  usePortfolioMotion(siteRef);

  useEffect(() => {
    const update = () => {
      const next = selectionFromHash();
      if (next) setDisplayedSelection(next);
      setSelection(next);
    };
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
    let stopDetailMotion = () => {};
    if (selection) {
      if (!dialog.open) dialog.showModal();
      else
        dialog
          .querySelector<HTMLElement>("#detail-title")
          ?.focus({ preventScroll: true });
      dialog.scrollTop = 0;
      document.body.style.overflow = "hidden";
      stopDetailMotion = animateDetails(dialog);
    } else {
      dialog.close();
      document.body.style.overflow = "";
      returnFocus.current?.focus({ preventScroll: true });
    }
    return () => {
      stopDetailMotion();
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
    setDisplayedSelection(next);
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
      <div className="site-wrap" ref={siteRef}>
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
              <h1 id="intro-title">Hi, I’m Michelle.</h1>
              <p className="intro-description">
                I build simple app experiences and the systems that make them
                work.
              </p>
              <p className="intro-aside">
                Usually somewhere down a rabbit hole. Here are a few things I’ve
                made along the way.
              </p>
            </div>
          </section>

          <section
            className="collection"
            id="collection"
            aria-labelledby="collection-title"
          >
            <div className="section-heading">
              <h2 id="collection-title">
                Selected work <span>{COLLECTION_COUNT}</span>
              </h2>
              <span className="section-note">PICK A CARTRIDGE</span>
            </div>
            <CartridgeShelf
              editions={EDITIONS}
              renderCartridge={(index) => <Cartridge index={index} />}
              onOpen={(index, source) =>
                openSelection({ kind: "project", index }, source)
              }
            />
            <div className="collection-foot">
              <span>A LITTLE COLLECTION, ALWAYS GROWING.</span>
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
            <div className="about-heading" data-reveal>
              <p className="eyebrow">MEET THE PLAYER</p>
              <h2 id="about-title">Behind the pixels.</h2>
              <div className="location">
                <span aria-hidden="true">◎</span> {PROFILE.location}
              </div>
            </div>
            <div className="about-copy" data-reveal>
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
                  data-reveal
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

          <section
            className="contact-section"
            aria-labelledby="contact-title"
            data-reveal
          >
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
              <button
                className="copy-button"
                onClick={copyEmail}
                data-copied={copied}
              >
                <span key={copied ? "copied" : "idle"}>
                  {copied ? "Email copied ✓" : "Copy email address"}
                </span>
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
            My OS <span aria-hidden="true">↗</span>
          </a>
          <span className="footer-signoff">
            THANKS FOR PLAYING <span aria-hidden="true">✳</span>
          </span>
        </footer>
      </div>

      <dialog
        ref={dialogRef}
        className={`detail-dialog ${displayedSelection?.kind === "writing" ? "detail-dialog--writing" : ""}`}
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
        {displayedSelection?.kind === "project" && (
          <div className="project-detail">
            <div
              className={`detail-art detail-art--${EDITIONS[displayedSelection.index].color}`}
            >
              <Cartridge
                key={displayedSelection.index}
                index={displayedSelection.index}
              />
            </div>
            <div className="detail-copy">
              <p className="eyebrow">
                CARTRIDGE {EDITIONS[displayedSelection.index].number} /{" "}
                {EDITIONS[displayedSelection.index].type.toUpperCase()}
              </p>
              <h2 id="detail-title" tabIndex={-1}>
                {PROJECTS[displayedSelection.index].name}
              </h2>
              <p className="detail-lead">
                {PROJECTS[displayedSelection.index].blurb}
              </p>
              <p>{PROJECTS[displayedSelection.index].description}</p>
              <h3>BUILT WITH</h3>
              <ul className="stack-list">
                {PROJECTS[displayedSelection.index].tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {PROJECTS[displayedSelection.index].link ? (
                <a
                  className="hello-button"
                  href={PROJECTS[displayedSelection.index].link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {PROJECTS[displayedSelection.index].linkLabel ??
                    "View project"}{" "}
                  ↗
                </a>
              ) : (
                <a
                  className="text-link"
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Tell me about ${PROJECTS[displayedSelection.index].name}`)}`}
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
                        index:
                          (displayedSelection.index - 1 + PROJECTS.length) %
                          PROJECTS.length,
                      },
                      returnFocus.current ?? document.body,
                    )
                  }
                  aria-label="Previous project"
                >
                  ← Previous
                </button>
                <span>
                  {EDITIONS[displayedSelection.index].number} /{" "}
                  {COLLECTION_COUNT}
                </span>
                <button
                  onClick={() =>
                    openSelection(
                      {
                        kind: "project",
                        index: (displayedSelection.index + 1) % PROJECTS.length,
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
        {displayedSelection?.kind === "writing" && (
          <article className="writing-detail">
            <p className="eyebrow">
              SAVE FILE {String(displayedSelection.index + 1).padStart(2, "0")}{" "}
              /{" "}
              <time dateTime={WRITING[displayedSelection.index].date}>
                {WRITING[displayedSelection.index].date}
              </time>
            </p>
            <h2 id="detail-title" tabIndex={-1}>
              {WRITING[displayedSelection.index].title}
            </h2>
            <p className="detail-lead">
              {WRITING[displayedSelection.index].blurb}
            </p>
            <p>{WRITING[displayedSelection.index].body}</p>
            <a
              className="text-link"
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(WRITING[displayedSelection.index].title)}`}
            >
              Let’s talk about it <span aria-hidden="true">↗</span>
            </a>
          </article>
        )}
      </dialog>
    </>
  );
}
