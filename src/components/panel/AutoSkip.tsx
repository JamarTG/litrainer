import ToggleSwitch from "../shared/ToggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { toggleAutoSkip } from "@/redux/slices/puzzle";
import { RootState } from "@/redux/store";

const AutoSkip = () => {
  const autoSkipOn = useSelector((state: RootState) => state.puzzle.autoSkip);
  const dispatch = useDispatch();
  const handleToggleSwitch = () => {
    dispatch(toggleAutoSkip());
  };

  return (
    <>
      <div className="w-1/2">
        <h2>enable autoskip</h2>
      </div>
      <div className="w-1/2">
        {" "}
        <ToggleSwitch handleToggleSwitch={handleToggleSwitch} isOn={autoSkipOn} />
      </div>
    </>
  );
};

export default AutoSkip;
