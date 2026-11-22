"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useNow } from "@/lib/hooks";
import { useOS } from "@/lib/os-context";
import { SystemIcon } from "@/components/icons/SystemIcon";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
}

type EventStore = Record<string, CalendarEvent[]>;

const STORAGE_KEY = "furqan-portfolio-calendar";

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const shortMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
});

const fullDayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sameDay(a: Date, b: Date) {
  return dateKey(a) === dateKey(b);
}

function formatTime(time: string) {
  if (!time) return "All day";
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function Calendar() {
  const { isCompact } = useOS();
  const now = useNow(60000);
  const today = now ?? new Date();
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const [events, setEvents] = useState<EventStore>({});
  const [showForm, setShowForm] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [formError, setFormError] = useState("");
  const storageLoaded = useRef(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const openEventForm = () => {
    setShowForm(true);
    setFormError("");
    if (isCompact) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.setTimeout(() => {
        panelRef.current?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "nearest",
        });
      }, 40);
    }
  };

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as EventStore;
        if (parsed && typeof parsed === "object") setEvents(parsed);
      }
    } catch {
      // The calendar still works for the current session.
    } finally {
      storageLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    if (!storageLoaded.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // Persistence is optional.
    }
  }, [events]);

  useEffect(() => {
    if (!showForm) return;
    const timer = window.setTimeout(() => titleRef.current?.focus(), 30);
    return () => window.clearTimeout(timer);
  }, [showForm]);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const selectedKey = dateKey(selectedDate);
  const selectedEvents = events[selectedKey] ?? [];
  const todayKey = dateKey(today);

  const changeMonth = (offset: number) => {
    setVisibleMonth((current) => {
      const next = new Date(
        current.getFullYear(),
        current.getMonth() + offset,
        1,
      );
      return next;
    });
  };

  const goToToday = () => {
    const nextToday = new Date();
    setVisibleMonth(
      new Date(nextToday.getFullYear(), nextToday.getMonth(), 1),
    );
    setSelectedDate(
      new Date(
        nextToday.getFullYear(),
        nextToday.getMonth(),
        nextToday.getDate(),
      ),
    );
  };

  const cells = Array.from({ length: 42 }, (_, index) => {
    const dayOffset = index - firstDay + 1;
    if (dayOffset < 1) {
      const day = daysInPreviousMonth + dayOffset;
      return {
        date: new Date(year, month - 1, day),
        isCurrentMonth: false,
      };
    }
    if (dayOffset > daysInMonth) {
      const day = dayOffset - daysInMonth;
      return {
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      };
    }
    return {
      date: new Date(year, month, dayOffset),
      isCurrentMonth: true,
    };
  });

  const handleAddEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = eventTitle.trim();
    if (!title) {
      setFormError("Give the event a title.");
      titleRef.current?.focus();
      return;
    }
    const newEvent: CalendarEvent = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title,
      time: eventTime,
    };
    setEvents((current) => ({
      ...current,
      [selectedKey]: [...(current[selectedKey] ?? []), newEvent].sort((a, b) =>
        a.time.localeCompare(b.time),
      ),
    }));
    setEventTitle("");
    setEventTime("");
    setFormError("");
    setShowForm(false);
  };

  const deleteEvent = (eventId: string) => {
    setEvents((current) => {
      const remaining = (current[selectedKey] ?? []).filter(
        (event) => event.id !== eventId,
      );
      const next = { ...current };
      if (remaining.length > 0) next[selectedKey] = remaining;
      else delete next[selectedKey];
      return next;
    });
  };

  return (
    <div className="calendar-app">
      <header className="calendar-app__header">
        <div className="calendar-app__month-nav">
          <button
            type="button"
            className="calendar-app__icon-button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            <SystemIcon name="chevron-left" size={16} />
          </button>
          <button
            type="button"
            className="calendar-app__today-button"
            onClick={goToToday}
          >
            Today
          </button>
          <button
            type="button"
            className="calendar-app__icon-button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            <SystemIcon name="chevron-right" size={16} />
          </button>
        </div>
        <h2>{monthFormatter.format(visibleMonth)}</h2>
        <button
          type="button"
          className="os-primary-button calendar-app__add-button"
          onClick={openEventForm}
        >
          <SystemIcon name="plus" size={12} />
          New event
        </button>
      </header>

      <div className="calendar-app__layout">
        <div className="calendar-app__month-view">
          <div className="calendar-app__weekdays" aria-hidden="true">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
              (weekday) => (
                <span key={weekday}>{weekday}</span>
              ),
            )}
          </div>
          <div
            className="calendar-app__days"
            aria-label={`${monthFormatter.format(visibleMonth)} calendar`}
          >
            {cells.map(({ date, isCurrentMonth }) => {
              const key = dateKey(date);
              const dayEvents = events[key] ?? [];
              const isSelected = sameDay(date, selectedDate);
              const isToday = key === todayKey;
              return (
                <button
                  key={key}
                  type="button"
                  className={`calendar-app__day ${
                    isCurrentMonth ? "" : "is-outside"
                  } ${isSelected ? "is-selected" : ""} ${
                    isToday ? "is-today" : ""
                  }`}
                  aria-label={`${fullDayFormatter.format(date)}, ${
                    dayEvents.length
                  } ${dayEvents.length === 1 ? "event" : "events"}`}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedDate(date);
                    if (!isCurrentMonth) {
                      setVisibleMonth(
                        new Date(date.getFullYear(), date.getMonth(), 1),
                      );
                    }
                  }}
                >
                  <span className="calendar-app__day-number">
                    {date.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="calendar-app__event-dots" aria-hidden="true">
                      {dayEvents.slice(0, 3).map((event) => (
                        <span key={event.id} />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="calendar-app__month-footer">
            <span>
              {shortMonthFormatter.format(visibleMonth)} · {year}
            </span>
            <span>Stored locally in this browser</span>
          </div>
        </div>

        <aside
          ref={panelRef}
          className="calendar-app__day-panel"
          aria-label="Selected day"
        >
          <div className="calendar-app__day-panel-header">
            <span className="calendar-app__day-weekday">
              {weekdayFormatter.format(selectedDate).toUpperCase()}
            </span>
            <span className="calendar-app__day-big">
              {selectedDate.getDate()}
            </span>
            <span className="calendar-app__day-month">
              {shortMonthFormatter.format(selectedDate)} {selectedDate.getFullYear()}
            </span>
          </div>

          {showForm ? (
            <form className="calendar-app__event-form" onSubmit={handleAddEvent}>
              <h3>New event</h3>
              <label htmlFor="calendar-event-title">Title</label>
              <input
                ref={titleRef}
                id="calendar-event-title"
                type="text"
                value={eventTitle}
                onChange={(event) => {
                  setEventTitle(event.target.value);
                  setFormError("");
                }}
                placeholder="What is happening?"
                aria-invalid={Boolean(formError)}
                aria-describedby={
                  formError ? "calendar-event-error" : undefined
                }
              />
              {formError && (
                <p
                  className="calendar-app__form-error"
                  id="calendar-event-error"
                  role="alert"
                >
                  {formError}
                </p>
              )}
              <label htmlFor="calendar-event-time">Time (optional)</label>
              <input
                id="calendar-event-time"
                type="time"
                value={eventTime}
                onChange={(event) => setEventTime(event.target.value)}
              />
              <div className="calendar-app__form-actions">
                <button
                  type="button"
                  className="os-secondary-button"
                  onClick={() => {
                    setShowForm(false);
                    setFormError("");
                    setEventTitle("");
                    setEventTime("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="os-primary-button">
                  Add event
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="calendar-app__day-panel-heading">
                <h3>{fullDayFormatter.format(selectedDate)}</h3>
                <button
                  type="button"
                  className="calendar-app__panel-add"
                  onClick={openEventForm}
                  aria-label="Add an event for this day"
                >
                  <SystemIcon name="plus" size={13} />
                </button>
              </div>

              <div className="calendar-app__event-list">
                {selectedEvents.length > 0 ? (
                  selectedEvents.map((event) => (
                    <article className="calendar-app__event" key={event.id}>
                      <span
                        className="calendar-app__event-mark"
                        aria-hidden="true"
                      />
                      <div>
                        <h4>{event.title}</h4>
                        <p>{formatTime(event.time)}</p>
                      </div>
                      <button
                        type="button"
                        className="calendar-app__event-delete"
                        onClick={() => deleteEvent(event.id)}
                        aria-label={`Delete ${event.title}`}
                      >
                        <SystemIcon name="close" size={10} />
                      </button>
                    </article>
                  ))
                ) : (
                  <div className="calendar-app__empty">
                    <SystemIcon name="calendar" size={22} />
                    <p>Nothing scheduled.</p>
                    <button
                      type="button"
                      className="os-text-button"
                      onClick={openEventForm}
                    >
                      Add an event
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <p className="calendar-app__panel-note">
            Your events stay in this browser. They are not sent anywhere.
          </p>
        </aside>
      </div>
    </div>
  );
}
