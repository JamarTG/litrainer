import { createContext, useContext } from "react";
import { UciEngine } from "../../engine/uciEngine";
import { EngineName } from "../../types/engine";

interface EngineContextProps {
  engine: UciEngine | null;
  setEngineName: (name: EngineName) => void;
}

export const EngineContext = createContext<EngineContextProps | undefined>(undefined);

export const useEngineContext = () => {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngineContext must be used within an EngineProvider');
  }
  return context;
};