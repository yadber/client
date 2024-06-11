import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import Gallery from "../simpleCoponents/Gallery";
import SearchBar from "../simpleCoponents/SearchBar";
import axios from "axios";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import ScanSubCategoryForm from "./ScanSubCategoryForm";
import { FaTable } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import TableRow from "../tableComponents/TableRow";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import GenerateForm from "./GenerateForm";

import DragAndDropFileInput from "../simpleCoponents/DragAndDropFileInput";
import AccordionTabs from "../Tabs/AccordionTabs";

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
export default function Accordion({
  theme,
  accordionTitle,
  handleDrop,
  files,
  handleMultipleChange,
  handleRemoveFile,
  table,
  api_url,
  setFiles,
  hr,
  employee_id,
}) {
  let [vacancyData, setVacancyData] = useState([]);
  const [subScanCategoryForms, setSubScanCategoryForms] = useState([]);
  const [accordionClicked, setAccordionClicked] = useState(false);
  const [vacancyLimitedData, setVacancyLimitedData] = useState([]);
  const [tab, setTab] = useState(hr ? "view" : "add");
  const [viewType, setViewType] = useState("gallery");
  const [searchValue, setSearchValue] = useState("");
  const [refresh, setRefresh] = useState(false);
  const pagination = true;
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [20, 500, 100];
  const [someFile, setSomeFile] = useState("");
  const [clickedValue, setClickedValue] = useState("");
  const [totalForms, setTotalForms] = useState("");
  const [clickedValueTwo, setClickedValueTwo] = useState("Form Type");
  const [textAreaOptions, setTextAreaOptions] = useState("");
  const [subCategoryTitle, setSubCategoryTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [tableId, setTableId] = useState(1);

  useEffect(() => {
    getAllVacancyData();
    getLimitedVacancyData();
    getSubCategoryFormDetail();
  }, [files, refresh]);

  const OnChangeEmployeeForm = (title, e) => {
    setSomeFile((prevState) => ({
      ...prevState,
      [title]: e.target.value,
    }));
  };
  const onChangeTextArea = (e) => {
    setTextAreaOptions(e.target.value);
  };
  const OnChangeSubCategoryTitleForm = (e) => {
    setSubCategoryTitle(e.target.value);
  };

  const onEditSubScanCategoryClicked = (id) => {
    setTableId(id);
    setEditMode(true);
    const EditedDate = subScanCategoryForms.filter((val) => val.id === id);
    setClickedValueTwo(EditedDate[0].input_type);
    setTextAreaOptions(EditedDate[0].options);
    setSubCategoryTitle(EditedDate[0].subcategory_title);
  };

  const onSubmitFormEdit = (e) => {
    e.preventDefault();
    const id = tableId;
    const subCategoryForm = {
      clickedValueTwo,
      textAreaOptions,
      subCategoryTitle,
    };
    axios
      .post(`${api_url}/subScanCategory/${id}/${table}`, subCategoryForm)
      .then((response) => {
        if (response.data === "duplicate") {
          ToastWarning("Duplicated Category Name!");
        } else {
          setRefresh((prevState) => !prevState);
          ToastSuccess("Category updated successfully!");
          cancelEditMode();
        }
      });
  };

  const onSubmitFormAdd = (e) => {
    e.preventDefault();
    if (clickedValueTwo !== "Form Type") {
      const subCategoryForm = {
        clickedValueTwo,
        textAreaOptions,
        subCategoryTitle,
      };
      axios
        .post(`${api_url}/subScanCategory/${table}`, subCategoryForm)
        .then((response) => {
          if (response.data === "duplicate") {
            toast.warning("Duplicated sub category title", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
          } else {
            setRefresh((prevState) => !prevState);
            setClickedValueTwo("Form Type");
            setTextAreaOptions("");
            setSubCategoryTitle("");
            toast.success("Sub category saved", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
          }
        });
    } else {
      toast.warning("Form Type Can not be empty", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const onChangeDropdownForm = (val, title) => {
    setClickedValue((prevState) => ({
      ...prevState,
      [title]: val,
    }));
  };

  const columnDefs = [
    {
      headerName: "File Name",
      flex: 1,
      filter: true,
      field: "file_name",
    },
    {
      headerName: "File size",
      flex: 1,
      filter: true,
      field: "file_size",
    },
    {
      headerName: "Date",
      flex: 1,
      filter: true,
      field: "date",
    },
    {
      headerName: `File Order`,
      flex: 1,
      filter: true,
      field: `File_Order`,
    },
    {
      headerName: `Gosa Qormaata ykn Bu'aa`,
      flex: 1,
      filter: true,
      field: `Gosa_Qormaata_ykn_Bu'aa`,
      cellRenderer: (params) => {
        return params.value ? params.value : " no data";
      },
    },
  ];

  const getAllVacancyData = () => {
    axios
      .get(`${api_url}/vacancyRoute/${table}/${employee_id}`)
      .then(function (response) {
        setVacancyData(response.data);
      });
  };

  const getSubCategoryFormDetail = () => {
    axios.get(`${api_url}/subScanCategory/${table}`).then(function (response) {
      setSubScanCategoryForms(response.data);
    });
    setTotalForms(subScanCategoryForms.map((val) => val.subcategory_title));
  };
  const getLimitedVacancyData = () => {
    axios
      .get(`${api_url}/vacancyRoute/limit/${table}/${employee_id}`)
      .then(function (response) {
        setVacancyLimitedData(response.data);
      });
  };
  const onChangeSearchValue = (e) => {
    const element = e.target.value;
    setSearchValue(element);

    vacancyData = vacancyData.filter((res) =>
      res.vacancy_number.includes(searchValue)
    );
  };

  async function handleMultipleSubmit(event) {
    event.preventDefault();

    const url = `${api_url}/vacancyRoute/${employee_id}/${table}/${totalForms}`;
    const formData = new FormData();
    for (var i = 0; i < totalForms.length; i++) {
      formData.append(
        `${totalForms[i]}`,
        someFile[totalForms[i]] || clickedValue[totalForms[i]]
      );
    }

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
  const cancelEditMode = () => {
    setEditMode(false);
    setClickedValueTwo("Form Type");
    setTextAreaOptions("");
    setSubCategoryTitle("");
  };
  const onDeleteScanCategoryClicked = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to DELETE this?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            axios
              .delete(`${api_url}/subScanCategory/${id}/${table}`)
              .then((response) => {
                if (response.data === "CantDelete") {
                  ToastWarning("Can Not Delete");
                } else {
                  ToastDanger("Deleted successfully!");
                  setRefresh((prevState) => !prevState);
                }
              }),
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  };
  return (
    <div>
      <div>
        <h2>
          <button
            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right  border border-b-0  rounded-t-xl focus:ring-4   gap-3 ${
              theme
                ? "focus:ring-gray-800 border-gray-700 text-gray-400 hover:bg-gray-600 bg-gray-600"
                : "text-gray-500 border-gray-100 focus:ring-gray-200  hover:bg-gray-100 bg-gray-200"
            }`}
            onClick={() => setAccordionClicked((prevState) => !prevState)}
          >
            <div className={`flex items-center gap-1 `}>
              <HiOutlineDocumentText
                className={`text-l ${theme ? "text-white" : "text-black"}`}
              />
              <span
                className={`text-l font-bold font-serif ${
                  theme ? "text-white" : "text-black"
                }`}
              >
                {accordionTitle}
              </span>
            </div>
            {!accordionClicked ? (
              <FaAngleDown
                className={`text-l hover:animate-bounce ${
                  theme ? "text-white" : "text-black"
                }`}
              />
            ) : (
              <FaAngleUp
                className={`text-l hover:animate-bounce ${
                  theme ? "text-white" : "text-black"
                }`}
              />
            )}
          </button>
        </h2>

        {accordionClicked && (
          <div>
            <AccordionTabs theme={theme} tab={tab} setTab={setTab} hr={hr} />

            <div
              className={`p-5 border border-b-0   animate-bounce-slow ${
                theme
                  ? "border-gray-700 bg-gray-900"
                  : "border-gray-400 bg-gray-50"
              }`}
            >
              <div className="mb-2 text-gray-500 dark:text-gray-400">
                {tab === "add" && (
                  <div className="flex w-full gap-2 items-center justify-center">
                    <div>
                      <div
                        className={`  border  rounded-3xl   ${
                          theme
                            ? "bg-gray-800 border-gray-400"
                            : "bg-white border-gray-500"
                        } `}
                      >
                        <div className="p-4  w-full flex flex-col gap-2 items-center justify-center">
                          {subScanCategoryForms.map((val) => (
                            <GenerateForm
                              theme={theme}
                              title={val.subcategory_title}
                              inputType={val.input_type}
                              options={val.options}
                              someFile={someFile}
                              setSomeFile={setSomeFile}
                              setClickedValue={setClickedValue}
                              clickedValue={clickedValue}
                              onChangeDropdownForm={onChangeDropdownForm}
                              OnChangeEmployeeForm={OnChangeEmployeeForm}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <DragAndDropFileInput
                      api_url={api_url}
                      theme={theme}
                      handleMultipleSubmit={handleMultipleSubmit}
                      handleDrop={handleDrop}
                      files={files}
                      handleMultipleChange={handleMultipleChange}
                      handleRemoveFile={handleRemoveFile}
                      vacancyLimitedData={vacancyLimitedData}
                    />
                  </div>
                )}
                {tab === "view" && (
                  <div>
                    <div className="flex cursor-pointer">
                      {viewType === "gallery" ? (
                        <FaTable onClick={() => setViewType("table")} />
                      ) : (
                        <GrGallery onClick={() => setViewType("gallery")} />
                      )}
                    </div>

                    {viewType === "gallery" && (
                      <div>
                        <div>
                          <SearchBar
                            onChangeSearchValue={onChangeSearchValue}
                            searchValue={searchValue}
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-center p-1 gap-3">
                          {searchValue
                            ? vacancyData
                                .filter((res) =>
                                  res.vacancy_number.includes(searchValue)
                                )
                                .map((res) => (
                                  <Gallery
                                    key={res.id}
                                    theme={theme}
                                    title={res.File_Order}
                                    url={res.file_name}
                                    api_url={api_url}
                                  />
                                ))
                            : vacancyData.map((res) => (
                                <Gallery
                                  key={res.id}
                                  theme={theme}
                                  title={res.File_Order}
                                  url={res.file_name}
                                  api_url={api_url}
                                />
                              ))}
                        </div>
                      </div>
                    )}

                    {viewType === "table" && (
                      <div className="mt-1 font-serif">
                        <div
                          className="ag-theme-quartz-dark font-serif"
                          style={{ height: 500 }}
                        >
                          <AgGridReact
                            rowData={vacancyData}
                            columnDefs={columnDefs}
                            pagination={pagination}
                            paginationPageSize={paginationPageSize}
                            paginationPageSizeSelector={
                              paginationPageSizeSelector
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {tab === "setting" && (
                  <div className="flex gap-3">
                    <ScanSubCategoryForm
                      onChangeTextArea={onChangeTextArea}
                      OnChangeSubCategoryTitleForm={
                        OnChangeSubCategoryTitleForm
                      }
                      onSubmitFormAdd={onSubmitFormAdd}
                      setClickedValueTwo={setClickedValueTwo}
                      setTextAreaOptions={setTextAreaOptions}
                      setSubCategoryTitle={setSubCategoryTitle}
                      api_url={api_url}
                      theme={theme}
                      table={table}
                      editMode={editMode}
                      setEditMode={setEditMode}
                      setRefresh={setRefresh}
                      clickedValueTwo={clickedValueTwo}
                      textAreaOptions={textAreaOptions}
                      subCategoryTitle={subCategoryTitle}
                      cancelEditMode={cancelEditMode}
                      onSubmitFormEdit={onSubmitFormEdit}
                    />
                    <div className="relative overflow-x-auto">
                      <table
                        className={`w-full text-sm text-left rtl:text-right   ${
                          theme ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <thead
                          class={`text-xs  uppercase    ${
                            theme
                              ? "bg-gray-700 text-gray-400"
                              : "text-gray-700 bg-gray-50"
                          }`}
                        ></thead>
                        <tbody>
                          {subScanCategoryForms.map((val) => (
                            <TableRow
                              key={val.id}
                              theme={theme}
                              id={val.id}
                              title={val.subcategory_title}
                              color={val.input_type}
                              displayOrder={val.options}
                              date={val.date}
                              table={val.table_name}
                              onDeleteScanCategoryClicked={
                                onDeleteScanCategoryClicked
                              }
                              onEditScanCategoryClicked={
                                onEditSubScanCategoryClicked
                              }
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
