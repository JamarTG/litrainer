import React from 'react';

interface MoveListProps {
  history: string[];
  undoneMoves: string[];
  redoMove: () => void;
    undoMove: () => void;
}

const MoveList: React.FC<MoveListProps> = ({ history, undoneMoves }) => {
  const combinedHistory = [...history, ...undoneMoves];
  const highlightIndex = history.length - 1;

  return (
    <div className="move-list">
      <h3 className="text-lg font-bold">Move List</h3>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto h-32">
        {combinedHistory.map((move, index) => (
          <p
            key={index}
            className={`flex justify-center items-center h-6 w-16 ${index === highlightIndex ? 'bg-red-900 rounded-sm' : ''} `}
          >
            {index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ${move}` : move}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MoveList;