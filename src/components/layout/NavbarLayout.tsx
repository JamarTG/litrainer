import { PropsWithChildren } from "react";
import LichessIcon from "../shared/LichessIcon";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="relative min-h-screen bg-white dark:bg-zinc-900">
      <nav className="flex p-2 justify-between items-center border-b dark:border-zinc-700 z-20 relative">
        <a href="https://lichess.org/api" target="_blank" className="text-2xl flex justify-center items-center gap-2">
          <LichessIcon size={30} />
          <h2 className="text-sm flex justify-center items-center font-semibold logo-font gap-1">
            <span className="text-xs ">Powered by </span>
            <span className="font-semibold">lichess API</span>
          </h2>
        </a>
        <div>
          <ul>
            <li>
              <a href="https://github.com/JamarTG/litrainer" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="relative z-10">{children}</main>
    </section>
  );
};

export default NavbarLayout;
