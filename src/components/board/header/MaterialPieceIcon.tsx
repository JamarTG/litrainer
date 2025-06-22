import { FC } from "react";
import { Pawn, Knight, Bishop, Queen, Rook } from "./pieces/_index";
import { ICON_SIZES } from "@/constants/icons";

interface MaterialPieceIconProps {
  piece: keyof typeof PIECE_COMPONENTS;
  size?: number;
}

const PIECE_COMPONENTS = {
  bishop: Bishop,
  knight: Knight,
  pawn: Pawn,
  queen: Queen,
  rook: Rook
} as const;

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
