import React from "react";

interface ToggleSwitchProps {
  handleToggleSwitch?: () => void;
  isOn: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ handleToggleSwitch, isOn }) => {
  return (
    <div
      className="w-11 h-6 flex items-center rounded-full p-0.5 transition-colors cursor-pointer"
      style={{ backgroundColor: isOn ? "var(--color-fg)" : "var(--color-border)" }}
      onClick={handleToggleSwitch}
      role="switch"
      aria-checked={isOn}
      tabIndex={0}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && handleToggleSwitch) {
          event.preventDefault();
          handleToggleSwitch();
        }
      }}
    >
      <span
        className={`h-5 w-5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] transition-transform ${isOn ? "translate-x-5" : "translate-x-0"}`}
      />
    </div>
  );
};

export default ToggleSwitch;
