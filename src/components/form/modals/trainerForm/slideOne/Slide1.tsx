import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
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

  useEffect(() => {
    if (debouncedUsername.length < 2) {
      setAutoCompletedUsers([]);
      return;
    }
    const autoCompleteUser = async () => {
      const results = await fetch(`${LichessURL.AutoCompleteUser}?term=${debouncedUsername}`);
      const data = await results.json();
      setAutoCompletedUsers(data);
    };
    autoCompleteUser();
  }, [debouncedUsername]);

  const handleGameTypesChange = (game: string) => {
    const gameType = game.toLowerCase() as GameType;
    setFormData((prevFormData: Fields) => ({
      ...prevFormData,
      gameTypes: prevFormData.gameTypes.includes(gameType)
        ? prevFormData.gameTypes.filter((g: GameType) => g !== gameType)
        : [...prevFormData.gameTypes, gameType],
    }));
  };

  const updateFormUsername = (username: string) => {
    setFormData((formData) => {
      return { ...formData, username };
    });
    setAutoCompletedUsers([]);
  };
  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4 ">
        <div className="flex flex-col gap-2 md:flex-row sm:gap-2 justify-between">
          <div className="grid gap-2">
            <h1 className="text-landingText text-sm text-offWhite">Username</h1>
            <div className="relative">
              <input
                className="flex text-[#222] w-full  bg-secondary   h-[32px]   outline-none text-textwhite caret-accent   text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted "
                placeholder="JamariTheGreat"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              ></input>

              <div className="absolute text-sm dark:bg-zinc-800 dark:text-white  mt-1 bg-white flex flex-col w-full max-h-40 overflow-auto rounded-md z-50">
                {autoCompletedUsers.map((username) => (
                  <div
                    key={username}
                    className="px-2 py-1 dark:hover:bg-zinc-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => updateFormUsername(username)}
                  >
                    {username}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" grid gap-2">
            <h1 className="text-landingText text-sm text-offWhite">
              Max <span className="inline md:hidden"># </span>
              <span className="hidden md:inline">number </span> of games
            </h1>
            <input
              className="flex w-full bg-secondary text-[#222] h-[32px]   outline-none text-textwhite caret-accent   text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted "
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
          handleGameTypesChange={handleGameTypesChange}
        />
        <Colors
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default SlideOne;
