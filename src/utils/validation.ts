import { Fields } from "../types/form";
import { ValidationResult } from "../types/validation";
import { getDefaultDate } from "./time";

export const validateDates = (
  startDate: Fields["startDate"],
  endDate: Fields["endDate"]
): ValidationResult => {
  const lastWeek = getDefaultDate(-7);
  const today = getDefaultDate(0);

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