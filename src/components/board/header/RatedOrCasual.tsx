import { Puzzle } from "../../../types/puzzle";

interface RatedOrCasualProps {
  isRatedGame: Puzzle["rated"];
}
const RatedOrCasual: React.FC<RatedOrCasualProps> = ({ isRatedGame }) => {
  return <span>{isRatedGame ? "Rated" : "Casual"}</span>;
};

export default RatedOrCasual;
