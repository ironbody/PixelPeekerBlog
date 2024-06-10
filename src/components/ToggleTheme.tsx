import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "./Icons";

export const themes = {
  light: "retro",
  dark: "dracula",
} as const;

export type ThemeStatesType = keyof typeof themes | "auto";
export const themeStates = [
  ...Object.keys(themes),
  "auto",
] as unknown as ThemeStatesType;

export default function ToggleTheme() {
  const { userTheme, setUserTheme, systemTheme } =
    useTheme<ThemeStatesType>("auto");

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme") ?? "auto";
    if (!themeStates.includes(storedTheme as ThemeStatesType)) {
      storedTheme = "auto";
    }
    changePreference(storedTheme as ThemeStatesType);
  }, []);

  function changePreference(newPref: ThemeStatesType) {
    setUserTheme(newPref);
    localStorage.setItem("theme", newPref);
    switch (newPref) {
      case "auto":
        document.documentElement.removeAttribute("data-theme");
        break;
      default:
        document.documentElement.dataset.theme = themes[newPref];
        break;
    }
  }

  const isLightMode = (() => {
    if (userTheme === "auto") {
      return systemTheme === "light";
    }
    return userTheme === "light";
  })();

  return (
    <div className="not-prose dropdown dropdown-end">
      <button type="button" className="btn btn-square btn-ghost no-animation">
        <label
          className="swap swap-rotate"
          htmlFor="theme-button"
          aria-label="theme switcher"
        >
          {/* this hidden checkbox controls the state */}
          <input
            id="theme-button"
            name="theme-button"
            type="checkbox"
            checked={isLightMode}
            readOnly
            tabIndex={-1}
          />
          <p className="sr-only">Theme switcher</p>

          <Sun className="swap-on fill-current" />

          <Moon className="swap-off fill-current" />
        </label>
      </button>
      <ul className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
        <li>
          <button type="button" onClick={() => changePreference("light")}>
            Light
          </button>
        </li>
        <li>
          <button type="button" onClick={() => changePreference("dark")}>
            Dark
          </button>
        </li>
        <li>
          <button type="button" onClick={() => changePreference("auto")}>
            Auto
          </button>
        </li>
      </ul>
    </div>
  );
}

function useTheme<TTheme>(initial: TTheme): {
  userTheme: TTheme;
  setUserTheme: (theme: TTheme) => void;
  systemTheme: "light" | "dark";
} {
  const [userTheme, setUserTheme] = useState<TTheme>(initial);

  const isDark = useSyncExternalStore(
    (callback) => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", callback);
      return () => {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .removeEventListener("change", callback);
      };
    },
    () => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    },
  );

  const systemTheme = isDark ? "dark" : "light";

  return {
    userTheme,
    setUserTheme,
    systemTheme,
  };
}
