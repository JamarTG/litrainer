import { ColorShortForm } from "@/typing/enums";
import { Color } from "chess.js";
import { FC } from "react";

const PlayerColorIcon: FC<{ playerColor: Color; isDarkMode: boolean }> = ({ playerColor, isDarkMode }) => {
  const isWhitePlayer = playerColor === ColorShortForm.WHITE;
  const label = isWhitePlayer ? "White" : "Black";
  const labelColor = isWhitePlayer ? (isDarkMode ? "#f5f5f4" : "#1f1f1f") : isDarkMode ? "#d6d3d1" : "#44403c";

  return (
    <span className="inline-flex items-center justify-center text-[10px] font-semibold uppercase tracking-wide" aria-hidden="true">
      <span style={{ color: labelColor }}>{label}</span>
    </span>
  );
};

export default PlayerColorIcon;
