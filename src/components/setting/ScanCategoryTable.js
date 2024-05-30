import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ScanCategoryTable({ theme, api_url }) {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getAllScanCategory();
  }, []);

  const getAllScanCategory = () => {
    axios.get(`${api_url}/scanCategory`).then(function (response) {
      setCategoryData(response.data);
    });
  };
  return <div>table{categoryData.map((val) => val.id)}</div>;
}
