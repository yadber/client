import React from "react";

export default function FloatingLabel({
  theme,
  title,
  name,
  employeeFormData,
  OnChangeEmployeeForm,
  upperCase,
  fullNameValidation,
}) {
  return (
    <div className="relative">
      <input
        name={name}
        value={employeeFormData}
        onChange={(e) => OnChangeEmployeeForm(e)}
        type="text"
        className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm    border-0 border-b-2  appearance-none   focus:outline-none focus:ring-0  peer 
        ${upperCase && "uppercase w-[18rem]"}
        ${fullNameValidation && "border-2 border-red-500"}
        ${
          theme
            ? "focus:border-blue-500 bg-gray-700 text-white border-gray-600"
            : "bg-gray-50 focus:border-blue-600 text-gray-900 border-gray-300"
        }`}
      />
      <label
        className={`absolute text-sm   duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${
          theme
            ? "text-gray-500 peer-focus:text-blue-600"
            : "dark:text-gray-400 peer-focus:dark:text-blue-500"
        }`}
      >
        {title}
      </label>
    </div>
  );
}
