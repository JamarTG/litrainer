import React from "react";
import { GameType } from "../../types/form";

interface GameSpeedIconProps {
  speed: GameType;
}

const GameSpeedIcon: React.FC<GameSpeedIconProps> = ({ speed }) => {
  return (
    <div className="flex">
      {speed === "bullet" && (
        <div className="my-auto ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width={"2em"}
            className="mx-auto text-accent"
          >
            <path d="M21 12c0 2.86-2.72 6.62-15.94 6.97-1.13.03-2.06-.88-2.06-2V7.03c0-1.13.94-2.03 2.06-2C18.28 5.38 21 9.15 21 12Z"></path>
          </svg>
        </div>
      )}

      {speed === "blitz" && (
        <div className="my-auto ">
          <svg
            width="2em"
            height="2em"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mx-auto text-accent"
          ></svg>
        </div>
      )}

      {speed === "classical" && (
        <div className="my-auto ">
          <svg
            width="2em"
            height="2em"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="mx-auto text-accent"
          >
            <path d="M19.31 5.6c-1.22-.04-2.43.9-2.81 2.4-.5 2-.5 2-1.5 3-2 2-5 3-11 4-1 .16-1.5.5-2 1 2 0 4 0 2.5 1.5L3 19h3l2-2c2 1 3.33 1 5.33 0l.67 2h3l-1-3s1-4 2-5 1 0 2 0 2-1 2-2.5C22 8 22 7 20.5 6c-.35-.24-.76-.38-1.19-.4M9 6a6 6 0 0 0-6 6c0 .6.13 1.08.23 1.6 5.92-.98 9.06-2.01 10.7-3.66l.5-.5A6.007 6.007 0 0 0 9 6z" />
          </svg>
        </div>
      )}

      {speed === "rapid" && (
        <div className="my-auto ">
          <svg
            width="2em"
            height="2em"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="max-auto text-accent"
          >
            <path d="m18.05 21-2.73-4.74c0-1.73-1.07-2.84-2.37-2.84-.9 0-1.68.5-2.08 1.24.33-.19.72-.29 1.13-.29 1.3 0 2.36 1.06 2.36 2.36 0 1.31-1.05 2.38-2.36 2.38h3.3V21H6.79c-.24 0-.49-.09-.67-.28a.948.948 0 0 1 0-1.34l.5-.5c-.34-.15-.62-.38-.9-.62-.22.5-.72.85-1.3.85a1.425 1.425 0 0 1 0-2.85l.47.08v-1.97a4.73 4.73 0 0 1 4.74-4.74h.02c2.12.01 3.77.84 3.77-.47 0-.93.2-1.3.54-1.82-.73-.34-1.56-.55-2.43-.55-.53 0-.95-.42-.95-.95 0-.43.28-.79.67-.91l-.67-.04c-.52 0-.95-.42-.95-.94 0-.53.43-.95.95-.95h.95c2.1 0 3.94 1.15 4.93 2.85l.28-.01c.71 0 1.37.23 1.91.61l.45.38c2.17 1.95 1.9 3.27 1.9 3.28 0 1.28-1.06 2.33-2.35 2.33l-.49-.05v.08c0 1.11-.48 2.1-1.23 2.8L20.24 21h-2.19m.11-13.26c-.53 0-.95.42-.95.94 0 .53.42.95.95.95.52 0 .95-.42.95-.95 0-.52-.43-.94-.95-.94z" />
          </svg>
        </div>
      )}

      {speed === "correspondence" && (
        <div className="my-auto ">
          <svg
            width="2em"
            height="2em"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="max-auto text-accent"
          >
            <path d="m2.6 13.083 3.452 1.511L16 9.167l-6 7 8.6 3.916a1 1 0 0 0 1.399-.85l1-15a1.002 1.002 0 0 0-1.424-.972l-17 8a1.002 1.002 0 0 0 .025 1.822zM8 22.167l4.776-2.316L8 17.623z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default GameSpeedIcon;