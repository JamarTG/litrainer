import axios from "axios";

const getCachedEval = async (fen: string, token: string, retries = 3) => {
  try {
    const response = await axios.get(
      `https://lichess.org/api/cloud-eval?fen=${encodeURIComponent(fen)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.pvs) {
      return response.data.pvs;
    } else {
      throw new Error("No moves returned from Lichess API");
    }
  } catch (error) {
    console.error("Error fetching analysis from Lichess:", error);
    if (retries > 0) {
      console.log(`Retrying... (${retries} retries left)`);
      return getCachedEval(fen, token, retries - 1);
    } else {
      throw error;
    }
  }
};

export default getCachedEval;
