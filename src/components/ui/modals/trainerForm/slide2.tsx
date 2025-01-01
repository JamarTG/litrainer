import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Calendar from "./calendar";
import ReactDOM from "react-dom";
import { createPopper } from "@popperjs/core";

interface SlideTwoProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideTwo: React.FC<SlideTwoProps> = ({ handleInputChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null); // Calendar container
  const elRef = useRef<HTMLInputElement>(null); // Input box

  // Effect to handle Popper positioning after rendering
  useEffect(() => {
    if (isOpen && elRef.current && calendarRef.current) {
      const popperInstance = createPopper(elRef.current, calendarRef.current, {
        placement: "bottom", // Automatically position below the input
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0,8], // Add spacing between input and calendar
            },
          },
        ],
      });

      // Clean up the popper instance when the component unmounts or when `isOpen` changes
      return () => {
        popperInstance.destroy();
      };
    }
  }, [isOpen]); // Re-run this effect whenever `isOpen` change

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4 ">
        <div className="grid gap-2">
          <div className=" grid gap-2">
            <h1 className=" text-sm text-offWhite">Date</h1>
          </div>
          <div className="relative  flex flex-row gap-x-2 w-full">
            <div className="w-full outline-none">
              <input
                className="flex rounded-lg bg-darkBackground  px-3 py-2 text-sm h-[35px] w-[250px] outline-none text-textwhite caret-accent border-tertiary border"
                placeholder="Select"
                // value={formData.startDate}
                onChange={handleInputChange}
                ref={elRef}
                onClick={toggleCalendar}
              />
            </div>



{isOpen &&
              ReactDOM.createPortal(
                <div
                  ref={calendarRef}
                  className={`z-50  `}
                  
                >
                  <Calendar />
                </div>,
                document.body
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideTwo;
