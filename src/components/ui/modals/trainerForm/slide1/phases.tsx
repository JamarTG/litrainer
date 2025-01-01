import { ChangeEvent, useState } from "react";

interface PhasesProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Phases: React.FC<PhasesProps> = ({ handleInputChange }) => {
  const [selectedPhase, setSelectedPhase] = useState<string>("");

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedPhase(e.target.value);
    handleInputChange(e);
  };

  return (
    <div className="grid gap-2">
      <h1 className="text-landingText text-sm text-offWhite">Phases</h1>

      <div className="w-full flex items-center justify-between gap-x-2">
        <div
          className={`flex items-center bg-secondary w-full rounded-lg h-[32px] border  px-2.5 border-shadowGray`}
        >
          <label className="flex items-center  justify-between  w-full  cursor-pointer">
            <input
              type="radio"
              name="phase"
              value="Opening"
              checked={selectedPhase === "Opening"}
              onChange={handleRadioChange}
              className="hidden"
            />

            <span className={`text-sm  ${selectedPhase === "Opening" ? "text-offWhite" : "text-muted"}`}>Opening</span>
            {selectedPhase === "Opening" ? (
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className = "text-accent"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="transition-all duration-300 text-tertiary"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
              </svg>
            )}
          </label>
        </div>

        <div
          className={`flex items-center bg-secondary w-full rounded-lg h-[32px] border  px-2.5 border-shadowGray`}
        >
          <label className="flex items-center  justify-between  w-full  cursor-pointer">
            <input
              type="radio"
              name="phase"
              value="Mid-game"
              checked={selectedPhase === "Mid-game"}
              onChange={handleRadioChange}
              className="hidden"
            />

            <span className={`text-sm  ${selectedPhase === "Mid-game" ? "text-offWhite" : "text-muted"}`}>Mid-game</span>

            {selectedPhase === "Mid-game" ? (
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className = "text-accent"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="transition-all duration-300 text-tertiary"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
              </svg>
            )}
          </label>
        </div>

        <div
          className={`flex items-center bg-secondary w-full rounded-lg h-[32px] border  px-2.5 border-shadowGray`}
        >
          <label className="flex items-center  justify-between  w-full  cursor-pointer">
            <input
              type="radio"
              name="phase"
              value="Endgame"
              checked={selectedPhase === "Endgame"}
              onChange={handleRadioChange}
              className="hidden"
            />

            <span className={`text-sm  ${selectedPhase === "Endgame" ? "text-offWhite" : "text-muted"}`}>Endgame</span>
            {selectedPhase === "Endgame" ? (
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className = "text-accent"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12zM5 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="transition-all duration-300 text-tertiary"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
              </svg>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Phases;
