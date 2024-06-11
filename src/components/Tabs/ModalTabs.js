import React from "react";

export default function ModalTabs({ theme, clickedTab, setClickedTab }) {
  return (
    <div
      className={`text-sm font-medium text-center  border-b mt-[-1rem]    ${
        theme ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-50"
      }`}
    >
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
          {
            <div
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
                clickedTab === "scan" && "text-blue-500 border-blue-500"
              } border-blue-500"   ${
                theme
                  ? "hover:text-gray-300"
                  : "hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => {
                setClickedTab("scan");
              }}
            >
              Scan
            </div>
          }
        </li>
        <li className="me-2">
          <div
            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
              clickedTab === "dashboard" && "text-blue-500 border-blue-500"
            } border-blue-500"   ${
              theme
                ? "hover:text-gray-300"
                : "hover:text-gray-600 hover:border-gray-300"
            }`}
            onClick={() => {
              setClickedTab("dashboard");
            }}
          >
            Dashboard
          </div>
        </li>
        <li className="me-2">
          <div
            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
              clickedTab === "Gallery" && "text-blue-500 border-blue-500"
            } border-blue-500"   ${
              theme
                ? "hover:text-gray-300"
                : "hover:text-gray-600 hover:border-gray-300"
            }`}
            onClick={() => {
              setClickedTab("Gallery");
            }}
          >
            Gallery
          </div>
        </li>
      </ul>
    </div>
  );
}
