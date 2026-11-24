"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";

const COLS = 20;
const ROWS = 20;
const BEST_KEY = "fk-snake-best";

interface Point {
  x: number;
  y: number;
}

type SnakeStatus = "idle" | "playing" | "paused" | "over";

interface SnakeState {
  snake: Point[];
  food: Point;
  dir: Point;
  score: number;
  status: SnakeStatus;
}

const START_SNAKE: Point[] = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];

function randomFood(snake: Point[]): Point {
  const free: Point[] = [];
  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLS; x += 1) {
      if (!snake.some((part) => part.x === x && part.y === y)) {
        free.push({ x, y });
      }
    }
  }
  if (free.length === 0) return { ...snake[0] };
  return free[Math.floor(Math.random() * free.length)];
}

function initialGame(): SnakeState {
  const snake = START_SNAKE.map((part) => ({ ...part }));
  return {
    snake,
    food: randomFood(snake),
    dir: { x: 1, y: 0 },
    score: 0,
    status: "idle",
  };
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator.vibrate === "function") navigator.vibrate(pattern);
}

function draw(canvas: HTMLCanvasElement, game: SnakeState) {
  const context = canvas.getContext("2d");
  if (!context) return;
  const size = 420;
  const cell = size / COLS;
  context.clearRect(0, 0, size, size);

  context.fillStyle = "#07100b";
  context.fillRect(0, 0, size, size);
  context.strokeStyle = "rgba(184, 242, 92, 0.07)";
  context.lineWidth = 1;
  for (let index = 1; index < COLS; index += 1) {
    context.beginPath();
    context.moveTo(index * cell, 0);
    context.lineTo(index * cell, size);
    context.stroke();
    context.beginPath();
    context.moveTo(0, index * cell);
    context.lineTo(size, index * cell);
    context.stroke();
  }

  const foodCenter = {
    x: game.food.x * cell + cell / 2,
    y: game.food.y * cell + cell / 2,
  };
  context.shadowBlur = cell * 1.2;
  context.shadowColor = "rgba(255, 125, 155, 0.75)";
  context.fillStyle = "#ff8fa8";
  context.beginPath();
  context.arc(foodCenter.x, foodCenter.y, cell * 0.34, 0, Math.PI * 2);
  context.fill();
  context.shadowBlur = 0;

  game.snake.forEach((part, index) => {
    const inset = cell * 0.12;
    const radius = cell * 0.24;
    const gradient = context.createLinearGradient(
      part.x * cell,
      part.y * cell,
      (part.x + 1) * cell,
      (part.y + 1) * cell,
    );
    if (index === 0) {
      gradient.addColorStop(0, "#e6ffb5");
      gradient.addColorStop(1, "#b8f25c");
    } else {
      gradient.addColorStop(0, "rgba(184, 242, 92, 0.9)");
      gradient.addColorStop(1, "rgba(94, 177, 81, 0.82)");
    }
    context.fillStyle = gradient;
    context.beginPath();
    const x = part.x * cell + inset;
    const y = part.y * cell + inset;
    const size = cell - inset * 2;
    if (typeof context.roundRect === "function") {
      context.roundRect(x, y, size, size, radius);
    } else {
      context.rect(x, y, size, size);
    }
    context.fill();

    if (index === 0) {
      context.fillStyle = "#0b1609";
      const eye = cell * 0.12;
      const directionX = game.dir.x;
      const directionY = game.dir.y;
      const centerX = part.x * cell + cell / 2;
      const centerY = part.y * cell + cell / 2;
      const offsetX = directionX * cell * 0.18;
      const offsetY = directionY * cell * 0.18;
      context.beginPath();
      context.arc(
        centerX + offsetX - directionY * eye,
        centerY + offsetY - directionX * eye,
        cell * 0.07,
        0,
        Math.PI * 2,
      );
      context.arc(
        centerX + offsetX + directionY * eye,
        centerY + offsetY + directionX * eye,
        cell * 0.07,
        0,
        Math.PI * 2,
      );
      context.fill();
    }
  });
}

export function SnakeGame({ compact = false }: { compact?: boolean }) {
  const [game, setGame] = useState<SnakeState>(initialGame);
  const [best, setBest] = useState(0);
  const gameRef = useRef(game);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const swipeStart = useRef<Point | null>(null);
  const bestRef = useRef(0);

  const commit = useCallback((next: SnakeState) => {
    gameRef.current = next;
    setGame(next);
  }, []);

  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(BEST_KEY));
      if (Number.isFinite(stored) && stored > 0) {
        setBest(stored);
        bestRef.current = stored;
      }
    } catch {
      // Local best is optional.
    }
  }, []);

  useEffect(() => {
    if (game.status !== "over") return;
    if (game.score <= bestRef.current) return;
    bestRef.current = game.score;
    setBest(game.score);
    try {
      window.localStorage.setItem(BEST_KEY, String(game.score));
    } catch {
      // Ignore storage limits.
    }
  }, [game.score, game.status]);

  const tick = useCallback(() => {
    const current = gameRef.current;
    if (current.status !== "playing") return;
    const head = {
      x: current.snake[0].x + current.dir.x,
      y: current.snake[0].y + current.dir.y,
    };
    const hitWall =
      head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
    const hitBody = current.snake.some(
      (part, index) =>
        index < current.snake.length - 1 &&
        part.x === head.x &&
        part.y === head.y,
    );
    if (hitWall || hitBody) {
      commit({ ...current, status: "over" });
      vibrate([30, 50, 60]);
      return;
    }
    const ate = head.x === current.food.x && head.y === current.food.y;
    const snake = [head, ...current.snake];
    if (!ate) snake.pop();
    const score = current.score + (ate ? 1 : 0);
    commit({
      ...current,
      snake,
      score,
      food: ate ? randomFood(snake) : current.food,
    });
    if (ate) vibrate(10);
  }, [commit]);

  useEffect(() => {
    if (game.status !== "playing") return;
    const speed = Math.max(72, 140 - Math.floor(game.score / 3) * 8);
    const timer = window.setInterval(tick, speed);
    return () => window.clearInterval(timer);
  }, [game.score, game.status, tick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 420;
    if (canvas.width !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    }
    const context = canvas.getContext("2d");
    if (context) {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    draw(canvas, game);
  }, [best, game]);

  const start = () => {
    commit({
      ...initialGame(),
      status: "playing",
    });
    vibrate(8);
  };

  const pause = () => {
    const current = gameRef.current;
    if (current.status === "playing") commit({ ...current, status: "paused" });
    else if (current.status === "paused") commit({ ...current, status: "playing" });
  };

  const turn = useCallback(
    (x: number, y: number) => {
      const current = gameRef.current;
      if (current.status !== "playing") return;
      if (x === -current.dir.x && y === -current.dir.y) return;
      if (x === current.dir.x && y === current.dir.y) return;
      commit({ ...current, dir: { x, y } });
    },
    [commit],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
        event.preventDefault();
        if (key === "arrowup" || key === "w") turn(0, -1);
        else if (key === "arrowdown" || key === "s") turn(0, 1);
        else if (key === "arrowleft" || key === "a") turn(-1, 0);
        else turn(1, 0);
      } else if (key === " ") {
        const current = gameRef.current;
        if (current.status === "idle" || current.status === "over") start();
        else pause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pause, start, turn]);

  const swipeDirection = (dx: number, dy: number) => {
    if (Math.abs(dx) < 16 && Math.abs(dy) < 16) return;
    if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 1 : -1, 0);
    else turn(0, dy > 0 ? 1 : -1);
  };

  const onBoardPointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const onBoardPointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const startPoint = swipeStart.current;
    swipeStart.current = null;
    if (!startPoint) return;
    swipeDirection(event.clientX - startPoint.x, event.clientY - startPoint.y);
  };

  return (
    <div className={`snake-game ${compact ? "is-compact" : ""}`}>
      <header className="snake-game__head">
        <span className="snake-game__brand">
          <i aria-hidden="true" />
          Snake
        </span>
        <span className="snake-game__scores">
          <span>
            Score <strong>{game.score}</strong>
          </span>
          <span>
            Best <strong>{Math.max(best, game.score)}</strong>
          </span>
        </span>
      </header>

      <div className="snake-game__body">
        <div className="snake-game__board-wrap">
          <canvas
            ref={canvasRef}
            className="snake-game__board"
            width={420}
            height={420}
            role="img"
            aria-label={`Snake board. Score ${game.score}. Best ${Math.max(best, game.score)}.`}
            onPointerDown={onBoardPointerDown}
            onPointerUp={onBoardPointerUp}
            onPointerCancel={() => { swipeStart.current = null; }}
          />
          {game.status === "idle" && (
            <div className="snake-game__overlay">
              <span className="snake-game__kicker">Arcade / Snake</span>
              <strong>Steer the glow.</strong>
              <p>Swipe the board or use the arrows. Eat, grow, and do not hit the wall.</p>
              <button type="button" className="snake-game__primary" onClick={start}>
                <SystemIcon name="play" size={12} />
                Start game
              </button>
            </div>
          )}
          {game.status === "paused" && (
            <div className="snake-game__overlay">
              <span className="snake-game__kicker">Paused</span>
              <strong>Take a breath.</strong>
              <p>The snake will wait. The wall will not.</p>
              <button type="button" className="snake-game__primary" onClick={pause}>
                <SystemIcon name="play" size={12} />
                Resume
              </button>
            </div>
          )}
          {game.status === "over" && (
            <div className="snake-game__overlay">
              <span className="snake-game__kicker">Run ended</span>
              <strong>{game.score === 0 ? "A short run." : `${game.score} point${game.score === 1 ? "" : "s"}.`}</strong>
              <p>Best run: {Math.max(best, game.score)}. The wall is undefeated.</p>
              <button type="button" className="snake-game__primary" onClick={start}>
                <SystemIcon name="refresh" size={12} />
                Play again
              </button>
            </div>
          )}
        </div>

        <div className="snake-game__side">
          <div className="snake-game__dpad" role="group" aria-label="Direction controls">
            <button type="button" className="is-up" onClick={() => turn(0, -1)} aria-label="Move up">
              <SystemIcon name="chevron-up" size={18} />
            </button>
            <button type="button" className="is-left" onClick={() => turn(-1, 0)} aria-label="Move left">
              <SystemIcon name="chevron-left" size={18} />
            </button>
            <button type="button" className="is-down" onClick={() => turn(0, 1)} aria-label="Move down">
              <SystemIcon name="chevron-down" size={18} />
            </button>
            <button type="button" className="is-right" onClick={() => turn(1, 0)} aria-label="Move right">
              <SystemIcon name="chevron-right" size={18} />
            </button>
          </div>
          <button
            type="button"
            className="snake-game__pause"
            onClick={game.status === "idle" || game.status === "over" ? start : pause}
          >
            <SystemIcon
              name={game.status === "playing" ? "pause" : game.status === "paused" ? "play" : "play"}
              size={12}
            />
            {game.status === "playing" ? "Pause" : game.status === "paused" ? "Resume" : "Start"}
          </button>
          <p className="snake-game__help">
            Swipe · arrows · WASD
            <br />
            wall = game over
          </p>
        </div>
      </div>
    </div>
  );
}
