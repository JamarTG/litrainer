import React from 'react';
import { LichessClock } from '../../types/clock';

interface ClockDisplayProps {
  clock: LichessClock
}

const ClockDisplay: React.FC<ClockDisplayProps> = ({ clock }) => {
  return (
    <p>
      {clock && (
        <>
          {clock.initial} + {clock.increment}
        </>
      )}
    </p>
  );
};

export default ClockDisplay;