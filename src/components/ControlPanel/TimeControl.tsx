import { Fragment } from "react";
import { formatTime } from "../../utils/time";

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
        {formatTime(clock.initial)}+{formatTime(clock.increment)}
      </p>
    )}
  </div>
);

};

export default TimeControl;
