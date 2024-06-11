import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import ModalTabs from "../Tabs/ModalTabs";
import axios from "axios";
import Gallery from "../simpleCoponents/Gallery";
import Vacancy from "../../pages/dms/Vacancy";
export default function Modal({
  name,
  showModal,
  setShowModal,
  id,
  api_url,
  theme,
  hr,
}) {
  const [clickedTab, setClickedTab] = useState("scan");
  let [vacancyData, setVacancyData] = useState([]);

  useEffect(() => {
    getAllVacancyData();
  }, []);

  const getAllVacancyData = () => {
    axios.get(`${api_url}/vacancyRoute/${id}`).then(function (response) {
      setVacancyData(response.data);
    });
  };
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed mt-10 top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-2 w-full max-w-8xl max-h-full">
          <div
            className={`relative  rounded-lg shadow  ${
              theme ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div
              className={`flex items-center justify-between p-2 md:p-2 border-b rounded-t ${
                theme ? "border-gray-600" : "border-gary-50"
              }`}
            >
              <h3
                className={`text-2xl uppercase font-semibold   ${
                  theme ? "text-red-500" : "text-red-500"
                }`}
              >
                {name}
              </h3>
              <button
                className={` bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  ${
                  theme
                    ? "hover:bg-gray-600 text-gray-400 hover:text-white"
                    : "text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                }`}
                onClick={() => setShowModal(false)}
              >
                <MdCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
            <div className="flex flex-col p-1 md:p-1 ">
              <ModalTabs
                theme={theme}
                clickedTab={clickedTab}
                setClickedTab={setClickedTab}
                hr={hr}
              />
              <div>
                {clickedTab === "scan" && (
                  <p
                    className={`text-base leading-relaxed  ${
                      theme ? "text-gray-200" : "text-gray-800"
                    } `}
                  >
                    <Vacancy
                      theme={theme}
                      api_url={api_url}
                      employee_id={id}
                      hr={hr}
                    />
                  </p>
                )}

                {clickedTab === "dashboard" && (
                  <p
                    className={`text-base leading-relaxed  ${
                      theme ? "text-gray-200" : "text-gray-800"
                    } `}
                  >
                    dashboard
                  </p>
                )}

                {clickedTab === "Gallery" && (
                  <div className="flex flex-wrap items-center justify-center p-1 gap-3">
                    {vacancyData.map((res) => (
                      <Gallery
                        key={res.id}
                        theme={theme}
                        title={res.File_Order}
                        category={res.category}
                        url={res.file_name}
                        api_url={api_url}
                        PDF={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
