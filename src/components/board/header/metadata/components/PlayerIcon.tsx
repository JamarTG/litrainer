import { PlayerIcons } from "@/constants/icons";
import { ColorShortForm } from "@/typing/enums";
import { Color } from "chess.js";
import { FC } from "react";

const PlayerColorIcon: FC<{ playerColor: Color; isDarkMode: boolean }> = ({ playerColor, isDarkMode }) => {
  const shouldRenderUnfilledIcon =
    (!isDarkMode && playerColor === ColorShortForm.WHITE) || (isDarkMode && !(playerColor === ColorShortForm.WHITE));

  return (
    <span
      className="icon"
      dangerouslySetInnerHTML={{
        __html: shouldRenderUnfilledIcon ? PlayerIcons.unfilled : PlayerIcons.filled
      }}
    />
  );
};

export default PlayerColorIcon;
