import { useContext } from "react";
import { DepthContext } from "../DepthContext";
import { DepthContextType } from "../DepthContext";

export function useDepth(): DepthContextType {
  const context = useContext(DepthContext);
  if (!context) throw new Error("useDepth must be used within DepthProvider");
  return context;
}
