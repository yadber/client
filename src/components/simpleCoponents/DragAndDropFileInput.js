import React from "react";
import { FaCloudUploadAlt, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LuScanLine } from "react-icons/lu";
import { CiWarning } from "react-icons/ci";
import { FcApprove } from "react-icons/fc";
import Gallery from "./Gallery";
import ButtonOne from "./ButtonOne";

export default function DragAndDropFileInput({
  theme,
  handleMultipleSubmit,
  handleDrop,
  files,
  handleMultipleChange,
  handleRemoveFile,
  vacancyLimitedData,
  api_url,
}) {
  return (
    <div className="flex flex-row gap-3">
      <div className="md:basis-3/4">
        {
          <div
            className="flex flex-col  w-full"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <div className={`flex justify-end`}>
              {" "}
              <LuScanLine
                className={`text-3xl cursor-pointer font-bold ${
                  theme
                    ? " text-gray-500 hover:text-gray-400"
                    : "text-gray-700 hover:text-gray-400"
                } `}
              />
            </div>
            <label
              className={`flex flex-col items-center justify-center w-full ${
                files.length > 0 ? " h-28" : "h-64"
              } border-2  border-dashed rounded-lg cursor-pointer   ${
                theme
                  ? "hover:bg-gray-600 bg-gray-700 border-gray-600 "
                  : "border-gray-300 bg-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudUploadAlt className="text-5xl" />
                <div
                  className={`mb-2 text-sm font-serif   ${
                    theme ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <span className=" font-serif font-semibold">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </div>
                <div
                  className={`text-xs font-serif  ${
                    theme ? "dark:text-gray-400" : "text-gray-500"
                  }`}
                >
                  SVG, PNG, JPG, PDF or GIF
                </div>
              </div>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .pdf, .docx, .pptx, .txt, .xlsx"
                className="hidden"
                name="vacancy"
                // multiple
                onChange={handleMultipleChange}
              />
            </label>
            <div
              className={`flex mt-2 w-full lg:w-fit items-center p-4 mb-4 text-sm  rounded-lg     ${
                theme
                  ? "bg-gray-800 border-yellow-800 text-yellow-300"
                  : "text-yellow-800 border border-yellow-300 bg-yellow-50"
              }`}
            >
              <CiWarning />
              <div className="font-serif  items-center justify-center hidden lg:flex lg:text-sm">
                The file naming must start with vacancy number then vacancy date
              </div>
              <div className="font-serif  items-center justify-center flex lg:hidden lg:text-sm">
                file naming
              </div>

              <div className="flex items-center justify-center">
                <FcApprove />
                <span className="font-bold">obn-123-200(23-12-2012)</span>
              </div>
            </div>
          </div>
        }

        {files.length > 0 && (
          <div className="">
            {files.map((file, index) => (
              <div
                className=" mt-2 flex items-start justify-center gap-3  w-full p-5 rounded-2xl bg-transparent border-2 border-gray-500 dark:border-gray-500"
                key={index}
              >
                <div className="w-full flex flex-row text-x items-center justify-between gap-10">
                  <p
                    className={` font-sans text-lg ${
                      theme ? " text-white " : " text-black"
                    } `}
                  >
                    {file.name}
                  </p>
                  <p
                    className={`font-sans text-lg hidden md:flex ${
                      theme ? " text-white" : "text-black"
                    } `}
                  >
                    {file.type}
                  </p>
                  <MdDelete
                    onClick={() => handleRemoveFile(index)}
                    className="text-xl hover:text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {files.length > 0 && (
          <div className="mt-2 flex justify-end">
            <ButtonOne
              theme={theme}
              title="Upload"
              icon={<FaUpload />}
              OnClick={handleMultipleSubmit}
            />
          </div>
        )}
      </div>
      <div
        className={`hidden md:flex basis-1/4 p-3 border-2 border-red-900 rounded-xl`}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {vacancyLimitedData.map((res) => (
            <Gallery
              key={res.id}
              theme={theme}
              title={res.vacancy_number}
              url={res.file_name}
              dragAndDrop={true}
              api_url={api_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
