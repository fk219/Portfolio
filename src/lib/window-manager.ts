import type { OSWindow, WindowBounds } from "./types";

export interface WindowManagerState {
  windows: OSWindow[];
  activeWindowId: string | null;
  topZIndex: number;
}

export type WindowAction =
  | { type: "OPEN_WINDOW"; window: OSWindow }
  | { type: "FOCUS_WINDOW"; id: string }
  | { type: "RESTORE_WINDOW"; id: string }
  | { type: "MINIMIZE_WINDOW"; id: string }
  | { type: "CLOSE_WINDOW"; id: string }
  | { type: "CLOSE_APP"; appId: OSWindow["appId"] }
  | { type: "CLOSE_ALL" }
  | { type: "TOGGLE_MAXIMIZE"; id: string; maximizedBounds: WindowBounds }
  | { type: "UPDATE_BOUNDS"; id: string; bounds: WindowBounds }
  | {
      type: "UPDATE_WINDOW_SECTION";
      id: string;
      section: string | undefined;
    }
  | {
      type: "CLAMP_WINDOWS";
      viewportWidth: number;
      viewportHeight: number;
    };

export const initialWindowManagerState: WindowManagerState = {
  windows: [],
  activeWindowId: null,
  topZIndex: 20,
};

function getTopVisibleWindow(windows: OSWindow[]): OSWindow | undefined {
  return windows
    .filter((window) => !window.minimized)
    .reduce<OSWindow | undefined>(
      (top, window) =>
        !top || window.zIndex > top.zIndex ? window : top,
      undefined,
    );
}

function focusWindowState(
  state: WindowManagerState,
  id: string,
): WindowManagerState {
  const target = state.windows.find((window) => window.id === id);
  if (!target) return state;
  const nextZIndex = state.topZIndex + 1;
  return {
    ...state,
    activeWindowId: id,
    topZIndex: nextZIndex,
    windows: state.windows.map((window) =>
      window.id === id
        ? { ...window, minimized: false, zIndex: nextZIndex }
        : window,
    ),
  };
}

export function windowManagerReducer(
  state: WindowManagerState,
  action: WindowAction,
): WindowManagerState {
  switch (action.type) {
    case "OPEN_WINDOW": {
      const existing = state.windows.find(
        (window) => window.id === action.window.id,
      );
      if (existing) {
        return focusWindowState(state, existing.id);
      }
      const nextZIndex = state.topZIndex + 1;
      return {
        windows: [
          ...state.windows,
          { ...action.window, zIndex: nextZIndex },
        ],
        activeWindowId: action.window.id,
        topZIndex: nextZIndex,
      };
    }

    case "FOCUS_WINDOW":
      return focusWindowState(state, action.id);

    case "RESTORE_WINDOW": {
      const restored = focusWindowState(state, action.id);
      return restored;
    }

    case "MINIMIZE_WINDOW": {
      const windows = state.windows.map((window) =>
        window.id === action.id ? { ...window, minimized: true } : window,
      );
      const top = getTopVisibleWindow(windows);
      return {
        ...state,
        windows,
        activeWindowId: top?.id ?? null,
      };
    }

    case "CLOSE_WINDOW": {
      const windows = state.windows.filter(
        (window) => window.id !== action.id,
      );
      const top = getTopVisibleWindow(windows);
      return {
        ...state,
        windows,
        activeWindowId: top?.id ?? null,
      };
    }

    case "CLOSE_APP": {
      const windows = state.windows.filter(
        (window) => window.appId !== action.appId,
      );
      const top = getTopVisibleWindow(windows);
      return {
        ...state,
        windows,
        activeWindowId: top?.id ?? null,
      };
    }

    case "CLOSE_ALL":
      return {
        ...state,
        windows: [],
        activeWindowId: null,
      };

    case "TOGGLE_MAXIMIZE": {
      const target = state.windows.find((window) => window.id === action.id);
      if (!target) return state;
      const nextZIndex = state.topZIndex + 1;
      return {
        ...state,
        activeWindowId: action.id,
        topZIndex: nextZIndex,
        windows: state.windows.map((window) => {
          if (window.id !== action.id) return window;
          if (window.maximized && window.savedBounds) {
            return {
              ...window,
              maximized: false,
              bounds: window.savedBounds,
              savedBounds: undefined,
              zIndex: nextZIndex,
            };
          }
          return {
            ...window,
            maximized: true,
            savedBounds: window.bounds,
            bounds: action.maximizedBounds,
            zIndex: nextZIndex,
          };
        }),
      };
    }

    case "UPDATE_BOUNDS":
      return {
        ...state,
        windows: state.windows.map((window) =>
          window.id === action.id
            ? {
                ...window,
                bounds: action.bounds,
                maximized: false,
                savedBounds: undefined,
              }
            : window,
        ),
      };

    case "UPDATE_WINDOW_SECTION":
      return {
        ...state,
        windows: state.windows.map((window) =>
          window.id === action.id
            ? {
                ...window,
                payload: {
                  ...window.payload,
                  section: action.section,
                },
              }
            : window,
        ),
      };

    case "CLAMP_WINDOWS": {
      const menuBarHeight = 30;
      const maxWidth = Math.max(320, action.viewportWidth - 24);
      const maxHeight = Math.max(
        300,
        action.viewportHeight - menuBarHeight - 96,
      );

      return {
        ...state,
        windows: state.windows.map((window) => {
          if (window.maximized) {
            return {
              ...window,
              bounds: {
                x: 8,
                y: menuBarHeight + 8,
                width: Math.max(360, action.viewportWidth - 16),
                height: Math.max(
                  300,
                  action.viewportHeight - menuBarHeight - 102,
                ),
              },
            };
          }

          const width = Math.min(window.bounds.width, maxWidth);
          const height = Math.min(window.bounds.height, maxHeight);
          const maxX = Math.max(8, action.viewportWidth - width - 8);

          return {
            ...window,
            bounds: {
              ...window.bounds,
              width,
              height,
              x: Math.min(Math.max(8, window.bounds.x), maxX),
              y: Math.min(
                Math.max(menuBarHeight + 8, window.bounds.y),
                Math.max(
                  menuBarHeight + 8,
                  action.viewportHeight - height - 8,
                ),
              ),
            },
          };
        }),
      };
    }

    default:
      return state;
  }
}

export function getActiveWindow(state: WindowManagerState) {
  if (!state.activeWindowId) return undefined;
  return state.windows.find(
    (window) => window.id === state.activeWindowId && !window.minimized,
  );
}
