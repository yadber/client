import React from "react";

export default function Gallery({ api_url, dragAndDrop, theme, url, title }) {
  return (
    <div className="flex flex-col font-serif items-center justify-center">
      <img
        crossOrigin="anonymous"
        className={`rounded-lg ${
          dragAndDrop
            ? "w-20 h-20"
            : "w-60 h-40 md:w-[25rem] md:h-[20rem] rounded-lg"
        }`}
        src={`${api_url}/Documents/VacancyDocuments/${url}`}
        alt=""
      />
      <label className={`${theme ? "text-gray-50" : "text-gray-900"}`}>
        {title}
      </label>
    </div>
  );
}
