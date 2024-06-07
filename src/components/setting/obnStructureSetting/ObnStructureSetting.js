import React, { useState } from "react";
import ObnStructureForm from "./ObnStructureForm";
import axios from "axios";

export default function ObnStructureSetting({ theme, api_url }) {
  const [structureForm, setStructureForm] = useState({
    title_category: "",
    title: "",
    sub_category_of: "",
    leader: "",
  });
  const [refresh, setRefresh] = useState(false);

  const onSubmitFormAdd = (e) => {
    e.preventDefault();
    axios.post(`${api_url}/obnStructure`, structureForm).then((response) => {
      if (response.data === "duplicate") {
        alert("duplicated");
        // ToastWarning("Duplicated Category Name!");
      } else {
        setRefresh((prevState) => !prevState);
        setStructureForm({
          title_category: "",
          title: "",
          sub_category_of: "",
          leader: "",
        });
        alert("saved");
        // ToastSuccess("Category saved successfully!");
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
    <div className="p-4 ml-3">
      <ObnStructureForm
        theme={theme}
        api_url={api_url}
        OnChangeStructureForm={OnChangeStructureForm}
        structureForm={structureForm}
        onSubmitFormAdd={onSubmitFormAdd}
      />
    </div>
  );
}
