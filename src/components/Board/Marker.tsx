import { Square } from "chess.js";
import { Classification } from "../../types/move";

interface MarkerProps {
  classification: Classification | null;
  markerPosition: { top: number; right: number };
  boardSize: number;
  destinationSquare: Square | null;
}

const Marker: React.FC<MarkerProps> = ({
  classification,
  boardSize,
  markerPosition,
  destinationSquare
}) => {
  return (
    <>
      {destinationSquare && classification && (
        <img
          src={`/assets/evals/${classification}.svg`}
          alt=""
          width={boardSize / 16}
          height={boardSize / 16}
          className="absolute"
          style={{ right: markerPosition.right, top: markerPosition.top }}
        />
      )}
    </>
  );
};

export default Marker;
