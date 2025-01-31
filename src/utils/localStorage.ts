export const saveLocal = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save to local storage:", error);
    }
  };
  
  export const getLocal = (key: string) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Failed to retrieve from local storage:", error);
      return null;
    }
  };
  