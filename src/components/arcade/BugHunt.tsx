"use client";

import { useEffect, useRef, useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { bugHuntRounds } from "@/data/bug-hunt";
import { copyText } from "@/lib/clipboard";

type Stage = "intro" | "playing" | "done";

const BEST_KEY = "fk-bug-hunt-best";

function gradeFor(score: number, total: number) {
  const ratio = score / total;
  if (ratio === 1) return "Compiler-level eye.";
  if (ratio >= 0.75) return "Production debugger.";
  if (ratio >= 0.5) return "Solid instincts.";
  return "Keep the console open.";
}

function shareText(score: number, total: number, best: number) {
  return `I caught ${score}/${total} bugs in Bug Hunt on Furqan's Portfolio OS. Best: ${best}/${total}.\nhttps://furqankhan.dev`;
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator.vibrate === "function") navigator.vibrate(pattern);
}

export function BugHunt({ compact = false }: { compact?: boolean }) {
  const [stage, setStage] = useState<Stage>("intro");
  const [roundIndex, setRoundIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [shareStatus, setShareStatus] = useState("");
  const shareTimer = useRef<number | null>(null);
  const round = bugHuntRounds[roundIndex] ?? bugHuntRounds[0];
  const finished = stage === "done";
  const answered = picked !== null;
  const correct = picked === round.bugLine;

  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(BEST_KEY));
      if (Number.isFinite(stored) && stored > 0) setBest(stored);
    } catch {
      // Local score is optional.
    }
  }, []);

  useEffect(() => {
    return () => {
      if (shareTimer.current) window.clearTimeout(shareTimer.current);
    };
  }, []);

  const start = () => {
    setStage("playing");
    setRoundIndex(0);
    setPicked(null);
    setScore(0);
    setShareStatus("");
    vibrate(8);
  };

  const pick = (line: number) => {
    if (answered) return;
    setPicked(line);
    if (line === round.bugLine) {
      setScore((current) => current + 1);
      vibrate(12);
    } else {
      vibrate([18, 38, 18]);
    }
  };

  const next = () => {
    if (roundIndex + 1 >= bugHuntRounds.length) {
      const nextBest = Math.max(best, score);
      setBest(nextBest);
      try {
        window.localStorage.setItem(BEST_KEY, String(nextBest));
      } catch {
        // Ignore storage limits.
      }
      setStage("done");
      return;
    }
    setRoundIndex((current) => current + 1);
    setPicked(null);
  };

  const share = async () => {
    const text = shareText(score, bugHuntRounds.length, best);
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "Bug Hunt", text, url: "https://furqankhan.dev" });
        return;
      } catch {
        // Fall back to clipboard.
      }
    }
    const copied = await copyText(text);
    setShareStatus(copied ? "Copied" : "Copy unavailable");
    if (shareTimer.current) window.clearTimeout(shareTimer.current);
    shareTimer.current = window.setTimeout(() => setShareStatus(""), 2200);
  };

  return (
    <div className={`bug-hunt ${compact ? "is-compact" : ""}`}>
      <header className="bug-hunt__head">
        <span className="bug-hunt__brand">
          <i aria-hidden="true" />
          Bug Hunt
        </span>
        <span className="bug-hunt__best">BEST {best}/{bugHuntRounds.length}</span>
      </header>

      {stage === "intro" && (
        <div className="bug-hunt__intro">
          <span className="bug-hunt__kicker">Arcade · debugging</span>
          <h2>
            Find the bug.
            <br />
            Ship the fix.
          </h2>
          <p>
            Seven snippets pulled from the kinds of problems this portfolio
            actually deals with: React closures, database races, auth, CORS,
            and the classic off-by-one.
          </p>
          <div className="bug-hunt__facts">
            <span>7 rounds</span>
            <span>No timer</span>
            <span>Local score</span>
          </div>
          <button type="button" className="bug-hunt__primary" onClick={start}>
            <SystemIcon name="play" size={13} />
            Start run
          </button>
        </div>
      )}

      {stage === "playing" && (
        <div className="bug-hunt__play">
          <div className="bug-hunt__progress">
            <span>
              Round {roundIndex + 1} / {bugHuntRounds.length}
            </span>
            <span>
              Score {score}/{bugHuntRounds.length}
            </span>
          </div>
          <div className="bug-hunt__progressbar" aria-hidden="true">
            <span
              style={{
                width: `${((roundIndex + (answered ? 1 : 0)) / bugHuntRounds.length) * 100}%`,
              }}
            />
          </div>
          <div className="bug-hunt__prompt">
            <span className="bug-hunt__language">{round.language}</span>
            <h3>{round.title}</h3>
            <p>{round.context}</p>
          </div>
          <div className="bug-hunt__code" role="group" aria-label="Code snippet">
            {round.code.map((line, index) => {
              const isBug = index === round.bugLine;
              const isPicked = picked === index;
              const stateClass = answered
                ? isBug
                  ? "is-bug"
                  : isPicked
                    ? "is-wrong"
                    : ""
                : "";
              return (
                <button
                  key={`${round.id}-${index}`}
                  type="button"
                  className={`bug-hunt__line ${stateClass} ${
                    isPicked ? "is-picked" : ""
                  }`}
                  onClick={() => pick(index)}
                  disabled={answered}
                  aria-label={`Line ${index + 1}: ${line.trim() || "blank line"}`}
                >
                  <span className="bug-hunt__ln" aria-hidden="true">
                    {index + 1}
                  </span>
                  <code>{line || " "}</code>
                  {answered && isBug && (
                    <span className="bug-hunt__mark is-correct">
                      <SystemIcon name="check" size={10} />
                    </span>
                  )}
                  {answered && isPicked && !isBug && (
                    <span className="bug-hunt__mark is-incorrect">
                      <SystemIcon name="close" size={10} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className={`bug-hunt__feedback ${
                correct ? "is-good" : "is-bad"
              }`}
              role="status"
              aria-live="polite"
            >
              <div className="bug-hunt__feedback-head">
                <span>{correct ? "Caught it." : "Not quite."}</span>
                <span>
                  {correct
                    ? "One bug down."
                    : `The bug is on line ${round.bugLine + 1}.`}
                </span>
              </div>
              <p>{round.explanation}</p>
              <pre>{round.fix}</pre>
              <button type="button" className="bug-hunt__primary" onClick={next}>
                {roundIndex + 1 >= bugHuntRounds.length
                  ? "See results"
                  : "Next bug"}
                <SystemIcon name="arrow-right" size={12} />
              </button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className="bug-hunt__result">
          <span className="bug-hunt__kicker">Run complete</span>
          <div className="bug-hunt__score">
            {score}
            <span>/{bugHuntRounds.length}</span>
          </div>
          <h2>{gradeFor(score, bugHuntRounds.length)}</h2>
          <p>
            {score === bugHuntRounds.length
              ? "Every bug caught. The compiler fears you."
              : "A good debugger leaves a trail. The explanations above are the trail for this run."}
          </p>
          <div className="bug-hunt__actions">
            <button type="button" className="bug-hunt__primary" onClick={start}>
              <SystemIcon name="refresh" size={12} />
              Play again
            </button>
            <button type="button" className="bug-hunt__secondary" onClick={() => void share()}>
              <SystemIcon name="share" size={12} />
              Share score
            </button>
          </div>
          <span className="bug-hunt__share-status" aria-live="polite">
            {shareStatus}
          </span>
        </div>
      )}
    </div>
  );
}
