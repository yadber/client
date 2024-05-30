import React, { useState } from "react";

import FloatingLabel from "../simpleCoponents/FloatingLabel";

export default function ScanCategoryFrom({ theme, api_url, EditMode }) {
  const [categoryFormData, setCategoryFormData] = useState({
    category_title: "",
    display_order: "",
  });

  const OnChangeEmployeeForm = (e) => {
    const event = e.target;
    setCategoryFormData((prevState) => ({
      ...prevState,
      [event.name]: [event.value],
    }));
  };
  return (
    <div
      className={`max-w-[13rem]   border border-gray-200 rounded-3xl   ${
        theme ? "bg-gray-800" : "bg-white"
      } `}
    >
      <form className="">
        <div className=" p-3 w-full flex flex-col gap-2">
          <FloatingLabel
            theme={theme}
            title="Category Title"
            name="category_title"
            type="text"
            employeeFormData={categoryFormData.category_title}
            OnChangeEmployeeForm={OnChangeEmployeeForm}
          />
          <FloatingLabel
            title="Display Order"
            name="display_order"
            type="number"
            theme={theme}
            employeeFormData={categoryFormData.display_order}
            OnChangeEmployeeForm={OnChangeEmployeeForm}
          />
        </div>

        <div className="flex items-center before:border-t  before:flex-1 before:border-gray-300 after:border-t  after:flex-1 after:border-gray-300"></div>
        <div className="p-4">
          <button
            className={` w-full  ${
              EditMode ? "bg-yellow-600" : "bg-blue-600"
            } text-white px-7 py-3 text-xl font-medium uppercase rounded-3xl shadow-md  transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 `}
            type="submit"
          >
            {EditMode ? "EDIT" : "ADD"}
          </button>
        </div>
      </form>
    </div>
  );
}
