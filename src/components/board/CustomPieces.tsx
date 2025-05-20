import { chessPieceCodes } from "../../constants/piece";

const CustomPieces = () => {
  const pieceComponents: { [key: string]: React.FC<{ squareWidth: number }> } = {};

  chessPieceCodes.forEach((chessPieceCode: string) => {
    pieceComponents[chessPieceCode] = ({ squareWidth }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          backgroundImage: `url(/pieceSets/fresca/${chessPieceCode}.svg)`,
          backgroundSize: "100%",
        }}
      />
    );
  });
  return pieceComponents;
};

export default CustomPieces;
