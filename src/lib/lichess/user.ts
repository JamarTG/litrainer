import { LichessURL } from "../../constants/urls";

export const userExists = async (username: string): Promise<boolean> => {
  try {
    const response = await fetch(`${LichessURL.GamesAPI}${username}`);
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};