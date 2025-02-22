import React from "react";

interface NavigationProps {
  resetBoard: (changePuzzle: () => void) => void;
  nextPuzzle: () => void;
  prevPuzzle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  resetBoard,
  prevPuzzle,
  nextPuzzle,
}) => {
  return (
    <div className="w-full md:w-[400px] flex justify-between gap-2 py-0">
      <button
        onClick={() => resetBoard(prevPuzzle)}
        className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
      >
        <span className="icon text-2xl">&#xe037;</span>
      </button>
      <button className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200">
        <span className="icon text-2xl">&#xe078;</span>
      </button>
      <button
        onClick={() => resetBoard(nextPuzzle)}
        className="flex items-center justify-center p-2 rounded-lg transition-colors duration-200"
      >
        <span className="icon text-2xl">&#xe036;</span>
      </button>
    </div>
  );
};

export default Navigation;
