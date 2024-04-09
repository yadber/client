import React from "react";

export default function Gallery({ dragAndDrop, theme, url, title }) {
  return (
    <div className="flex flex-col font-serif items-center justify-center">
      <img
        crossOrigin="anonymous"
        className={`rounded-lg ${
          dragAndDrop ? "w-20 h-20" : "w-[30rem] h-[20rem] rounded-lg"
        }`}
        src={`http://localhost:9000/Documents/VacancyDocuments/${url}`}
        alt=""
      />
      <label className={`${theme ? "text-gray-50" : "text-gray-900"}`}>
        {title}
      </label>
    </div>
  );
}
