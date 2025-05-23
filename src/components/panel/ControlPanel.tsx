import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import PuzzleInfo from "./PuzzleInfo";
import { RootState } from "../../redux/store";
import PieceSetChooser from "./PieceSetChooser";
import ThemeChanger from "./ThemeChanger";
import BoardThemeChooser from "./BoardThemeChooser";

const PuzzleControlPanel = () => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];
  const isDataAvailable = puzzle !== null;

  if (!isDataAvailable) return null;

  return (
    <div className="flex flex-col gap-2 w-full max-w-[350px] min-w-[220px]">
      <PuzzleInfo />
      <Navigation />
      <div className="flex items-center justify-between">
        <ThemeChanger />
        <PieceSetChooser />
        <BoardThemeChooser />
      </div>
    </div>
  );
};

export default PuzzleControlPanel;
