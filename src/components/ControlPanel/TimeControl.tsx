import { convertTimeToString } from "../../utils/time";

interface TimeControlProps {
  timeControl: string;
  clock: {
    initial: number;
    increment: number;
  };
}

const TimeControl: React.FC<TimeControlProps> = ({ clock }) => {
  return (
  <div className="space-y-2">
    {clock && (
      <p className="text-sm">
        {convertTimeToString(clock.initial)}+{convertTimeToString(clock.increment)}
      </p>
    )}
  </div>
);

};

export default TimeControl;
