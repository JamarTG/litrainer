import { Color, Sort } from "../types/form";

export const validateDates = (startDate: string, endDate: string) => {
  const now = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);

  if (!startDate || isNaN(Date.parse(startDate))) {
    startDate = lastWeek.toISOString().split("T")[0];
  }
  if (!endDate || isNaN(Date.parse(endDate))) {
    endDate = now.toISOString().split("T")[0];
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  if (start > end) {
    alert("Start date must be before end date.");
    return { valid: false, startDate: lastWeek.toISOString().split("T")[0], endDate: now.toISOString().split("T")[0] };
  }

  return { valid: true, startDate, endDate };
};

export const checkUserExists = async (username: string) => {
  try {
    const response = await fetch(`https://lichess.org/api/user/${username}`);
    if (!response.ok) {
      alert("User does not exist on Lichess");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};

export const atLeastOneGameType = (gameTypes: string[]) => {
  if (gameTypes.length < 1) {
    alert("No Game Type Selected");
    return false;
  }
  return true;
};

export const setDefaultMaxNoGames = (maxNoGames: number) => {
  return maxNoGames || 10;
};

export const setDefaultSort = (sort: Sort) => {
  return sort || "desc";
};

export const setDefaultColor = (color: Color): Color => {
  return color || "both";
};

export const getTimeRange = (startDate: string, endDate: string) => {
  const since = new Date(startDate).getTime().toString();
  const until = new Date(endDate).getTime().toString();
  return { since, until };
};
