export const convertDateRangetoTimestamps = (startDate: string, endDate: string) => {
  const since = new Date(startDate).getTime().toString();
  const until = new Date(endDate).getTime().toString();
  return { since, until };
};