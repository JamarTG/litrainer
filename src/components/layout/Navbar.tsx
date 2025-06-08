import { PropsWithChildren } from "react";
import ThemeChanger from "../common/ThemeChanger";
import GithubButton from "./GithubLink";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="relative min-h-screen dark:bg-zinc-900  ">
      <nav className="hidden sm:flex p-2 pb-6 justify-between items-center z-20 relative">
        <ThemeChanger />
        <GithubButton />
      </nav>
      <main className="relative z-10">{children}</main>
    </section>
  );
};

export default NavbarLayout;
