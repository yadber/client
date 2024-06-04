import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import FloatingLabel from "../simpleCoponents/FloatingLabel";
import SimpleDropdown from "../simpleCoponents/SimpleDropdown";
import TextArea from "../simpleCoponents/TextArea";
import axios from "axios";

export default function ScanSubCategoryForm({
  theme,
  api_url,
  editMode,
  table,
  onSubmitFormEdit,
  setRefresh,
}) {
  const [clickedValue, setClickedValue] = useState("Form Type");
  const [textAreaOptions, setTextAreaOptions] = useState("");
  const [subCategoryTitle, setSubCategoryTitle] = useState("");

  const onChangeTextArea = (e) => {
    setTextAreaOptions(e.target.value);
  };
  const OnChangeSubCategoryTitleForm = (e) => {
    setSubCategoryTitle(e.target.value);
  };

  const onSubmitFormAdd = (e) => {
    e.preventDefault();
    if (clickedValue !== "Form Type") {
      const subCategoryForm = {
        clickedValue,
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
            setClickedValue("Form Type");
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

  return (
    <div
      className={`max-w-[13rem]   border border-gray-200 rounded-3xl   ${
        theme ? "bg-gray-800" : "bg-white"
      } `}
    >
      <ToastContainer />
      <form
        onSubmit={
          !editMode ? (e) => onSubmitFormAdd(e) : (e) => onSubmitFormEdit(e)
        }
      >
        <div className=" p-3 w-full flex flex-col gap-2 items-center">
          <FloatingLabel
            theme={theme}
            title="Sub Category Title"
            name="category_title"
            type="text"
            employeeFormData={subCategoryTitle}
            OnChangeEmployeeForm={OnChangeSubCategoryTitleForm}
          />

          <SimpleDropdown
            setClickedValue={setClickedValue}
            theme={theme}
            clickedValue={clickedValue}
            optionOne={"TextInput"}
            optionTwo={"Dropdown"}
            optionThree={"CheckBox"}
          />
          {clickedValue !== "TextInput" && (
            <TextArea
              placeholder={"options should have a space between"}
              theme={theme}
              name={"options"}
              onChangeTextArea={onChangeTextArea}
              value={textAreaOptions}
            />
          )}
        </div>

        <div className="flex items-center before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300"></div>
        <div className="p-4">
          <button
            className={` w-full  ${
              editMode ? "bg-yellow-600" : "bg-blue-600"
            } text-white px-7 py-3 text-xl font-medium uppercase rounded-3xl shadow-md  transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 `}
            type="submit"
          >
            {editMode ? "EDIT" : "ADD"}
          </button>
        </div>
      </form>
      {/* {editMode && (
    <button
      className={` w-full text-white px-7 py-3 text-sm font-medium uppercase rounded-3xl shadow-md  transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 bg-red-600`}
      onClick={() => cancelEditMode()}
    >
      Cancel Edit form
    </button>
  )} */}
    </div>
  );
}
