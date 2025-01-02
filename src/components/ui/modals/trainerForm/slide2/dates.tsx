import React, { ChangeEvent, useState } from 'react'
import usePopperDropDown from "../../../../../features/Board/hooks/usePopperDropDown";
import Calendar from './calendar';
import ReactDOM from "react-dom";
import SortBy from './sortby';

interface DatesProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Dates: React.FC<DatesProps> = ({ handleInputChange }) => {

  const calendarDropdown = usePopperDropDown();
  const sortbyDropdown = usePopperDropDown();

  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });
  const [sortOption, setSortOption] = useState<string>("");

  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    setSelectedDates({ startDate, endDate });
    calendarDropdown.toggleDropdown(); // Close dropdown after selection
  };

  const handleSortOptionSelect = (option: string) => {
    setSortOption(option); // Update the sort option
    sortbyDropdown.toggleDropdown(); // Close dropdown after selection
  };

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString() : '';

  const displayDate = selectedDates.startDate
    ? `${formatDate(selectedDates.startDate)}${
        selectedDates.endDate ? ` - ${formatDate(selectedDates.endDate)}` : ''
      }`
    : '';
  

  return (
    <div className="flex gap-x-2">
    <div className=" grid gap-2">
      <h1 className=" text-sm text-offWhite">Date</h1>

      <div className="relative w-[250px] flex items-center">
        <input
          className="flex-1 w-full bg-secondary h-[32px] outline-none text-textwhite caret-accent text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted pr-8"
          value={displayDate}
          onChange={handleInputChange}
          ref={calendarDropdown.triggerRef}
          onClick={calendarDropdown.toggleDropdown}
          placeholder="Date"
          readOnly 
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

      {calendarDropdown.isOpen &&
        ReactDOM.createPortal(
          <div
            ref={calendarDropdown.dropdownRef}
            className={`z-50 shadow-2xl  `}
          >
            <Calendar onDateSelect={handleDateSelect} />
          </div>,
          document.body
        )}
    </div>

    <div className=" grid gap-2 w-[128px] ">
      <h1 className="text-landingText text-sm text-offWhite">Sort by</h1>
      <div className="relative  flex items-center">
        <input
          className="flex  w-full  bg-secondary   h-[32px]   outline-none text-textwhite caret-accent   text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted  "
          placeholder="Ascending"
          value={sortOption} 
          onChange={handleInputChange}
          ref={sortbyDropdown.triggerRef}
          onClick={sortbyDropdown.toggleDropdown}
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
      {sortbyDropdown.isOpen &&
        ReactDOM.createPortal(
          <div
            ref={sortbyDropdown.dropdownRef}
            className={`z-50 shadow-2xl  `}
          >
            <SortBy onSortOptionSelect={handleSortOptionSelect} />
          </div>,
          document.body
        )}
    </div>
  </div>
  )
}

export default Dates