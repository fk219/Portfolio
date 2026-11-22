"use client";

import { useRef, useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { profile } from "@/data/profile";
import { copyText } from "@/lib/clipboard";

export function IOSContactApp() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  const copy = async () => {
    const ok = await copyText(profile.email);
    setCopied(ok);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="ios-app-view ios-contact">
      <div className="ios-app-view__scroll">
        <header className="ios-large-header">
          <span className="ios-eyebrow">Contact</span>
          <h1>Let&apos;s talk.</h1>
          <p>{profile.availabilityNote}</p>
        </header>

        <section className="ios-contact-card">
          <span className="ios-contact-card__avatar">FK</span>
          <h2>{profile.name}</h2>
          <p>
            Founder, {profile.company} · {profile.role}
          </p>
          <span>{profile.location}</span>
          <div className="ios-contact-card__actions">
            <a href={`mailto:${profile.email}`} className="ios-contact-action">
              <SystemIcon name="mail" size={17} />
              Message
            </a>
            <button type="button" className="ios-contact-action" onClick={copy}>
              <SystemIcon name={copied ? "check" : "copy"} size={16} />
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="ios-contact-action"
            >
              <SystemIcon name="external" size={15} />
              GitHub
            </a>
          </div>
        </section>

        <section className="ios-group ios-group--list">
          <h2>Details</h2>
          <a className="ios-list-row" href={`mailto:${profile.email}`}>
            <span className="ios-list-row__icon ios-list-row__icon--blue">
              <SystemIcon name="mail" size={16} />
            </span>
            <span>
              <strong>Email</strong>
              <small>{profile.email}</small>
            </span>
            <SystemIcon name="external" size={12} />
          </a>
          <a
            className="ios-list-row"
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <span className="ios-list-row__icon ios-list-row__icon--dark">
              GH
            </span>
            <span>
              <strong>GitHub</strong>
              <small>github.com/fk219</small>
            </span>
            <SystemIcon name="external" size={12} />
          </a>
          <a
            className="ios-list-row"
            href={profile.companyUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="ios-list-row__icon ios-list-row__icon--orange">
              FK
            </span>
            <span>
              <strong>FKodeLabs</strong>
              <small>Web applications and intelligent automation</small>
            </span>
            <SystemIcon name="external" size={12} />
          </a>
          {profile.socials.linkedin && (
            <a
              className="ios-list-row"
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span className="ios-list-row__icon ios-list-row__icon--blue">
                in
              </span>
              <span>
                <strong>LinkedIn</strong>
                <small>Professional profile</small>
              </span>
              <SystemIcon name="external" size={12} />
            </a>
          )}
          {profile.socials.twitter && (
            <a
              className="ios-list-row"
              href={profile.socials.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <span className="ios-list-row__icon ios-list-row__icon--dark">
                X
              </span>
              <span>
                <strong>X</strong>
                <small>Notes and work in progress</small>
              </span>
              <SystemIcon name="external" size={12} />
            </a>
          )}
        </section>

        <section className="ios-group">
          <h2>Before you send</h2>
          <p className="ios-body-copy">
            A short note about what you are building and where I might help is
            the quickest way in. Detailed project context is always welcome.
          </p>
          <a
            href={`mailto:${profile.email}?subject=Let's%20build%20something`}
            className="ios-button ios-button--primary ios-contact__wide"
          >
            Start a conversation
            <SystemIcon name="external" size={12} />
          </a>
        </section>
      </div>
    </div>
  );
}
