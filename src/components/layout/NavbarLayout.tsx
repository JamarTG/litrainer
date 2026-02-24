import { PropsWithChildren, useState } from "react";
import ThemeChanger from "../common/ThemeChanger";
import { Bug, ExternalLink,  Star } from "lucide-react";
import { CHESSCOM_URLS, LICHESS_URLS } from "@/constants/urls";
import BugReportForm from "./BugReportForm";
import { NewSessionTriggerButton } from "@/features/training-session";
import { SettingsTriggerButton } from "@/features/settings";

const CONTACT_EMAIL = "jamarimcfarlane12@gmail.com";
const LICHESS_USERNAME = "JamariTheGreat";
const CHESSCOM_USERNAME = "theSadisticBiscuit";
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/jamarimcfarlane/";
const GITHUB_PROFILE_URL = "https://github.com/JamarTG";
const mobileMenuItemClass =
  "w-full inline-flex items-center justify-start gap-2 text-md font-medium px-3 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="flex items-center justify-between mb-3">
              <ThemeChanger
                buttonClassName="inline-flex items-center justify-center h-9 w-9 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)]"
                iconSize={18}
              />

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)]"
              >
                <span aria-hidden className="text-lg leading-none">✕</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <NewSessionTriggerButton buttonClassName={mobileMenuItemClass} iconSize={16} />
              <SettingsTriggerButton buttonClassName={mobileMenuItemClass} iconSize={16} />
            </div>

            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wide text-[var(--color-muted)] font-semibold mb-2 px-1 ">Project & Feedback</p>
              <div className="grid grid-cols-1 gap-2.5">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/JamarTG/litrainer"
                  aria-label="Star the repository"
                  className={mobileMenuItemClass}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">
                    <Star size={20} className="star-drift" />
                  </span>
                  <span>Star the repo</span>
                </a>
           
                <button
                  type="button"
                  onClick={handleOpenBugReport}
                  aria-label="Report a bug by email"
                  className={mobileMenuItemClass}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">
                    <Bug size={20} />
                  </span>
                  <span>Report a bug</span>
                </button>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wide text-[var(--color-muted)] font-semibold mb-2 px-1">Creator socials</p>
              <div className="grid grid-cols-1 gap-2.5">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${LICHESS_URLS.Profile}${LICHESS_USERNAME}`}
                  aria-label="View creator profile on Lichess"
                  className={mobileMenuItemClass}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">
                    <ExternalLink size={20} />
                  </span>
                  <span>Lichess</span>
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${CHESSCOM_URLS.Profile}${CHESSCOM_USERNAME}`}
                  aria-label="View creator profile on Chess.com"
                  className={mobileMenuItemClass}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">
                    <ExternalLink size={20} />
                  </span>
                  <span>Chess.com</span>
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href={LINKEDIN_PROFILE_URL}
                  aria-label="View creator profile on LinkedIn"
                  className={mobileMenuItemClass}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">
                    <ExternalLink size={20} />
                  </span>
                  <span>LinkedIn</span>
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href={GITHUB_PROFILE_URL}
                  aria-label="View creator profile on GitHub"
                  className={mobileMenuItemClass}
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center shrink-0">
                    <ExternalLink size={20} />
                  </span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="hidden sm:flex p-2 pb-6 justify-between items-center z-20 relative">
        <ThemeChanger />
        <div className="flex items-center gap-3">
          <span className="hidden xl:block text-[10px] uppercase tracking-wide text-[var(--color-muted)] font-semibold">Project & Feedback</span>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/JamarTG/litrainer"
            aria-label="Star the repository"
            className="inline-flex items-center gap-1.5 text-md font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <Star size={20} className="star-drift" /> <span className="hidden lg:block">Star the repo</span>
          </a>

          <button
            type="button"
            onClick={() => setIsBugFormOpen(true)}
            aria-label="Report a bug by email"
            className="inline-flex items-center gap-1.5 text-md font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <Bug size={20} /> <span className="hidden lg:block">Report a bug</span>
          </button>

          <div className="h-4 w-px bg-[var(--color-border)]" />
          <span className="text-[10px] uppercase tracking-wide text-[var(--color-muted)] font-semibold">Creator socials</span>

          <a
            target="_blank"
            rel="noreferrer"
            href={`${LICHESS_URLS.Profile}${LICHESS_USERNAME}`}
            aria-label="View creator profile on Lichess"
            className="inline-flex items-center gap-1.5 text-md font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <ExternalLink size={20} /> Lichess
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href={`${CHESSCOM_URLS.Profile}${CHESSCOM_USERNAME}`}
            aria-label="View creator profile on Chess.com"
            className="inline-flex items-center gap-1.5 text-md font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <ExternalLink size={20} /> Chess.com
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href={LINKEDIN_PROFILE_URL}
            aria-label="View creator profile on LinkedIn"
            className="inline-flex items-center gap-1.5 text-md font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <ExternalLink size={20} /> LinkedIn
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href={GITHUB_PROFILE_URL}
            aria-label="View creator profile on GitHub"
            className="inline-flex items-center gap-1.5 text-md font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <ExternalLink size={20} /> GitHub
          </a>
        </div>

      </nav>
      <BugReportForm isOpen={isBugFormOpen} onClose={() => setIsBugFormOpen(false)} recipientEmail={CONTACT_EMAIL} />
      <main className="relative z-10 sm:pt-2 md:pt-4">{children}</main>
    </section>
  );
};

export default NavbarLayout;
