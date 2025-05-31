export const dateRangeToEpochMillis = (startDate: string, endDate: string) => {
  const startTimeEpochMillis = new Date(startDate).getTime().toString()
  const endTimeEpochMillis = new Date(endDate).getTime().toString()
  return { startTimeEpochMillis, endTimeEpochMillis }
}
