export const getStockfishVariations = (fen: string, depth = 8, multipv = 3) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./stockfishWorker.js");

    worker.postMessage({ fen, depth, multipv });

    worker.onmessage = (e) => {
      resolve(e.data);
    };

    worker.onerror = (error) => {
      reject(error);
    };
  });
};
