import React from 'react';

interface ClockDisplayProps {
  clock: {
    initial: number;
    increment: number;
  };
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