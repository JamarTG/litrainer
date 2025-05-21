import { useEngineContext } from "../../context/hooks/useEngineContext";
import { EngineName } from "../../types/engine";

const EngineSwitcher = () => {
  const { setEngineName } = useEngineContext();

  return (
    <select
      onChange={(e) => setEngineName(e.target.value as EngineName)}
      className="m-2 bg-gray-500 hover:bg-gray-700 active:bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out transform "
    >
      {Object.values(EngineName).map((engine) => (
        <option
          key={engine}
          value={engine}
        >
          {engine}
        </option>
      ))}
    </select>
  );
};

export default EngineSwitcher;
