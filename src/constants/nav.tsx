import { nextPuzzle, prevPuzzle } from "../redux/slices/puzzle";
import { NavButton } from "../types/nav";
import { StepForward, StepBack} from "lucide-react";

export const navButtons: NavButton[] = [
  {
    label: <StepBack size={25} />,
    aria: "Previous Puzzle",
    action: prevPuzzle
  },
  {
    label: <StepForward size={25}/>,
    aria: "Next Puzzle",
    action: nextPuzzle
  }
];
