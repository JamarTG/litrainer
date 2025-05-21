import { Materials } from "../../types/eval";
import PlayerBadge from "./PlayerBadge";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FC, ReactNode } from "react";
// import { DEFAULT_OPPONENT_COLOR, DEFAULT_USER_COLOR } from "../../constants/board";

interface BoardWithPlayersProps {
  material: Materials;
  children: ReactNode;
}

const BoardWithPlayers: FC<BoardWithPlayersProps> = ({ material, children }) => {
  const { puzzles, currentIndex } = useSelector((state: RootState) => state.puzzle);
  const puzzle = puzzles[currentIndex];

  const userColor = puzzle?.userMove.color;
  const opponentColor = puzzle?.opponentMove.color;

  return (
    <div className="flex flex-col justify-center items-center">
      {puzzle?.players && (
        <PlayerBadge
          color={opponentColor}
          material={material}
        />
      )}
      {children}
      {puzzle?.players && (
        <PlayerBadge
          color={userColor}
          material={material}
        />
      )}
    </div>
  );
};

export default BoardWithPlayers;
