import { useState } from "react";

const AutoSkip = () => {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleToggleSwitch = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <h2>AutoSkip Puzzle</h2>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleToggleSwitch()}
      />
    </div>
  );
};

export default AutoSkip;
