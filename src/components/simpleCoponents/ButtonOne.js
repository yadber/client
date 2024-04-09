import React from "react";

export default function ButtonOne({ theme, title, icon, OnClick }) {
  return (
    <button
      onClick={OnClick}
      type="button"
      className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {title}
      <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-l font-semibold  rounded-full">
        {icon}
      </span>
    </button>
  );
}
