import React from "react";

interface MoveListProps {
  history: string[];
  undoneMoves: string[];
  redoMove: () => void;
  undoMove: () => void;
}

const MoveList: React.FC<MoveListProps> = ({
  history,
  undoneMoves,
  redoMove,
  undoMove,
}) => {
  const combinedHistory = [ ...history, ...undoneMoves] 
  const highlightIndex = history.length - 1;

  return (
    <div className="move-list">
      <h3 className="text-lg font-bold">Move List</h3>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto h-32">
        {combinedHistory.map((move, index) => (
          <p
            key={index}
            className={`flex justify-center items-center h-6 w-16 ${
              index === highlightIndex ? "bg-gray-400 rounded-sm" : ""
            } `}
          >
            {index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ${move.toString()}` : move.toString()}
          </p>
        ))}
      </div>
  
      <div className="flex space-x-2 mt-2">
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
          onClick={undoMove}
        >
           Previous Move
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
          onClick={redoMove}
        >
           Next Move
        </button>
      </div>
    </div>
  );
};

export default MoveList;
