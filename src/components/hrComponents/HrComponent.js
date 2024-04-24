import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";

import SearchBar from "../simpleCoponents/SearchBar";
import AddEmployeeFrom from "./AddEmployeeFrom";

export default function HrComponent({ theme, api_url }) {
  const [employeeData, setEmployeeData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function GetDirectorateList() {
      const response = await fetch(`${api_url}/employeeRoute`);
      const employeeDataFromServer = await response.json();
      setEmployeeData(employeeDataFromServer);
    }
    GetDirectorateList();
  }, [refresh]);

  function onChangeSearchValue(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  return (
    <div className="flex gap-2 flex-col p-2">
      <AddEmployeeFrom
        theme={theme}
        api_url={api_url}
        setRefresh={setRefresh}
      />
      <div className="flex gap-2 flex-col ">
        <SearchBar
          placeholder={"Search Employee using Employee Name"}
          theme={theme}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
        />
        <div className="flex flex-wrap gap-2 p-2 justify-center items-center">
          {employeeData
            .filter((val) =>
              val.full_name
                .toString()
                .toLowerCase()
                .includes(searchValue.toString().toLowerCase())
            )
            .map((val) => (
              <EmployeeCard
                api_url={api_url}
                key={val.id}
                profile={val.profile}
                theme={theme}
                name={val.full_name}
                muummee={val.Muummee}
                fileNumber={val.file_number}
                phoneNumber={val.phone_number}
                Gender={val.Gender}
                type={val.type}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
