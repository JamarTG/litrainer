import { PropsWithChildren } from "react";
import ThemeChanger from "../common/ThemeChanger";
import github from "@/assets/icons/ui/github.svg";
import { ICON_SIZES } from "@/constants/icons";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="relative min-h-screen dark:bg-zinc-900  ">
      <nav className="hidden sm:flex p-2 pb-6 justify-between items-center z-20 relative">
        <ThemeChanger />
        <a target="_blank" href="https://github.com/JamarTG/litrainer">
          <img src={github}  alt="github image link" width={ICON_SIZES.LARGE}/>
        </a>

      </nav>
      <main className="relative z-10">{children}</main>
    </section>
  );
};

export default NavbarLayout;
