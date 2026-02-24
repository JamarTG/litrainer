import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { getPuzzle } from "@/state/slices/puzzle";
import { ColorLongForm, GameMode } from "@/typing/enums";
import { Activity, BookOpen, Clock3, Crown, ExternalLink, Flag, LucideIcon, User, X } from "lucide-react";
import { ICON_SIZES } from "@/constants/icons";

interface GameInfoPanelProps {
  setShowGameInfo: Dispatch<SetStateAction<boolean>>;
}

const PHASE_ICONS: Record<string, LucideIcon> = {
  opening: BookOpen,
  middlegame: Activity,
  endgame: Flag
};

const GameInfoPanel: React.FC<GameInfoPanelProps> = ({ setShowGameInfo }) => {
  const puzzle = useSelector(getPuzzle);

  if (!puzzle) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center p-4 gap-6 min-h-48 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No puzzle data available :(</p>
      </div>
    );
  }

  const phaseLabel = `${puzzle.phase[0].toLocaleUpperCase()}${puzzle.phase.slice(1)} Position`;
  const PhaseIcon = PHASE_ICONS[puzzle.phase] ?? BookOpen;
  const gameMode = puzzle.rated ? GameMode.Rated : GameMode.Casual;
  const timeControlLabel = `${puzzle.timeControl} ${puzzle.clock.initial}+${puzzle.clock.increment}`;
  const winnerName =
    puzzle.winner === ColorLongForm.WHITE ? puzzle.players.white.user.name : puzzle.players.black.user.name;
  const statusText =
    puzzle.status === "draw" ? "Game ended in a draw" : puzzle.winner ? `Winner: ${winnerName}` : "Game ongoing";

  return (
    <div
      style={{ zIndex: 100 }}
      className="absolute inset-0 w-full min-h-[499px] bg-[var(--color-surface-strong)] text-[var(--color-fg)] p-3 flex flex-col animate-fade-in"
    >
      <div className="h-10 flex items-center justify-between px-1 mb-2">
        <button
          onClick={() => setShowGameInfo(false)}
          className="flex items-center justify-center h-8 w-8 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)] transition-colors"
          aria-label="Close game info"
        >
          <X size={ICON_SIZES.SMALL} />
        </button>
        <h2 className="text-4xl uppercase tracking-wide text-[var(--color-muted)] font-extrabold">Game Info</h2>
        <span className="w-8" />
      </div>

      <div className="flex flex-1 justify-center items-start">
        <div className="w-full max-w-md rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-4">
          <div className="flex items-center gap-3 min-w-0 mb-2">
            <div
              title={`Position taken from ${puzzle.phase}`}
              className="w-8 h-8 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-md p-1 flex items-center justify-center"
            >
              <PhaseIcon size={18} className="text-[var(--color-muted)]" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-[var(--color-muted)] font-semibold">Reference Game</p>
              <p className="text-sm font-medium text-[var(--color-fg)] truncate">{phaseLabel}</p>
            </div>
          </div>
          <div className="grid gap-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)] px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
                <Flag size={13} /> Mode
              </span>
              <span className="truncate font-medium">{gameMode}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)] px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
                <Clock3 size={13} /> Time
              </span>
              <span className="truncate capitalize font-medium">{timeControlLabel}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)] px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
                <Crown size={13} /> Status
              </span>
              <span className="truncate font-medium">{statusText}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
                <User size={13} /> White
              </span>
              <span className="truncate">{puzzle.players.white.user.name}</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
                <User size={13} /> Black
              </span>
              <span className="truncate">{puzzle.players.black.user.name}</span>
            </div>
            {puzzle.positionOpening && (
              <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] px-3 py-2">
                <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
                  <BookOpen size={13} /> Opening
                </span>
                <span className="truncate">{puzzle.positionOpening.name}</span>
              </div>
            )}
          </div>
          <div className="pt-2 border-t border-[var(--color-border)]">
            <a
              href={`https://lichess.org/${puzzle.gameId}#${puzzle.moveNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-fg)] hover:underline transition-colors"
            >
              <ExternalLink size={13} />
              View full game
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfoPanel;
