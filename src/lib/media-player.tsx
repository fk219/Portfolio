"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { musicTracks, type MusicTrack } from "@/data/music";

interface MediaPlayerValue {
  tracks: MusicTrack[];
  currentTrack: MusicTrack;
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playTrack: (index: number) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

const MediaPlayerContext = createContext<MediaPlayerValue | null>(null);

export function formatTrackTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function MediaPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(musicTracks[0].duration);
  const [volume, setVolumeState] = useState(0.7);
  const currentTrack = musicTracks[currentIndex] ?? musicTracks[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = musicTracks[0].src;
    audio.preload = "metadata";
    return () => {
      audio.pause();
    };
  }, []);

  const loadTrack = useCallback((index: number) => {
    const audio = audioRef.current;
    const track = musicTracks[index];
    setCurrentIndex(index);
    setCurrentTime(0);
    setDuration(track.duration);
    if (audio) {
      audio.src = track.src;
      audio.currentTime = 0;
      audio.load();
    }
  }, []);

  const playTrack = useCallback(
    (index: number) => {
      const audio = audioRef.current;
      loadTrack(index);
      setIsPlaying(true);
      if (audio) {
        audio.play().catch(() => setIsPlaying(false));
      }
    },
    [loadTrack],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    if (!audio.src) {
      audio.src = currentTrack.src;
    }
    audio.play().then(
      () => setIsPlaying(true),
      () => setIsPlaying(false),
    );
  }, [currentTrack.src, isPlaying]);

  const next = useCallback(() => {
    const nextIndex = (currentIndex + 1) % musicTracks.length;
    if (isPlaying) {
      playTrack(nextIndex);
    } else {
      loadTrack(nextIndex);
    }
  }, [currentIndex, isPlaying, loadTrack, playTrack]);

  const previous = useCallback(() => {
    const previousIndex =
      (currentIndex - 1 + musicTracks.length) % musicTracks.length;
    if (isPlaying) {
      playTrack(previousIndex);
    } else {
      loadTrack(previousIndex);
    }
  }, [currentIndex, isPlaying, loadTrack, playTrack]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const safeTime = Number.isFinite(time) ? Math.max(0, time) : 0;
    audio.currentTime = safeTime;
    setCurrentTime(safeTime);
  }, []);

  const setVolume = useCallback((value: number) => {
    const nextVolume = Math.min(1, Math.max(0, value));
    setVolumeState(nextVolume);
    if (audioRef.current) audioRef.current.volume = nextVolume;
  }, []);

  const value = useMemo<MediaPlayerValue>(
    () => ({
      tracks: musicTracks,
      currentTrack,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      playTrack,
      toggle,
      next,
      previous,
      seek,
      setVolume,
    }),
    [
      currentIndex,
      currentTime,
      currentTrack,
      duration,
      isPlaying,
      next,
      playTrack,
      previous,
      seek,
      setVolume,
      toggle,
      volume,
    ],
  );

  return (
    <MediaPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) => {
          const loaded = event.currentTarget.duration;
          if (Number.isFinite(loaded)) setDuration(loaded);
        }}
        onEnded={() => {
          const nextIndex = (currentIndex + 1) % musicTracks.length;
          playTrack(nextIndex);
        }}
        onError={() => setIsPlaying(false)}
        className="media-player-audio"
        aria-hidden="true"
      />
    </MediaPlayerContext.Provider>
  );
}

export function useMediaPlayer() {
  const value = useContext(MediaPlayerContext);
  if (!value) {
    throw new Error("useMediaPlayer must be used inside MediaPlayerProvider");
  }
  return value;
}
