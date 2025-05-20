import { ValidationResult } from "../types/validation";
import { getDefaultDate } from "./time";

type ValidateDatesFn = (startDate: string, endDate: string) => ValidationResult;

export const validateDates: ValidateDatesFn = (startDate, endDate) => {
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


export const userExists = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};