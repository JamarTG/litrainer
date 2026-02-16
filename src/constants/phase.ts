import { EndGameIcon, MiddleGameIcon, OpeningIcon } from "@/assets/icons/phases";
import { GamePhase } from "@/typing/enums";

export const GAME_PHASE_IMAGES: Record<GamePhase, string> = {
    [GamePhase.opening]: OpeningIcon,
    [GamePhase.middlegame]: MiddleGameIcon,
    [GamePhase.endgame]: EndGameIcon,
} as const;