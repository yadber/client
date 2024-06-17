import React from "react";
import CountUp from "react-countup/";

export default function Card({ theme, api_url, number, text }) {
  return (
    <div>
      <div
        className={`block p-2  h-30  border  rounded-lg shadow-lg    cursor-pointer ${
          theme
            ? "hover:bg-gray-600 bg-gray-700"
            : "bg-white border-gray-200 hover:bg-gray-100"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            className={`flex gap-3 mb-2 text-4xl p-3   rounded-xl font-extrabold shadow-2xl shadow-red-400 ${
              theme ? "text-white bg-black" : "text-black bg-white"
            }`}
          >
            <CountUp start={0} end={number} duration={5} />
          </div>
          <p
            className={` text-nowrap  text-xl font-semibold  text-center uppercase ${
              theme ? "text-red-600" : "text-red-500"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
