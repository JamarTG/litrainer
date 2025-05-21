import { FC, useState } from "react";

interface CalendarProps {
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
}

const Calendar: FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDaysInPreviousMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );

    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(clickedDate);
      setTempEndDate(null);
    } else if (clickedDate < tempStartDate) {
      setTempStartDate(clickedDate);
    } else {
      setTempEndDate(clickedDate);
    }
  };

  const isWithinRange = (date: number) => {
    if (!tempStartDate || !tempEndDate) return false;
    const current = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date
    );
    return current >= tempStartDate && current <= tempEndDate;
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPrevMonth = getDaysInPreviousMonth(year, month);

    const daysArray = [];

    const prevMonthDays = daysInPrevMonth - firstDay + 1;
    
    for (let i = prevMonthDays; i <= daysInPrevMonth; i++) {
      daysArray.push(
        <div className="py-[1.5px] w-full flex items-center justify-center">
        <div
          key={`prev-${i}`}
          className="w-7 h-7 flex items-center  justify-center rounded-md text-muted cursor-pointer"
        >
           <span className = "my-auto mx-auto">{i}</span>
        </div>
        </div>
      );
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const isSelected =
        (tempStartDate &&
          tempStartDate.getDate() === date &&
          tempStartDate.getMonth() === month &&
          tempStartDate.getFullYear() === year) ||
        (tempEndDate &&
          tempEndDate.getDate() === date &&
          tempEndDate.getMonth() === month &&
          tempEndDate.getFullYear() === year);

      const inRange = isWithinRange(date);

      daysArray.push(

        <div className="py-[1.5px] w-full flex items-center justify-center">
          <div
            key={date}
            className={`w-7 h-7  flex items-center justify-center text-center rounded-md cursor-pointer ${
              isSelected
                ? "bg-accent text-offWhite"
                : inRange
                ? "bg-accent/30 text-textWhite"
                : "hover:bg-tertiary"
            }`}
            onClick={() => handleDateClick(date)}
          >
            <span className = "my-auto mx-auto">{date}</span>
          </div>
        </div>

      
      );
    }

    const remainingDays = 7 - (daysArray.length % 7);
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push(
        <div className="py-[1.5px] w-full flex items-center justify-center">
        <div
          key={`next-${i}`}
          className="w-7 h-7 flex items-center  justify-center rounded-md text-muted cursor-pointer"
        >
           <span className = "my-auto mx-auto">{i}</span>
        </div>
        </div>
      );
    }

    return daysArray;
  };

  const handleApply = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    onDateSelect(tempStartDate, tempEndDate);
  };

  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
  };

  return (
    <div className="bg-secondary w-[250px] rounded-lg border border-shadowGray px-2 py-2">
      <div className="flex justify-between items-center text-offWhite">
        <button
          onClick={handlePrevMonth}
          className="rounded-md bg-secondary border border-shadowGray h-7 w-7"
        >
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            className="mx-auto"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={70}
              d="M328 112L184 256l144 144"
            />
          </svg>
        </button>

        <div className="text-xs py-1">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>

        <button
          onClick={handleNextMonth}
          className="rounded-md bg-secondary border border-shadowGray h-7 w-7"
        >
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            className="mx-auto"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={70}
              d="M184 112l144 144-144 144"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 py-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex items-center  justify-center text-xs text-muted w-7"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-xs text-offWhite ">{renderDays()}</div>

      <div className="flex justify-between items-center text-offWhite pt-2">
        <button
          onClick={handleCancel}
          className="rounded-md bg-secondary text-xs border border-shadowGray h-7 px-3"
        >
          Cancel
        </button>

        <button
          onClick={handleApply}
          className="rounded-md bg-accent border text-xs border-shadowGray h-7 px-3"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Calendar;
