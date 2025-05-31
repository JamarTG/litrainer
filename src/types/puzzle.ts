import { Color, PieceSymbol, Square } from 'chess.js'
import { LichessClock } from './clock'
import { LichessEvaluation } from './eval'
import { GameType } from './form'
import { LichessPlayers } from './player'

export interface Puzzle {
  evaluation: LichessEvaluation
  fen: Fen
  players: LichessPlayers
  gameId: string
  timeControl: GameType
  rated: boolean
  status: string
  variant: string
  userMove: {
    san: string
    lan: string
    piece: PieceSymbol
    source: Square
    destination: Square
    color: Color
  }
  opponentMove: {
    san: string
    lan: string
    piece: PieceSymbol
    source: Square
    destination: Square
    color: Color
  }
  clock: LichessClock
  winner?: 'white' | 'black'
  moveNumber: number
  gameOpening: Opening
  phase: Phase
  positionOpening: PositionOpening | null
}

type Phase = 'opening' | 'middlegame' | 'endgame'

export interface Opening {
  eco: string
  name: string
  ply: number
}

export interface PositionOpening {
  eco: string
  name: string
  pgn: string
}

export interface Fen {
  current: string
  previous: string
}
