import { ChangeEvent, useState } from "react";
import usePopperDropDown from "../../../../../features/Board/hooks/usePopperDropDown";
import ReactDOM from "react-dom";

interface GamesProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Games: React.FC<GamesProps> = ({ handleInputChange }) => {
  const gamesDropdown = usePopperDropDown();
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const games = ["Blitz", "Classic", "Rapid", "Bullet"];

  const handleGameClick = (game: string) => {
    setSelectedGames((prev) =>
      prev.includes(game) ? prev.filter((g) => g !== game) : [...prev, game]
    );
  };

  return (
    <div className="grid gap-2">
      <h1 className="text-landingText text-sm text-offWhite">Games</h1>

      <div className="relative w-full flex items-center">
        <input
          className="flex-1 w-full bg-secondary h-[32px] outline-none text-textwhite caret-accent text-offWhite rounded-lg border border-shadowGray px-2.5 text-sm placeholder:text-muted pr-8"
          placeholder="Select games"
          value={selectedGames.join(", ")}
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
            <div ref={gamesDropdown.dropdownRef} className="z-50 shadow-2xl">
              <div className="bg-secondary w-[386px] rounded-lg border border-shadowGray px-2 py-2">
                <div className="flex flex-col space-y-0">
                  {games.map((game) => (
                    <button
                      key={game}
                      className={`flex justify-between px-2.5 hover:bg-tertiary hover:rounded-lg  transition-all ease-in-out`}
                      onClick={() => handleGameClick(game)}
                    >
                      <div className="flex my-auto gap-x-2">
                        {game === "Bullet" && (
                          <div className="my-auto ">
                            <svg
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="mx-auto text-accent"
                            >
                              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                            </svg>
                          </div>
                        )}

                        {game === "Blitz" && (
                          <div className="my-auto ">
                            <svg
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="mx-auto text-accent"
                            >
                              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                            </svg>
                          </div>
                        )}

                        {game === "Classic" && (
                          <div className="my-auto ">
                            <svg
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="mx-auto text-accent"
                            >
                              <path d="M19.31 5.6c-1.22-.04-2.43.9-2.81 2.4-.5 2-.5 2-1.5 3-2 2-5 3-11 4-1 .16-1.5.5-2 1 2 0 4 0 2.5 1.5L3 19h3l2-2c2 1 3.33 1 5.33 0l.67 2h3l-1-3s1-4 2-5 1 0 2 0 2-1 2-2.5C22 8 22 7 20.5 6c-.35-.24-.76-.38-1.19-.4M9 6a6 6 0 0 0-6 6c0 .6.13 1.08.23 1.6 5.92-.98 9.06-2.01 10.7-3.66l.5-.5A6.007 6.007 0 0 0 9 6z" />
                            </svg>
                          </div>
                        )}

                        {game === "Rapid" && (
                          <div className="my-auto ">
                            <svg
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="max-auto text-accent"
                            >
                              <path d="m18.05 21-2.73-4.74c0-1.73-1.07-2.84-2.37-2.84-.9 0-1.68.5-2.08 1.24.33-.19.72-.29 1.13-.29 1.3 0 2.36 1.06 2.36 2.36 0 1.31-1.05 2.38-2.36 2.38h3.3V21H6.79c-.24 0-.49-.09-.67-.28a.948.948 0 0 1 0-1.34l.5-.5c-.34-.15-.62-.38-.9-.62-.22.5-.72.85-1.3.85a1.425 1.425 0 0 1 0-2.85l.47.08v-1.97a4.73 4.73 0 0 1 4.74-4.74h.02c2.12.01 3.77.84 3.77-.47 0-.93.2-1.3.54-1.82-.73-.34-1.56-.55-2.43-.55-.53 0-.95-.42-.95-.95 0-.43.28-.79.67-.91l-.67-.04c-.52 0-.95-.42-.95-.94 0-.53.43-.95.95-.95h.95c2.1 0 3.94 1.15 4.93 2.85l.28-.01c.71 0 1.37.23 1.91.61l.45.38c2.17 1.95 1.9 3.27 1.9 3.28 0 1.28-1.06 2.33-2.35 2.33l-.49-.05v.08c0 1.11-.48 2.1-1.23 2.8L20.24 21h-2.19m.11-13.26c-.53 0-.95.42-.95.94 0 .53.42.95.95.95.52 0 .95-.42.95-.95 0-.52-.43-.94-.95-.94z" />
                            </svg>
                          </div>
                        )}

                        <p className="text-sm text-offWhite my-auto">{game}</p>
                      </div>
                      <svg viewBox="0 0 16 16" height="35" width="35">
                        <path
                          d="M0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z"
                          fill={` ${
                            selectedGames.includes(game) ? "#287F71" : "#424242"
                          }`}
                        />
                        <path
                          d="M5 4a4 4 0 110 8 4 4 0 010-8z"
                          fill="#ffffff"
                          className={`transition transform 0.3s ease ${
                            selectedGames.includes(game)
                              ? "transform translate-x-[6px]"
                              : ""
                          }`}
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default Games;
