import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TableRowTwo({
  theme,
  id,
  maqaa,
  muummee,
  damee,
  daareektooretii,
  deeskii,
  gitahojii,
  date,
  onDeleteScanCategoryClicked,
  onEditScanCategoryClicked,
}) {
  return (
    <div>
      <tbody>
        <tr
          className={` border-b    ${
            theme
              ? "bg-gray-800 border-gray-700 hover:bg-gray-500"
              : "bg-white hover:bg-gray-100"
          } ${date === "0" && "bg-blue-800"}`}
        >
          <th
            scope="row"
            className={`px-6 py-4 font-medium  whitespace-nowrap  ${
              theme ? "text-white" : "text-gray-900"
            }`}
          >
            {maqaa}
          </th>
          <td className="px-6 py-4">{muummee}</td>
          <td className="px-6 py-4">{damee}</td>
          <td
            className={`px-6 py-4 font-medium  whitespace-nowrap  ${
              theme ? "text-white" : "text-gray-900"
            }`}
          >
            {daareektooretii}
          </td>
          <td
            className={`px-6 py-4 font-medium  whitespace-nowrap  ${
              theme ? "text-white" : "text-gray-900"
            }`}
          >
            {deeskii}
          </td>
          <td className="px-6 py-4">{gitahojii}</td>
          <td
            className="px-6 py-4 hover:text-red-500 cursor-pointer"
            onClick={() => onDeleteScanCategoryClicked(id)}
          >
            <MdDelete />
          </td>
          <td
            className="px-6 py-4 hover:text-green-500 cursor-pointer"
            onClick={() => onEditScanCategoryClicked(id)}
          >
            <MdEdit />
          </td>
        </tr>
      </tbody>
    </div>
  );
}
