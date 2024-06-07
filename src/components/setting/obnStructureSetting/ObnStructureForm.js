import React from "react";
import FloatingLabel from "../../simpleCoponents/FloatingLabel";

export default function ObnStructureForm({
  theme,
  editMode,
  cancelEditMode,
  OnChangeStructureForm,
  structureForm,
  onSubmitFormAdd,
  onSubmitFormEdit,
}) {
  return (
    <div
      className={`max-w-[13rem]   border border-gray-200 rounded-3xl   ${
        theme ? "bg-gray-800" : "bg-white"
      } `}
    >
      <form
        onSubmit={
          !editMode ? (e) => onSubmitFormAdd(e) : (e) => onSubmitFormEdit(e)
        }
      >
        <div className=" p-3 w-full flex flex-col gap-2">
          <FloatingLabel
            theme={theme}
            title="Title Category"
            name="title_category"
            type="text"
            employeeFormData={structureForm.title_category}
            OnChangeEmployeeForm={OnChangeStructureForm}
          />
          <FloatingLabel
            title="Title"
            name="title"
            type="text"
            theme={theme}
            employeeFormData={structureForm.title}
            OnChangeEmployeeForm={OnChangeStructureForm}
          />
          <FloatingLabel
            title="Subcategory of"
            name="sub_category_of"
            type="text"
            theme={theme}
            employeeFormData={structureForm.sub_category_of}
            OnChangeEmployeeForm={OnChangeStructureForm}
            required={false}
          />
          <FloatingLabel
            title="The Leader"
            name="leader"
            type="text"
            theme={theme}
            employeeFormData={structureForm.leader}
            OnChangeEmployeeForm={OnChangeStructureForm}
          />
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
      {editMode && (
        <button
          className={` w-full text-white px-7 py-3 text-sm font-medium uppercase rounded-3xl shadow-md  transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 bg-red-600`}
          onClick={() => cancelEditMode()}
        >
          Cancel Edit form
        </button>
      )}
    </div>
  );
}