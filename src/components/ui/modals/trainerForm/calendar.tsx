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

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const isSelected =
        selectedDate?.getDate() === date &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      daysArray.push(
        <div
          key={date}
          className={`w-9 h-9 flex items-center justify-center rounded-md cursor-pointer ${
            isSelected ? "bg-accent text-white" : "hover:bg-gray-200"
          }`}
          onClick={() => handleDateClick(date)}
        >
          {date}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div
      className={`bg-darkBackground border-[1.5px] border-secondary flex flex-col space-y-2 rounded-lg text-sm  p-2 max-w-[250px]`}
    >
      {/* Header */}
      <div className="flex justify-between items-center text-offWhite ">
        <button
          onClick={handlePrevMonth}
          className="rounded-md bg-primary border border-tertiary h-7 w-7 "
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

        <div className="text-sm py-2">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>

        <button
          onClick={handleNextMonth}
          className="rounded-md bg-primary border border-tertiary h-7 w-7"
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
      <div className="grid grid-cols-7 ">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center text-xs  text-tertiary"
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
