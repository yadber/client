import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import Gallery from "../simpleCoponents/Gallery";

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
                  <div className="grid p-5 mt-10 grid-cols-2 md:grid-cols-3 gap-4">
                    {vacancyData.map((res) => (
                      <Gallery
                        key={res.id}
                        theme={theme}
                        title={res.vacancy_number}
                        url={res.file_name}
                      />
                    ))}
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
