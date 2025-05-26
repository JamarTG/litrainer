import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { Fields, GameType } from "../../../../../types/form";
import TimeControl from "./TimeControl";
import Colors from "./Colors";

interface SlideOneProps {
  formData: Fields;
  setFormData: Dispatch<SetStateAction<Fields>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideOne: FC<SlideOneProps> = ({
  formData,
  setFormData,
  handleInputChange,
}) => {
  const handleGameTypesChange = (game: string) => {
    const gameType = game.toLowerCase() as GameType;
    setFormData((prevFormData: Fields) => ({
      ...prevFormData,
      gameTypes: prevFormData.gameTypes.includes(gameType)
        ? prevFormData.gameTypes.filter((g: GameType) => g !== gameType)
        : [...prevFormData.gameTypes, gameType],
    }));
  };

  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4 ">
        <div className="flex justify-between">
          <div className="grid gap-2">
            <h1 className="text-landingText  text-sm text-offWhite">Username</h1>
            <input
              className="flex text-[#222] w-full  bg-secondary   h-[32px]   outline-none text-textwhite caret-accent   text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted "
              placeholder="JamariTheGreat"
              value={formData.username}
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className=" grid gap-2">
            <h1 className="text-landingText text-sm text-offWhite">
              Max number of games
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
        <Colors handleInputChange={handleInputChange} formData={formData} />
      </div>
    </div>
  );
};

export default SlideOne;
