import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UciEngine } from '../../engine/uciEngine';
import { EngineName } from '../../types/engine';
import { Stockfish16_1 } from '../../engine/stockfish16_1';
import { Stockfish16 } from '../../engine/stockfish16';
import { Stockfish11 } from '../../engine/stockfish11';


interface EngineContextProps {
  engine: UciEngine | null;
  setEngineName: (name: EngineName) => void;
}

const EngineContext = createContext<EngineContextProps | undefined>(undefined);

export const useEngineContext = () => {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngineContext must be used within an EngineProvider');
  }
  return context;
};

export const EngineProvider: React.FC<{ children: ReactNode; initialEngineName: EngineName }> = ({ children, initialEngineName }) => {
  const [engine, setEngine] = useState<UciEngine | null>(null);
  const [engineName, setEngineName] = useState<EngineName>(initialEngineName);

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

  return (
    <EngineContext.Provider value={{ engine, setEngineName }}>
      {children}
    </EngineContext.Provider>
  );
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

const isWasmSupported = (): boolean => {
  try {
    if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
      const module = new WebAssembly.Module(Uint8Array.of(0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
      if (module instanceof WebAssembly.Module)
        return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
    }
  } catch (e) {
    return false;
  }
  return false;
};