import { nextPuzzle, prevPuzzle } from "../redux/slices/puzzle";
import { NavButton } from "../types/nav";

export const navButtons: NavButton[] = [
  {
    label: "Previous",
    aria: "Previous Puzzle",
    action: prevPuzzle
  },
  {
    label: "Next",
    aria: "Next Puzzle",
    action: nextPuzzle
  }
];
