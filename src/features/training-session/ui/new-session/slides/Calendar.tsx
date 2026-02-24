import { FC, useEffect, useState } from "react";

interface CalendarProps {
  onDateSelect: (startDate: Date | null, endDate: Date | null) => void;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export const DAYS_OF_THE_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const MONTHS_OF_THE_YEAR = [
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
  "December"
];

const Calendar: FC<CalendarProps> = ({ onDateSelect, initialStartDate = null, initialEndDate = null }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setTempStartDate(initialStartDate);
    setTempEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

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

      let dateClasses = "hover:bg-[var(--color-surface-hover)]";

      if (isStart && isEnd) {
        dateClasses = "bg-[var(--color-fg)] text-[var(--color-surface)]";
      } else if (isStart) {
        dateClasses = "bg-[var(--color-border-strong)] text-[var(--color-fg)]";
      } else if (isEnd) {
        dateClasses = "bg-[var(--color-border-strong)] text-[var(--color-fg)]";
      } else if (inRange) {
        dateClasses = "bg-[var(--color-surface-hover)] text-[var(--color-fg)]";
      } else {
        dateClasses = "hover:bg-[var(--color-surface-hover)] text-[var(--color-fg)]";
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
    <div className="bg-[var(--color-surface)] w-[250px] rounded-lg border border-[var(--color-border)] px-2 py-2 shadow-sm">
      <div className="flex justify-between items-center text-[var(--color-fg)]">
        <button
          onClick={handlePrevMonth}
          className="rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] h-7 w-7 hover:bg-[var(--color-surface-hover)] transition-colors"
        >
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

        <button
          onClick={handleNextMonth}
          className="rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] h-7 w-7 hover:bg-[var(--color-surface-hover)] transition-colors"
        >
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

      <div className="grid grid-cols-7 py-2">{DAYS_OF_THE_WEEK.map(renderDay)}</div>

      <div className="grid grid-cols-7 text-xs text-[var(--color-fg)]">{renderDays()}</div>

      <div className="flex justify-between items-center text-[var(--color-fg)] pt-2">
        <button
          onClick={handleCancel}
          className="rounded-md bg-[var(--color-surface)] text-xs border border-[var(--color-border)] h-7 px-3 hover:bg-[var(--color-surface-hover)] transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={handleApply}
          className="rounded-md bg-[var(--color-surface-hover)] border text-xs border-[var(--color-border)] h-7 px-3 hover:bg-[var(--color-surface-strong)] transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Calendar;
