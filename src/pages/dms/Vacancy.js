import React, { useState, useEffect } from "react";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import Accordion from "../../components/complexComponents/Accordion";
export default function Vacancy({ theme, api_url, employee_id, hr }) {
  const [files, setFiles] = useState([]);
  const [scanCategory, setScanCategory] = useState([]);

  useEffect(() => {
    getAllScanCategory();
  }, [files]);

  const getAllScanCategory = () => {
    axios.get(`${api_url}/scanCategory`).then(function (response) {
      setScanCategory(response.data);
    });
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  function handleMultipleChange(event) {
    setFiles([...event.target.files]);
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {scanCategory.map((val) => (
          <Accordion
            hr={hr}
            key={val.id}
            api_url={api_url}
            employee_id={employee_id}
            theme={theme}
            accordionTitle={val.title}
            handleDrop={handleDrop}
            files={files}
            setFiles={setFiles}
            handleMultipleChange={handleMultipleChange}
            handleRemoveFile={handleRemoveFile}
            table={val.table_name}
          />
        ))}
      </div>
    </>
  );
}
