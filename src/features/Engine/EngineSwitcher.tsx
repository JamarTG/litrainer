import { useEngineContext } from "../../context/Engine/EngineContext";
import { EngineName } from "../../types/engine";


const EngineSwitcher = () => {
  const { setEngineName } = useEngineContext();
  const {
    Stockfish16_1,
    Stockfish16_1Lite,
    Stockfish16,
    Stockfish16NNUE,
    Stockfish11,
  } = EngineName;
  return (
    <select
      onChange={(e) => setEngineName(e.target.value as EngineName)}
      className="m-2 bg-gray-500 hover:bg-gray-700 active:bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform "
    >
      <option value={Stockfish16_1Lite}>{Stockfish16_1Lite}</option>
      <option value={Stockfish16}>{Stockfish16}</option>
      <option value={Stockfish16NNUE}>{Stockfish16NNUE}</option>
      <option value={Stockfish16_1}>{Stockfish16_1}</option>
      <option value={Stockfish11}>{Stockfish11}</option>
    </select>
  );
};

export default EngineSwitcher;
