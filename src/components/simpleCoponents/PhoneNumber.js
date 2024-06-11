import React from "react";

export default function PhoneNumber({
  theme,
  name,
  OnChangeEmployeeForm,
  employeeFormData,
  phoneNumberValidation,
}) {
  return (
    <form className="max-w-sm mx-auto ml-0">
      <label
        className={`block mb-2 text-sm font-medium  ${
          theme ? "text-white" : "text-gray-900"
        }`}
      >
        Phone number:
      </label>
      <div className="relative">
        <div
          className={`absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none  `}
        >
          <svg
            className={`w-4 h-4   ${theme ? "text-gray-400" : "text-gray-500"}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 19 18"
          >
            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
          </svg>
        </div>
        <input
          autocomplete="off"
          name={name}
          type="number"
          onChange={OnChangeEmployeeForm}
          value={employeeFormData}
          className={` text-sm rounded-lg  block w-full ps-10 p-2.5 ${
            phoneNumberValidation && "border-2 border-red-500"
          }     ${
            theme
              ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          }`}
          required
        />
      </div>
    </form>
  );
}
