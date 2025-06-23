const convertDateToReadableFormat = (dateString: string) => {
  if (!dateString) return "";
  const dateFromDateString = new Date(dateString);
  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric"
  };
  return dateFromDateString.toLocaleDateString("en-US", dateTimeFormatOptions);
};

const getCurrentDateWithOffset = (offSetDaysAsNumber: number): string => {
  const todaysDate = new Date();
  const todaysDateAsNumber = todaysDate.getDate();
  todaysDate.setDate(todaysDateAsNumber + offSetDaysAsNumber);
  return todaysDate.toISOString().split("T")[0];
};

const dateRangeToEpochMillis = (startDate: string, endDate: string) => {
  const startTimeEpochMillis = new Date(startDate).getTime().toString();
  const endTimeEpochMillis = new Date(endDate).getTime().toString();
  return { startTimeEpochMillis, endTimeEpochMillis };
};

const validateDateRange = (startDate: string, endDate: string) => {
  const defaultStartDateSevenDaysAgo = getCurrentDateWithOffset(-7);
  const defaultEndDateToday = getCurrentDateWithOffset(0);

  const validatedOrDefaultStartDate =
    startDate && !isNaN(Date.parse(startDate)) ? startDate : defaultStartDateSevenDaysAgo;
  const validatedOrDefaultEndDate = endDate && !isNaN(Date.parse(endDate)) ? endDate : defaultEndDateToday;
  if (new Date(validatedOrDefaultStartDate) > new Date(validatedOrDefaultEndDate)) {
    return {
      isDateRangeValid: false,
      errorMessage: "Start date must be before end date.",
      normalizedStartDate: defaultStartDateSevenDaysAgo,
      normalizedEndDate: defaultEndDateToday
    };
  }

  return {
    isDateRangeValid: true,
    normalizedStartDate: validatedOrDefaultStartDate,
    normalizedEndDate: validatedOrDefaultEndDate
  };
};

export { convertDateToReadableFormat, dateRangeToEpochMillis, validateDateRange };
