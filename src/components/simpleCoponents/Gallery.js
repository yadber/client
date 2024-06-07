import React, { useState } from "react";

export default function Gallery({
  api_url,
  dragAndDrop,
  theme,
  url,
  title,
  PDF,
  category,
}) {
  const [zoom, setZoom] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  return (
    <div
      className="flex flex-col font-serif items-center justify-center"
      onClick={() => setZoom((prevState) => !prevState)}
    >
      <div className="flex gap-2 items-center justify-center">
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
          src={`${api_url}/Documents/VacancyDocuments/${url}`}
          alt="file from database"
          onMouseEnter={() => {
            setShowTitle(true);
          }}
          onMouseLeave={() => {
            setShowTitle(false);
          }}
        />
      </div>
      <label
        className={` flex text-center justify-center ${
          theme ? "text-gray-50" : "text-gray-900"
        }`}
      >
        {title}{" "}
        {PDF && (
          <div className="text-red-500 text-nowrap">
            {" "}
            ({category.split("_").join(" ").split("table")})
          </div>
        )}
      </label>
    </div>
  );
}
