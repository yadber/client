import React, { useState, useEffect } from "react";

import ObnStructureForm from "./ObnStructureForm";
import ScanCategoryTable from "../ScanCategoryTable";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

function ToastSuccess(title) {
  return toast.success(`${title}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
}

function ToastWarning(title) {
  return toast.info(`${title}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
}

function ToastDanger(title) {
  return toast.warning(`${title}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
}
export default function ObnStructureSetting({ theme, api_url }) {
  const [structureForm, setStructureForm] = useState({
    muummee: "",
    damee: "",
    daareektooretii: "",
    deeskii: "",
    gita_hojii: "",
    maqaa: "",
  });
  const [obnStructure, setObnStructure] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllObnStructure();
  }, [refresh]);

  const getAllObnStructure = () => {
    axios.get(`${api_url}/obnStructure`).then(function (response) {
      setObnStructure(response.data);
    });
  };

  const cancelEditMode = () => {
    setStructureForm({
      muummee: "",
      damee: "",
      daareektooretii: "",
      deeskii: "",
      gita_hojii: "",
      maqaa: "",
    });
  };

  const onSubmitFormAdd = (e) => {
    e.preventDefault();
    axios.post(`${api_url}/obnStructure`, structureForm).then((response) => {
      if (response.data === "duplicate") {
        ToastWarning("Duplicated Category Name!");
      } else {
        setRefresh((prevState) => !prevState);
        cancelEditMode();
        ToastSuccess("saved successfully!");
      }
    });
  };

  const OnChangeStructureForm = (e) => {
    const name = e.target.name;
    setStructureForm((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  return (
    <div className="flex gap-5 p-4">
      <ToastContainer />
      <ObnStructureForm
        theme={theme}
        api_url={api_url}
        OnChangeStructureForm={OnChangeStructureForm}
        structureForm={structureForm}
        onSubmitFormAdd={onSubmitFormAdd}
      />

      <ScanCategoryTable
        theme={theme}
        api_url={api_url}
        categoryData={obnStructure}
        structure={true}
        // onEditScanCategoryClicked={onEditScanCategoryClicked}
        // onDeleteScanCategoryClicked={onDeleteScanCategoryClicked}
      />
    </div>
  );
}
