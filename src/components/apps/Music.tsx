"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { SystemIcon } from "@/components/icons/SystemIcon";

type SceneId = "quiet" | "rain" | "night";

interface Scene {
  id: SceneId;
  title: string;
  description: string;
  color: string;
  glow: string;
}

interface AudioEngine {
  context: AudioContext;
  master: GainNode;
  sources: AudioScheduledSourceNode[];
  stop: () => void;
}

const scenes: Scene[] = [
  {
    id: "quiet",
    title: "Quiet System",
    description:
      "A slow, warm chord bed for reading, thinking, and staying with one task.",
    color: "#f1caa0",
    glow: "#b56044",
  },
  {
    id: "rain",
    title: "Rain on Glass",
    description:
      "Soft filtered noise, shaped into the sound of a window on a wet evening.",
    color: "#bfd4df",
    glow: "#476b82",
  },
  {
    id: "night",
    title: "Night Drift",
    description:
      "Low tones and a little air. A quiet room with the lights almost off.",
    color: "#a7b1d5",
    glow: "#3c466e",
  },
];

const visualizerHeights = [
  24, 58, 34, 82, 44, 66, 28, 90, 52, 38, 72, 45, 86, 30, 60, 40, 76, 50,
  32, 64, 46, 88, 36, 54,
];

function createNoiseBuffer(context: AudioContext) {
  const buffer = context.createBuffer(
    1,
    context.sampleRate * 2,
    context.sampleRate,
  );
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let index = 0; index < data.length; index += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[index] = last * 3.5;
  }
  return buffer;
}

function buildScene(
  context: AudioContext,
  master: GainNode,
  sceneId: SceneId,
) {
  const sources: AudioScheduledSourceNode[] = [];

  if (sceneId === "quiet") {
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 780;
    filter.Q.value = 0.6;
    filter.connect(master);

    const table = [
      { frequency: 130.81, gain: 0.045, type: "sine" as OscillatorType },
      { frequency: 196, gain: 0.032, type: "sine" as OscillatorType },
      { frequency: 261.63, gain: 0.022, type: "triangle" as OscillatorType },
      { frequency: 329.63, gain: 0.014, type: "sine" as OscillatorType },
    ];

    table.forEach((note, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = note.type;
      oscillator.frequency.value = note.frequency;
      oscillator.detune.value = index % 2 === 0 ? -4 : 4;
      gain.gain.value = note.gain;
      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start();
      sources.push(oscillator);
    });

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.frequency.value = 0.055;
    lfoGain.gain.value = 210;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
    sources.push(lfo);

    const air = context.createOscillator();
    const airGain = context.createGain();
    air.type = "sine";
    air.frequency.value = 523.25;
    airGain.gain.value = 0.006;
    air.connect(airGain);
    airGain.connect(master);
    air.start();
    sources.push(air);
  }

  if (sceneId === "rain") {
    const noise = context.createBufferSource();
    noise.buffer = createNoiseBuffer(context);
    noise.loop = true;

    const highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 600;

    const lowpass = context.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 4100;
    lowpass.Q.value = 0.4;

    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.12;

    noise.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    sources.push(noise);

    const pad = context.createOscillator();
    const padGain = context.createGain();
    pad.type = "sine";
    pad.frequency.value = 174.61;
    padGain.gain.value = 0.017;
    pad.connect(padGain);
    padGain.connect(master);
    pad.start();
    sources.push(pad);

    const sweep = context.createOscillator();
    const sweepGain = context.createGain();
    sweep.frequency.value = 0.07;
    sweepGain.gain.value = 680;
    sweep.connect(sweepGain);
    sweepGain.connect(lowpass.frequency);
    sweep.start();
    sources.push(sweep);
  }

  if (sceneId === "night") {
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 320;
    filter.connect(master);

    [55, 82.41, 110].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 2 ? 7 : -3;
      gain.gain.value = 0.05 - index * 0.01;
      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start();
      sources.push(oscillator);
    });

    const noise = context.createBufferSource();
    noise.buffer = createNoiseBuffer(context);
    noise.loop = true;
    const highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 5500;
    const noiseGain = context.createGain();
    noiseGain.gain.value = 0.012;
    noise.connect(highpass);
    highpass.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    sources.push(noise);

    const tremolo = context.createOscillator();
    const tremoloGain = context.createGain();
    tremolo.frequency.value = 0.075;
    tremoloGain.gain.value = 120;
    tremolo.connect(tremoloGain);
    tremoloGain.connect(filter.frequency);
    tremolo.start();
    sources.push(tremolo);
  }

  return sources;
}

export function Music() {
  const [activeSceneId, setActiveSceneId] = useState<SceneId>("quiet");
  const [playingSceneId, setPlayingSceneId] = useState<SceneId | null>(null);
  const [volume, setVolume] = useState(38);
  const [audioError, setAudioError] = useState("");
  const engineRef = useRef<AudioEngine | null>(null);
  const volumeRef = useRef(volume);
  const reduceMotion = usePrefersReducedMotion();
  const activeScene =
    scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0];
  const isPlaying = playingSceneId === activeSceneId;

  useEffect(() => {
    volumeRef.current = volume;
    if (!engineRef.current) return;
    engineRef.current.master.gain.setTargetAtTime(
      Math.pow(volume / 100, 1.8) * 0.7,
      engineRef.current.context.currentTime,
      0.04,
    );
  }, [volume]);

  useEffect(() => {
    return () => {
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, []);

  const stopEngine = () => {
    if (!engineRef.current) return;
    engineRef.current.stop();
    engineRef.current = null;
    setPlayingSceneId(null);
  };

  const startScene = async (sceneId: SceneId) => {
    if (playingSceneId === sceneId) {
      stopEngine();
      return;
    }

    if (engineRef.current) {
      engineRef.current.stop();
      engineRef.current = null;
    }

    try {
      const context = new AudioContext();
      await context.resume();
      const master = context.createGain();
      master.gain.value = Math.pow(volumeRef.current / 100, 1.8) * 0.7;
      master.connect(context.destination);
      const sources = buildScene(context, master, sceneId);

      const stop = () => {
        const now = context.currentTime;
        master.gain.cancelScheduledValues(now);
        master.gain.setTargetAtTime(0.0001, now, 0.05);
        sources.forEach((source) => {
          try {
            source.stop(now + 0.2);
          } catch {
            // A source may already be stopped.
          }
        });
        window.setTimeout(() => {
          context.close().catch(() => undefined);
        }, 320);
      };

      engineRef.current = { context, master, sources, stop };
      setActiveSceneId(sceneId);
      setPlayingSceneId(sceneId);
      setAudioError("");
    } catch {
      setAudioError(
        "Audio could not start in this browser. Try a browser that supports the Web Audio API.",
      );
      setPlayingSceneId(null);
    }
  };

  const chooseScene = (sceneId: SceneId) => {
    if (playingSceneId === sceneId) {
      stopEngine();
      return;
    }
    void startScene(sceneId);
  };

  const selectScene = (sceneId: SceneId) => {
    setActiveSceneId(sceneId);
    if (playingSceneId) {
      void startScene(sceneId);
    }
  };

  const skip = (direction: 1 | -1) => {
    const index = scenes.findIndex((scene) => scene.id === activeSceneId);
    const next = scenes[(index + direction + scenes.length) % scenes.length];
    setActiveSceneId(next.id);
    if (playingSceneId) void startScene(next.id);
  };

  const handlePlayPause = () => {
    if (playingSceneId === activeSceneId) {
      stopEngine();
      return;
    }
    void startScene(activeSceneId);
  };

  return (
    <div
      className="music"
      style={
        {
          "--music-accent": activeScene.color,
          "--music-glow": activeScene.glow,
        } as CSSProperties
      }
    >
      <div className="music__topbar">
        <span>Listen Now</span>
        <span className="music__generated-label">
          <span aria-hidden="true" />
          Generated in this browser
        </span>
      </div>

      <div className="music__now">
        <div
          className={`music__art ${isPlaying ? "is-playing" : ""}`}
          aria-hidden="true"
        >
          <div className="music__art-orb music__art-orb--one" />
          <div className="music__art-orb music__art-orb--two" />
          <div className="music__art-lines">
            {visualizerHeights.map((height, index) => (
              <span
                key={index}
                style={
                  {
                    "--bar-height": `${height}%`,
                    "--bar-delay": `${index * 0.07}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <span className="music__art-mark">FK</span>
        </div>

        <div className="music__meta">
          <span className="music__eyebrow">Generative ambient</span>
          <h2>{activeScene.title}</h2>
          <p>{activeScene.description}</p>

          <div className="music__control-row">
            <div className="music__transport">
              <button
                type="button"
                className="music__skip"
                aria-label="Previous soundscape"
                onClick={() => skip(-1)}
              >
                <SystemIcon name="skip-back" size={16} />
              </button>
              <button
                type="button"
                className="music__play"
                onClick={handlePlayPause}
                aria-label={
                  isPlaying
                    ? `Pause ${activeScene.title}`
                    : `Play ${activeScene.title}`
                }
              >
                <SystemIcon
                  name={isPlaying ? "pause" : "play"}
                  size={20}
                />
              </button>
              <button
                type="button"
                className="music__skip"
                aria-label="Next soundscape"
                onClick={() => skip(1)}
              >
                <SystemIcon name="skip-forward" size={16} />
              </button>
            </div>

            <label className="music__volume">
              <SystemIcon
                name={volume === 0 ? "volume-off" : "volume"}
                size={14}
              />
              <span className="sr-only">Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                style={
                  {
                    "--range-progress": `${volume}%`,
                  } as CSSProperties
                }
              />
            </label>
          </div>

          <p className="music__status" aria-live="polite">
            {audioError ? (
              <>
                <SystemIcon name="alert" size={12} />
                {audioError}
              </>
            ) : isPlaying ? (
              "Playing. The sound is synthesized locally and never leaves your browser."
            ) : (
              "Press play to begin. Headphones recommended."
            )}
          </p>
        </div>
      </div>

      <div className="music__track-list" aria-label="Soundscapes">
        {scenes.map((scene, index) => {
          const isScenePlaying = playingSceneId === scene.id;
          return (
            <div
              key={scene.id}
              className={`music__track ${
                scene.id === activeSceneId ? "is-active" : ""
              }`}
            >
              <button
                type="button"
                className="music__track-select"
                onClick={() => selectScene(scene.id)}
                aria-pressed={scene.id === activeSceneId}
              >
                <span className="music__track-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="music__track-copy">
                  <strong>{scene.title}</strong>
                  <span>{scene.description}</span>
                </span>
                <span className="music__track-live">Live</span>
              </button>
              <button
                type="button"
                className="music__track-play"
                onClick={() => chooseScene(scene.id)}
                aria-label={
                  isScenePlaying
                    ? `Pause ${scene.title}`
                    : `Play ${scene.title}`
                }
              >
                {isScenePlaying ? (
                  <span className="music__mini-bars" aria-hidden="true">
                    {[0, 1, 2, 3].map((bar) => (
                      <span key={bar} />
                    ))}
                  </span>
                ) : (
                  <SystemIcon name="play" size={12} />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <p className="music__footnote">
        No audio files, accounts, or recommendations. Three local soundscapes
        made with the Web Audio API.
        {reduceMotion ? " Visual motion is reduced by your system setting." : ""}
      </p>
    </div>
  );
}
