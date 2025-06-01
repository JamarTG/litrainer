import { cloneElement, FC } from "react";
import PIECE_SVGS from "./PieceSVGMapping";

interface PieceIconProps {
  piece: keyof typeof PIECE_SVGS;
  size?: number;
}

const PieceIcon: FC<PieceIconProps> = ({ piece, size = 24 }) => {
  const svg = PIECE_SVGS[piece];

  if (!svg) {
    console.error(`Invalid piece type: ${piece}`);
    return null;
  }

  return <div style={{ width: size, height: size }}>{cloneElement(svg, { width: size, height: size })}</div>;
};

export default PieceIcon;
