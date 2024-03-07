import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "./Icons";

export const themes = {
  light: "retro",
  dark: "dracula",
};

export default function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "auto">();
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">();

  useEffect(() => {
    const storedTheme: any = localStorage.getItem("theme") ?? "auto";
    changePreference(storedTheme);

    const onChange = (e:MediaQueryListEvent) => {
      if (e.matches) {
        setSystemTheme("dark");
      } else {
        setSystemTheme("light");
      }
    }

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

  function addDarkModeListener(listener: (e: MediaQueryListEvent) => any) {
    console.log("added listener");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", listener);
  }

  function removeDarkModeListener(listener: (e: MediaQueryListEvent) => any) {
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
    setCurrentTheme("auto")
  }

  const isLightMode = (() => {
    if (currentTheme == "auto") {
      return systemTheme == "light";
    } else {
      return currentTheme == "light";
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
