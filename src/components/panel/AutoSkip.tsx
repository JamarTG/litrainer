import { useState } from "react";

const AutoSkip = () => {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleToggleSwitch = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  return (
    <>
      <div className="w-1/2">
        <h2>Enable AutoSkip</h2>
      </div>

      <button
        onClick={handleToggleSwitch}
        className={`${
          isChecked ? "justify-end" : "justify-start"
        } ${
          isChecked ? "bg-green-500" : "bg-gray-500"
        } w-12  h-6 p-0 m-auto  rounded-full flex transition duration-500 shadow-2xl`}
      >
        <span className={`bg-gray-300 transition duration-500 rounded-full w-1/2 h-full m-0 p-0 shadow-xl`}></span>
      </button>
    </>
  );
};

export default AutoSkip;
