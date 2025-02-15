import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

// Define the context type
interface DepthContextType {
  depth: number;
  setDepth: Dispatch<SetStateAction<number>>;
}

const DepthContext = createContext<DepthContextType | undefined>(undefined);

export function DepthProvider({ children }: { children: React.ReactNode }) {
  const [depth, setDepth] = useState<number>(12); 

  return (
    <DepthContext.Provider value={{ depth, setDepth }}>
      {children}
    </DepthContext.Provider>
  );
}


export function useDepth() {
  const context = useContext(DepthContext);
  if (!context) throw new Error("useDepth must be used within DepthProvider");
  return context;
}
