import React, { ChangeEvent } from "react";

interface SlideOneProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SlideOne: React.FC<SlideOneProps> = ({ handleInputChange }) => {
  return (
    <div className="grid gap-6 px-4">
      <div className="grid gap-4 ">
        <div className="flex justify-between">
        <div className="grid gap-2">
          <h1 className="text-landingText text-sm text-offWhite">Username</h1>
          <input
            className="flex  w-full rounded-lg bg-primary  px-3 py-2 text-sm h-[35px]   outline-none text-textwhite caret-accent  border-tertiary border "
            placeholder="John Doe"
            // value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className=" grid gap-2">
          <h1 className="text-landingText text-sm text-offWhite">
            Number of games
          </h1>
          <input
            className="flex w-full rounded-lg bg-primary  px-3 py-2 text-sm h-[35px]  text-textwhite caret-accent outline-none "
            placeholder=""
            // value={formData.maxNoGames}
            onChange={handleInputChange}
          />
        </div>
        </div>

        <div className="grid gap-2">
          <h1 className="text-landingText text-sm text-offWhite">Color</h1>
          <div className="flex flex-row  gap-x-2">
            <div className="w-1/2  flex justify-between rounded-lg bg-primary  px-3 py-2 text-sm ">
              <div className="flex flex-row gap-x-4">
                <div className="bg-accent rounded-md h-10 w-10 flex">
                  <svg
                    width="25"
                    height="25"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="my-auto mx-auto text-white"
                  >
                    <path d="M14 3a1 1 0 0 1 .993.883L15 4v2h1.652l.362-2.164A1 1 0 0 1 18.048 3l.116.013A1 1 0 0 1 19 4.048l-.013.116-.5 3a1 1 0 0 1-.865.829L17.5 8h-1.383l.877 7.89a1 1 0 0 1-.877 1.103L16 17H8a1 1 0 0 1-1-.993l.006-.117L7.883 8H6.5a1 1 0 0 1-.96-.718l-.026-.118-.5-3a1 1 0 0 1 1.947-.442l.025.114L7.347 6H9V4a1 1 0 0 1 1.993-.117L11 4v2h2V4a1 1 0 0 1 1-1zm4 15H6a1 1 0 0 0-1 1 2 2 0 0 0 2 2h10a2 2 0 0 0 1.987-1.768l.011-.174A1 1 0 0 0 18 18z" />
                  </svg>
                </div>

                <div className="my-auto">
                  <p className="text-offwhite ">White</p>
                </div>
              </div>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="userChoice"
                  value="option1"
                  className="hidden"
                  onChange={handleInputChange}
                />
                <svg
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
                  <path d="M12 9c-1.627 0-3 1.373-3 3s1.373 3 3 3 3-1.373 3-3-1.373-3-3-3z" />
                </svg>
              </label>
            </div>

            <div className="w-1/2  flex justify-between rounded-lg bg-primary  px-3 py-2 text-sm ">
              <div className="flex flex-row gap-x-4">
                <div className="bg-accent rounded-md h-10 w-10 flex">
                  <svg
                    width="25"
                    height="25"
                    fill="#000000"
                    viewBox="0 0 24 24"
                    className="my-auto mx-auto text-black"
                  >
                    <path d="M14 3a1 1 0 0 1 .993.883L15 4v2h1.652l.362-2.164A1 1 0 0 1 18.048 3l.116.013A1 1 0 0 1 19 4.048l-.013.116-.5 3a1 1 0 0 1-.865.829L17.5 8h-1.383l.877 7.89a1 1 0 0 1-.877 1.103L16 17H8a1 1 0 0 1-1-.993l.006-.117L7.883 8H6.5a1 1 0 0 1-.96-.718l-.026-.118-.5-3a1 1 0 0 1 1.947-.442l.025.114L7.347 6H9V4a1 1 0 0 1 1.993-.117L11 4v2h2V4a1 1 0 0 1 1-1zm4 15H6a1 1 0 0 0-1 1 2 2 0 0 0 2 2h10a2 2 0 0 0 1.987-1.768l.011-.174A1 1 0 0 0 18 18z" />
                  </svg>
                </div>

                <div className="my-auto">
                  <p className="text-offWhite">Black</p>
                </div>
              </div>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="userChoice"
                  value="option1"
                  className="hidden"
                  onChange={handleInputChange}
                />
                <svg
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 24 24 "
                  className = "text-tertiary"
                >
                  <path d="M12 5c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
                  <path d="M12 9c-1.627 0-3 1.373-3 3s1.373 3 3 3 3-1.373 3-3-1.373-3-3-3z" />
                </svg>
              </label>
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-landingText text-sm text-offWhite">Games</h1>
          <div className="flex justify-between gap-x-2">
            <div className="my-auto">
              <p className="text-offWhite text-sm">Bullet</p>
            </div>
            <svg viewBox="0 0 16 16" height="35" width="35">
              {/* Outer part of the toggle switch */}
              <path
                d="M0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z"
                fill="#424242"
              />
              {/* Inner part of the toggle switch */}
              <path d="M5 4a4 4 0 110 8 4 4 0 010-8z" fill="#ffffff" />
            </svg>
          </div>
          <div className="flex justify-between gap-x-2">
            <div className="my-auto">
              <p className="text-offWhite text-sm">Blitz</p>
            </div>
            <svg viewBox="0 0 16 16" height="35" width="35">
              {/* Outer part of the toggle switch */}
              <path
                d="M0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z"
                fill="#424242"
              />
              {/* Inner part of the toggle switch */}
              <path d="M5 4a4 4 0 110 8 4 4 0 010-8z" fill="#ffffff" />
            </svg>
          </div>
          <div className="flex justify-between gap-x-2">
            <div className="my-auto">
              <p className="text-offWhite text-sm">Classical</p>
            </div>
            <svg viewBox="0 0 16 16" height="35" width="35">
              {/* Outer part of the toggle switch */}
              <path
                d="M0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z"
                fill="#424242"
              />
              {/* Inner part of the toggle switch */}
              <path d="M5 4a4 4 0 110 8 4 4 0 010-8z" fill="#ffffff" />
            </svg>
          </div>
          <div className="flex justify-between gap-x-2">
            <div className="my-auto">
              <p className="text-offWhite text-sm">Rapid</p>
            </div>
            <svg viewBox="0 0 16 16" height="35" width="35">
              {/* Outer part of the toggle switch */}
              <path
                d="M0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z"
                fill="#424242"
              />
              {/* Inner part of the toggle switch */}
              <path d="M5 4a4 4 0 110 8 4 4 0 010-8z" fill="#ffffff" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOne;
