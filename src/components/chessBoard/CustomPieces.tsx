import { chessPieceCodes, PIECE_IMAGE_BASE_PATH } from "../../constants/piece";

const CustomPieces = (pieceSet : string) => {
  const pieceComponents: { [key: string]: React.FC<{ squareWidth: number }> } = {};

  chessPieceCodes.forEach((chessPieceCode: string) => {
    pieceComponents[chessPieceCode] = ({ squareWidth }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          backgroundImage: `url(/${PIECE_IMAGE_BASE_PATH}/${pieceSet}/${chessPieceCode}.svg)`,
          backgroundSize: "100%",
        }}
      />
    );
  });
  return pieceComponents;
};

export default CustomPieces;
