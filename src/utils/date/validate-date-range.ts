import { getCurrentDateWithOffset } from './date-with-offset'

export const validateDateRange = (startDate: string, endDate: string) => {
  const defaultStartDateSevenDaysAgo = getCurrentDateWithOffset(-7)
  const defaultEndDateToday = getCurrentDateWithOffset(0)

  const validatedOrDefaultStartDate =
    startDate && !isNaN(Date.parse(startDate)) ? startDate : defaultStartDateSevenDaysAgo
  const validatedOrDefaultEndDate = endDate && !isNaN(Date.parse(endDate)) ? endDate : defaultEndDateToday
  if (new Date(validatedOrDefaultStartDate) > new Date(validatedOrDefaultEndDate)) {
    return {
      isDateRangeValid: false,
      errorMessage: 'Start date must be before end date.',
      normalizedStartDate: defaultStartDateSevenDaysAgo,
      normalizedEndDate: defaultEndDateToday
    }
  }

  return {
    isDateRangeValid: true,
    normalizedStartDate: validatedOrDefaultStartDate,
    normalizedEndDate: validatedOrDefaultEndDate
  }
}
