import { FC, useState } from "react";
import { DAYS_OF_THE_WEEK, MONTHS_OF_THE_YEAR } from "@/constants/date";
import List from "@/components/common/List";

interface CalendarProps {
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
}

const Calendar: FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDaysInPreviousMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);

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
    const current = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    return current >= tempStartDate && current <= tempEndDate;
  };

  const isStartDate = (date: number) => {
    if (!tempStartDate) return false;
    const current = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    return current.getTime() === tempStartDate.getTime();
  };

  const isEndDate = (date: number) => {
    if (!tempEndDate) return false;
    const current = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    return current.getTime() === tempEndDate.getTime();
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
            <span className="my-auto mx-auto">{i}</span>
          </div>
        </div>
      );
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const isStart = isStartDate(date);
      const isEnd = isEndDate(date);
      const inRange = isWithinRange(date);

      let dateClasses = "hover:bg-tertiary";

      if (isStart && isEnd) {
        dateClasses = "bg-zinc-800 dark:bg-zinc-700 text-white";
      } else if (isStart) {
        dateClasses = "bg-zinc-600 dark:bg-slate-800  text-white";
      } else if (isEnd) {
        dateClasses = "bg-zinc-600 dark:bg-slate-800  text-white";
      } else if (inRange) {
        dateClasses = "bg-zinc-800/50 dark:bg-slate-500/50  text-white";
      }

      daysArray.push(
        <div className="py-[1.5px] w-full flex items-center justify-center">
          <div
            key={date}
            className={`w-7 h-7  flex items-center justify-center text-center rounded-md cursor-pointer ${dateClasses}`}
            onClick={() => handleDateClick(date)}
          >
            <span className="my-auto mx-auto">{date}</span>
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
            <span className="my-auto mx-auto">{i}</span>
          </div>
        </div>
      );
    }

    return daysArray;
  };

  const renderDay = (day: (typeof DAYS_OF_THE_WEEK)[number]) => (
    <div key={day} className="flex items-center justify-center text-xs text-muted w-7">
      {day}
    </div>
  );

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
    <div className=" bg-white dark:bg-zinc-900  w-[250px] rounded-lg border border-shadowGray px-2 py-2">
      <div className="flex justify-between items-center text-offWhite">
        <button onClick={handlePrevMonth} className="rounded-md bg-secondary border border-shadowGray h-7 w-7">
          <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" className="mx-auto">
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
          {MONTHS_OF_THE_YEAR[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>

        <button onClick={handleNextMonth} className="rounded-md bg-secondary border border-shadowGray h-7 w-7">
          <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" className="mx-auto">
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
        <List items={DAYS_OF_THE_WEEK} renderItem={renderDay} />
      </div>

      <div className="grid grid-cols-7 text-xs text-offWhite ">{renderDays()}</div>

      <div className="flex justify-between items-center text-offWhite pt-2">
        <button onClick={handleCancel} className="rounded-md bg-secondary text-xs border border-shadowGray h-7 px-3">
          Cancel
        </button>

        <button onClick={handleApply} className="rounded-md bg-accent border text-xs border-shadowGray h-7 px-3">
          Apply
        </button>
      </div>
    </div>
  );
};

export default Calendar;
