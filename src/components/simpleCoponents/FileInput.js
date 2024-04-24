import React from "react";

export default function FileInput({ theme, handleFileUpload }) {
  return (
    <div>
      <label
        className={`block mb-2 text-sm font-medium    ${
          theme ? "text-white" : "text-gray-900"
        }`}
      >
        Upload file
      </label>
      <input
        className={`block w-full text-sm  border  rounded-lg cursor-pointer  focus:outline-none    ${
          theme
            ? "text-gray-400 bg-gray-700 placeholder-gray-400 border-gray-600"
            : "text-gray-900 bg-gray-50 border-gray-300"
        } `}
        id="file_input"
        type="file"
        onChange={(e) => handleFileUpload(e)}
      />
    </div>
  );
}
