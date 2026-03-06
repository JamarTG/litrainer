import { PropsWithChildren, useState } from "react";
import ThemeChanger from "../common/ThemeChanger";
import { Bug,  Code2Icon} from "lucide-react";
import BugReportForm from "./BugReportForm";
import { NewSessionTriggerButton } from "@/features/training-session";
import { SettingsTriggerButton } from "@/features/settings";
import logo from "@/assets/ui/logo.svg";
import darkLogo from "@/assets/ui/dark-logo.svg";
import { useSelector } from "react-redux";
import { isDarkModeActive } from "@/state";
import { ICON_SIZES } from "@/constants/icons";

const CONTACT_EMAIL = "jamarimcfarlane12@gmail.com";
const mobileMenuItemClass =
  "w-full inline-flex items-center justify-center gap-2 text-md font-medium px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors";
const mobilePrimaryButtonClass =
  "w-full inline-flex items-center justify-center gap-2 text-md font-medium px-3 py-2 rounded-md bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white shadow-sm active:translate-y-[1px] active:scale-95 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-strong-hover)] transition-transform duration-150 ease-out";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDarkMode = useSelector(isDarkModeActive);

  const handleOpenBugReport = () => {
    setIsMobileMenuOpen(false);
    setIsBugFormOpen(true);
  };

  return (
    <section className="app-background relative min-h-screen text-[var(--color-fg)]">
      <nav className="sm:hidden p-2 pb-3 z-20 relative">
        <div className="flex justify-between items-center">
        
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white text-sm font-medium shadow-sm active:translate-y-[1px] active:scale-95 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-strong-hover)] transition-colors transition-transform duration-150 ease-out"
          >
            <span aria-hidden className="text-base leading-none">{isMobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute inset-0 bg-[var(--color-surface)] p-3 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <ThemeChanger
                buttonClassName="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white text-sm font-medium shadow-sm active:translate-y-[1px] active:scale-95 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-strong-hover)] transition-colors transition-transform duration-150 ease-out min-w-[112px] justify-center"
                iconSize={ICON_SIZES.SMALL}
                showLabel
              />

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white text-sm font-medium shadow-sm active:translate-y-[1px] active:scale-95 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-strong-hover)] transition-colors transition-transform duration-150 ease-out"
              >
                <span aria-hidden className="text-base leading-none">✕</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <NewSessionTriggerButton buttonClassName={mobileMenuItemClass} iconSize={16} />
              <SettingsTriggerButton buttonClassName={mobileMenuItemClass} iconSize={16} />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2.5">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/JamarTG/litrainer"
                aria-label="View the repository on GitHub"
                className={mobilePrimaryButtonClass}
              >
                <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">
                  <Code2Icon size={ICON_SIZES.MEDIUM} />
                </span>
                <span>View repo</span>
              </a>

              <button
                type="button"
                onClick={handleOpenBugReport}
                aria-label="Report a bug by email"
                className={mobilePrimaryButtonClass}
              >
                <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">
                  <Bug size={ICON_SIZES.MEDIUM} />
                </span>
                <span>Report a bug</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <nav className="hidden sm:flex p-2 pb-6 justify-between items-center z-20 relative">
        <div className="flex items-center gap-3">
          <img
            src={isDarkMode ? darkLogo : logo}
            alt="LiTrainer logo"
            className="h-12 w-auto rounded-md object-contain"
          />
        </div>

        <div className="flex items-center gap-3">
          <ThemeChanger
            buttonClassName="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white text-sm font-medium shadow-sm active:translate-y-[1px] active:scale-95 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-strong-hover)] transition-colors transition-transform duration-150 ease-out min-w-[112px] justify-center"
            iconSize={ICON_SIZES.SMALL}
            showLabel
          />

          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/JamarTG/litrainer"
            aria-label="View the repository on GitHub"
            title="View repo on GitHub"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white text-sm font-medium shadow-sm active:translate-y-[1px] active:scale-95 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-strong-hover)] transition-transform duration-150 ease-out min-w-[112px] justify-center"
          >
            <Code2Icon size={ICON_SIZES.SMALL} />
            <span>Repo</span>
          </a>

          <button
            type="button"
            onClick={() => setIsBugFormOpen(true)}
            aria-label="Report a bug by email"
            title="Report a bug"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-strong)] text-white text-sm font-medium shadow-sm active:translate-y-[1px] active:scale-95 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-strong-hover)] transition-transform duration-150 ease-out min-w-[112px] justify-center"
          >
            <Bug size={ICON_SIZES.SMALL} />
            <span>Bug</span>
          </button>
        </div>

      </nav>
      <BugReportForm isOpen={isBugFormOpen} onClose={() => setIsBugFormOpen(false)} recipientEmail={CONTACT_EMAIL} />
      <main className="relative z-10 sm:pt-2 md:pt-4">{children}</main>
    </section>
  );
};

export default NavbarLayout;
