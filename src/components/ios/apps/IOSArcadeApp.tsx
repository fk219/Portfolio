"use client";

import { useState } from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { BugHunt } from "@/components/arcade/BugHunt";
import { SnakeGame } from "@/components/arcade/SnakeGame";

type ArcadeScreen = "menu" | "snake" | "bug";

export function IOSArcadeApp() {
  const [screen, setScreen] = useState<ArcadeScreen>("menu");

  return (
    <div className={`ios-app-view ios-arcade ${screen !== "menu" ? "is-playing" : ""}`}>
      <div className="ios-app-view__scroll ios-arcade__scroll">
        <header className="ios-arcade__header">
          <span className="ios-arcade__mark">
            <span />
            <span />
            <span />
          </span>
          <span className="ios-arcade__title">
            <span className="ios-eyebrow">PortfolioOS</span>
            <h1>Arcade</h1>
          </span>
          <span className="ios-arcade__status">
            <i aria-hidden="true" />
            local
          </span>
        </header>

        {screen === "menu" && (
          <div className="ios-arcade__menu">
            <section className="ios-arcade__hero">
              <span className="ios-arcade__kicker">Two games, one pocket</span>
              <h2>
                Play the work.
                <br />
                Debug the room.
              </h2>
              <p>
                Small, original games built into the portfolio. No accounts, no
                ads, no network required.
              </p>
              <div className="ios-arcade__signals">
                <span><i /> local best</span>
                <span><i /> haptics</span>
                <span><i /> keyboard + touch</span>
              </div>
            </section>

            <div className="ios-arcade__games">
              <button
                type="button"
                className="ios-arcade__game is-snake"
                onClick={() => setScreen("snake")}
              >
                <span className="ios-arcade__game-art" aria-hidden="true">
                  <span className="ios-arcade__snake-path">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="ios-arcade__food" />
                </span>
                <span className="ios-arcade__game-copy">
                  <span className="ios-arcade__kicker">01 / Snake</span>
                  <strong>Steer the glow.</strong>
                  <small>Swipe the board, eat, grow, and stay off the wall.</small>
                </span>
                <span className="ios-arcade__game-cta">
                  Play
                  <SystemIcon name="arrow-right" size={11} />
                </span>
              </button>

              <button
                type="button"
                className="ios-arcade__game is-bug"
                onClick={() => setScreen("bug")}
              >
                <span className="ios-arcade__game-art" aria-hidden="true">
                  <span className="ios-arcade__code-mark">&gt;_</span>
                  <span className="ios-arcade__bug-dot" />
                </span>
                <span className="ios-arcade__game-copy">
                  <span className="ios-arcade__kicker">02 / Bug Hunt</span>
                  <strong>Find the bug.</strong>
                  <small>Seven code snippets. One shot at each. Ship the fix.</small>
                </span>
                <span className="ios-arcade__game-cta">
                  Play
                  <SystemIcon name="arrow-right" size={11} />
                </span>
              </button>
            </div>

            <p className="ios-arcade__note">
              Built from the same problems as the projects. Scores stay in this
              browser.
            </p>
          </div>
        )}

        {screen !== "menu" && (
          <div className="ios-arcade__play">
            <button
              type="button"
              className="ios-arcade__back"
              onClick={() => setScreen("menu")}
            >
              <SystemIcon name="chevron-left" size={13} />
              Arcade
            </button>
            <div className="ios-arcade__play-head">
              <span className="ios-arcade__kicker">
                {screen === "snake" ? "Arcade / Snake" : "Arcade / Bug Hunt"}
              </span>
              <h2>{screen === "snake" ? "Steer the glow." : "Find the bug."}</h2>
            </div>
            {screen === "snake" ? <SnakeGame compact /> : <BugHunt compact />}
          </div>
        )}
      </div>
    </div>
  );
}
