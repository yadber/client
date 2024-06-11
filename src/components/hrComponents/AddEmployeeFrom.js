import React from "react";
import FloatingLabel from "../simpleCoponents/FloatingLabel";
import Radio from "../simpleCoponents/Radio";
import PhoneNumber from "../simpleCoponents/PhoneNumber";
import { IoMdPersonAdd } from "react-icons/io";
import FileInput from "../simpleCoponents/FileInput";
import ButtonOne from "../simpleCoponents/ButtonOne";
import SimpleDropdown from "../simpleCoponents/SimpleDropdown";
import { MdCancel } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
export default function AddEmployeeFrom({
  theme,
  api_url,
  setRefresh,
  phoneNumberValidation,
  fullNameValidation,
  imageValidation,
  OnChangeEmployeeForm,
  onRadioClicked,
  handleFileUpload,
  OnAddButtonClick,
  employeeFormData,
  employeeGender,
  clickedValue,
  setClickedValue,
  editClicked,
  CancelEditMode,
  OnUpdateButtonClick,
}) {
  return (
    <div className="flex flex-wrap gap-2 border-2 p-2 border-gray-500 justify-center items-center font-serif">
      <FloatingLabel
        theme={theme}
        title={"Lakk. Faayilaa"}
        name="file_number"
        OnChangeEmployeeForm={OnChangeEmployeeForm}
        employeeFormData={employeeFormData.file_number}
      />
      <FloatingLabel
        theme={theme}
        title={"Maqaa Guutuu"}
        fullNameValidation={fullNameValidation}
        name="full_name"
        upperCase={true}
        OnChangeEmployeeForm={OnChangeEmployeeForm}
        employeeFormData={employeeFormData.full_name}
      />
      <Radio
        theme={theme}
        name={"gender"}
        optionOne={"Dhiira"}
        optionTwo={"Dhalaa"}
        OnChangeEmployeeForm={onRadioClicked}
        employeeGender={employeeGender}
      />
      <FloatingLabel
        theme={theme}
        title={"Muummee"}
        name="muummee"
        OnChangeEmployeeForm={OnChangeEmployeeForm}
        employeeFormData={employeeFormData.muummee}
      />
      <SimpleDropdown
        theme={theme}
        clickedValue={clickedValue}
        setClickedValue={setClickedValue}
      />
      <div className="flex justify-center items-center gap-3 ">
        <div>
          <PhoneNumber
            theme={theme}
            name="phone_number"
            OnChangeEmployeeForm={OnChangeEmployeeForm}
            employeeFormData={employeeFormData.phone_number}
            phoneNumberValidation={phoneNumberValidation}
          />
        </div>

        <FileInput
          theme={theme}
          handleFileUpload={handleFileUpload}
          accept={"image/*"}
          imageValidation={imageValidation}
        />
        <div className="mt-5">
          <ButtonOne
            theme={theme}
            title={editClicked ? "UPDATE" : "ADD"}
            icon={editClicked ? <GrUpdate /> : <IoMdPersonAdd />}
            OnClick={editClicked ? OnUpdateButtonClick : OnAddButtonClick}
          />
        </div>
        {editClicked && (
          <div className="mt-5 bg-red-500">
            <ButtonOne
              theme={theme}
              title="Cancel Edit Mode"
              icon={<MdCancel />}
              OnClick={CancelEditMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}
