import { PropsWithChildren, useState } from "react";
import ThemeChanger from "../common/ThemeChanger";
import { Bug, GitPullRequest, MessageCircle, Star } from "lucide-react";
import { LICHESS_URLS } from "@/constants/urls";
import BugReportForm from "./BugReportForm";
import { NewSessionTriggerButton } from "@/features/training-session";
import { GameInfoTriggerButton } from "@/features/game-info";
import { SettingsTriggerButton } from "@/features/settings";

const CONTACT_EMAIL = "jamarimcfarlane12@gmail.com";
const LICHESS_USERNAME = "jamarithegreat";
const mobileMenuItemClass =
  "w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section className="app-background relative min-h-screen text-[var(--color-fg)]">
      <nav className="sm:hidden p-2 pb-3 z-20 relative">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)]"
          >
            <span aria-hidden className="text-lg leading-none">{isMobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute inset-0 bg-[var(--color-surface)] p-3 overflow-y-auto">
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)]"
              >
                <span aria-hidden className="text-lg leading-none">✕</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <ThemeChanger buttonClassName={mobileMenuItemClass} showLabel />
              <NewSessionTriggerButton buttonClassName={mobileMenuItemClass} iconSize={16} />
              <GameInfoTriggerButton buttonClassName={mobileMenuItemClass} iconSize={16} />
              <SettingsTriggerButton buttonClassName={mobileMenuItemClass} iconSize={16} />
            </div>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/JamarTG/litrainer"
              aria-label="Star the repository"
              className={`${mobileMenuItemClass} mt-2`}
            >
              <Star size={14} className="star-drift" /> Star the repo
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/JamarTG/litrainer"
              aria-label="Contribute to the repository"
              className={mobileMenuItemClass}
            >
              <GitPullRequest size={14} /> Contribute
            </a>

            <button
              type="button"
              onClick={() => setIsBugFormOpen(true)}
              aria-label="Report a bug by email"
              className={mobileMenuItemClass}
            >
              <Bug size={14} /> Report a bug
            </button>

            <a
              target="_blank"
              rel="noreferrer"
              href={`${LICHESS_URLS.Profile}${LICHESS_USERNAME}`}
              aria-label="Message the creator on Lichess"
              className={mobileMenuItemClass}
            >
              <MessageCircle size={14} /> Contact on Lichess
            </a>
          </div>
        </div>
      )}

      <nav className="hidden sm:flex p-2 pb-6 justify-between items-center z-20 relative">
        <ThemeChanger />
        <div className="flex items-center gap-3">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/JamarTG/litrainer"
            aria-label="Star the repository"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <Star size={14} className="star-drift" /> Star the repo
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/JamarTG/litrainer"
            aria-label="Contribute to the repository"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <GitPullRequest size={14} /> Contribute
          </a>

          <button
            type="button"
            onClick={() => setIsBugFormOpen(true)}
            aria-label="Report a bug by email"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <Bug size={14} /> Report a bug
          </button>

          <a
            target="_blank"
            rel="noreferrer"
            href={`${LICHESS_URLS.Profile}${LICHESS_USERNAME}`}
            aria-label="Message the creator on Lichess"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <MessageCircle size={14} /> Contact on Lichess
          </a>
        </div>

      </nav>
      <BugReportForm isOpen={isBugFormOpen} onClose={() => setIsBugFormOpen(false)} recipientEmail={CONTACT_EMAIL} />
      <main className="relative z-10">{children}</main>
    </section>
  );
};

export default NavbarLayout;
