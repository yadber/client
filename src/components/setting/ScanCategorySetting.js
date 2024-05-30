import React from "react";
import ScanCategoryFrom from "./ScanCategoryFrom";
import ScanCategoryTable from "./ScanCategoryTable";

export default function ScanCategorySetting({ theme, api_url }) {
  return (
    <div className="flex gap-5 p-4">
      <ScanCategoryFrom theme={theme} api_url={api_url} />
      <ScanCategoryTable theme={theme} api_url={api_url} />
    </div>
  );
}
