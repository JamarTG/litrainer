import { ReactNode } from "react";

export interface NavButton {
  label: ReactNode;
  aria: string;
  action: Function;
}
