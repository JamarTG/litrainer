import { ChangeEvent, FC } from "react";
import usePopperDropDown from "@/hooks/usePopperDropDown";
import ReactDOM from "react-dom";
import GameSpeedIcon from "@/components/shared/GameSpeedIcon";
import { TimeControls } from "@/constants/form";
import List from "@/components/common/List";
import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { ICON_SIZES } from "@/constants/ui";
import { Fields, GameType } from "@/types/lichess";

interface GamesProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleGameTypesChange: (a: string) => void;
  formData: Fields;
}

const Games: FC<GamesProps> = ({ handleInputChange, handleGameTypesChange, formData }) => {
  const gamesDropdown = usePopperDropDown();

  const renderTimeControl = (timeControl: GameType) => (
    // <ToggleSwitch />
    <button
      key={timeControl}
      name="timeControls"
      className={`flex justify-between px-2.5 hover:bg-tertiary hover:rounded-lg  transition-all ease-in-out`}
      onClick={() => handleGameTypesChange(timeControl)}
    >
      <div className="flex text-[#000] dark:text-[#fff] items-center my-auto gap-x-2">
        <GameSpeedIcon size={ICON_SIZES.MEDIUM} speed={timeControl} />
        {timeControl}
      </div>
      <ToggleSwitch isOn={formData.gameTypes.includes(timeControl)} />
    </button>
  );

  return (
    <div className="grid gap-2">
      <h1 className="text-landingText text-sm text-offWhite">Time controls</h1>

      <div className="relative w-full flex items-center">
        <input
          className="cursor-pointer flex-1 text-[#222]  w-full bg-secondary h-[32px] outline-none text-textwhite caret-accent text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted pr-8"
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
              style={{ zIndex: 80 }}
              className="bg-white shadow-2xl w-[386px] dark:bg-zinc-900 dark:text-white rounded-md border border-gray-200"
            >
              <div className="flex flex-col space-y-0">
                <List items={TimeControls} renderItem={renderTimeControl} />
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Games;
