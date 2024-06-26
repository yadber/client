import { React, useState } from "react";
import SideBarMenu from "./menu/SideBarMenu";
import NavBarMenu from "./menu/NavBarMenu";
import HrComponent from "./components/hrComponents/HrComponent";
import DmsComponent from "./components/dmsComponent/DmsComponent";
import Dashboard from "./components/dashboard/Dashboard";

import ScanCategorySetting from "./components/setting/ScanCategorySetting";
import ObnStructureSetting from "./components/setting/obnStructureSetting/ObnStructureSetting";
const api_url = "http://localhost:9000";
export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  document.body.style.backgroundColor = isDarkTheme ? "black" : "white";
  const [sideBarMenu, setSidebarMenu] = useState("Dashboard");
  const [sideBarMenuTwo, setSidebarMenuTwo] = useState("Scan Category Setting");

  const [NavbarMenu, setNavbarMenu] = useState("Home");
  return (
    <div>
      <NavBarMenu
        theme={isDarkTheme}
        api_url={api_url}
        setIsDarkTheme={setIsDarkTheme}
        NavbarMenu={NavbarMenu}
        setNavbarMenu={setNavbarMenu}
      />

      <div className="md:flex font-serif">
        <div className="md:basis-1/6 ">
          {NavbarMenu === "Home" && (
            <SideBarMenu
              theme={isDarkTheme}
              api_url={api_url}
              setSidebarMenu={setSidebarMenu}
              sideBarMenu={sideBarMenu}
            />
          )}
        </div>
        <div className="w-full p-3 md:p-0 md:basis-5/6">
          {sideBarMenu === "hr" && NavbarMenu === "Home" && (
            <HrComponent theme={isDarkTheme} api_url={api_url} />
          )}
          {sideBarMenu === "dms" && NavbarMenu === "Home" && (
            <DmsComponent theme={isDarkTheme} api_url={api_url} forDms={true} />
          )}
          {sideBarMenu === "Dashboard" && NavbarMenu === "Home" && (
            <Dashboard theme={isDarkTheme} api_url={api_url} />
          )}
          {NavbarMenu === "Setting" && (
            <>
              <SideBarMenu
                theme={isDarkTheme}
                api_url={api_url}
                setSidebarMenu={setSidebarMenuTwo}
                sideBarMenu={sideBarMenuTwo}
                MenuOptions={["Scan Category Setting", "OBN structure Setting"]}
              />
            </>
          )}
          {NavbarMenu === "Setting" &&
            sideBarMenuTwo === "Scan Category Setting" && (
              <ScanCategorySetting theme={isDarkTheme} api_url={api_url} />
            )}

          {NavbarMenu === "Setting" &&
            sideBarMenuTwo === "OBN structure Setting" && (
              <ObnStructureSetting theme={isDarkTheme} api_url={api_url} />
            )}
        </div>
      </div>
    </div>
  );
}
