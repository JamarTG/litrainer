import React from "react";
import SubmitButtonWithModal from "../Form/SubmitButtomWithModal";

interface NoGamesFoundProps {
  theme: "light" | "dark";
}

const NoGamesFound: React.FC<NoGamesFoundProps> = ({ theme }) => {
  const headingColor = theme === "light" ? "text-gray-700" : "text-yellow-400";
  const textColor = theme === "light" ? "text-gray-600" : "text-gray-300";

  return (
    <div className="w-full md:w-[400px] h-[600px] flex flex-col gap-4 justify-center items-center p-6">
      <h2 className={`text-xl font-bold text-center ${headingColor}`}>
        No Games Found on Specified Parameters
      </h2>
      <p className={`text-base text-center ${textColor}`}>
        Try adjusting your search or explore other puzzles!
      </p>
      <div className="mt-4">
        <SubmitButtonWithModal />
      </div>
    </div>
  );
};

export default NoGamesFound;
