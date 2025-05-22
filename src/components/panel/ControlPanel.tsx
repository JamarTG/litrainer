import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import PuzzleInfo from "./PuzzleInfo";
import { RootState } from "../../redux/store";
import PieceSetChooser from "./PieceSetChooser";
import ThemeChanger from "../ThemeChanger";
import BoardThemeChooser from "./BoardThemeChooser";

const PuzzleControlPanel = () => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];
  const isDataAvailable = puzzle !== null;

  if (!isDataAvailable) return null;

  return (
    <div className="flex flex-col gap-2">
      <PuzzleInfo />
      <Navigation />
      <PieceSetChooser/>
      <BoardThemeChooser/>
      <ThemeChanger/>
    </div>
  );
};

export default PuzzleControlPanel;
