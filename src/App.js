import { React, useState } from "react";
import SideBarMenu from "./menu/SideBarMenu";
import NavBarMenu from "./menu/NavBarMenu";
import HrComponent from "./components/hrComponents/HrComponent";
import DmsComponent from "./components/dmsComponent/DmsComponent";
const api_url = "http://localhost:9000";
export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  document.body.style.backgroundColor = isDarkTheme ? "black" : "white";
  const [sideBarMenu, setSidebarMenu] = useState("");
  return (
    <div>
      <NavBarMenu
        theme={isDarkTheme}
        api_url={api_url}
        setIsDarkTheme={setIsDarkTheme}
      />

      <div className="md:flex">
        <div className="md:basis-1/6 ">
          <SideBarMenu
            theme={isDarkTheme}
            api_url={api_url}
            setSidebarMenu={setSidebarMenu}
            sideBarMenu={sideBarMenu}
          />
        </div>
        <div className="w-full p-3 md:p-0 md:basis-5/6">
          {sideBarMenu === "hr" && (
            <HrComponent theme={isDarkTheme} api_url={api_url} />
          )}
          {sideBarMenu === "dms" && (
            <DmsComponent theme={isDarkTheme} api_url={api_url} forDms={true} />
          )}
        </div>
      </div>
    </div>
  );
}
