import { ICON_SIZES } from "@/constants/icons";
import { PieceShortFormWithoutKing } from "@/typing/interfaces";
import { getPieceSVGComponent } from "@/utils/ui";

type RenderPieceParams = [PieceShortFormWithoutKing, number];

interface PieceNTimesProps {
  piece: RenderPieceParams;
}

const MIN_RENDERABLE_PIECE_COUNT = 1;

const PieceNTimes: React.FC<PieceNTimesProps> = ({ piece }) => {
  const [pieceType, pieceCount] = piece;

  if (pieceCount < MIN_RENDERABLE_PIECE_COUNT) return null;

  const PieceSVGComponent = getPieceSVGComponent(pieceType);

  if (!PieceSVGComponent) return null;

  const renderPieceByCount = () => {
    // array with length as much as number of times to render
    const pieceCountArray = Array.from({ length: pieceCount });

    const smallIconStyles = { width: ICON_SIZES.SMALL, height: ICON_SIZES.SMALL };
    return (
      <>
        {pieceCountArray.map((_, i) => (
          <div key={i} style={smallIconStyles}>
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
