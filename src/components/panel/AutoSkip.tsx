import { useState } from "react";
import ToggleSwitch from "../shared/ToggleSwitch";

const AutoSkip = () => {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleToggleSwitch = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  return (
    <>
      <div className="w-1/2">
        <h2>enable autoskip</h2>
      </div>
      <div className="w-1/2">
        {" "}
        <ToggleSwitch handleToggleSwitch={handleToggleSwitch} isOn={isChecked} />
      </div>
    </>
  );
};

export default AutoSkip;
