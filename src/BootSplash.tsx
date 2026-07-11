import React from "react";

// A brief retro boot splash shown once per session. Bridges Michelle's
// cyberdeck aesthetic (monospace, "dwelling in the wired") into the OS boot.
// Auto-dismisses; clicking/keying skips it. Uses sessionStorage so it doesn't
// nag on every navigation within a session.
const SEEN_KEY = "michelleos-booted";

export function BootSplash() {
  const [done, setDone] = React.useState(
    () => typeof sessionStorage !== "undefined" && sessionStorage.getItem(SEEN_KEY) === "1",
  );
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    if (done) return;
    const fade = setTimeout(() => setLeaving(true), 1900);
    const finish = setTimeout(() => dismiss(), 2400);
    return () => {
      clearTimeout(fade);
      clearTimeout(finish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setDone(true);
  };

  if (done) return null;

  return (
    <div
      className={"bapsos-boot" + (leaving ? " bapsos-boot-leaving" : "")}
      onClick={dismiss}
      role="button"
      aria-label="Skip boot screen"
    >
      <div className="bapsos-boot-inner">
        <div className="bapsos-boot-logo">
          MICHELLE<span className="bapsos-boot-os">_OS</span>
        </div>
        <div className="bapsos-boot-tag">cloud_surfing...</div>
        <div className="bapsos-boot-bar">
          <div className="bapsos-boot-fill" />
        </div>
        <div className="bapsos-boot-hint">click to skip</div>
      </div>
    </div>
  );
}
