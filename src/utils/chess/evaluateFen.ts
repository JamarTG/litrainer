const evaluateFen = (
  fen: string,
  depth: number = 20,
  multipv: number = 3
): Promise<{ move: any; eval: number }[]> => {
  return new Promise((resolve) => {
    const stockfish = new Worker("./stockfish.js");

    stockfish.postMessage("uci");
    stockfish.postMessage(`setoption name MultiPV value ${multipv}`);
    stockfish.postMessage(`position fen ${fen}`);
    stockfish.postMessage(`go depth ${depth}`);

    const moves: { move: any; eval: number }[] = [];
    let bestMove: { move: any; eval: number } | null = null;

    stockfish.onmessage = (event) => {
      const data = event.data;
      console.log(`Stockfish message: ${data}`); // Log the raw message for debugging
      if (data.startsWith("info")) {
        const parts = data.split(" ");
        const pvIndex = parts.indexOf("pv");
        const scoreIndex = parts.indexOf("score");

        if (pvIndex !== -1 && scoreIndex !== -1) {
          const pv = parts.slice(pvIndex + 1);
          const score =
            parts[scoreIndex + 1] === "cp"
              ? parseInt(parts[scoreIndex + 2], 10)
              : parseInt(parts[scoreIndex + 2], 10) * 100; // Convert mate score to centipawns

          console.log(`Parsed move: ${pv[0]}, score: ${score}`);

          if (pv.length > 0) {
            const firstMove = pv[0];
            if (bestMove === null || score > bestMove.eval) {
              bestMove = { move: firstMove, eval: score };
              moves.length = 0; // Clear the moves array
            }
            if (bestMove && score >= bestMove.eval - 50) { // Consider slight deviations within 50 centipawns
              if (!moves.some(move => move.move === firstMove)) {
                moves.push({ move: firstMove, eval: score });
              }
            }
            if (moves.length === multipv) {
              resolve(moves);
              stockfish.terminate();
            }
          }
        }
      }
    };

    stockfish.postMessage(`go depth ${depth}`);
  });
};

export default evaluateFen;