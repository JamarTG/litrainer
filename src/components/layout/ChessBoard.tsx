import PlayerBadge from '../board/header/PlayerBadge'
import { useSelector } from 'react-redux'
import { FC, ReactNode } from 'react'
import { Materials } from '../../types/eval'
import { RootState } from '../../redux/store'

interface ChessBoardLayoutProps {
  material: Materials
  children: ReactNode
}

const ChessBoardLayout: FC<ChessBoardLayoutProps> = ({ material, children }) => {
  const currentPuzzle = useSelector((state: RootState) => state.puzzle.puzzles[state.puzzle.currentIndex])

  const userColor = currentPuzzle?.userMove.color
  const opponentColor = currentPuzzle?.opponentMove.color

  const currentPuzzleExists = !!currentPuzzle

  return (
    <div className='flex flex-col justify-center items-center pt-2'>
      <PlayerBadge color={opponentColor} material={material} hasPuzzle={currentPuzzleExists} />
      {children}
      <PlayerBadge color={userColor} material={material} hasPuzzle={currentPuzzleExists} />
    </div>
  )
}

export default ChessBoardLayout
