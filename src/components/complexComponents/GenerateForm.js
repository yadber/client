import React from "react";
import FloatingLabel from "../simpleCoponents/FloatingLabel";
import SimpleDropdown from "../simpleCoponents/SimpleDropdown";
import Radio from "../simpleCoponents/Radio";
export default function GenerateForm({
  theme,
  title,
  inputType,
  options,
  someFile,
  setSomeFile,
  OnChangeEmployeeForm,
  setClickedValue,
  clickedValue,
  radioValue,
  setRadioValue,
  onChangeDropdownForm,
}) {
  const optionOneByOne = options.split("/");

  return (
    <div>
      {inputType === "TextInput" && (
        <div>
          <FloatingLabel
            name={title}
            theme={theme}
            title={title}
            employeeFormData={someFile[title]}
            OnChangeEmployeeForm={OnChangeEmployeeForm}
            please={true}
          />
        </div>
      )}
      {inputType === "Dropdown" && (
        <div>
          <SimpleDropdown
            onChangeDropdownForm={onChangeDropdownForm}
            theme={theme}
            title={title}
            clickedValue={clickedValue[title]}
            multipleOptions={true}
            optionOneByOne={optionOneByOne}
          />
        </div>
      )}
      {inputType === "CheckBox" && (
        <div>
          <Radio
            please={true}
            theme={theme}
            title={title}
            optionOne={optionOneByOne[0]}
            optionTwo={optionOneByOne[1]}
            employeeGender={clickedValue[title]}
            OnChangeEmployeeForm={onChangeDropdownForm}
          />
        </div>
      )}
    </div>
  );
}
