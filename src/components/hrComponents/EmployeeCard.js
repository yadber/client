import React from "react";
import sampleProfile from "../../Public/sampleProfile/photo_2023-10-27_10-40-42.jpg";

export default function EmployeeCard({ theme }) {
  return (
    <div
      className={`w-full max-w-[15rem] max-h-[15rem]  border  rounded-lg shadow  ${
        theme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={sampleProfile}
          alt="Bonnie"
        />
        <h5
          className={`mb-1 text-xl font-medium    ${
            theme ? "text-white" : "text-gray-900"
          }`}
        >
          Yaadasaa Barcuu
        </h5>
        <span
          className={`text-sm   ${theme ? "text-gray-400" : "text-gray-500"}`}
        >
          Muummee Teeknooloojii
        </span>
        <span
          className={`text-sm   ${theme ? "text-gray-400" : "text-gray-500"}`}
        >
          Lakk Galmee : 12333
        </span>
      </div>
    </div>
  );
}
