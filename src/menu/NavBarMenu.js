import React, { useState } from "react";
import obnLogo from "../Public/logo/OBNLogo.jpg";
import { FaBars } from "react-icons/fa";

import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
export default function NavBarMenu({
  theme,
  api_url,
  setIsDarkTheme,
  NavbarMenu,
  setNavbarMenu,
}) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  return (
    <nav
      className={`  ${
        theme ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-300"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center ml-6 sm:ml-3  justify-between mx-auto p-4">
        <div className="flex items-center space-x-1 sm:space-x-3 rtl:space-x-reverse">
          <img src={obnLogo} className=" rounded-xl h-8" alt="OBN Logo" />
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap  ${
              theme ? "text-white" : "text-black"
            }`}
          >
            OBN DMS
          </span>
        </div>
        <button
          type="button"
          className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2     ${
            theme
              ? "hover:bg-gray-700 focus:ring-gray-600 text-gray-400"
              : "focus:ring-gray-200 text-gray-500 hover:bg-gray-100"
          }`}
          onClick={() => setMobileNavbar((prevState) => !prevState)}
        >
          <FaBars />
        </button>
        <div
          className={`${
            mobileNavbar ? "" : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul
            className={`flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   ${
              theme
                ? " bg-gray-800 md:bg-gray-900 border-gray-700"
                : " border-gray-100 bg-gray-50 md:bg-white "
            }`}
          >
            <li>
              <div
                className={`block py-2 px-3  cursor-pointer rounded  md:border-0  md:p-0      ${
                  theme
                    ? "hover:text-white hover:bg-gray-700 text-white md:hover:bg-transparent md:hover:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent"
                } ${NavbarMenu === "Home" && "text-xl"} `}
                onClick={() => setNavbarMenu("Home")}
              >
                Home
              </div>
            </li>

            <li>
              <div
                className={`block py-2 px-3 cursor-pointer  rounded  md:border-0  md:p-0  ${
                  NavbarMenu === "Setting" && "text-xl"
                }     ${
                  theme
                    ? "hover:text-white hover:bg-gray-700 text-white md:hover:bg-transparent md:hover:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent "
                }`}
                onClick={() => setNavbarMenu("Setting")}
              >
                Setting
              </div>
            </li>
            <li>
              <div
                className={`block py-2 px-3  cursor-pointer rounded  md:border-0  md:p-0 ${
                  NavbarMenu === "pricing" && "text-xl"
                }      ${
                  theme
                    ? "hover:text-white hover:bg-gray-700 text-white md:hover:bg-transparent md:hover:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent "
                }`}
                onClick={() => setNavbarMenu("pricing")}
              >
                Pricing
              </div>
            </li>
            <li>
              <div
                className={`block py-2 px-3 cursor-pointer  rounded  md:border-0  md:p-0   ${
                  NavbarMenu === "contact" && "text-xl"
                }     ${
                  theme
                    ? "hover:text-white hover:bg-gray-700 text-white md:hover:bg-transparent md:hover:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:text-blue-700 md:hover:bg-transparent "
                }`}
                onClick={() => setNavbarMenu("contact")}
              >
                Contact
              </div>
            </li>
            <li>
              <div className="text-xl flex items-center ml-3 sm:ml-0 ">
                {theme ? (
                  <MdOutlineLightMode
                    className="text-white cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setIsDarkTheme(false);
                    }}
                  />
                ) : (
                  <MdDarkMode
                    className="text-black cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setIsDarkTheme(true);
                    }}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
