const evaluateFen = (
  fen: string | undefined,
  setAcceptableMoves: (moves: { move: any; eval: number }[]) => void,
  depth: number = 50,
  multipv: number = 1
): Promise<void> => {

  return new Promise((resolve) => {
    if (!fen) {
      setAcceptableMoves([]);
      resolve();
      return;
    }

    depth = 10;

    const stockfish = new Worker("./stockfish-nnue-16.js");

    stockfish.postMessage("uci");
    stockfish.postMessage(`setoption name MultiPV value ${multipv}`);
    stockfish.postMessage(`position fen ${fen}`);
    stockfish.postMessage(`go depth ${depth}`);

    const moves: { move: any; eval: number }[] = [];
    const seenMoves = new Set();

    stockfish.onmessage = (event) => {
      const data = event.data;
      if (data.startsWith("info")) {
        const parts = data.split(" ");
        const pvIndex = parts.indexOf("pv");
        const scoreIndex = parts.indexOf("score");

        if (pvIndex !== -1 && scoreIndex !== -1) {
          const pv = parts.slice(pvIndex + 1);
          const score = parseInt(parts[scoreIndex + 2], 10);

          const move = {
            move: pv[0], 
            eval: score,
          };

          if (!seenMoves.has(move.move)) {
            seenMoves.add(move.move);
            moves.push(move);
          }
        }
      } else if (data.startsWith("bestmove")) {
        setAcceptableMoves(moves);
        resolve();
        stockfish.terminate();
      }
    };
  });
};

export default evaluateFen;