"use client";

import { useRef, useState } from "react";
import { profile } from "@/data/profile";
import { copyText } from "@/lib/clipboard";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFields: ContactFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Mail() {
  const { openApp } = useOS();
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const copyTimer = useRef<number | null>(null);

  const updateField = (key: keyof ContactFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
    if (status) setStatus("");
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!fields.subject.trim()) {
      nextErrors.subject = "Add a subject so the message has a clear start.";
    }
    if (!fields.message.trim()) {
      nextErrors.message = "Add a short message before opening Mail.";
    }
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      nextErrors.email = "Enter a valid email address, or leave this blank.";
    }
    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      const firstRef = nextErrors.subject
        ? subjectRef
        : nextErrors.message
          ? messageRef
          : nextErrors.email
            ? emailRef
            : nameRef;
      firstRef.current?.focus();
      setStatus("Please fix the highlighted fields.");
      return;
    }

    const subject = encodeURIComponent(fields.subject.trim());
    const intro = [
      fields.message.trim(),
      "",
      fields.name.trim() ? `From: ${fields.name.trim()}` : "",
      fields.email.trim() ? `Reply to: ${fields.email.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(intro)}`;
    setStatus("Opening your mail app with this message.");
    window.location.href = mailto;
  };

  const handleCopy = async () => {
    const copied = await copyText(profile.email);
    setCopyStatus(copied ? "Copied" : "Copy unavailable");
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyStatus(""), 2200);
  };

  const firstError =
    errors.subject ?? errors.message ?? errors.email ?? errors.name;

  return (
    <div className="mail">
      <aside className="mail__sidebar" aria-label="Contact details">
        <div className="mail__profile">
          <span className="mail__avatar" aria-hidden="true">
            {profile.initials}
          </span>
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
          <span className="mail__availability">
            <span className="mail__availability-dot" aria-hidden="true" />
            Portfolio contact
          </span>
        </div>

        <div className="mail__contact-card">
          <span className="mail__contact-label">Email</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button
            type="button"
            className="mail__copy-button"
            onClick={handleCopy}
          >
            <SystemIcon name="copy" size={11} />
            {copyStatus || "Copy address"}
          </button>
        </div>

        <div className="mail__contact-card">
          <span className="mail__contact-label">Elsewhere</span>
          <a
            href="https://github.com/fk219"
            target="_blank"
            rel="noreferrer"
          >
            github.com/fk219
            <SystemIcon name="external" size={10} />
          </a>
          <button
            type="button"
            className="mail__copy-button"
            onClick={() => openApp("resume")}
          >
            <SystemIcon name="document" size={11} />
            View resume
          </button>
        </div>

        <p className="mail__sidebar-note">
          This form opens a message in your own mail app. Nothing is stored
          or sent by the portfolio.
        </p>
      </aside>

      <div className="mail__composer">
        <div className="mail__composer-toolbar">
          <div className="mail__composer-title">
            <SystemIcon name="mail" size={15} />
            <span>New Message</span>
          </div>
          <span className="mail__composer-draft">Draft</span>
        </div>

        <form className="mail__form" onSubmit={handleSubmit} noValidate>
          <div className="mail__address-row">
            <span className="mail__field-label">To</span>
            <span className="mail__to-pill">
              <span className="mail__to-avatar" aria-hidden="true">
                {profile.initials}
              </span>
              {profile.name}
              <span className="mail__to-email">&lt;{profile.email}&gt;</span>
            </span>
          </div>

          <div className="mail__form-body">
            <div className="mail__field-row">
              <div className="mail__field">
                <label htmlFor="mail-name">Your name</label>
                <input
                  ref={nameRef}
                  id="mail-name"
                  type="text"
                  value={fields.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Optional"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && (
                  <p className="mail__field-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="mail__field">
                <label htmlFor="mail-email">Your email</label>
                <input
                  ref={emailRef}
                  id="mail-email"
                  type="email"
                  value={fields.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Optional, for a reply"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "mail-email-error" : undefined}
                />
                {errors.email && (
                  <p
                    className="mail__field-error"
                    id="mail-email-error"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mail__field">
              <label htmlFor="mail-subject">Subject</label>
              <input
                ref={subjectRef}
                id="mail-subject"
                type="text"
                value={fields.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                placeholder="What would you like to talk about?"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? "mail-subject-error" : undefined
                }
                required
              />
              {errors.subject && (
                <p
                  className="mail__field-error"
                  id="mail-subject-error"
                  role="alert"
                >
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="mail__field mail__field--message">
              <label htmlFor="mail-message">Message</label>
              <textarea
                ref={messageRef}
                id="mail-message"
                value={fields.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="A few lines are enough."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "mail-message-error" : undefined
                }
                required
              />
              {errors.message && (
                <p
                  className="mail__field-error"
                  id="mail-message-error"
                  role="alert"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mail__form-footer">
              <div className="mail__form-status" aria-live="polite">
                {firstError || status ? (
                  <>
                    <SystemIcon
                      name={firstError ? "alert" : "info"}
                      size={13}
                    />
                    <span>{firstError ?? status}</span>
                  </>
                ) : null}
              </div>
              <div className="mail__form-actions">
                <button
                  type="button"
                  className="os-secondary-button"
                  onClick={() => {
                    setFields(initialFields);
                    setErrors({});
                    setStatus("");
                    nameRef.current?.focus();
                  }}
                >
                  Clear
                </button>
                <button type="submit" className="os-primary-button">
                  Open in Mail
                  <SystemIcon name="external" size={11} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
