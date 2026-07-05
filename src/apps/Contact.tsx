import React from "react";
import { CONTACT } from "../content";

// A faux "send message" form — opens the visitor's mail client via mailto.
// No server, nothing to host. Swap in a form backend (Formspree, etc.) later
// if you want in-page submission.
export function Contact() {
  const [msg, setMsg] = React.useState("");
  const [from, setFrom] = React.useState("");

  const send = () => {
    const subject = encodeURIComponent(`Portfolio message from ${from || "a visitor"}`);
    const body = encodeURIComponent(msg);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bapsos-pad bapsos-contact">
      <fieldset className="bapsos-fieldset">
        <legend>Reach me</legend>
        <div className="bapsos-contact-row">
          <span>✉️</span>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
        <div className="bapsos-about-links">
          {CONTACT.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer noopener">
              {l.label}
            </a>
          ))}
        </div>
      </fieldset>

      <fieldset className="bapsos-fieldset">
        <legend>Send a message</legend>
        <input
          className="bapsos-contact-input"
          placeholder="Your name"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <textarea
          className="bapsos-contact-textarea"
          placeholder="Say hi…"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="bapsos-contact-send" onClick={send} disabled={!msg.trim()}>
          Send ✉
        </button>
      </fieldset>
    </div>
  );
}
