import React from "react";

export default function EmployeeCard({
  theme,
  name,
  muummee,
  fileNumber,

  phoneNumber,
  profile,
  api_url,
  type,
}) {
  return (
    <div
      className={`w-full max-w-[15rem] max-h-[15rem]  border  rounded-lg shadow  ${
        theme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-col items-center pb-10">
        <img
          crossOrigin="anonymous"
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={`${api_url}/employee/profile/${profile}`}
          alt="Employee Profile"
        />
        <h5
          className={`mb-1 text-sm font-medium uppercase    ${
            theme ? "text-white" : "text-gray-900"
          }`}
        >
          {name}
        </h5>
        <span
          className={`text-sm   ${theme ? "text-gray-400" : "text-gray-500"}`}
        >
          Muummee : {muummee}
        </span>
        <span
          className={`text-sm   ${theme ? "text-gray-400" : "text-gray-500"}`}
        >
          Lakk Galmee : {fileNumber}
        </span>
        <span
          className={`text-sm   ${theme ? "text-gray-50" : "text-gray-900"}`}
        >
          {type}
        </span>
        <span
          className={`text-sm   ${theme ? "text-gray-400" : "text-gray-500"}`}
        >
          {phoneNumber}
        </span>
      </div>
    </div>
  );
}
