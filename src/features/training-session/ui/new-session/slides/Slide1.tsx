import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState, useRef } from "react";
import TimeControl from "./TimeControl";
import Colors from "./Colors";
import { LICHESS_URLS } from "@/constants/urls";
import useDebounce from "@/hooks/panel/useDebounceValue";
import { Fields } from "@/typing/interfaces";
import { GameType } from "@/typing/types";

interface SlideOneProps {
  formData: Fields;
  setFormData: Dispatch<SetStateAction<Fields>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DEBOUNCE_TIME = 500;
const MIN_DEBOUNCE_NAME_LENGTH = 2;
const MAX_AUTOCOMPLETED_USERS = 5;

const SlideOne: FC<SlideOneProps> = ({ formData, setFormData, handleInputChange }) => {
  const debouncedUsername = useDebounce(formData.username, DEBOUNCE_TIME);
  const [autoCompletedUsers, setAutoCompletedUsers] = useState<string[]>([]);
  const [keyboardHoverOption, setKeyboardHoverOption] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedUsername.length < MIN_DEBOUNCE_NAME_LENGTH) {
      setAutoCompletedUsers([]);
      setKeyboardHoverOption(-1);
      return;
    }
    const autoCompleteUser = async () => {
      const results = await fetch(`${LICHESS_URLS.AutoCompleteUser}?term=${debouncedUsername}`);
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

  const handleKeyboardHover = (e: React.KeyboardEvent) => {
    if (e.code === "ArrowUp") {
      e.preventDefault();
      setKeyboardHoverOption((prev) =>
        prev <= 0 ? autoCompletedUsers.slice(0, MAX_AUTOCOMPLETED_USERS).length - 1 : prev - 1
      );
    } else if (e.code === "ArrowDown") {
      e.preventDefault();
      setKeyboardHoverOption((prev) =>
        prev >= autoCompletedUsers.slice(0, MAX_AUTOCOMPLETED_USERS).length - 1 ? 0 : prev + 1
      );
    } else if (e.code === "Enter" && keyboardHoverOption >= 0) {
      e.preventDefault();
      updateFormUsername(autoCompletedUsers[keyboardHoverOption]);
    }
  };

  const firstFiveAutoCompletedUsers = autoCompletedUsers.slice(0, 5);

  const renderAutoCompletedUser = (username: string, index: number) => (
    <div
      key={username}
      className={`px-2 py-1 cursor-pointer text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] ${
        index === keyboardHoverOption ? "bg-[var(--color-surface-hover)]" : ""
      }`}
      onClick={() => updateFormUsername(username)}
      onMouseEnter={() => setKeyboardHoverOption(index)}
    >
      {username}
    </div>
  );
  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4 ">
        <div className="flex flex-col gap-2 md:flex-row sm:gap-2 justify-between">
          <div className="grid gap-2">
            <h1 className="text-xs uppercase font-semibold text-[var(--color-muted)]">Username</h1>
            <div className="relative">
              <input
                ref={inputRef}
                className="flex w-full h-[32px] outline-none bg-[var(--color-surface)] text-[var(--color-fg)] rounded-lg border border-[var(--color-border)] px-2.5 text-sm placeholder:text-[var(--color-muted)]"
                placeholder="Lichess Username"
                value={formData.username}
                onKeyDown={handleKeyboardHover}
                name="username"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              {autoCompletedUsers.length > 0 && (
                <div className="absolute pb-1 text-sm bg-[var(--color-surface)] text-[var(--color-fg)] flex flex-col w-full max-h-50 overflow-auto rounded-md border border-[var(--color-border)] z-50">
                  {firstFiveAutoCompletedUsers.map(renderAutoCompletedUser)}
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <h1 className="text-xs uppercase font-semibold text-[var(--color-muted)]">
              Max <span className="inline md:hidden"># </span>
              <span className="hidden md:inline">number </span> of games
            </h1>
            <input
              className="flex w-full h-[32px] outline-none bg-[var(--color-surface)] text-[var(--color-fg)] rounded-lg border border-[var(--color-border)] px-2.5 text-sm placeholder:text-[var(--color-muted)]"
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

        <TimeControl
          handleInputChange={handleInputChange}
          formData={formData}
          handleGameTypesChange={(game) => {
            const gameType = game.toLowerCase() as GameType;
            setFormData((prev) => ({
              ...prev,
              gameTypes: prev.gameTypes.includes(gameType)
                ? prev.gameTypes.filter((g) => g !== gameType)
                : [...prev.gameTypes, gameType]
            }));
          }}
        />
        <Colors handleInputChange={handleInputChange} formData={formData} />
      </div>
    </div>
  );
};

export default SlideOne;
