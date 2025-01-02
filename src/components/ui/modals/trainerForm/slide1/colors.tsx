import { ChangeEvent, useState } from "react";

interface ColorsProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Colors: React.FC<ColorsProps> = ({ handleInputChange }) => {
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
    handleInputChange(e);
  };

  return (
    <div className="grid gap-2">
      <h1 className="text-landingText text-sm text-offWhite">Colors</h1>

      <div className="w-full flex items-center justify-between gap-x-2">
        <div
          className={`flex items-center bg-secondary w-full rounded-lg h-[32px] border border-shadowGray px-2.5 `}
        >
          <label className="flex items-center  justify-between  w-full  cursor-pointer">
            <input
              type="radio"
              name="color"
              value="White"
              checked={selectedColor === "White"}
              onChange={handleRadioChange}
              className="hidden"
            />

            <span className={`text-sm  ${selectedColor === "White" ? "text-offWhite" : "text-muted"}`}>White</span>
            {selectedColor === "White" ? (
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className = "text-accent"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="transition-all duration-300 text-tertiary"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
              </svg>
            )}
          </label>
        </div>

        <div
          className={`flex items-center bg-secondary w-full rounded-lg h-[32px] border  px-2.5 border-shadowGray`}
        >
          <label className="flex items-center  justify-between  w-full  cursor-pointer">
            <input
              type="radio"
              name="phase"
              value="Black"
              checked={selectedColor === "Black"}
              onChange={handleRadioChange}
              className="hidden"
            />

            <span className={`text-sm  ${selectedColor === "Black" ? "text-offWhite" : "text-muted"}`}>Black</span>

            {selectedColor === "Black" ? (
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className = "text-accent"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="transition-all duration-300 text-tertiary"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
              </svg>
            )}
          </label>
        </div>

        <div
          className={`flex items-center bg-secondary w-full rounded-lg h-[32px] border  px-2.5 border-shadowGray`}
        >
          <label className="flex items-center  justify-between  w-full  cursor-pointer">
            <input
              type="radio"
              name="phase"
              value="Both"
              checked={selectedColor === "Both"}
              onChange={handleRadioChange}
              className="hidden"
            />

            <span className={`text-sm  ${selectedColor === "Both" ? "text-offWhite" : "text-muted"}`}>Both</span>
            {selectedColor === "Both" ? (
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className = "text-accent"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="transition-all duration-300 text-tertiary"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
              </svg>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Colors;
