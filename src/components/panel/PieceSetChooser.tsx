import { useDispatch, useSelector } from "react-redux";
import { setPieceSet } from "../../redux/slices/pieceSetSlices";
import { PIECE_SETS } from "../../constants/pieceSet";
import { RootState } from "../../redux/store";
import GenericChooser from "../shared/GenericChooser";
import { playSelectSound } from "../../lib/sound";

const PieceSetChooser = () => {
  const dispatch = useDispatch();
  const pieceSet = useSelector((state: RootState) => state.pieceSet.set);

  return (
    <GenericChooser
      options={PIECE_SETS}
      selected={pieceSet}
      onSelect={(value) => {
        dispatch(setPieceSet(value))
        playSelectSound();
      }}
      getDisplay={(setName) => (
        <div className="w-8 h-8" title={setName}>
          <img
            src={`pieceSets/${setName}/wK.svg`}
            className="w-8"
            alt={setName}
          />
        </div>
      )}
    />
  );
};

export default PieceSetChooser;
