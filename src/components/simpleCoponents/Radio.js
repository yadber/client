import React from "react";

export default function Radio({
  theme,
  optionOne,
  optionTwo,
  OnChangeEmployeeForm,
  name,
  employeeGender,
}) {
  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="radio"
          value={optionOne}
          name={name}
          checked={employeeGender === "Dhiira" ? true : false}
          onChange={() => OnChangeEmployeeForm(optionOne)}
          className={`w-4 h-4     focus:ring-2  ${
            theme
              ? "focus:ring-blue-600 ring-offset-gray-800 bg-gray-700 border-gray-600"
              : "text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          }`}
        />
        <label
          className={`ms-2 text-sm font-medium   ${
            theme ? "text-gray-300" : "text-gray-900"
          }`}
        >
          {optionOne}
        </label>
      </div>
      <div className="flex items-center">
        <input
          onChange={() => OnChangeEmployeeForm(optionTwo)}
          type="radio"
          checked={employeeGender === optionTwo}
          value={optionTwo}
          name={name}
          className={`w-4 h-4    focus:ring-2  ${
            theme
              ? "focus:ring-blue-600 bg-gray-700 border-gray-600 ring-offset-gray-800"
              : "text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          }`}
        />
        <label
          className={`ms-2 text-sm font-medium   ${
            theme ? "text-gray-300" : "text-gray-900"
          }`}
        >
          {optionTwo}
        </label>
      </div>
    </div>
  );
}
