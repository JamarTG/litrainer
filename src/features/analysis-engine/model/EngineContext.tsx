import { createContext, useEffect, useState, ReactNode, FC } from "react";
import { EngineName } from "@/typing/enums";
import { isWasmSupported, pickEngine, UciEngine } from "../lib";

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

    if (!isWasmSupported()) {
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