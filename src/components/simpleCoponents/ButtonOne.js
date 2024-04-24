import React from "react";

export default function ButtonOne({ theme, title, icon, OnClick }) {
  return (
    <button
      onClick={OnClick}
      type="button"
      className={`inline-flex items-center px-5 py-2.5 text-sm font-medium text-center   rounded-lg  focus:ring-4 focus:outline-none   ${
        theme
          ? "bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-800 text-white"
          : "bg-blue-700 focus:ring-blue-300 text-white hover:bg-blue-800"
      }`}
    >
      {title}
      <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-l font-semibold  rounded-full">
        {icon}
      </span>
    </button>
  );
}
