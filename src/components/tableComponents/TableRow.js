import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TableRow({
  theme,
  id,
  title,
  color,
  displayOrder,
  table,
  onDeleteScanCategoryClicked,
  onEditScanCategoryClicked,
}) {
  return (
    <tbody>
      <tr
        className={` border-b    ${
          theme
            ? "bg-gray-800 border-gray-700 hover:bg-gray-500"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        <th
          scope="row"
          className={`px-6 py-4 font-medium  whitespace-nowrap  ${
            theme ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </th>
        <td className="px-6 py-4">{color}</td>
        <td className="px-6 py-4">{displayOrder}</td>
        <td className="px-6 py-4">{table}</td>
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
  );
}
