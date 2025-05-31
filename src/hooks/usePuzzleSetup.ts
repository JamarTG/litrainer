import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chess } from 'chess.js'
import { resetFeedback } from '../redux/slices/feedback'
import { RootState } from '../redux/store'
import { playSound } from '../libs/sound'
import { setFen } from '../redux/slices/board'

const usePuzzleSetup = () => {
  const [game, setGame] = useState<Chess>(new Chess())
  const dispatch = useDispatch()
  const puzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex])

  const executeComputerMove = useCallback(
    (game: Chess, move: string) => {
      setTimeout(() => {
        const newGame = new Chess(game.fen())
        newGame.move(move)
        playSound(newGame)
        setGame(newGame)
        dispatch(setFen(newGame.fen()))
      }, 500)
    },
    [dispatch]
  )

  useEffect(() => {
    if (!puzzle) return

    const newGame = new Chess()
    newGame.load(puzzle.fen.previous)
    setGame(newGame)
    dispatch(setFen(newGame.fen()))
    dispatch(resetFeedback())

    executeComputerMove(newGame, puzzle.opponentMove.lan)
  }, [puzzle, dispatch, executeComputerMove])

  return { game }
}

export default usePuzzleSetup
