self.onmessage = function (e) {
  const { fen, depth, multipv } = e.data;

  const stockfish = new Worker("./stockfish.js");

  stockfish.postMessage("uci");
  stockfish.postMessage(`setoption name MultiPV value ${multipv}`);
  stockfish.postMessage(`position fen ${fen}`);
  stockfish.postMessage(`go depth ${depth}`);

  stockfish.onmessage = (event) => {
    const data = event.data;
    if (data.startsWith("info")) {
      const moves = data.split(" pv ")[1]?.split(" ") || [];
      postMessage(moves);
    }
  };
};
