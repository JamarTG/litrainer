import { PropsWithChildren } from "react";
import ThemeChanger from "../common/ThemeChanger";
import { ICON_SIZES } from "@/constants/icons";
import { Github } from "lucide-react";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <nav className="hidden sm:flex p-2 pb-6 justify-between items-center z-20 relative">
        <ThemeChanger />
        <a target="_blank" rel="noreferrer" href="https://github.com/JamarTG/litrainer" aria-label="GitHub repository">
          <Github size={ICON_SIZES.LARGE} className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition" />
        </a>

      </nav>
      <main className="relative z-10">{children}</main>
    </section>
  );
};

export default NavbarLayout;
