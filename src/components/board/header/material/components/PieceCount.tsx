import { ICON_SIZES } from "@/constants/icons";
import { PieceShortFormWithoutKing } from "@/typing/interfaces";
import { getPieceSVGComponent } from "@/utils/ui";

type RenderPieceParams = [PieceShortFormWithoutKing, number];

interface PieceNTimesProps {
  piece: RenderPieceParams;
}

const PieceNTimes: React.FC<PieceNTimesProps> = ({ piece }) => {
  const [pieceType, pieceCount] = piece;
  // Must have at least 1 piece to render
  if (pieceCount < 1) return null;

  const PieceSVGComponent = getPieceSVGComponent(pieceType);

  if (!PieceSVGComponent) return null;

  return (
    <div key={pieceType} className="flex">
      {Array.from({ length: pieceCount }).map((_, i) => (
        <div key={i} style={{ width: ICON_SIZES.SMALL, height: ICON_SIZES.SMALL }}>
          <PieceSVGComponent />
        </div>
      ))}
    </div>
  );
};

export default PieceNTimes;
