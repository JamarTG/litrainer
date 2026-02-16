import { ChangeEvent, FC } from "react";
import usePopperDropDown from "@/hooks/common/usePopperDropDown";
import ReactDOM from "react-dom";
import GameSpeedIcon from "@/components/shared/GameSpeedIcon";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { ICON_SIZES } from "@/constants/icons";
import { GAMES_DROPDOWN_Z_INDEX } from "@/constants/ui";
import { GameType } from "@/typing/types";
import { Fields } from "@/typing/interfaces";

interface GamesProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleGameTypesChange: (a: string) => void;
  formData: Fields;
}

const TIME_CONTROLS: GameType[] = ["bullet", "blitz", "rapid", "classical", "correspondence"];

const Games: FC<GamesProps> = ({ handleInputChange, handleGameTypesChange, formData }) => {
  const gamesDropdown = usePopperDropDown();

  const renderTimeControl = (timeControl: GameType) => (
    // <ToggleSwitch />
    <button
      key={timeControl}
      name="timeControls"
      className="flex justify-between px-2.5 py-1.5 hover:bg-[var(--color-surface-hover)] transition-colors"
      onClick={() => handleGameTypesChange(timeControl)}
    >
      <div className="flex text-[var(--color-fg)] items-center my-auto gap-x-2 capitalize">
        <GameSpeedIcon size={ICON_SIZES.MEDIUM} speed={timeControl} />
        {timeControl}
      </div>
      <ToggleSwitch isOn={formData.gameTypes.includes(timeControl)} />
    </button>
  );

  return (
    <div className="grid gap-2">
      <h1 className="text-sm text-[var(--color-muted)]">Time controls</h1>

      <div className="relative w-full flex items-center">
        <input
          className="cursor-pointer flex-1 w-full h-[32px] outline-none bg-[var(--color-surface)] text-[var(--color-fg)] rounded-lg border border-[var(--color-border)] px-2.5 text-sm placeholder:text-[var(--color-muted)] pr-8"
          placeholder="Select games"
          value={formData.gameTypes.join(",")}
          onChange={handleInputChange}
          ref={gamesDropdown.triggerRef}
          onClick={gamesDropdown.toggleDropdown}
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

        {gamesDropdown.isOpen &&
          ReactDOM.createPortal(
            <div
              ref={gamesDropdown.dropdownRef}
              style={{ zIndex: GAMES_DROPDOWN_Z_INDEX }}
              className="bg-[var(--color-surface)] text-[var(--color-fg)] shadow-sm w-[386px] rounded-md border border-[var(--color-border)]"
            >
              <div className="flex flex-col space-y-0">{TIME_CONTROLS.map(renderTimeControl)}</div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Games;
