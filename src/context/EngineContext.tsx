import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { UciEngine } from "../engine/uciEngine";
import { EngineName } from "../types/engine";
import { isWasmSupported } from "../engine/shared";
import { pickEngine } from "../utils/engine";

interface EngineContextProps {
  engine: UciEngine | null;
  setEngineName: (name: EngineName) => void;
}

const EngineContext = createContext<EngineContextProps | undefined>(undefined);

export const useEngineContext = () => {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error("useEngineContext must be used within an EngineProvider");
  }
  return context;
};

export const EngineProvider: React.FC<{
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

  return (
    <EngineContext.Provider value={{ engine, setEngineName }}>
      {children}
    </EngineContext.Provider>
  );
};
