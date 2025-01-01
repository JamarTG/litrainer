import React from 'react';
import PlayerInfo from '../../ControlPanel/components/PlayerInfo';
import RenderMaterial from '../../ControlPanel/components/RenderMaterial'; 
import { Materials } from '../../../types/eval';
import { LichessPlayer } from '../../../types/player';

interface PlayerWithMaterialProps {
  player: LichessPlayer;
  color: "w" | "b";
  isWinner: boolean;
  material: Materials
}

const PlayerWithMaterial: React.FC<PlayerWithMaterialProps> = ({ player, color, isWinner, material }) => {
  return (
    <div className="flex items-center gap-2">
      <PlayerInfo player={player} color={color} isWinner={isWinner} />
      <RenderMaterial material={material} color={color} />
    </div>
  );
};

export default PlayerWithMaterial;