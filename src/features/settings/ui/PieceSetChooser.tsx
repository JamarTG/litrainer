import { useDispatch, useSelector } from "react-redux";
import { getPieceSet, setPieceSet } from "@/state/slices/piece-set";
import { PIECE_SETS } from "@/constants/piece";
import GenericChooser from "@/components/shared/GenericChooser";
import { playSelectSound } from "@/sound";

const PieceSetChooser = () => {
  const dispatch = useDispatch();
  const pieceSet = useSelector(getPieceSet);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-[var(--color-fg)]">Piece Set</span>
        <div className="flex items-center gap-2 min-w-0" title={pieceSet}>
          <img src={`themes/pieces/${pieceSet}/wK.svg`} className="w-7 h-7" alt={pieceSet} />
        </div>
      </div>

      <GenericChooser
        options={PIECE_SETS}
        selected={pieceSet}
        onSelect={(value) => {
          dispatch(setPieceSet(value));
          playSelectSound();
        }}
        getDisplay={(setName) => (
          <div className="h-6 flex items-center gap-2 min-w-0" title={setName}>
            <img src={`themes/pieces/${setName}/wK.svg`} className="w-5 h-5" alt={setName} />
            <span className="truncate text-sm">{setName}</span>
          </div>
        )}
        getOptionKey={(option: string): string => option}
      />
    </div>
  );
};

export default PieceSetChooser;