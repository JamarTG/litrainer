import { ChangeEvent, useState } from "react";
import usePopperDropDown from "../../../../../features/Board/hooks/usePopperDropDown";
import ReactDOM from "react-dom";

interface PhasesProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Phases: React.FC<PhasesProps> = ({ handleInputChange }) => {
  const phasesDropdown = usePopperDropDown();
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);

  const phases = ["Opening", "Middlegame", "Endgame"];

  const handlePhaseClick = (phase: string) => {
    setSelectedPhases((prev) =>
      prev.includes(phase) ? prev.filter((g) => g !== phase) : [...prev, phase]
    );
  };
  return (
    <div className="grid gap-2">
      <h1 className="text-landingText text-sm text-offWhite">Phases</h1>

      <div className="relative w-full flex items-center">
        <input
          className="flex-1 w-full bg-secondary h-[32px] outline-none text-textwhite caret-accent text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted pr-8"
          placeholder="Select phases"
          value={selectedPhases.join(", ")}
          onChange={handleInputChange}
          ref={phasesDropdown.triggerRef}
          onClick={phasesDropdown.toggleDropdown}
          readOnly
        />
        <svg
          width="1em"
          height="1em"
          fill="currentColor"
          viewBox="0 0 512 512"
          className="absolute right-2 text-muted pointer-events-none"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={48}
            d="m136 208 120-104 120 104m-240 96 120 104 120-104"
          />
        </svg>

        {phasesDropdown.isOpen &&
          ReactDOM.createPortal(
            <div ref={phasesDropdown.dropdownRef} className="z-50 shadow-2xl">
              <div className="bg-secondary w-[386px] rounded-lg border border-shadowGray px-2 py-2">
                <div className="flex flex-col space-y-0">
                  {phases.map((phase) => (
                    <button
                      key={phase}
                      className={`flex justify-between px-2.5 hover:bg-tertiary hover:rounded-lg  transition-all ease-in-out`}
                      onClick={() => handlePhaseClick(phase)}
                    >
                      <div className="flex my-auto gap-x-2">
                        
                        <p className="text-sm text-offWhite my-auto">{phase}</p>
                      </div>
                      <svg viewBox="0 0 16 16" height="35" width="35">
                        <path
                          d="M0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z"
                          fill={` ${
                            selectedPhases.includes(phase) ? "#287F71" : "#424242"
                          }`}
                        />
                        <path
                          d="M5 4a4 4 0 110 8 4 4 0 010-8z"
                          fill="#ffffff"
                          className={`transition transform 0.3s ease ${
                            selectedPhases.includes(phase)
                              ? "transform translate-x-[6px]"
                              : ""
                          }`}
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Phases;
