import { React, useState, useEffect } from "react";
import SideBarMenu from "./menu/SideBarMenu";
import NavBarMenu from "./menu/NavBarMenu";

const api_url = "http://localhost:9000";
export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  document.body.style.backgroundColor = isDarkTheme ? "black" : "white";

  return (
    <div>
      <NavBarMenu
        theme={isDarkTheme}
        api_url={api_url}
        setIsDarkTheme={setIsDarkTheme}
      />
      <SideBarMenu theme={isDarkTheme} api_url={api_url} />
    </div>
  );
}
