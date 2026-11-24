"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string | null;
  location: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  pushed_at: string;
  fork: boolean;
}

const CACHE_KEY = "fk-github-profile-v1";
const CACHE_TTL = 10 * 60 * 1000;

function readCache(): { user: GithubUser; repos: GithubRepo[] } | null {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      savedAt: number;
      user: GithubUser;
      repos: GithubRepo[];
    };
    if (Date.now() - parsed.savedAt > CACHE_TTL) return null;
    return { user: parsed.user, repos: parsed.repos };
  } catch {
    return null;
  }
}

export function useGithubProfile() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    const cached = readCache();
    if (cached) {
      setUser(cached.user);
      setRepos(cached.repos);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch("https://api.github.com/users/fk219", {
          headers: { Accept: "application/vnd.github+json" },
        }),
        fetch(
          "https://api.github.com/users/fk219/repos?per_page=100&sort=pushed",
          { headers: { Accept: "application/vnd.github+json" } },
        ),
      ]);
      if (!userResponse.ok) throw new Error(`GitHub API ${userResponse.status}`);
      if (!reposResponse.ok) throw new Error(`GitHub API ${reposResponse.status}`);
      const nextUser = (await userResponse.json()) as GithubUser;
      const nextRepos = (await reposResponse.json()) as GithubRepo[];
      if (!mounted.current) return;
      setUser(nextUser);
      setRepos(nextRepos);
      try {
        window.sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            savedAt: Date.now(),
            user: nextUser,
            repos: nextRepos,
          }),
        );
      } catch {
        // Cache is optional.
      }
    } catch (caught) {
      if (!mounted.current) return;
      setError(
        caught instanceof Error ? caught.message : "Could not load GitHub",
      );
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  return { user, repos, loading, error, refresh: load };
}
