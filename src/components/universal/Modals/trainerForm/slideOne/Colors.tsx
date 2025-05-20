import { ChangeEvent, FC } from "react";
import { Fields } from "../../../../../types/form";

interface ColorsProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData : Fields
}

const Colors: FC<ColorsProps> = ({ handleInputChange , formData }) => {

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
              value="white"
              checked={formData.color === "white"}
              onChange={handleInputChange}
              className="hidden"
            />

            <span className={`text-sm  ${formData.color === "white" ? "text-offWhite" : "text-muted"}`}>White</span>
            {formData.color === "white" ? (
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
              name="color"
              value="black"
              checked={formData.color === "black"}
              onChange={handleInputChange}
              className="hidden"
            />

            <span className={`text-sm  ${formData.color === "black" ? "text-offWhite" : "text-muted"}`}>Black</span>

            {formData.color === "black" ? (
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
              name="color"
              value="both"
              checked={formData.color === "both"}
              onChange={handleInputChange}
              className="hidden"
            />

            <span className={`text-sm  ${formData.color === "both" ? "text-offWhite" : "text-muted"}`}>Both</span>
            {formData.color === "both" ? (
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
