import React, { useState, useEffect } from "react";
import EmployeeCard from "../hrComponents/EmployeeCard";
import SearchBar from "../simpleCoponents/SearchBar";

export default function DmsComponent({ theme, api_url }) {
  const [dmsEmployeeData, setDmsEmployeeData] = useState([]);
  const [newemployeeData, setNewEmployeeData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function getNewEmployeeData() {
      const response = await fetch(`${api_url}/employeeRoute/newEmployee`);
      const employeeDataFromServer = await response.json();
      setNewEmployeeData(employeeDataFromServer);
    }
    async function getDmsEmployeeData() {
      const response = await fetch(`${api_url}/employeeRoute/DmsEmployee`);
      const employeeDataFromServer = await response.json();
      setDmsEmployeeData(employeeDataFromServer);
    }
    getNewEmployeeData();
    getDmsEmployeeData();
  }, []);

  function onChangeSearchValue(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }

  function onEmployeeCardClicked(id) {
    //   setOpenModal(true);
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2 p-2 justify-center items-center">
        {newemployeeData.map((val) => (
          <EmployeeCard
            id={val.id}
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
            dms={val.dms}
            onEmployeeCardClicked={onEmployeeCardClicked}
          />
        ))}
      </div>
      <SearchBar
        placeholder={"Search Employee using Employee Name"}
        theme={theme}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
      />
      <div className="flex flex-wrap gap-2 p-2 justify-center items-center">
        {dmsEmployeeData
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
              id={val.id}
              profile={val.profile}
              theme={theme}
              name={val.full_name}
              muummee={val.Muummee}
              fileNumber={val.file_number}
              phoneNumber={val.phone_number}
              Gender={val.Gender}
              type={val.type}
              dms={val.dms}
              onEmployeeCardClicked={onEmployeeCardClicked}
            />
          ))}
      </div>
    </div>
  );
}
