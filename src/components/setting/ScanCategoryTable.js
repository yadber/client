import React from "react";

import TableRow from "../tableComponents/TableRow";
import TableRowTwo from "../tableComponents/TableRowTwo";

export default function ScanCategoryTable({
  theme,
  api_url,
  categoryData,
  onDeleteScanCategoryClicked,
  onEditScanCategoryClicked,
  structure,
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
          {!structure
            ? categoryData.map((val) => (
                <TableRow
                  key={val.id}
                  theme={theme}
                  id={val.id}
                  title={val.title}
                  color={val.color}
                  displayOrder={val.display_order}
                  date={val.created_date}
                  table={val.table_name}
                  onDeleteScanCategoryClicked={onDeleteScanCategoryClicked}
                  onEditScanCategoryClicked={onEditScanCategoryClicked}
                />
              ))
            : categoryData.map((val) => (
                <TableRowTwo
                  key={val.id}
                  theme={theme}
                  id={val.id}
                  maqaa={val.maqaa}
                  muummee={val.muummee}
                  damee={val.damee}
                  daareektooretii={val.daareektooretii}
                  deeskii={val.deeskii}
                  gitahojii={val.gitahojii}
                  onDeleteScanCategoryClicked={onDeleteScanCategoryClicked}
                  onEditScanCategoryClicked={onEditScanCategoryClicked}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}
