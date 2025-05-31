export const convertDateToReadableFormat = (dateString: string) => {
  if (!dateString) return "";
  const dateFromDateString = new Date(dateString);
  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric"
  };
  return dateFromDateString.toLocaleDateString("en-US", dateTimeFormatOptions);
};
