import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState, useRef } from "react";
import { Fields, GameType } from "../../../../../types/form";
import TimeControl from "./TimeControl";
import Colors from "./Colors";
import { LichessURL } from "../../../../../constants/urls";
import useDebounce from "../../../../../hooks/useDebounceValue";

interface SlideOneProps {
  formData: Fields;
  setFormData: Dispatch<SetStateAction<Fields>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideOne: FC<SlideOneProps> = ({ formData, setFormData, handleInputChange }) => {
  const debouncedUsername = useDebounce(formData.username, 500);
  const [autoCompletedUsers, setAutoCompletedUsers] = useState<string[]>([]);
  const [keyboardHoverOption, setKeyboardHoverOption] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedUsername.length < 2) {
      setAutoCompletedUsers([]);
      setKeyboardHoverOption(-1);
      return;
    }
    const autoCompleteUser = async () => {
      const results = await fetch(`${LichessURL.AutoCompleteUser}?term=${debouncedUsername}`);
      const data = await results.json();
      setAutoCompletedUsers(data);
      setKeyboardHoverOption(-1);
    };
    autoCompleteUser();
  }, [debouncedUsername]);

  const updateFormUsername = (username: string) => {
    setFormData((formData) => ({ ...formData, username }));
    setAutoCompletedUsers([]);
    setKeyboardHoverOption(-1);
  };

  const handleInputBlur = () => {
    setKeyboardHoverOption(-1);
  };

  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4 ">
        <div className="flex flex-col gap-2 md:flex-row sm:gap-2 justify-between">
          <div className="grid gap-2">
            <h1 className="text-landingText text-sm text-offWhite">Username</h1>
            <div className="relative">
              <input
                ref={inputRef}
                className="flex text-[#222] w-full bg-secondary h-[32px] outline-none text-textwhite caret-accent text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted"
                placeholder="JamariTheGreat"
                value={formData.username}
                onKeyDown={(e) => {
                  if (e.code === "ArrowUp") {
                    e.preventDefault();
                    setKeyboardHoverOption((prev) =>
                      prev <= 0 ? autoCompletedUsers.slice(0, 5).length - 1 : prev - 1
                    );
                  } else if (e.code === "ArrowDown") {
                    e.preventDefault();
                    setKeyboardHoverOption((prev) =>
                      prev >= autoCompletedUsers.slice(0, 5).length - 1 ? 0 : prev + 1
                    );
                  } else if (e.code === "Enter" && keyboardHoverOption >= 0) {
                    e.preventDefault();
                    updateFormUsername(autoCompletedUsers[keyboardHoverOption]);
                  }
                }}
                name="username"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              {autoCompletedUsers.length > 0 && (
                <div className="absolute pb-5 text-sm dark:bg-zinc-800 dark:text-white bg-white flex flex-col w-full max-h-50 overflow-auto rounded-md z-50">
                  {autoCompletedUsers.slice(0, 5).map((username, index) => (
                    <div
                      key={username}
                      className={`px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700 ${
                        index === keyboardHoverOption ? "bg-gray-100 dark:bg-zinc-700" : ""
                      }`}
                      onClick={() => updateFormUsername(username)}
                      onMouseEnter={() => setKeyboardHoverOption(index)}
                    >
                      {username}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <h1 className="text-landingText text-sm text-offWhite">
              Max <span className="inline md:hidden"># </span>
              <span className="hidden md:inline">number </span> of games
            </h1>
            <input
              className="flex w-full bg-secondary text-[#222] h-[32px] outline-none text-textwhite caret-accent text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted"
              placeholder="10"
              value={formData.maxNoGames ?? 1}
              type="number"
              max={20}
              min={1}
              name="maxNoGames"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <TimeControl handleInputChange={handleInputChange} formData={formData} handleGameTypesChange={(game) => {
          const gameType = game.toLowerCase() as GameType;
          setFormData((prev) => ({
            ...prev,
            gameTypes: prev.gameTypes.includes(gameType)
              ? prev.gameTypes.filter((g) => g !== gameType)
              : [...prev.gameTypes, gameType],
          }));
        }} />
        <Colors handleInputChange={handleInputChange} formData={formData} />
      </div>
    </div>
  );
};

export default SlideOne;
