import { EngineName } from "@/types/engine";
import { Stockfish17 } from "./stockfish17";
import { UciEngine } from "./uciEngine";

export const pickEngine = (engine: EngineName): UciEngine => {
  switch (engine) {
    case EngineName.Stockfish17LiteMultiThreaded:
      return new Stockfish17(true);
    case EngineName.Stockfish17LiteSingleThreaded:
      return new Stockfish17(true);
    case EngineName.Stockfish17SingleThreaded:
      return new Stockfish17(false);
    default:
      return new Stockfish17(false);
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
