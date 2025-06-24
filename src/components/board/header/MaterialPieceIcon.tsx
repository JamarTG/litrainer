import { FC } from "react";
import { ICON_SIZES } from "@/constants/icons";
import { PIECE_COMPONENTS } from "@/constants/piece";

interface MaterialPieceIconProps {
  piece: keyof typeof PIECE_COMPONENTS;
  size?: number;
}

const MaterialPieceIcon: FC<MaterialPieceIconProps> = ({ piece, size = ICON_SIZES.SMALL }) => {
  const PieceComponent = PIECE_COMPONENTS[piece];

  if (!PieceComponent) {
    console.error(`Invalid piece type: ${piece}`);
    return null;
  }

  return (
    <div style={{ width: size, height: size }}>
      <PieceComponent />
    </div>
  );
};

export default MaterialPieceIcon;
