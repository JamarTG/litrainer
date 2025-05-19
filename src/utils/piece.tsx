import { chessPieceCodes } from "../constants/piece";

export const createCustomPieces = () => {
  const pieceComponents: Record<string, ({ squareWidth }: { squareWidth: number }) => JSX.Element> = {};

  chessPieceCodes.forEach((chessPieceCode) => {
    pieceComponents[chessPieceCode] = ({ squareWidth }) => (
      <div
        style={{
          width: squareWidth,
          height: squareWidth,
          backgroundImage: `url(/piece-sets/fresca/${chessPieceCode}.svg)`,
          backgroundSize: "100%",
        }}
      />
    );
  });
  return pieceComponents;
};
