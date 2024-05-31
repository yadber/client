import React from "react";

export default function TextArea({
  theme,
  placeholder,
  name,
  onChangeTextArea,
  value,
}) {
  return (
    <div>
      <textarea
        onChange={(e) => onChangeTextArea(e)}
        name={name}
        value={value}
        rows="6"
        className={`block p-2.5 w-full text-sm   rounded-lg border   ${
          theme
            ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        }`}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
