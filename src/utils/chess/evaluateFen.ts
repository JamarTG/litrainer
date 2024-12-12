const evaluateFen = (fen: string, depth: number = 20, multipv: number = 3): Promise<string[]> => {
  return new Promise((resolve) => {
    const stockfish = new Worker("./stockfish.js");

    stockfish.postMessage("uci");
    stockfish.postMessage(`setoption name MultiPV value ${multipv}`);
    stockfish.postMessage(`position fen ${fen}`);
    stockfish.postMessage(`go depth ${depth}`);

    const moves: string[] = [];

    stockfish.onmessage = (event) => {
      const data = event.data;
      if (data.startsWith("info")) {
        const pv = data.split(" pv ")[1]?.split(" ") || [];
        if (pv.length > 0) {
          const firstMove = pv[0];
          if (!moves.includes(firstMove)) {
            moves.push(firstMove);
          }
          if (moves.length === multipv) {
            resolve(moves);
            stockfish.terminate();
          }
        }
      }
    };
  });
};

export default evaluateFen;