import { chessPieceCodes, PIECE_BACKGROUND_SIZE, PIECE_IMAGE_BASE_PATH } from "../../../constants/piece";
import { PIECE_SETS } from "../../../constants/pieceSet";

const createPieceComponents = (pieceSet: string) => {
  const pieceComponents: { [key: string]: React.FC<{ squareWidth: number }> } = {};

  chessPieceCodes.forEach((chessPieceCode: string) => {
    pieceComponents[chessPieceCode] = ({ squareWidth }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          backgroundImage: `url(/${PIECE_IMAGE_BASE_PATH}/${pieceSet}/${chessPieceCode}.svg)`,
          backgroundSize: PIECE_BACKGROUND_SIZE,
        }}
      />
    );
  });
  return pieceComponents;
};

const cachedPieceSets: { [pieceSet: string]: { [key: string]: React.FC<{ squareWidth: number }> } } = {};

PIECE_SETS.forEach((set) => {
  cachedPieceSets[set] = createPieceComponents(set);
});

const CustomPieces = (pieceSet: string) => {
  return cachedPieceSets[pieceSet] || cachedPieceSets["cburnett"]; // fallback if invalid
};


export default CustomPieces;
