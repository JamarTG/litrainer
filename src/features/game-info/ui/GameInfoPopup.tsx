import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { getPuzzle } from "@/state/slices/puzzle";
import { formatTimeControl } from "@/shared/lib";
import { ColorLongForm, GameMode } from "@/typing/enums";
import { Activity, BookOpen, Clock3, Crown, Flag, LucideIcon, User, X } from "lucide-react";
import { ICON_SIZES } from "@/constants/icons";
import Button from "@/components/shared/Button";

interface GameInfoPopupProps {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  inPanel?: boolean;
}

const PHASE_ICONS: Record<string, LucideIcon> = {
  opening: BookOpen,
  middlegame: Activity,
  endgame: Flag
};

const GameInfoPopup: React.FC<GameInfoPopupProps> = ({ showPopup, setShowPopup, inPanel = false }) => {
  const puzzle = useSelector(getPuzzle);

  if (!puzzle || !showPopup) {
    return null;
  }

  const phaseLabel = `${puzzle.phase[0].toLocaleUpperCase()}${puzzle.phase.slice(1)} Position`;
  const PhaseIcon = PHASE_ICONS[puzzle.phase] ?? BookOpen;
  const gameMode = puzzle.rated ? GameMode.Rated : GameMode.Casual;
  const timeControlLabel = `${puzzle.timeControl} ${formatTimeControl(puzzle.clock.initial, puzzle.clock.increment)}`;
  const winnerName =
    puzzle.winner === ColorLongForm.WHITE ? puzzle.players.white.user.name : puzzle.players.black.user.name;
  const statusText =
    puzzle.status === "draw" ? "Game ended in a draw" : puzzle.winner ? `Winner: ${winnerName}` : "Game ongoing";

  const popupContainerClass = inPanel
    ? "w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-3.5 max-h-[70vh] overflow-y-auto"
    : "fixed inset-x-2 top-14 bottom-2 z-[120] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm p-3.5 overflow-y-auto md:absolute md:inset-auto md:left-full md:top-0 md:ml-2 md:z-20 md:w-[320px] md:max-w-[calc(100vw-1rem)] md:max-h-[80vh]";

  return (
    <div className={popupContainerClass}>
      <div className="flex flex-col gap-3 text-[var(--color-fg)]">
        <div className="h-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              title={`Position taken from ${puzzle.phase}`}
              className="w-8 h-8 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-md p-1 flex items-center justify-center"
            >
              <PhaseIcon size={18} className="text-[var(--color-muted)]" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-md font-medium text-[var(--color-fg)] truncate">{phaseLabel}</p>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => setShowPopup(false)}
            aria-label="Close game info"
            className="h-7 w-7 rounded-md text-md !p-0"
          >
            <X size={ICON_SIZES.SMALL} />
          </Button>
        </div>

        <div className="grid gap-2.5 text-md">
          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface-hover)] to-[var(--color-surface)] shadow-sm px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <Flag size={13} /> Mode
            </span>
            <span className="truncate font-medium">{gameMode}</span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface-hover)] to-[var(--color-surface)] shadow-sm px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <Clock3 size={13} /> Time
            </span>
            <span className="truncate capitalize font-medium">{timeControlLabel}</span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface-hover)] to-[var(--color-surface)] shadow-sm px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <Crown size={13} /> Status
            </span>
            <span className="truncate font-medium">{statusText}</span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-hover)] shadow-sm px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <User size={13} /> White
            </span>
            <span className="truncate">{puzzle.players.white.user.name}</span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-hover)] shadow-sm px-2.5 py-2">
            <span className="inline-flex items-center gap-1.5 text-[var(--color-muted)]">
              <User size={13} /> Black
            </span>
            <span className="truncate">{puzzle.players.black.user.name}</span>
          </div>

          {puzzle.positionOpening && (
            <div className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-hover)] shadow-sm px-2.5 py-2">
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
            className="text-blue-500 inline-flex items-center gap-1.5 text-md font-medium text-[var(--color-muted)] hover:underline transition-colors"
          >
            View full game
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameInfoPopup;