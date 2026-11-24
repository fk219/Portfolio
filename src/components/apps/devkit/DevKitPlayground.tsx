"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { SystemIcon } from "@/components/icons/SystemIcon";
import { projects } from "@/data/projects";
import { PLAYGROUND_SNIPPETS } from "@/lib/devkit";

interface LogEntry {
  level: "log" | "info" | "warn" | "error";
  text: string;
}

type RunState = "ready" | "running" | "done" | "error";

const starter = PLAYGROUND_SNIPPETS[0];

function buildSandbox(projectData: string) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; background: #0b0f0d; }
</style>
</head>
<body>
<script>
const PROJECTS = ${projectData};
const format = (value) => {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  if (typeof value === "function") return "[Function " + (value.name || "anonymous") + "]";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    const json = JSON.stringify(value, null, 2);
    return json === undefined ? String(value) : (json.length > 5000 ? json.slice(0, 5000) + "\\n…" : json);
  } catch (error) {
    return String(value);
  }
};
const send = (type, payload) => parent.postMessage(
  Object.assign({ source: "devkit-playground", type }, payload),
  "*"
);
window.addEventListener("message", async (event) => {
  if (!event.data || event.data.type !== "run") return;
  const logs = [];
  const push = (level) => (...args) => {
    logs.push({ level, text: args.map(format).join(" ") });
  };
  const sandboxConsole = {
    log: push("log"),
    info: push("info"),
    warn: push("warn"),
    error: push("error"),
  };
  try {
    const fn = new Function(
      "console",
      "PROJECTS",
      '"use strict"; return (async () => {\\n' + event.data.code + '\\n})();'
    );
    const value = await fn(sandboxConsole, PROJECTS);
    send("done", { logs, result: value === undefined ? "" : format(value) });
  } catch (error) {
    send("error", {
      logs,
      error: error && error.message ? error.message : String(error),
    });
  }
});
send("ready");
</script>
</body>
</html>`;
}

export function DevKitPlayground() {
  const [code, setCode] = useState<string>(starter.code);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [result, setResult] = useState("");
  const [state, setState] = useState<RunState>("ready");
  const [frameKey, setFrameKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const projectData = useMemo(
    () =>
      JSON.stringify(
        projects.map((project) => ({
          name: project.name,
          category: project.category,
          status: project.status,
          featured: project.featured,
          stack: project.stack,
          tagline: project.tagline,
        })),
      ).replaceAll("<", "\\u003c"),
    [],
  );
  const sandbox = useMemo(() => buildSandbox(projectData), [projectData]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data as
        | {
            source?: string;
            type?: string;
            logs?: LogEntry[];
            result?: string;
            error?: string;
          }
        | null;
      if (!data || data.source !== "devkit-playground") return;
      if (data.type === "done" || data.type === "error") {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        setLogs(data.logs ?? []);
        setResult(data.type === "error" ? data.error ?? "Failed" : data.result ?? "");
        setState(data.type === "error" ? "error" : "done");
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const run = () => {
    if (state === "running") return;
    setLogs([]);
    setResult("");
    setState("running");
    iframeRef.current?.contentWindow?.postMessage({ type: "run", code }, "*");
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setState("error");
      setResult("Execution timed out. The sandbox was reset.");
      setFrameKey((key) => key + 1);
    }, 6000);
  };

  const useSnippet = (snippetCode: string) => {
    setCode(snippetCode);
    setLogs([]);
    setResult("");
    setState("ready");
    window.setTimeout(() => textareaRef.current?.focus(), 20);
  };

  const handleEditorKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      run();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      setCode(`${code.slice(0, start)}  ${code.slice(end)}`);
      window.requestAnimationFrame(() => {
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = start + 2;
      });
    }
  };

  const lineCount = code.split("\n").length;
  const lines = Array.from({ length: lineCount }, (_, index) => index + 1);

  return (
    <div className="devkit-panel devkit-playground">
      <header className="devkit-panel__head">
        <div>
          <span className="devkit-kicker">Sandbox</span>
          <h2>Break it, then fix it.</h2>
          <p>
            A local JavaScript playground. The editor runs inside a sandboxed
            iframe, with the project index injected as <code>PROJECTS</code>.
          </p>
        </div>
        <button
          type="button"
          className={`devkit-run ${state === "running" ? "is-running" : ""}`}
          onClick={run}
          disabled={state === "running"}
        >
          <SystemIcon
            name={state === "running" ? "refresh" : "play"}
            size={13}
          />
          {state === "running" ? "Running" : "Run"}
          <kbd>⌘↵</kbd>
        </button>
      </header>

      <div className="devkit-snippets" aria-label="Starter snippets">
        <span>Load a snippet</span>
        {PLAYGROUND_SNIPPETS.map((snippet) => (
          <button
            key={snippet.id}
            type="button"
            onClick={() => useSnippet(snippet.code)}
            className={code === snippet.code ? "is-active" : ""}
          >
            {snippet.label}
          </button>
        ))}
      </div>

      <div className="devkit-playground__grid">
        <section className="devkit-editor" aria-label="JavaScript editor">
          <div className="devkit-editor__bar">
            <span className="devkit-editor__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="devkit-editor__file">playground.js</span>
            <span className="devkit-editor__meta">{lineCount} lines</span>
          </div>
          <div className="devkit-editor__body">
            <div className="devkit-editor__gutter" ref={gutterRef} aria-hidden="true">
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onKeyDown={handleEditorKeyDown}
              onScroll={(event) => {
                if (gutterRef.current) {
                  gutterRef.current.scrollTop = event.currentTarget.scrollTop;
                }
              }}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="JavaScript code"
            />
          </div>
        </section>

        <section className="devkit-console" aria-label="Console output">
          <div className="devkit-editor__bar">
            <span className="devkit-editor__file">console</span>
            <span
              className={`devkit-console__state is-${state}`}
              role="status"
            >
              {state === "running"
                ? "running"
                : state === "error"
                  ? "error"
                  : state === "done"
                    ? "complete"
                    : "waiting"}
            </span>
            <button
              type="button"
              className="devkit-console__clear"
              onClick={() => {
                setLogs([]);
                setResult("");
                setState("ready");
              }}
            >
              Clear
            </button>
          </div>
          <div className="devkit-console__body" aria-live="polite">
            {logs.length === 0 && !result && state !== "running" && (
              <p className="devkit-console__empty">
                Run the snippet, or write something worse.
              </p>
            )}
            {state === "running" && (
              <p className="devkit-console__empty">
                <span className="devkit-console__spinner" aria-hidden="true" />
                executing in the sandbox…
              </p>
            )}
            {logs.map((log, index) => (
              <div
                key={`${log.level}-${index}`}
                className={`devkit-console__line is-${log.level}`}
              >
                <span className="devkit-console__prefix" aria-hidden="true">
                  {log.level === "error" ? "×" : log.level === "warn" ? "!" : "›"}
                </span>
                <span>{log.text}</span>
              </div>
            ))}
            {result && (
              <div
                className={`devkit-console__result ${
                  state === "error" ? "is-error" : ""
                }`}
              >
                <span>{state === "error" ? "Error" : "Return"}</span>
                <pre>{result}</pre>
              </div>
            )}
          </div>
          <div className="devkit-console__foot">
            <span>
              <SystemIcon name="shield" size={10} />
              sandboxed iframe
            </span>
            <span>nothing leaves this window</span>
          </div>
        </section>
      </div>

      <iframe
        key={frameKey}
        ref={iframeRef}
        className="devkit-sandbox"
        title="DevKit JavaScript sandbox"
        sandbox="allow-scripts"
        srcDoc={sandbox}
      />
    </div>
  );
}
