import { Fragment } from "react";
import { formatTime } from "../../utils/time";

interface TimeControlProps {
  timeControl: string;
  clock: {
    initial: number;
    increment: number;
  };
}

const TimeControl: React.FC<TimeControlProps> = ({ timeControl, clock }) => {
  return (
    <Fragment>
      <p>{"• " + timeControl.toLocaleUpperCase()}</p>
      <p>
        {clock && (
          <>
            {"• " + formatTime(clock.initial)}+{formatTime(clock.increment)}
          </>
        )}
      </p>
    </Fragment>
  );
};

export default TimeControl;
