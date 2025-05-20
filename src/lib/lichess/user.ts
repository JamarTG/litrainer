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