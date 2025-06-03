import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export interface DepthContextType {
  depth: number;
  setDepth: Dispatch<SetStateAction<number>>;
}

export const DepthContext = createContext<DepthContextType | undefined>(undefined);

export function DepthProvider({ children }: { children: ReactNode }) {
  const [depth, setDepth] = useState<number>(12);

  return <DepthContext.Provider value={{ depth, setDepth }}>{children}</DepthContext.Provider>;
}
