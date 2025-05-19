import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface PlayerIconProps {
  color: "w" | "b";
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ color }) => {

  const theme = useSelector((state: RootState) => state.theme.theme);
  
  const iconColor =
    theme === "light" ? (color === "w" ? "black" : "white") : color;

  return (
    <div className="rounded-full px-1">
      {iconColor === "white" ? (
        <span className="icon text-xl">&#xe028;</span>
      ) : (
        <span className="icon text-xl">&#xe029;</span>
      )}
    </div>
  );
};

export default PlayerIcon;
