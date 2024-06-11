import React from "react";
import { MdPostAdd, MdOutlineSettings } from "react-icons/md";
import { GrView } from "react-icons/gr";

export default function AccordionTabs({ theme, tab, setTab, hr }) {
  return (
    <div
      className={` flex gap-2 items-center font-serif    ${
        theme ? "text-white bg-gray-900" : "text-black bg-gray-50"
      }`}
    >
      {!hr && (
        <div
          className={`border-2 p-2 rounded-xl cursor-pointer
        ${tab === "add" && "bg-green-600"} ${
            theme
              ? "border-gray-600 bg-gray-800 hover:bg-green-600"
              : "border-gray-400 bg-gray-200 hover:bg-green-600"
          }`}
          onClick={() => setTab("add")}
        >
          <MdPostAdd />
        </div>
      )}
      <div
        className={`border-2 p-2 rounded-xl cursor-pointer   ${
          tab === "view" && "bg-green-600"
        } ${
          theme
            ? "border-gray-600 bg-gray-800 hover:bg-green-600"
            : "border-gray-400 bg-gray-200 hover:bg-green-600"
        }`}
        onClick={() => setTab("view")}
      >
        {" "}
        <GrView />{" "}
      </div>
      {!hr && (
        <div
          onClick={() => setTab("setting")}
          className={`border-2 p-2 rounded-xl cursor-pointer ${
            tab === "setting" && "bg-green-600"
          }  ${
            theme
              ? "border-gray-600 bg-gray-800 hover:bg-green-600"
              : "border-gray-400 bg-gray-200 hover:bg-green-600"
          }`}
        >
          <MdOutlineSettings />{" "}
        </div>
      )}
    </div>
  );
}
