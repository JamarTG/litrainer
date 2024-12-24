import { isWasmSupported } from "../shared";
import { Stockfish11 } from "../stockfish11";
import { Stockfish16 } from "../stockfish16";
import { Stockfish16_1 } from "../stockfish16_1";
import { UciEngine } from "../uciEngine";
import { EngineName } from "../../types/engine";
import { useEffect, useState } from "react";

export const useEngine = (engineName: EngineName | undefined) => {
  const [engine, setEngine] = useState<UciEngine | null>(null);

  useEffect(() => {
    if (!engineName) return;

    if (engineName !== EngineName.Stockfish11 && !isWasmSupported()) {
      return;
    }

    const engine = pickEngine(engineName);
    engine.init().then(() => {
      setEngine(engine);
    });

    return () => {
      engine.shutdown();
    };
  }, [engineName]);

  return engine;
};

const pickEngine = (engine: EngineName): UciEngine => {
  switch (engine) {
    case EngineName.Stockfish16_1:
      return new Stockfish16_1(false);
    case EngineName.Stockfish16_1Lite:
      return new Stockfish16_1(true);
    case EngineName.Stockfish16:
      return new Stockfish16(false);
    case EngineName.Stockfish16NNUE:
      return new Stockfish16(true);
    case EngineName.Stockfish11:
      return new Stockfish11();
  }
};
