import { ICON_SIZES } from "@/constants/icons";
import { PieceShortFormWithoutKing } from "@/typing/interfaces";
import { getPieceSVGComponent } from "@/utils/ui";

type RenderPieceParams = [PieceShortFormWithoutKing, number];

interface PieceNTimesProps {
  piece: RenderPieceParams;
}

const MIN_RENDERABLE_PIECE_COUNT = 1;
const MATERIAL_ICON_SIZE = ICON_SIZES.SMALL + 2;

const PieceNTimes: React.FC<PieceNTimesProps> = ({ piece }) => {
  const [pieceType, pieceCount] = piece;

  if (pieceCount < MIN_RENDERABLE_PIECE_COUNT) return null;

  const PieceSVGComponent = getPieceSVGComponent(pieceType);

  if (!PieceSVGComponent) return null;

  const renderPieceByCount = () => {
    const pieceCountArray = Array.from({ length: pieceCount });

    const pieceIconStyles = { width: MATERIAL_ICON_SIZE, height: MATERIAL_ICON_SIZE };
    return (
      <>
        {pieceCountArray.map((_, i) => (
          <div key={i} style={pieceIconStyles}>
            <PieceSVGComponent />
          </div>
        ))}
      </>
    );
  };

  return (
    <div key={pieceType} className="flex">
      {renderPieceByCount()}
    </div>
  );
};

export default PieceNTimes;
