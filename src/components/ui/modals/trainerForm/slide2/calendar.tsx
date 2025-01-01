import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), date)
    );
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPrevMonth = getDaysInPreviousMonth(year, month);

    const daysArray = [];

    // Show days from the previous month
    const prevMonthDays = daysInPrevMonth - firstDay + 1;
    for (let i = prevMonthDays; i <= daysInPrevMonth; i++) {
      daysArray.push(
        <div
          key={`prev-${i}`}
          className="w-7 h-7 flex items-center justify-center rounded-md text-muted cursor-pointer"
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    // Show days from the current month
    for (let date = 1; date <= daysInMonth; date++) {
      const isSelected =
        selectedDate?.getDate() === date &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      daysArray.push(
        <div
          key={date}
          className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer ${
            isSelected ? "bg-accent text-offWhite" : "hover:bg-tertiary"
          }`}
          onClick={() => handleDateClick(date)}
        >
          {date}
        </div>
      );
    }

    // Show days from the upcoming month to fill the grid
    const remainingDays = 7 - (daysArray.length % 7);
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push(
        <div
          key={`next-${i}`}
          className="w-7 h-7 flex items-center justify-center rounded-md text-muted cursor-pointer"
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div className="bg-secondary w-[250px] rounded-lg border border-shadowGray px-2 py-2">
      {/* Header */}
      <div className="flex justify-between items-center text-offWhite ">
        <button
          onClick={handlePrevMonth}
          className="rounded-md bg-secondary border border-shadowGray h-7 w-7 "
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

        <div className="text-sm py-1">
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

      {/* Days of the Week */}
      <div className="grid grid-cols-7 py-2 ">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center text-xs  text-muted w-7"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-xs text-offWhite ">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
