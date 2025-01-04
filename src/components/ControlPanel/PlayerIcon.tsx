import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface PlayerIconProps {
  color: "white" | "black";
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ color }) => {
  return (
    <div className="rounded-full px-1">
      <FontAwesomeIcon
        icon={faCircle}
        color={color === "white" ? "#ffffff" : "#000000"}
        size="lg"
      />
    </div>
  );
};

export default PlayerIcon;
