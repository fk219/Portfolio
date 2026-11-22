"use client";

import { useEffect, useState } from "react";
import type { SystemIconName } from "@/components/icons/SystemIcon";

export interface WeatherSnapshot {
  temperature: number;
  condition: string;
  icon: "sun" | "cloud" | "rain" | "snow" | "storm" | "fog";
  city: string;
}

export const WEATHER_ICON_NAMES: Record<WeatherSnapshot["icon"], SystemIconName> =
  {
    sun: "sun",
    cloud: "cloud",
    fog: "cloud",
    rain: "cloud-rain",
    snow: "cloud-rain",
    storm: "cloud-rain",
  };

const CACHE_KEY = "fk-weather-dubai";
const CACHE_TTL = 15 * 60 * 1000;
const DUBAI = { latitude: 25.2048, longitude: 55.2708, city: "Dubai" };

const WEATHER_CODES: Array<{
  test: (code: number) => boolean;
  condition: string;
  icon: WeatherSnapshot["icon"];
}> = [
  { test: (code) => code === 0, condition: "Clear", icon: "sun" },
  { test: (code) => code <= 3, condition: "Partly cloudy", icon: "cloud" },
  { test: (code) => code <= 48, condition: "Fog", icon: "fog" },
  { test: (code) => code <= 57, condition: "Drizzle", icon: "rain" },
  { test: (code) => code <= 67, condition: "Rain", icon: "rain" },
  { test: (code) => code <= 77, condition: "Snow", icon: "snow" },
  { test: (code) => code <= 82, condition: "Showers", icon: "rain" },
  { test: (code) => code <= 86, condition: "Snow showers", icon: "snow" },
  { test: (code) => code >= 95, condition: "Thunderstorm", icon: "storm" },
];

function describeCode(code: number) {
  return (
    WEATHER_CODES.find((entry) => entry.test(code)) ?? {
      condition: "Clear",
      icon: "sun" as const,
    }
  );
}

function readCache(): WeatherSnapshot | null {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      savedAt: number;
      weather: WeatherSnapshot;
    };
    if (Date.now() - parsed.savedAt > CACHE_TTL) return null;
    return parsed.weather;
  } catch {
    return null;
  }
}

function writeCache(weather: WeatherSnapshot) {
  try {
    window.sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), weather }),
    );
  } catch {
    // Session storage is optional; live data still renders without it.
  }
}

export function useDubaiWeather() {
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setWeather(cached);
      return;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      latitude: String(DUBAI.latitude),
      longitude: String(DUBAI.longitude),
      current: "temperature_2m,weather_code",
      timezone: "Asia/Dubai",
    });

    fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        const current = data?.current;
        if (
          !current ||
          typeof current.temperature_2m !== "number" ||
          typeof current.weather_code !== "number"
        ) {
          return;
        }
        const described = describeCode(current.weather_code);
        const next: WeatherSnapshot = {
          temperature: Math.round(current.temperature_2m),
          condition: described.condition,
          icon: described.icon,
          city: DUBAI.city,
        };
        setWeather(next);
        writeCache(next);
      })
      .catch(() => {
        // The lock screen keeps its date and time when the network is absent.
      });

    return () => controller.abort();
  }, []);

  return weather;
}
