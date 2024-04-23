import React from "react";

export default function SearchBar({
  onChangeSearchValue,
  searchValue,
  placeholder,
  theme,
}) {
  return (
    <form className=" p-2">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className={`w-4 h-4   ${theme ? "text-gray-400" : "text-gray-500"}`}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          className={`block w-full p-4 ps-10 text-sm border  rounded-lg   ${
            theme
              ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 dark:focus:border-blue-500"
              : "text-gray-900 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          }`}
          placeholder={
            placeholder ? placeholder : "Search vacancy using vacancy number"
          }
          onChange={(e) => onChangeSearchValue(e)}
          value={searchValue}
          required
        />
        <div
          className={` absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2  ${
            theme
              ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 text-black"
              : "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300"
          }`}
        >
          Search
        </div>
      </div>
    </form>
  );
}
