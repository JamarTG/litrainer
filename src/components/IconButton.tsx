import React from "react";

interface IconButtonProps {
  onClick: () => void;
  icon: string; 
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon 
}) => {
  return (
    <button onClick={onClick}>
      <span className={`icon text-2xl hover:text-blue-500`}>
        {icon}
      </span>
    </button>
  );
};

export default IconButton;