import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

interface ResizeHandleProps {
  resizeRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ resizeRef, handleMouseDown }) => {
  return (
    <div
      ref={resizeRef}
      onMouseDown={handleMouseDown}
      className={`absolute bottom-[-15px] right-[-20px] w-5 h-5 cursor-se-resize`}
    >
      <FontAwesomeIcon
        icon={faUpRightAndDownLeftFromCenter}
        className="transform rotate-90"
      />
    </div>
  );
};

export default ResizeHandle;