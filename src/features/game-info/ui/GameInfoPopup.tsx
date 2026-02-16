import { Dispatch, SetStateAction } from "react";
import GameSpeedIcon from "@/components/shared/GameSpeedIcon";
import { useSelector } from "react-redux";
import { getPuzzle } from "@/state/slices/puzzle";
import { formatTimeControl } from "@/shared/lib";
import { ICON_SIZES } from "@/constants/icons";
import { ColorLongForm, GameMode } from "@/typing/enums";
import { BookOpen, Clock3, Crown, ExternalLink, Flag, User, X } from "lucide-react";

interface GameInfoPopupProps {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

const GameInfoPopup: React.FC<GameInfoPopupProps> = ({ showPopup, setShowPopup }) => {
  const puzzle = useSelector(getPuzzle);

  if (!puzzle || !showPopup) {
    return null;
  }

  const phaseLabel = `${puzzle.phase[0].toLocaleUpperCase()}${puzzle.phase.slice(1)} Position`;
  const gameMode = puzzle.rated ? GameMode.Rated : GameMode.Casual;
  const timeControlLabel = `${puzzle.timeControl} ${formatTimeControl(puzzle.clock.initial, puzzle.clock.increment)}`;
  const winnerName =
    puzzle.winner === ColorLongForm.WHITE ? puzzle.players.white.user.name : puzzle.players.black.user.name;
  const statusText =
    puzzle.status === "draw" ? "Game ended in a draw" : puzzle.winner ? `Winner: ${winnerName}` : "Game ongoing";

  return (
    <div className="absolute left-1/2 top-full mt-2 z-20 transform -translate-x-1/2 min-w-[320px] max-w-md w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-3.5">
      <div className="flex flex-col gap-3 text-[var(--color-fg)]">
        <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={`/phases/${puzzle.phase}.svg`}
              alt={`${puzzle.phase} icon`}
              title={`Position taken from ${puzzle.phase}`}
              className="w-8 h-8 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-md p-1"
            />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wide text-[var(--color-muted)] font-semibold">Reference Game</p>
              <p className="text-sm font-medium text-[var(--color-fg)] truncate">{phaseLabel}</p>
            </div>
          </div>
          <button
            onClick={() => setShowPopup(false)}
            aria-label="Close game info"
            className="p-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-fg)] transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="grid gap-2.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)] px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <Flag size={13} /> Mode
            </span>
            <span className="inline-flex items-center gap-1.5 min-w-0 font-medium">
              <GameSpeedIcon speed={puzzle.timeControl} size={ICON_SIZES.SMALL} />
              <span className="truncate">{gameMode}</span>
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)] px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <Clock3 size={13} /> Time
            </span>
            <span className="truncate capitalize font-medium">{timeControlLabel}</span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-hover)] px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <Crown size={13} /> Status
            </span>
            <span className="truncate font-medium">{statusText}</span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <User size={13} /> White
            </span>
            <span className="truncate">{puzzle.players.white.user.name}</span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <User size={13} /> Black
            </span>
            <span className="truncate">{puzzle.players.black.user.name}</span>
          </div>

          {puzzle.positionOpening && (
            <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] px-2.5 py-2">
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
  );
};

export default GameInfoPopup;