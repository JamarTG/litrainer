import { useDispatch, useSelector } from "react-redux";
import { getPieceSet, setPieceSet } from "@/redux/slices/piece-set";
import { PieceSets } from "@/constants/piece";
import GenericChooser from "../../../shared/GenericChooser";
import { playSelectSound } from "@/libs/sound";

const PieceSetChooser = () => {
  const dispatch = useDispatch();
  const pieceSet = useSelector(getPieceSet);

  return (
    <GenericChooser
      options={PieceSets}
      selected={pieceSet}
      onSelect={(value) => {
        dispatch(setPieceSet(value));
        playSelectSound();
      }}
      getDisplay={(setName) => (
        <div className="h-8 flex items-center gap-1" title={setName}>
          <img src={`themes/pieces/${setName}/wK.svg`} className="w-8" alt={setName} />
          {setName}
        </div>
      )}
      getOptionKey={(option: string): string => option}
    />
  );
};

export default PieceSetChooser;
