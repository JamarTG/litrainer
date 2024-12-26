import React from "react";

interface IconButtonProps {
  onClick: () => void;
  icon: string; // Add icon prop
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon // Destructure icon prop
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