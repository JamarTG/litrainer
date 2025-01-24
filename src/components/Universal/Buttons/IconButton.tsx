import { faBackwardStep, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconButtonProps {
  onClick: () => void;
  direction: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, direction }) => {
  return (
    <button onClick={onClick} className="hover:opacity-75">
      {direction === "right" ? (
        <FontAwesomeIcon size="xl" icon={faForwardStep} />
      ) : (
        <FontAwesomeIcon size="xl" icon={faBackwardStep} />
      )}
    </button>
  );
};

export default IconButton;
