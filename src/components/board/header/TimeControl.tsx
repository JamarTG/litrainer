import { Puzzle } from "../../../types/puzzle";
import { formatTimeControl } from "../../../utils/chess/time";

interface TimeControlProps {
  initialTime: Puzzle["clock"]["initial"];
  increment: Puzzle["clock"]["increment"];
}

const TimeControl: React.FC<TimeControlProps> = ({ initialTime, increment }) => {
  return <span>{formatTimeControl(initialTime, increment)}</span>;
};

export default TimeControl;
