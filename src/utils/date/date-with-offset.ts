export const getCurrentDateWithOffset = (offSetDaysAsNumber: number): string => {
  const todaysDate = new Date();
  const todaysDateAsNumber = todaysDate.getDate();
  todaysDate.setDate(todaysDateAsNumber + offSetDaysAsNumber);
  return todaysDate.toISOString().split("T")[0];
};
