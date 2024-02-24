import { useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";

const themes = {
  light: "retro",
  dark: "dracula",
};

export default function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">();

  useEffect(() => {
    addDarkModeListener();
    changePreference("auto");
    return () => {
      console.log("unmount");

      removeDarkModeListener();
    };
  }, []);

  function changePreference(newPref: "light" | "dark" | "auto") {
    switch (newPref) {
      case "auto":
        setAuto();
        break;
      case "light":
        removeDarkModeListener();
        setLight();
        break;
      case "dark":
        removeDarkModeListener();
        setDark();
        break;
      default:
        break;
    }
  }

  function addDarkModeListener() {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setAuto);
  }

  function removeDarkModeListener() {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", setAuto);
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

  function setAuto(e?: MediaQueryListEvent) {
    document.documentElement.removeAttribute("data-theme");

    const isDark =
      e?.matches ?? window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isDark) {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }

  const isLightMode = (() => {
    if (currentTheme) {
      return currentTheme === "light";
    } else {
      return window.matchMedia("(prefers-color-scheme: light)").matches;
    }
  })();

  return (
    <div className="not-prose dropdown dropdown-end">
      <button className="btn btn-square btn-ghost no-animation" role="button">
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
          <button onClick={() => changePreference("light")}>Light</button>
        </li>
        <li>
          <button onClick={() => changePreference("dark")}>Dark</button>
        </li>
        <li>
          <button onClick={() => changePreference("auto")}>Auto</button>
        </li>
      </ul>
    </div>
  );
}
