import React, { ChangeEvent } from "react";
import { Fields } from "../../../../../types/form";
import Games from "./games";
import Phases from "./phases";
import Colors from "./colors";

interface SlideOneProps {
  formData: Fields;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideOne: React.FC<SlideOneProps> = ({ formData, handleInputChange }) => {


  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4 ">
        <div className="flex justify-between">
          <div className="grid gap-2">
            <h1 className="text-landingText text-sm text-offWhite">Username</h1>
            <input
              className="flex  w-full  bg-secondary   h-[32px]   outline-none text-textwhite caret-accent   text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted "
              placeholder="JamariTheGreat"
              // value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className=" grid gap-2">
            <h1 className="text-landingText text-sm text-offWhite">
              Number of games
            </h1>
            <input
              className="flex  w-full  bg-secondary   h-[32px]   outline-none text-textwhite caret-accent   text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted "
              placeholder="10"
              // value={formData.maxNoGames}
              onChange={handleInputChange}
            />
          </div>
        </div>

      <Games handleInputChange={handleInputChange}/>
      <Phases handleInputChange={handleInputChange}/>
      <Colors handleInputChange={handleInputChange}/>


      </div>
    </div>
  );
};

export default SlideOne;
