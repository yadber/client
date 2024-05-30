import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import ModalTabs from "../Tabs/ModalTabs";

import Vacancy from "../../pages/dms/Vacancy";
import ScanCategorySetting from "../setting/ScanCategorySetting";
export default function Modal({
  name,
  showModal,
  setShowModal,
  id,
  api_url,
  theme,
}) {
  const [clickedTab, setClickedTab] = useState("scan");
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed mt-10 top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-8xl max-h-full">
          {/*content*/}
          <div
            className={`relative  rounded-lg shadow  ${
              theme ? "bg-gray-700" : "bg-white"
            }`}
          >
            {/*header*/}
            <div
              className={`flex items-center justify-between p-4 md:p-5 border-b rounded-t ${
                theme ? "border-gray-600" : "border-gary-50"
              }`}
            >
              <h3
                className={`text-3xl uppercase font-semibold   ${
                  theme ? "text-white" : "text-gray-900"
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
            {/*body*/}
            <div className="flex flex-col p-4 md:p-5 space-y-4">
              <ModalTabs
                theme={theme}
                clickedTab={clickedTab}
                setClickedTab={setClickedTab}
              />
              <div>
                {clickedTab === "scan" && (
                  <p
                    className={`text-base leading-relaxed  ${
                      theme ? "text-gray-200" : "text-gray-800"
                    } `}
                  >
                    <Vacancy theme={theme} api_url={api_url} />
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

                {clickedTab === "setting" && (
                  <p
                    className={`text-base leading-relaxed  ${
                      theme ? "text-gray-200" : "text-gray-800"
                    } `}
                  >
                    <ScanCategorySetting theme={theme} api_url={api_url} />
                  </p>
                )}
              </div>
            </div>
            {/*footer*/}
            {/* <div
              className={`flex items-center p-4 md:p-5 border-t  rounded-b  ${
                theme ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                I accept
              </button>
              <button className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Decline
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
