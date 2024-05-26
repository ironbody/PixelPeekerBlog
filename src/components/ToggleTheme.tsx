import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";

export const themes = {
  light: "retro",
  dark: "dracula",
};

const themeStates = ["light", "dark", "auto"] as const;
type themeStatesType = (typeof themeStates)[number];

export default function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState<themeStatesType>();
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">();

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme") ?? "auto";
    if (!themeStates.includes(storedTheme as themeStatesType)) {
      storedTheme = "auto";
    }
    changePreference(storedTheme as themeStatesType);

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log(isDark);

    if (isDark) {
      setSystemTheme("dark");
    } else {
      setSystemTheme("light");
    }

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSystemTheme("dark");
      } else {
        setSystemTheme("light");
      }
    };

    addDarkModeListener(onChange);

    return () => {
      removeDarkModeListener(onChange);
    };
  }, []);

  function changePreference(newPref: "light" | "dark" | "auto") {
    switch (newPref) {
      case "auto":
        localStorage.setItem("theme", "auto");
        setAuto();
        break;
      case "light":
        localStorage.setItem("theme", "light");
        setLight();
        break;
      case "dark":
        localStorage.setItem("theme", "dark");
        setDark();
        break;
      default:
        break;
    }
  }

  function addDarkModeListener(listener: (e: MediaQueryListEvent) => void) {
    console.log("added listener");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);
  }

  function removeDarkModeListener(listener: (e: MediaQueryListEvent) => void) {
    console.log("removed listener");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", listener);
  }

  function setLight() {
    console.log("set light");

    document.documentElement.dataset.theme = themes.light;
    setCurrentTheme("light");
  }
  function setDark() {
    console.log("set dark");
    document.documentElement.dataset.theme = themes.dark;
    setCurrentTheme("dark");
  }

  function setAuto() {
    console.log("set auto");

    document.documentElement.removeAttribute("data-theme");
    setCurrentTheme("auto");
  }

  const isLightMode = (() => {
    if (currentTheme === "auto") {
      return systemTheme === "light";
    }
    return currentTheme === "light";
  })();

  return (
    <div className="not-prose dropdown dropdown-end">
      <button type="button" className="btn btn-square btn-ghost no-animation">
        <label
          htmlFor="theme-button"
          className="swap swap-rotate"
          aria-label="theme switcher"
        >
          {/* this hidden checkbox controls the state */}
          <input
            id="theme-button"
            name="theme-button"
            type="checkbox"
            checked={isLightMode}
            readOnly
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
