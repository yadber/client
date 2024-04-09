import { React, useState, useEffect } from "react";
import SideBarMenu from "./menu/SideBarMenu";

const api_url = "http://localhost:9000";
export default function App() {
  const getCurrentTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme);
  document.body.style.backgroundColor = isDarkTheme ? "black" : "white";
  useEffect(() => {
    return () => {
      setIsDarkTheme(getCurrentTheme);
    };
  });

  return (
    <div>
      <SideBarMenu theme={isDarkTheme} api_url={api_url} />
    </div>
  );
}
