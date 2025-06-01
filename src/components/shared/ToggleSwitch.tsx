import React from "react";

interface ToggleSwitchProps {
  handleToggleSwitch?: () => void;
  isOn: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ handleToggleSwitch, isOn }) => {
  return (
    <button onClick={handleToggleSwitch}>
      <svg viewBox="0 0 16 16" height="35" width="35">
        <path d="M0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z" fill={` ${isOn ? "#287F71" : "#424242"}`} />
        <path
          d="M5 4a4 4 0 110 8 4 4 0 010-8z"
          fill="#ffffff"
          className={`transition transform 0.3s ease ${isOn ? "transform translate-x-[6px]" : ""}`}
        />
      </svg>
    </button>
  );
};

export default ToggleSwitch;
