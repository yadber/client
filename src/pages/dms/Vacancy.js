import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "../../components/complexComponents/Accordion";
export default function Vacancy({ theme, api_url }) {
  const [files, setFiles] = useState([]);
  const [vacancyLimitedData, setVacancyLimitedData] = useState([]);
  const [vacancyData, setVacancyData] = useState([]);

  useEffect(() => {
    getAllVacancyData();
    getLimitedVacancyData();
  }, [files]);

  const getLimitedVacancyData = () => {
    axios.get(`${api_url}/vacancyRoute/limit`).then(function (response) {
      setVacancyLimitedData(response.data);
    });
  };
  const getAllVacancyData = () => {
    axios.get(`${api_url}/vacancyRoute`).then(function (response) {
      setVacancyData(response.data);
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
  async function handleMultipleSubmit(event) {
    event.preventDefault();
    const url = `${api_url}/vacancyRoute`;
    const formData = new FormData();
    formData.append("vacancy", files[0]);
    const result = await axios({
      method: "post",
      url: url,
      data: formData,
      header: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    if (result.data === "saved_vacancy_post") {
      setFiles([]);
      toast.success("Vacancy saved successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }
  return (
    <>
      <div className="flex flex-col">
        <ToastContainer />
        <Accordion
          api_url={api_url}
          theme={theme}
          accordionTitle={"Vacancy"}
          handleMultipleSubmit={handleMultipleSubmit}
          handleDrop={handleDrop}
          files={files}
          handleMultipleChange={handleMultipleChange}
          handleRemoveFile={handleRemoveFile}
          vacancyData={vacancyData}
          vacancyLimitedData={vacancyLimitedData}
        />
      </div>
    </>
  );
}
