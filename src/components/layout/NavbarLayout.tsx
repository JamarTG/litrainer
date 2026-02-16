import { PropsWithChildren, useState } from "react";
import ThemeChanger from "../common/ThemeChanger";
import { Bug, GitPullRequest, MessageCircle, Star } from "lucide-react";
import { LICHESS_URLS } from "@/constants/urls";
import BugReportForm from "./BugReportForm";

const CONTACT_EMAIL = "jamarimcfarlane12@gmail.com";
const LICHESS_USERNAME = "jamarithegreat";

const NavbarLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isBugFormOpen, setIsBugFormOpen] = useState(false);

  return (
    <section className="app-background relative min-h-screen text-[var(--color-fg)]">
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
