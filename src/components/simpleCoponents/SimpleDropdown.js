import React, { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
export default function SimpleDropdown({
  clickedValue,
  setClickedValue,
  theme,
  optionOne,
  optionTwo,
  optionThree,
  multipleOptions,
  onChangeDropdownForm,
  optionOneByOne,
  title,
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
          {!multipleOptions && (
            <>
              <li
                onClick={() =>
                  setClickedValue(optionOne ? optionOne : "Dhaabbii")
                }
              >
                <p
                  className={`block px-4 py-2   ${
                    theme
                      ? "hover:bg-gray-600 hover:text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setDropdownClicked(false)}
                >
                  {optionOne ? optionOne : "Dhaabbii"}
                </p>
              </li>
              <li
                onClick={() =>
                  setClickedValue(optionTwo ? optionTwo : "Freelance")
                }
              >
                <p
                  className={`block px-4 py-2   ${
                    theme
                      ? "hover:bg-gray-600 hover:text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setDropdownClicked(false)}
                >
                  {optionTwo ? optionTwo : "Freelance"}
                </p>
              </li>
              <li
                onClick={() =>
                  setClickedValue(optionThree ? optionThree : "Contract")
                }
              >
                <p
                  className={`block px-4 py-2   ${
                    theme
                      ? "hover:bg-gray-600 hover:text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setDropdownClicked(false)}
                >
                  {optionThree ? optionThree : "Contract"}
                </p>
              </li>{" "}
            </>
          )}

          {multipleOptions &&
            optionOneByOne.map((val) => (
              <li key={val} onClick={() => onChangeDropdownForm(val, title)}>
                <p
                  className={`block px-4 py-2   ${
                    theme
                      ? "hover:bg-gray-600 hover:text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setDropdownClicked(false)}
                >
                  {val}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
