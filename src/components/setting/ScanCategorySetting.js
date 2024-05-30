import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import ScanCategoryFrom from "./ScanCategoryFrom";
import ScanCategoryTable from "./ScanCategoryTable";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ToastSuccess(title) {
  return toast.success(`${title}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
}
function ToastWarning(title) {
  return toast.info(`${title}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
}
function ToastDanger(title) {
  return toast.warning(`${title}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
}
export default function ScanCategorySetting({ theme, api_url }) {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryFormData, setCategoryFormData] = useState({
    category_title: "",
    display_order: "",
    color: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getAllScanCategory();
  }, [refresh]);

  const getAllScanCategory = () => {
    axios.get(`${api_url}/scanCategory`).then(function (response) {
      setCategoryData(response.data);
    });
  };
  const onSubmitFormAdd = (e) => {
    e.preventDefault();
    axios.post(`${api_url}/scanCategory`, categoryFormData).then((response) => {
      if (response.data === "duplicate") {
        ToastWarning("Duplicated Category Name!");
      } else {
        setRefresh((prevState) => !prevState);
        setCategoryFormData({
          category_title: "",
          display_order: "",
          color: "",
        });
        ToastSuccess("Category saved successfully!");
      }
    });
  };

  const onSubmitFormEdit = (e) => {
    e.preventDefault();
    const id = categoryFormData.id;
    axios
      .post(`${api_url}/scanCategory/${id}`, categoryFormData)
      .then((response) => {
        if (response.data === "duplicate") {
          ToastWarning("Duplicated Category Name!");
        } else {
          setRefresh((prevState) => !prevState);
          setCategoryFormData({
            category_title: "",
            display_order: "",
            color: "",
          });
          ToastSuccess("Category updated successfully!");
          cancelEditMode();
        }
      });
  };
  const OnChangeEmployeeForm = (e) => {
    const event = e.target;
    setCategoryFormData((prevState) => ({
      ...prevState,
      [event.name]: [event.value],
    }));
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setCategoryFormData({
      category_title: "",
      display_order: "",
      color: "",
    });
  };

  const onDeleteScanCategoryClicked = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to DELETE this?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            axios.delete(`${api_url}/scanCategory/${id}`).then((data) => {
              ToastDanger("Deleted successfully!");
              setRefresh((prevState) => !prevState);
            }),
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  };
  const onEditScanCategoryClicked = (id) => {
    setEditMode(true);
    const EditedDate = categoryData.filter((val) => val.id === id);
    setCategoryFormData({
      category_title: EditedDate[0].title,
      display_order: EditedDate[0].display_order,
      id: EditedDate[0].id,
    });
  };
  return (
    <div className="flex gap-5 p-4">
      <ToastContainer />
      <ScanCategoryFrom
        theme={theme}
        api_url={api_url}
        onSubmitFormAdd={onSubmitFormAdd}
        editMode={editMode}
        setEditMode={setEditMode}
        cancelEditMode={cancelEditMode}
        OnChangeEmployeeForm={OnChangeEmployeeForm}
        categoryFormData={categoryFormData}
        onSubmitFormEdit={onSubmitFormEdit}
      />
      <ScanCategoryTable
        theme={theme}
        api_url={api_url}
        categoryData={categoryData}
        onEditScanCategoryClicked={onEditScanCategoryClicked}
        onDeleteScanCategoryClicked={onDeleteScanCategoryClicked}
      />
    </div>
  );
}
