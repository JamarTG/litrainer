import { getCurrentDateWithOffset } from "./getCurrentDateWithOffset";

export const validateDates = (startDate: string, endDate: string) => {
  const lastWeek = getCurrentDateWithOffset(-7);
  const today = getCurrentDateWithOffset(0);

  const normalizedStartDate = startDate && !isNaN(Date.parse(startDate)) ? startDate : lastWeek;
  const normalizedEndDate = endDate && !isNaN(Date.parse(endDate)) ? endDate : today;

  if (new Date(normalizedStartDate) > new Date(normalizedEndDate)) {
    return {
      valid: false,
      error: "Start date must be before end date.",
      startDate: lastWeek,
      endDate: today,
    };
  }

  return { valid: true, startDate: normalizedStartDate, endDate: normalizedEndDate };
};