import React, { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
export default function SimpleDropdown({
  clickedValue,
  setClickedValue,
  theme,
}) {
  const [dropdownClicked, setDropdownClicked] = useState(false);

  return (
    <div>
      <button
        className={` focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  ${
          theme
            ? "bg-gray-600 hover:bg-gray-700 text-white  focus:ring-gray-800"
            : "text-black bg-gray-100 hover:bg-gray-200 focus:ring-blue-300"
        }`}
        type="button"
        onClick={() => setDropdownClicked((prevState) => !prevState)}
      >
        {clickedValue === "" ? "Haala Qaxarrii" : clickedValue}

        <IoMdArrowDropdownCircle className="text-xl ml-2" />
      </button>

      <div
        className={`z-10  ${
          !dropdownClicked && "hidden"
        }  divide-y divide-gray-100 rounded-lg shadow w-44  ${
          theme ? "bg-gray-700" : "bg-white"
        }`}
      >
        <ul
          className={`py-2 text-sm   ${
            theme ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <li onClick={() => setClickedValue("Dhaabbii")}>
            <p
              className={`block px-4 py-2   ${
                theme
                  ? "hover:bg-gray-600 hover:text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setDropdownClicked(false)}
            >
              Dhaabbii
            </p>
          </li>
          <li onClick={() => setClickedValue("Freelance")}>
            <p
              className={`block px-4 py-2   ${
                theme
                  ? "hover:bg-gray-600 hover:text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setDropdownClicked(false)}
            >
              Freelance
            </p>
          </li>
          <li onClick={() => setClickedValue("Contract")}>
            <p
              className={`block px-4 py-2   ${
                theme
                  ? "hover:bg-gray-600 hover:text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setDropdownClicked(false)}
            >
              Contract
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
