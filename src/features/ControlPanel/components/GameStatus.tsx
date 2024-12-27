import { Fragment } from "react/jsx-runtime";

interface GameStatusProps {
  status: string;
  winner: string | null;
}

const GameStatus: React.FC<GameStatusProps> = ({ status, winner }) => {
  return (
    <Fragment>
      {status && (
        <img
          src={`images/status/${status}${winner ? `_${winner}` : ""}.svg`}
          width={30}
          alt=""
        />
      )}
    </Fragment>
  );
};

export default GameStatus;
