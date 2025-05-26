import { createContext, useEffect, useState, ReactNode, FC } from "react";
import { UciEngine } from "../engine/uciEngine";
import { EngineName } from "../types/engine";
import { isWasmSupported } from "../engine/shared";
import { pickEngine } from "../libs/analysis/factory";

export interface EngineContextProps {
  engine: UciEngine | null;
  setEngineName: (name: EngineName) => void;
}

export const EngineContext = createContext<EngineContextProps | undefined>(undefined);

export const EngineProvider: FC<{
  children: ReactNode;
  initialEngineName: EngineName;
}> = ({ children, initialEngineName }) => {
  const [engine, setEngine] = useState<UciEngine | null>(null);
  const [engineName, setEngineName] = useState<EngineName>(initialEngineName);

  useEffect(() => {
    if (!engineName) return;

    if (engineName !== EngineName.Stockfish16_1Lite && !isWasmSupported()) {
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

  return <EngineContext.Provider value={{ engine, setEngineName }}>{children}</EngineContext.Provider>;
};
