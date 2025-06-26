import { Square } from "chess.js";
import { FC } from "react";
import { useSelector } from "react-redux";
import List from "@/components/common/List";
import { getPieceSet } from "@/redux/slices/piece-set";
import { PROMOTION_DIALOG_Z_INDEX } from "@/constants/ui";
import { PromotionPiece } from "@/typing/interfaces";
import { ColorLongForm } from "@/typing/enums";

export interface PromotionMoveObject {
  from: Square;
  to: Square;
  color: ColorLongForm;
}

interface PromotionDialogProps {
  isOpen: boolean;
  color: ColorLongForm | null;
  onPromote: (piece: string) => void;
  onCancel: VoidFunction;
}

export const PROMOTION_PIECES: PromotionPiece[] = [
  {
    piece: "q",
    name: "Queen"
  },
  {
    piece: "r",
    name: "Rook"
  },
  {
    piece: "b",
    name: "Bishop"
  },
  {
    piece: "n",
    name: "Knight"
  }
];

const PromotionDialog: FC<PromotionDialogProps> = ({ isOpen, color, onPromote, onCancel }) => {
  const pieceSet = useSelector(getPieceSet);

  if (!isOpen || !color) return null;

  const renderPromotionOption = ({ piece, name }: PromotionPiece) => (
    <button
      key={piece}
      onClick={() => onPromote(piece)}
      className="flex flex-col items-center p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group"
    >
      <span className="group-hover:scale-110 transition-transform">
        <img
          src={`/themes/pieces/${pieceSet}/${color[0]}${piece.toLocaleUpperCase()}.svg`}
          alt={name}
          className="w-16"
        />
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{name}</span>
    </button>
  );

  return (
    <div
      style={{ zIndex: PROMOTION_DIALOG_Z_INDEX }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm mx-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Choose promotion piece</h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <List items={PROMOTION_PIECES} renderItem={renderPromotionOption} />
        </div>

        <button
          onClick={onCancel}
          className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PromotionDialog;
