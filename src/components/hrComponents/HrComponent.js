import React from "react";
import EmployeeCard from "./EmployeeCard";

import SearchBar from "../simpleCoponents/SearchBar";
export default function HrComponent({ theme, api_url }) {
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex gap-2 flex-col ">
        <SearchBar
          placeholder={"Search Employee using Employee Name"}
          theme={theme}
        />
        <div className="flex flex-wrap gap-2 p-2 justify-center items-center">
          <EmployeeCard theme={theme} />
          <EmployeeCard theme={theme} />
          <EmployeeCard theme={theme} />
          <EmployeeCard theme={theme} />
          <EmployeeCard theme={theme} />

          <EmployeeCard theme={theme} />
          <EmployeeCard theme={theme} />
          <EmployeeCard theme={theme} />
          <EmployeeCard theme={theme} />
          <EmployeeCard theme={theme} />
        </div>
      </div>
    </div>
  );
}
