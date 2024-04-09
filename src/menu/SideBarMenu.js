import React from "react";
import Vacancy from "../pages/dms/Vacancy";
export default function SideBarMenu({ theme, api_url }) {
  return (
    <div>
      <Vacancy theme={theme} api_url={api_url} />
    </div>
  );
}
