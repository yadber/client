import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import StackedColumn from "./StackedColumn";

export default function Dashboard({ theme, api_url }) {
  const [allEmployee, setAllEmployee] = useState([]);
  const [allMuummee, setAllMuummee] = useState([]);
  const [scannedEmployee, setScannedEmployee] = useState([]);
  const [notScannedEmployee, setNotScannedEmployee] = useState([]);

  useEffect(() => {
    getAllEmployee();
    getAllMuummee();
  }, []);

  const getAllEmployee = () => {
    axios.get(`${api_url}/employeeRoute`).then(function (response) {
      setAllEmployee(response.data);
      setScannedEmployee(response.data.filter((val) => val.dms === 1));
      setNotScannedEmployee(response.data.filter((val) => val.dms === 0));
    });
  };

  const getAllMuummee = () => {
    axios.get(`${api_url}/obnStructure/getMuummee`).then(function (response) {
      setAllMuummee(response.data);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 justify-center">
        <Card
          text="Employee Created"
          number={allEmployee.length}
          theme={theme}
        />
        <Card
          text="Employee Scanned"
          number={scannedEmployee.length}
          theme={theme}
        />
        <Card
          text="Employee Not Scanned"
          number={notScannedEmployee.length}
          theme={theme}
        />
      </div>

      <div>
        <StackedColumn allEmployee={allEmployee} allMuummee={allMuummee} />
      </div>
    </div>
  );
}
