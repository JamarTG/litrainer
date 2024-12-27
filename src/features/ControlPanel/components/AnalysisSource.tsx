import React from "react";

interface AnalysisSourceProps {
  source: "LichessApi" | "Stockfish" | "Local" | null;
}

const AnalysisSource: React.FC<AnalysisSourceProps> = ({ source }) => {
  return (
    source && (
      <div className="flex">
        Analysis Source
        {source === "Stockfish" && (
          <img
            src="/images/general/png/stockfish.png"
            width={30}
            alt="Stockfish"
          />
        )}
        {source === "LichessApi" && (
          <img src="/images/general/png/lichess.png" width={30} alt="Lichess" />
        )}
        {source === "Local" && (
          <img src="/images/marker/Book.svg" width={30} alt="Local" />
        )}
      </div>
    )
  );
};

export default AnalysisSource;
