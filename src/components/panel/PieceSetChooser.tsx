import { useDispatch } from "react-redux";
import { useState } from "react";
import { PIECE_SETS } from "../../constants/pieceSet";
import { setPieceSet } from "../../redux/slices/pieceSetSlices";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const PieceSetChooser = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const pieceSet = useSelector((state: RootState) => state.pieceSet.set);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (pieceSet: string) => {
    dispatch(setPieceSet(pieceSet));
  };

  return (
    <div
      style={{ width: "90%" }}
      className="pl-2 px-4 sm:px-0 p-2 border mx-auto rounded-lg  flex sm:flex-row items-center justify-center sm:items-start gap-4"
    >
      <button
        onClick={toggleDropdown}
        className="w-24 rounded-md flex gap-2"
      >
        {pieceSet ? (
          <img
            className="w-4"
            src={`pieceSets/${pieceSet}/wK.svg`}
          />
        ) : null}
        {pieceSet || "Select Piece Sets"}
        <span className="ml-2"> </span>
      </button>

      {isOpen && (
        <ul className="absolute dark:bg-[#2c2c2c] dark:text-white mt-8 p-2 w-40 h-48 overflow-y-auto bg-white border rounded shadow-lg z-10">
          {PIECE_SETS.map((pieceSet) => (
            <li
              onClick={() => handleSelect(pieceSet)}
              key={pieceSet}
              className="cursor-pointer dark:hover:bg-[#000] w-full hover:bg-gray-100 px-4 py-2 flex gap-2"
            >
              <img
                src={`pieceSets/${pieceSet}/wK.svg`}
                className="w-4"
                alt={pieceSet}
              />

              {pieceSet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PieceSetChooser;
