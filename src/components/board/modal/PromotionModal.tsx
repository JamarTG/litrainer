import { Square } from "chess.js";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { promotionPieces } from "../../../constants/piece";
import { constructPromotionPieceURL } from "../../../utils/chess/promotion";
import { ColorLongForm } from "../../../types/player";

export interface PromotionData {
  from: Square;
  to: Square;
  color: ColorLongForm;
}

const PromotionModal: FC<{
  isOpen: boolean;
  promotionData: PromotionData | null;
  onPromote: (piece: string) => void;
  onCancel: VoidFunction;
}> = ({ isOpen, promotionData, onPromote, onCancel }) => {
  if (!isOpen || !promotionData) return null;

  const { color } = promotionData;
  const pieceSet = useSelector((state: RootState) => state.pieceSet.set);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm mx-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Choose promotion piece</h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {promotionPieces.map(({ piece, name }) => (
            <button
              key={piece}
              onClick={() => onPromote(piece)}
              className="flex flex-col items-center p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <span className="group-hover:scale-110 transition-transform">
                <img src={constructPromotionPieceURL(pieceSet, color)} alt={name} className="w-16" />
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{name}</span>
            </button>
          ))}
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

export default PromotionModal;
