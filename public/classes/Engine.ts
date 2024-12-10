class Engine {
  private stockfish: Worker;
  //@ts-ignore
  private onMessage: (callback: (result: { bestMove: string }) => void) => void;
  private sendMessage: (message: string) => void;

  constructor() {
    this.stockfish = new Worker("./stockfish.js");
    this.onMessage = (callback) => {
      this.stockfish.addEventListener("message", (e) => {
        const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];

        callback({ bestMove });
      });
    };

    this.sendMessage("uci");
    this.sendMessage("isready");
  }

  evaluatePosition(fen: string, depth: number) {
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }
  stop() {
    this.sendMessage("stop"); 
  }
  quit() {
    this.sendMessage("quit"); 
  }
}
