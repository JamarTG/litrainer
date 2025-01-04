import { useContext } from 'react';
import { Materials } from '../../types/eval';
import PlayerWithMaterial from './PlayerWithMaterial';
import { PuzzleContext } from '../../context/PuzzleContext';


interface BoardWithPlayersProps {
  material: Materials;
  children: React.ReactNode;
}

const BoardWithPlayers: React.FC<BoardWithPlayersProps> = ({material, children }) => {
  const {puzzle} = useContext(PuzzleContext);
  return (
    <div className="relative flex flex-col justify-center items-center gap-2">
      <PlayerWithMaterial puzzle={puzzle} color="black" material={material} />
      {children}
      <PlayerWithMaterial puzzle={puzzle} color="white" material={material} />
    </div>
  );
};

export default BoardWithPlayers;