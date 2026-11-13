"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

import { THEME_STORAGE_KEY } from "./theme-script";

const THEME_EVENT = "portfolio-themechange";

export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => "dark");
}

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // storage unavailable: theme still applies for this visit
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}

/**
 * Toggle the theme with a circular reveal expanding from (x, y),
 * using the View Transitions API where available.
 */
export function toggleTheme(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduced) {
    applyTheme(next);
    return;
  }

  const transition = document.startViewTransition(() => applyTheme(next));
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: next === "dark" ? 1400 : 900,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {});
}
