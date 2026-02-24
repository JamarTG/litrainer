import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import usePopperDropDown from "@/hooks/common/usePopperDropDown";
import ReactDOM from "react-dom";
import Calendar from "../Calendar";
import SortBy from "./SortBy";
import { convertDateToReadableFormat } from "@/services/lichess";
import { Fields } from "@/typing/interfaces";
import { Sort } from "@/typing/types";
import { Sort as SortEnum } from "@/typing/enums";

interface DatesProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData: Dispatch<SetStateAction<Fields>>;
  formData: Fields;
}

const toDateOnlyString = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Dates: FC<DatesProps> = ({ handleInputChange, setFormData, formData }) => {
  const calendarDropdown = usePopperDropDown();
  const sortbyDropdown = usePopperDropDown();

  const [sortOption, setSortOption] = useState<Sort>(SortEnum.desc);

  const handleDateSelect = (startDate: Date | null, endDate: Date | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: startDate ? toDateOnlyString(startDate) : "",
      endDate: endDate ? toDateOnlyString(endDate) : ""
    }));
    calendarDropdown.toggleDropdown();
  };

  const handleSortOptionSelect = (option: Sort) => {
    setSortOption(option);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sort: option
    }));
    sortbyDropdown.toggleDropdown();
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid">
        <h1 className="text-sm text-[var(--color-muted)] mb-1">Date</h1>

        <div className="relative w-[250px] flex items-center justify-center ">
          <input
            className="cursor-pointer flex-1 w-full bg-[var(--color-surface)] h-[32px] outline-none text-[var(--color-fg)] rounded-lg border border-[var(--color-border)] px-2.5 text-sm placeholder:text-[var(--color-muted)] pr-8"
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
            className="cursor-pointer flex-1 w-full bg-[var(--color-surface)] h-[32px] outline-none text-[var(--color-fg)] rounded-lg border border-[var(--color-border)] px-2.5 text-sm placeholder:text-[var(--color-muted)] pr-8"
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
            <div style={{ zIndex: 80 }} ref={calendarDropdown.dropdownRef} className={`shadow-2xl  `}>
              <Calendar
                onDateSelect={handleDateSelect}
                initialStartDate={formData.startDate ? new Date(formData.startDate) : null}
                initialEndDate={formData.endDate ? new Date(formData.endDate) : null}
              />
            </div>,
            document.body
          )}
      </div>

      <div className=" grid gap-2 w-[128px] ">
        <h1 className="text-sm text-[var(--color-muted)]">Order Games</h1>
        <div className="relative  flex items-center">
          <input
            className="cursor-pointer flex text-[var(--color-fg)] w-full h-[32px] outline-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 text-sm placeholder:text-[var(--color-muted)]"
            placeholder="Ascending"
            value={sortOption}
            onChange={handleInputChange}
            ref={sortbyDropdown.triggerRef}
            onClick={sortbyDropdown.toggleDropdown}
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
        {sortbyDropdown.isOpen &&
          ReactDOM.createPortal(
            <div style={{ zIndex: 100 }} ref={sortbyDropdown.dropdownRef} className={`shadow-2xl  `}>
              <SortBy onSortOptionSelect={handleSortOptionSelect} />
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Dates;
