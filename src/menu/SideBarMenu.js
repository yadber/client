import React, { useState } from "react";

import { FaBarsStaggered } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

export default function SideBarMenu({
  theme,
  api_url,
  setSidebarMenu,
  sideBarMenu,
  MenuOptions,
}) {
  const [mobileSidebarMenuClicked, setMobileSidebarMenu] = useState(false);

  return (
    <div>
      <button
        className={`items-center font-serif p-2  ms-3 sm:hidden   focus:outline-none focus:ring-2   flex mt-[-2.5rem] ml-[-1px] ${
          theme
            ? "text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            : "text-gray-500 rounded-lg  hover:bg-gray-100 focus:ring-gray-200"
        }`}
        onClick={() => setMobileSidebarMenu((prevState) => !prevState)}
      >
        {!mobileSidebarMenuClicked ? (
          <FaBarsStaggered className="text-sm" />
        ) : (
          <MdCancel className="text-sm" />
        )}
      </button>

      <div
        className={`fixed top-16 left-0 z-40 w-64 h-screen ${
          mobileSidebarMenuClicked
            ? ""
            : "transition-transform -translate-x-full sm:translate-x-0"
        } `}
      >
        <div
          className={`h-full px-3 py-4 overflow-y-auto  ${
            theme ? "bg-gray-800" : "bg-gray-50 "
          }`}
        >
          {!MenuOptions ? (
            <ul className="space-y-2 font-medium">
              <li>
                <div
                  className={`flex items-center p-2  rounded-lg    group 
                    ${sideBarMenu === "Dashboard" && "bg-blue-400"} ${
                    theme
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarMenu("Dashboard")}
                >
                  <span className="ms-3">Dashboard</span>
                </div>
              </li>

              <li>
                <div
                  className={`flex items-center p-2  rounded-lg group
                ${sideBarMenu === "hr" && "bg-blue-400"}
                ${
                  theme
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
                  onClick={() => setSidebarMenu("hr")}
                >
                  <span className="ms-3">HR</span>
                </div>
              </li>

              <li>
                <div
                  className={`flex items-center p-2  rounded-lg    group
                ${sideBarMenu === "dms" && "bg-blue-400"} ${
                    theme
                      ? "text-white hover:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarMenu("dms")}
                >
                  <span className="ms-3">DMS</span>
                </div>
              </li>
            </ul>
          ) : (
            <ul className="space-y-2 font-medium font-serif">
              {MenuOptions.map((val) => (
                <li>
                  <div
                    className={`flex items-center p-2 font-serif  rounded-lg group
                ${sideBarMenu === val && "bg-blue-400"}
                ${
                  theme
                    ? "text-white hover:bg-gray-700"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
                    onClick={() => setSidebarMenu(val)}
                  >
                    <span className="ms-3">{val}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
