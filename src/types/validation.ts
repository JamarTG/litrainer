export type ValidationResult =
  | { valid: true; startDate: string; endDate: string }
  | { valid: false; error: string; startDate: string; endDate: string };