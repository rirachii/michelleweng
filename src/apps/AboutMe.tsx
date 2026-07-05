import { PROFILE, CONTACT } from "../content";

export function AboutMe() {
  return (
    <div className="bapsos-pad">
      <div className="bapsos-fieldrow">
        {PROFILE.avatar ? (
          <img className="bapsos-avatar" src={PROFILE.avatar} alt={PROFILE.name} />
        ) : (
          <span className="bapsos-avatar bapsos-avatar-placeholder">🙂</span>
        )}
        <div>
          <div className="bapsos-strong">{PROFILE.name}</div>
          <div className="bapsos-muted">{PROFILE.role}</div>
          <div className="bapsos-muted">{PROFILE.location}</div>
        </div>
      </div>
      <fieldset className="bapsos-fieldset">
        <legend>About</legend>
        <p className="bapsos-about-bio">{PROFILE.bio}</p>
      </fieldset>
      <div className="bapsos-about-links">
        {CONTACT.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noreferrer noopener">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
