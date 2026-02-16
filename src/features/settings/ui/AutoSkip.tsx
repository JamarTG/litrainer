import ToggleSwitch from "@/components/shared/ToggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { toggleAutoSkip } from "@/redux/slices/puzzle";
import { RootState } from "@/redux/store";
import { Fragment } from "react/jsx-runtime";

const AutoSkip = () => {
  const autoSkipOn = useSelector((state: RootState) => state.puzzle.autoSkip);
  const dispatch = useDispatch();
  const handleToggleSwitch = () => {
    dispatch(toggleAutoSkip());
  };

  return (
    <Fragment>
      <div className="w-1/2">
        <h2>enable autoskip</h2>
      </div>
      <div className="w-1/2">
        {" "}
        <ToggleSwitch handleToggleSwitch={handleToggleSwitch} isOn={autoSkipOn} />
      </div>
    </Fragment>
  );
};

export default AutoSkip;