export interface MusicTrack {
  id: string;
  title: string;
  album: string;
  artist: string;
  description: string;
  src: string;
  duration: number;
  cover: {
    from: string;
    to: string;
    ink: string;
  };
}

export const musicTracks: MusicTrack[] = [
  {
    id: "hunza-dawn",
    title: "Hunza Dawn",
    album: "Sessions for PortfolioOS",
    artist: "FKodeLabs",
    description:
      "Warm chords, a slow arpeggio, and mountain air. Built for the first hour of work.",
    src: "/music/hunza-dawn.mp3",
    duration: 32,
    cover: {
      from: "#f6c991",
      to: "#a5533f",
      ink: "#2d1b16",
    },
  },
  {
    id: "rain-on-glass",
    title: "Rain on Glass",
    album: "Sessions for PortfolioOS",
    artist: "FKodeLabs",
    description:
      "Filtered rain, soft keys, and a window seat. A low-volume companion for deep work.",
    src: "/music/rain-on-glass.mp3",
    duration: 32,
    cover: {
      from: "#c3d8e4",
      to: "#385b70",
      ink: "#10242e",
    },
  },
  {
    id: "night-drift",
    title: "Night Drift",
    album: "Sessions for PortfolioOS",
    artist: "FKodeLabs",
    description:
      "Low tones and a little air. For the last pass before the lights go out.",
    src: "/music/night-drift.mp3",
    duration: 32,
    cover: {
      from: "#a7b5de",
      to: "#303a61",
      ink: "#10162e",
    },
  },
];
