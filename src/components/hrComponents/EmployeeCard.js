import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
export default function EmployeeCard({
  id,
  theme,
  name,
  muummee,
  fileNumber,
  dms,
  phoneNumber,
  profile,
  api_url,
  type,
  onEmployeeCardClicked,
  onEmployeeEditClicked,
  hr,
}) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div
      className={`w-full max-w-[16rem] max-h-[15rem] ${
        dms === 0 && "border-red-500"
      }  border  rounded-lg shadow cursor-pointer  ${
        theme
          ? "bg-gray-800 hover:bg-gray-600 border-gray-700"
          : "bg-white hover:bg-gray-200 border-gray-200"
      }`}
      onMouseEnter={() => setShowEdit(true)}
      onMouseLeave={() => setShowEdit(false)}
    >
      <span className="text-blue-500 cursor-pointer">
        {hr && showEdit && (
          <FaUserEdit onClick={() => onEmployeeEditClicked(id, name)} />
        )}
      </span>
      <div
        className="flex flex-col items-center pb-10"
        onClick={() => onEmployeeCardClicked(id, name)}
      >
        <img
          crossOrigin="anonymous"
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={`${api_url}/employee/profile/${profile}`}
          alt="Employee Profile"
        />
        <h5
          className={`mb-1 text-sm font-medium uppercase text-nowrap    ${
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
