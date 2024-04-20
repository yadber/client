import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import Gallery from "../simpleCoponents/Gallery";
import SearchBar from "../simpleCoponents/SearchBar";

import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import { FaTable } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";

import DragAndDropFileInput from "../simpleCoponents/DragAndDropFileInput";
import AccordionTabs from "../Tabs/AccordionTabs";
export default function Accordion({
  theme,
  accordionTitle,
  handleMultipleSubmit,
  handleDrop,
  files,
  handleMultipleChange,
  handleRemoveFile,
  vacancyData,
  vacancyLimitedData,
}) {
  const [accordionClicked, setAccordionClicked] = useState(false);
  const [tab, setTab] = useState("add");
  const [viewType, setViewType] = useState("gallery");
  const [searchValue, setSearchValue] = useState("");
  const pagination = true;
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [20, 500, 100];
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "vacancy number",
      flex: 1,
      filter: true,
      // valueGetter: p => p.make + ' ' + p.model},
      field: "vacancy_number",
    },
    {
      headerName: "vacancy date",
      flex: 1,
      filter: true,
      // valueGetter: p => p.make + ' ' + p.model},
      field: "vacancy_date",
    },
    {
      headerName: "File Name",
      flex: 1,
      filter: true,
      // valueGetter: p => p.make + ' ' + p.model},
      field: "file_name",
    },
    {
      headerName: "File size",
      flex: 1,
      filter: true,

      // valueGetter: p => p.make + ' ' + p.model},
      field: "file_size",
    },
  ]);
  const onChangeSearchValue = (e) => {
    const element = e.target.value;
    setSearchValue(element);

    vacancyData = vacancyData.filter((res) =>
      res.vacancy_number.includes(searchValue)
    );
  };
  return (
    <div>
      <div>
        <h2>
          <button
            className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right  border border-b-0  rounded-t-xl focus:ring-4   gap-3 ${
              theme
                ? "focus:ring-gray-800 border-gray-700 text-gray-400 hover:bg-gray-600 bg-gray-700"
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
            <AccordionTabs theme={theme} tab={tab} setTab={setTab} />
            <div
              className={`p-5 border border-b-0   animate-bounce-slow ${
                theme
                  ? "border-gray-700 bg-gray-900"
                  : "border-gray-400 bg-gray-50"
              }`}
            >
              <div className="mb-2 text-gray-500 dark:text-gray-400">
                {tab === "add" && (
                  <DragAndDropFileInput
                    theme={theme}
                    handleMultipleSubmit={handleMultipleSubmit}
                    handleDrop={handleDrop}
                    files={files}
                    handleMultipleChange={handleMultipleChange}
                    handleRemoveFile={handleRemoveFile}
                    vacancyLimitedData={vacancyLimitedData}
                  />
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
                        <div className="grid p-5 grid-cols-2 md:grid-cols-3 gap-4">
                          {searchValue
                            ? vacancyData
                                .filter((res) =>
                                  res.vacancy_number.includes(searchValue)
                                )
                                .map((res) => (
                                  <Gallery
                                    key={res.id}
                                    theme={theme}
                                    title={res.vacancy_number}
                                    url={res.file_name}
                                  />
                                ))
                            : vacancyData.map((res) => (
                                <Gallery
                                  key={res.id}
                                  theme={theme}
                                  title={res.vacancy_number}
                                  url={res.file_name}
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
