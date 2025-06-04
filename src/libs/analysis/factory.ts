import { Stockfish16 } from "./engine/stockfish16";
import { Stockfish16_1 } from "./engine/stockfish16_1";
import { UciEngine } from "./engine/uciEngine";
import { EngineName } from "@/types/engine";

export const pickEngine = (engine: EngineName): UciEngine => {
  switch (engine) {
    case EngineName.Stockfish16_1:
      return new Stockfish16_1(false);
    case EngineName.Stockfish16_1Lite:
      return new Stockfish16_1(true);
    case EngineName.Stockfish16:
      return new Stockfish16(false);
    case EngineName.Stockfish16NNUE:
      return new Stockfish16(true);
    // REMOVED Stockfish11 file..
    // case EngineName.Stockfish11:
    // return new Stockfish11();
  }
};

export const isWasmSupported = (): boolean => {
  try {
    if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
      const module = new WebAssembly.Module(Uint8Array.of(0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
      if (module instanceof WebAssembly.Module) return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
    }
  } catch (e) {
    console.info(e);
    return false;
  }
  return false;
};
