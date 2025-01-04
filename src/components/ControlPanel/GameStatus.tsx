import { Puzzle } from "../../types/puzzle";

interface GameStatusProps {
  puzzle: Puzzle;
}

const GameStatus: React.FC<GameStatusProps> = ({ puzzle }) => {
  return (
    <>
      {puzzle.status && (
        <img
          src={`images/status/${puzzle.status}${puzzle.winner ? `_${puzzle.winner}` : ""}.svg`}
          width={30}
          alt=""
        />
      )}
    </>
  );
};

export default GameStatus;
