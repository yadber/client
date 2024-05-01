import React, { useState } from "react";
import FloatingLabel from "../simpleCoponents/FloatingLabel";
import Radio from "../simpleCoponents/Radio";
import PhoneNumber from "../simpleCoponents/PhoneNumber";
import { IoMdPersonAdd } from "react-icons/io";
import FileInput from "../simpleCoponents/FileInput";
import ButtonOne from "../simpleCoponents/ButtonOne";
import SimpleDropdown from "../simpleCoponents/SimpleDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export default function AddEmployeeFrom({ theme, api_url, setRefresh }) {
  const [clickedValue, setClickedValue] = useState("");
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(false);
  const [fullNameValidation, setFullNameValidation] = useState(false);
  const [imageValidation, setImageValidation] = useState(false);

  const [employeeFormData, setEmployeeFormData] = useState({
    file_number: "",
    full_name: "",
    muummee: "",
    phone_number: "",
  });
  const [employeeGender, setEmployeeGender] = useState("Dhiira");
  const [employeeProfile, setEmployeeProfile] = useState("");
  function OnChangeEmployeeForm(e) {
    const element = e.target;
    setEmployeeFormData((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  }

  function onRadioClicked(value) {
    setEmployeeGender(value);
  }

  function handleFileUpload(e) {
    if (e.target.files[0]) {
      setEmployeeProfile(e.target.files[0]);
    }
  }

  async function OnAddButtonClick() {
    const url = `${api_url}/employeeRoute`;
    /* phone number length, full name length and file type front end validation */
    if (employeeFormData.phone_number.length !== 10) {
      setPhoneNumberValidation(true);
      setInterval(() => {
        setPhoneNumberValidation(false);
      }, 6000);
    } else if (employeeFormData.full_name.length < 8) {
      console.log(employeeProfile.type.includes("image"));
      setFullNameValidation(true);
      setInterval(() => {
        setFullNameValidation(false);
      }, 6000);
    } else if (!employeeProfile.type.includes("image")) {
      setImageValidation(true);
      setInterval(() => {
        setImageValidation(false);
      }, 6000);
    } else if (
      employeeProfile === "" ||
      employeeFormData.file_number === "" ||
      employeeFormData.full_name === "" ||
      employeeFormData.muumee === "" ||
      employeeFormData.phone_number === "" ||
      clickedValue === ""
    ) {
      toast.error("all fields must be field!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } else {
      let formData = new FormData();
      formData.append("image", employeeProfile);
      formData.append("file_number", employeeFormData.file_number);
      formData.append("full_name", employeeFormData.full_name);
      formData.append("muummee", employeeFormData.muummee);
      formData.append("employee_type", clickedValue);
      formData.append("phone_number", employeeFormData.phone_number);
      formData.append("gender", employeeGender);

      const result = await axios({
        method: "post",
        url: url,
        data: formData,
        header: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data === "saved") {
        setEmployeeFormData({
          file_number: "",
          full_name: "",
          muummee: "",
          phone_number: "",
        });
        setClickedValue("");
        setEmployeeProfile("");
        setEmployeeGender("Dhiira");
        setRefresh((prevState) => prevState + 1);
        toast.success("Employee saved successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else if (result.data === "file_number_exist") {
        toast.error("File Number Exists!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } else if (result.data === "phone_number_exist") {
        toast.error("Phone Number Exists!", {
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
  }
  return (
    <div className="flex flex-wrap gap-2 border-2 p-2 border-gray-500 justify-center items-center font-serif">
      <ToastContainer />
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
            title="Save"
            icon={<IoMdPersonAdd />}
            OnClick={OnAddButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
