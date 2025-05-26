import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import usePopperDropDown from "../../../../../hooks/usePopperDropDown";
import ReactDOM from "react-dom";
import { Fields, Sort } from "../../../../../types/form";
import Calendar from "./Calendar";
import SortBy from "./SortBy";
import { convertDateToReadableFormat } from "../../../../../utils/date/date-to-readable-format";

interface DatesProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData: Dispatch<SetStateAction<Fields>>;
  formData: Fields;
}

const Dates: FC<DatesProps> = ({ handleInputChange, setFormData, formData }) => {
  const calendarDropdown = usePopperDropDown();
  const sortbyDropdown = usePopperDropDown();

  const [sortOption, setSortOption] = useState<Sort>("desc");

  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
    }));
    calendarDropdown.toggleDropdown();
  };

  const handleSortOptionSelect = (option: Sort) => {
    setSortOption(option);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sort: option,
    }));
    sortbyDropdown.toggleDropdown();
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid">
        <h1 className=" text-sm text-offWhite mb-1">Date</h1>

        <div className="relative w-[250px] flex items-center justify-center ">
          <input
            className="flex-1 text-[#222]  w-full bg-secondary h-[32px] outline-none text-textwhite caret-accent text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted pr-8"
            value={convertDateToReadableFormat(formData.startDate)}
            onChange={handleInputChange}
            ref={calendarDropdown.triggerRef}
            onClick={calendarDropdown.toggleDropdown}
            placeholder="Start Date"
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
        <div className="relative w-[250px] flex items-center mt-2">
          <input
            className="flex-1 text-[#222]  w-full bg-secondary h-[32px] outline-none caret-accent text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted pr-8"
            value={convertDateToReadableFormat(formData.endDate)}
            onChange={handleInputChange}
            ref={calendarDropdown.triggerRef}
            onClick={calendarDropdown.toggleDropdown}
            placeholder="End Date"
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
        <h1 className="text-landingText text-sm text-offWhite">Order Games</h1>
        <div className="relative  flex items-center">
          <input
            className="flex text-[#222] w-full h-[32px]   outline-none caret-accent  rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted  "
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
  );
};

export default Dates;
