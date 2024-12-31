import React from "react";
import { AnalysisSource as AS } from "../../../types/eval";
import { Source } from "../../../types/eval";

interface AnalysisSourceProps {
  source: Source;
}

const AnalysisSource: React.FC<AnalysisSourceProps> = ({ source }) => {
  return (
    source && (
      <div className="flex">
        {source === AS.Stockfish && (
          <div className="flex gap-2 justify-center items-center">
            <small><i>Position Analyzed With Stockfish</i></small>
            <img
              src="/images/general/png/stockfish.png"
              width={30}
              alt={AS.Stockfish}
            />
          </div>
        )}
        {source === AS.LichessAPI && (
          <div className="flex gap-2 justify-center items-center">
            <i>Move Provided By Lichess API</i>
            <img src="/images/general/png/lichess.png" width={30} alt={AS.LichessAPI} />
          </div>
        )}
        {source === AS.Opening && (
          <div className="flex gap-2 justify-center items-center">
            <i>Position Retrieved From Opening Database</i>
            <img src="/images/general/svg/opening.svg" width={30} alt={AS.Opening} />
          </div>
        )}
      </div>
    )
  );
};

export default AnalysisSource;
