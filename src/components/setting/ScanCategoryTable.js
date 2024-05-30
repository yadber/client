import React from "react";

import TableRow from "../tableComponents/TableRow";

export default function ScanCategoryTable({
  theme,
  api_url,
  categoryData,
  onDeleteScanCategoryClicked,
  onEditScanCategoryClicked,
}) {
  return (
    <div className="relative overflow-x-auto">
      <table
        className={`w-full text-sm text-left rtl:text-right   ${
          theme ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <thead
          class={`text-xs  uppercase    ${
            theme ? "bg-gray-700 text-gray-400" : "text-gray-700 bg-gray-50"
          }`}
        ></thead>
        <tbody>
          {categoryData.map((val) => (
            <TableRow
              key={val.id}
              theme={theme}
              id={val.id}
              title={val.title}
              color={val.color}
              displayOrder={val.display_order}
              table={val.table_name}
              onDeleteScanCategoryClicked={onDeleteScanCategoryClicked}
              onEditScanCategoryClicked={onEditScanCategoryClicked}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
