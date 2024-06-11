import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SearchBar from "../simpleCoponents/SearchBar";
import AddEmployeeFrom from "./AddEmployeeFrom";
import Modal from "../complexComponents/Modal";

export default function HrComponent({ theme, api_url, forDms }) {
  const [editId, setEditId] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [employeeGender, setEmployeeGender] = useState("Dhiira");
  const [employeeProfile, setEmployeeProfile] = useState("");
  const [clickedValue, setClickedValue] = useState("");
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(false);
  const [fullNameValidation, setFullNameValidation] = useState(false);
  const [imageValidation, setImageValidation] = useState(false);
  const [allMuummee, setAllMuummee] = useState([]);
  const [employeeFormData, setEmployeeFormData] = useState({
    file_number: "",
    full_name: "",
    phone_number: "",
  });
  const [modalNameAndId, setModalNameAndId] = useState({
    id: "",
    name: "",
  });

  const [editClicked, setEditClicked] = useState(false);
  const [oldProfile, setOldProfile] = useState("");
  const [clickedValueTwo, setClickedValueTwo] = useState("Select Muummee");

  useEffect(() => {
    async function getEmployeeData() {
      const response = await fetch(`${api_url}/employeeRoute`);
      const employeeDataFromServer = await response.json();
      setEmployeeData(employeeDataFromServer);
    }
    getEmployeeData();
    getAllMuummee();
  }, [refresh]);

  function OnChangeEmployeeForm(e) {
    const element = e.target;
    setEmployeeFormData((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  }

  const getAllMuummee = () => {
    axios.get(`${api_url}/obnStructure/getMuummee`).then(function (response) {
      setAllMuummee(response.data);
    });
  };

  const onChangeDropdownForm = (val, title) => {
    setClickedValueTwo(val.muummee);
  };

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
      clickedValueTwo === "Select Muummee" ||
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
      formData.append("muummee", clickedValueTwo);
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

          phone_number: "",
        });
        setClickedValueTwo("Select Muummee");
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

  function onChangeSearchValue(e) {
    e.preventDefault();
    setSearchValue(e.target.value);
  }
  function onEmployeeCardClicked(id, name) {
    setModalNameAndId({
      id: id,
      name: name,
    });
    setShowModal(true);
  }

  function onEmployeeEditClicked(id, name) {
    setEditId(id);
    setEditClicked(true);
    const EditData = employeeData.filter((val) => val.id === id);
    setEmployeeFormData({
      file_number: EditData[0].file_number,
      full_name: EditData[0].full_name,

      phone_number: EditData[0].phone_number,
    });

    setClickedValueTwo(EditData[0].Muummee);
    setEmployeeGender(EditData[0].Gender);
    setClickedValue(EditData[0].type);
    setOldProfile(EditData[0].profile);
    setEmployeeProfile(EditData[0].profile);
  }

  const OnUpdateButtonClick = async () => {
    const url =
      oldProfile === employeeProfile
        ? `${api_url}/employeeRoute/noImage/${editId}`
        : `${api_url}/employeeRoute/${editId}`;
    if (employeeFormData.phone_number.length !== 10) {
      setPhoneNumberValidation(true);
      setInterval(() => {
        setPhoneNumberValidation(false);
      }, 6000);
    } else if (employeeFormData.full_name.length < 8) {
      setFullNameValidation(true);
      setInterval(() => {
        setFullNameValidation(false);
      }, 6000);
    } else if (
      oldProfile !== employeeProfile &&
      !employeeProfile.type.includes("image")
    ) {
      setImageValidation(true);
      setInterval(() => {
        setImageValidation(false);
      }, 6000);
    } else if (
      employeeProfile === "" ||
      employeeFormData.file_number === "" ||
      employeeFormData.full_name === "" ||
      clickedValueTwo === "Select Muummee" ||
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
      formData.append("employee_type", clickedValue);
      formData.append("phone_number", employeeFormData.phone_number);
      formData.append("gender", employeeGender);

      const NoImageData = {
        employeeFormData,
        clickedValue,
        employeeGender,
        clickedValueTwo,
      };

      const result = await axios({
        method: "post",
        url: url,
        data: oldProfile === employeeProfile ? NoImageData : formData,
        header: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data === "saved") {
        CancelEditMode();
        setRefresh((prevState) => prevState + 1);
        toast.success("Employee Updated!", {
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
  };

  const CancelEditMode = () => {
    setEditClicked(false);
    setEmployeeFormData({
      file_number: "",
      full_name: "",
      phone_number: "",
    });
    setClickedValueTwo("Select Muummee");
    setEmployeeGender("");
    setClickedValue("");
    setEmployeeProfile("");
    setOldProfile("");
  };

  return (
    <div className="flex gap-2 flex-col p-2">
      <ToastContainer />
      {!forDms && (
        <AddEmployeeFrom
          theme={theme}
          api_url={api_url}
          setRefresh={setRefresh}
          phoneNumberValidation={phoneNumberValidation}
          fullNameValidation={fullNameValidation}
          imageValidation={imageValidation}
          OnChangeEmployeeForm={OnChangeEmployeeForm}
          onRadioClicked={onRadioClicked}
          handleFileUpload={handleFileUpload}
          OnAddButtonClick={OnAddButtonClick}
          OnUpdateButtonClick={OnUpdateButtonClick}
          employeeFormData={employeeFormData}
          employeeGender={employeeGender}
          clickedValue={clickedValue}
          clickedValueTwo={clickedValueTwo}
          setClickedValue={setClickedValue}
          editClicked={editClicked}
          allMuummee={allMuummee}
          onChangeDropdownForm={onChangeDropdownForm}
          CancelEditMode={CancelEditMode}
        />
      )}
      <div className="flex gap-2 flex-col ">
        <SearchBar
          placeholder={"Search Employee using Employee Name"}
          theme={theme}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
        />
        <div className="flex flex-wrap gap-2 p-2 justify-center items-center">
          {employeeData
            .filter((val) =>
              val.full_name
                .toString()
                .toLowerCase()
                .includes(searchValue.toString().toLowerCase())
            )
            .map((val) => (
              <EmployeeCard
                api_url={api_url}
                key={val.id}
                id={val.id}
                profile={val.profile}
                theme={theme}
                name={val.full_name}
                muummee={val.Muummee}
                fileNumber={val.file_number}
                phoneNumber={val.phone_number}
                Gender={val.Gender}
                type={val.type}
                dms={val.dms}
                hr={true}
                onEmployeeEditClicked={onEmployeeEditClicked}
                onEmployeeCardClicked={onEmployeeCardClicked}
              />
            ))}
        </div>
      </div>
      {showModal && (
        <Modal
          api_url={api_url}
          theme={theme}
          name={modalNameAndId.name}
          id={modalNameAndId.id}
          showModal={showModal}
          setShowModal={setShowModal}
          hr={true}
        />
      )}
    </div>
  );
}
