import React, { ChangeEvent } from "react";
import Dates from "./dates";
import usePopperDropDown from "../../../../../features/Board/hooks/usePopperDropDown";
import ReactDOM from "react-dom";

interface SlideTwoProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideTwo: React.FC<SlideTwoProps> = ({ handleInputChange }) => {
  const timeDropdown = usePopperDropDown();

  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4">
        <Dates handleInputChange={handleInputChange} />

        <div className="flex justify-between">
          <div className="grid gap-2 w-[250px]">
            <h1 className="text-landingText text-sm text-offWhite">Player</h1>
            <input
              className="flex  w-full  bg-secondary   h-[32px]   outline-none text-textwhite caret-accent   text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted "
              placeholder="JamariTheGreat"
              // value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className=" grid gap-2 w-[128px] ">
            <h1 className="text-landingText text-sm text-offWhite">Time</h1>
            <div className="relative  flex items-center">
              <input
                className="flex  w-full  bg-secondary   h-[32px]   outline-none text-textwhite caret-accent   text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted  "
                placeholder="12:00"
                onChange={handleInputChange}
                ref={timeDropdown.triggerRef}
                onClick={timeDropdown.toggleDropdown}
              />
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 512 512"
                className="absolute right-2 text-muted pointer-events-none"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={48}
                  d="m136 208 120-104 120 104m-240 96 120 104 120-104"
                />
              </svg>
            </div>
            {timeDropdown.isOpen &&
              ReactDOM.createPortal(
                <div
                  ref={timeDropdown.dropdownRef}
                  className={`z-50 shadow-2xl  `}
                ></div>,
                document.body
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideTwo;
