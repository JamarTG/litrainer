import { Puzzle } from "@/types/lichess";
import { formatTimeControl } from "@/utils/time";

interface TimeControlProps {
  initialTime: Puzzle["clock"]["initial"];
  increment: Puzzle["clock"]["increment"];
}

const TimeControl: React.FC<TimeControlProps> = ({ initialTime, increment }) => {
  return <span>{formatTimeControl(initialTime, increment)}</span>;
};

export default TimeControl;
