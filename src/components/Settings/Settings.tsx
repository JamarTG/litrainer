import { useState } from "react";
import EngineSwitcher from "../Engine/EngineSwitcher";
import AutoSkip from "./AutoSkip";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DepthSlider from "../Engine/DepthSlider";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleModal} type="button">
        <FontAwesomeIcon color="white" icon={faGear} />
      </button>

      {isOpen && (
        <div
          id="crud-modal"
          aria-hidden={!isOpen}
          className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Settings
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-md font-medium text-gray-700 dark:text-gray-300">
                    Set Engine
                  </p>
                  <EngineSwitcher />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-md font-medium text-gray-700 dark:text-gray-300">
                    Autoskip
                  </p>
                  <AutoSkip />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-md font-medium text-gray-700 dark:text-gray-300">
                    Depth
                  </p>
                  <DepthSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
