import { EngineName } from "@/types/engine";
import { UciEngine } from "./uciEngine";
import { isMultiThreadSupported, isWasmSupported } from "./shared";

export class Stockfish17 extends UciEngine {
  constructor(lite?: boolean) {
    if (!isWasmSupported()) {
      throw new Error("Stockfish 17 is not supported");
    }

    const multiThreadIsSupported = isMultiThreadSupported();
    if (!multiThreadIsSupported) console.log("Single thread mode");

    let enginePath = "";
    let engineName: EngineName;

    if (!lite) {
      enginePath = "engines/stockfish-17/stockfish-17-single.js";
      engineName = EngineName.Stockfish17SingleThreaded;
      console.log("here1");
    } else if (lite && !multiThreadIsSupported) {
      enginePath = "engines/stockfish-17-lite-single/stockfish-17-lite-single.js";
      engineName = EngineName.Stockfish17LiteSingleThreaded;
      console.log("here2");
    } else {
      enginePath = "engines/stockfish-17-lite/stockfish-17-lite.js";
      engineName = EngineName.Stockfish17LiteMultiThreaded;
      console.log("here3");
    }

    super(engineName, enginePath);
  }
}
