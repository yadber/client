import React, { useState } from "react";

export default function Gallery({
  api_url,
  dragAndDrop,
  theme,
  url,
  title,
  PDF,
}) {
  const [zoom, setZoom] = useState(false);
  return (
    <div
      className="flex flex-col font-serif items-center justify-center"
      onClick={() => setZoom((prevState) => !prevState)}
    >
      <img
        crossOrigin="anonymous"
        className={`rounded-lg ${
          PDF
            ? "w-full h-full"
            : zoom
            ? "w-full h-full"
            : dragAndDrop
            ? "w-20 h-20"
            : "w-60 h-50 md:w-[18rem] md:h-[22rem] rounded-lg"
        }`}
        //
        src={`${api_url}/Documents/VacancyDocuments/${url}`}
        alt=""
      />
      <label className={`${theme ? "text-gray-50" : "text-gray-900"}`}>
        {title}
      </label>
    </div>
  );
}
