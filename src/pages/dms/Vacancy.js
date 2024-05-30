import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "../../components/complexComponents/Accordion";
export default function Vacancy({ theme, api_url }) {
  const [files, setFiles] = useState([]);
  const [vacancyLimitedData, setVacancyLimitedData] = useState([]);
  const [vacancyData, setVacancyData] = useState([]);
  // const category = [
  //   "Vacancy ",
  //   "Beeksisa Buaa Qormaataa",
  //   "Qorannoo Fayyaa/Ashaaraa",
  //   "Waliigaltee",
  //   "Ragaa Barnootaa",
  //   "Wabii",
  //   "Xalayaa Qaxarrii/Ramaddii",
  //   "Xalayaa Adda adda",
  //   " Liqii",
  //   " Adabbii",
  //   " Boqonnaa Waggaa sick leave",
  //   " Seenaa Jireenyaa",
  //   " Muxannoo",
  //   " Madaallii/Eficiance",
  // ];

  const [scanCategory, setScanCategory] = useState([]);

  useEffect(() => {
    getAllVacancyData();
    getLimitedVacancyData();
    getAllScanCategory();
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
      <div className="flex flex-col gap-2">
        {scanCategory.map((val) => (
          <Accordion
            key={val.id}
            api_url={api_url}
            theme={theme}
            accordionTitle={val.title}
            handleMultipleSubmit={handleMultipleSubmit}
            handleDrop={handleDrop}
            files={files}
            handleMultipleChange={handleMultipleChange}
            handleRemoveFile={handleRemoveFile}
            vacancyData={vacancyData}
            vacancyLimitedData={vacancyLimitedData}
          />
        ))}
        <ToastContainer />
      </div>
    </>
  );
}
