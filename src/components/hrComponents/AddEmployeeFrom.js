import React, { useState } from "react";
import FloatingLabel from "../simpleCoponents/FloatingLabel";
import Radio from "../simpleCoponents/Radio";
import PhoneNumber from "../simpleCoponents/PhoneNumber";
import { IoMdPersonAdd } from "react-icons/io";
import FileInput from "../simpleCoponents/FileInput";
import ButtonOne from "../simpleCoponents/ButtonOne";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

export default function AddEmployeeFrom({ theme, api_url, setRefresh }) {
  const [employeeFormData, setEmployeeFormData] = useState({
    file_number: "",
    full_name: "",
    muummee: "",
    employee_type: "",
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
    if (employeeProfile === "" && employeeFormData.file_number === "") {
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
      formData.append("employee_type", employeeFormData.employee_type);
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
          employee_type: "",
          phone_number: "",
        });
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
      } else {
        console.log("error");
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
      <FloatingLabel
        theme={theme}
        title={"Haala Qaxarrii"}
        name="employee_type"
        OnChangeEmployeeForm={OnChangeEmployeeForm}
        employeeFormData={employeeFormData.employee_type}
      />
      <div className="flex justify-center items-center gap-3 ">
        <PhoneNumber
          theme={theme}
          name="phone_number"
          OnChangeEmployeeForm={OnChangeEmployeeForm}
          employeeFormData={employeeFormData.phone_number}
        />
        <FileInput theme={theme} handleFileUpload={handleFileUpload} />
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
