export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    console.error(`Error loading "${key}" from localStorage`, error);
    return fallback;
  }
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving "${key}" to localStorage`, error);
  }
};
